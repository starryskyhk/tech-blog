---
slug: /tech/backend/java/high/new-feature
tag: ["java","java新特性"]
date: 2024-01-31T20:04
author: starrysky
---
# Java新特性

## Java8

### 新特性简介

- 速度更快
- 代码更少
- 强大的Stream API
- 便于并行
- 最大化减少空指针异常
- Nashorn引擎，

### 新特性

- **Lambda表达式**
- **函数式接口**
- **方法引用和构造器引用**
- **StreamAPI**
- **Optional类**
- **新的日期API**

### Lambda表达式

Lambda本质：作为函数式接口的实例

使用箭头函数

```java
public void test1(){
    Runnable r1 = new Runnable() {
        @Override
        public void run() {
            System.out.println("dddd");
        }
    };
    r1.run();
    System.out.println("*****");
    //lambda表达式
    Runnable r2 = ()->System.out.println("lambda");
    r2.run();

    Comparator<Integer> com1 = new Comparator<Integer>() {
        @Override
        public int compare(Integer o1, Integer o2) {
            return Integer.compare(o1,o2);
        }
    };
    //lambda写法
    Comparator<Integer> com2 = (o1, o2) -> Integer.compare(o1,o2);
    //方法引用
    Comparator<Integer> com3 = Integer::compare;
}
```

#### 语法格式

**语法格式一：无参，无返回值**

```java
Runnable t1 = ()->System.out.println("dddd");
```

**语法格式二：一个参数，无返回值**

```java
Consumer<String> con2 = (String s)->System.out.println(s);
```

**语法格式三：数据类型可省略**

```java
Consumer<String> con2 = (s)->{System.out.println(s);};
```

**语法格式四：Lambda 若只需要一个参数时，参数的小括号可以省略**

```java
Consumer<String> con2 = s->{System.out.println(s);};
```

**语法格式五：Lambda 需要两个或以上的参数，多条执行语句，并且可以有返回值**

```java
Comparator<Integer> com2 = (o1,o2)->{
    System.out.println(o1);
    System.out.println(o2);
    return o1.compareTo(o2);
};
```

**语法格式六：当 Lambda 体只有一条语句时，return 与大括号若有，都可以省略**

```java
//只有一条语句时，则可以省略{}，若该条语句为返回值，则省略{}的同时必须省略return
Comparator<Integer> com2 = (o1,o2)->o1.compareTo(o2);
```

### 函数式接口(Functional)

如果一个接口中只声明了一个方法，则此接口称为函数式接口

```java
//@FunctionalInterface表示这个接口为函数式接口
@FunctionalInterface
public interface MyInterface {
    void getName(String name);
}

MyInterface myInterface = name -> System.out.println("My name is " + name);
```

#### Java内置四大核心函数式接口

|        函数式接口         | 参数类型 | 返回类型 |                             用途                             |
| :-----------------------: | :------: | :------: | :----------------------------------------------------------: |
|  Consumer<T> 消费型接口   |    T     |   void   |     对类型为T的对象应用操作，包含方法： void accept(T t)     |
|  Supplier<T> 供给型接口   |    无    |    T     |           T 返回类型为T的对象，包含方法：T get() R           |
| Function<T, R> 函数型接口 |    T     |    R     | 对类型为T的对象应用操作，并返回结果。结 果是R类型的对象。包含方法：R apply(T t) |
|  Predicate<T> 断定型接口  |    T     | boolean  | 确定类型为T的对象是否满足某约束，并返回 boolean 值。包含方法：boolean test(T t) |

#### 其他接口

![image-20201217144406450](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/java8%E6%96%B0%E7%89%B9%E6%80%A7%E5%87%BD%E6%95%B0%E5%BC%8F%E6%8E%A5%E5%8F%A3(%E5%85%B6%E4%BB%96%E6%8E%A5%E5%8F%A3).png)

```java
//消费型接口
public void test01(){
    happyTime(500,money->System.out.println("money:"+money));
}
public void happyTime(double money, Consumer<Double> con){
    con.accept(money);
}
//断定型接口
public void test2(){
    List<String> list = Arrays.asList("北京","南京","成都");
    ArrayList list2 = filterString(list, s -> s.contains("京"));
}
//根据给定的规则过滤字符串，此规则由Predicate的方法决定
public ArrayList filterString(List<String> list, Predicate<String> pre){
    ArrayList<String> filterList= new ArrayList<>();
    for(String s:list){
        if(pre.test(s)){
            filterList.add(s);
        }
    }
    return filterList;
}
```

### 方法引用与构造器引用

#### 方法引用

- 当要传递给Lambda体的操作，已经有实现的方法了，可以使用方法引用！

- 方法引用可以看做是Lambda表达式深层次的表达。换句话说，方法引用就 是Lambda表达式，也就是函数式接扣的一个实例，通过方法的名字来指向 一个方法，可以认为是Lambda表达式的一个语法糖。
- 要求：实现接口的抽象方法的参数列表和返回值类型，必须与方法引用的方法的参数列表和返回值类型保持一致！**（针对下面的情况一和情况二）**
- 格式：使用操作符“::” 将类(或对象) 与方法名分隔开来。如下三种主要使用情况：
  - 对象::实例方法名
  - 类::静态方法名
  - 类::实例方法名	

##### 对象::实例方法名

```java
// 情况一：对象 :: 实例方法
//Consumer中的void accept(T t)
//PrintStream中的void println(T t)
//因为accept和println的形参一样，并且都是输出语句的功能，所以可使用方法引用
	Consumer<String> con2 = System.out::println;
	con1.accept("ddd");
//=============2===============
//Supplier中的T get()
//Employee中的String getName()
public void test2() {
    Employee emp = new Employee(1001, "Tom", 23, 6200);
    Supplier<String> sup1 = () -> emp.getName();
    System.out.println(sup1.get());
    //方法引用
    Supplier<String> sup2 = emp::getName;
    System.out.println(sup2.get());
}
```

