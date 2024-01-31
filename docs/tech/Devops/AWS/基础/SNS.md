---
title: SNS
slug: /tech/devops/aws/basic/SNS
tag: [AWS,"SNS"]
date: 2024-01-31T01:45
---
# SNS

## 什么是SNS

**SNS (Simple Notification Service)** 是一种完全托管的发布/订阅消息收发和移动通知服务，用于协调向订阅终端节点和客户端的消息

发

和**SQS (Simple Queue Service)**一样，SNS也可以轻松分离和扩展微服务，分布式系统和无服务应用程序，对程序进行**解耦**

我们可以使用SNS将消息推送到SQS消息队列中、AWS Lambda函数或者HTTP终端节点上

SNS通知还可以发送推送通知到IOS，安卓，Windows和基于百度的设备，也可以通过电子邮箱或者SMS短信的形式发送到各种不同类型的设备上

## 特点

- SNS是实时的**推送服务（Push）**，有别于SQS的**拉取服务（Pull/Poll）**
- 拥有简单的API，可以和其他应用程序兼容
- 可以通过多种不同的传输协议进行集成
- 便宜、用多少付费多少的服务模型
- 在AWS管理控制台上就可以进行简单的操作

## SNS能推送的目标

- HTTP
- HTTPS
- Email
- Email-JSON
- SQS
- Application
- Lambda