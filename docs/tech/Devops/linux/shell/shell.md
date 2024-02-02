---
title: Shell基础
slug: /tech/devops/linux/shell/basic
tags: [shell]
date: 2024-01-30T20:04
---
#  Shell

## 变量

### 基本操作

#### 定义变量

定义变量时，**=**的两边不能加空格

```shell
name="test" #ok
name = "test" #error
```

可以使用语句给变量赋值

```shell
for file in ${ls /etc}; do
	echo ${file}
done
```

${file}等价于$file，但是为了区分，推荐使用${file}

```shell
echo "file name is ${file}_test" #OK
echo "file name is $file_test" #Error 会将$file_test当作一个变量名
```

#### **使用变量**

```shell
echo ${name}
```

#### **删除变量**

```shell
unset <variable_name>
```

#### **使变量变为只读变量**

```shell
readonly <variable_name>
```

删除只读变量

```shell
#需安装gbd
cat << EOF | sudo gdb     

attach $$     

call unbind_variable("变量名")     

detach   

EOF
```

#### shell内使用命令

```shell
$(command)   
`command`
```

#### 执行运算

```shell
#方法1,中括号[]
$[1+1]
#方法2，双小括号，等同于let
$((3+2))
#方法3，let、expr表达式
```



### 变量类型

- 局部变量：在脚本或者命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量

- 环境变量：所有的程序，包括shell启动的程序，都能访问环境变量，必要时shell脚本也可以定义环境变量

- shell变量：shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell

  的正常运行

### Shell字符串

**单引号**

- 单引号的任何内容都会原样输出，单引号字符串中的变量是无效的
- 单引号字串中不能出现一个单独的引号，即使转义后也不可以

**双引号**

- 双引号里可以有变量
- 双引号里可以出现转义字符

```shell
name="test"
#使用双引号
result="hello,"$name" !"
result1="hello,${name} !"
echo $result $result1
#使用单引号
result='hello '$name' !'
result1='hello ${name}'
echo $result $result1

##result

hello test   hello test
hello test  hello ${name}
```

#### **获取字符串长度**

```shell
name="hankun"
echo ${#hankun} #输出6
```

#### 提取子字符串

```shell
name="hankun"
echo ${hankun:1:3} #输出ank
```

#### 查找子字符串

```shell
string="rubbob is a"
echo `expr index "$string" io` #输出4，查找i或o的位置(mac会有问题)
```

### 数组

支持一维数组，不支持多维数组

#### 定义数组

```shell
#第一种
array=(v1 v2 v3)
#第二种
array[0]=value0
array[1]=value1
array[n]=valuen
```

#### 读取数组

```shell
${数组名[下标]}
# @符号获取数组全部元素，或者*
echo ${array[*/@]}
```

#### 获取数组长度

```shell
echo ${#array[*]}
```

### 注释

单行注释

```shell
#this is an annocation
```

多行注释

```shell
:<<EOF
多行注释
EOF

:<<?
多行注释
?
```

### 传递参数

&n代表传递的参数，0表示执行的脚本名称，1表示第一个参数，2表示第二个参数，以此类推

| 参数处理 | 说明                                                         |
| -------- | :----------------------------------------------------------- |
| $#       | 传递到脚本的参数个数                                         |
| $*       | 以一个单字符串显示所有向脚本的参数最后输出为"$1 $2 $3 ..$n"  |
| $$       | 脚本运行的当前进程ID号                                       |
| $!       | 后台运行的最后一个进程ID号                                   |
| $@       | 与&*作用相同，但是使用时加引号，最后输出为 "$1" "$2"...."$n" |
| $-       | 显示shell使用的当前选项                                      |
| $?       | 显示最后命令的退出状态，0表示没有错误                        |

### 运算符