##### 类::静态方法名

```java
// 情况二：类 :: 静态方法
//Comparator中的int compare(T t1,T t2)
//Integer中的int compare(T t1,T t2)
public void test3() {
    Comparator<Integer> com1 = (t1, t2) -> Integer.compare(t1, t2);
    System.out.println(com1.compare(12, 21));
    //方法引用
    Comparator<Integer> com2 = Integer::compare;
}
//=============2===============
//Function中的R apply(T t)
//Math中的Long round(Double d)
public void test4() {
    //这里使用Math.round,形参一样，并且都是要使用这个功能，所以可实用方法用
    Function<Double, Long> func1 = d -> Math.round(d);
    System.out.println(func1.apply(12.5));
    Function<Double, Long> func2 = Math::round;
    //方法引用
    System.out.println(func2.apply(13.9));
}
```

##### 类::实例方法名	

```java
// 情况三：类 :: 实例方法 (有难度)
// Comparator中的int comapre(T t1,T t2)
// String中的int t1.compareTo(t2)
//第一个参数是作为调用者出现的，也可以使用方法引用
public void test5() {
    Comparator<String> comparator1 = (s1, s2) -> s1.compareTo(s2);
    System.out.println(comparator1.compare("abc", "vc"));
    //方法引用,第一个
    Comparator<String> comparator2 = String::compareTo;
    System.out.println(comparator2.compare("abc", "abc"));
}
//=============2===============
//BiPredicate中的boolean test(T t1, T t2);
//String中的boolean t1.equals(t2)
public void test6() {
    BiPredicate<String,String> pre1 = (s1,s2)->s1.equals(s2);
    System.out.println(pre1.test("abc", "abc"));
    //方法引用
    BiPredicate<String,String> pre2 = String::equals;
    System.out.println(pre2.test("ab1", "abc"));
}
```

#### 构造器引用

和方法引用类似，函数式接口的抽象方法的**形参列表和构造器形参列表一致**

抽象方法的返回值类型即为构造器所属的类的类型。

```java
Supplier<Employee> sup =()->new Employee();
//构造器引用
Supplier<Employee> sup2 = Employee::new;
//========2=======
Function<Integer, Employee> func = id->new Employee(id);
Function<Integer,Employee> func2 = Employee::new;
//========3=======
BiFunction<Integer,String,Employee> func = (id,name)->new Employee(id,name);
BiFunction<Integer,String,Employee> func2 = Employee::new;
```

#### 数组引用

将数组看作是一个特殊的类

```java
Function<Integer,String[]> func = length->new String[length];
String[] apply = func.apply(5);
System.out.println(Arrays.toString(apply));
Function<Integer,String[]> fun = String[]::new;
```

### StreamAPI

java8中两大最为重要的改变。第一个是Lambda，一个是StreamAPI。

- Stream API ( java.util.stream) 把真正的函数式编程风格引入到Java中。让程序员写出高效率、干净、简洁的代码。

- Stream 是 Java8 中处理集合的关键抽象概念，它可以指定你希望对集合进 行的操作，可以执行非常复杂的查找、过滤和映射数据等操作。**使用 Stream API 对集合数据进行操作，就类似于使用 SQL 执行的数据库查询**。 也可以使用 Stream API 来并行执行操作。简言之，Stream API 提供了一种 高效且易于使用的处理数据的方式。

#### Stream概述

Stream是数据渠道，用于操作数据源(集合，数组等)所生成的元素序列。

集合讲究的是数据，Stream讲究的是计算。

==注意==

- Stream 自己不会存储元素。 
- Stream 不会改变源对象。相反，他们会返回一个持有结果的新Stream。
- Stream 操作是延迟执行的。这意味着他们会等到需要结果的时候才执行

#### Stream操作步骤

![image-20201217160154309](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/Stream%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4.png)

#### Stream的创建

创建Stream方式一：通过集合

```java
List<Employee> employees = EmployeeData.getEmployees();
//串行流
Stream<Employee> stream = employees.stream();
//并行流
Stream<Employee> employeeStream = employees.parallelStream();
```

创建Stream方式二：通过数组

```java
int[] arr = new int[]{1,2,3,4,56};
//基本数据类型会有对应的流，例如LongStream等
IntStream stream = Arrays.stream(arr);
Employee e1 = new Employee();
Employee e2 = new Employee();
Employee[] employees = new Employee[]{e1,e2};
Stream<Employee> stream1 = Arrays.stream(employees);
```

创建Stream方式三：通过Stream的of()

```java
Stream<Integer> integerStream = Stream.of(1, 2, 3, 4);
```

创建Stream方式四：通过集合创建无限流

```java
//遍历前10个偶数,通过迭代的方式
Stream.iterate(0,t->t+2).limit(10).forEach(System.out::println);
//通过生成的方式
Stream.generate(Math::random).limit(10).forEach(System.out::println);
```

#### Stream的中间操作

##### 筛选与切片

| 方法                | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| filter(Predicate p) | 接收 Lambda ，从流中排除某些元素 distinct()                  |
| limit(long maxSize) | 截断流，使其元素不超过给定数量 skip(long n)                  |
| skip(n)             | d跳过元素，返回一个扔掉了前 n 个元素的流。若流中元素不足 n 个，则返回一 个空流。与 limit(n) 互补 |
| distinct()          | 筛选，通过流所生成元素的 hashCode() 和 equals() 去除重复元素 |

过滤

```java
List<Employee> list = EmployeeData.getEmployees();
//    filter(Predicate p) 接收 Lambda ，从流中排除某些元素 distinct()
Stream<Employee> stream = list.stream();
stream.filter(e->e.getSalary()>7000).forEach(System.out::println);
```

截断

```java
list.stream().limit(3).forEach(System.out::println);
```

跳过元素

```java
list.stream().skip(3).forEach(System.out::println);
```

