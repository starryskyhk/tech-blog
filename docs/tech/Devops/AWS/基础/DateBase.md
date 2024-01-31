---
title: DataBase
slug: /tech/devops/aws/basic/DataBase
tag: [AWS,DataBase]
date: 2024-01-31T01:45
---
# DataBase

## 简介

### **联机事务处理OLTP（Online Transaction Processing）**

OLTP是传统的关系数据库的主要应用，是基本的日常事务处理，例如银行交易等。

OLTP包括了以上所说的关系数据库SQL Server，Oracle， MySQL Server，PostgreSQL，Aurora，MariaDB等。

### **联机分析处理OLAP（Online Analytics Processing）**

OLAP是数据仓库（Data Warehousing）系统的主要应用，支持复杂的分析操作，侧重决策支持，并且能提供直观易懂的查询结果。

OLAP是用来做商业智能（Business Intelligence）方面的分析的。

OLAP常用的流行工具是**AWS Redshift**, Greenplum, Hive等

如果一个电商在网上卖产品，那么关于产品的信息，用户的信息，交易的信息都可以存放在OLTP类型的关系数据库上。如果用户需要查

询产品有关的信息，或者运营者需要查询产品的销量，产品的库存等都可以直接通过读取数据库获取到信息。

但是当电商发展到一定的规模，运营者/管理层需要做更加精细的用户群体分析，比如“20-30岁的男性在过去一年内的购买行为与电商促

销活动之间的关系”，那么就要用到数据仓库了。

数据仓库有更好地读取速度和更加便利的分析和查询方式。

## Elasticache

**Elasticache**是AWS提供的分布式对象缓存系统，可以有效地提升现有应用程序的性能。利用Elasticache，用户可以从高吞吐和低延迟的

内存数据存储中检索数据，

Elasticache通过在内存中缓存数据来减少对象读取数据库的次数，减轻了数据库的负载，以及提高了网站的访问速度（内存的访问速度比

磁盘的访问速度高很多）。一般来说我们会把相对来说更新频繁的“热数据”放在Elasticache中，把“冷数据”还是放在数据库中，以支持及

时的更新。

目前Elasticache支持两种业界流行的引擎，分别是：

- Memcached
- Redis

## RDS

### RDS的备份、Multi-AZ的高可用和Read Replicas

#### RDS备份

AWS RDS提供了两种不同的备份方式，分别是**自动备份（Automated Backups）**和**快照（Snapshots）**。

#### **自动备份（Automated Backups）**

- 你可以在创建数据库的时候定义自动备份的保留时间（Retention Period），这个时间的设置范围是**1天~35天**
- 你也可以在创建数据库之后更改这个保留时间（Retention Period）
- 如果需要，你可以将数据库恢复到保留时间内的任何时间点
- 在你删除数据库的时候，所有的自动备份都会被删除
- RDS的自动备份会保存在Simple Storage Service (S3)上
- 我们可以定义自动备份的时段，在这个**备份时段**内数据库将会自动进行备份
- 在自动备份的过程中，数据库存储的I/O可能会暂停（通常不到几秒），数据库性能会降低，但部署了Multi-AZ的数据库不受影响

#### **快照（Snapshots）**

- RDS的快照需要手动进行
- 在你删除数据库的时候，快照不会被删除，不像自动备份那样
- 在创建快照的过程中，数据库存储的I/O可能会暂停（通常不到几秒），数据库性能会降低，但部署了Multi-AZ的数据库不受影响

### 数据库加密

现在AWS RDS的所有关系数据库都支持加密。一旦启用了加密的功能，所有数据的存储都将会被加密，包括数据库本身、自动备份、快

照和只读副本（read replicas）。

- 如果在创建数据库的时候没有加密，我们**不能**在事后对其进行加密
- 但我们可以创建这个数据库的快照，复制该快照并且加密这个复制的版本

### Multi-AZ高可用

我们可以把AWS RDS数据库部署在多个**可用区（AZ）**内，以提供高可用性和故障转移支持。

使用Multi-AZ部署模式，RDS会在不同的可用区内配置和维护一个主数据库和一个备用数据库，主数据库的数据会自动复制(**同步**)到备用数据库

中。

使用这种部署模式，可以为我们提供数据冗余，减少在系统备份期间的I/O冻结。同时，更重要的是可以防止数据库实例的故障和单个可

用区的故障。

目前Multi-AZ支持以下数据库：

- Oracle
- PostgreSQL
- MySQL
- MariaDB
- SQL Server

Aurora数据库**本身就支持**多可用区部署的高可用设置，因此不需要为Aurora数据库特别开启这个功能。

创建了RDS数据库之后我们会得到一个数据库的URL Endpoint。在开启Multi-AZ的情况下，这个URL Endpoints会根据主/备数据库的健

康状态自动解析到IP地址。对于应用程序来说，我们只需要连接这个URL地址即可。

![image-20230315214450181](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/RDS-multi-az.png)

### 只读副本（Read Replicas）

我们可以在源数据库实例的基础上，复制一种新类型的数据库实例，称之为**只读副本（Read Replicas）**。我们对源数据库的任何更新，

都会**异步**更新到只读副本中。

因此，我们可以将应用程序的数据库读取功能转移到Read Replicas上，来减轻源数据库的负载。

对于有大量读取需求的数据库，我们可以使用这种方式来进行灵活的数据库扩展，同时突破单个数据库实例的性能限制。

Read Replicas还有如下的特点：

- Read Replicas是用来提高读取性能的，不是用来做灾备的

- 要创建Read Replicas需要源RDS实例开启了自动备份的功能

