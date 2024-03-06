---
title: SAM
slug: /tech/devops/aws/basic/sam
tags: ["AWS","SAM"]
date: 2024-03-05T19:26
---
# SAM

## 什么是Serverless Application

​	Serverless应用是一种云计算模型，其中开发人员可以构建和部署应用程序，而无需管理底层的服务器基础架构。在传统的应用程序部署模型中，开发人员需要预先配置和管理服务器来托管应用程序，并根据预期的负载进行容量规划。

​	相比之下，Serverless应用的核心思想是将服务器管理的责任转移到云服务提供商。开发人员只需专注于编写应用程序的业务逻辑，而无需关心服务器的规模、配置和管理。服务提供商负责自动缩放服务器资源，根据实际需求分配计算资源。

​	在Serverless应用中，应用程序以函数（Function）的形式运行。这些函数是事件驱动的，可以在需要时自动触发执行。开发人员可以编写和部署一系列函数，每个函数执行特定的任务或处理特定的事件。当事件发生时，函数会被自动调用，执行相关的代码逻辑，并返回结果

### AWS Serverless Resources

Lambda、EventBridge、Step Function、SQS、SNS、API GateWay、S3、RDS、DynamoDB......

## 什么是SAM

AWS Serverless Application Model (AWS SAM) 是一个工具包，可改善在 AWS 上构建和运行无服务器应用程序的开发人员体验。AWS SAM 由两个主要部分组成：

1. **AWS SAM 模板规范** - 一个开源框架，可用于在 AWS 上定义无服务器应用程序基础设施。
2. **AWS SAM 命令行界面 (AWS SAM CLI)** - 一个命令行工具，可与 AWS SAM 模板和受支持的第三方集成结合使用，用于构建和运行无服务器应用程序。

### AWS SAM 模板规范

- **是基于 AWS CloudFormation 构建的** - 利用 AWS SAM 模板对资源和属性配置的广泛支持，直接在模板中使用 AWS CloudFormation 语法。如果您已经熟悉 AWS CloudFormation，则无需了解新服务即可管理应用程序基础设施代码。
- **是 AWS CloudFormation 的扩展** - AWS SAM 提供自己独有的语法，专门用于加快无服务器开发。可以在同一个模板中使用 AWS CloudFormation 和 AWS SAM 语法。
- **是一种抽象的速记语法** - 借助 AWS SAM 语法，您可以用更少的代码行快速定义基础设施，而且出错的可能性更低。它的语法经过特别精心设计，可消除定义无服务器应用程序基础设施的复杂性。
- **可转换** - AWS SAM 通过 AWS CloudFormation 来完成将模板转换为配置基础设施所需的代码这项复杂工作。

## 怎么使用SAM



## SAM与Cloudformation

## SAM的本地开发

