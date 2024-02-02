---
title: CloudFront
slug: /tech/devops/aws/basic/CloudFront
tags: [AWS,CloudFront]
date: 2024-01-31T01:45
---
# CloudFront

## 什么是CloudFront



**Amazon CloudFront**是一项加快**静态和动态**Web内容分发给用户的速度的Web服务。它通过全球数据中心(边缘站点)网络传输内容。当用户请求用CloudFront提供的内容时，请求被路由到提供最低延迟的边缘站点。

- 如果该内容已经在延迟最短的边缘站点上，CloudFront将直接提供它。
- 如果不在，CloudFront将从已定义的源(S3、Http服务器，Web服务器)检索内容

## 使用场景

- 流媒体
- 静态网站资源
- 静态文件下载
- 整个网站
- 移动应用(API)



## 什么是内容分发网络(CDN)

CDN的全称是**Content Delivery Network**，即内容分发网络。基本思路是解决传统情况下用户访问网站的时候直接访问源服务器，而利

用CDN你访问的是位于全球各地的分发网络（边缘站点），从而达到更快的访问速度和减少源服务器的负载。

举个不是十分恰当的例子，苹果公司的总部在美国，但它有位于全世界不同地方的苹果零售店，为就近的客户提供服务。并且每一个零售

店的内容都是相近的，都是由美国总部“分发”过来的。所以每次你想去购买最新的iPhone的时候，你不需要飞到美国去购买，而去离自己

最近的苹果零售店就可以了！

如下图所示，在没有CDN的情况下，位于全球各地的用户都需要跨越长距离的地理位置访问位于某一个地方的源服务器。一方面这样的情

况下网络延迟是一个非常严重的问题，另一方面也会对源服务器的负载有很大的影响。

而在有CDN的情况下，用户不直接访问源服务器，而是访问位于全球不同地方的Edge站点。这些边缘站点都保存了源服务器的文件缓存,

也离用户最近，因此能快速地提供用户所需要的信息内容。

目前基本所有大型的网站和有全球业务的企业都用到了CDN技术，国内CDN技术比较出名的是蓝讯和网宿，国际上最出名的毫无疑问是Akamai。

## HTML网页如何从CLoudFront进行加载

![image-20230322194939458](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/cloudfront-01.png)

### 缓存静态内容

#### 缓存没有命中

![image-20230322195054473](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/cloudfront-02.png)

#### 缓存命中

![image-20230322195127303](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/cloudfront-03.png)

## 基础概念

### Distribution

- 定义了域名和源
- 定义了其他属性
  - 默认cloudfront.net域名
  - 自定义域名
  - TLS证书和安全策略
  - WAF网络AC安全防护
  - HTTP/1.1、2、3
  - 标准日志

### 源和源组

- 任何类型的HTTP节点都可以时源
  - S3、ELB、Lambda等
  - 其他有域名的自定义源
  - TCP和TLS配置
  - 超时时间
  - 多个源组之前的故障转移

### 特点

- 不只是可以从边缘站点读取数据，还可以往边缘站点写入数据（比如上传一个文件），边缘站点会将写入的数据同步到源上
- 在CloudFront上的文件会被缓存在边缘节点，缓存的时间是**TTL（Time To Live）**。文件存在超过这个时间，缓存会被自动清除
- 如果在到达TTL时间之前，你希望更新文件，那么也可以**手动清除缓存**，但将会被AWS**收取一定的费用**

## 安全和签名

### 内置的安全特点

- 托管的服务
- 保护资源免受于常见的基础架构层(3、4)的DDoS攻击
  - 只接受HTTP\HTTPS请求
  - 只接受格式良好的数据包和HTTP请求
  - SYN代理
  - 自动的流量检测，在边缘站点做数据清洗
- 满足合规要求： PCI DSS等

![image-20230322203146442](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/cloudfront-security.png)

### 传输中的加密-HTTPS

- 默认的域名 (xxxx.cloudfront.net）支持TIS
- 白定义域名一使用免费的 Amazon Certificate Manager （ACM)创建TIS 证书
- 控制 TIS 策略，选择TLS 版本（比如 v1.3），尽可能将 HTTP 重定向到 HTTPS
- ECDSA 证书支持
- Server Name Indication (SNI) 功能
  - ﻿SNI 启用（默认操作）一服务器名字在TIS握手的时候提供
  - ﻿﻿SNI 禁用一TIS 证书需要固定 IP

### 提供私有内容

通过两种方法提供私有内容给最终用户

1. 在CLoudfront边缘缓存闲置文件的访问权限(包括使用签名URL或签名Cookies
2. 在源处限制文件的访问权限
   1. 在S3设置Origin Access Identity(OAI)
   2. 设置自定义的HTTP标头

#### Signed URL VS Signed Cookies

SignedURL

- 如果使用RTMP分配，因为Signed Cookies不支持
- 如果想限制某些特定的文件，比如通过CloudFront提供一个文件的下载
- 如果客户端不支持

Signed Cookies

- 如果想限制很多文件的访问权限
- 如果不想更改现有的URL构成
- 如果限制的文件比较多(1 cookie = 很多文件)

签名URL 和签名 Cookie 都需要配置以下策略：

- ﻿URI过期时间
- ﻿IP范围
- ﻿可信任的签名方 （哪个 AWS账号可以创建签名 URLs)

Origin Access Identity(OAD) 认证可以认为是一个虚拟的 IAM 用户，它有权限代表 CloudFront 到源 S3 桶里面

获取私有内容

- ﻿用户只能访问 CloudFront 的内容，并且通过 CloudFront 间接访问源站。用户不能直接访问源站
   App tHI CloudFront SDK来创建签名URL或者签名Cookie
- ﻿签名 URL 需要根用户管理的密钥对来生成