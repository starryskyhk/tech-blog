---
slug: /tech/backend/java/high/AQS
tag: ["java","AQS"]
date: 2024-01-31T20:04
---
# AQS底层原理

## 概念

AQS是一个同步队列，全名为AbstractQueuedSynchronizer，它是一个同步工具，是Lock用来实现线程同步的核心组件。

AQS的功能分为两种：独占和共享

独占锁：每次只能有一个线程获取锁，比如ReentrantLock是以独占的方式实现互斥

共享锁：允许多个线程同时获取锁，并发的访问共享资源，比如ReentrantReadWriteLock

## 内部实现

AQS队列内部维护的是一个FIFO的双向链表。每个Node由线程封装，当线程争抢锁失败后会封装成Node加入

AQS队列中去。当获取锁的线程释放锁以后，会从队列中唤醒一个阻塞的节点

Node的组成

```java
    static final class Node {
        //共享模式下的等待标记
        static final Node SHARED = new Node();
        //独占模式下的等待标记
        static final Node EXCLUSIVE = null;
        //线程的等待状态，表示线程已经被取消
        static final int CANCELLED =  1;
        //线程的等待状态，表示后继线程需要被唤醒
        static final int SIGNAL    = -1;
        //线程的等待状态，表示线程在Condition上
        static final int CONDITION = -2;
        //表示下一个acquireShared需要无条件传播
        static final int PROPAGATE = -3;
        
        volatile int waitStatus;

        volatile Node prev;

        volatile Node next;

        //当前节点的线程，初始化后使用，在使用后失效
        volatile Thread thread;

        /**
         * 链接到等在等待条件上的下一个节点,或特殊的值SHARED,因为条件队列只有在独占模式时才能被访问,
         * 所以我们只需要一个简单的连接队列在等待的时候保存节点,然后把它们转移到队列中重新获取
         * 因为条件只能是独占性的,我们通过使用特殊的值来表示共享模式
         */
        Node nextWaiter;
        
        final boolean isShared() {
            return nextWaiter == SHARED;
        }
        /**
         * 返回当前节点的前驱节点,如果为空,直接抛出空指针异常
         */
        final Node predecessor() throws NullPointerException {
            Node p = prev;
            if (p == null)
                throw new NullPointerException();
            else
                return p;
        }

        Node() {    // 用来建立初始化的head 或 SHARED的标记
        }
		 //将线程构造成一个节点，添加队列
        Node(Thread thread, Node mode) {
            this.nextWaiter = mode;
            this.thread = thread;
        }

        Node(Thread thread, int waitStatus) { //指定线程和节点状态的构造方法 // Used by Condition
            this.waitStatus = waitStatus;
            this.thread = thread;
        }
    }
```

## 释放锁以及添加线程对于队列的变化

### 添加节点的场景

![AQS添加节点](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/AQS添加节点.png)

添加节点会涉及到两个变化

1：新的线程封装为Node节点追加到同步队列中，设置prev节点，以及修改当前节点的前置节点的next节点指向自己（链表插入操作）

2：通过CAS将tail重新指向新的尾部节点

head节点表示获取锁成功的节点，当头结点在释放同步状态时，会唤醒后继节点，如果后继节点获得锁成功，会把自己设置为头结点，节点变化过程如下。

这个过程也是涉及到两个变化

1：修改head为下一个获取锁的节点

2：新的获取锁的节点，将pre的指针指向null

**设置head节点不需要使用CAS，因为设置head节点是由获取锁的线程来完成的，而同步锁只能由一个线程获得，所以不需要CAS保证**

![image-20201016182514682](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/AQS更新tail操作.png)

## ReentrantLock源码分析

ReentrantLock的时序图

调用ReentrantLock中的lock()方法，源码调用过程如下

![image-20201016185247629](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/lock.png)

ReentrantLock.lock()获取锁的入口

```java
    public void lock() {
        sync.lock();
    }
```

sync是一个抽象的静态内部类，继承了AQS来实现重入锁的逻辑，AQS是一个同步队列，能够实现线程的阻塞以及唤醒，但是并不具备业务功能，所以在不同场景中，会继承AQS来实现对应场景的功能，Sync有两个具体的实现类，分别是：

NofairSync：表示可以存在抢占锁的功能，允许抢占。

FairSync：表示所有线程严格按照FIFO来获取锁

### NofairSync

以非公平锁为例，看看lock的具体实现

1：CAS成功，就表示成功获取到了锁

2：CAS失败，调用acquire(1)进行锁竞争

```java
final void lock() {
    if (compareAndSetState(0, 1))
        setExclusiveOwnerThread(Thread.currentThread());
    else
        acquire(1);
}
```

**CAS的实现原理**

