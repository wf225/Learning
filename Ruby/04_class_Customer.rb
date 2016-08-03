#!/usr/bin/ruby -w
# -*- coding: UTF-8 -*-

class Customer

   # 类变量以 @@ 开头，且必须初始化后才能在方法定义中使用
   @@no_of_customers=0

   # 常量
   VAR1 = 100
   VAR2 = 200

   def initialize(id, name, addr)
   	  puts "Initialize Ruby Program"

      @cust_id=id
      @cust_name=name
      @cust_addr=addr
   end

   def display_details()
      puts "Customer id #@cust_id"
      puts "Customer name #@cust_name"
      puts "Customer address #@cust_addr"
   end
   def total_no_of_customers()
      @@no_of_customers += 1
      puts "Total number of customers: #@@no_of_customers"
   end


   def hello
      puts "Hello Ruby!"
   end

   def show
       puts "第一个常量的值为 #{VAR1}"
       puts "第二个常量的值为 #{VAR2}"
   end

end

# 创建对象
cust1=Customer.new("1", "John", "Wisdom Apartments, Ludhiya")
cust2=Customer.new("2", "Poul", "New Empire road, Khandala")

# 调用方法
cust1.display_details()
cust1.total_no_of_customers()
cust2.display_details()
cust2.total_no_of_customers()

puts cust1.hello
puts Customer::VAR1

cust1.show()

# Ruby 伪变量s
puts "file: #{__FILE__}" + " line:" + "#{__LINE__}"
