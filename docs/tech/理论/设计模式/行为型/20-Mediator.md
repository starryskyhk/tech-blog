---
slug: /tech/theory/design-pattern/mediator
tags: ["设计模式"]
date: 2024-01-31T19:04
---
# 中介者模式(Mediator)

**定义：** 用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它

们之间的交互

**类型：** 行为型

**类图：** 

![image-20210525000408472](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/DesignPattern/Mediator.png)

**组件说明：** 

- Mediator：抽象中介者，定义了同事对象到中介者对象的接口

- ConcreteMediator：具体中介者对象，实现抽象类的方法，它需要知道所有具体同事类，并从具体同事接收消息，向具体同事对象

  发出命令

- Colleague：抽象同事类

- ConcreteColleague：具体同事类，每个具体同事只知道自己的行为，而不了解其他同事类的情况，但它们却都认识中介者对象

**适用场景：** 

- 系统中对象之间存在比较复杂的引用关系，导致它们之间的依赖关系结构混乱而且难以复用该对象
- 想通过一个中间类来封装多个类中的行为，而又不想生成太多的子类。

**优点：** 

- 降低了类的复杂度，将一对多转化成了一对一
- 各个类之间的解耦
- 符合迪米特原则

**缺点：** 

中介者会庞大，变得复杂难以维护

**注意事项：** 不应当在职责混乱的时候使用。
