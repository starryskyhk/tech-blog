---
slug: /tech/theory/design-pattern/command
tag: ["设计模式"]
date: 2024-01-31T19:04
---
# 命令模式(Command)

**定义：** 将一个请求封装为一个对象，从而使开发者可用不同的请求对客户进行参数化；对请求排队或记录请求日志，以及支持可撤销

**类型：** 行为型

**类图：** 

![image-20210523233257005](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/DesignPattern/Command.png)

**组件说明：** 

- Invoker：要求该命令执行这个请求
- Command：用来声明执行操作的接口
- ConcreteCommand：将一个接受者对象绑定于一个动作，调用接收者相应的操作，以实现execute
- Receiver：知道如何实施与执行一个请求相关的操作，任何类都可能作为一个接收者

**适用场景：** 

- 认为是命令的地方都可以使用命令模式

**优点：** 

- 降低了系统耦合度
- 新的命令可以很容易添加到系统中去

**缺点：** 

- 使用命令模式可能会导致某些系统有过多的具体命令类