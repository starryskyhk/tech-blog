---
title: Clean Code
slug: /tech/theory/code-quality/clean-code
tag: [cleanCode]
date: 2024-01-31T10:15
---
# Clean Code

## 为什么我们需要Clean Code

1. 糟糕的代码难以维护
2. 不利于添加新功能
3. 交接复杂，代码可读性低，后任理解需要大量时间
4. 不容易定位错误
5. 越到后期，团队的生产力越低，维护成本越高

## 命名

糟糕的命名让我们不知道它究竟要表达什么，比如a,b,c等，或者说是含糊不清的命名，不统一的命名，导致代码看上去乱糟糟的，甚至会被命名所误导，那么将从以下方面去规范如何去命名你的类、方法或者是变量

### 名副其实

顾名思义，命名应该让人一眼就可以看出它的用意何在，而不需要注释去解释它。

```java
public List<int[]> getThem() {
  List<int[]> list1 = new ArrayList<int[]>();
  for (int[] x : theList) {
    if ( x[0] == 4 ) {
      list1.add(x);
    }
  }
  return list1;
}
```

通过上述代码，我们并不能知道getThem，Them是什么？theList又是什么？4的含义又是什么？返回的list1又是什么所以我们需要去改进它



## 函数

## 注释

## 格式

## 对象和数据结构

## 单元测试

## 类

