#!/usr/bin/ruby -w

# 定义类
class Box
   # 构造器方法
   def initialize(w,h)
      @width, @height = w, h
   end

   # 访问器方法
   def getWidth
      @width
   end
   def getHeight
      @height
   end

   # 设置器方法
   def setWidth=(value)
      @width = value
   end
   def setHeight=(value)
      @height = value
   end

   # 实例方法
   def getArea
      @width * @height
   end

   # 运算符重载
   def +(other)         # 定义 + 来执行向量加法
      Box.new(@width + other.width, @height + other.height)
   end

   def -@               # 定义一元运算符 - 来对 width 和 height 求反
      Box.new(-@width, -@height)
   end

   def *(scalar)        # 执行标量乘法
      Box.new(@width*scalar, @height*scalar)
   end

   # 类常量
   # 常量的定义不需要使用 @ 或 @@。按照惯例，常量的名称使用大写。
   # 一旦常量被定义，您就不能改变它的值
   BOX_COMPANY = "TATA Inc"
   BOXWEIGHT = 10

end

# 类的继承

# 定义子类
class BigBox < Box

   # 添加一个新的实例方法
   def printArea
      # @area = @width * @height
      # puts "Big box area is : #@area"

      getArea()
   end

   # 方法重载
   # 改变已有的 getArea 方法
   def getArea
      @area = @width * @height * 2
      puts "Big box area is : #@area"
      return @area
   end

end

# 创建对象
box = BigBox.new(10, 20)

# 输出面积
box.printArea()

# 让我们冻结该对象 ------
# 把一个对象变成一个常量, 冻结对象不能被修改
# box.freeze

# 使用 Object.frozen? 方法检查一个给定的对象是否已经被冻结
if( box.frozen? )
   puts "Box object is frozen object"
else
   puts "Box object is normal object"
end

# 现在尝试使用设置器方法
box.setWidth = 30
box.setHeight = 50
# 使用访问器方法
x = box.getWidth()
y = box.getHeight()

puts "Width of the box is : #{x}"
puts "Height of the box is : #{y}"

# 常量 -----
puts Box::BOX_COMPANY
puts "Box weight is: #{Box::BOXWEIGHT}"

# 调用 allocate 来创建一个未初始化的对象
box2 = BigBox.allocate
box2.setWidth = 10
box2.setHeight = 20
# 使用 box2 调用实例方法
a = box2.getArea()
puts "Area of the box is : #{a}"