筛选(去重

```java
list.stream().distinct().forEach(e->System.out.println(e));
```

##### 映射

![image-20201217174627102](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/StreamAPI%E6%98%A0%E5%B0%84.png)

```java
//映射
public void test02(){
    //map(Function f) 接收一个函数作为参数，该函数会被应用到每个元素上，并将其映射成一个新的元素
    List<String> list = Arrays.asList("aa", "bb", "cc", "dd");
    list.stream().map(str->str.toUpperCase()).forEach(System.out::println);

    //练习1:获取员工姓名长度大于3的员工姓名
    List<Employee> employees = EmployeeData.getEmployees();
    employees.stream().map(Employee::getName).filter(name->name.length()>3).forEach(System.out::println);
    //练习2：map和flatMap的区别
    //map相当于list中套list
    Stream<Stream<Character>> streamStream = list.stream().map(StreamAPIMiddleTest::fromStringToStream);
    //相当于两层循环
    streamStream.fofrEach(s->{
        s.forEach(System.out::println);
    });
    //flatMap相当于把list中的数据加入到另一个list中，而不是直接把list加进去
    Stream<Character> streamStream2 = list.stream().flatMap(StreamAPIMiddleTest::fromStringToStream);
    //直接一层即可取到
    streamStream2.forEach(System.out::println);
    //flatMap(Function f)接收一个函数作为参数，将流中的每个值都换成另 一个流，然后把所有流连接成一个流
}

//将字符串中多个字符构成的集合，转换为对应的Stream实例
public static Stream<Character> fromStringToStream(String str){
    ArrayList<Character> list = new ArrayList<>();
    for(Character c:str.toCharArray()){
        list.add(c);
    }
    return list.stream();
}
```

##### 排序

```java
public void test03(){
    //sorted-----自然排序
    List<Integer> list = Arrays.asList(12,78,0,2);
    list.stream().sorted().forEach(System.out::println);
    //抛异常，原因;Employee没有实现Comparable接口
    List<Employee> employees = EmployeeData.getEmployees();
    //        employees.stream().sorted().forEach(System.out::println);
    //sorted(Comparator com)-----定制排序
    employees.stream().sorted((e1,e2)-> Integer.compare(e1.getAge(),e2.getAge())).forEach(System.out::println);
    //优化写法
    employees.stream().sorted(Comparator.comparingInt(Employee::getAge)).forEach(System.out::println);
}
```

##### 终止

1、匹配与查找

![image-20201217184318705](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/StreamAPI%E7%BB%88%E6%AD%A2-%E5%8C%B9%E9%85%8D%E4%B8%8E%E6%9F%A5%E6%89%BE1.png)

![image-20201217184355132](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/StreamAPI%E7%BB%88%E6%AD%A2-%E5%8C%B9%E9%85%8D%E4%B8%8E%E6%9F%A5%E6%89%BE2.png)

```java
List<Employee> employees = EmployeeData.getEmployees();
//        allMatch(Predicate p) 检查是否匹配所有元素,所有的都是true才是true
boolean allMatch = employees.stream().allMatch(e -> e.getAge() > 18);
//        anyMatch(Predicate p) 检查是否至少匹配一个元素
boolean anyMatch = employees.stream().anyMatch(e -> e.getSalary() > 10000);
//        noneMatch(Predicate p) 检查是否没有匹配所有元素
boolean noneMatch = employees.stream().noneMatch(e -> e.getName().startsWith("雷"));
//        findFirst() 返回第一个元素
Optional<Employee> employee = employees.stream().findFirst();
//        findAny() 返回当前流中的任意元素
Optional<Employee> employee1 = employees.parallelStream().findAny();
//        count() 返回流中元素总数
long count = employees.stream().filter(e -> e.getSalary() > 5000).count();
//        max(Comparator c) 返回流中最大值
Optional<Double> max = employees.stream().map(Employee::getSalary).max(Double::compare);
//        min(Comparator c) 返回流中最小值
Optional<Employee> min = employees.stream().min(Comparator.comparingDouble(Employee::getSalary));
//        forEach(Consumer c)内部迭代
employees.stream().forEach(System.out::println);
//外部迭代
employees.forEach(System.out::println);
```

2、归约、

![image-20201217185344603](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/StreamAPI%E7%BB%88%E6%AD%A2-%E5%BD%92%E7%BA%A6.png)

```java
public void test03(){
    //reduce(T iden, BinaryOperator b) 可以将流中元素反复结合起来，得到一 个值。返回 T
    //练习1：计算1-10的自然数的和
    List<Integer> list = Arrays.asList(1,2,3,4,5,6,7,8,9,10);
    Integer sum = list.stream().reduce(0, Integer::sum);
    //reduce(BinaryOperator b)可以将流中元素反复结合起来，得到一 个值。返回 Optional<T>
    //练习2：计算公司所有员工工资的总和
    List<Employee> employees = EmployeeData.getEmployees();
    Optional<Double> reduce = employees.stream().map(Employee::getSalary).reduce(Double::sum);
}
```

3、收集

![image-20201217185418238](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/StreamAPI%E7%BB%88%E6%AD%A2-%E6%94%B6%E9%9B%86.png)

```java
public void test04(){
    //collect(Collector c)将流转换为其他形式。接收一个 Collector 接口的实现，用于给Stream中元素做汇总 的方法
    //练习1：查找工资大于6000的员工，结果返回一个List或Set
    List<Employee> employees = EmployeeData.getEmployees();
    List<Employee> collect = employees.stream().filter(e -> e.getSalary() > 6000).collect(Collectors.toList());

}
```

### Optional类

Optional<T> 类(java.util.Optional) 是一个容器类，它可以保存类型T的值，代表 这个值存在。或者仅仅保存

null，表示这个值不存在。原来用 null 表示一个值不 存在，现在 Optional 可以更好的表达这个概念。并且可以避

免空指针异常

![	](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/Optional%E7%B1%BB%E5%B8%B8%E7%94%A8%E6%96%B9%E6%B3%95.png)

```java
//Boy类中，Girl类为成员变量
public void test2() {
    Girl girl = new Girl();
    girl=null;
    //ofNullable可以为空
    Optional<Girl> girl1 = Optional.ofNullable(girl);
    //如果 当前Optional 内部封装的是非空的，则正常返回，否则返回备用的
    Girl g = girl1.orElse(new Girl("ddd"));
    System.out.println(g);
}
```

```java
public String getGirlName3(Boy boy){
    Optional<Boy> boyOptional = Optional.ofNullable(boy);
    //此时boy1一定非空
    Boy boy1 = boyOptional.orElse(new Boy(new Girl("dd2")));
    Girl girl = boy1.getGirl();
    Optional<Girl> girlOptional = Optional.ofNullable(girl);
    Girl girl1 = girlOptional.orElse(new Girl("dd3"));
    return girl1.getName();
}
```

### 新的时间API

[java日期时间处理](./Java中的时间处理（jdk8之前以及之后）.md)



[Java日期时间处理](https://blog.csdn.net/qq_40500437/article/details/111500729)



### 接口增强

除了定义全局常量(final static), 和抽象方法abstract之外，还可以定义静态方法、默认方法

接口中定义的静态方法，只能通过接口来调用。即接口中的静态方法根本不是想让实现类去继承，只是想让接口自己用。

调用接口中的默认方法（非静态方法） ：在接口和方法间加关键字super即可 

```java
public interface MyInterface {
    String NAME = "10";

    public static void staticMethod() {
        System.out.println("This is a static method");
    }
    
    default void defaultMethod() {
        System.out.println("This is a default method");
    }
}
```

## Java9

### 新特性

红色：重要改变

绿色：语法改变

黄色：API改变

- <p style = "color:red">模块化系统</p>

- <p style = "color:red">jShell命令</p>

- 多版本兼容jar包

- <p style = "color:green">接口的私有方法<p>

- <p style = "color:green">钻石操作符的使用升级</p>

- <p style = "color:green">语法改进：try语句</p>

- ==String存储结构变更==

- ==便利的集合特性：of()==

- ==增强的StreamAPI==

- ==全新的HTTP客户端API==

- ==Deprecated的相关API==

- javadoc的HTML5支持

- javaScript引擎升级：Nashorm

- java的动态编译器

### 目录结构改变

java9之前

![image-20201218115221761](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/java8%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84.png)

jdk9之后

![image-20201218115256145](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/Java9%E4%B9%8B%E5%90%8E%E7%9B%AE%E5%BD%95.png)

### 模块化系统

jdk1.8之前，Java运行环境臃肿，每次JVM启动时，都会加载rt.jar到内存。系统并没有对不同部分之间的依赖关系

有个明确的概念。每一个公共类都可以被类路径下任何其他的公共类所访问到。这样就会导致无意中使用了并不想

被公开的API

**本质上讲：模块的概念，其实就是package外再裹一层。不声明默认隐藏。所以模块化更加安全，因为可以指定哪些地方隐藏，哪些地方暴露**

**实现目标：**

- 主要目的：减少内存开销
- 只须必要的模块，而非全部的jdk模块。简化大型应用的开发和维护
- 改进JavaSE平台
- 改进其安全性，可维护性，提高性能。

```java
//创建module-info文件
//被调用者暴露接口
module java9Test {
    exports com.strrysky.bean;
}
//调用者导入接口
module java9 {
    requires java9Test;
}
```

### Java的REPL工具——jShell命令

再jdk1.9之前，java版本想要执行代码，必须创建文件、声明类、测试方法才可以实现

**设计理念**

即写即得、快速运行

**实现目标**

- 让java像脚本语言一样运行，从控制台启动jShell，利用jShell在没有创建类的情况下直接声明变量、计算表达式、
- 执行语句。而无需创建java文件
- jShell可以从文件中加载语句，或者将将语句保存到文件
- jShell也可以是Tab键进行自动补全和自动添加分号

调出jShell：在jdk1.9以上的bin目录输入jshell，即可启动

![image-20201218133047812](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/jshell_1.png)

可进行创建方法、创建类等各种操作。

默认已经导入以下包

![image-20201218133206919](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/jshell_2.png)

常用操作：

|       操作       | 作用                                |
| :--------------: | :---------------------------------- |
|      按TAB       | 自动补全代码：                      |
|      /list       | 列出当前session中所有有效片段：     |
|      /vars       | 查看当前session下所有创建过的变量： |
|     /methods     | 查看当前session下所有创建过的方法： |
|    /edit add     | 使用外部代码编辑器编写java代码：    |
| /open D:\jj.java | 运行外部java文件：                  |
|      /exit       | 退出：                              |

### 接口的私有方法

jdk1.8中，接口可以有静态方法和默认的方法。一定程度上扩展了接口的功能。

jdk1.9中，接口可以有私有方法。

```java
public interface MyInterface {
    //必须重写
    void methodAbstract();
    //只能有接口类才可以调用
    static void methodStatic(){
        System.out.println("静态方法");
    }
    //可重写
    default void methodDefault(){
        System.out.println("默认方法");
    }
    //内部调用
    private void methodPrivate(){
        System.out.println("私有方法");
    }
}
```

### 钻石操作符升级(<>)

<>与匿名内部类在jdk8中不能共存，但是在jdk9之后就可以

```java
//在jdk9中，这样是正确的，但是在jdk8中是错误的，后面的<>也必须填入泛型
Comparator<Object> com = new Comparator<>() {
    @Override
    public int compare(Object o1, Object o2) {
        return 0;
    }
};
//jdk7新特性，类型推断
ArrayList<String> list = new ArrayList<>();
```

### try-catch语法升级

jdk7 中，可以实现资源的自动关闭，但是要求执行后必须关闭的所有资源必 须在try子句中初始化，否则编译不

通过。如下例所示,但是在try里面，不能对变量进行更改，例如reader=null;

```java
try(InputStreamReader reader = new InputStreamReader(System.in)){ //读取数据细节省略
}catch (IOException e){ e.printStackTrace();
}
```

在jdk9中，可以在外部初始化,但是在try里面，不能对变量进行更改，例如reader=null;

因为此时的资源变量为常量，即final

```java
public void imrove2(){
    InputStreamReader reader =  new InputStreamReader(System.in);
    //将需要关闭的资源放到try括号里
    //如有多个，用分号隔开,try(reader;writer)
    try(reader) {
        char[] buf = new char[20];
        int len;
        if((len = reader.read(buf))!=-1){
            String str = new String(buf,0,len);
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

### String存储结构变更

String、StringBuilder、StringBuffer底层数组由char数组变为了byte数组

为了节省内存，char在JVM中占两个字节

### 集合工厂方法(创建只读集合)

jdk9之前创建只读集合

```java
//===========第一种
List<String> nameList = new ArrayList<>();
nameList.add("dd");
nameList.add("dd1");
nameList.add("dd2");
nameList = Collections.unmodifiableList(nameList);
System.out.println(nameList);
//===========第二种
List<Integer> list = Arrays.asList(1, 2, 3);
```

jdk9之后

```java
List<Integer> list = List.of(1, 2, 3);
Set<Integer> set = Set.of(1, 1, 1);
Map<String, Integer> map = Map.of("Tom", 23, "Jer", 52);
Map<String, Integer> map2 = Map.ofEntries(Map.entry("Tmo", 12), Map.entry("dd", 30));
```

### InputStream的加强

InputStream有了一个很有用的方法：transferTo，可以将数据直接传输到OutputStream

```java
//示例代码未进行异常及资源关闭等处理
public static void main(String[] args) {
    InputStream inputStream = new FileInputStream("你的名字.jpg");
    OutputStream os = new FileOutputStream("你的命.jpg");
    //相当于通过byte数组将流写入os中。
    inputStream.transferTo(os);
}
```

### 增强的StreamAPI

jdk9中，Stream接口中添加了4个方法：takeWhile、dropWhile、ofNUllable、还有一个iterate方法的重载方法

Optional和Stream之间的结合也得到了改进。现在可以通过Optional的新方法stream()将一个Optional对象转换

为一个(可能为空)的Stream对象。

| 方法        | 作用                                                         |
| ----------- | ------------------------------------------------------------ |
| takeWhile   | 返回从开头尽可能多的元素，满足条件的要，直到碰到不满足条件的，之后的全部舍去 |
| dropWhile   | 与takewhile相反，满足条件的不要，知道碰到不满足条件的，之后的全部要 |
| ofNullable  | 形参可以为空。如果为空，则stream为空流，里面没有元素         |
| iterate重载 | 第二个参数为断言Predicate,即自定义终止条件。                 |

takeWhile与dropWhile

```java
public void test01() {
    .o
    //takeWhile:返回从开头尽可能多的元素，满足条件的要，直到碰到不满足条件的，之后的全部舍去
    //结果为：23,46
    list.stream().takeWhile(x->x<60).forEach(System.out::println);
    //与takewhile相反，满足条件的不要，知道碰到不满足条件的，之后的全部要
    //返回剩余的元素
    //结果为63, 5, 66, 1, 0, 8, 9, 60, 0, 10
    list.stream().dropWhile(x->x<60).forEach(System.out::println);
}
```

ofNullable

```java
public void test02() {
    Stream<Integer> stream1 = Stream.of(1, 2, 3,null);
    //stream1.forEach(System.out::println);输出1，2，3,元素个数为4
    //不能只填充一个空值
    //Stream<Integer> stream2 = Stream.of(null);//报错
    Integer i =null;
    //形参可以为空。如果为空，则stream为空流，里面没有元素
    Stream<Integer> stream3 = Stream.ofNullable(i);//元素个数为0
    stream3.forEach(System.out::println);
}
```

iterate重载

```java
public void test03() {
    //java8的写法
    Stream.iterate(0,x->x+1).limit(10).forEach(System.out::println);
    //java9的重载
    //第二个参数为断言Predicate,即自定义终止条件。
    Stream.iterate(0,x->x<100,x->x+1).forEach(System.out::println);
}
```

### Optional的新方法

将Optional对象转为stream对象

```java
public void test01() {
    ArrayList<Object> list = new ArrayList<>();
    list.add("tt");
    list.add("tt2");
    Optional<ArrayList<Object>> optional = Optional.ofNullable(list);
    Stream<ArrayList<Object>> stream = optional.stream();
    stream.flatMap(x->x.stream()).forEach(System.out::println);
}
```

### JavaScript引擎升级：Nashorn

- Nashorn 项目在 JDK 9 中得到改进，它为 Java 提供轻量级的 Javascript 运行时。 Nashorn 项目跟Netscape 的 Rhino 项目，目的是为了在 Java 中实现一个高 性能但轻量级的 Javascript 运行时。Nashorn 项目使得Java 应用能够嵌入 Javascript。它在 JDK 8 中为 Java提供一个 Javascript 引擎

- JDK 9 包含一个用来解析 Nashorn 的 ECMAScript 语法树的 API。这个 API 使得 IDE 和服务端框架不需要依赖 

  Nashorn 项目的内部实现类，就能够分析 ECMAScript 代码。

## Java10

2018年3月发布，Java9和Java10都不是长期支持的版本。JAVA11是长期支持的版本。

JDK10一共定义了109个新特性，其中包含12个JEP（对于程序员来讲，真 正的新特性其实就一个），还有一些新

API和JVM规范以及JAVA语言规范上 的改动。

JEP是指(JDK Enhancement Proposal特性加强提议)

![image-20201219112223054](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/Java10JEP.png)

### 局部变量类型推断

**产生背景**

开发者经常抱怨Java中引用代码的难度，**局部变量的显示类型声明，常常被认为是不必须的。**

**好处**

减少了啰嗦和形式的代码，避免了信息冗余，而且对齐了变量名，方便阅读

**举例如下**

场景一：类实例化时

在声明一个变量时，总是习惯了敲打两次变量类型，第一次用于声明变量类型，第二次用于构造器。

```java
LinkedHashSet<Integer> set = new LinkedHashSet<>();
```

场景二：返回值类型含复杂泛型结构。

变量的声明类型书写复杂且较长，尤其加上泛型的使用

```java
Iterator<Map.Enter<Integer,Student>> iterator = set.iterator();
```

场景三

```java
URL url = new URL("www.baidu.com");
URLConnection urlConnection = url.openConnection();
BufferedReader reader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
```

jdk10之后，可使用var代替,有些类似于js

```java
public void test02() {
    //int num = 10;
    //java10之后，声明变量时，根据所附的值推断类型的变量。
    var num = 10;
    var list = new ArrayList<String>();
    list.add("123");
    //遍历操作
    for (var n : list) {
        System.out.println(n);
    }
}
```

#### 不适用情况

有一些四种场景，六种结构不能使用

四种场景：

- 变量不赋值不能进行类型推断
- lambda表达式只能赋给函数式接口，使用var的话，会不知道左边是否为接口
- 方法引用中,原因和上述类似
- 数组静态初始化中

```java
public void test() {
    //1、不赋值不能进行类型推断
    //   var num;
    Supplier<Double> sup = () -> Math.random();
    //2、lambda表达式只能赋给函数式接口，使用var的话，会不知道左边是否为接口
    // var sup2 = Math::random;
    //3、方法引用中,原因和上述类似
    Consumer<String> con = System.out::println;
    //var con1 =  System.out::println;
    //4、数组静态初始化中
    int[] arr = new int[]{1, 2, 3, 4};
    //正常
    var arr2 = new int[]{1, 2, 3, 4};
    int[] arr4 = {1, 2, 3, 4};
    //错误，无法推断类型
    //  var arr3 = {1,2,3,4};
}
```

六种结构

- 情况1：没有初始化的局部变量声明
- 情况2：方法的返回类型
- 情况3：方法的参数类型
- 情况4：构造器的参数类型 
- 情况5：属性
- 情况6：catch块

```java
public class TyteInference {
    @Test
    public void test03() {
        //情况1：没有初始化的局部变量声明
        var num = null;
        //情况2：方法的返回类型
        method();
        //情况3：方法的参数类型
        //情况4：构造器的参数类型
        //情况5：属性
        //情况6：catch块
        try{}catch (var e){}
    }
    //情况2,因为方法是根据返回值决定里面的
    public var method(){
        return 1;
    }
    //情况3：方法的参数类型。同样改变了方法的初衷，根据形参类型来要求参数，
    //如果写成这样，就相当于传什么类型都可以
    public void method(var num){}
    //情况4：构造器的参数类型,原因同上
    public TyteInference(var i){}
    //情况5：属性,因为属性在JVM中初始化时会有默认值，如果用var就无法判断
    var num = 10;
}
```

#### 原理

在处理var时，编译器先是查看表达式右边部分，并根据右边变量值的类型进行 推断，作为左边变量的类型，然后

将该类型写入字节码当中（也就是说，**在字节码文件中，var会被重新编译成右边对应的类型**）

#### 注意点

- **var不是一个关键字** 

  不需要担心变量名或方法名会与var发生冲突，因为 var实际上并不是一个关键字， 而是一个类型名，只有在编译器需要知道类型的地方才需要用到它。除此之外，它 就是一个普通合法的标识符。也就是说，除了不能用它作为类名，其他的都可以， 

- **这不是JavaScript**

  var并不会改变Java是一门静态类型语言的事实。编译器负责推 断出类型，并把结果写入字节码文件，就好像是开发人员自己敲入类型一样。

### 集合新增创建不可见集合的方法

自java9开始，jdk为集合都增加了of方法(java9新增)和copyof方法(java10新增)

```java
public void test01() {
    //示例1：
    var list1 = List.of("Java", "Python", "C");
    var copy1 = List.copyOf(list1);
    System.out.println(list1 == copy1); // true
    //示例2：2710427426
    var list2 = new ArrayList<String>();
    //list2不是只读的，所以copyOf会新建一个只读集合，
    //如果参数本身就是只读集合，则返回值为当前的coll
    var copy2 = List.copyOf(list2);
    System.out.println(list2 == copy2); // false
    //示例1和2代码基本一致，为什么一个为true,一个为false?
}
```

## Java11

- **新增了一些字符串的处理方法**
- **Optional加强**
- **局部变量类型推断升级**
- **全新的HTTP客户端API**
- **更简化的编译运行程序**
- **废除Nashorn引擎**

从JVM角度，JDK11引入了两种新的GC，其中包括划时代意义的ZGC

#### 新增了一些字符串的处理方法

![s](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/Java11%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%96%B0%E6%96%B9%E6%B3%95.png)

```java
public void test01() {
    //判断是否为空串(去掉空格、制表符等)
    System.out.println("".isBlank());
    //去除首尾空白(包括制表符)
    System.out.println("  \nssd  ".strip());
    //去除尾部空白
    System.out.println("   ss    ".stripTrailing());
    //去除头部空白
    System.out.println("   ss   ".stripLeading());
    //将字符串重复n次,结果为aaaaaaaaaa
    System.out.println("aa".repeat(5));
    //统计行数,结果为3
    System.out.println("A\n\nds\n".lines().count());
}
```

#### Optional加强

现在可以将一个Opitonal转换为一个Stream，或者当一个空Optional时给它一个替代的

![image-20201219191113477](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/Java11Optional.png)

#### 局部变量类型推断升级

允许在使用lambda表达式时，给参数加注解

```java
//错误形式,必须要有类型
//Consumer com = (@Deprecated t)->{System.out.println(t);};
//java11之后,
//使用lambda表达式时可以给参数上加注解
Consumer<String> com1 = (@Deprecated var t)->{System.out.println(t);};
```

#### 全新的HTTP客户端API

Java9中已经引进，在Java11中正式可用

它将替换HttpURLConnection，并提供对WebSocket和HTTP/2的支持

#### Collection优化

```
var list = new ArrayList<String>();
list.add("123");
//遍历操作
for (var n : list) {
System.out.println(n);
}
final Object[] objects = list.toArray(String[]::new);
```

#### File优化

1. Files.writeString
2. Files.readString
3. inputStream.transferTo(outputStream);

```
final Path path = Files.writeString(Path.of(dir), "test");

final String fileContent = Files.readString(path);

final InputStream inputStream = new FileInputStream("test.csv");
final OutputStream outputStream = new FileOutputStream("test2.csv");
inputStream.transferTo(outputStream);
```



#### 更简化的编译运行程序

在jdk11之前，命令行运行java文件，必须先编译后运行

```
javac HelloWorld.java
java HelloWorld
```

在jdk11之后

```java
java HelloWorld.java
```

需要注意的点：

- 执行源文件中的第一个类, 第一个类必须包含主方法
- 并且不可以使用其它源文件中的自定义类, 本文件中的自定义类是可以使用的

#### 废除Nashorn引擎

有需要的可以考虑使用GraalVM

## java12

### Switch优化

```java
 switch (name) {
   case "kun.han" -> System.out.println("kun.han");
   case "kun.han2" -> System.out.println("kun.han2");
   default -> System.out.println("nothing");
 }
```

### File新增方法

Files.mismatch(<Path>,<Path>)

```java
//内容一致返回-1，不一样则返回不同的字节开始的位置
final long mismatch = Files.mismatch(Path.of("test.csv"), Path.of("test2.csv"));
```

### 紧凑数字格式

```java
final NumberFormat compactNumberInstance = NumberFormat.getCompactNumberInstance(Locale.US, NumberFormat.Style.SHORT);
final String result = compactNumberInstance.format(25000L);
System.out.println(result); //25k
```

### 字符串API增加

1. indent(<int>) 缩进

   ```java
   String names = "kun.han\nkun.han2\n".indent(4);
   System.out.println(names);
   ```

   

2. transform

   ​	字符串转换

   ```java
   final List<String> names2 = List.of("kun", "han", "Han");
   final ArrayList<String> transformedNames = new ArrayList<>();
   for (String name : names2) {
     final String transformName = name.transform(String::strip)
       .transform(String::toLowerCase);
     transformedNames.add(transformName);
   }
   System.out.println(transformedNames);
   ```



### Stream流方法增加

```
 Collectors.teeing(Collector<? super T, ?, R1> downstream1,
                          Collector<? super T, ?, R2> downstream2,
                          BiFunction<? super R1, ? super R2, R> merger)
```

用法：将输入转发给两个收集器(参数1，2)，并用结果处理器(参数3)进行处理

```java
final Stream<Integer> integerStream = Stream.of(1,2,3,4);
final Collector<Object, ?, Double> getAge = Collectors.averagingInt(age -> (int) age);(1+2+3+4)/4
final Double collect = integerStream.collect(Collectors.teeing(getAge, getAge, Double::sum));//2.5 + 2.5
System.out.println(collect);//5
```

## Java13

### Switch 优化

添加yield关键字，用于返回结果

```java
int number = 4;
String operator;
final Scanner scanner = new Scanner(System.in);
operator = scanner.nextLine();
Integer result = switch (operator) {
  case "+" -> {
    yield number * 2;
  }
  case "-" -> {
    yield number - 2;
  }
  default -> {
    yield -1;
  }
};
```

### 文本块

"""   """ 包围， 所见即所得

```java
String TEXT_BLOCK_JSON = """
{
  "name" : "kun.han",
  "age"  : "22"    
} 
""";
  System.out.println(TEXT_BLOCK_JSON);
```

## Java14

### swith优化(标准版)

```java
int number = 4;
String operator;
final Scanner scanner = new Scanner(System.in);
operator = scanner.nextLine();
Integer result = switch (operator) {
  case "+" -> number * 2;
  case "-" -> {
    do some thing;
    yield number -2;
  };
  default -> -1;
};
```

### 文本快

新增转义字符 \ , 表示不换行

### NullPointerExceptions

精确提示空指针异常位置所在

```java
final Person person = new Person();
final boolean kun = person.getPerson2().getName().contains("kun");
```

Result

```
Cannot invoke "jdk14.switchh.nullexception.Person2.getName()" because the return value of "jdk14.switchh.nullexception.Person.getPerson2()" is null
```

### instanceof 模式匹配

```java
public static void main(String[] args) {
  //before jdk 14

  final Object objects = new ArrayList<>();
  if (objects instanceof ArrayList) {
    final ArrayList<String> objects1 = (ArrayList<String>) objects;
  }

  //after jdk 14
  if (objects instanceof ArrayList list) {
    list.add("1");
  }
}
```

### Record类

```java
public class Case {
    public static void main(String[] args) {
        final Person person = new Person("kun.han", 22);
        System.out.println(person);
    }
}

record Person(String name, Integer age){}
```

更倾向于嵌入方法内使用，如

```java
public class Case {
    public static void main(String[] args) {
    		record Person(String name, Integer age){}
        final Person person = new Person("kun.han", 22);
        System.out.println(person);
    }
}
```

## Java15

### 密封类

**关键词：**

| Keys       | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| sealed     | 继续延续密封类特性，可以继续指定继承的类，并传递密封定义给子类 |
| permits    | 执行可被哪些类继承                                           |
| non-sealed | 声明这个类为非密封类，可以被任意继承                         |
| final      | 最终类，不允许被继承                                         |

sealed: 

- 

Permits: 

non-sealed：

**作用:**

对于面向对象语言来说，对象间的继承、实现关系是为了对类能力的扩展和增强。但是当这种增强的能力无法被原系统支持的时候，则会导致系统出现不可预见的异常逻辑。

所以为了避免开发人员错误地重用一些代码，则需要对类的继承扩展能力进行限制，以确系统的可控。那种控制需要满足两种条件:

1. 需要对继承关系进行限制

2. 当突破限制的时候需要显示的进行，让开发者知晓潜在的风险。

```java
// 抽象密封类，permits执行允许继承此类的子类
abstract sealed class Person permits Man,Women {
    public abstract String getType();
}

//密封实现类，必须有子类，可继续继承
sealed class Women extends Person permits Mom {
    @Override
    public String getType() {
        return "woman";
    }
}

final class Man extends Person{

    @Override
    public String getType() {
        return "man";
    }
}


//最终类，不可再被继承
final class Mom extends Women {

}
```

### 隐藏类

**作用：**用于框架

创建一个普通类

```java
public class JEP371HiddenClasses {

    public static String hello() {
        return "https://www.didispace.com";
    }

}
```

编码并encode

```
String filePath = "JEP371HiddenClasses.class";
byte[] b = Files.readAllBytes(Paths.get(filePath));
log.info(Base64.getEncoder().encodeToString(b));
// yv66vgAAAD0AFAoAAgADBwAEDAAFAAYBABBqYXZhL2xhbmcvT2JqZWN0AQAGPGluaXQ+AQADKClWCAAIAQAZaHR0cHM6Ly93d3cuZGlkaXNwYWNlLmNvbQcACgEALmNvbS9kaWRpc3BhY2UvZGVidWcvamF2YTE1L0pFUDM3MUhpZGRlbkNsYXNzZXMBAARDb2RlAQAPTGluZU51bWJlclRhYmxlAQASTG9jYWxWYXJpYWJsZVRhYmxlAQAEdGhpcwEAMExjb20vZGlkaXNwYWNlL2RlYnVnL2phdmExNS9KRVAzNzFIaWRkZW5DbGFzc2VzOwEABWhlbGxvAQAUKClMamF2YS9sYW5nL1N0cmluZzsBAApTb3VyY2VGaWxlAQAYSkVQMzcxSGlkZGVuQ2xhc3Nlcy5qYXZhACEACQACAAAAAAACAAEABQAGAAEACwAAAC8AAQABAAAABSq3AAGxAAAAAgAMAAAABgABAAAAAwANAAAADAABAAAABQAOAA8AAAAJABAAEQABAAsAAAAbAAEAAAAAAAMSB7AAAAABAAwAAAAGAAEAAAAGAAEAEgAAAAIAEw==
```

解码并获取对应信息

```java
@Test
void testHiddenClasses() throws Throwable {
  // 1. 加载encode之后的隐藏类
  String CLASS_INFO = "yv66vgAAAD0AFAoAAgADBwAEDAAFAAYBABBqYXZhL2xhbmcvT2JqZWN0AQAGPGluaXQ+AQADKClWCAAIAQAZaHR0cHM6Ly93d3cuZGlkaXNwYWNlLmNvbQcACgEALmNvbS9kaWRpc3BhY2UvZGVidWcvamF2YTE1L0pFUDM3MUhpZGRlbkNsYXNzZXMBAARDb2RlAQAPTGluZU51bWJlclRhYmxlAQASTG9jYWxWYXJpYWJsZVRhYmxlAQAEdGhpcwEAMExjb20vZGlkaXNwYWNlL2RlYnVnL2phdmExNS9KRVAzNzFIaWRkZW5DbGFzc2VzOwEABWhlbGxvAQAUKClMamF2YS9sYW5nL1N0cmluZzsBAApTb3VyY2VGaWxlAQAYSkVQMzcxSGlkZGVuQ2xhc3Nlcy5qYXZhACEACQACAAAAAAACAAEABQAGAAEACwAAAC8AAQABAAAABSq3AAGxAAAAAgAMAAAABgABAAAAAwANAAAADAABAAAABQAOAA8AAAAJABAAEQABAAsAAAAbAAEAAAAAAAMSB7AAAAABAAwAAAAGAAEAAAAGAAEAEgAAAAIAEw==";
  byte[] classInBytes = getDecoder().decode(CLASS_INFO);
  Class<?> proxy = MethodHandles.lookup()
    .defineHiddenClass(classInBytes, true, MethodHandles.Lookup.ClassOption.NESTMATE)
    .lookupClass();

  // 输出类名
  log.info(proxy.getName());
  // 输出类有哪些函数
  for(Method method : proxy.getDeclaredMethods()) {
    log.info(method.getName());
  }
  // 2. 调用hello函数
  MethodHandle mh = MethodHandles.lookup().findStatic(proxy, "hello", MethodType.methodType(String.class));
  String result = (String) mh.invokeExact();
  log.info(result);
}
```

## Java16

### Stream.toList

```java
List<Integer> evenNos = nos.stream().filter(i -> i % 2 == 0).toList(); //.collect(Collectors.toList())  
System.out.println("Even numbers : "+evenNos);
```

### 时段支持

```java
final String date1 = DateTimeFormatter.ofPattern("B").format(LocalTime.now()); //pm or am
final String date2 = DateTimeFormatter.ofPattern("a").format(LocalTime.now()); //at night and so on
final String date3 = DateTimeFormatter.ofPattern("k").format(LocalTime.now()); //22 
System.out.println(date3);

k means clock-hour-of-day (1-24)
```

### Java17

### Switch模式匹配(预览版)

在case的时候就进行模式匹配

有点: 避免了if else

```java
public void afterJdk17() {
Map<String, Object> data = new HashMap<>();
data.put("key1", "aaa");
data.put("key2", 111);
switch (data.get(0)) {
  case String a -> System.out.println(a);
  case Integer number -> System.out.println(number);
  case List list -> System.out.println(list);
}
}
```
