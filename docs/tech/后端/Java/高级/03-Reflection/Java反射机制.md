---
slug: /tech/backend/java/high/reflect
tags: ["java","反射"]
date: 2024-01-31T20:04
---
# Java反射机制

## 概述

- **Reflection(反射)**是被视为**动态语言**的关键，反射机制允许程序在执行期间借助于Reflection API取得任何类的内部消息，并能直接操作任意对象的内部属性及方法
- 加载完类后，在堆内存的方法区会产生一个Class对象（一个类只有一个），这个对象包含了类的完整结构信息
- 正常方式：引入需要的'包类'名称 ->通过new实例化 -> 取得实例化对象
- 反射方式：实例化对象 -> getClass()方法 -> 得到完整的'包类'名称

### Java反射提供的功能

- 运行时判断任意一个对象所属的类
- 运行时构造任意一个类的对象
- 运行时判断任意一个类所拥有的成员变量和方法
- 运行时判断获取泛型信息
- 运行时调用任意一个对象的成员变量和方法
- 运行时处理注解
- 动态代理

反射相关的主要API

- java.lang.Class：代表一个类
- java.lang.reflect.Method：代表类的方法
- java.lang.reflect.Field：代表类的成员变量
- java.lang.reflect.Construction：代表类的构造器

==反射解决能不能调，封装是建议怎么调==

## 理解Class类并获取Class实例

### 初步运用

```java
@Test
public void test2() throws Exception {
    Class clazz = Person.class;
    //1.通过反射创建Person对象
    Constructor constructor = clazz.getConstructor(String.class, int.class);
    Person p = (Person)constructor.newInstance("Tom", 12);
    System.out.println(p.toString());
    //通过反射，调用对对象指定的属性、方法
    //调用属性
    Field age = clazz.getDeclaredField("age");
    age.set(p,10);
    System.out.println(p.toString());
    //调用方法
    Method show = clazz.getDeclaredMethod("show");
    show.invoke(p);
    System.out.println("*****************");
    //通过反射，可以调用类的私有结构
    //调用私有的方法
    Constructor cons1 = clazz.getDeclaredConstructor(String.class);
    cons1.setAccessible(true);
    Person p1 = (Person) cons1.newInstance("Jerry");
    System.out.println(p1);
    //调用私有的属性
    Field name = clazz.getDeclaredField("name");
    name.setAccessible(true);
    name.set(p1,"韩坤");
    System.out.println(p1);
    //调用私有的方法
    Method showNation = clazz.getDeclaredMethod("showNation", String.class);
    showNation.setAccessible(true);
    String nation = (String) showNation.invoke(p1,"中国");
}
```

### 类的加载过程

> 程序经过javac.exe命令以后，会生成一个或多个字节码文件(.class结尾)
>
> 接着我们使用java.exe命令对某个字节码文件进行解释运行。相当于将某个字节码文件加载到内存中。此过程就称
>
> 为类的加载。加载到内存的类，我们就称为运行时类，此运行时类，就作为Class的一个实例

**加载到内存的运行时类，会缓存一定时间。在此时间之内，我们可以通过不同方式获取此运行时类**

### 获取Class实例的方式(四种)

```java
public void test03() throws Exception {
    //方式一:调用运行时类的属性 .class
    Class clazz = Person.class;
    //方式二：通过运行时类的对象
    Person p=new Person();
    Class clazz2 = p.getClass();
    //方式三:调用Class的静态方法，forName(String classpath)
    Class clazz3 = Class.forName("com.starrysky.java.Person");
    //方式四：使用类的加载器(了解)
    ClassLoader classLoader = ReflectionTest.class.getClassLoader();
    Class clazz4 = classLoader.loadClass("com.starrysky.java.Person");
}
```

## 类的加载与ClassLoader的理解

### 类的加载过程

类的加载  => 类的链接 => 类的初始化

> 类的加载：将类的class文件读入内存，并为之创建一个java.lang.Class对象。此过程由类加载器完成
>
> 类的链接：将类的二进制数据合并到JRE中
>
> 类的初始化：JVM负责对类进行初始化

### ClassLoader

#### 类加载器

