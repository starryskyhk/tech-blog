---
title: Git 命令
slug: /tech/tools/git/git-command
tags: [git]
date: 2024-01-30T20:04
---
# Git命令

## Git基本结构

## ![image-20210406182110722](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/git%E5%91%BD%E4%BB%A41.png)Git基本命令

### git add

-p 分步add

`.`：add所有文件

### git commit

#### -a

add并commit

`git commit -am 'message'`

#### --amend

`git commit --amend -m 'message'`

`git commit --amend [file1] [file2]`：重做上一次的提交，并包括指定文件的新变化

重新命名最后一次提交

### git rm

删除文件

#### --cached

不删除文件，但是停止跟踪

### git mv

移动文件

`git mv <old> <new>`

### git checkout

`git checkout HEAD -- <filename>`：将filename恢复到最近的一次提交的状态

`git checkout HEAD~2-- <filename>`：将filename恢复到倒数第二次提交的状态

`git checkout <filename>`：将尚未add的内容撤回，相当于`git checkout HEAD -- <filename>`

### git revert

revert前

![image-20210505224059583](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/git%20revert%E5%89%8D.png)



revert后

![image-20210505224239107](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/git%20revert%E5%90%8E.png)

#### git revert  \<version\>

**作用**

反做，去除掉版本`version`的修改，但仍保留之后的修改

**案例**

例如，提交了版本1，版本2，版本3，版本4.现在版本2不好，不要版本2的代码了，但是仍需要版本3个版本4的。

则使用git revert 版本4

### git log

| 选项               | 作用                                      | 举例                                       |
| ------------------ | ----------------------------------------- | ------------------------------------------ |
| -p                 | 查看指定文件的提交历史                    | git log -p <filename>                      |
| --oneline          | 将日志一行一行显示，只显示提交ID和message | git log --oneline                          |
| --decorate         | 显示当前分支信息                          | git log --decorate                         |
| --all              | 显示所有分支信息                          | git log --all                              |
| --graph            | 以树的形式显示                            | git log --graph                            |
| --author=          | 指定具体的作者                            | git log --authot='dd'                      |
| --grep=‘name’      | 所有的提交都包括`name`                    | git log --grep='index.html'                |
| --before='content' | 显示content之前的提交                     | git log --before='1 week' 显示一周前的提交 |
| --after='content'  | 显示content之后的提交                     | git log --after='2021-5-6'                 |
| --stat             | 显示有变更的文件                          | git log --stat                             |

### git reflog

查看HEAD历史记录

### git show

显示最近一次commit的具体内容

### git blame

`git blame <filename>`

以列表方式查看指定文件的提交历史，展示每一行是由谁提交的

### git reset

#### --mixed(默认)

**作用**

同 git reset

会把staging重置到指定提交的状态，并把指针指向这个提交,本地工作目录空间不变

**撤销add**

作用图：

![image-20210506161239993](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/git%20reset%20--mixed.png)

#### --soft

`git reset --soft HEAD~`

**作用：**

只移动 HEAD 到指定的 commit，但保留原先暂存区和工作目录的内容，同时会将指定 commit 之后提交的内容设置到staging中

不会影响workspace和staging中的代码

**撤销commit**

作用图

![image-20210506175031089](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/git%20reset%20--soft.png)

#### --hard

**作用**

在重置HEAD和branch时，会把workspace和staging重置同样重置，也就是说没有commit的代码将会被全部抹除

**回退**

### git restore

git restore指令使得在工作空间但是不在暂存区的文件撤销更改(内容恢复到没修改之前的状态)

等同于`git checkout`

#### --staged

git restore --staged的作用是将暂存区的文件从暂存区撤出，但不会更改文件的内容。

等同于 `git reset --mixed`

### git diff

比较workspace和staging

内容解读

```--- a/README.md   "---"表示变动前的版本
--- a/README.md     "---"表示变动前的版本
+++ b/README.md  //"+++"表示变动后的版本
@@ -1,3 +1,4 @@
代表的意思是源文件的1-3行与目标文件的1-4行有差异,下面才是具体的差异信息;

-红色部分表示减少的部分

+绿色部分表示增加的部分
```

#### --staged、--cached

比较staging和Local Repository

#### git diff master  mobile-feature \<filename\>

--stat：只显示那些文件不同

**作用**

比较两个分支的不同

### git stash

