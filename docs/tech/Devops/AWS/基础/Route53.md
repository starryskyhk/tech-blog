---
title: Route3
slug: /tech/devops/aws/basic/Route3
tag: [AWS,"Route3"]
date: 2024-01-31T01:45
---
# Route3

## 什么是Route53

 **Route 53**是一种高可用、高扩展性的云DNS服务。它为开发人员和企业提供一种非常可靠和经济的方法，把对用户友好的、易读的域名

（比如aws.xiaopeiqing.com）转换为IP地址（例如120.79.65.207）。目前Amazon Route53已经支持IPv6。

## DNS

### 什么是DNS

DNS的全称是**Domain Name System**，它的作用就是将一个域名最终解析成一个IP地址

比如在浏览互联网的时候都会记住一些比较常用的域名，例如www.baidu.com, www.qq.com, www.google.com等等，这些都是比

较容易记住的名字。而如果要去记忆12位十进制组成的IP地址就相对困难很多了。

DNS在这里面就起到了翻译的功能，保证我们通过易读的名字能访问到IP地址和后台的真实服务器。

### 域名注册商

我们可以在域名注册商上注册新的域名，比如国内的万网（现在已经被阿里云收购），新网，国外的Godaddy等。

现在AWS也算是一个域名注册商，因此可以直接在AWS Route53的界面选择并购买新的域名。

### 不同的DNS记录

- SOA —— Start of Authority记录了关于该域名的很多信息，包括

  - Primary Name Server – 主DNS服务器
  - Responsible Mail Address – 管理员的邮箱地址
  - Serial – SOA记录数据的版本号，每次DNS记录更新，版本号都会加1。备用DNS服务器发现版本号不同，会向主DNS服务器同步
  - Refresh – 备用DNS服务器向主DNS服务器检查更新的时间间隔
  - Retry – 备用DNS服务器向主DNS服务器请求更新失败后的重试等待时间
  - Expire – 备用DNS服务器在超过该时间后将停止应答该域名的DNS查询
  - Default TTL – 默认DNS记录的TTL时间

- **NS** – Name Server记录描述了某个域名所使用的权威的DNS服务器，所有其他DNS服务器进行轮询查询的时候最终都需要到这些权

  威的DNS服务器上进行查询，获取最新的记录

- **A记录** – A （Address）记录可以将域名直接转换为IPv4的地址，比方说将aws.xiaopeiqing.com转换为地址120.79.65.207

- **CNAME** – CNAME （Canonical Name）可以将一个域名指向另一个域名。比如将aws.xiaopeiqing.com指向xiaopeiqing.com

- **Alias记录** – 和CNAME类似，又叫做别名记录可以将一个域名指向另一个域名。

  - **和CNAME最大的区别是，Alias可以应用在根域（Zone Apex）。即可以为xiaopeiqing.com的根域创建Alias记录，而不能创**

    **建CNAME**

  - 别名记录可以节省你的时间，因为Route53会自动识别别名记录所指的记录中的更改。例如，假设example.com的一个别名记录

    指向位于lb1-1234.us-east-2.elb.amazonaws.com上的一个ELB负载均衡器。如果该负载均衡器的IP地址发生更改，Route53将

    在example.com的DNS应答中自动反映这些更改，而无需对包含example.com的记录的托管区域做出任何更改。

- **TTL** – Time to Live时间是DNS记录在DNS服务器或用户端上缓存保留的时间，在TTL时间到达之前，DNS记录将缓存在其他非权威

  DNS服务器或者用户主机上

  - TTL时间如果设置过短，那么会增加记录更新的频率，同时增加递归查询的时间。即每次到达TTL时间，其他DNS服务器都要再次

    访问该域名服务器来更新信息

  - TTL时间如果设置过长，那么在做DNS记录更新的时候，真实用户会很长时间之后才能查询到最新版本的记录（要等到TTL时间结

    束）



- 弹性负载均衡器（ELB）没有固定的IPv4地址，在使用ELB的时候永远使用它的DNS名字。很多场景下我们需要绑定DNS记录到ELB的

  endpoint地址，而不绑定任何IP

## 路由策略

### **简单路由策略（Simple Routing Policy）**

提供单一资源的策略类型，即一个DNS域名指向一个单一目标

### **加权路由策略（Weighted Routing Policy）**

按照不同的权值比例将流量分配到不同的目标上去

使用AWS **Route53**的**加权路由策略（Weighted Rouing Policy）**，可以将多个资源关联到同一个域名（例如iteablue.com），并根据不

同的权值比重将流量分发给不同的资源。

我们可以使用加权路由策略来做负载均衡，或者软件测试。

比如将5%的流量引导到测试应用上，观看测试应用的效果。

我们可以为每一个记录都分配一个权值(0-255)，每一条记录分配到的总流量的比例是权值/所有记录的权值之合，公式如下：

Weight for a specified record / Sum of the weights for all records

### **延迟路由策略（Latency Routing Policy）**

根据网络延迟的不同，将与用户延迟最小的结果应答给最终用户

例如，配置两个记录，资源分别位于中国和美国，如果配置延迟路由，那么先检测延迟，选择延迟最低的路由

### **地理位置路由策略（Geolocation Routing Policy）**

根据用户所在的地理位置，将不同的目标结果应答给用户

比如可以让位于东京的用户访问东京的ELB负载均衡器，位于首尔的用户访问首尔的ELB负载均衡器，位于新加坡的用户也访问首尔的ELB

负载均衡器等。

和延迟没有关系，即使位于中国的用户，在新加坡的ELB上延迟最低，那也会选择中国的ELB

### **故障转移路由策略（Failover Routing Policy）**

配置主动/被动（Active/Passive）的故障转移策略，保证DNS解析的容灾

在正常的情况下所有的流量应该解析到主的DNS记录上面。只有当这个主的DNS记录不健康的时候，Route53才会自动将所有流量解析到

备用的DNS记录上面。

我们可以对域名开启健康检查（Health Check）功能，对域名（服务和端口）的健康状态进行监控，一旦健康状态出现问题，Route53就

会自动进行切换