```java
//CAS改变状态
protected final boolean compareAndSetState(int expect, int update) {
    return unsafe.compareAndSwapInt(this, stateOffset, expect, update);
}
```

通过cas乐观锁的方式进行比较并替换，这段代码意思是，如果当前内存的state和预期值expect一样，则替换为

update,更新成功返回true，否则返回false,这个操作是原子性的

state是AQS中的一个属性，对于重入锁的实现来说，表示有一个同步状态，有两个含义表示：

1：当state=0时，表示无锁状态

2：当state>0时，表示已经有线程获取了锁，也就是state=1，因为ReentrantLock允许重入，所以在同一线程多次获取同步锁时，state会递增。

**Unsafe** 可认为是 Java 中留下的后门，提供了一些低层次操作，如直接内存访问、线程的挂起和恢复、CAS、线程同步、内存屏障

### AQS.acquire

如果CAS操作未能成功，说明state已经不为0，此时继续acquire(1)操作

1：通过tryAcquire 尝试获取独占锁，如果成功则返回true，失败返回false

2：如果tryAcquire 失败，则会通过addWaiter方法将当前线程封装为Node添加到AQS队列的尾部

3：acquireQueued，将Node作为参数，通过自旋去尝试获取锁

```java
if (!tryAcquire(arg) &&acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
    //中断
    selfInterrupt();
```

### NonfairSync.tryAcquire

尝试获取锁，如果成功返回 true，不成功返回 false，它是重写 AQS 类中的 tryAcquire 方法

```java
protected final boolean tryAcquire(int acquires) {
    return nonfairTryAcquire(acquires);
}
```

### **ReentrantLock**.nonfairTryAcquire

1：获取当前线程，判断锁的状态

2：如果state=0表示当前是无锁状态，通过cas更新state状态的值

3：当前线程是可重入的，则增加重入次数

```java
final boolean nonfairTryAcquire(int acquires) {
    final Thread current = Thread.currentThread();
    int c = getState();
    //如果是0的话，则尝试去原子获取这个锁
    if (c == 0) {
        if (compareAndSetState(0, acquires)) {
            setExclusiveOwnerThread(current);
            return true;
        }
    }
    //比较与当前线程是否是一个线程，如果是的话
    else if (current == getExclusiveOwnerThread()) {
        //增加状态变量的值，所以是可重入操作
        int nextc = c + acquires;
        if (nextc < 0) // overflow
            throw new Error("Maximum lock count exceeded");
        setState(nextc);
        return true;
    }
    return false;
}
```

### AQS.addWaiter

当tryAcquire方法获取锁失败后，则会先调用addWaiter将当前线程封装为Node。形参mode表示当前节点的状

态，传递的参数是Node.EXCLUSIVE，表示独占状态。意味着重入锁用到了AQS的独占功能

1：将当前线程封装为Node

2：当前链表中的tail节点是否为空，如果不为空，则通过CAS操作把当前线程的node添加到AQS队列

3：如果为空或CAS失败，调用enq将节点添加到AQS队列

```java
private Node addWaiter(Node mode) {
    //将当前线程封装为Node
    Node node = new Node(Thread.currentThread(), mode);
    Node pred = tail;
    //pred不为空的情况下，说明队列中存在节点
    if (pred != null) {
        node.prev = pred;//将当前线程的Node的prev指向tail
        //通过 cas 把 node加入到 AQS 队列，也就是设置为 tail
        if (compareAndSetTail(pred, node)) {
            //设置成功以后，把原 tail 节点的 next指向当前 node
            pred.next = node;
            return node;
        }
    }
    //tail=null或者compareAndSetTail(pred, node)=false,把 node 添加到同步队列
    enq(node);
    return node;
}
```

### enq

```java
private Node enq(final Node node) {
    //自璇操作，入队
    for (;;) {
        //尾部
        Node t = tail;
        //尾部为空
        if (t == null) { // Must initialize
            //创建头部节点,设置初始化节点
            if (compareAndSetHead(new Node()))
                tail = head;
        } else {
            node.prev = t;
            if (compareAndSetTail(t, node)) {
                t.next = node;
                return t;
            }
        }
    }
}
```

图解分析：

假设有三个线程来争抢锁

![image-20201016222240633](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/线程争抢锁lock.png)

### AQS.acquireQueued

通过addWaiter方法把线程添加到链表后，会接着把Node作为参数传递给acquireQueued方法，去竞争锁

1：获取当前节点的prev节点

2：如果prev节点为head节点，那么它就有资格去争抢锁，调用tryAcquire抢占锁

3：抢占锁成功以后，把获取锁的节点设置为head，并且移除原来初始化的head节点

4：如果获取锁失败，则根据waitStatus决定是否需要挂起线程

