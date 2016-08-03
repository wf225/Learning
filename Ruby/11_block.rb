#!/usr/bin/ruby
# -*- coding: UTF-8 -*-

def test
   puts "在 test 方法内"
   yield
   puts "你又回到了 test 方法内"
   yield
end
test {puts "你在块内"}

# 传递带有参数的 yield 语句
def test2
   yield 5
   puts "在 test2 方法内"
   yield 100
end
test2 {|i| puts "你在块 #{i} 内"}

# 如果方法的最后一个参数前带有 &，那么您可以向该方法传递一个块，且这个块可被赋给最后一个参数。
# 如果 * 和 & 同时出现在参数列表中，& 应放在后面。
def test3(&block)
   block.call
end
test3 { puts "Hello World!"}