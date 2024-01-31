---
title: WAF
slug: /tech/devops/aws/basic/WAF
tag: [AWS,"WAF"]
date: 2024-01-31T01:45
---
# WAF

## 什么是WAF

AWS WAF 是一种 **Web 应用程序防火墙**，可帮助保护您的 Web 应用程序或 API 免遭常见 Web漏洞的攻击，这些漏洞可能会影响可用性、损害安全性或消耗过多的资源。AWS WAF 允许您创建防范常见攻击模式（例如 **SQL注入**或跨站点脚本）的安全规则，以及滤除您定义的特定流量模式的规则，从而让您可 以控制流量到达您的应用程序的方式。

## WAF能防御什么

- 防止站点受到**SQL注入攻击**
- 防止**跨站脚本攻击(XSS)**
- 阻止恶意的**网络爬虫**， **BOTs**
- 防止DDoS(HTTP/HTTPS泛洪)

## WAF主要特性

- 使用您指定的条件针对 Web 政击提供额外保护，包括

  - 存在可能是恶意的 SQL 代码（称为 SOL注入）。

  - 存在可能是恶意的脚本（称为跨站点脚本。

  - 请求源自的IP 地址

  - 其他（国家/地区，标头，请求中的宇符串，请求的长度等）

- 规则可以允许、阻止、或统计满足指定条件的Web请求

- 来自AWS和AWS Marketplace卖家的**托管规则组**

- 实时指标和采样的Web请求

- 使用AWS WAF API的**自动化管理**

## 在CloudFront上使用WAF

![image-20230325152931019](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/WAS.png)