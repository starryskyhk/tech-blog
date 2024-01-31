---
slug: /tech/theory/design-pattern/abstract-factory
tag: ["设计模式"]
date: 2024-01-31T19:04
---
# 抽象工厂(AbstractFactory)

**定义：** 提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类

**类型：** 创建型

**类图：** 

![image-20210513154456350](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/DesignPattern/AbstractFactory.jpg)

**组件说明：** 

- AbstractFactory：抽象工厂接口，它藜麦应该包含所有的产品创建的抽象方法
- ConcreteFactory：具体的工厂，创建具有特定实现的产品对象
- AbstractProduct：抽象产品，他们都有可能有两种不同的实现
- Product：对两个抽象产品的具体分类的实现

**适用场景：** 

- QQ 换皮肤，一整套一起换
- 生成不同操作系统的程序。

**优点：** 

- 当一个产品族中的多个对象被设计成一起工作时，它能保证客户端始终只使用同一个产品族中的对象。

**缺点：** 

- 产品族扩展非常困难，要增加一个系列的某一产品，既要在抽象的 Creator 里加代码，又要在具体的里面加代码。

**在Java源码中的应用**

![image-20210604145002706](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/DesignPattern/AbstractFactoryCore.png)

Connection 是一个经典的抽象工厂，而 Statement、PreparedStatement、CallableStatement 是 Connection 这个抽象工厂中提供的

三个抽象产品