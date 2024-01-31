---
title: Network
slug: /tech/devops/aws/basic/Network
tag: [AWS,"Network"]
date: 2024-01-31T01:45
---
# Network

## Security Group

### 什么是安全组

安全组充当 EC2 实例的虚拟防火墙，用于控制传入和传出流量。

入站规则控制传入到实例的流量，出站规则控制从实例传出的流量。

启动实例时，您可以指定一个或多个安全组。如果您未指定安全组，则Amazon EC2 将使用默认安全组。您可以为每个安全组添加规则，

规定流入或流出其关联实例的流量。您可以随时修改安全组的规则。新规则和修政后的规则将自动、马上应用到与安全组相关联的所有实

例。在 Amazon EC2 确定是否允许流量到达实例时，它评估与实例关联的所有安全组中的所有规则

### 特性    

- 默认情况下，安全组允许所有出战流量(除了25) 25是邮件服务器的
- 安全组只有允许的策略，没有拒绝的策略
- 允许根据协议和端口号筛选流量
- 安全组是有状态的，如果流量允许出站，则对应的响应流量也会允许进站，即是安全组inbund没有配置，但是主动发起则会被拒绝
- 可以随时添加或删除规则，即时生效
- 将多个安全组与一个实例关联时，将汇总每个安全组的规则，并取并集

### 源或目标

1. 一个单独的IPv4或v6地址，必须使用/32前缀长度，eg：198.123.321.1/32
2. 采用CIDR块表示法的地址，eg: 231.123.134.0/24
3. 前缀列表id，eg:pl-12332m123j
4. 其他安全组，与指定安全组关联的实例就可以访问与该安全组关联的实例。



## VPC

### 什么是VPC

**Amazon Virtual Private Cloud (Amazon VPC)**允许你在已定义的虚拟网络内启动AWS资源。这个虚拟网络与你在数据中心中运行的传

统网络极其相似，并会为你提供使用AWS的可扩展基础设施的优势。

简单来说，VPC就是一个AWS用来隔离你的网络与其他客户网络的虚拟网络服务。在一个VPC里面，用户的数据会逻辑上地与其他AWS租

户分离，用以保障数据安全。

**可以简单地理解为一个VPC就是一个虚拟的数据中心**，在这个虚拟数据中心内我们可以创建不同的子网（公有网络和私有网络），搭建我

们的网页服务器，应用服务器，数据库服务器等等服务。

### 特点

- VPC内可以创建多个子网
- 可以在选择的子网上启动EC2实例
- 在每一个子网上分配自己规划的IP地址
- 每一个子网配置自己的路由表
- 创建一个Internet Gateway并且绑定到VPC上，让EC2实例可以访问互联网
- VPC对你的AWS资源有更安全的保护
- 部署针对实例的安全组（Security Group）
- 部署针对子网的**网络控制列表（Network Access Control List）**
- 一个VPC可以跨越多个可用区（AZ）
- **一个子网只能在一个可用区（AZ）内**
- 安全组（Security Group）是有状态的而网络控制列表（Network Access Control List）是无状态的
  - 有状态：如果入向流量被允许，则出向的响应流量会被自动允许
  - 无状态：入向规则和出向规则需要分别单独配置，互不影响
- VPC的子网掩码范围是从/28到/16，不能设置在这个范围外的子网掩码
- VPC可以通过Virtual Private Gateway (VGW) 来与企业本地的数据中心相连
- VPC可以通过AWS PrivateLink访问其他AWS账户托管的服务（VPC终端节点服务）

### 默认VPC

- 在每一个区域（Region），AWS都有一个默认的VPC
- 在这个VPC里面所有子网都绑定了一个路由表，其中有默认路由（目的地址 0.0.0.0/0）到互联网
- 所有在默认VPC内启动的EC2实例都可以直接访问互联网
- 在默认VPC内启动的EC2实例都会被分配公网地址和私有地址

### VPC Peering

**VPC Peering**可是两个VPC之间的网络连接，通过此连接，你可以使用IPv4地址在两个VPC之间传输流量。这两个VPC内的实例会和如果在同一个网络一样彼此通信。

- 可以通过AWS内网将一个VPC与另一个VPC相连
- 同一个AWS账号内的2个VPC可以进行VPC Peering
- 不同AWS账号内的VPC也可以进行VPC Peering
- 不支持VPC Transitive Peering
  - 如果VPC A和VPC B做了Peering
  - 而且VPC B和VPC C做了Peering
  - 那么VPC A是**不能**和VPC C进行通信的
  - 要通信，只能将VPC A和VPC C进行Peering

