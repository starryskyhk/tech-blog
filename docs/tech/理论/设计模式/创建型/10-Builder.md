---
slug: /tech/theory/design-pattern/builder
tag: ["设计模式"]
date: 2024-01-31T19:04
---
# 建造者模式(Builder)

**定义：** 将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示

**类型：** 创建型

**类图：**

![image-20210512141240045](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/DesignPattern/Builder.png)

**组件说明：** 

- Builder：为创建一个Product对象的各个部件指定的抽象接口
- ConcreteBuilder：具体建造者，实现Builer接口，构造和装配各个部件
- Product：具体产品
- Director：指挥者，是构建一个使用Builer接口的对象

**适用场景：**

- 需要生成的对象具有复杂的内部结构
- 需要生成的对象内部属性本身相互依赖

**优点：**

- 建造者独立，易扩展
- 便于控制细节风险

**缺点：**

- 要求构建产品的步骤（算法）是不能剧烈变化的，最好是不变的，影响了灵活度
- 如果产品的内部变化复杂，可能会导致需要定义很多具体建造者类来实现内部复杂的变化，导致系统变得很庞大