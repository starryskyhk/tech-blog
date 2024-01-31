---
title: Kinesis
slug: /tech/devops/aws/basic/Kinesis
tag: [AWS,"Kinesis"]
date: 2024-01-31T01:45
---
# Kinesis

**Amazon Kinesis**可以轻松收集、处理和分析实时流数据。利用Amazon Kinesis，可以在收到数据的同时对数据进行处理和分析，

无需等到数据全部收集完成才进行处理。

## 数据流

数据流是从成千上万的数据源上持续产生的数据，并且这些数据都很小（KB级别），它们可能是：

- 电商网站上的订单信息（比如京东，淘宝）
- 股票信息
- 游戏信息
- 社交网络信息（微信/微博的信息流）
- 地理位置信息（滴滴）
- 物联网数据

## Kinesis服务

Kinesis目前有不同的功能服务，我们需要了解每一个服务有什么不同。这些服务分别是：

- **Kinesis Data Streams (Kinesis Streams)**：使用自定义的应用程序分析数据流
- **Kinesis Video Streams**：捕获、处理并存储视频流用于分析和机器学习（Machine Learning）
- **Kinesis Data Firehose**：将数据加载到AWS数据存储上
- **Kinesis Data Analytics**：使用SQL分析数据流

## Kinesis Data Streams

**Amazon Kinesis Data Streams**可以实时收集和处理大型数据流，这些数据会被处理并且发送到多种AWS服务中去，也可以生成报警、动态更改定价和广告战略等。

如图所示，**创建者（Producer）**会持续将数据推送到Kinesis Data Streams中，这些创建者包括了EC2实例、用户的PC终端、移动终端，服务器等。

Kinesis Data Streams由一组**分片（Shards）**组成，每个shards都有一系列的数据记录，每一个数据记录都有一个分配好的序列号。

数据记录在添加到流之后会保存一定的时间，这个**保留周期（Retention Period）**默认是**24小时**，但可以手动设置为**最多7天**。

**使用者（Comsumer）**会实时地对Kinesis Streams里的内容进行处理，并将最终结果推送到AWS服务，例如Amazon S3，DynamoDB，Redshift，Amazon EMR或者Kinesis Firehose。

## Kinesis Video Streams

**Kinesis Video Streams**主要用来进行实时的视频处理，或者批量进行视频分析。

Kinesis Video Streams可以捕获来自多种设备类型的视频流数据（比如智能手机、网络摄像头、车载摄像头、无人机等）。

其工作的流程和Data Streams类似，如下图所示。

## Kinesis Data Firehose

**Kinesis Data Firehose**可以让我们的实时数据流传输到我们定义的目标，包括Amazon S3，Amazon Redshift，Amazon Elasticsearch 

Service (ES)和Splunk。

如下图所示，通过Kinesis Firehose，我们可以将数据流经过转换之后传输到S3存储桶上去，并且另外将源数据备份一份到另一个S3存储桶。

## Kinesis Data Analytics

使用**Kinesis Data Analytics**，我们可以使用标准的SQL语句来处理和分析我们的数据流。这个服务可以让我们使用强大的SQL代码来做

实时的数据流分析、创建实时的参数。