### 弹性 IP(Elastic IP)

弹性IP是专门用来分配AWS服务的IPv4地址，通过申请弹性IP地址，你可以将一个固定的公网IP分配给一个EC2实例。在这个实例无论重

启，关闭，甚至终止之后，你都可以回收这个弹性IP地址并且在需要的时候分配给一个新的EC2实例。

默认情况下，AWS分配的公网IP地址都是浮动的，这意味着如果你关闭再启动你的EC2实例，这个地址也会被释放并且重新分配。但是弹

性IP地址是和你的AWS账号绑定的，除非你手动释放掉这个地址，否则这个地址可以一直被你拥有。

### AWS预留地址

例如10.0.0.0/24中

- 10.0.0.0: 网络地址

- 10.0.0.1: 由AWS保留，用于VPC服务器

- 10.0.0.2: 由AWS保留，DNS服务器的IP地址是中为VPC网络范围的基址+2；但是也保留了每个子网范围基址+2的IP地址，对于包含多

  个CIDR快的VPC，DNS服务器的IP地址位于主要CIDR中

- 10.0.0.3: 由AWS保留，供未来使用

- 10.0.0.255: 网络广播地址，VPC不支持广播，所以保留此地址

### 注意

VPC必须启动**DNS解析**和DNS hostname才可以正常访问互联网

## VPC流日志(Flow Logs)

**VPC流日志（Flow Logs）**可以捕获经过你的VPC的网络流量（入向和出向），Flow Logs的日志数据保存在Amazon CloudWatch Logs中。

创建了Flow Logs后，你可以在Amazon CloudWatch Logs中查看和检索其数据。

Flow logs可以在以下级别创建：

- VPC级别
- 子网级别
- 网络接口级别

### 特性

- 对于Peer VPC不能开启Flow Logs功能，除非这个VPC也在你的账户内
- Flow Logs创建后不能更改其配置

VPC Flow Logs并不捕获所有经过VPC的流量，以下流量将不会被捕获：

- 实例访问Amazon DNS服务器（即.2地址）的流量
- Windows进行Windows许可证激活的流量
- 访问实例Metadata的流量（即去往169.254.169.254的流量）
- DHCP流量
- 访问VPC路由器的流量（即.1地址）

![image-20230312164129675](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/vpc-flow.png)

## VPC终端节点(VPC Endpoints)

### 什么是Endpoints

在一般的情况下，如果你需要访问S3服务，EC2实例或者DynamoDB的资源，你需要通过Internet公网来访问这些服务。有没有更快速、

更安全的访问方式呢？

**VPC终端节点（VPC Endpoints）**提供了这种可能性。

VPC终端节点能建立VPC和一些AWS服务之间的高速、私密的“专线”。这个专线叫做PrivateLink，使用了这个技术，你无需再使Internet

网关、NAT网关、VPN或AWS Direct Connect连接就可以访问到一些AWS资源



**终端节点（Endpoints）**是虚拟设备，它是以能够自动水平扩展、高度冗余、高度可用的VPC组件设计而成，你也不需要为它的带宽限制

和故障而有任何担忧。

**AWS PrivateLink**是专为客户设计用于特定用途的AWS内网，它采用了高度可用并且可扩展的架构（意味着你无需再为PrivateLink的性

能和高可用性做任何额外架构设计).

### Endpoints支持类型

VPC终端有两种类型：**接口**和**网关**

其中接口类型支持以下服务：

- Amazon CloudWatch Logs
- AWS CodeBuild
- Amazon EC2 API
- Elastic Load Balancing API
- AWS Key Management Service
- Amazon Kinesis Data Streams
- AWS Service Catalog
- Amazon SNS
- AWS Systems Manager
- 其他 AWS 账户托管的终端节点服务
- 支持的 AWS Marketplace 合作伙伴服务

网关类型支持以下服务：

- **Amazon S3**
- **DynamoDB**



## VPC对等连接(VPC Peering)

### 什么是VPC Peering

**VPC对等连接（VPC Peering）**是两个VPC之间的连接，通过VPC Peering，你可以使用私有地址让两个VPC之间相互通信，就像它们在同

一个VPC内一样。

你可以在自己的两个VPC之间建立对等连接，也可以在自己的VPC与其他AWS账号的VPC之间建立对等连接，还可以在位于不同区域的

VPC之间建立对等连接

### How to

1. 创建Peering connection

