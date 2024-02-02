---
slug: /tech/theory/design-pattern/prototype
tags: ["设计模式"]
date: 2024-01-31T19:04
---
# 原型模式(Prototype)

**定义：**用原型实例指定创建对象的种类，并通过拷贝这些原型创建新的对象，其实就是从一个对象再创建另外一个可定制的独享，而且

不需要知道任何创建的细节

**类型：** 创建型

**类图：**

![image-20210510195925892](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/DesignPattern/Prototype.png)

**组件说明：**

- Prototype：原型类，声明一个克隆自身的接口
- ConcretePrototype：具体原型类，实现一个克隆自身的操作
- Client：让一个原型克隆自身，从而创建一个新的对象

**适用场景：**

- 资源优化场景。

- 类初始化需要消化非常多的资源，这个资源包括数据、硬件资源等。 

- 性能和安全要求的场景。 

- 通过 new 产生一个对象需要非常繁琐的数据准备或访问权限，则可以使用原型模式。 

- 一个对象多个修改者的场景。

- 一个对象需要提供给其他对象访问，而且各个调用者可能都需要修改其值时，可以考虑使用原型模式拷贝多个对象供调用者使用。 

- 在实际项目中，原型模式很少单独出现，一般是和工厂方法模式一起出现，通过 clone 的方法创建一个对象，然后由工厂方法提供给

  调用者。原型模式已经与 Java 融为浑然一体，大家可以随手拿来使用。

**优点：**

- 性能提高
- 逃避构造函数的约束

**缺点：**

- 配备克隆方法需要对类的功能进行通盘考虑，这对于全新的类不是很难，但对于已有的类不一定很容易，特别当一个类引用不支持串

  行化的间接对象，或者引用含有循环结构的时候。

-  必须实现 Cloneable 接口。

**注意事项：**

- 与通过对一个类进行实例化来构造新对象不同的是，原型模式是通过拷贝一个现有对象生成新对象的。浅拷贝实Cloneable，

  重写，深拷贝是通过实现 Serializable 读取二进制流

- 与单例模式冲突，因为clone可以突破构造器的设置

## 浅拷贝

**定义：** 被赋值对象的所有变量都含有与原来对象相同的值，而所有的对其他对象的引用都仍然指向原来的对象

## 深拷贝

### 使用Clone实现简单的深拷贝

**定义：** 把引用对象的变量指向复制过的新对象，而不是原有的被引用过的对象

让引用对象实现Cloneable方法

```java
@Override
protected Object clone() throws CloneNotSupportedException {
    Resume resume = null;
    resume = (Resume) super.clone();
    resume.workExperience = (WorkExperience)this.workExperience.clone();
    return resume;
}
```

### 使用序列化对象实现深拷贝

```java
public Object deepClone() {
    ByteArrayOutputStream bos = null;
    ByteArrayInputStream bis = null;
    ObjectOutputStream oos = null;
    ObjectInputStream ois = null;
    //创建序列化流
    bos = new ByteArrayOutputStream();
    oos = new ObjectOutputStream(bos);
    //将当前对象以对象流的方式输出
    oos.writeObject(this);

    //创建反序列化流
    bis = new ByteArrayInputStream(bos.toByteArray());
    ois = new ObjectInputStream(bis);
    return ois.readObject();

}
```

