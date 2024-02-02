---
slug: /tech/theory/design-pattern/template-method
tags: ["设计模式"]
date: 2024-01-31T19:04
---
# 模板方法模式（TemplateMethod）

**定义：** 定义一个操作中算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可以重新定义该算法

的某些特定步骤

**类型：** 行为型

**类图：**

![image-20210511171603420](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/DesignPattern/TemplateMethod.png)

**组件说明：**

- AbstractClass：定义了一个模板方法，定义了算法框架，具体子类将重新定义PrimitiveOperation以实现一个算法的步骤
- ConcreteClass：实现PrimitiveOperation以完成算法中与特定子类相关的步骤、

**何时使用：** 当我们要完成在某一细节层次一致的一个过程或一系列步骤，但其个别步骤再更详细层次上的实现可能不用时，使用模板

方法

**适用场景:**

- 有多个子类共有的方法且逻辑相同
- 重复的，复杂的方法，可以考虑作为模板方法

**优点：**

- 封装不变部分，扩展可变部分
- 提取公共代码，便于维护
- 行为由父类控制，子类实现

**缺点：**

- 每一个不同的实现都需要一个子类，导致类个数过多

**注意事项：** 为防止恶意操作，一般模板方法都要加上final关键词



## 钩子函数

钩子就是给子类一个授权，让子类来决定模板方法的逻辑执行。就比如在炒西红柿鸡蛋的时候，由子类去决定是否要加调料。

```java
/**
 * @ClassName : Cook
 * @Description :
 * @Author : Starry_sky
 * @Date: 2021-05-11 17:52  //时间
 */

public abstract class Cook {
    public abstract void oil();

    public abstract void egg();

    public abstract void tomato();
	
    //钩子方法，让子类决定是否加油
    public boolean isAddOil() {
        return true;
    }
	
    //把做饭的方法封装起来
    final public void cook() {
        this.egg();
        this.tomato();
		//如果子类决定添加：则执行添加油的方法
        if (this.isAddOil()) {
            this.oil();
        }
    }
}

```

```java
package com.dahua.TemplateMethod.Program5;

/**
 * @ClassName : MeCook
 * @Description :
 * @Author : Starry_sky
 * @Date: 2021-05-11 22:42  //时间
 */

public class MeCook extends Cook {
    //默认添加油
    private boolean addOilFlag = true;

    @Override
    public void oil() {
        System.out.println("自己：放十斤油");
    }

    @Override
    public void egg() {
        System.out.println("自己：放一个鸡蛋");
    }

    @Override
    public void tomato() {
        System.out.println("自己：放十个西红柿");
    }
	
    //用户设置是否加油
    public void setIsAddOil(boolean isAddOil) {
        addOilFlag = isAddOil;
    }
	
    //子类传递过来命令来决定
    @Override
    public boolean isAddOil() {
        return this.addOilFlag;
    }
}

```