| 选项            | 作用                                                         | 举例                                      |
| --------------- | ------------------------------------------------------------ | ----------------------------------------- |
| save <message\> | 保存工作进度，可随时取出                                     | git stash save 'add some thing'           |
| list            | 查看保存的stash                                              | git stash lsit                            |
| show -p <id\>   | 显示 stash@{0} 与workspace的不同                             | git show -p stash@{0}                     |
| apply <id\>     | 恢复工作进度，但是不删除stash                                | git apply stash@{0}                       |
| pop <id\>       | 必须将现有的未commit的进行commit，<br/>pop可能会有冲突,恢复工作进度，并且删除stash | git stash pop  \| git stash pop stash@{2} |
| drop <id\>      | 删除工作进度                                                 | git stash drop stash@{2}                  |
| clear           | 删除所有缓存                                                 | git stash clear                           |

### git alias

设置git别名

git config --global alias.co checkout

将checkout命令设置为co

git co == git checkout

#### git bash设置短命令

在Git/etc/profile下设置，添加

> alias g='git'
> alias gcm='git commit -m'
> alias gcam='git commit -a -m'
> alias gco='git checkout'
> alias gd='git diff'
> alias gl='git pull'
> alias gp='git push'
> alias gst='git status'
> alias gm='git merge'

#### Mac设置短命令

创建该文件时一般都会选择在当前用户目录下，即**Mac**下的.bash_profile 文件的路径是 /Users/YourMacUserName/.bash_profile

`cd ~`可直接到/Users/YourMacUserName/目录下

`touch .bash_profile` 创建文件

- alias pl="git pull"
- alias ps="git push"
- alias ad="git add"
- alias cm="git commit -m"
- alias st="git status"
- alias dev="npm run dev"
- alias build="npm run build"

**保存之后重新打开terminal或者执行**

```
source ~/.bash_profile
```



## Git 分支

### git status

**作用**

查看当前分支

### git branch

| 选项                             | 作用                                 | 举例                                |
| -------------------------------- | ------------------------------------ | ----------------------------------- |
| none                             | 查看本地所有分支                     | git branch                          |
| -a                               | 查看所有分支(本地 and 远程)          | git branch -a                       |
| <branch_name>                    | 创建分支                             | git branch two                      |
| -m                               | 重命名分支                           | git branch -m <old_name> <new_name> |
| -d                               | 删除分支                             | git branch two                      |
| -r                               | 查看远程分支                         | git branch -r                       |
| [branch] [commit]                | 新建一个分支并指定commit             | git branch two df145d4              |
| --track [branch] [remote-branch] | 新建一个分支，与指定远程分支建立联系 | git branch --track two three        |
| -dr                              | 删除远程分支                         |                                     |

### git checkout

**作用**

切换分支

#### -b

`git checkout -b two`：创建分支two，并切换到two上

创建分支并切换到该分支

### git merge

`git merge [brance1] [brance2]`

**作用**

合并两个分支

`git merge [branch] `:合并branch到当前分支

### git conflict

HEAD到==\=\=\==之间的为当前的内容

==\=\=\==到master为另一个内容

## Git标签

### git tag

| 选项           | 作用                    | 举例                        |
| -------------- | ----------------------- | --------------------------- |
| none           | 列出所有tag             | git tag                     |
| [tag]          | 新建一个tag在当前commit | git tag <tag-name\>         |
| [tag] [commit] | 新建一个tag在指定commit | git tag [tag-name] [commit] |
| -d [tag]       | 删除本地tag             | git tag -d tag-name         |

```
# 删除远程tag
git push origin :refs/tags/[tagName]
# 查看tag信息
$ git show [tag]
# 提交指定tag
git push [remote] [tag]
# 提交所有tag
git push [remote] --tags
# 新建一个分支，指向某个tag
git checkout -b [branch] [tag]
```

## Git远程

### git remote

#### add

为项目添加远程库

`git remote add origin https:/ /wwddddd`

####  -v

显示远程的详细信息

#### rm <name\>

移除远程

git remote rm origin

### git push

#### -u origin master

`git push -u origin master`

-u：根据远程分支的变化

将master分支推送到远程s

### git clone

git clone <url\> <filename\>

克隆并重命名

### 拉取远程分支

git branch dev  本地建立一个分支

git branch --set-upstream-to=origin/dev dev   将远程分支dev和本地分支dev关联