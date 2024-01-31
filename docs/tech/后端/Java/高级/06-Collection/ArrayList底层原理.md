---
slug: /tech/backend/java/high/ArrayList
tag: ["java","ArrayList"]
date: 2024-01-31T20:04
---

# ArrayList底层原理

## 概述

1. ArrayList是基于数组实现的，是一个动态数组，其容量能自动增加。

2. ArrayList不是线程安全的，只能用在单线程环境下，多线程环境下可以考虑用Collections.synchronizedList(List L)函数返回一个线程安全的ArrayList类，也可以使用concurrent并发包下的CopyOnWriteArrayList类

3. ArrayList实现了Serializable接口，因此它支持序列化，能够通过序列化传输，实现了RandomAccess接口，支持快速访问，实际上就是通过下标序号进行访问，实现了Cloneable接口，能被克隆


```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable{
    ......
    ......
}
```

每个ArrayList实例都有一个容量，该容量是指用来存储列表元素的数组的大小。它总是至少等于列表的大小。随

着想ArrayList中不断添加元素，其容量也自动增长。自动增长会带来数组向新数组的重新拷贝，因此，如果可预

知数据量的多少，可在构造ArrayList时指定其容量。在添加大量元素前，应用程序也可以使用ensureCapacity操

作来增加ArrayList实例的容量，这样可以减少递增式的再分配的数量。

## ArrayList的底层实现

ArrayList底层为数组，用数组保存所有元素，其操作基本上是对数组的操作

### 属性

ArrayList中定义了两个私有属性

```java
transient Object[] elementData;
//实际元素数量
private int size;
```

**transient**表示为特定对象的一个域关闭序列化

### 构造方法

有三个构造方法

ArrayList()

ArrayList(int)

ArrayList(Collection<? extends E> c)

```java
// ArrayList带容量大小的构造函数。    
public ArrayList(int initialCapacity) {    
    super();    
    if (initialCapacity < 0)    
        throw new IllegalArgumentException("Illegal Capacity: "+    
                                           initialCapacity);    
    // 新建一个数组    
    this.elementData = new Object[initialCapacity];    
}    

// ArrayList无参构造函数。默认容量是10。    
public ArrayList() {    
    this(10);    
}    

// 创建一个包含collection的ArrayList    
public ArrayList(Collection<? extends E> c) {    
    elementData = c.toArray();    
    size = elementData.length;    
    if (elementData.getClass() != Object[].class)    
        elementData = Arrays.copyOf(elementData, size, Object[].class);    
}
```

### 添加元素

#### add

1：通过ensureCapacityInternal确定是否需要扩容，扩容多大等操作

2：给数组赋值

**这里的size是数组实际大小，并不是数组长度**

**比如数组int[] nums =new int[6];  nums[0]=1;**

**此时，数组实际大小为1，数组长度为6；**

```java
public boolean add(E e) {
    //确定容量
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    //赋值，并size++
    elementData[size++] = e;
    return true;
}
```

#### ensureCapacityInternal

1：计算数组的容量，参数为当前数组以及传入的最小长度，即size+1，返回值为数组容量

2：ensureExplicitCapacity进行增加操作计数器的操作以及是否扩容

```java
private void ensureCapacityInternal(int minCapacity) {
    //调用calculateCapacity计算容量，然后再ensureExplicitCapacity(int minCapacity)
    ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
}
```

#### calculateCapacity

```java
//计算容量
private static int calculateCapacity(Object[] elementData, int minCapacity) {
    //判断这是数组是否为空（无参构造时调用）
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        //则取默认容量和minCapacity的最大值
        return Math.max(DEFAULT_CAPACITY, minCapacity);
    }
    //不为空，则直接返回
    return minCapacity;
}
```

#### ensureExplicitCapacity

```java
//操作计数器,add与remove+1，当我们需要在循环中删除ArrayList元素时，
// 需要使用迭代器Iterator的remove()方法，此时直接使用List的删除有针对modCount的校验，
// 会抛出 ConcurrentModificationException异常。
modCount++;
// overflow-conscious code
//如果大于了数组的容量，则要进行扩容
if (minCapacity - elementData.length > 0)
    grow(minCapacity);
```

#### grow

扩容操作：参数为数组需要的最小容量

1：获取旧数组长度

2：求出1.5倍后的容量

3：新容量与实际所需要的进行比较，如果新容量小，则直接使用参数

4：如果新数组容量大于了数组所允许的最长容量，则进行最大扩容判断

```java
private void grow(int minCapacity) {
    // overflow-conscious code
    //获取旧数组的长度
    int oldCapacity = elementData.length;
    //新的容量为原来的增加1.5倍
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    //新容量比数组实际所需要的小，则直接使用实际需要的容量
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;
    //如果新数组的容量大于了数组最长的容量，则进入hugeCapacity方法,进行最大扩容判断
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    // minCapacity is usually close to size, so this is a win:
    //调用Arrays.copyOf进行元素的复制
    elementData = Arrays.copyOf(elementData, newCapacity);
}
```

### 删除元素

#### remove(o)

移除此列表中首次出现的指定元素，如果存在

```java
public boolean remove(Object o) {
    //ArrayList中允许存放null，因此下面通过两种情况来分别处理。
    if (o == null) {
        //循环整个数组
        for (int index = 0; index < size; index++)
            if (elementData[index] == null) {
                //移除列表中指定位置上的元素
                fastRemove(index);
                return true;
            }
    } else {
        for (int index = 0; index < size; index++)
            if (o.equals(elementData[index])) {
                fastRemove(index);
                return true;
            }
    }
    return false;
}
```

#### fastRemove

与remove(int)区别为，此方法不进行边界判断

```java
private void fastRemove(int index) {
    modCount++;
    int numMoved = size - index - 1;
    if (numMoved > 0)
        System.arraycopy(elementData, index+1, elementData, index,
                         numMoved);
    elementData[--size] = null; // clear to let GC do its work
}
```

### System.arraycopy

这里插播一个不是ArrayList的方法，也就是上面的

System.arraycopy(src, srcPos, dest, destPos,length);

Object[] src：原数组

int srcPos：从这个位置开始，复制length个数，从destPos进行覆盖

Object[] dest：目标数组

int destPos：目标数组的开始起始位置

int length：要copy的数组的长度

**例如**(以fastRemove为例)

数组nums={1,2,3,4,5,6,7,8,9,10}

数组实际长度为10

现在删除数字5，其索引为4 

numMoved = 10-4-1 = 5;

index =4

 System.arraycopy(elementData, 5, elementData, 4,5);

srcPos为5，length为5，则从下标为5开始，复制5个，即6,7,8,9,10

destPos为4：则从下标为4赋值，将6,7,8,9,10复制到数组里，即

1,2,3,4,6,7,8,9,10







