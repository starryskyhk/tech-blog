---
title: Linux基础
slug: /tech/devops/linux/basic
tags: [linux]
date: 2024-01-30T20:04
---
# Linux基础

## Linux安装

### 分区

| 分区名 | 作用                   | 分区大小           |
| ------ | ---------------------- | ------------------ |
| boot   | 引导分区               | 1G                 |
| swap   | 交换分区，充当临时内存 | 与运行内存大小一致 |
| root   | 根目录                 | 其余全部           |

boot：引导分区 1G

swap：交换分区 运行内存打下	

root：其余全部

## Linux基础知识

### 目录结构

**Linux中，一切皆文件**

![image-20210413225529599](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/Linux%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84.png)

|      | 目录                                         | 作用                                                         |
| :--: | -------------------------------------------- | ------------------------------------------------------------ |
|  1   | /bin  **常用**  (/usr/bin    /usr/local/bin) | 存放最经常使用的命令                                         |
|  2   | /sbin (/usr/bin   /usr/local/bin)            | Super User,存放系统管理员使用的系统管理程序                  |
|  3   | /home  **常用**                              | 存放普通用户的主目录，每个用户一个目录                       |
|  4   | /root   **常用**                             | 系统管理员的用户主目录                                       |
|  5   | /lib                                         | 系统开机所需要的最基本的动态连接共享库，相当于DLL文件        |
|  6   | /lost+found                                  | 一般是空的，系统非法关机后，这里就存放一些文件               |
|  7   | /etc   **常用**                              | 所有系统管理所需要的配置文件和子目录 my.conf                 |
|  8   | /usr   **常用   非常重要**                   | 用户的很多应用程序和文件都存放在这个目录下                   |
|  9   | /boot     **常用**                           | 存放启动Linux需要的一些核心文件，包括一些连接文件和镜像文件  |
|  10  | /proc  **不能动**                            | 是一个虚拟目录，是系统内存的映射，访问这个目录获取系统信息   |
|  11  | /srv     **不能动**                          | service的缩写 存放服务启动后需要提取的数据                   |
|  12  | /sys     **不能动**                          | 这是 Linux2.6 内核的一个很大的变化。该目录下安装了 2.6 内核中新出现的一个文件系统 sysfs 。 |
|  13  | /tmp                                         | 用来存放一些临时文件的                                       |
|  14  | /dev                                         | 将所有的硬件以文件的形式存储                                 |
|  15  | /media **常用**                              | Linux会自动识别一些设备，例如U盘，光驱等，识别后，Linux会把识别的设备挂载到这个目录下 |
|  16  | /mnt                                         | 系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将光驱挂载在 /mnt/ 上，然后进入该目录就可以查看光驱里的内容了 |
|  17  | /opt      **常用**                           | opt 是 optional(可选) 的缩写，这是给主机额外安装软件所摆放的目录。比如你安装一个ORACLE数据库则就可以放到这个目录下。默认是空的。 |
|  18  | /usr/local   **常用**                        | 这是给另个给主机额外安装软件所安装的目录，一般是通过编译源码方式安装的程序 |
|  19  | /var   **常用**                              | 存放不断在扩充的东西，习惯将经常被修改的目录放在这里，包括日志文件 |
|  20  | /selinux                                     | 安全子系统，控制程序只能访问特定文件，有三种工作模式         |

- 系统启动必须：/boot、/etc、/lib、/sys
- 指令集合：/bin、/sbin
- 外部文件管理：/dev、/media、/mnt
- 临时文件：/run、/tmp、/lost+found
- 账户：/root、/home、/usr、/user/bin、/usr/sbin、/usr/src
- 运行过程中需要：/var、/proc
- 扩展：/opt、/srv

### Vi和Vim的使用

#### 三种模式

| 模式       | 作用                                                         |
| ---------- | ------------------------------------------------------------ |
| 正常模式   | 以Vim打开就进入了正常模式，在这个模式中，可以使用上下左右来移动光标，可以使用删除字符或删除整行来处理文档，也可以复制粘贴 |
| 插入模式   | 按下i、I、o、O、a、A、r、R等任意一个字母之后进入编辑模式，一般来说按i |
| 命令行模式 | 先输入`ESC`，再输入`:`进入命令行模式，可以提供相关指令，完成读取，存盘，替换，离开vim、显示行等操作 |