2. 在两个VPC的路由表中，必须添加Peering Connection

   VPC A

   | Route table  | Destination    | Target |
   | :----------- | :------------- | :----- |
   | VPC A        | `VPC A CIDR`   | Local  |
   | `VPC B CIDR` | pcx-`11112222` |        |

   VPC B 

   | Route table  | Destination    | Target |
   | :----------- | :------------- | :----- |
   | VPC B        | `VPC B CIDR`   | Local  |
   | `VPC A CIDR` | pcx-`11112222` |        |

  	

### 注意

- 如果两个VPC出现了地址覆盖/重复，那么这两个VPC不能做Peering
  - 例如10.0.0.0/16的VPC与10.0.0.0/24的VPC是不能做对等连接的
- 参与VPC Peering的两个VPC可以来自不同的区域（这个功能以前是没有的）
- VPC Peering不支持Transitive Peering
  - 即如果VPC A与VPC B进行了对等连接
  - VPC B与VPC C进行了对等连接
  - VPC A是不能与VPC C进行直接通信的，必须再建立VPC A和VPC C的对等连接才可以

## ACL

### 什么是ACL

**网络访问控制列表（NACL）**与安全组（Security Group）类似，它能在子网的层面控制所有入站和出站的流量，为VPC提供更加安全的

保障。

### 特点

- 在**默认VPC**内会有一个默认的网络ACL（NACL），它会**允许**所有入向和出向的流量
- 你可以创建一个自定义的网络ACL，在创建之初所有的入向和出向的流量都会被**拒绝**，除非进行手动更改
- 对于所有VPC内的子网，每一个子网都需要关联一个网络ACL。如果没有关联任何网络ACL，那么子网会关联默认的网络ACL
- 一个网络ACL可以关联多个子网，但一个子网只能关联一个网络ACL
- 网络ACL包含了一系列（允许或拒绝）的规则，网络ACL会按顺序执行(从小到大)，一旦匹配就结束，不会再继续往下匹配
- 网络ACL有入向和出向的规则，每一条规则都可以配置允许或者拒绝
- 网络ACL是无状态的（安全组是有状态的）
  - 被允许的入向流量的响应流量必须被精准的出向规则所允许（反之亦然）
  - 一般至少需要允许临时端口（TCP 1024-65535）

### 安全组 VS ACL

| **安全组**                                                   | **网络** **ACL**                                             |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 在实例级别运行                                               | 在子网级别运行                                               |
| 仅支持允许规则                                               | 支持允许规则和拒绝规则                                       |
| 有状态：返回数据流会被自动允许，不受任何规则的影响           | 无状态：返回数据流必须被规则明确允许                         |
| 只有在启动实例的同时指定安全组、或稍后将安全组与实例关联的情况下，操作才会被应用到实例 | 自动应用于与之关联的子网中的所有实例（因此，如果安全组规则过于宽松，它提供额外的防御层） |

## NAT(Network Address Transition)

### 什么是NAT

NAT的全程是“**Network Address Translation**”，中文解释是“**网络地址转换**”，它可以让整个机构只使用一个公有的IP地址出现Internet

上。

NAT是一种把内部私有地址（192.168.1.x，10.x.x.x等）转换为Internet公有地址的协议，它一定程度上解决了公网地址不足的问题。

### NAT实例

- 创建NAT实例之后，一定要**关闭源/目标检查（Source/Destination Check）**
- NAT实例需要创建在公有子网内
- 私有子网需要创建一条默认路由（0.0.0.0/0），指到NAT实例
- NAT实例的瓶颈在于实例的大小，如果遇到了网络吞吐瓶颈，你可以加大实例类型
- 需要自己创建弹性伸缩组（Auto Scaling Group），自定义脚本来达到NAT实例的高可用（比如部署在多个可用区）
- 需要关联一个安全组（Security Group）

### NAT网关(NAT Gateway)

- 网络吞吐可以达到10Gbps
- 不需要为NAT的操作系统和程序打补丁
- 不需要关联安全组
- 自动分配一个公网IP地址（EIP）
- 私有子网需要创建一条默认路由（0.0.0.0/0）到NAT网关
- 不需要更改源/目标检查（Source/Destination Check）

### 堡垒机

**堡垒机（Bastion Host）**又叫做跳板机（Jump Box），主要用于运维人员远程登陆服务器的集中管理。运维人员首先登陆到这台堡垒机

(公网)，然后再通过堡垒机管理位于内网的所有服务器。

