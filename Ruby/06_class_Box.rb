#!/usr/bin/ruby -w

# 定义类
class Box

   # 初始化类变量
   @@count = 0

   # 当方法定义在类的外部，方法默认标记为 private。
   # 如果方法定义在类中的，则默认标记为 public,
   # 除了 initialize 方法总是 private 的。
   
   # 构造器方法
   def initialize(w,h)
      # 给实例变量赋值
      @width, @height = w, h

      @@count += 1
   end

   # 访问器方法
   def getWidth
      @width
   end
   def getHeight
      @height
   end

   # make them private
   # private :getWidth, :getHeight

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

   # 用于输出面积的实例方法
   def printArea
      @area = getWidth() * getHeight
      puts "Big box area is : #@area"
   end
   # 让实例方法是 protected 的
   protected :printArea


   def self.printCount()
      puts "Box count is : #@@count"
   end

   # 定义 to_s 方法
   # 任何类都有一个 to_s 实例方法来返回对象的字符串表示形式
   def to_s
      "(w:#@width,h:#@height)"  # 对象的字符串格式
   end

end

# 创建对象
box = Box.new(10, 20)

# 使用访问器方法
puts "-Width of the box is : #{box.getWidth()}"
puts "-Height of the box is : #{box.getHeight()}"


# 使用设置器方法
box.setWidth = 30
box.setHeight = 50

# 使用访问器方法
x = box.getWidth()
y = box.getHeight()
puts "--Width of the box is : #{x}"
puts "--Height of the box is : #{y}"


# 调用实例方法
a = box.getArea()
puts "---Area of the box is : #{a}"

# 尝试调用 protected 的实例方法
box.printArea()


# 调用类方法来输出盒子计数
box1 = Box.new(10, 20)
box2 = Box.new(30, 100)
Box.printCount()

# 自动调用 to_s 方法
puts "String representation of box is : #{box}"


