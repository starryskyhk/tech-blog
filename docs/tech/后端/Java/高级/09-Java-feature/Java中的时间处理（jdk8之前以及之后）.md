---
slug: /tech/backend/java/high/jdk8-time
tags: ["java"]
date: 2024-01-31T20:04
---
# Java中的时间处理（jdk8之前以及之后）

## Java8之前

### Date

#### 初始化

方式一：使用当前时间

```java
//构造器一：创建当前时间的对象
Date date1 = new Date();  
//显示当前的年月日,时分秒
System.out.println(date1.toString());  //Mon Dec 21 15:52:03 CST 2020
//返回时间戳,1970年1月1日到现在的毫秒数
System.out.println(date1.getTime());   //1608537123085
```

方式二：指定时间

```java
//构造器二：指定时间.
Date date2 = new Date(9608520607791L);  
System.out.println(date2.toString());   //Fri Jun 26 01:30:07 CST 2274
//构造器三，自定义
//这个构造器已废用，因为，他会在年上加1900的偏移，月份是从0开始到11
Date date3 = new Date(2020,12,21,18,12,45);
//Fri Jan 21 18:12:45 CST 3921
System.out.println(date3.toString());
```

#### java.util.Date与java.sql.Date

sql中的Date是为了与数据库中date字段进行匹配。有时候需要将util.Date转为sql.Date，以下是转化方法

```java
public void test02() {
    //创建SQL的时间对象
    java.sql.Date date = new java.sql.Date(9608520607791L);
    System.out.println(date.toString());
    //将util.Date转为sql.Date
    Date date1 = new Date();
    //情况一
    date = (java.sql.Date) date1;
    //情况二
    Date date2 = new Date();
    //通过时间戳创建sql.Date对象
    java.sql.Date date3 = new java.sql.Date(date2.getTime());
}
```

#### 相关获取参数方法

```java
public void test03() {
    Date date = new Date();
    //获取到的年份是当前年份减去1900
    System.out.println(date.getYear());
    //获取到的月份为下标
    System.out.println(date.getMonth());
    System.out.println(date.getDate());
    System.out.println(date.getHours());
    System.out.println(date.getMinutes());
}
```

### SimpleDateFormat

格式化日期主要分为两种

- 格式化：日期->字符串
- 解析：字符串->日期

#### 格式化与解析(默认)

```java
public void test01() throws ParseException {
    SimpleDateFormat format = new SimpleDateFormat();
    //格式化日期
    Date date = new Date();
    System.out.println(format.format(date));//2020/12/21 下午7:47
    //解析
    String str = "2020/10/21 上午11:26";
    Date parse = format.parse(str);
    System.out.println(parse.toString());//Wed Oct 21 11:26:00 CST 2020
}
```

#### 格式化与解析(自定义)

```java
//指定方式进行格式化
SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
String format2 = format1.format(date);
System.out.println(format2);//2020-12-21 07:47:01
//解析
//要求必须符合SimpleDateFormat识别格式
System.out.println(format1.parse("9999-12-21 11:36:12").toString());//Tue Dec 21 11:36:12 CST 9999
```

![image-20201221200150772](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/%E6%97%A5%E6%9C%9F%E7%B1%BB%E5%AD%97%E6%AF%8D%E6%84%8F%E6%80%9D.png)

### Calender

Calender是个日历类，而且是个抽象基类，主要用于完成日期字段之间相互操作的功能。

#### 获取Calender实例

```java
//方式一：调用静态方法
Calendar instance = Calendar.getInstance();
//方式二：创建其子类
GregorianCalendar calendar = new GregorianCalendar();
```

#### 常用方法

主要为get、set、add、getTime、setTime

```java

public void test01() {
    //1、实例化
    //方式一：调用静态方法
    Calendar instance = Calendar.getInstance();
    //2.常用方法
    //get()
    System.out.println(calendar.get(Calendar.MONTH));//12月则输出11。
    int days = calendar.get(Calendar.DAY_OF_MONTH);//这个月的第几天
    System.out.println(days);
    //set()
    calendar.set(Calendar.DAY_OF_MONTH,22);//更改为这个月的第22天
    //add()
    calendar.add(Calendar.DAY_OF_MONTH,3);//在现有的上面加3天
    //getTime，获得当前日期所表示的Date
    Date time = calendar.getTime();
    System.out.println(time);
    //setTime
    //将日历改为date的时间
    Date date = new Date();
    calendar.setTime(date);
}
```

#### 注意事项

获取月份时：一月是0，二月是1，以此类推，12月是11

 获取星期时：周日是1，周二是2 ，。。。。周六是7

## Java8之后

Date面临的问题

- 可变性，像日期和时间应该是不可变的
- 偏移性，Date中的年份是从1900年开始的，而月份是从0开始的
- 格式化：格式化只对Date有用，Calender则不行
- 此外，它们也不是线程安全的，也不能处理闰秒

