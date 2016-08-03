#!/usr/bin/ruby

# 这是注释。
# 这也是注释。
# 这也是注释。
# 这还是注释。


=begin
这是注释。
这也是注释。
这也是注释。
这还是注释。
=end

# BEGIN 和 END 块
# 每个 Ruby 源文件可以声明当文件被加载时要运行的代码块（BEGIN 块），
# 以及程序完成执行后要运行的代码块（END 块）。
BEGIN { 
  # BEGIN 代码块
  puts "BEGIN 代码块"
} 

END { 
  # END 代码块
  puts "END 代码块"
}
  # MAIN 代码块
puts "MAIN 代码块"

# 一个程序可以包含多个 BEGIN 和 END 块。
# BEGIN 块按照它们出现的顺序执行。END 块按照它们出现的相反顺序执行。