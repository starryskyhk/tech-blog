---
slug: /tech/theory/design-pattern/decorator
tags: ["设计模式"]
date: 2024-01-31T19:04
---
# 装饰模式(Decorator)

**定义：** 在不改变原对象的基础上，为已有功能动态地添加更多功能的一种方式。

**类型：** 结构型

**类图：**

![image-20210509223009933](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/DesignPattern/Decorator.png)
**组件说明：**

Component：一个对象接口，以规范准备接受附加责任的对象

ConcreteComponent：定义了具体的对象，是将要接受复杂责任的类，**即被装饰者**

Decorator：装饰抽象类，持有一个构件(Component)对象，不是必须的

ConcreteDecorator：负责给构建对象加上职责

对于Component来说，是无需知道Decorator的存在的

**适用场景：**

- 扩展一个类的功能或给一个类添加附加的职责
- 动态的给一个对象添加功能

**优点：**

- 符合开闭原则
- 通过使用不同的装饰类以及这些装饰类的各种排列组合，可以实现不同的效果
- 比继承灵活，不改变原有对象的基础上给一个对象扩展功能。继承方式扩展功能，必须都是可预见的功能，因为这些功能必须在编译

  时就确定，是静态的。而装饰者模式是由我们的应用层代码在运行过程中动态决定加入的方式和时间，同时也提供了一种即插即用的

  0方法，可以在运行期间何时增加何种功能

**缺点：**

- 会出现更多的代码，更多的类，增加程序复杂度
- 多层装饰查错更复杂

**在Java源码中的应用**

```java
FileInputStream   fiStream = null;
InputStreamReader iStreamReader = null;
BufferedReader    bReader = null; 

fiStream = new FileInputStream("C:\\xxxx"); 

// InputStreamReader 是字节流通向字符流的桥梁、
iStreamReader = new InputStreamReader(fiStream); 

// 从字符输入流中读取文件中的内容,装饰了一个InputStreamReader的对象
bReader = new  BufferedReader(iStreamReader("C:\\xxxx"));  

//优化为
BufferedReader bReader = new BufferedReader(new InputStreamReader(new FileInputStream("C:\\xxxx"));
```

 
