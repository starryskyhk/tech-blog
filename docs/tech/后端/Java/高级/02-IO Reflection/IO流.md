---
slug: /tech/backend/java/high/io
tags: ["java","io"]
date: 2024-01-31T20:04
---
# IO流

## File类概述

绝对路径：文件真正存在的路径，例如D:/wamp/www/img/icon.jp

相对路径：自己相对与目标的位置，例如../icov.jpg, ./表示当前目录，../表示上一级目录，/表示当前根目录

**File类只设置文件或目录的创建，删除，修改时间，文件大小，重命名等方法，不涉及写入或读取文件内容的操作，如需读取文件内容或者写入，则必须通过IO流去实现**

```java
//相关获取方法
File file = new File("ceshi.txt");
File file2 = new File("C:\\Users\\Lenovo\\Desktop\\jdk api 1.8_google.CHM");
//获取绝对路径
System.out.println(file.getAbsolutePath());
//获取相对路径
System.out.println(file.getPath());
//获取文件名
System.out.println(file.getName());
//获取父目录
System.out.println(file.getParent());
//获取文件长度
System.out.println(file.length());
//获取当前文件目录的子文件名
file.list();
//获取当前文件目录的子文件名，以file方式呈现
file.listFiles();
//获取最后一次修改时间
System.out.println(file.lastModified());
```

```java
//判断方法
File file =new File("");
//判断file是否为目录
file.isDirectory();
//判断file是否为文件
file.isFile();
//判断file是否存在
file.exists();
//判断file是否可读
file.canRead();
//判断file是否可写
file.canWrite();
//判断file是否为隐藏
file.isHidden();
```

```java
//文件的创建
File file =new File("hi.txt");
if(!file.exists()){
    file.createNewFile();
    System.out.println("创建成功");
}else{
    file.delete();
    System.out.println("删除成功");
}
```

```java
//文件目录创建
File file =new File("C:\\Users\\Lenovo\\Desktop\\1\\2\\3\\4.txt");
//如上层目录不存在，则创建失败
System.out.println(file.mkdir());
//如上层目录不存在，则一并创建
System.out.println(file.mkdirs());
```

## 流的分类

|                      |        |        |
| :------------------: | :----: | :----: |
|     按流的流向分     | 输入流 | 输出流 |
| 按流处理数据的类型分 | 字符流 | 字节流 |
|     按流的角色分     | 节点流 | 处理流 |

输入流：读取文件到内存

输出流：将内存中的数据写入文件

字符流：主要处理纯文本文件

字节流：主要处理非纯文本文件

![流分类](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/IO%E6%B5%81%E5%88%86%E7%B1%BB.png)

![image-20201216122254790](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/IO%E6%B5%81%E5%88%86%E7%B1%BB2.png)

### 字符流

作用：处理纯文本文件，例如(.txt  .c  .java  .cpp等)

如果使用字节流处理文本文件可能出现乱码问题

**使用方法**

```java
//数据的读出
public void testFileReader() {
    FileReader fr = null;
    try {
        //1:实例化File对象，指明操作文件
        File file = new File("hello.txt");//在当前的model下,因为是在单元测试下
        //2:提供具体的流
        fr = new FileReader(file);
        //3:数据的读入过程
        //read(),返回读入的一个字符，-1为读完了
        //        int data = fr.read();
        //        while(data!=-1){
        //            System.out.print((char) data);
        //            data = fr.read();
        //        }

        //============简化操作1，语法上的修改
        int data;
        while ((data = fr.read())!=-1){
            System.out.print((char) data);
        }
        //===========简化操作2.使用read的重载
        char[] cbuf = new char[20];
        while ((len = fr.read(cbuf))!=-1){
            System.out.print(new String(cbuf,0,len));
        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        //4.流的关闭操作
        try {
            if(fr!=null) {
                fr.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
```

```java
//数据的读出并写入
public void testFileReaderFileWriter() throws IOException {
    //1:创建File类对象，指明读入和写出的
    File srcFile = new File("hello.txt");
    File destFile = new File("hello2.txt");
    //2:创建输入输出流
    FileReader fr = new FileReader(srcFile);
    FileWriter fw = new FileWriter(destFile);

    //3:数据的读入和写出
    char[] cbuf = new char[5];
    int len;//每次读入的个数
    while((len = fr.read(cbuf))!=-1){
        //每次写出len个
        fw.write(cbuf,0,len);
    }
    //4：流的关闭
    fw.close();
    fr.close();
}
```

### 字节流

作用：用于处理非文本文件(.jpg  .mp3  .mp4  .doc  .ppt等)

**使用字节流处理纯文本文件可能会出现乱码**

