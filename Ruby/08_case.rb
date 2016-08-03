#!/usr/bin/ruby
# -*- coding: UTF-8 -*-

# Ruby if...else 语句
x=1
if x > 2
   puts "x 大于 2"
elsif x <= 2 and x!=0
   puts "x 是 1"
else
   puts "无法得知 x 的值"
end


# Ruby if 修饰符
$debug=1
print "debug\n" if $debug


# Ruby unless 语句
x=1
unless x>2
   puts "x 小于 2"
 else
  puts "x 大于 2"
end


# Ruby unless 修饰符
$var =  1
print "1 -- 这一行输出\n" if $var
print "2 -- 这一行不输出\n" unless $var

$var = false
print "3 -- 这一行输出\n" unless $var


# Ruby case 语句
$age =  5
case $age
when 0 .. 2
    puts "婴儿"
when 3 .. 6
    puts "小孩"
when 7 .. 12
    puts "child"
when 13 .. 18
    puts "少年"
else
    puts "其他年龄段的"
end

# Ruby while 语句
$i = 0
$num = 5
while $i < $num  do
   puts("在循环语句中 i = #$i" )
   $i +=1
end

# Ruby while 修饰符
$i = 0
$num = 5
begin
   puts("在循环语句中 i = #$i" )
   $i +=1
end while $i < $num

# Ruby until 语句
$i = 0
$num = 5
until $i > $num  do
   puts("在循环语句中 i = #$i" )
   $i +=1;
end

# Ruby until 修饰符
$i = 0
$num = 5
begin
   puts("在循环语句中 i = #$i" )
   $i +=1;
end until $i > $num

# Ruby for 语句
for i in 0..5
   puts "局部变量的值为 #{i}"
end


# Ruby break 语句
for i in 0..5
   if i > 2 then
      break
   end
   puts "局部变量的值为 #{i}"
end

# Ruby next 语句
for i in 0..5
   if i < 2 then
      next
   end
   puts "局部变量的值为 #{i}"
end

# Ruby redo 语句, 重新开始最内部循环的该次迭代
for i in 0..5
   if i < 2 then					# 进入一个无限循环
      puts "局部变量的值为 #{i}"
      redo
   end
end

# Ruby retry 语句
for i in 1..5
   retry if  i > 2
   puts "局部变量的值为 #{i}"
end


