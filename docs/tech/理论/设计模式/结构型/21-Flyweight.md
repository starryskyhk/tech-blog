---
slug: /tech/theory/design-pattern/flyweight
tags: ["设计模式"]
date: 2024-01-31T19:04
---
# 享元模式(Flyweight)

**定义：** 运用共享技术有效地支持大量细粒度的对象

**类型：** 结构型

**类图：** 

![image-20210530001149705](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/DesignPattern/Flyweight.png)

**组件说明：** 

- Flyweight：所有享元类的超类或接口，通过这个接口，Flyweight可以接受并作用于外部状态

- FlyweightFactory：一个享元工厂，用来创建并管理Flyweight对象。它主要是用来确保合理地共享Flyweight，当用户请求一个

  Flyweight时，FlyweightFactory提供一个已创建的实例或创建一个(如果不存在)

- ConcreteFlyweight：继承Flyweight，并为内部状态增加存储空间

- UnsharedConcreteFlyweight：指那些不需要共享的Flyweight子类，因为Flyweight接口共享为可能，不是强制共享

**适用场景：** 

- 系统有大量相似对象
- 需要缓冲池的场景

**优点：** 大大减少对象的创建，降低系统的内存，使效率提高

**缺点：** 提高了系统的复杂度，需要分离出外部状态和内部状态，而且外部状态具有固有化的性质，不应该随着内部状态的变化而变化，

否则会造成系统的混乱

**内部状态与外部状态：** “在享元对象内部并且不会随环境改变而改变的共享部分，可以称为是享元对象的内部状态，而随环境改变而改变

的、不可以共享的状态就是外部状态了。 **事实上，享元模式可以避免大量非常相似类的开销。在程序设计中，有时需要生成大量细粒**

**度的类实例来表示数据。如果能发现这些实例除了几个参数外基本上都是相同的，有时就能够受大幅度地减少需要实例化的类的数量。如**

**果能把那些参数移到类实例的外面，在方法调用时将它们传递进来，就可以通过共享大幅度地减少单个实例的数目** 

**注意事项：**

- 注意划分外部状态和内部状态，否则可能会引起线程安全问题
- 这些类必须有一个工厂对象加以控制。