**使用方法(基本与字符流操作相同，不过缓冲数组为byte类型)**

```java
public void copyFile(String srcPath,String destPath) throws IOException {
    //1：造文件
    File srcFile  = new File(srcPath);
    File destFile  = new File(destPath);
    //2:造流
    FileInputStream fis = new FileInputStream(srcFile);
    FileOutputStream fos = new FileOutputStream(destFile);
    //3:读文件，写文件
    byte[] buffer = new byte[5];
    int len;
    while((len=fis.read(buffer))!=-1){
        fos.write(buffer);
    }
    //4:关闭
    fos.close();
    fis.close();
}
```

### 缓冲流

作用：缓冲流作为外层流，其主要目的是为了提高速度，其内部维护了一个缓冲区

**使用方法**

```java
public void testBufferedReaderBufferedWriter() throws IOException {
    BufferedReader br = new BufferedReader(new FileReader(new File("hello.txt")));
    BufferedWriter bw = new BufferedWriter(new FileWriter(new File("hello5.txt")));
    //读写操作,方式一：使用char数组
    //         char[] cbuf = new char[1024];
    //         int len;
    //         while((len = br.read(cbuf))!=-1){
    //             bw.write(new String(cbuf,0,len));
    //         }
    //方式二:使用String
    String data;
    //缓冲流可直接读取一行，其结果返回数据或空s
    while((data = br.readLine())!=null){
        bw.write(data);
        bw.newLine();//提供换行
    }
    bw.close();
    br.close();
}
```

### 转换流

InputStreamReader：将一个字节的输入流转换为字符的输入流

OutputStreamWriter：将一个字节的输出流转换为字符的输出流

作用：提供字节流与字符流之间的转换

解码：字节、字节数组----->字符数组、字符串

编码：字符数组、字符串----->字节、字节数组

**使用方式**

```java
//将文件重新编码后读取
public void test01() throws IOException {
    FileInputStream fis   = new FileInputStream("hello_gbk.txt");
    //InputStreamReader isr = new InputStreamReader(fis);//使用系统默认的字符集
    //参数二指明字符集
    InputStreamReader isr = new InputStreamReader(fis,"gbk");//使用系统默认的字符集
    char[] cbuf = new char[20];
    int len;
    while((len = isr.read(cbuf))!=-1){
        String str = new String(cbuf,0,len);
        //将其输出，其字符格式为gbk
        System.out.println(str);
    }
    isr.close();
}
```

```java
public void test02() throws IOException {
    //造文件和流
    FileInputStream fis = new FileInputStream(new File("hello.txt"));
    FileOutputStream fos = new FileOutputStream( new File("hello_gbk.txt"));
    //造转换流，以UTF-8的格式读取文件1，并以gbk的格式写入文件2
    InputStreamReader isr = new InputStreamReader(fis,"UTF-8");
    OutputStreamWriter osw = new OutputStreamWriter(fos,"gbk");
    //读写过程
    char[] cbuff = new char[20];
    int len;
    while((len = isr.read(cbuff))!=-1){
        osw.write(cbuff,0,len);
    }
    //关闭资源
    isr.close();
    osw.close();
}
```

### 标准的输入输出流

System.in 标准的输入流，从键盘输入

System.out 标准的输出流，从控制台   ·输出

System的setIn(InputStream in)和SetOut(PrintStream ps)方式重新指定输入和输出

```java
public void PrintStream() {
    /**
     * 练习1.3，从键盘输入字符串，整行转为大写，然后继续输入，输入e或exit时结束。
     * 使用System.in实现，System.in---->转换流---->BufferedReader的readLine()
   	*/
    BufferedReader br = null;
    //将字节流转换为字符流
    InputStreamReader isr = new InputStreamReader(System.in);
    br = new BufferedReader(isr);
    while (true) {
        String data = br.readLine();
        if ("e".equalsIgnoreCase(data) || "exit".equalsIgnoreCase(data)) {
            break;
    }
    String upperCase = data.toUpperCase();
    System.out.println(upperCase);
    br.close();
}	
```

### 打印流

```java
public void test02() throws FileNotFoundException {
    PrintStream ps = null;
    FileOutputStream fos = new FileOutputStream("test.txt");
    //创建打印输出流，设置为自动刷新模式（写入换行符或字节'\n'时会刷新输出缓冲区）
    ps = new PrintStream(fos, true);
    if (ps != null) {
        //把标准输出流（控制台输出）改为文件内输出
        System.setOut(ps);
    }
    for (int i = 0; i <= 255; i++) {
        System.out.print((char) i);
        if (i % 50 == 0) {
            System.out.println();
        }
    }
    ps.close();
}
```

