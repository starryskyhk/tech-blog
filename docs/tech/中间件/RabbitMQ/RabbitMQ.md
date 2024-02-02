---
title: RabbitMQ
slug: /tech/middleware/RabbitMQ
tags: [Rabbit]
date: 2024-01-30T20:04
---


RabbitMQ

## 简介

RabbitMQ是一个实现了AMQP协议的消息队列服务，是面向消息的中间件。

### Process

1. 生产者和消费者与RabbitMQ服务建立联系
2. 生产者发布消息同时携带交换机名称和路由规则到达之对应的交换机
3. 交换机根据路由规则匹配对应的Binding
4. 消息被发送到消息队列
5. RabbitMQ将队列中的消息投递给订阅了该队列的消费者（消费者也可主动拉取队列）

![image-20220914183514841](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/RabbitMQ/rabbitMq_process.png)

## 业务场景

### 异步

#### **传统做法**

**串行**

![image-20220914184358690](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/RabbitMQ/tradition.png)

**并行**

速度快，不能满足高吞吐量

![image-20220914184549231](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/RabbitMQ/parallel-register.png)

#### **消息队列**

数据写入database，同时发送消息给邮件和注册，异步处理

![image-20220914184816033](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/RabbitMQ/rabbitmq-register.png)

### 应用解耦

#### 传统做法

当库存系统挂掉后，订单系统下单失败

![image-20220914185348866](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/RabbbitMQ/order-tradition.png)

#### 消息队列

订单系统和库存系统互不影响，就算库存系统挂掉，也不影响下订单，不会导致消息丢失

![image-20220914185535138](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/RabbitMQ/rabbitmq-order.png)

### 流量削峰

案例：秒杀活动，加入消息队列在前端

作用：

1. 控制人数，超过一定阈值，订单直接丢弃
2. 缓解段时间的高流量压垮应用  

## 下载和安装

1. Docker下载

```
docker pull rabbitmq:3-management
```

2. 运行

```
docker run --rm -d -p 15672:15672 -p 5672:5672 --name my_rabbit rabbitmq:3-management
```

or

```
docker run -dit --name rabbitmq3.7.7 -e RABBITMQ_DEFAULT_USER=guest -e RABBITMQ_DEFAULT_PASS=guest  -v /home/rabbitmq/data:/var/lib/rabbitmq   -p 15672:15672 -p 5672:5672 rabbitmq:3.7.7-management
```

3. 安装延时队列插件

   1.  https://github.com/rabbitmq/rabbitmq-delayed-message-exchange

   2. copy插件

      ```
      docker cp rabbitmq_delayed_message_exchange-20171201-3.7.x.ez rabbitmq3.7.7:/plugins
      ```

   3. 进入容器

   4. 查看插件列表并启动

      ```
      rabbitmq-plugins list
      rabbitmq-plugins enable rabbitmq_delayed_message_exchange
      ```

## 界面RabbitMQ

### 1. Overview

![image-20220915184818817](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/RabbitMQ/page-overview.png)

### 2. Connections

当前连接到mq的机器信息，包括消费者和生产者

![image-20220915185003830](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/RabbitMQ/page-connections.png)

### 3. Channels

1. 一个连接可以创建多个channel, 采用多线程
2. 一个应用或者一个线程都是一个通道
3. 在通道中创建队列，生产者的通道一般会立马关闭，消费者是一直监听的，通道会一直存在

![image-20220915185335702](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/RabbitMQ/page-channels.png)

### 4. Exchanges

![image-20220915185612065](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/RabbitMQ/page-exchanges.png)

| Type              | 解释                                                         |
| ----------------- | ------------------------------------------------------------ |
| direct            | 它会把消息路由到那些 binding key 与 routing key 完全匹配的 Queue 中 |
| fanout            | 它会把所有发送到该 Exchange 的消息路由到所有与它绑定的 Queue 中 |
| headers           | headers 类型的 Exchange 不依赖于 routing key 与 binding key 的匹配规则来路由消息，而是根据发送的消息内容中的 headers 属性进行匹配。（headers 类型的交换器性能差，不实用，基本不会使用。） |
| topic             | 与direct模型相比，多了个可以使用通配符！，这种模型Routingkey一般都是由一个或多个单词组成，多个单词之间以"."分割，例如：item.insert ---------星号 匹配一个1词 , 例audit.* ------- #号匹配一个或多个词 audit.# |
| x-delayed-message | 延迟交换机，可以延迟接收消息                                 |

