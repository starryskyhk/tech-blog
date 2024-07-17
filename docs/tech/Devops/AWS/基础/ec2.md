---
title: EC2
slug: /tech/devops/aws/basic/EC2
tags: [AWS,EC2,"Elastic Beanstalk","EKS","ECS"]
date: 2024-01-31T01:45
---
# EC2

## EC2的类型

![image-20230307191342325](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/ec2-type.png)

**c5n.xlarge**

- c: 代表实例系列
- 5: 代表这个系列的代系
- n: 额外的功能
  - a - AMD处理器
  - g - AWS Graviton处理器
  - i - 英特尔处理器
  - d - 实例存储卷
  - n - 网络优化
  - b - 数据块存储优化
  - e - 额外的存储或内存
  - z - 高频率
- xlarge或9xlarge: 代表实例型号(大小) metal表示裸机

## 计费方式

![image-20230307192249297](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/charge-type.png)

- 按需实例: 按秒为计算容量支付费用，随用随停
- 节省计划: 通过承诺在 1 年或 3 年期限内保持一致的使用量（以 USD/小时为单位）来降低您的 Amazon EC2 成本。
- 预留实例: 
  - 承诺期限，包年获得更大折扣
  - 付款方式：
    - 预付全部费用，获得折扣
    - 预付部分费用，
    - 不预付费用
- 竞价型实例: 折扣很大，使用AWS闲置的计算资源，到那时如果别人用了闲置的计算资源，竞价实例可能会被强行停止

## EC2的存储类型

### 实例存储

#### **什么是实例存储**

实例存储为您的实例提供临时性块级存储。此存储位于己物理附加到主机的磁盘上。实例存储是一种理想的临时存储解决方案，非常适合

存储需要经常更新的信息，如缓存、临时数据和其他临时内容，或者存储从一组实例上复制的数据，如 Web服务器的负载均衡池。

#### 特点