堡垒机可以对运维人员的操作行为进行控制和审计，同时可以结合Token等技术达到更加安全的效果。



## Direct Connect线路

### 什么是Direct Connect

**AWS Direct Connect线路**可以让你通过以太网光纤线路连接你的内部网络与AWS Direct Connect Location，可以打通你的内部网络与

AWS的网络，从而拥有高速率、低延迟，安全、可靠的专线网络。

一般来说，我们要搭建一条Direct Connect线路，需要先通过本地的网络服务提供商将我们内部网络接到一个同城市的Direct Connect 

Location （这个Location可以是Equinix, CoreSite, Digital Reality的数据中心，全球有几十个这样的地理位置）上。然后需要向AWS申请

**Cross Connect**，将服务提供商的路由器直接连接到同一个机房不同机柜的AWS设备上。

通过这样的连接，我们可以端到端地利用专线的稳定性和高吞吐量访问我们位于AWS内的所有资源。

![image-20230312174456641](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/direct-connect.png)

### 特点

- AWS提供的Direct Connect的带宽是**1Gbps**或者是**10Gbps**
- 少于1Gbps速率的Direct Connect线路可以向AWS Direct Connect合作伙伴申请，可以申请50Mbps到500Mbps的线路
- Direct Connect的数据包使用**802.1Q协议**进行封装（Q-in-Q tagging）

### VPC与DC的区别

- VPN连接可以在数分钟之内就搭建成功。如果有紧急的业务需求，可以使用VPN连接。VPN连接是基于互联网线路的，因此带宽不

  高，稳定性也不好，但价格便宜

- AWS Direct Connect使用的是专线，你的数据不会跑在互联网上，是私有的、安全的网络



## AWS Transit Gateway

### 什么是Transit Gateway

唯一支持IP多播的Gateway

Transit Gateway 是一个网络中转枢纽，您可以使用它来互连您的虚拟私有云 (VPC) 和本地网络。随着您的云基础设施在全球范围内扩

展，区域间对等连接使用 AWS 全球基础设施将中转网关连接在一起。您的数据会自动加密，绝不会在公共互联网上传输。

### 为什么使用它

多个VPC如果要互通，需要很多个VPC Peering和AWS Direct Connect Gateway

![image-20230312182033380](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/Transit-gateway1.png)

### 使用Transit gateway

同一个Transit Gateway必须是同一region

![image-20230312182356179](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/transit-gateway2.png)

### 核心功能

- 中心化路由策略，管理云上VPC和本地网络
- 通过多个VPN连接增加网络吞吐
- 可以自动扩展
- 跨账号管理VPC
- 灵活的访问隔离和路由策略
- 简化的管理

### 关键概念

#### 附件 (Attachment）

- ﻿﻿WRIDAYS VPC, AWS Direct Connect Gateway, VPN tILl Attachment WI It*II - + TGW ETi
- ﻿你也可以将另一个TGW 以 Peering 的形式关联到TGW 上

#### 路由表

- ﻿TGW 有一个默认路由表，你也可以创建其他路由表
- ﻿路由表肉可以有动态路由，或者静态路由
- ﻿默认情况下，新的 Attachment 会关联到默认路由表上

#### 关联 (Association)

- ﻿一个 Attachment 可以关联并且只能关联一个路由表
- ﻿一个路由表可以关联多个 Attachment， 也可以一个都不关联

#### 路由传播 (Route Propagation)

- ﻿通过路由传播，你可以把 VPC 或者 VPN 内的路由动态传播到TGW 肉
- ﻿对于 VPN 连按，你可以通过 BGP 动态路由协议把云上的路由条目传播到自己的数据中心

### 特性

- 区域级的云上路由器
- 弹性扩展
- 高可用

![image-20230312183109790](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/devops/AWS/transit-gateway3.png)



## GLocal Accelerator

### 什么是AWS GLocal Accelerator

AWS Global Accelerator 可以提高您的本地或全球用户获得的应用程序的可用性和性能。它提供静态 IP地址，充当您在单个或多个 AWS 

区域中的应用程序终端节点（例如，您的 Application Load Balancers、网络负载均衡器、Amazon EC2 实例或弹性IP）的固定入口点

### 核心功能

- 静态IP地址，将流量引导到一个或多个AWS区域，支持BYOIP
- 有60%的速度提升，目标可指向ALB,NLB或EC2实例
- 如果终端有故障，30秒内可以完成流量切换
- 不需要更改客户端DNS配置或等等待TTL缓冲时间就可以切换目标到其他可用区或区域