| Features        | 解释                                                         |
| --------------- | ------------------------------------------------------------ |
| D               | 是 durable 的缩写，代表这个队列中的消息支持持久化            |
| AD              | 是 autoDelete 的缩写。代表当前队列的最后一个消费者退订时被自动删除。注意：此时不管队列中是否还存在消息，队列都会删除。 |
| excl            | 是 exclusive 的缩写。代表这是一个排他队列。如果一个队列被声明为排他队列，该队列仅对首次声明它的连接可见，并在连接断开时自动删除。这里需要注意三点：其一，排他队列是基于连接可见的，同一连接的不同信道是可以同时访问同一个连接创建的排他队列的。其二，“首次”，如果一个连接已经声明了一个排他队列，其他连接是不允许建立同名的排他队列的，这个与普通队列不同。其三，即使该队列是持久化的，一旦连接关闭或者客户端退出，该排他队列都会被自动删除的。这种队列适用于只限于一个客户端发送读取消息的应用场景。 |
| Args            | 是 arguments 的缩写。代表该队列配置了 arguments 参数。       |
| TTL             | 是 x-message-ttl 的缩写。设置队列中的所有消息的生存周期(统一为整个队列的所有消息设置生命周期), 也可以在发布消息的时候单独为某个消息指定剩余生存时间，单位毫秒。 |
| Exp Auto Expire | 是 x-expires 配置的缩写。当队列在指定的时间没有被访问(consume, basicGet, queueDeclare…)就会被删除，Features=Exp。注意这里是删除队列，不是队列中的消息。 |
| Lim             | 说明该队列配置了 x-max-length。限定队列的消息的最大值长度，超过指定长度将会把最早的几条删除掉。 |
| Lim B           | 说明队列配置了 x-max-length-bytes。限定队列最大占用的空间大小， 一般受限于内存、磁盘的大小。 |
| DLX             | 说明该队列配置了 x-dead-letter-exchange。当队列消息长度大于最大长度、或者过期的等，将从队列中删除的消息推送到指定的交换机中去而不是丢弃掉。 |
| DLK             | x-dead-letter-routing-key 的缩写，将删除的消息推送到指定交换机的指定路由键的队列中去。 |
| Pri             | x-max-priority 的缩写，优先级队列。表明该队列支持优先级，先定义最大优先级值(定义最大值一般不要太大)，在发布消息的时候指定该消息的优先级， 优先级更高（数值更大的）的消息先被消费。 |
| Ovfl            | x-overflow 的缩写。队列中的消息溢出时，如何处理这些消息。要么丢弃队列头部的消息，要么拒绝接收后面生产者发送过来的所有消息。有两个配置项：drop-head，代表丢弃队列头部的消息，默认行为；reject-publish 设置队列中的消息溢出后,该队列的行为:”拒绝接收”(所有消息)。 |
| ha-all          | 镜像队列。all 表示镜像到集群上的所有节点，ha-params 参数忽略。 |

### 5. 队列

arguments具体参数如下:

| 参数名                    | 作用                                                         |
| ------------------------- | ------------------------------------------------------------ |
| x-message-ttl             | 发送到队列的消息在丢弃之前可以存活时间(毫秒)                 |
| x-max-length              | 队列最大长度                                                 |
| x-expires                 | 队列在被自动删除（毫秒）之前可以使用多长时间                 |
| x-max-length-bytes        | 消息容量限制,该参数是非负整数值。该参数和x-max-length目的一样限制队列的容量，但是这个是靠队列大小（bytes）来达到限制。 |
| x-dead-letter-exchange    | 设置队列溢出行为。这决定了在达到队列的最大长度时消息会发生什么。有效值为drop-head或reject-publish。交换的可选名称，如果消息被拒绝或过期，将重新发布这些名称 |
| x-dead-letter-routing-key | 可选的替换路由密钥，用于在消息以字母为单位时使用。如果未设置，叫使用消息的原始路由密钥 |
| x-max-priority            | 队列支持的最大优先级数；如果未设置，队列将不支持消息优先级   |
| x-queue-mode              | 将队列设置为延迟模式，在磁盘上保留尽可能多的消息以减少内存使用，如果未设置，队列将保留内存缓存以尽快传递消息 |
| x-queue-master-locator    | 将队列设置为主位置模式，确定在节点集群上声明时队列主机所在的规则 |

### 6. 用户

![image-20220915192107770](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/RabbitMQ/page-user.png)

## 五种模型

配置

```
<!-- amqp依赖，包含Rabbitmq-->
<dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-amqp</artifactId>
 </dependency>

```

yml配置

```
spring:
  application:
    name: rabbitmq
  rabbitmq:
    host: 127.0.0.1
    port: 5672
    username: guest
    password: guest
    virtual-host: /
```

### Hello-World简单模型

一对一消费，只有一个消费者可以接收到

![image-20220915195457690](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/RabbitMQ/hello-world.png)

Producer

```java
@Autowired
private RabbitTemplate rabbitTemplate;

@Test
public void publicMessage() {
  final String queue = "simple.queue";
  final String message = "hello world";
  rabbitTemplate.convertAndSend(queue, message);
  System.out.println("send successful");
}
```

Consumer

```java
@Component
@RabbitListener(queuesToDeclare = @Queue("simple.queue"))
public class Consumer {
    @RabbitHandler
    public void helloWorldListener(String message) {
        System.out.println("message = " + message);
    }
}
```