### 数据流

DataInputStream：数据输入流

DataOutputStream：数据输出流

作用：用户读取或写出基本数据类型的变量或字符串

```java
//写入数据
public void DataStreamWriteTest() throws IOException {
    //1.
    DataOutputStream dos  = new DataOutputStream(new FileOutputStream("data.txt"));
    //2.
    dos.writeUTF("韩坤");
    dos.flush();//刷新操作，将内存中的数据写入文件
    dos.writeInt(21);
    dos.flush();
    dos.writeBoolean(true);
    dos.flush();
    //3.
    dos.close();
}
```

```java
//读取数据
public void DataStreamReadTest() throws IOException {
    //1.
    DataInputStream dis = new DataInputStream(new FileInputStream("data.txt"));
    //2.
    System.out.println(dis.readUTF());
    System.out.println(dis.readInt());
    System.out.println(dis.readBoolean());
    //3.
    dis.close();
}
```

### 对象流

ObjectInputStream 和ObjectOutPutStream

作用：用于存储和读取基本数据类型数据或对象的处理流

```java
//序列化对象Person
package com.starrysky.io.study;

import java.io.Serializable;

/**
 * 1.序列化需要实现serializable
 * 2.需要提供一个全局常量serialVersionUID
 * 3.必须其内部属性也是可序列化的
 */
public class Person implements Serializable {
    //如不设置版本号，则类会根据类的结构自动去生成，如结构发生改变，则之前的可能读取出错。
    //如同一个穿梭门，
    public static final long serialVersionUID = 42L;
    //static 和transient修饰的不能被序列化
    private String name;
    private int age;

}

```

```java
//序列化过程：将内存中的java对象保存到磁盘中或者通过网络传输
//使用ObjectOutPutStream实现
public void ObjectOutPutStreamTest() throws IOException {
    ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(new File("object.dat")));
    oos.writeObject("我爱天安门");
    oos.flush();
    oos.writeObject(new Person("韩坤",21));
    oos.flush();
    oos.close();
}
```

```java
//反序列化过程
public void ObjectInputStreamTest() throws Exception{
    ObjectInputStream ois = new ObjectInputStream(new FileInputStream("object.dat"));
    System.out.println(ois.readObject());
    System.out.println(ois.readObject());
    ois.close();
}
```

### 任意进入流

RandomAccessFile

1.直接继承于Object类，实现了DataInput和DataOutPut

2.它既可以作为一个输入流，也可以作为一个输出流

> r：以只读的方式打开，，这种方式不会去创建文件
> rw：可以读取或写入
> rwd：可以读取或写入，同步文件内容的更新
> rws：可以读取或写入；同步文件内容和元数据的更新

```java
public void test01()   {
    //只读方式打开,不存在会报错
    RandomAccessFile raf1 =  new RandomAccessFile(new File("你的名字.jpg"),"r");
    //输出，读并写，不存在会造一个
    RandomAccessFile raf2 = new RandomAccessFile(new File("你的名字1.jpg"),"rw");
    byte[] buf= new byte[1024];
    int len;
    //输出
    while((len = raf1.read(buf))!=-1){
        raf2.write(buf,0,len);
    }
    raf1.close();
    raf2.close();
    //=========2========
    raf1 = new RandomAccessFile("hello.txt","rw");
    //seek作用：将指针调到角标为3的位置,下标从0开始
    raf1.seek(3);
    //不是对文件进行覆盖，而是从开头开始，对内容进行一个覆盖
    raf1.write("abc".getBytes());

}
```

```java
//实现插入的效果
public void test03() throws IOException {
    RandomAccessFile raf1 = null;
    //如不存在会造一个
    raf1 = new RandomAccessFile("hello.txt","rw");
    raf1.seek(3);
    //保存指针3后面的所有数据到stringBuilder中。设定长度问文件的长度，防止扩容
    StringBuilder builder = new StringBuilder((int) new File("hello.txt").length());
    byte[] buf = new byte[1024];
    int len;
    while((len = raf1.read(buf))!=-1){
        builder.append(new String(buf,0,len));
    }
    System.out.println(builder.toString());
    raf1.seek(3);
    raf1.write("xyz".getBytes());
    //将保存的字符串写入
    raf1.write(builder.toString().getBytes());
    raf1.close();
    //避免出现乱码
    //        ByteArrayOutputStream baos = new ByteArrayOutputStream();
    //        byte[] buffer = new byte[10];
    //        int len;
    //        while((len = raf1.read(buffer))!=-1){
    //            baos.write(buffer,0,len);
    //        }
    //        baos.toString();
}
```
