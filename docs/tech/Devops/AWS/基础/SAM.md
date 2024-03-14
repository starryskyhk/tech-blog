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

## SAM与Cloudformation

`AWS::Serverless` 转换是由 CloudFormation 托管的宏，它获取用 AWS Serverless Application Model（AWS SAM）语法编写的整个

模板，并将其转换并扩展为兼容的 CloudFormation 模板

## SAM 案例

![image-20240307192630056](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/note/tech/AWS/SAM-example.png)

<p id="basic-example">使用SAM模版代码编写</p>

```yaml
AWSTemplateFormatVersion: 2010-09-09
Transform: AWS::Serverless-2016-10-31
Resources:
  getAllItemsFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: src/get-all-items.getAllItemsHandler
      Runtime: nodejs12.x
      Events:
        Api:
          Type: HttpApi
          Properties:
            Path: /
            Method: GET
    Connectors:
      MyConn:
        Properties:
          Destination:
            Id: SampleTable
          Permissions:
            - Read
  SampleTable:
    Type: AWS::Serverless::SimpleTable
```

这个模版定义了以下基础设施：

- 使用 AWS Lambda 服务的函数。
- 使用 Amazon API Gateway 服务的 HTTP API。
- 使用 Amazon DynamoDB 服务的数据库。
- 这些服务互相交互所需的 AWS Identity and Access Management (IAM) 权限。

要配置此基础设施，需要将模板部署到 AWS CloudFormation。在部署过程中，AWS SAM 会将 23 行代码转换为在 AWS 中生成这些资源所需的 AWS CloudFormation 语法。转换后的 AWS CloudFormation 模板包含 200 多行代码！

**转换后的Cloudformation代码**

```yml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  getAllItemsFunction:
    Type: AWS::Lambda::Function
    Metadata:
      SamResourceId: getAllItemsFunction
    Properties:
      Code:
        S3Bucket: aws-sam-cli-managed-default-samclisourcebucket-1a4x26zbcdkqr
        S3Key: what-is-app/a6f856abf1b2c4f7488c09b367540b5b
      Handler: src/get-all-items.getAllItemsHandler
      Role:
        Fn::GetAtt:
        - getAllItemsFunctionRole
        - Arn
      Runtime: nodejs12.x
      Tags:
      - Key: lambda:createdBy
        Value: SAM
  getAllItemsFunctionRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
        - Action:
          - sts:AssumeRole
          Effect: Allow
          Principal:
            Service:
            - lambda.amazonaws.com
      ManagedPolicyArns:
      - arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
      Tags:
      - Key: lambda:createdBy
        Value: SAM
  getAllItemsFunctionApiPermission:
    Type: AWS::Lambda::Permission
    Properties:
      Action: lambda:InvokeFunction
      FunctionName:
        Ref: getAllItemsFunction
      Principal: apigateway.amazonaws.com
      SourceArn:
        Fn::Sub:
        - arn:${AWS::Partition}:execute-api:${AWS::Region}:${AWS::AccountId}:${__ApiId__}/${__Stage__}/GET/
        - __ApiId__:
            Ref: ServerlessHttpApi
          __Stage__: "*"
  ServerlessHttpApi:
    Type: AWS::ApiGatewayV2::Api
    Properties:
      Body:
        info:
          version: '1.0'
          title:
            Ref: AWS::StackName
        paths:
          "/":
            get:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri:
                  Fn::Sub: arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${getAllItemsFunction.Arn}/invocations
                payloadFormatVersion: '2.0'
              responses: {}
        openapi: 3.0.1
        tags:
        - name: httpapi:createdBy
          x-amazon-apigateway-tag-value: SAM
  ServerlessHttpApiApiGatewayDefaultStage:
    Type: AWS::ApiGatewayV2::Stage
    Properties:
      ApiId:
        Ref: ServerlessHttpApi
      StageName: "$default"
      Tags:
        httpapi:createdBy: SAM
      AutoDeploy: true
  SampleTable:
    Type: AWS::DynamoDB::Table
    Metadata:
      SamResourceId: SampleTable
    Properties:
      AttributeDefinitions:
      - AttributeName: id
        AttributeType: S
      KeySchema:
      - AttributeName: id
        KeyType: HASH
      BillingMode: PAY_PER_REQUEST
  getAllItemsFunctionMyConnPolicy:
    Type: AWS::IAM::ManagedPolicy
    Metadata:
      aws:sam:connectors:
        getAllItemsFunctionMyConn:
          Source:
            Type: AWS::Serverless::Function
          Destination:
            Type: AWS::Serverless::SimpleTable
    Properties
      PolicyDocument:
        Version: '2012-10-17'
        Statement:
        - Effect: Allow
          Action:
          - dynamodb:GetItem
          - dynamodb:Query
          - dynamodb:Scan
          - dynamodb:BatchGetItem
          - dynamodb:ConditionCheckItem
          - dynamodb:PartiQLSelect
          Resource:
          - Fn::GetAtt:
            - SampleTable
            - Arn
          - Fn::Sub:
            - "${DestinationArn}/index/*"
            - DestinationArn:
                Fn::GetAtt:
                - SampleTable
                - Arn
      Roles:
      - Ref: getAllItemsFunctionRole

```