#### 快捷键

[中文官网](http://vim-china.org/)        [网址1](https://blog.csdn.net/caizongxu/article/details/82222725)   [网址2](https://www.cnblogs.com/tianyajuanke/archive/2012/04/25/2470002.html)

1. 拷贝当前行`yy`,拷贝当前行的向下5行`5yy`，并粘贴`p`
2. 删除当前行`dd`,删除当前向下的5行`5dd`
3. 在文件中查找，命令行下按`/`，输入要查询的内容，按回车，按`n`查找下一个
4. 使用`:noh`或者`:nohlsearch`取消搜索高亮
5. 设置文件的行号，命令如下[`:set nu` 和`:set nonu`]
6. 到该文档的最末行`G`和最首行`gg`
7. 输入内容后，撤销内容，`u`
8. 编辑文件，将光标移动到20行`shift+g`==`G`

![image-20210414105513859](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/vim%E9%94%AE%E7%9B%98%E5%9B%BE.png)

#### 关机&重启&登录注销

**关机重启**

1. shutdown -h now` ：立刻关机
2. `shutdown -h 1`：1分钟后关机
3. `shutdown`：默认为`shutdown -h 1`
4. `shutdown -r now`：现在重新启动计算机
5. `halt`：关机
6. `reboot`：重新启动
7. `sync`：把内存的数据同步到磁盘

**登录注销**

普通用户登录后使用`su - 用户名` 来切换管理员身份

使用`logout`可注销用户   `logout`在图形运行级别无效，即在shell中使用

### 用户管理

#### 创建用户

命令`useradd username`

`useradd <username> -d xxx`：指定目录创建用户

#### 指定/修改密码

`passwd <username>`

#### 删除用户

`userdel <username>`：删除用户，保留home目录

`userdel -r <username>`：删除用户以及对应的home目录

一般情况下，建议保留**home**目录

#### 查询用户信息

`id <username>`：查看用户信息

`who am i`或者`whoami`：查看正在登陆用户信息

### 用户组

#### 添加组

`groupadd <name>`

#### 删除组

`groupdel <name>`

#### 增加用户直接上组

`useradd -g <groupname> <username>`

如果没有分配组时，即使用命令`useradd <username>`时，会默认创建一个名为username的组。

#### 修改用户组

`usermod -g <groupname>  <username>`

#### 用户组和相关的文件

/etc/passwd：用户的配置文件，记录用户的各种信息

每行的含义：用户名：口令：用户识别号：组标识号：注释性描述：主目录：登录Shell

/etc/shadow：口令的配置文件

每行的含义：登录名：加密口令：最后一次修改时间：最小时间间隔：最大时间间隔：警告时间：不活动时间：失效时间：标志

/etc/group：组的配置文件，记录Linux包含组的信息

每行含义：组名：口令：组标识号：组内用户列表

### 文件基本属性

经常通过两个命令来修改文件或目录的所属用户和权限：

- chown：修改所属用户与组
- chmod：修改用户的权限

 ```shell
 drwxr-xr-x   4 kun.han  staff     128 Jul 30 10:07 .vscode/
 ```

drwxr-xr-x：第一个字母表示文件的属性

- d表示目录
- -表示文件
- l表示为链接文档
- b表示为装置文件里面的可供储存的接口设备(可随机存取装置)
- c表示装置文件中的串行端口设备，比如键盘，鼠标

接下来的字符，以三个为一组，r表示可读，w表示可写，x表示可执行，如果没有权限，则显示-号

![image-20210906213703232](/Users/kun.han/Library/Application Support/typora-user-images/image-20210906213703232.png)

#### 更改文件属性

**chgrp**

作用：更改文件属组

语法：`chgrp [-R] 属组名 文件名`

**chown**

作用：更改文件属主，也可以同时更改文件属组

语法：

`chown [-R] 属主名 文件名`

`chown [-R] 属主名:属组名 文件名`

**chmod**

作用：更改文件9个属性

**r:4  w:2   x:1**

每种身份(owner/group/others)各自的三个权限(r/w/x)分数是需要累加的，例如当权限为： **-rwxrwx---** 分数则是：

- owner = rwx = 4+2+1 = 7
- group = rwx = 4+2+1 = 7
- others= --- = 0+0+0 = 0

语法：

`chmod [-R] xyz 文件或目录`

**符号类型改变文件权限**

- user：用户
- group：组
- others：其他

使用 **u, g, o** 来代表三种身份的权限，a表示全部

|       |      |           |      |            |
| ----- | ---- | --------- | ---- | ---------- |
| chmod | u    | +（添加） | r    | 文件或目录 |
|       | g    | -（除去） | w    |            |
|       | o    | =（设定） | x    |            |
|       | a    |           |      |            |

```shell
chmod u=rwx,g=rx,o=r  test1    // 修改 test1 权限

#拿掉所有人的可执行权限
chmod  a-x test1
```



## Linux实用指令

### 运行级别

| 级别 | 说明                   |
| ---- | ---------------------- |
| 0    | 关机                   |
| 1    | 单用户[找回丢失密码]   |
| 2    | 多用户状态没有网络服务 |
| 3    | 多用户状态有网络服务   |
| 4    | 系统未使用保留给用户   |
| 5    | 图形界面               |
| 6    | 重启                   |

`init 0`

查看默认级别

`systemctl get-default`

设置默认级别

`systemctl set-default TARGET.target`

设置默认级别为命令行

`systemctl set-default multi-user.target`

设置默认级别为图形化界面

`systemctl set-default graphical.targer`

### 找回root密码

1：系统启动，按`e`进入编辑界面

2：找到Linux16开头内容所在的行数，在行的最后输入：`init=/bin/sh`

3：按`ctrl+x`进入单用户模式

4：输入`mount -o remount,rw /`

5：输入`passwd `重复两次输入密码

6：输入`touch /.autorelabel`

7：输入`exec /sbin/init`

### 帮助指令

- man：获取帮助信息

  基本语法：man [命令或配置文件] 

  案例：查看ls命令的帮助信息

- help：获得shell内置命令的帮助信息

### 搜索查找类

#### find指令

从指定的目录向下递归地遍历其各个子目录

`find [搜索范围] [选项]`

| 选项            | 功能                           |
| --------------- | ------------------------------ |
| -name<查询方式> | 按照指定文件名查找模式查找文件 |
| -user<用户名>   | 查找属于指定用户名的所有文件   |
| -size<文件大小> | 按照文件大小查找文件           |

**case**

`find /home -name hello.txt`：根据名称查找在home目录下的hello.txt文件

`find /opt -user nobody`：查找opt目录下，用户名为nobody的文件

`find / -size +200M`：查找整个系统大于200M的文件(+n:大于，-n小于，n等于)，单位：K、M、G

#### locate指令

快速定位文件路径，利用数据库进行存储，无需遍历文件，查询速度较快，必须定时更新locate时刻

**基本语法**

`locate [filename]`

第一次运行，需要执行`updatedb`用于创建locate数据库

配置文件位置：/etc/updatedb.conf

#### grep指令

grep指令和管道符号|

grep过滤查找，管道符''|''，表示将前一个命令的处理结果输出传递给后面的命令处理

**基本语法**

`grep [选项] 查找内容 源文件`

**常用选项**

-n：显示匹配行及行号

-i：忽略字母大小写

case:

在hello.txt文件中，查找“yes“所在行，并且显示行号

`cat /home/hello.txt | grep -n "yes"`

`grep -n "yes" /home/hello.txt`

### 压缩和解压

#### gzip/gunzip

gzip 用于压缩文件，gunzip用于解压文件,**针对于单个文件**

**基本用法**：

gzip 文件 （只能将文件压缩为*.gz文件）

gunzip 文件.gz (解压文件)

**case**：

1：压缩hello.txt文件：`gzip /home/hello.txt`

2：解压文件：`gunzip hello.txt.gz`

#### zip/unzip

**介绍**

zip用户压缩文件，unzip用于解压，在项目打包发布时很有用

**基本语法**

zip [选项] xxx.zip   [将要压缩的内容] （压缩文件和目录的命令）

unzip [选项] XXX.zip    （解压缩文件）

**常用选项** 

zip

-r：递归压缩，即压缩目录    (如果没有的话，则只压缩的子目录为空)

unzip

-d<目录>：指定解压后文件的存放目录

**case**

1：将/home下所有文件压缩为myhome.zip

`zip -r myhome.zip/home/ `     将home目录及其子文件夹都压缩

2：将myhome.zip解压到/opt/tmp目录下

`unzip -d /opt/tmp myhome.zip`

#### tar

**介绍**

tar指令是打包指令，最后打包的文件是.tar.gz

**基本用法**

`tar [选项] xxx.tar.gz [打包的内容]` (打包目录)

**选项说明**

| 选项 | 功能               |
| ---- | ------------------ |
| -c   | 产生.tar打包文件   |
| -v   | 显示详细信息       |
| -f   | 指定压缩后的文件名 |
| -z   | 打包同时并压缩     |
| -x   | 解包.tar文件       |

**case**

1：压缩多个文件，将/home/pig.txt和/home/cat.txt文件压缩为pc.tar.gz

`tar -zcvf pc.tar.gz /home/pig.txt /home/cat.txt`

2：将/home的文件夹压缩为myhome.tar.gz

`tar -zcvf myhome.tar.gz  /home/`

3：将pc.tar.gz解压到当前目录，切换到/opt/

`tar -zxvf pc.tar.gz`

4：将myhome.tar.gz解压到/opt/tmp2下

`tar -zxvf myhome.tar.gz  -C /opt/tmp2`

### 文件目录类

#### pwd命令

**介绍：**

显示当前工作的绝对路径

#### ls指令

**基本语法**

`ls [选项] [目录或文件]`

常用选项

-a：显示当前目录所有的文件或目录，包括隐藏

-l：以列表的方式显示信息

#### cd指令

基本语法

`cd [参数]` 切换到指令目录

`cd ~ `或`cd` 回到家目录

`cd /`回到根目录

`cd ..`：回到上级目录

#### mkdir指令

**介绍：**

用于创建目录

**基本语法**

`mkidr [-option] directory `

**常用选项：**

-p：创建多级目录

**case**

1：创建一个目录：/home/dog

`mkdir /home/dog`

2：创建多级目录：/home/animal/tiger

`mkdir -p /home/animal/tiger`

#### rmdir指令

**介绍：**

删除空目录

**基本语法**

`rmkidr [-option] directory `

**case**

1：删除一个目录：/home/dog

`rmkdir /home/dog`

**detail**

rmdir删除的是空目录，如果目录下有内容则无法删除，需要使用 `rm -rf`删除

#### touch指令

**介绍：**

创建一个空文件

**基本语法**

`touch [filename]`

#### cp指令

**介绍：**

cp指令拷贝文件到指定目录

**基本语法**

`cp [option] source dest `

**常用选项：**

-r：递归复制整个文件夹

**case**

1：将/home/hello.txt 拷贝到 /home/bbb目录下

`cp /home/hello.txt /home/bbb`

2：拷贝目录

`cp -r /home/aa /home/bbb`：将aa目录整个拷贝过去

**detail**

强制覆盖不提示：\cp

`\cp -r /home/aa /home/bbb`

#### rm指令

**介绍：**

删除文件或文件夹

**基本语法**

`rm [option] 文件或目录 `

**常用选项：**

-r：递归复制整个文件夹

-f：强制删除不提示

**case**

1：将/home/hello.txt删除

`rm -f /home/hello.txt`

2：递归删除文件夹/home/bbb

`rm -rf /home/bbb`：将aa目录整个拷贝过去

#### mv指令

**介绍：**

移动文件

**基本语法**

`mv oldNameFile newNameFile`：重命名

`mv /tmp/movefile /targetFolder`：移动文件

**case**

1：将/home/cat.txt文件重命名为pig.txt

`mv /home/cat.txt /home/pig.txt`

2：将/home/pig.txt文件 移动到/root目录下

`mv /home/pig.txt /root/`：移动

`mv /home/pig.txt /root/cat.txt`：移动并且重命名

3：移动整个目录，将/opt/bbb移动到/home下

`mv bbb/ home/`

#### cat指令

**介绍：**

查看文件内容

**基本语法**

`cat [选项] 要查看的文件`

**常用选项**

-n：显示行号

**case**

1：查看/etc/profile文件内容，显示行号

`cat -n /etc/profile`

**detail**

cat只能浏览文件，所以更安全，为了浏览方便，一般会带上管道命令|more

`car -n /etc/profile |more`：一次显示一页，并按回车继续查看，按空格翻页

#### more指令

**介绍：**

基于vi的文本过滤器，以全屏幕的方式按页显示文本内容

**基本语法**

`more 要查看的文件`

**常用选项**

| 操作          | 功能说明                 |
| ------------- | ------------------------ |
| 空格键(space) | 向下翻页                 |
| Enter         | 向下翻一行               |
| q             | 离开                     |
| Ctrl+F        | 向下滚动一屏             |
| Ctrl+B        | 返回上一屏               |
| =             | 输出当前行的行号         |
| :f            | 输出文件名和当前行的行号 |

#### less指令

**介绍：**

用于分屏查看文件内容，功能与more相似，但比more强大，支持各种显示终端。less在显示内容时，不是一次性加载的，而是看到哪就加载到哪

**基本语法**

`less 要查看的文件`

**常用选项**

| 操作          | 功能说明                          |
| ------------- | --------------------------------- |
| 空格键(space) | 向下翻页                          |
| pagedown      | 向下翻行                          |
| pageup        | 向上翻行                          |
| /字串         | 向下搜索；n:向下搜索，N：向上搜索 |
| ?字串         | 向上搜索；n:向下搜索，N：向上搜索 |
| q             | 退出                              |

#### echo指令

**介绍**

输出内容到控制台

**基本语法**

`echo [option] [输出内容]`

**case**

1：输出环境$PATH,$HOSTNAME

`echo $PATH`

`echo HOSTNAME`

#### head指令

**介绍**

用于显示文件的开头部分内容，默认显示前10行

**基本语法**

`head [filename]`：查看文件头10行内容

`head -n n [filename]`：查看文件前n行内容

**case**

1：查看/etc/profile的前5行代码

`head -n 5 /etc/profile`

#### tail指令

**介绍**

用于显示文件的尾部部分内容，默认显示前10行

**基本语法**

`tail [filename]`：查看文件头10行内容

`tail -n n [filename]`：查看文件前n行内容

`tail -f [filename]`：实时追踪该文档的所有更新

**case**

1：查看/etc/profile的最后5行代码

`tail-n 5 /etc/profile`

2：实时监控mydate.txt，看到文件有变化时，是否看到，实时的追加日期

`tail -f mydate.txt`

#### \>指令和>>指令

**介绍**

\>输出重定向和>>追加

**基本语法**

`ls -l > [filename]` ：列表的内容写入文件filename中（覆盖写）

`ls -al >> [filename]`：列表的内容追加到filename文件

`cat [filename1] > [filename2]`：将文件1的内容覆盖到文件2

`echo [content] >> [filename]`

**case**

1：将/home目录下的文件列表写入/home/info.txt文件中

`ls /home > /home/info.txt`

2：将当前日历信息追加到/home/mycal文件中

cal >> /home/mycal

#### ln指令

**介绍**

软链接也成为符号链接，类似于Windows里的快捷方式，主要存放了链接其他文件的路径

**基本语法**

`ln -s [原文件或目录] [软链接名]` 给原文件创建一个软链接

**case**

1：在/home目录下创建一个软链接myroot，连接到/root

`ln -s /root /home/myroot`

2：删除软连接myroot

`rm  /home/myroot`
**detail**

当我们使用pwd指令查看目录时，仍看到的是软链接所在目录

#### history指令

**介绍**

查看已执行过历史命令，也可以执行历史命令

**基本语法**

`history` 查看执行过的历史命令

**case**

1：显示所有的历史命令

`history`

2：显示最近使用的10个命令

`history 10`

3：执行历史编号为5的指令

`!5`

### 时间日期类

#### date指令-显示时间

**介绍**

显示当前日期

**基本语法**

`date`：显示当前时间

`date +%Y`：显示当前年份

`date +%m`：显示当前月份

`date +%d`：显示当前是哪一天

`date "+%Y-%m-%d %H:%M:%S"`：显示年月日时分秒

**case**

1：显示当前时间日期

`date`

2：显示当前时间年月日

`date +%Y-%m-%d`

3：显示当前时间年月日时分秒

`date "+%Y-%m-%d %H:%M:%S"`

#### date指令-设置日期

**介绍**

设置日期

**基本语法**

`date -s [time]`：设置时间

**case**

1：设置当前系统时间，比如设置为2021-11-11 11：22:22

`date -s "2021-11-11 11：22:22"`

#### cal指令

**介绍**

查看日历指令

**基本语法**

`cal [option] `（不加选项，显示本月日历）

**case**

1：显示当前日历

`cal`

2：显示2020年日历

`cal 2020`

### 三剑客

#### 特点及应用

| 命令 | 特点                     | 场景                                                         |
| ---- | ------------------------ | ------------------------------------------------------------ |
| grep | 过滤                     | 过滤速度最快                                                 |
| sed  | 替换，修改文件内容，取行 | 如果要进行替换/修改文件内功<br/>取出某个范围的内容（从10：00-12:00） |
| Awk  | 取列，统计计算           | 取列<br />对比，比较<br />统计，计算(awk数组)                |

#### grep

| 选项 | 含义                              | 例子                                                  |
| ---- | --------------------------------- | ----------------------------------------------------- |
| -E   | ==egrep 支持扩展正则              |                                                       |
| -A   | -A5 匹配你要的内容显示接下来的5行 |                                                       |
| -B   | -B5 匹配你要的内容显示接上面的5行 |                                                       |
| -C   | -C5 匹配你要的内容显示上下5行     | seq 10 \| grep -C 2                                   |
| -c   | 统计次数                          | seq 10\| grep -c 2                                    |
| -v   | 取反，排除行                      |                                                       |
| -n   | 显示行号                          |                                                       |
| -i   | 忽略大小写                        |                                                       |
| -w   | 精确匹配                          | echo a ab \| grep -w a<br />echo a ab \| grep '\ba\b' |
| -o   | 只显示匹配到的内容                |                                                       |

#### sed

##### 特点和格式

流编辑器，处理文件直到末尾

格式

| 命令 | 选项 | 功能                   | 参数            |
| ---- | ---- | ---------------------- | --------------- |
| sed  | -r   | s/old/new/g 扩展正则   | Old.txt         |
|      | -n   | 取消默认输出           |                 |
|      | -i   | 直接在原文件上进行操作 | -i 'backp file' |
|      |      |                        |                 |

功能

| 功能 |           |
| ---- | --------- |
| s    | 替换      |
| p    | 显示      |
| d    | 删除      |
| cai  | 增加c/a/i |

##### 核心应用

**1 查找p**

| 格式               |                                |                        |
| ------------------ | ------------------------------ | ---------------------- |
| '2p'               | 指定行号查找                   |                        |
| '1,5p'             | 执行行号范围查找               | sed -n '1,2p' old.txt  |
| ‘4,$p'             | 取第四行到最后一行             |                        |
| '/name/p'          | 类似于grep过滤，//里可以写正则 | sed -n '/^a/p' old.txt |
| '/10:00/,/11:00/p' | 表示范围的过滤                 |                        |

**2 删除 d(并没有真正从文件中删除)**

| 格式               |                      |                        |
| ------------------ | -------------------- | ---------------------- |
| '2d'               | 指定行号删除         |                        |
| '1,5d'             | 执行行号范围删除     | sed -n '1,2d' old.txt  |
| ‘4,$d'             | 删除第四行到最后一行 |                        |
| '/name/d'          | 删除                 | sed -n '/^a/d' old.txt |
| '/10:00/,/11:00/d' | 表示范围的删除       |                        |

**删除文件中的空行和包含#的行**

```
egrep -c '^$|#' file
sed -r '/^$|#/d' file

sed -nr '/^$|#/!p' file
```

**3 替换**

| 命令 |                               | Linux             | Mac                              |
| ---- | ----------------------------- | ----------------- | -------------------------------- |
| c    | 替代(加g全局替换)             | s/a/b/g           |                                  |
| a    | append 向指定行或每一行后追加 | sed '1a 996' file | sed '1a\ <enter return>996' file |
| i    | 插入行，在每一行前            |                   |                                  |

后向引用

1234-> 1<23>4

```
echo 123456 | sed -r 's/(23)/<\1>/g
```



#### awk

内置变量

| 内置变量 |                                                    |                                            |
| -------- | -------------------------------------------------- | ------------------------------------------ |
| NR       | number of record                                   |                                            |
| NF       | number of field（每行有多个字段）， NF表示最后一列 |                                            |
| FS       | -F: == -v FS= Field separator 字段分隔符           |                                            |
| OFS      | output Field separator awk显示每列时，按什么分割   | awk -F , -v OFS=: '{print $2,$3}' test.csv |

##### 取行

| awk           |                 |                               |
| ------------- | --------------- | ----------------------------- |
| NR == 1       | 取出某一行      |                               |
| NR>1 && NR <5 |                 | awk 'NR>=1 && NR <=5' old.txt |
| /101/,/105/   |                 | awk '/101/, /105/' old.txt    |
| /old/         | 查找old         |                               |
| 符号          | > < <= >= == != |                               |

##### 取列

- -F 指定分隔符,默认的是空格 
- $数字，取出某一列
- $0：挣行内容
- ${print $0} 打印

##### 模式匹配

```
awk -F "[ /]+"  'NR==3{print $3}
```

**正则：**

- 支持扩展正则
- 可以精确到某一列,某一列中包含/不包含的内容

```
awk '$0~/.*1.*/' old.txt
```

匹配每一行中包含数字1的第1，3，5列

```
awk -F ',' -v OFS=':' '$0~/.*1.*/{print $1,$3,$5}' test.csv
```

**表示范围**

- /begin/,/end/ 
- NR==1, NR==5 

```shell
# 显示指定时间范围内的某一列
awk '/11:02:00/,/11:30:00/{print $3}' file
```

##### 特殊模式 BEGIN END

| 模式    | 含义             | 应用场景                                                     |
| ------- | ---------------- | ------------------------------------------------------------ |
| BEGIN{} | 在读取文件前执行 | 1) 进行简单统计计算<br />2) 添加表头<br />3) 用于定义awk变量 |
| END{}   | 读取后执行       | 1) awk进行统计，先计算，最后END输出结果<br />2) 使用数组，用来输出数组结果 |

统计空行个数

```
awk '/^.*$/{i++}END {print i}' /etc/services
```

求1+...+100

```
 seq 100 | awk '{sum = sum +$1}END {print sum}'
```

##### awk数组

- 应用于统计日志
- 统计每个ip出现次数
- 状态码出现次数

|                  | awk                                                          | shell                                                  |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| 形式             | array[0] = 1 array[1] = 2                                    | array[0] = 1 array[1] = 2                              |
| 使用             | print array[0]                                               | Echo ${array[0]}                                       |
| 批量输出数组内容 | for( i in array )<br />print i #下标<br />print array[i] #内容 | For i in ${array[*]} <br />do<br />echo ${i}<br />done |

删除数组元素：delete array_name[index]

```shell
# 使用的字母必须被双引号包裹
awk 'BEGIN{a[0]="old1";a[1]="old"; print a[0], a[1]}'
```

案例

```shell
# 处理一下内容，取出域名并根据域名计数排序
http://www.e.org/index.html
http://www.e.org/1.html
http://www.e2.org/index.html
http://www.e.org/3.html
http://www.e3.org/index.html
http://www.e3.org/ind0ex.html

awk -F '/' '{array[$3]++} END {for(url in array) printf("%s : %d\n",url,array[url])}' url.txt | sort -rnk 2
```

##### 循环和判断

与C语言基本一致

使用awk脚本文件执行

```shell
awk -f test.awk filename
```

##### 自定义函数

```shell
# 返回最大值
function find_max(num1, num2)
{
  if (num1 > num2)
    return num1
  return num2
}
```

##### 内置函数

https://www.runoob.com/w3cnote/awk-built-in-functions.html#b2



## 磁盘

## 网络配置