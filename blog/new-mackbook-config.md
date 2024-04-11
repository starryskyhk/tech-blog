---
slug: new-mackbook-config
title: 全新的一台MacBook,我需要安装哪些东西
date: 2024-04-01
authors: starrysky
tags: [macbook,配置,]
keywords: [macbook,新电脑,配置]
---

# 全新的一台MacBook,我需要安装哪些东西

每次换一台新的电脑后，老是忘记我需要安装什么东西，上一台电脑的各种配置，插件，脚本都已经很习惯了。忘记了又要重新去找一遍怎么去配置什么什么的.所以决定写一篇博客记录下我的一台新Mac，应该安装哪些内容，可以做到丝滑的换电脑。

## Chrome插件

|                                   | 用途                                      |                |
| --------------------------------- | ----------------------------------------- | -------------- |
| 1password                         | 用于管理密码、密钥等                      | 必装           |
| BuildReactor                      | 统一管理pipeline,直观的监控和操作pipeline | 根据需求       |
| Grammarly                         | 分析检查英语语法，并给出修改意见          | 必装           |
| Dualsub                           | 双字幕显示，用于看视频双语显示            | 根据需求       |
| Infinity New Tab (Pro)            | 定制化主页                                | 必装           |
| Okta Browser Plugin               | 方便进入Okta应用                          | 根据需求       |
| React Developer Tools             | React开发工具                             | 必装           |
| Take Webpage Screenshots Entirely | 截图软件                                  | 必装           |
| Video Speed Controller            | 视频加速插件                              | 必装           |
| Vue.js devtools                   | Vue开发工具                               | 必装           |
| Zoom Chrome Extension             | Zoom工具                                  | 根据需求       |
| Json View                         | 格式化网页Json的结果，使结果更好看        | 和下面的选一个 |
| JSON Viewer Pro                   | 格式化网页Json的结果，使结果更好看        | 必装           |
| AWS Extend Switch Role            | 方便的快速切换AWS Role                    | 根据需求       |

## 开发工具

### 软件

#### IDEA

一般来说，插件和配置都可以根据账号进行云端同步. 不过为了让自己知道相应配置的用处，还是记录一下.

##### 配置

1. 开启行号和方法分割

   ![image-20240411155408020](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/note/tech/image-20240411155408020.png)

2. 使用 `Shift` + `command` + `A` 启动Action. 搜索Presentation Assistant并开启。用于提示当前所使用的快捷键是什么

3. 更改代码的缩进.可以在这里更改代码默认的缩进，一个Tab所占的空格数

   ![image-20240411171436312](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/note/tech/image-20240411171436312.png)

##### 插件

| Name                            | Usage                                          |      |
| ------------------------------- | ---------------------------------------------- | ---- |
| AceJump                         | 快速跳转到指定位置                             |      |
| Alibaba Java Coding Guidelines  | 根据阿里巴巴标准，检查代码中的问题             |      |
| Codota AI Autocomplete for Java | 使用AI帮助提示代码(优先GitHub Copilot)         |      |
| camelCase                       | 快速转换命名格式                               |      |
| Flyway Migration Creation       | 创建Flyway Migration                           |      |
| GitHub Copilot                  | AI, 简化写代码的过程                           |      |
| JSON Parser                     | 格式化json                                     |      |
| JPA Buddy                       | 简化使用JPA进行开发,自动生成实体类结果可视化等 |      |
| JRebel and XRebel               | 热部署与性能分析插件                           |      |
| Key Promoter X                  | 快速学习快捷键                                 |      |
| Maven Helper                    | 依赖分析、依赖图可视化、依赖版本管理等         |      |
| MybatisCodeHelperPro            | 简化Mybatis的工作                              |      |
| Rainbow Brackets Lite           | 彩虹括号                                       |      |
| Ruby                            | 识别Ruby语法，高亮                             |      |
| Star Wars Progress Bar          | 星球大战进度条                                 |      |
| Terraform and HCL               | 识别Terraform语法                              |      |
| Translation                     | 翻译                                           |      |
|                                 |                                                |      |

#### VSCode

VSCode的插件太多了，应有尽有，这里就不做过多的赘述。就按照账号同步吧

#### Pycharm

不常写Python，后续用到再补充

#### 不需要配置，直接下载的工具

|            |                                      |      |
| ---------- | ------------------------------------ | ---- |
| Postman    | API测试，程序员必备                  |      |
| PicGo      | 图床软件，我是用阿里云OSS,集成Typora |      |
| Typora     | 笔记软件                             |      |
| VirtualBox | 虚拟机                               |      |
| oss-brower | 阿里云OSS客户端软件                  |      |

### 插件/脚本

#### Homebrew

Mac安装管理工具.官网安装

#### Iterm2

优化美化Mac terminal. 官网安装

**配置**

1. 修改choose的快捷键，方便快速切换iterm窗口![Screenshot 2024-04-09 at 00.07.53](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/note/tech/Screenshot%202024-04-09%20at%2000.07.53.png)

2. Create a HotKey Window. 可以方便的召唤出iterm

   ![image-20240409021116488](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/note/tech/image-20240409021116488.png)

   ![image-20240409014848406](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/note/tech/image-20240409014848406.png)

3. 修改配置，将iterm从Dock移到顶部状态栏

   ![image-20240409020936028](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/note/tech/image-20240409020936028.png)

4. 开启vim 语法高亮. 在家目录创建.vimrc文件，并添加`syntax on`即可
5. Status bar enabled，配置监控![image-20240409100205987](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/note/tech/image-20240409100205987.png)

#### oh-my-zsh

官网安装

**插件**

[2023插件排行榜](https://safjan.com/top-popular-zsh-plugins-on-github-2023/)

| 名字                    | 用途               |                                                              |
| ----------------------- | ------------------ | ------------------------------------------------------------ |
| Fzf                     | 命令行历史提示工具 |                                                              |
| Zsh-syntax-highlighting | 终端命令行高亮     |                                                              |
| zsh-autosuggestions     | 自动补全命令       | [GitHub](https://github.com/junegunn/fzf)                    |
| autojump                | 自动跳转目录命令   | [GitHub](https://github.com/wting/autojump)                  |
| zsh-you-should-use      | 提示短命令是什么   |                                                              |
| Bat                     | 美化cat的输出      | [GitHub](https://github.com/sharkdp/bat)                     |
| thefuck                 | 修正手误写错的命令 | [GitHub](https://github.com/nvbn/thefuck?tab=readme-ov-file#installation) |
| Eza                     | 等同于ls，更美观   | [GitHub](https://github.com/eza-community/eza)               |
| tldr                    |                    |                                                              |
| spaceship-prompt        | 更多的提示         | [GitHub](https://github.com/spaceship-prompt)                |

#### 不需要配置，直接下载的工具

|        |                  |      |
| ------ | ---------------- | ---- |
| asdf   | 开发环境管理工具 |      |
| nvm    | node版本管理工具 |      |
| colima | 可以启动docker   |      |



监控电脑运行状况。[GitHub](https://github.com/exelban/stats)

## 工具类软件

下载清单

|            |                  |      |
| ---------- | ---------------- | ---- |
| Dash       | ApI文档查询      |      |
| 1password  | 密码管理         |      |
| Dictionary | 英英字典         |      |
| Snipaste   | 截图软件         |      |
| Stats      | 监控电脑运行信息 |      |
|            |                  |      |

## 日常类软件

