---
title: Cognito&Web-Identity-Federation
slug: /tech/devops/aws/basic/Cognito
tag: [AWS,Cognito,Web-Identity-Federation]
date: 2024-01-31T01:45
---
# Cognito&Web-Identity-Federation

## 什么是Cognito

Amazon Cognito 的两个主要组件是用户池 （User Pool) 和身份池(Identity Pool) 

- ﻿用户池是为您的 Web 和移动应用程序用户提供注册和登录选项的用户目录。(认证）
- ﻿身份池提供 AWS 凭证以向用户投子对其他 AWS 服务的访问权限（授权）

用户池是 Amazon Cognito 申的用户目录。您的应用程序用户可以通过用户池直接登录，也可以通过第三方身份提供商(IdP) 联合登录，比如 Facebook、Google 和 Amazono

借助身份池，您的用户可以获取临时 AWS 凭证来访问 AWS 服务，如 Amazon S3 和DynamoDB。 身份池支持磨名来宾用户以及通过第三方 IdP 的联合身份验证

## 灵活和完全托管的身份认证

![image-20230325171138620](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/cognito.png)

## 使用用户池访问资源

成功进行用户池登录后，Web或移动应用程序将收到来自Cognito的**用户池令牌**，可以使用这些令牌控制对服务器端资源的访问，也可以创建用户池组来管理权限以及表示不同类型的用户

![image-20230325171424637](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/pool.png)