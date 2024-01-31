---
title: Snowball
slug: /tech/devops/aws/basic/Snowball
tag: [AWS,"Snowball"]
date: 2024-01-31T01:45
---
# Snowball

## 背景

**Snowball** 是一种 **PB 级**数据传输解决方案，旨在使用安全设备将大量数据传入和传出亚马逊 AWS。

很多公司在上云的过程中会需要把数据从传统的数据中心迁移到AWS的数据中心去，但是对于拥有海量数据的公司来说，这会是一个不小

的挑战。即使使用 AWS DirectConnect (DX) 的 1Gbps 专线来传输数据，对于 PB 级别的数据来说也需要花费很长的一段时间。

在过去，AWS 提供了一种数据导入/导出服务，叫做 **AWS Import/Export Disk**。基本上是 AWS 会寄一些磁盘给到客户，客户手动将数

据导入到磁盘，然后将磁盘寄回给 AWS。



但是磁盘的容量有限，并且不容易管理，也容易损坏数据，因此现在这种方式已经不用了。取而代之的是更安全，更高性价比的 AWS Snowball 服务。

## 什么是Snowball

通过使用 Snowball 服务，你可以将 PB 级别的分析数据、基因组数据、视频库等数据简单地、快速地、安全地传送到 AWS 的数据中心去，并且花费低至使用高速互联网的五分之一。

事实上，Snowball 是一个重21公斤的大盒子，里面配置了16核的 CPU 和 16G 的内存，并且有RJ45，SFP+ 网络接口，最高支持 10Gbps 网络。（这一行内容考试并不需要，了解即可）a

Snowball 还内嵌了一个 Amazon Kindle 电子墨水屏来显示信息。

## 特性

Snowball 还有如下特性：

- 可以在本地数据中心和 Amazon S3 之间进行数据的**导入和导出**
- 支持 50TB 的容量版本以及 80TB 的容量版本，可以同时使用多个 Snowball 并行传输数据。
- 外设使用了防篡改外壳，支持 AES-256 加密和行业标准的可信平台模块 (TPM)

使用 AWS Snowball，你需要到 AWS 管理控制台申请，AWS 会邮寄一个物理 Snowball 给你，然后你需要通过以太网和客户端软件把数据从本地传输到 Snowball上，最后将 Snowball 邮寄给 AWS 即可。AWS 会负责将 Snowball 内的数据导入到你所需要的 S3 存储桶上。

## Snowball Edge

**Snowball Edge** 实际上和标准版的 Snowball 很类似，只是它还另外提供了计算的功能。它除了能提供 100TB 的数据传输能力外，还有 AWS Lambda 的计算能力。

功能包括：

- 支持 100 TB 的存储容量，是原始 Snowball 的两倍
- 能编写 Lambda 函数并在创建 Snowball Edge 设备任务的时候将其与 S3 存储桶关联起来
- 还配有一个板载的 LCD 显示屏
- 其他的特性与原始的 Snowball 一样

## Snowball Mobile

**AWS Snow mobile** 是一种用于将海量数据移动到 AWS 中的 **EB 级**数据传输服务。

实际上，它就是一辆拖着集装箱的大卡车

AWS Snowmobile 可以提供高达 100PB 的数据传输，让超级海量数据传输更快、更安全和更经济。

它的基本特性与原始的 Snowball 类似。

|                  | Snowcone & Snowcone SSD       | Snowball Edge     | Snow mobile      |
| ---------------- | ----------------------------- | ----------------- | ---------------- |
| Storage Capacity | 8TBHDD.    14TBSDD            | 80TB usable       | <100PB           |
| Migration Size   | Up to 24TB online and offline | Up. to PB offline | Up to EB offline |
| DataSync agent   | Pre-installed                 |                   |                  |