- 实例存储为 EC2 实例提供了短暂的块存储设备

   实例存储 (Instance Store Volumes）又叫做短暂型存储 (Ephemeral Storage)

- ﻿实例存储是 AWS 的宿主机上依附的存储（可以理解为实例存储是真实的物理机上安装的磁盘）

   实例存储比较适合存放短暂型、变化很快的数据，比方说缓存、爬虫数据和其他短哲的数据

- ﻿实例存储的大小取决于实例的类型

- ﻿实例存储的存活与否与实例的状态有关系

  - 实例重启，实例存储的数据将不受影响
  - 一旦实例终止、休眠或者停止，实例存储将永久消失
  - 实例存储的实例不能进入停止状态（Stop），只能重启（Reboot）或者终止（Terminate）

### EBS存储

#### 什么是EBS存储

Amazon Elastic Block Store (Amazon EBS) 提供了块级存储卷以用于 EC2 实例。EBS 卷的行为类似于原始、未格式化的块储存设备。您

可以将这些卷作为设备挂载在实例上。附加到 EBS 实例的卷公开为独立于实例生命周期而持续存在的存储卷。您可以在这些卷上创建文

件系统，或者以使用块储存设备(如硬盘）的任何方式使用这些卷。您可以动态更改附加到实例的卷的配置。

#### 特点

亚马逊 EBS 卷提供了高可用、可靠、持续性的块存储，EBS 可以依附到一个正在运行的EC2 实例上

- 如果你的 EC2 实例需要使用数据库或者文件系统，那么建议使用 EBS 作为首选的存储设备

- EBS 卷的存活可以脱离 EC2 实例的存活状态。也就是说在终止一个实例的时候，你可以选择保留该实例所绑定的 EBS 卷

- EBS 卷可以依附到同一个可用区（Az）内的任何实例上

- EBS 卷可以被加密，如果进行了加密那么它存有的所有已有数据，传输的数据，以及制造的镜像都会被加密

- EBS 卷可以通过快照 (Snapshot）来进行（增量）备份，这个快照会保存在 S3 (Simple Storage System)上

- 你可以使用任何快照来创建一个基于该快照的 EBS 卷，并且随时将这个 EBS 卷应用到该区域的任何实例上

- EBS 卷创建的时候已经固定了可用区，并且只能给该可用区的实例使用。如果需要在其他可用区使用该 EBS,那么可以创建快照，并

  且使用该快照创建一个在其他可用区的新的 EBS 卷

- 快照可以被复制到其他可用区

#### EBS的不同类型

SSD: Solid State Disk(固态硬盘)

HDD: Hard Disk Drive(机械硬盘)

Amazon EBS 提供以下卷类型：通用型 SSD （gp2 和 gp3）、预置 IOPS SSD (io1 和io2）、吞吐量优化型 HIDD (stI)、ColdHDD (SC1)以

及磁介质卷(standard)。它们的性能特点和价格不同，您可根据应用程序要求定制您所需的存储性能和相应费用。

![image-20230308001221776](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/ebs-type.png)



![image-20230308001429252](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/ebs-type2.png)

### 对比

| EC2实例存储            | EBS存储                  |
| ---------------------- | ------------------------ |
| 实例的宿主机的本地存储 | 虚拟化的存储             |
| 适合临时性的存储       | 适合长久的数据存储       |
| 数据没有高可用         | 数据在可用区内有多份备份 |
| 不能做快照             | 可以做快照               |
| 提供SSD和HDD           | 提供SSD和HDD             |



## AMI系统镜像和快照

### 什么是AMI

Amazon Machine Image(AMI)提供启动实例所需的信息。在启动实例时，必须指定AMI。在需要具有相同配置的多个实例时，可以从单

个AMI启动多个实例。在需要不同的配置的实例时，可以使用其他AMI启动实例

![image-20230308003703150](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/AMI-process.png)

Amazon Linux 2 和 Amazon Linux AMI 是 AWS 提供、支持和维护的 Linux 镜像。以下是一些主要功能：

- ﻿对于 Amazon EC2 用户没有额外费用

- 稳定、安全和高性能的执行环境，适用于 Amazon EC2 上运行的应用程序

- ﻿对多个版本的 MySOL、 PostgresQL、Python、Ruby、Tomcat 及许多常见软件包的存储库访问权限

- ﻿定期更新以包括最新组件，这些更新也可在 yum 存储库中使用，适用于安装在运行中的实例上

-  包括可与 AWS 服务轻松集成的软件包，如AWS CLI Amazon EC2 API 和 AMI 工具、适用于

   Python 的Boto 库以及 Elastic Load Balancing 工具

- 创建镜像的时候，也会创建一个EBS快照

### 快照

可以通过拍摄时间点快照将 Amazon EBS 卷上的数据备份到 Amazon S3。 快照属于增量备份，这意味着仅保存设备上在最新快照之后更

改的数据块。由于无需复制数据，这将最大限度缩短创建快照所需的时间和节省存储成本。每个快照都包含將数据（拍摄快照时存在的数

据）还原到新 EBS 卷所需的所有信息。

![image-20230308004511775](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/snapshot-time.png)

快照只会存储硬盘中的内容，不会存储内存中的内容，如果EC2实例是运行状态，建议先stop(如果内存中还有数据，会把内存的数据写入

到硬盘)，否则可能会丢一些数据



#### 特点

- 备份的快照将会保存在**亚马逊S3 (Simple Storage System)**上, 但是不能被访问，是不可见的
- EBS快照属于**增量备份**，即第二次之后的快照只会更新变化了的那一部分数据
- 你可以在EC2实例运行的状态下进行EBS的快照操作，但会给EC2的系统带来一定延迟（CPU，内存利用率会变高）
- 最佳实践是将EC2实例停止，然后将EBS从EC2上卸载下来，进行快照操作
- 你可以基于EBS快照在**同一个AWS区域**创建新的EBS卷，这个卷可以是任何EBS类型，任何支持的大小
- 你也可以将快照复制到其他AWS区域
- 你可以将快照共享给其他的AWS用户
- 加密的EBS卷在创建快照后，该快照也会被自动加密
- 通过加密快照创建的EBS也是自动加密的
- 在复制未加密的快照时，你可以在复制过程中对其加密



#### 常用场景

如果你想将一个EC2实例从一个AWS区域迁移到另一个AWS区域，你需要：

1. 创建基于这个EC2实例的AMI

2. 将这个AMI进行复制，复制到另一个AWS区域

3. 通过这个AMI创新创建一个EC2实例

4. 充当数据盘的EBS也需要做EBS快照

5. 将这个EBS快照进行复制，复制到另一个AWS区域

6. 通过这个EBS快照创建EBS卷，并且依附到EC2实例上去

   

如果你想复制一个EBS卷到该AWS区域的不同可用区，你可以：

1. 创建一个EBS快照
2. 通过EBS快照创建一个新的EBS卷，并且定义大小、卷类型、是否加密等属性



## EC2的生命周期



![image-20230308193722695](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/ec2-lifecycle.png)

### 休眠

当使实例休眠时，EC2会向操作系统发出信号来执行休眠。休眠会将实例内存中的内容保存到EBC根卷。EC2保存树立的EBS根卷和任何附

加的EBC数据卷

在启动实例时：

- EBS根卷会恢复为之前的状态
- 会重新加载RAM(内存)中的内容
- 回复实例上之前运行的进程
- 之前附加的数据卷会重新附加，实例也会保留其实例ID

![image-20230308194845211](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/ec2-hibernation.png)



## 负载均衡器(Load Balance)

### **弹性负载均衡器（Elastic Load Balancing）**

充当了最终用户的单一触点，将访问ELB的流量分配到处于**多个可用区**的**多个EC2实例**之间。可以根据需要在负载均衡器中添加或删除EC2实例，但不中断应用程序的功能和业务。

### 应用负载均衡器(Application Load Balancer)

应用负载均衡器为你的HTTP或者时HTTPS流量提供了灵活的路由选项，后端可以接常见的虚拟机、微服务和容器

![image-20230309235812896](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/alb.png)

**ALB**充当客户端的单一接触点。负载均衡器在多个可用区中的多个目标间分配应用程序的传入流量。这将提高应用程序的可用性。可以添

加若干个监听器

**监听器**使用配置的**协议和端口**检查来自客户端的连接请求。监听器的规则确定ALB如何将请求路由到其目标

每个目标组使用指定的协议和端口号将请求路由到一个或多个注册目标，可以对每个目标组配置运行**状况检查**

![image-20230310001110603](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/ALB-listener.png)



### 网络负载均衡器(Network Load Balancer)

网络负载均衡器适用于超高性能、大批量TLS负载的应用。它支持UDP和静态IP地址

![image-20230309235837080](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/nlb.png)

网络负载均衡在开放系统互连 （OSI)模型的第四层运行。它每秒可以处理数百万个请求。在负载均衡器收到连接请求后，它会从默认规则

的目标组中选择一个目标。

- ﻿﻿NLB 可以基于协议、源卫地址、源端口、目标 IP 地址、目标端口和 TCP 序列号，使用流式哈希算法选择目标
- ﻿﻿NLB 可以每秒处理数百万个请求
- ﻿支持静态IP 地址（弹性 IP）用于负载均衡器
- 同 ALB一样，NLB 支持通过 IP 地址进行目标注册，包括位于 VPC 之外的目标
- ﻿支持容器化的应用程序
- ﻿Network Load Balancer 不能关联安全组

### 网关负载均衡器(Gateway Load Balancer)

能够部署、扩展和管理虚拟设备，例如防火墙、入侵检测和防御系统及深度数据包检测系统

![image-20230309235906971](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/GLB.png)



### ALB vs ELB

- Application Load Balancer可以进行基于路径的路由。即可以根据用户请求中的URL字段不同来将请求发送到不同的目标组中。比方

  可以定义ELB，将访问**/post**的流量转发到目标组1中，然后将访问**/send**页面的流量转发到目标组2中，那么就可以把原本的一个网页

  应用程序分解成更小的服务单元

- ALB可以侦听HTTP数据包头部的信息，根据此字段来定义规则

- ALB支持通过IP地址进行目标注册，包括位于VPC之外的目标。即可以在一个ALB中定义4个AWS中的EC2实例，同时定义2个来自公司

  内网的物理服务器

- 支持容器化的应用程序

### DNS 解析

ALB 会以 DNS (Domain Name System)的形式显示在 AWS 管理控制台，并且会动态解析不同公网IP地址，我们在使用 ALB时要尽量用 DNS 来对它进行访问，而不是 IP地址。

### 健康检查

每个负载均衡器节点仅将请求路由至负载均衡器的已启用可用区中的正常目标。每个负载均衡器节点均使用每个目标注册

到的目标组的运行状况检查设置来检查该目标的运行状况。在注册目标后，目标必须通过一次运行状况检查才会被视为正常。

### 粘性会话 (Sticky Sessions/Session Affinity)

默认人情况下，ALB 会根据选定负载均衡算法将每项请求单独路由到已注册的目标。但

是，可以使用粘性会话功能（也称为会话关联），使侦载均衡器能够将用户会话绑定到特定的目标。这可确保在会话期间将来自用

户的所有请求发送到同一目标中。对于维护状态信息以便向客户端提供持续体验的服务器来说，此功能很有用。要使用粘性会话，客

户端必须支持 Cookie

### 连接耗尽 (Connection Draining)

要确保 Classic Load Balancer 停止向正在取消注册或运行状况不佳的实例发送请求，并使现有连

接保持打开状态，请使用连按耗尽。这将使负载均衡器能够完成向正在取消注册或运行状况不佳的实例发出的进行中请求



## Metadata和Userdata

### Metadata

- EC2本身的数据，这些数据描述了实例的一些状态和基本信息
- Metadata包括的信息有实例的ID、系统名，公网IP地址，内网IP地址，关联的角色等
- 可以通过`http://169.254.169.254/latest/meta-data来获取用户数据列表，通过http://169.254.169.254/latest/meta-data/{item}获取此条目的值，例如http://169.254.169.254/latest/meta-data/public-ipv4
- Metadata可以用来管理和配置实例

### Userdata

- 可以用来在EC2实例启动的时候作为启动脚本的内容
- 可以通过http://169.254.169.254/latest/use-data来获取用户数据的信息



## 弹性伸缩(Auto Scaling)

### 什么是Auto Scaling

确保具有正确数量的EC2实例以处理应用程序负载。可以创建EC2实例的集群，或者叫做Auto Scaling组。可以指定组中最少的实例数量和

最大的实例数量，Auto Scaling可以在应用程序的需求增加或降低时启动或终止实例。

- AS保证一直拥有一定数量的EC2实例来分担应用程序负载
- AS能带来更高的容错性、更好的可用性和更高的性价比
- 可以控制伸缩的策略决定什么时候终止和创建EC2实例

### 核心概念

- 配置模版

​			可以使用启动模版或启动配置(不推荐)作为其EC2实例的配置模版。可以为实例指定一些信息，例如 AMI ID、实例类型、密钥对、

​			安全组和EBS等

- 扩展选项

​			AS提供了多种方法来扩展AS组。例如，可以将组配置为在发生指定条件时或根据时间表进行扩展

### Auto Scaling Group

- 可以指定组中最少的实例数量和最大的实例数量，Auto Scaling可以在应用程序的需求增加或降低时启动或终止实例

- 可以启动按需实例和竞价型实例(仅在使用启动模版时生效，启动配置不生效)

- 实例启动时，如果指定了多个可用区，会为这些可用区分配所需容量。如果执行扩展操作，AS会自动保持可用区平衡

- ELB和AS组配合使用时，无需使用负载均衡器注册单独的EC2实例。AS组所启动的实例会**自动注册到负载均衡器。**同样，ASG终止的

  EC2会**自动从负载均衡器取消注册**

### 启动配置 VS启动模版

| 启动配置           | 启动模版            |
| ------------------ | ------------------- |
| 只能用在自动扩展组 | 可以给单独的EC2实例 |
| 配置不可变         | 有版本控制          |
| 有限的配置项       | 更丰富的配置项      |
| 不推荐使用         | 推荐使用            |

### 扩展选项

- **始终保持当前实例数量**： ASG保持固定数量，如果AS发现运行状况不佳的实例，它将终止该实例，启动新实例
- **手动缩放**：可以指定组中最少的实例数量、最大的实例数量和所需容量
- **按计划缩放**：按照固定的时间周期配置
- **根据需求进行扩展**：可以定义扩缩策略，动态调整ASG的大小以满足需求的变化。必须CPU利用率，贷款利用率等
- **预测式扩展**： 使用**机器学习**来根据CloudWatch的历史数据来预测容量需求，并在预测高负载来临之前，提前进行扩展

### 默认的终止策略

1. 首先确定那些可用区具有最多的实例，并找到一个不受扩展保护的实例
2. 在选定的可用区内，确定哪个实例拥有最旧的启动模版或启动配置
3. 确定哪些实例最接近下一个计费小时
4. 如果一样，则随机

## EC2置放群组(Placement Group) 和 HPC

### 描述

在启动新的 EC2 实例时，EC2 服务会尝试以某种方式放置实例，以便将所有实例分布在基础硬件上以最大限度减少相关的故障。可以使

用置放群组影响如何放置一组相互依赖的实例，从而满足您的工作负载需求。根据工作负载类型，您可以使用以下置放策路之一创建置放

群组：

- 集群(Cluster)将一个可用区中靠近的实例打包在一起。通过使用该策路，工作负载可以实现所需的低延迟网络性能，以满足**HPC 应用程序**通常使用的紧密轉合的节点到节点通信的要求。

- 分区 (Partition）：将实例分布在不同的逻辑分区上，以便一个分区中的实例组不会与不同分区中的实例组使用相同的基础硬件。该

  策路通常为大型分布式和重复的工作负载所使用，例如，Hadoop、 Cassandra 和Kafka.

- ﻿分布(Spread）：将一小组实例严格放置在不同的基础硬件上以减少相关的故障。

#### 特点

- Placement Group提供了低延迟，高速率的网络，可提供高达10 Gbps的速度
- EC2 Placement Group的命名需要在你的AWS账户内**唯一**，不能有命名重复
- 只有**特定的EC2实例类型**可以放在配置Placement Group内（某些计算优化型、GPU、内存优化型和存储优化型的实例）
- AWS建议在一个Placement Group内的所有EC2实例是一模一样的(性能配置一样)，否则会有短板效应
- 不可以合并多个EC2 Placement Group
- 不可以将一个正在运行的EC2实例放到一个EC2 Placement Group中；只能为这个EC2实例创建一个AMI，然后基于AMI创建一个新的实例并且加入到Placement Group内
- Placement Group**可以跨越peerd VPC**，但要保证在同一个区域内
- 如果在Placement Group中创建实例的时候出现“capacity error”的错误，可以停止再启动组中的所有实例，再重新创建刚才的实例
  - 停止再启动组中的所有实例可以改变这些实例所在的底层物理设备，从而带来更多的性能和空间启动新的实例

### 集群置放群组(Cluster Placement Group)

集群置放群组是**单个可用区**中的实例的逻辑分组，它可横跨同一区域中的对等 VPC。 同一集群置放群组中的实例可针对TCP/IP 流量享受

更高的吞吐量

建议将集群置放群组用于可受益于**低网络延迟和/或高网络吞吐量**的应用程序。如果大部分网络流量在组申的实例之间进行，也建议使用

集群置放群组（还能起到成本节约目的）

![image-20230311165732409](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/cluster-placement-group.png)

### 分区群组(Partition Placement Group)

分区置放群组可帮助您的应用程序减少相关硬件故障的可能性。 在使用分区置放群组时, EC2将每个群组划分为多个逻辑段(称为“分

区”)。Amazon EC2 确保置放群组中的每个分区具有自己的一组机架，每个机架具有自己的网络和电源。置放群组中的**任何两个分区将不**

**会分享相同的机架**，从而让您可以在您的应用程序中隔离硬件故障的影响。

![image-20230311170015783](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/Partition-Placement-Group.png)

### 分布群组(Spread Placement Group)

分布置放群组是一组具有以下特点的实例：每个实例放置在不同的机架上，并且每个机架具有各自的网络和电源。分布置放群组可以跨越

同一区域中的多个可用区。每个群组在每个可用区中最多有7个正在运行的实例。

![image-20230311170318257](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/Spread-Placement-Group.png)

### 三种方式比较

| CPG                                      | PPG                                    | SPG                                       |
| ---------------------------------------- | -------------------------------------- | ----------------------------------------- |
| 同一可用区和机架                         | 1个可用区最多有7个分区                 | 所有EC2实例可以放在不同底层硬件           |
| 最高的带宽和最低的延迟                   | 不同分区不共享底层资源                 | 可以跨越多个可用区                        |
| 缺点：如果机架出现故障，所有机器会不可用 | 缺点：一个分区故障影响这个分区所有机器 | 缺点：一个群组最多在每个可用区上放7台实例 |
| 场景：大数据场景、HPC场景                | 场景: HDFS，HBase，Cassandra，Kafka    | 场景：需要最大程度高可用性的应用程序      |

### HPC(高性能计算)是什么

在AWS上使用一整套HPC产品和服务在云中运行大型、复杂的模拟和深度学习工作负载。借助近乎无限的计算容量、高性能文件系统和高

吞吐量网络，更快获得洞察力，并快速将创意推向市场

#### 使用场景

- 基因分析
- 数学建模
- 科研项目
- 蒙特卡洛模拟
- 编码&解码
- 计算化学



## EFS(Elastic File System)

### 什么是EFS

EFS提供简单的无服务器的弹性文件系统。它可在不中断应用程序的情况下按需扩展到 PB 级，随着添加或删除文件而自动扩展或缩减,无

需预置和管理容量，可自适应增长。Amazon EFS 具有简单的 Web 服务界面，可让您快速方便地创建和配置文件系统。该服务为您管理

所有文件存储基础设施，这意味着您可以避免部署、修补和维护复杂文件系统配置的复杂性。

### 特点

- 支持Network File System version 4 (NFSv4)协议
- EFS是**Block Base Storage**，而不是Object Base Storage（例如S3）
- 使用EFS，你只需要为你使用的存储空间付费，没有预支费用
- 可以有高达PB级别的存储
- 同一时间能支持上千个NFS连接
- EFS的数据会存储在一个AWS区域的多个可用区内
- Read After Write Consistency
- **Amazon EFS在Windows实例上不受支持**

### 使用场景

- Devops: CI/CD流水线、源代码控制、工单追踪、代码仓，不如jenkins、Jira、Git、Maven等
- 网站服务和内容管理：WordPress等
- 数据科学和分析: 加速数据分许和实时数据，机器学习训练和分析
- 多媒体处理:图像处理、托管视频等
- 备份:给数据库或自定义和商业化的软件做备份
- 现代化应用开发

### EFS的分类和特点

#### One-Zone存储类/One-Zone IA存储类

IA(Infrequent Access): 不经常访问的 

![image-20230311190334958](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/EFS-type-1.png)

#### 标准存储类/标准IA存储类

![image-20230311190430581](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/EFS-type2.png)

### EFS的不同模式

#### 性能模式

通用模式： 高达35K读取和7K写入的IOPS

Max I/O: 高达500000+ IOPS

#### 吞吐量模式

突增吞吐量： 根据文件系统大小自动扩展其吞吐量

预配置吞吐量：自定义吞吐量级别，无视文件系统大小

### 注意

- EC2和EFS不能在同一安全组
- EFS的安全组必须允许EC2的流量访问
- 可以在同一VPC

### EFS、EBS、S3的区别

| 特性             | **Amazon S3**                                                | **EBS**                                      | **EFS**                          |
| ---------------- | ------------------------------------------------------------ | -------------------------------------------- | -------------------------------- |
| 存储类型         | 对象存储                                                     | 块存储                                       | 文件存储                         |
| 存储大小         | 没有限制                                                     | 最大为16TB                                   | 没有限制                         |
| 单个文件大小限制 | 0字节~5TB                                                    | 没有限制                                     | 最大52TB                         |
| IO吞吐量         | 支持multipart上传如果使用single object upload，单个文件大小限制为5GB | 可以选择HDD或者SSD的磁盘类型，以提供不同的IO | 默认3GB                          |
| 访问             | 能通过因特网访问                                             | 只能被单个EC2实例访问                        | 可以被上千个EC2实例同时访问      |
| 可用性           | 99.99%                                                       | 99.99%                                       | 高度可用（官方没有公布相关数据） |
| 速度比较         | 最慢                                                         | 最快                                         | 中等                             |
| 价格             | 最便宜                                                       | 中等                                         | 最贵                             |



## EKS

### 什么是EKS

Elastic Kubernetes Service是一项托管服务，可以让您在AWS上轻松运行k8s，而无需安装、操作和维护自己的k8s控制层面和节点

### 特点

- ﻿跨多个 AWS 可用区运行和扩展 区kubernetes 控制层面以确保高可用性。

- ﻿根据负载自动扩展控制层面实例，检测并替换运行状况不良的控制层面实例，并为其提供自动化的版本更新和修补。

- ﻿与许多 Aws 服务集成以便为您的应用程序提供可扩展性和安全性，包括 ECR，ELB, IAM和VPC

- ﻿运行最新版本的开源 Kubernetes 软件，因此您可以使用 Kubernetes 社区的所有现有插件和工具。在EKS上运行的应用程序与在任

  何标淮 Kubernetes 环境中运行的应用程序完全兼容。这意味着，您可以轻松地将任何标淮 Kubernetes 应用程序证移到 Amazon

   EKS， 而无需进行任何代码修改。

### AWS容器的不同选择

| 管理     | EKS                             | ECS         |
| -------- | ------------------------------- | ----------- |
| 底层     | EC2                             | AWS Fargate |
| 镜像存储 | ECR(Elastic Container Registry) |             |

### 核心概念

- ﻿kubectl： Kubernetes 命令行工具，kubectl， 使得你可以对 Kubernetes 集群运行命令。你可以使用

- kubectl 来部署应用、监测和管理集群资源以及查看日志。

- ﻿eksctl：一种用于在 Amazon EKS 上创建和管理 Kubernetes 集群的简单命令行实用程序。eksctl 命令行实用程序提供了使用节点为 

  Amazon EKs 创建新集群的最快、最简单的方式。https://eksctl.io/

- ﻿EKS 集群：一个 Amazon EKS 集群包含 Amazon EKs 控制层面 (Control Plane）和 Amazon EKS 节点

- ﻿EKS 节点：可以是自行管理的节点、 Amazon EKS 托管节点组 和 AWS Fargate

- EKS Distro (EKS-D）：和EKS 功能和版本以及管理有一致性，号外还可以管理本地或者云上的容器集群

- ﻿EKS Anywhere：基于 EKS Distro，另外有官方 SLA 保证，可以管理 K8S 全生命周期，不依赖于任何 AWS
   的组件。

### 启动类型

EC2

- 容器运行在EC2实例上
- EC2实例会收费
- 不好扩容

Fargate

- 无需EC2实例资源
- 为运行的任务付费

![image-20230311202549766](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/EKS-start-type.png)



## ECS

### 什么是ECS

**Amazon Elastic Container Service (ECS)**是一个有高度扩展性的**容器管理服务**。它可以轻松运行、停止和管理集群上的Docker容器，

你可以将容器安装在EC2实例上，或者使用Fargate来启动你的服务和任务, 使用ECS, 容器是用于运行单个任务或服务内任务的任务定义中

定义的

![image-20230311205846293](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/ecs.png)

### 怎么选择EC2或Fargate

| EC2                                     | Fargate                              |
| --------------------------------------- | ------------------------------------ |
| 需要持续高CPU核心和内存使用率的工作负载 | 需要针对低开销进行优化的大型工作负载 |
| 需要针对价格进行优化的大型工作负载      | 偶尔会突增的小型工作负载             |
| 应用程序需要访问持久性存储              | 小工作负载                           |
| 必须直接管理基础设施                    | 批处理工作负载                       |

### 任务和服务

#### 任务

任务定义 (Task Definition）是描述构成应用程序的一个或多个容器的文本文件。该文件以JSON 格式，任务定义可以用作应用程序的蓝

图。它为您的应用程序指定各种参数。例如，您可以使用它指定操作系统的参数、要使用哪些容器、要为应用程序打开哪些端口以及任务

中的容器应使用哪些数据卷。

#### 服务

使用 Amazon ECs 服务 (Service)在 Amazon ECS 集群中同时运行和维护所需数量的任务。它的工作原理是，如果任何任务出于任何原因

失败或停止，AmazonECS 服务调度器将根据您的任务定义启动另一个实例。这样做是为了替换它，从而保持服务中所需的任务数量。

![image-20230311210838836](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/ecs-task-and-service.png)



## Lambda

### 什么是Serverless

- 没有基础设施，不需要管理Infra
- 自动扩缩容
- 为价值付费
- 安全、高可用

### 事件源

- 数据的变更
- API请求
- 资源状态的变化

### 使用场景

- 网站应用
- 后端服务器
- 数据处理
- 聊天机器人
- Alexa
- IT自动化

### AWS SAM(Serverless Application Model)

#### Cloudformation

- 基础架构即代码
- 很容易创建和管理AWS的资源
- 通过.yaml文件作为输入，AWS资源作为输出
- 为基础架构做了优化

#### SAM

- 无服务器服务的模版
- 新的无服务器资源，包括函数，API和表
- 支持Cloudformation所支持的所有资源
- 开源

### 其他概念

- 死信队列：默认重试3次
- 层(Layer): 
- 超时时间: 最长15分钟，超时不执行
- 本地调试: 



## Elastic Beanstalk

### 什么是EB

通过 Elastic Beanstalk， 可以在 AWS 云中快速部署和管理应用程序，而不必了解运行这些应用程序的基础设施。Elastic Beanstalk 可减

少管理复杂性，而不会对你的部署有任何限制。您只需上传应用程序，Elastic Beanstalk 将自动处理有关容量预配置、负载均衡、扩展和

应用程序运行状况监控的部署细节。

![image-20230311215830718](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/Elastic-Beanstalk.png)

专注于创造代码

Elastic Beanstalk 可在你选择平台基础之上帮您创建EC2 实例资源以及伴随其他组件。您不需要登录到 EC2 实例上对程序进行安装和部

署。（由 Elastic Beanstalk 来控制）

![image-20230311215925615](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/elastic-beanstalk2.png)

### 将流量分配到不同的EB集群中

类似于灰度发布，逐渐将流量切换到V2版本

![image-20230311220119696](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/EB-flow.png)
