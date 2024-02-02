---
slug: /tech/theory/design-pattern/proxy
tags: ["设计模式"]
date: 2024-01-31T19:04
---
# 代理模式(Proxy)

## 静态代理

**定义：** 代理模式给某一个对象提供一个代理对象，并由代理对象控制对原对象的引用。相当于中介。

**类型：** 结构型

**类图：**

![image-20210510005521382](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/DesignPattern/Proxy.png)

**组件说明：**

Subject：定义了RealSubject和Proxy的公用接口，这样可以在任意使用RealSubject的地方使用Proxy了

RealSubject：被代理类，是真正的对象

Proxy：代理类，负责代理真正的对象



**适用场景：**

- 远程代理
- 虚拟代理
- Copy-on-Write 代理
- 保护（Protect or Access）代理
- Cache代理
- 防火墙（Firewall）代理。 
- 同步化（Synchronization）代理
- 智能引用（Smart Reference）代理

**优点：**

- 代理模式能将代理对象与真实被调用的目标对象分离。
- 一定程度上降低了系统的耦合度，扩展性好。
- 可以起到保护目标对象的作用。
- 可以对目标对象的功能增强。

**缺点：**

- 代理模式会造成系统设计中类的数量增加（**动态代理可以解决**）。
- 在客户端和目标对象增加一个代理对象，会造成请求处理速度变慢。
- 增加了系统的复杂度。

**注意事项：** 

- 和适配器模式的区别：适配器模式主要改变所考虑对象的接口，而代理模式不能改变所代理类的接口。
-  和装饰器模式的区别：装饰器模式为了增强功能，而代理模式是为了加以控制

## JDK动态代理

**代理类**

```java
public class ProxyHandler implements InvocationHandler {
    private final Object object;

    public ProxyHandler(Object object) {
        this.object = object;
    }

    //proxy：调用该方法的代理实例
    //method:对应于在代理实例上调用的接口方法的方法实例
    //args: 包含代理实例上方法调用中传递的参数值的对象数组，如果接口方法不带参数， null
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("Before invoke " + method.getName());
        Object invoke = method.invoke(object, args);
        System.out.println("After invoke " + method.getName());
        return invoke;
    }
}
```

**客户端类：**

```java
public class Client {
    public static void main(String[] args) {
        HelloInterface hello = new Hello();
        ProxyHandler proxyHandler = new ProxyHandler(hello);
        HelloInterface helloInterface = (HelloInterface) Proxy.newProxyInstance(hello.getClass().getClassLoader(), hello.getClass().getInterfaces(), proxyHandler);
        helloInterface.sayHello();

    }
}
```

**方法说明：**
`Proxy.newProxyInstance(ClassLoader loader, class<?> interfaces, InvocationHandler h);`

- loader：用于定义代理类的类加载器
- interfaces：代理类的接口列表
- h：调用方法调用的程序（动态代理方法执行时，会执行其中的invoke方法）
