---
slug: /tech/theory/design-pattern/uml
tag: ["设计模式","UML"]
date: 2024-01-31T19:04
---
# UML类图

## 依赖

只要是在类中用到了对方，那么他们之间就存在依赖关系。如果没有对方，连编绎都通过不了

符号：虚线普通箭头

```java
public class PersonServiceBean { 
    private PersonDao personDao;//类 
    public void save(Person person){} 
    public IDCard getIDCard(Integer personid){} 
    public void modify(){ 
        Department department = new Department(); 
    } 
} 
public class PersonDao{} 
public class IDCard{}
public class Person{} 
public class Department{} 
```

![image-20201217221642243](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/%E7%B1%BB%E5%9B%BE--%E4%BE%9D%E8%B5%96%E5%85%B3%E7%B3%BB.png)

1. 类中用到了对方

2. 如果是类的成员属性 

3. 如果是方法的返回类型 

4. 是方法接收的参数类型 

5. 方法中使用到

## 泛化

泛化关系实际上就是继承关系，他是依赖关系的特例 

符号：实线空心三角

![image-20201217221715013](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/UML%E7%B1%BB%E5%9B%BE%E2%80%94%E2%80%94%E6%B3%9B%E5%8D%8E.png)

```java
public abstract class DaoSupport{ 
    public void save(Object entity){ } 
    public void delete(Object id){ } 
}
public class PersonServiceBean extends Daosupport{ } 
```

1. 泛化关系实际上就是继承关系 

2. 如果A类继承了B类，我们就说A和B存在泛化关系

## 实现

实现关系实际上就是A类实现B接口，他是依赖关系的特例 

符号：虚线空心三角

![image-20201217221740415](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/UML%E7%B1%BB%E5%9B%BE%E2%80%94%E2%80%94%E5%AE%9E%E7%8E%B0.png)

```java
public interface PersonService { 
    public void delete(Interger id);
} public class PersonServiceBean implements PersonService {
    public void delete(Interger id){} 
} 
```

## 关联

关联关系实际上就是类与类之间的联系，他是依赖关系的特例 

关联具有导航性：即双向关系或单向关系 

关系具有多重性：如“1”（表示有且仅有一个），“0...”（表示0个或者多个）， “0，1”（表示0个或者一

个），“n...m”(表示n到 m个都可以),“m...*”（表示至少m 个）。 

![image-20201217221819759](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/UML%E7%B1%BB%E5%9B%BE%E2%80%94%E2%80%94%E5%85%B3%E8%81%94.png)

```java
//单向一对一关系
public class Person { 
    private IDCard card; 
} public class IDCard{} 
//双向一对一关系 
public class Person { 
    private IDCard card; 
} public class IDCard{
    private Person person 
}
```

## 聚合

聚合关系（Aggregation）表示的是整体和部分的关系，整体与部分可以分开。聚 合关系是关联关系的特例，所以

他具有关联的导航性与多重性

符号：实线空心菱形 

如：一台电脑由键盘(keyboard)、显示器(monitor)，鼠标等组成；组成电脑的各个 配件是可以从电脑上分离出来

的，使用带空心菱形的实线来表示

![image-20201217221843876](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/UML%E7%B1%BB%E5%9B%BE%E2%80%94%E2%80%94%E8%81%9A%E5%90%88.png)

## 组合

组合关系：也是整体与部分的关系，但是整体与部分不可以分开。

符号：实线实心菱形 

再看一个案例：在程序中我们定义实体：Person与IDCard、Head, 那么 Head 和 Person 就是 组合，IDCard 和 

Person 就是聚合。

但是如果在程序中Person实体中定义了对IDCard进行级联删除，即删除Person时 连同IDCard一起删除，那么

IDCard 和 Person 就是组合了.

![image-20201217221920967](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/UML%E7%B1%BB%E5%9B%BE%E2%80%94%E2%80%94%E7%BB%84%E5%90%88.png)

```java
public class Person{ 
    private IDCard card;
    private Head head = new Head();
} 
public class IDCard{} 

public class Head{}
```
