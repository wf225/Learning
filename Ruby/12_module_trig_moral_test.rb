#!/usr/bin/ruby

# 使用 $LOAD_PATH << '.' 让 Ruby 知道必须在当前目录中搜索被引用的文件。
# 如果您不想使用 $LOAD_PATH，那么您可以使用 require_relative 来从一个相对目录引用文件。
$LOAD_PATH << '.'

require '12_module_trig.rb'
require '12_module_moral'		# 文件扩展名 .rb 不是必需的

y = Trig.sin(Trig::PI/4)
wrongdoing = Moral.sin(Moral::VERY_BAD)

puts "#{Trig::PI}"
puts "#{y}"
puts "#{wrongdoing}"
