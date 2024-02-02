---
title: Directory Service
slug: /tech/devops/aws/basic/Directory-Service
tags: [AWS,"Directory Service"]
date: 2024-01-31T01:45
---
# Directory Service

## 什么是 Active Directory

主要功能：

- 服务器及客户端管理
- 用户服务
- 资源管理
- 桌面配置
- 应用系统支撑

## 部署选择

- 自建EC2
- Simple AD
- 托管Microsoft AD
- AD Connector 连接器
- Amazon Cloud Directory

## 托管Active Directory介绍

AWS Managed Microsoft AD 在AWS 云中创建一个完全托管的 Microsoft Active Directory, 由Windows Server 2012 R2 提供支持。当您使用 AWS Managed Microsoft AD 创建目录时，AWSDirectory Service 将代表您创建两个域控制器并添加 DNS 服务。域控制器在 VPC 的不同子网中创建;此冗余帮助确保您的目录即使在出现故障时仍可访间。如果您需要更多域控制器，您可以在以后添加它们

### 核心功能

- 真实的微软AD
- 可以和本地的AD建立信任域的关系
- 支持单点登录
- 组策略支持
- 支持MFA

## Active Directory Connector

- AD Connector 是连接本地 AD 服务器和 AWS 云上服务的一个代理服务
- ﻿用户登录 Aws 应用程序时，AD Conmector将登录请求转发到您的本地 Active Directory 域控制器进行身份验证
- ﻿AD Connector 还允许用户通过使用现有 Active Directory 凭证登录来访问 AWS 管理控制台和管HI AWS WE

## Simple Active Directory

- ﻿精简版的微软 Active Directory 服务
- ﻿支持用户账户、组成员资格、加入 Linux 域或者基于 Windows 的 EC2 实例、基于 Kerberos 的 SSO 以及组策略
- ﻿与以下AWS 应用程序兼容：Amazon WorkSpaces, Amazon WorkDocs, AmazonQuickSight和 Amazon WorkMail

**小型**：支持最多500个用户

**大型**：主持最多5000个用户

## 使用场景

1. 使用AD凭证登录AWS
2. 将EC2实例加入AWS Managed Microsoft AD域进行管理
3. 连接office 365或者其他云应用
4. 本地AD扩展到云上
5. 使用单个AWS Managed Microsoft AD目录，跨多个账户和VPC轻松管理部署在EC2实例中的Window工作负载