使用\`\`包裹即可计算，例如，  \'expr 1 + 1\'

#### 算数运算符

a=10,b=20

| 运算符 | 说明                                          | 举例                          |
| :----- | :-------------------------------------------- | :---------------------------- |
| +      | 加法                                          | `expr $a + $b` 结果为 30。    |
| -      | 减法                                          | `expr $a - $b` 结果为 -10。   |
| *      | 乘法                                          | `expr $a \* $b` 结果为  200。 |
| /      | 除法                                          | `expr $b / $a` 结果为 2。     |
| %      | 取余                                          | `expr $b % $a` 结果为 0。     |
| =      | 赋值                                          | a=$b 将把变量 b 的值赋给 a。  |
| ==     | 相等。用于比较两个数字，相同则返回 true。     | [ $a == $b ] 返回 false。     |
| !=     | 不相等。用于比较两个数字，不相同则返回 true。 | [ $a != $b ] 返回 true。      |

**注意点**

- 乘号(*)前边必须加\进行转义

#### 关系运算符

**不支持字符串，只支持数字**

| 运算符 | 说明     |
| ------ | -------- |
| -eq    | 相等     |
| -ne    | 不相等   |
| -gt    | 大于     |
| -lt    | 小于     |
| -ge    | 大于等于 |
| -le    | 小于等于 |

```shell
a=10
b=20
if [${a} -eq ${b}]
then echo "a==b"
fi
```

#### 布尔运算符

| 运算符 | 说明                                                | 举例                                     |
| :----- | :-------------------------------------------------- | :--------------------------------------- |
| !      | 非运算，表达式为 true 则返回 false，否则返回 true。 | [ ! false ] 返回 true。                  |
| -o     | 或运算，有一个表达式为 true 则返回 true。           | [ $a -lt 20 -o $b -gt 100 ] 返回 true。  |
| -a     | 与运算，两个表达式都为 true 才返回 true。           | [ $a -lt 20 -a $b -gt 100 ] 返回 false。 |

#### 逻辑运算符

| 运算符 | 说明       | 举例                                       |
| :----- | :--------- | :----------------------------------------- |
| &&     | 逻辑的 AND | [[ $a -lt 100 && $b -gt 100 ]] 返回 false  |
| \|\|   | 逻辑的 OR  | [[ $a -lt 100 \|\| $b -gt 100 ]] 返回 true |

#### 字符串运算符

| 运算符 | 说明                                         | 举例                     |
| :----- | :------------------------------------------- | :----------------------- |
| =      | 检测两个字符串是否相等，相等返回 true。      | [ $a = $b ] 返回 false。 |
| !=     | 检测两个字符串是否不相等，不相等返回 true。  | [ $a != $b ] 返回 true。 |
| -z     | 检测字符串长度是否为0，为0返回 true。        | [ -z $a ] 返回 false。   |
| -n     | 检测字符串长度是否不为 0，不为 0 返回 true。 | [ -n "$a" ] 返回 true。  |
| $      | 检测字符串是否为空，不为空返回 true。        | [ $a ] 返回 true。       |

[]开头和结尾必须加空格o r y

#### 文件测试运算符

| 操作符  | 说明                                                         | 举例                      |
| :------ | :----------------------------------------------------------- | :------------------------ |
| -b file | 检测文件是否是块设备文件，如果是，则返回 true。              | [ -b $file ] 返回 false。 |
| -c file | 检测文件是否是字符设备文件，如果是，则返回 true。            | [ -c $file ] 返回 false。 |
| -d file | 检测文件是否是目录，如果是，则返回 true。                    | [ -d $file ] 返回 false。 |
| -f file | 检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true。 | [ -f $file ] 返回 true。  |
| -g file | 检测文件是否设置了 SGID 位，如果是，则返回 true。            | [ -g $file ] 返回 false。 |
| -k file | 检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。  | [ -k $file ] 返回 false。 |
| -p file | 检测文件是否是有名管道，如果是，则返回 true。                | [ -p $file ] 返回 false。 |
| -u file | 检测文件是否设置了 SUID 位，如果是，则返回 true。            | [ -u $file ] 返回 false。 |
| -r file | 检测文件是否可读，如果是，则返回 true。                      | [ -r $file ] 返回 true。  |
| -w file | 检测文件是否可写，如果是，则返回 true。                      | [ -w $file ] 返回 true。  |
| -x file | 检测文件是否可执行，如果是，则返回 true。                    | [ -x $file ] 返回 true。  |
| -s file | 检测文件是否为空（文件大小是否大于0），不为空返回 true。     | [ -s $file ] 返回 true。  |
| -e file | 检测文件（包括目录）是否存在，如果是，则返回 true。          | [ -e $file ] 返回 true。  |

### printf

与C语言中用法一致

```shell
printf "%-10s %-8s" 姓名 性别
```

### test命令

作用：检查某个条件是否成立，可以进行数值，字符，文件三个方面的测试

**使用test可以忽略[]**

```shell
num1=100
num2=200
if test $[num1] -eq $[num2]
```

代码中的`[]`执行基本的算数运算，如

```shell
$[num1+num2]
```

#### 文件测试

| 参数      | 说明                                 |
| :-------- | :----------------------------------- |
| -e 文件名 | 如果文件存在则为真                   |
| -r 文件名 | 如果文件存在且可读则为真             |
| -w 文件名 | 如果文件存在且可写则为真             |
| -x 文件名 | 如果文件存在且可执行则为真           |
| -s 文件名 | 如果文件存在且至少有一个字符则为真   |
| -d 文件名 | 如果文件存在且为目录则为真           |
| -f 文件名 | 如果文件存在且为普通文件则为真       |
| -c 文件名 | 如果文件存在且为字符型特殊文件则为真 |
| -b 文件名 | 如果文件存在且为块特殊文件则为真     |

### 流程控制

#### if-else

```shell
if conditaion
then 
	command1
	command2