5：最后，通过cance|Acquire取消获得锁的操作

```java
//通过自旋方式获取同步状态
final boolean acquireQueued(final Node node, int arg) {
    boolean failed = true;
    try {
        boolean interrupted = false;//默认线程没有被中断过
        for (;;) {
            final Node p = node.predecessor();//获取该节点的前驱节点p
            if (p == head && tryAcquire(arg)) {  // 如果p是头节点并且能获取到同步状态
                setHead(node);                   // 把当前节点设为头节点
                p.next = null;                  // 把p的next设为null,便于GC
                failed = false;                 // 标志--表示成功获取同步状态,默认是true，表示失败
                return interrupted;             // 返回该线程在获取到同步状态的过程中有没有被中断过
            }
            //ThreadA 可能还没释放锁，使得 ThreadB 在执行 tryAcquire 时会返回 false
            if (shouldParkAfterFailedAcquire(p, node) &&
                parkAndCheckInterrupt())
                //并且返回当前线程在等待过程中有没有中断过。
                interrupted = true;
        }
    } finally {
        if (failed)
            cancelAcquire(node);
    }
}
```

### shouldParkAfterFailedAcquire

如果线程A的锁还没有释放的情况下，B和C来争抢锁肯定是会失败的，那么失败之后，调用

shouldParkAfterFailedAcquire方法

Node中有五种状态，分别是CANCELLED(1)、SIGNAL(-1)、CONDITION(-2)、PROPAGATE(-3)、默认状态(0)

**CANCELLED**：在同步队列中等待的线程超时或者被打断，需要从同步队列中取消该Node的结点，其结点的

waitStatus为CANCELLED，即结束状态，进入该状态后的结点将不会再变化

**SIGNAL**：只要前置节点释放锁，就会通知标识为SIGNAL状态的后续节点的线程

**CONDITION**：线程的等待状态，表示线程在Condition上

**PROPAGATE**：共享模式下，PROPAGATE 状态的线程处于可运行状态 0:初始状态，

这个方法主要作用是，通过Node的状态判断，A线程竞争锁失败以后是否应该被挂起

1：如果线程A的pred节点状态为**SIGNAL**，那就表示可以放心挂起当前线程

2：通过循环扫描链表把**CANCELLED**状态的节点移除

3：修改pred节点的状态为**SIGNAL**，返回false

**返回 false 时，也就是不需要挂起，返回 true，则需要调用 parkAndCheckInterrupt挂起当前线程**

```java
    private static boolean shouldParkAfterFailedAcquire(Node pred, Node node) {
        int ws = pred.waitStatus;//前置节点的waitStatus
        if (ws == Node.SIGNAL) //如果前置节点为SIGNAL，意味着只需要等待其他前置节点的线程被释放
            return true; //可以放心挂起
        if (ws > 0) { //ws 大于 0，意味着 prev 节点取消了排队，直接移除这个节点就行
            do {
                node.prev = pred = pred.prev;
            } while (pred.waitStatus > 0);//这里采用循环，从双向列表中移除 CANCELLED 的节点
            pred.next = node;
        } else {//利用 cas 设置 prev 节点的状态为 SIGNAL(-1)
            compareAndSetWaitStatus(pred, ws, Node.SIGNAL);
        }
        return false;
    }
```

### parkAndCheckInterrupt

使用 LockSupport.park 挂起当前线程WATING 状态

Thread.interrupted，返回当前线程是否被其他线程触发过中断请求，也就是thread.interrupt(); 如果有触发过中

断请求，那么这个方法会返回当前的中断标识true，并且对中断标识进行复位标识已经响应过了中断请求。如果返

回 true，意味着在 acquire 方法中会执行 selfInterrupt()。

```java
private final boolean parkAndCheckInterrupt() {
　　LockSupport.park(this);
　　return Thread.interrupted();
}
```

图解分析

通过 acquireQueued 方法来竞争锁，如果 ThreadA 还在执行中没有释放锁的话，意味着 ThreadB 和 ThreadC 

只能挂起了。

![image-20201016232430212](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/挂起线程.png)

## 锁的释放流程

### ReentrantLock.unlock

```java
public final boolean release(int arg) {
    if (tryRelease(arg)) { //释放锁成功
        Node h = head; //获取到AQS中的head节点
        if (h != null && h.waitStatus != 0) //如果不为空，并且状态不为0，则唤醒后续节点
            unparkSuccessor(h);
        return true;
    }
    return false;
}
```

### ReentrantLock.tryRelease

这个方法是一个设置锁的操作，通过将state状态减掉传入的参数值(1)，如果结果状态为0，就将它的排它锁的

Owner设置为null