## SAM 模版资源

### Api

创建一组可通过 HTTPS 端点调用的 Amazon API Gateway 资源和方法

- **用法1:** 

  使用 `AWS::Serverless::Api` 去创建资源

  ```yaml
  AWSTemplateFormatVersion: '2010-09-09'
  Transform: AWS::Serverless-2016-10-31
  Description: AWS SAM template with a simple API definition
  Resources:
    ApiGatewayApi:
      Type: AWS::Serverless::Api
      Properties:
        StageName: prod
        Cors: "'www.example.com'"
  ```


### HttpAPi

创建 Amazon API Gateway HTTP API，这让您可以创建比 REST API 具有更低延迟和更低成本的 RESTful API

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: AWS SAM template with a simple API definition

Resources:
  ApiFunction:
    Type: AWS::Serverless::Function
    Properties:
      Events:
        ApiEvent:
          Type: HttpApi
      Handler: index.handler
      InlineCode: |
        def handler(event, context):
            return {'body': 'Hello World!', 'statusCode': 200}
      Runtime: python3.12
```

### Application

可以理解为Cloudformation的子Stack,但是Application 的Location可以指定为template或者AWS Serverless Application Repository中国呢的内容

```yaml
Type: AWS::Serverless::Application
Properties:
  Location: https://s3.amazonaws.com/demo-bucket/template.yaml
```

### Connector

配置两种资源之间的权限. 通过Connector，我们不需要关注与两个服务之间的权限问题，而是集中在功能上

- 用法1：使用`AWS::Serverless::Connector`创建

  ```yaml
  MyConnector:
    Type: AWS::Serverless::Connector
    Properties:
      Source:
        Id: MyFunction
      Destination:
        Id: MyTable
      Permissions:
        - Read
        - Write
  MyFunction:
    Type: AWS::Serverless::Function
  MyTable:
    Type: AWS::Serverless::SimpleTable
  ```

- 用法2:  嵌入式连接器. 如<a href="#basic-example">案例所示</a>

### Function

创建触发该 AWS Lambda 函数的函数、 AWS Identity and Access Management (IAM) 执行角色和事件源映射

- S3类型

  ```yaml
  Type: AWS::Serverless::Function
  Properties:
    Handler: index.handler
    Runtime: python3.12
    CodeUri: s3://bucket-name/key-name
  ```

- image类型

  ```yaml
  HelloWorldFunction:
    Type: AWS::Serverless::Function
    Properties:
      PackageType: Image
      ImageUri: account-id.dkr.ecr.region.amazonaws.com/ecr-repo-name:image-name
      ImageConfig:
        Command:
          - "app.lambda_handler"
        EntryPoint:
          - "entrypoint1"
        WorkingDirectory: "workDir"
  ```

### SimpleTable

创建具有单个属性主键的 DynamoDB 表。当只需要通过主键访问数据时，它很有用。要使用 DynamoDB 更高级的功能，请改用[AWS::DynamoDB::Table](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html) 资源。

```yaml
Properties:
  TableName: my-table
  Tags:
    Department: Engineering
    AppType: Serverless
```

### StateMatch

创建 AWS Step Functions 状态机，您可以使用它来编排 AWS Lambda 函数和其他 AWS 资源，以形成复杂而强大的工作流程. 有关 Step Functions 的更多信息，请参阅[《AWS Step Functions 开发人员指南》](https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html)

```yaml
MySampleStateMachine:
  Type: AWS::Serverless::StateMachine
  Properties:
    DefinitionUri: statemachine/my_state_machine.asl.json
    Role: arn:aws:iam::123456123456:role/service-role/my-sample-role
    Tracing:
      Enabled: true
    DefinitionSubstitutions:
      MyFunctionArn: !GetAtt MyFunction.Arn
      MyDDBTable: !Ref TransactionTable

```

### LayerVersion

创建包含 Lambda 函数 LayerVersion 所需的库或运行时代码的 Lambda

```yaml
Properties:
  LayerName: MyLayer
  Description: Layer description
  ContentUri: 's3://my-bucket/my-layer.zip'
  CompatibleRuntimes:
    - nodejs10.x
    - nodejs12.x
  LicenseInfo: 'Available under the MIT-0 license.'
  RetentionPolicy: Retain
```

### GraphQLApi

创建 AWS AppSync GraphQL API

案例: 参考[官方文档](https://docs.aws.amazon.com/zh_cn/serverless-application-model/latest/developerguide/sam-resource-graphqlapi.html#sam-resource-graphqlapi-examples).

## SAM Connector

## SAM的本地开发

