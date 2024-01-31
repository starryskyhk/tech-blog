---
title: API Gateway
slug: /tech/devops/aws/basic/api-gateway
tag: [AWS,api-gateway]
date: 2024-01-31T01:45
---
# API Gateway

**Amazon API Gateway**可以让开发人员创建、发布、维护、监控和保护任何规模的API。你可以创建能够访问 AWS、其他 Web 服务以及

存储在 AWS 云中的数据的API。

API Gateway没有最低使用成本，我们用多少服务内容就花费多少

API Gateway和Lambda的结合可以构成如下图所示的无服务（Serverless）架构

![image-20230325124610708](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/API-gateway-and-lambda.png)

## 关于API Gateway，我们需要了解这些

- API Gateway可以缓存内容，从而更快地将一些常用内容发送给用户

- API Gateway是一种低成本的**无服务（serverless）方案**，而且它可以自动弹性伸缩（类似ELB，NAT网关）

- 可以对API Gateway进行节流，以防止恶意攻击

- 可以将API Gateway的日志放到CloudWatch中

- 如果你使用JavaScript/AJAX来跨域访问资源，那么你需要保证在API Gateway上已经开启了CORS (Cross-Origin Resource Sharing)功能

  - 如果没有开启CORS功能，在使用API Gateway做跨域访问的时候，可能会出现错误 *“Origin policy cannot be read at the remote resource?”*

    