### Work queues

让多个消费者绑定到一个队列，共同消费队列中的消息。

队列中的消息一旦被消费，就会消失，不会重复执行

![image-20220915200002597](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/RabbitMQ/work-queues.png)

Producer

```java
@Test
public void publicMessage() {
  final String queue = "work-queue";
  final String message = "work-queue-";
  for (int i = 1; i <= 10; i++) {
    rabbitTemplate.convertAndSend(queue, message + i);
    System.out.println("send successful " + i);
  }

}
```

Consumer

```java
@Component
public class Consumer2 {

    @RabbitListener(queuesToDeclare = @Queue(value = "work-queue"))
    public void helloWordListener(String message) throws InterruptedException {
        Thread.sleep(200);
        System.out.println("message1 = " + message);
    }

    @RabbitListener(queuesToDeclare = @Queue(value = "work-queue"))
    public void helloWordListener2(String message) throws InterruptedException {
        Thread.sleep(200);
        System.out.println("message2 = " + message);
    }

}
```

开启能者多劳模式

```yml
spring:
  rabbitmq:
    host: 127.0.0.1
    port: 5672
    username: guest
    password: guest
    virtual-host: /
    listener: 
      simple:
        prefetch: 1 # 每次只能获取一条，处理完成才能获取下一条
```

### Public/Subscribe

允许将同一消息发送给多个消费者。加入了交换机，并且交换机不缓存消息

![image-20221002122632794](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/RabbitMQ/Public-subscribe.png)

Producer

```java
@Test
public void testPublicSubQueue() {
  rabbitTemplate.convertAndSend("fanoutTest", "","message2");
}
```

Consumer

```java
@Component
public class FanoutExchangeListener {
    @RabbitListener(bindings = {
        @QueueBinding(
            value = @Queue(value = "test", durable = "true"),
            exchange = @Exchange(value = "fanoutTest",type = ExchangeTypes.FANOUT)
        )
    })
    public void receival(String message) {
        System.out.println("message = " + message);
    }
    @RabbitListener(bindings = {@QueueBinding(value = @Queue,exchange = @Exchange(value = "fanoutTest",type = ExchangeTypes.FANOUT))})
    public void reveivel2(String message) {
        System.out.println("message1 = " + message);
    }
}
```

### Routing

routing模型也是将消息发送到交换机

使用的是Direct类型的交换机，会将接收到的消息`根据规则路由到指定的Queue`(队列)，因此称为路由模式

![image-20221002131406357](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/RabbitMQ/Routing.png)

Producer

```java
@Test
public void direstExchangeTest() {
  rabbitTemplate.convertAndSend("direstTest", "info","message2");
}

@Test
public void direstExchangeTest2() {
  rabbitTemplate.convertAndSend("direstTest", "error","message2");
}
```

Consumer

```java
@Component
public class RoutingExchangeListener {
    @RabbitListener(bindings = {
        @QueueBinding(
            value = @Queue(value = "test1", durable = "true"),
            exchange = @Exchange(value = "direstTest", type = ExchangeTypes.DIRECT),
            key = {"info", "error"}
        )
    })
    public void receivel(String message) {
        System.out.println("message = " + message);
    }

    @RabbitListener(bindings = {
        @QueueBinding(
            value = @Queue, exchange = @Exchange(value = "direstTest", type = ExchangeTypes.DIRECT),
            key = {"error"}
        )
    })
    public void receivel1(String message) {;
        System.out.println("message1 = " + message);
    }

}
```

### Topics

topicExchange与directExchange类型，区别在于routingKey必须是多个单词的列表，并且以 , 分隔

![image-20221002132939194](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/RabbitMQ/topics.png)

Producer

```java
@Test
public void topicTest(){
rabbitTemplate.convertAndSend("topicList","user.save","topic路由消息,use.save");
}

@Test
public void topicTest1(){
rabbitTemplate.convertAndSend("topicList","order.select.getone","topic路由消息,order.select.getone");
}
```

Consumer

```java
@Component
public class TopicsExchangeListener {

    @RabbitListener(bindings = {
        @QueueBinding(
            value = @Queue(value = "test2", durable = "true"),
            exchange = @Exchange(name = "topicList", type = ExchangeTypes.TOPIC),
            key = {"user.save", "user.*"}
        )
    })
    public void recevicel(String message) {
        System.out.println("message = " + message);
    }

    @RabbitListener(bindings = {
        @QueueBinding(
            value = @Queue,
            exchange = @Exchange(name = "topicList", type = ExchangeTypes.TOPIC),
            key = {"order.#", "user.*"}
        )
    })
    public void recevicel1(String message) {
        System.out.println("message1 = " + message);
    }
}
```

## 消息转换器

maven

```
 <dependency>
     <groupId>com.fasterxml.jackson.dataformat</groupId>
     <artifactId>jackson-dataformat-xml</artifactId>
     <version>2.9.10</version>
 </dependency>
```

## 进阶

### 延迟队列