![1590255619384](https://java-learnhk.oss-cn-beijing.aliyuncs.com/reflection/%E7%B1%BB%E5%8A%A0%E8%BD%BD.png)



#### 读取配置文件的两种方式

```java
Properties properties = new Properties();
//此时文件默认在当前module下
//读取配置文件方式一，默认在当前模块找
FileInputStream inputStream = new FileInputStream("jdbc.properties");
properties.load(inputStream);
//读取配置文件方式二，默认在当前module的src下
ClassLoader classLoader = ClassLoaderTest.class.getClassLoader();
InputStream stream = classLoader.getResourceAsStream("jdbc1.properties");
properties.load(stream);
String user = properties.getProperty("user");
String password = properties.getProperty("password");
System.out.println(user+"  "+password);
```



## 创建运行时类的对象

`newInstance()`：调用此方法，创建对应的运行时类的对象, 要求运行时类必须提供空参的构造器 空参的构造器访问权限得够

```java
Class clazz = Person.class;
Person o = (Person) clazz.newInstance();
```



## 获取运行时类的完整结构(了解)

### 属性

获取属性结构

|        方法         |                          作用                          |
| :-----------------: | :----------------------------------------------------: |
|     getFields()     |  获取当前运行时类及其父类中声明为public访问权限的属性  |
| getDeclaredFields() | 获取当前运行时类声明的所有属性(不考虑权限)，不包含父类 |

获取权限修饰符、数据类型、变量名

| 方法           | 作用                     |
| -------------- | ------------------------ |
| getModifiers() | 获取当前属性的权限修饰符 |
| getType()      | 获取当前属性的数据类型   |
| getName()      | 获取当前属性名           |

示例

```java
Class clazz = Person.class;
Field[] declaredFields = clazz.getDeclaredFields();
for(Field f:declaredFields) {
    //权限修饰符
    int modifiers = f.getModifiers();
    //获取到的为属性，通过Modifier.toString()转为对应的类型
    System.out.print(Modifier.toString(modifiers)+"\t");
    //数据类型
    Class<?> type = f.getType();
    System.out.print(type.getName()+"\t");
    //变量名
    String name = f.getName();
    System.out.println(name+"\t");
    System.out.println();
}
```

### 方法

| 方法                 | 作用                                                   |
| :------------------- | :----------------------------------------------------- |
| getMethods()         | 获取当前运行时类及其父类中声明为public访问权限的方法   |
| getDeclaredMethods() | 获取当前运行时类声明的所有方法(不考虑权限)，不包含父类 |
| getModifiers()       | 获取方法的权限修饰符                                   |
| getReturnType()      | 获取方法的返回值类型                                   |
| getName              | 获取方法的方法名                                       |
| getParameterTypes()  | 获取方法的参数列表                                     |
| getExceptionTypes()  | 获取方法抛出的异常                                     |

### 构造器

| 方法                      | 作用                                   |
| ------------------------- | -------------------------------------- |
| getConstructors()         | 获取当前运行时类中声明为public的构造器 |
| getDeclaredConstructors() | 获取当前运行时类中所有的构造器         |

### 父类与泛型

| 方法                   | 作用                   |
| ---------------------- | ---------------------- |
| getSuperclass()        | 获取运行时父类         |
| getGenericSuperclass() | 获取运行时带泛型的父类 |

案例:获取运行时类带泛型父类的泛型

```java
//获取运行时类带泛型父类的泛型
public void text04(){
    Class clazz = Person.class;
    //获取父类类型
    Type type = clazz.getGenericSuperclass();
    //转换
    ParameterizedType parameterizedType = (ParameterizedType) type;
    //获取泛型类型
    Type[] actualTypeArguments = parameterizedType.getActualTypeArguments();
    //两种方式
    //  System.out.println(((Class)actualTypeArguments[0]).getName());
    System.out.println(actualTypeArguments[0].getTypeName());
    System.out.println(type);
}	
```

### 接口、包、类注解

| 方法             | 作用                   |
| ---------------- | ---------------------- |
| getInterfaces()  | 获取运行时类实现的接口 |
| getPackage()     | 获取运行时类所在的包   |
| getAnnotations() | 获取运行时类的注解     |



## 获取运行时类的指定结构

### 属性

| 方法                          | 作用                                       |
| ----------------------------- | ------------------------------------------ |
| getField(String name)         | 获取属性值为name的字段，只能获取到public   |
| id.set(Ocject o,Object value) | 给当前字段设置值，指明为o的对象，值为value |
| getDeclaredField(String name) | 获取属性值为name的字段                     |
| setAccessible(true)           | 开启修改权限                               |

### 方法

| 方法                                         | 作用                                                         |
| -------------------------------------------- | ------------------------------------------------------------ |
| getDeclaredMethod(String name,Class[] class) | 获取方法名为name,形参列表为class的方法                       |
| invoke(Object o,Object... args)              | 调用方法，o：方法调用者，args：给形参赋值的实参,incoke()方法返回值即为方法的返回值 |

调用静态方法

```java
Method showDesc = clazz.getDeclaredMethod("showDesc");
showDesc.setAccessible(true);
showDesc.invoke(Person.class);
```



## 反射的应用：动态代理

### 代理设计模式的原理

使用一个代理将对象包装起来，然后用该代理对象取代原始对象。任何对原始对象的调用都要通过代理。代理对象决定是否以及何时将方法调用转到原始对象上

**动态代理**

动态代理是指客户通过代理类来调用其他对象的方法，并且是在程序运行时根据需要动态创建目标类的代理对象

### 静态代理举例

```java
interface ClothFactory {
    void produceCloth();
}
//代理类
class ProxyClothFactory implements  ClothFactory{
    private ClothFactory factory;//就拿被代理类对象进行实例化

    public ProxyClothFactory(ClothFactory factory){
        this.factory=factory;
    }
    @Override
    public void produceCloth() {
        System.out.println("代理工厂做准备工作");
        factory.produceCloth();
        System.out.println("代理工厂做收尾工作");
    }
}
//被代理类
class NikeClothFactory implements ClothFactory{

    @Override
    public void produceCloth() {
        System.out.println("耐克工厂生产运动服");
    }
}
public class StaticProxyTest{
    public static void main(String[] args) {
        //创建被代理类的对象
        ClothFactory nike = new NikeClothFactory();
        //创建代理类的对象
        ClothFactory proxyClothFactory = new ProxyClothFactory(nike);
        proxyClothFactory.produceCloth();
    }
}
```

### 动态代理实例

```java
interface Human{
    String getBelief();
    void eat(String food);
}
//被代理类
class SuperMan implements Human{

    @Override
    public String getBelief() {
        return "I believe I can fly";
    }

    @Override
    public void eat(String food) {
        System.out.println("我喜欢吃"+food);
    }
}
/*
要想实现动态代理，需要解决的问题
问题一: 如何根据加载到内存的被代理类，动态的创建一个代理类及对象
问题二：当通过代理类的对象调用方法时，如何动态的去调用被代理类中的同名方法
 */
class ProxyFactory{
    //调用此方法，返回一个代理类的对象
    public static Object getProxyInstance(Object obj){//obj:被代理类的对象
        MyInvocationHandler handler = new MyInvocationHandler();
        //绑定obj
        handler.bind(obj);
        //参数一：当前被代理类对象的类加载器，
        //参数二：当前被代理类对象实现的所有接口
        //参数三:动态的通过代理类调用被代理类的同名方法，解决问题二
        return Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj.getClass().getInterfaces(), handler);

    }
}
class MyInvocationHandler implements InvocationHandler{
    //当通过代理类的对象调用方法a时，就会自动的调用如下这个方法
    //将被代理类要执行的方法a的功能声明在invoke()中
    private Object obj;//需要使用被代理类的对象赋值
    public void bind(Object obj) {
        this.obj=obj;
    }
    @Override
    //proxy:代理类对象
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        //method:即为代理类对象调用的方法，此方法也就作为了被代理类对象要调用的方法
        //obj，被代理类对象
        Object returnValue = method.invoke(obj, args);
        //被代理类对象调用方法的返回值,作为invoke()返回值
        return returnValue;
    }
}
public class ProxyTest {
    public static void main(String[] args) {
        SuperMan superMan = new SuperMan();
        //proxyInstance：代理类对象
        Human proxyInstance  = (Human) ProxyFactory.getProxyInstance(superMan);
        //当通过代理类对象调用方法时，会自动的调用被代理类中同名的方法
        String belief = proxyInstance.getBelief();
        System.out.println(belief);
        proxyInstance.eat("好吃的");

    }
}
```

### AOP动态代理简单实现

```java
//改造于动态代理实例代码
.....
//相当于切面
class HumanUitl{
    public void method1() {
        System.out.println("=====================通用方法一============");
    }
    public void method2() {
        System.out.println("=====================通用方法二============");
    }
}
//
//proxy:代理类对象
public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
    HumanUitl humanUitl = new HumanUitl();
    humanUitl.method1();
    //method:即为代理类对象调用的方法，此方法也就作为了被代理类对象要调用的方法
    //obj，被代理类对象
    Object returnValue = method.invoke(obj, args);
    //被代理类对象调用方法的返回值,作为invoke()返回值
    humanUitl.method2();
    return returnValue;
}
```