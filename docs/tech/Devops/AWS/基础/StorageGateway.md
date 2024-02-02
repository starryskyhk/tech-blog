---
title: Storage Gateway
slug: /tech/devops/aws/basic/Storage-Gateway
tags: [AWS,"Storage Gateway"]
date: 2024-01-31T01:45
---
# Storage Gateway

## 什么是Storage Gateway

Storage Gateway 将**本地软件设备与基于云的存储**相连接，从而在本地IT环境与AWS存储基础设施间提供具备数据安全功能的无缝集成。

可以使用此服务将数据存储到AWS云，利用经济高效的可扩展存储来帮助保持数据安全性

![image-20230322210035771](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/Stroage-Gateway.png)

## 不同类型

### File Gateway

使用基于**文件系统**的应用程序在S3中保存和访问数据，带有缓存功能

- ﻿文件网关 （File Gateway）可以让你使用行业标准文件协议（如网络文件系统 NFS)和服务消息块 (SMB）在Amazon S3 中存储和检

  索对象。

- ﻿其中，网关可以安装在VMware EsXi 或 Microsoft Fyper-V 或基于 Linux 内核的虚拟机 (KVM) 管理程序上运行的虚拟机 （VM) 部署

  到您的本地环境中。

- ﻿﻿NFS 支持V3 和v4.1

- ﻿SMB 支持 v2 和w3

- ﻿你可以结合使用 S3 的生命周期管理策路、跨区域复制（CRR）和版本控制来管理 S3 的数据

### Volume Gateway

将本地的**块存储**备份到云上，带有本地缓存功能

- ﻿卷网关 (Volume Gateway)）提供了支特云的存储卷，可以从本地应用服务器将该存储卷作为 isCSI 设备安装。
- ﻿卷网关可作为在 VMware ESXi、 KVM 或 Microsoft Hyper-V 管理程序上运行的虚拟机部署到本地环境中。

分为两种类型

- 缓存卷 (Cached Volumes): 数据存储在 S3中，只在本地保留经常访问的数据。

- 存储卷(Stored Volumes): 所有数据将会存储在本地，并且以异步的方式将快照备份到 Amazon S3

### Tape Gateway

**物理磁带**存储备份到云存储，自带缓存功能

- 磁带网关 (Tape Gateway）提供了支持云的虚拟

- 磁带存储

- 通过使用磁带网关，您可以采用经济高效且持久的方式在 GLACIER 或 DEEP_ARCHIVE 中存档备份数据。