fi
#写为一行
if [$(ps -ef | grep -c "ssh") -gt 1]; then echo "true"; fi
#写为多行
if [$(ps -ef | grep -c "ssh") -gt 1]
then 
	echo "true"
fi
```

**$(command) ：执行command命令**

#### if-elif-else

```shell
if condition1
then
    command1
elif condition2 
then 
    command2
else
    commandN
fi

#实例
a=10
b=20
if [ $a == $b ]
then
   echo "a 等于 b"
elif [ $a -gt $b ]
then
   echo "a 大于 b"
elif [ $a -lt $b ]
then
   echo "a 小于 b"
else
   echo "没有符合的条件"
fi
```

#### for

```shell
for var in item1 item2 ...itemN; do comand1; command2;... commandN; done;
#实例
for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done

#顺序输出字符串(不需要带双引号)中的字符
for str in This is a string
do
    echo $str
done
```

第二种用法

```shell
for((assignment;condition:next));do
    command_1;
    command_2;
    commond_..;
done;
#实例
#(())中的变量不需要加$
for((i=1;i<=5;i++));do
    echo "这是第 $i 次调用";
done;
```

#### while

```shell
while condition
do
    command
done

#实例
index=1
while((${index}<=5))  #必须为双括号
do
	echo ${index}
	let "index++"
done

#读取键盘信息
echo '按下 <CTRL-D> 退出'
echo -n '输入你最喜欢的网站名: '
while read FILM
do
    echo "是的！$FILM 是一个好网站"
done
```

##### 无限循环

```shell
#1
while :
do
    command
done
#2
while true
do
    command
done
#3
for (( ; ; ))
```

#### until

until 循环执行一系列命令直至条件为 true 时停止。

until 循环与 while 循环在处理方式上刚好相反。

```shell
until condition
do
    command
done

#实例
until [ ! $a -lt 10 ]
do
   echo $a
   a=`expr $a + 1`
done
```

#### case-esac

```shell
case 值 in
模式1)
    command1
    command2
    ...
    commandN
    ;;
模式2）
    command1
    command2
    ...
    commandN
    ;;
esac
#实例
echo '输入 1 到 4 之间的数字:'
echo '你输入的数字为:'
read aNum
case $aNum in
    1)  echo '你选择了 1'
    ;;
    2)  echo '你选择了 2'
    ;;
    3)  echo '你选择了 3'
    ;;
    4)  echo '你选择了 4'
    ;;
    *)  echo '你没有输入 1 到 4 之间的数字'
    ;;
esac
```

case 工作方式如上所示，取值后面必须为单词 **in**，每一模式必须以右括号结束。取值可以为变量或常数，匹配发现取值符合某一模式

后，其间所有命令开始**执行直至 ;;**。

取值将检测匹配的每一个模式。一旦模式匹配，则执行完匹配模式相应命令后不再继续其他模式。**如果无一匹配模式，使用星号 * 捕获**

**该值，再执行后面的命令**

#### 跳出循环

break与continue，用法与java一致

### 函数

语法格式

```shell
[ function ] funcationname [()]

{
	action;
	[return int;]
}
```

- 可以带function fun() 定义，也可以直接fun() 定义,不带任何参数。
- 参数返回，可以显示加：return 返回，如果不加，将以最后一条命令运行结果，作为返回值。 return后跟数值n(0-255

案例

```shell
demoFun(){
    echo "这是我的第一个 shell 函数!"
}
echo "-----函数开始执行-----"
demoFun
echo "-----函数执行完毕-----"