- 可以为数据库创建最多**5个**Read Replicas

- 可以为Read Replicas创建Read Replicas

  ![image-20230315214648694](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/rds-read-replicas.png)

- 每一个Read Replicas都有自己的URL Endpoint

- 可以为一个启用了Multi-AZ的数据库创建Read Replicas

- Read Replicas可以提升成为独立的数据库

- 可以创建位于另一个区域（Region）的Read Replicas

目前Read Replicas支持以下数据库：

- Aurora
- PostgreSQL
- MySQL
- MariaDB

## DynamoDB

### 什么是DynamoDB

DynamoDB是一种**非关系数据库（NoSQL）**，可在任何规模提供可靠的性能。DynamoDB能在任何规模下实现不到10毫秒级的一致相

应，并且它的存储空间无限。

### 特点

- 使用**SSD**存储

- 数据分散在3个不同地理位置的数据中心（并不是3个可用区）

- 最终一致性读取（Eventual Consistent Reads）

  - 默认的设置，即如果写入数据到DynamoDB之后马上读取该数据，可能会读取到旧的信息
  - DynamoDB需要时间（一秒内）把写入的数据同步到3个不同地理位置的数据中心

- 强一致性读取（Strongly Consistent Reads）

  - 在写入数据到DynamoDB之后马上读取该数据，会等所有写入操作以及数据同步全部完成后再回馈结果
  - 即强一致性读取一定会读到最新的数据结果

- 如果我们需要增加DynamoDB的规格，我们可以直接在AWS管理控制台上进行更改，并且**不会有任何系统downtime**

- 除非您指定其他读取方式，否则 DynamoDB 将使用最终一致性读取。读取操作 (例如 GetItem，Query 和 Scan) 提供了一个 

  **ConsistentRead** 参数。如果您将此参数设置为 true，DynamoDB 将在操作过程中使用强一致性读取。

## RedShift

Amazon Redshift是一个快速、功能强大、完全托管的PB级别**数据仓库**服务。用户可以在刚开始使用几百GB的数据，然后在后期扩容到

PB级别的数据容量。

Redshift是一种**联机分析处理OLAP（Online Analytics Processing）**的类型，支持复杂的分析操作，侧重决策支持，并且能提供直观易

懂的查询结果

### 特点

- **单节点**（160Gb）部署模式
- 多节点部署模式
  - **领导节点**：管理连接和接收请求
  - **计算节点**：存储数据，执行请求和计算任务，最多可以有128个计算节点
- Columnar Data Storage
- Advanced Compression
- Massively Parallel Processing (MPP)
- 目前Redshift只能部署在一个可用区内，不能跨可用区或者用类似RDS的高可用配置
  - Redshift是用来产生报告和做商业分析的，并不需要像生产环境一样对可用性有高保证
- 我们可以对Redshift做快照，并且在需要的时候恢复这个快照到另一个可用区

### Redshift安全

- Redshift传输过程中使用SSL加密
- Redshift使用AES-256进行加密
- 默认情况下Redshift帮我们解决了密钥管理的问题
  - 我们也可以使用自己的密钥
  - 或者使用AWS Key Management Service (KMS)来管理密钥

## Elasticache

**Elasticache**是AWS提供的分布式**内存**对象缓存系统，可以有效地提升现有应用程序的性能。利用Elasticache，用户可以从高吞吐和低延

迟的内存数据存储中检索数据。

Elasticache通过在内存中缓存数据来减少对象读取数据库的次数，减轻了数据库的负载，以及提高了网站的访问速度（内存的访问速度比

磁盘的访问速度高很多）。一般来说我们会把相对来说更新频繁的“热数据”放在Elasticache中，把“冷数据”还是放在数据库中，以支持及

时的更新。

重点：Elasticache是存储在内存中的，是一种**in-memory cache**系统。

目前Elasticache支持两种业界流行的引擎，分别是：

- Memcached
  - Memcached是一套高性能、分布式内存对象缓存系统，是一款开源的，非常流行的缓存系统
  - 使用AWS Elasticache可以和Memcached无缝地兼容
- **Redis**

在实际场景中，如果我们有对数据库的读写有很高的要求，并且数据的更新没有那么频繁，我们就可以考虑使用Elasticache来减少我们的

数据库负担，增加数据库读取的性能。

## Aurora

**Amazon Aurora**是一种兼容MySQL和PostgreSQL的商用级别关系数据库，它既有商用数据库的性能和可用性（比如Oracle数据库），

又具有开源数据库的成本效益（比如MySQL数据库）。

Aurora的速度可以达到MySQL数据库的**5倍**，同时它的成本只是商用数据库的**1/10**。

Aurora和其他RDS服务类似，AWS会负责各种管理任务，例如硬件、数据库补丁和数据库备份等。

另外，Aurora还有以下这些特点：

- 10GB的起始存储空间，可以增加到最大64TB的容量
- 计算资源可以提升到最多32vCPU和244GB的内存
- Aurora会将你的数据**复制2份**到每一个可用区内，并且**复制到最少3个可用区**，因此你会有**6份数据库备份**
- 2份及以下的数据备份丢失，不影响Aurora的写入功能
- 3份及以下的数据备份丢失，不影响Aurora的读取功能
- Aurora有自动修复的功能，AWS会自动检查磁盘错误和数据块问题并且自动进行修复
- 有两种数据库只读副本
  - Aurora Replicas（最多支持15个）
  - MySQL Replica（最多支持5个）
  - 两者的区别是Aurora主数据库出现故障的时候，Aurora Replicas可以自动变成主数据库，而MySQL Replica不可以