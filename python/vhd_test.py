#!/bin/python
# multi-level argparse inspired by this article:
# http://chase-seibert.github.io/blog/2014/03/21/python-multilevel-argparse.html

import os
import re
import sys
import logging
import argparse
import subprocess
import tempfile
import json
import string

## Argument Parsing
class VHDCommandParser(object):

  def __init__(self, argv):
    main_parser = argparse.ArgumentParser(
      description = 'A utility to create/mount/unmount VHD on Windows.',
      usage = '''vhd.py <command> [args]

Available commands:
    create
    mount
    unmount
''')

    main_parser.add_argument('command', help='sub command to run')
    args = main_parser.parse_args(argv[1:2])

    # check if there's attribute defined on this class
    # has same name as args.command.
    # method is a kind of attribute
    if not hasattr(self, args.command):
      print ('Unrecognized command')
      main_parser.print_help()
      exit(1)

    # call the command
    sub_args = getattr(self, args.command)().parse_args(argv[2:])
    self.command = self.create_command(args.command, sub_args)
    
  # Create a Command object with args
  def create_command(self, command, args):
    def classify(name):
      return 'VHD' + name.lower().capitalize() + 'Command'

    if not globals().has_key(classify(command)):
      print ('Error: cannot find command {0}'.format(command))
      return None
    else:
      return globals()[classify(command)](args)

  def create_sub_parser(self, description):
    common_parser = argparse.ArgumentParser(add_help=False)
    common_parser.add_argument('-d', '--dry-run', action='store_true', help='print command instead of run')
    common_parser.add_argument('-v', '--verbose', action='store_true', help='print verbose output')
    common_parser.add_argument('-p', '--path', required=True, help='full path of VHD file')
    common_parser.add_argument('-m', '--mount-point', required=True, help='mount point of VHD file')
    return argparse.ArgumentParser(description = description, parents = [common_parser])

  def create(self):
    parser = self.create_sub_parser('Create VHD')
    parser.add_argument('-s', '--size', type=int, required=True, help='Size of VHD file in MB')
    parser.add_argument('-l', '--label', help='Volume label of VHD image')
    parser.add_argument('-t', '--parent', help='Create a differencing disk, specify the path of image of the parent disk')
    return parser

  def mount(self):
    return self.create_sub_parser('Mount VHD')

  def unmount(self):
    return self.create_sub_parser('Unmount VHD')


## Command Logic

class VHDCommand(object):

  def __init__(self, args):
    self.args = args
    self.dry_run = False #args.dry_run
    self.verbose = True #args.verbose

  def can_run(self):
    return (True, None)

  def run(self):
    res, err = self.can_run()
    if res:
      self.do_run()
    else:
      print (err)
      return

  def do_run(self):
    cmd = self.cmd_from_template(self.args)
    if self.verbose:
      print (cmd)
    self.diskpart(cmd)

  # Need UT
  def cmd_from_template(self, args):
    return self.cmd_template().format(vars(args)) # **vars(args)
  
  def diskpart(self, cmd, capture_output=False):
    script_file = self.temp_script_file()
    script_file.write(cmd)
    script_file.close()
    try:
      output = self.run_cmd(['diskpart', '/s', script_file.name], capture_output=capture_output)
    finally:
      os.remove(script_file.name)
    return output

  def temp_script_file(self):
    return tempfile.NamedTemporaryFile(mode='w+t', delete=False)

  # Remarks:
  #   run_cmd return 0 when dry_run == True
  #   run_cmd return 0 when catpure_output == False
  #   run_cmd return stdout output when capture_output == True
  # Arguments:
  #   
  # Exception:
  #   run_cmd throws CalledProcessError when cmd return code is non-zero. CalledProcessError
  #   has returncode attribute to get actual return code.
  def run_cmd(self, cmd, capture_output=False):
    if self.dry_run:
      print (cmd)
      return 0
    else:
      if self.verbose:
        print (cmd)
      if capture_output:
        return subprocess.check_output(cmd, shell=True)
      else:
        return subprocess.check_call(cmd, shell=True)

  def is_mounted(self):
    output = self.diskpart('list vdisk', capture_output=True)
    output = output.replace('\r', '')
    # find a line of specific vhd with Attached text in same line, for example:
    # pattern = r"^.*Attached.*c\:\\test\.vhd$"
    pattern = "^.*Attached.*{0}$".format(re.escape(self.args.path))
    m = re.search(pattern, output, re.MULTILINE)
    if self.verbose:
      print (pattern)
      print (output)
      print (m)
    return m != None

  def vhd_exists(self):
    return os.path.exists(self.args.path)


