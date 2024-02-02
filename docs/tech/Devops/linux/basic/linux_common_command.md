---
title: Linux常用命令
slug: /tech/devops/linux/common-command
tags: [linux]
date: 2024-01-31T01:45
---

# Linux常用命令

## sed

作用：文档编辑、替换、提取等功能

**参数说明：**

-e:以指定的script作为处理文件的脚本

-E:替换

-n：仅显示处理后的结果

-f:后接文件，指定处理的文件

-i:直接修改读取的文件内容，而不是输出到终端

**动作说明**

- a ：新增， a 的后面可以接字串，而这些字串会在新的一行出现(目前的下一行)～
- c ：取代， c 的后面可以接字串，这些字串可以取代 n1,n2 之间的行！
- d ：删除，因为是删除啊，所以 d 后面通常不接任何咚咚；
- i ：插入， i 的后面可以接字串，而这些字串会在新的一行出现(目前的上一行)；
- p ：打印，亦即将某个选择的数据印出。通常 p 会与参数 sed -n 一起运行～
- s ：取代，可以直接进行取代的工作哩！通常这个 s 的动作可以搭配正规表示法！例如 1,20s/old/new/g 就是啦！

cut

awk

tr

wc

grep

sort

seq

uniq

ps

ifconfig

expect

xargs

lolcat

cowsay

sl

nyancat



Interer-ter
