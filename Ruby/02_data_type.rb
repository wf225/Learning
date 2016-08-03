#!/usr/bin/ruby
# -*- coding: UTF-8 -*-

puts "\n指数算术"
puts 16**(1/4.0)

puts "\n字符串类型"
puts 'escape using "\\"';
puts 'That\'s right';

# 使用序列 #{ expr } 替换任意 Ruby 表达式的值为一个字符串。
# expr 可以是任意的 Ruby 表达式。
name="Ruby" 
puts name 
puts "#{name+",ok"}"

puts "\n数组"
ary = [ "fred", 10, 3.14, "This is a string", "last element", ]
ary.each do |i|
    puts i
end

puts "\n哈希类型"
hsh = colors = { "red" => 0xf00, "green" => 0x0f0, "blue" => 0x00f }
hsh.each do |key, value|
    print key, " is ", value, "\n"
end

puts "\n范围类型"
(10..15).each do |n|
    print n, ' '
end
puts "\n"

(10...15).each do |n|
    print n, ' '
end
puts "\n"