class VHDCreateCommand(VHDCommand):

  def cmd_template(self):
    return self.create_vdisk_cmd() + '''
select vdisk file="{path}"
attach vdisk
convert mbr
create partition primary
format fs=ntfs label="{label}" quick
assign mount="{mount_point}"
exit
'''

  def create_vdisk_cmd(self):
    if args.parent:
      return 'create vdisk file="{path}" maximum={size} type=fixed'
    else:
      return 'create vdisk file="{path}" maximum={size} parent={parent} type=fixed'

  def can_run(self):
    if self.vhd_exists():
      return (False, 'ERROR: VHD file already exists {0}.'.format(self.args.path))
    elif self.args.parent and (not self.parent_vhd_exists()):
      return (False, "ERROR: parent VHD file doesn't exist.")
    else:
      return (True, None)

  def parent_vhd_exists(self):
    return os.path.exists(self.args.parent)


class VHDMountCommand(VHDCommand):

  def cmd_template(self):
    return '''
select vdisk file="{path}"
attach vdisk noerr
select partition=1
assign mount="{mount_point}"
exit
'''

  def can_run(self):
    if not self.vhd_exists():
      return (False, 'ERROR: VHD file not found at {0}.'.format(self.args.path))
    elif self.is_mounted():
      return (False, 'ERROR: VHD file already mounted.')
    elif not self.mount_point_ok():
      return (False, 'ERROR: Invalid mount point. It maybe not exist or it is not an empty directory.')
    else:
      return (True, None)

  def mount_point_ok(self):
    mount_point = self.args.mount_point
    return os.path.exists(mount_point) and (not Win32Utils().is_junction(mount_point)) and (os.path.isdir(mount_point) and os.listdir(mount_point) == [])


class VHDUnmountCommand(VHDCommand):

  def cmd_template(self):
    return '''
select vdisk file="{path}"
select partition=1
remove mount="{mount_point}"
detach vdisk
exit
'''

  def can_run(self):
    if not self.vhd_exists():
      return (False, 'ERROR: VHD file not found at {0}.'.format(self.args.path))
    elif (not self.is_mounted()):
      return (False, 'ERROR: VHD already unmounted.')
    else:
      return (True, None)

# Win32 Junction check

class Win32Error(object):
  pass

class Win32Utils(object):
  def __init__(self):
    from ctypes import WinDLL, POINTER, c_ubyte
    from ctypes.wintypes import DWORD, LPCWSTR

    self.kernel32 = WinDLL('kernel32')
    self.LPDWORD = POINTER(DWORD)
    self.UCHAR = c_ubyte

    self.GetFileAttributesW = kernel32.GetFileAttributesW
    self.GetFileAttributesW.restype = DWORD
    self.GetFileAttributesW.argtypes = (LPCWSTR,) #lpFileName In

    self.INVALID_FILE_ATTRIBUTES = 0xFFFFFFFF
    self.FILE_ATTRIBUTE_REPARSE_POINT = 0x00400

  def is_junction(self, path):
    result = self.GetFileAttributesW(path)
    if result == self.INVALID_FILE_ATTRIBUTES:
        raise Win32Error()
    return bool(result & self.FILE_ATTRIBUTE_REPARSE_POINT)
    
class VHDParser(object):
  def __init__(self, dict):
    self.path = dict['path']
    self.size = dict['size']
    self.lable = dict['lable']
    self.mount_point = dict['mount_point']
    self.parent = None

# Main Entrypoint
if __name__ == '__main__':
  # parser = VHDCommandParser(sys.argv)
  # if parser.command:
  #     parser.command.run()
  args = {"path": "D:\\VHDs\\acadci-005.vhd", "size": 1000, "lable": "acadci-005", "mount_point": "E:\\", "parent":0}
  parser = VHDParser(args)
  create_cmd = VHDCreateCommand(parser)
  create_cmd.run()