```java
protected final boolean tryRelease(int releases) {
    int c = getState() - releases;
    if (Thread.currentThread() != getExclusiveOwnerThread())
        throw new IllegalMonitorStateException();
    boolean free = false;
    if (c == 0) {
        free = true;
        setExclusiveOwnerThread(null);
    }
    setState(c);
    return free;
}
```

### unparkSuccessor

```java
private void unparkSuccessor(Node node) {
    int ws = node.waitStatus;//获得头结点的状态
    if (ws < 0)
        compareAndSetWaitStatus(node, ws, 0);
    Node s = node.next;//获取头结点的下一个节点
    if (s == null || s.waitStatus > 0) {
        //如果下一个节点为 null 或者 status>0 表示 cancelled 状态.
        //通过从尾部节点开始扫描，找到距离 head 最近的一个waitStatus<=0 的节点
        s = null;
        for (Node t = tail; t != null && t != node; t = t.prev)
            if (t.waitStatus <= 0)
                s = t;
    }
    //next 节点不为空，直接唤醒这个线程即可
    if (s != null)
        LockSupport.unpark(s.thread);
}
```

==为什么释放节点时候是从tail扫描的==

再回到 enq那个方法。8-11行来看一个新的节点是如何加入到链表中的

1：将新的节点的prev指向tail

2：通过cas将tail设置为新的节点

3：t.next = node;

```java
private Node enq(final Node node) {
　　for (;;) {
　　　　Node t = tail;
　　　　if (t == null) { // Must initialize
　　　　　　if (compareAndSetHead(new Node()))
　　　　　　　　tail = head;
　　　　} else {
　　　　　　node.prev = t;
　　　　　　if (compareAndSetTail(t, node)) {
　　　　　　　　t.next = node;
　　　　　　　　return t;
　　　　　　}
　　　　}
　　}
}
```

![image-20201016234304328](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/enq添加节点.png)

在 cas 操作之后，t.next=node 操作之前。存在其他线程调用 unlock 方法从 head开始往后遍历，由于 

t.next=node 还没执行意味着链表的关系还没有建立完整。就会导致遍历到 t 节点的时候被中断。所以从后往前遍

历，一定不会存在这个问题。

图解分析

通过锁的释放，原本的结构就发生了一些变化。head 节点的 waitStatus 变成了 0，ThreadB 被唤醒

![image-20201016234420966](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/image-20201016234420966.png)

**原本挂起的线程继续执行**

通过ReentrantLock.unlock，原本挂起的线程被唤醒后继续执行原来被挂起的线程是在 acquireQueued 方法中，

所以被唤醒以后继续从这个方法开始执行

具体见上面的AQS.acquireQueued ，关键代码如下：

```java
if (p == head && tryAcquire(arg)) {
    setHead(node);//设置线程B为头结点
    p.next = null; // help GC
    failed = false;//把原 head 节点的 next 节点指向为 null
    return interrupted;
}
```

图解分析

1. 设置新 head 节点的 prev=null

2. 设置原 head 节点的 next 节点为 null

![image-20201016234823217](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/image-20201016234823217.png)

## 公平锁和非公平锁的区别

锁的公平性是相对于获取锁的顺序而言的，如果是一个公平锁，那么锁的获取顺序就应该符合请求的绝对时间顺

序，也就是 FIFO。 在上面分析的例子来说，只要CAS 设置同步状态成功，则表示当前线程获取了锁，而公平锁则

不一样，差异点有两个

### lock

```java
final void lock() {
　　acquire(1);
}
```

非公平锁在获取锁的时候，会先通过 CAS 进行抢占，而公平锁则不会

### FairSync.tryAcquire

```java
protected final boolean tryAcquire(int acquires) {
    //取到当前线程
    final Thread current = Thread.currentThread();
    //获取当前的state（上锁次数）
    int c = getState();
    //如果当时没有锁
    if (c == 0) {
        //则去队列，取队列中的并尝试获取锁
        //通过CAS修改状态，
        if (!hasQueuedPredecessors() &&
            compareAndSetState(0, acquires)) {
            //如果成功，则把独占锁设置为当前这个线程
            setExclusiveOwnerThread(current);
            return true;
        }
    }
    else if (current == getExclusiveOwnerThread()) {
        int nextc = c + acquires;
        if (nextc < 0)
            throw new Error("Maximum lock count exceeded");
        setState(nextc);
        return true;
    }
    return false;
}
}
```

这个方法与 nonfairTryAcquire(int acquires)比较，不同的地方在于判断条件多了hasQueuedPredecessors()方

法，也就是加入了[同步队列中当前节点是否有前驱节点]的判断，如果该方法返回 true，则表示有线程比当前线程

更早地请求获取锁，因此需要等待前驱线程获取并释放锁之后才能继续获取锁。