java8开始，java.time包含了本地日期（LocalDate），本地时间（LocalTime），本地日期时间

（LocalDateTime）、时区（ZoneDateTime）

![image-20201221202734108](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/java8%E6%97%B6%E9%97%B4API%E5%8C%85.png)

### LocalDateTime

主要包括了初始化、获取(get)、设置(with)、加操作()plusxxx、减操作minusxxx

#### 初始化

```java
//now,获取当前的日期，时间，或日期时间
LocalDate localDate = LocalDate.now();
LocalTime localTime = LocalTime.now();
LocalDateTime localDateTime = LocalDateTime.now();
System.out.println(localDate);//2020-12-21
System.out.println(localTime);//20:35:21.507829200
System.out.println(localDateTime);//2020-12-21T20:35:21.507829200
//of,指定的年月日时分秒没有偏移量
LocalDateTime localDateTime1 = LocalDateTime.of(2020, 10, 6, 13, 26, 46);
System.out.println(localDateTime1);//2020-10-06T13:26:46
```

#### 获取操作

```java
//getxx()
//当前为本月的第几天
System.out.println(localDateTime.getDayOfMonth());//21
//当前为这周的星期几
System.out.println(localDateTime.getDayOfWeek());//MONDAY
//当前为多少月,英文
System.out.println(localDateTime.getMonth());//DECEMBER
//当前为第几月，数字
System.out.println(localDateTime.getMonthValue());//12
//当前的分钟
System.out.println(localDateTime.getMinute());//35
```

#### 设置操作

```java
//设置 with
//会有返回值，体现不可变性。
//设置为这个月的第22天
LocalDateTime localDateTime2 = localDateTime.withDayOfMonth(22);
System.out.println(localDateTime);
System.out.println(localDateTime2);
//设置4点
LocalDateTime localDateTime3 = localDateTime.withHour(4);
System.out.println(localDateTime3);
```

增加及减操作

```java
//加减操作 也有不可变性
//加操作
LocalDateTime localDateTime4 = localDateTime.plusMonths(3);//加3个月
System.out.println(localDateTime4);
//减操作
LocalDateTime localDateTime5 = localDateTime.minusDays(5);
```

```
//将时间戳转为LocalDateTime
LocalDateTime localDateTime6 = LocalDateTime.ofEpochSecond(new Date().getTime(), 0, ZoneOffset.ofHours(8));
```

### Instant

时间上的一个瞬时点，为时间戳，java.time通过值类型Instant提供机器视图，不提供处理人类意义上的时间单位

表示从1970年1月1日0时0分0秒开始的秒数。

Instant精度可达到纳秒

1秒=1000毫秒=10^6微秒=10^9

```java
public void test01() {
    Instant instant = Instant.now();
    System.out.println(instant);//2020-12-21T13:28:31.532756400Z
    //设置偏移
    OffsetDateTime offset = instant.atOffset(ZoneOffset.ofHours(8));
    System.out.println(offset);//2020-12-21T21:28:31.532756400+08:00
    //获取这个瞬时点的毫秒数
    long milli = instant.toEpochMilli();
    System.out.println(milli);//1608557311532
    //实例化方式二：通过给定的毫秒数设置
    Instant instant1 = Instant.ofEpochMilli(1608530031575L);
    System.out.println(instant1);//2020-12-21T05:53:51.575Z
}
```

### DateTimeFormatter

和SimpleDateFormat相似，也分为格式化和解析两种

该类提供了三种格式化方法

方式一：预定义的标准格式

```java
//方式一
DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
//格式化
LocalDateTime localDateTime = LocalDateTime.now();
String str1 = formatter.format(localDateTime);
System.out.println(localDateTime);
System.out.println(str1);
//解析
TemporalAccessor parse1 = formatter.parse("2020-12-21T14:00:32.7956894");
System.out.println(parse1);
```

方式二：本地化的格式

```java
//方式二
DateTimeFormatter formatter1 = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT);
System.out.println(formatter1.format(localDateTime));
```

方式三：自定义格式

```java
//方式三
DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss");
//格式化
String str3 = formatter2.format(LocalDateTime.now());
//解析
TemporalAccessor parse = formatter2.parse(str3);
System.out.println();
```

### 其他API

![image-20201221214616830](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/Java8%E6%97%A5%E6%9C%9F%E5%85%B6%E4%BB%96API.png)

### 与传统日期处理的转换

![image-20201221214654128](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/Java8%E6%97%A5%E6%9C%9F%E2%80%94%E2%80%94%E4%B8%8E%E4%BC%A0%E7%BB%9F%E6%97%A5%E6%9C%9F%E5%A4%84%E7%90%86%E7%9A%84%E8%BD%AC%E6%8D%A2.png)