#带有return的函数
funWithReturn(){
    echo "这个函数会对输入的两个数字进行相加运算..."
    echo "输入第一个数字: "
    read aNum
    echo "输入第二个数字: "
    read anotherNum
    echo "两个数字分别为 $aNum 和 $anotherNum !"
    return $(($aNum+$anotherNum))
}
funWithReturn
echo "输入的两个数字之和为 $? !"
```

函数返回值在调用该函数后通过 ${?} 来获得

#### 函数参数

在函数体内部，通过 ${n }的形式来获取参数的值，例如，${1}表示第一个参数，${2}表示第二个参数.

```shell
add2() {
	echo $1
	echo $2
}
add2 1 2
```

### 输入/输出重定向

| 命令            | 说明                                               |
| :-------------- | :------------------------------------------------- |
| command > file  | 将输出重定向到 file。                              |
| command < file  | 将输入重定向到 file。                              |
| command >> file | 将输出以追加的方式重定向到 file。                  |
| n > file        | 将文件描述符为 n 的文件重定向到 file。             |
| n >> file       | 将文件描述符为 n 的文件以追加的方式重定向到 file。 |
| n >& m          | 将输出文件 m 和 n 合并。                           |
| n <& m          | 将输入文件 m 和 n 合并。                           |
| << tag          | 将开始标记 tag 和结束标记 tag 之间的内容作为输入。 |

**需要注意的是文件描述符 0 通常是标准输入（STDIN），1 是标准输出（STDOUT），2 是标准错误输出（STDERR）。**

#### 输出重定向

```shell
who > users
#它将命令的完整的输出重定向在用户文件中(users):
#会覆盖
```

#### 输入重定向

```shell
#统计users的行数
wc -l users
       2 users
#将输入重定向
wc -l < users
       2 
#上面两个例子的结果不同：第一个例子，会输出文件名；第二个不会，因为它仅仅知道从标准输入读取内容。       
```

```shell
command1 < infile > outfile
#同时替换输入和输出，执行command1，从文件infile读取内容，然后将输出写入到outfile中。
```

#### 深入理解

一般情况下，每个 Unix/Linux 命令运行时都会打开三个文件：

- 标准输入文件(stdin)：stdin的文件描述符为0，Unix程序默认从stdin读取数据。
- 标准输出文件(stdout)：stdout 的文件描述符为1，Unix程序默认向stdout输出数据。
- 标准错误文件(stderr)：stderr的文件描述符为2，Unix程序会向stderr流中写入错误信息。

默认情况下，command > file 将 stdout 重定向到 file，command < file 将stdin 重定向到 file。

- 将 stderr 重定向到 file：`command 2 > file`

- 将 stderr 追加到 file 文件末尾： `command 2 >> file`

- 将 stdout 和 stderr 合并后重定向到 file
- 将 stdout 和 stderr 合并后重定向到 file：`command > file 2>$1`或者`command >> file 2>$1`

#### Here Document

定义：Here Document 是 Shell 中的一种特殊的重定向方式，用来将输入重定向到一个交互式 Shell 脚本或程序

语法：

```shell
command >> delimiter
	document
delimiter
#它的作用是将两个 delimiter 之间的内容(document) 作为输入传递给 command。
```

注意：

- 结尾的delimiter 一定要顶格写，前面不能有任何字符，后面也不能有任何字符，包括空格和 tab 缩进。
- 开始的delimiter前后的空格会被忽略掉

实例

1、在命令行中通过 **wc -l** 命令计算 Here Document 的行数：

```shell
wc -l<<EOF
	第一行
	第二行
	第三行
EOF
3  #输出结果为3行
```

2、用在脚本中

```shell
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

cat << EOF
欢迎来到
菜鸟教程
www.runoob.com
EOF
```

#### /dev/null

如果希望执行某个命令，但又不希望在屏幕上显示输出结果，那么可以将输出重定向到 /dev/null
屏蔽 stdout 和 stderr

```
$ command > /dev/null 2>&1
```

 **2** *和* **>** *之间不可以有空格，***2>** *是一体的时候才表示错误输出。*

### 文件包含

定义：shell中包含外部脚本

语法格式

```shell
. filename #点(.)和文件名中间有空格
或者
source filename
```

实例

test1.sh 代码如下：

```shell
url="http://www.baidu1.com"
```

test2.sh 代码如下：

```shell
#使用 . 号来引用test1.sh 文件
. ./test1.sh

# 或者使用以下包含文件代码
# source ./test1.sh

echo "菜鸟教程官网地址：$url"
```

接下来，我们为 test2.sh 添加可执行权限并执行：

```shell
chmod +x test2.sh 
./test2.sh 
#被包含的文件 test1.sh 不需要可执行权限。
```

