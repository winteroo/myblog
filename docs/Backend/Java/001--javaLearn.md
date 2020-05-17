# Java基础

## 1.设置java编译编码规范
解决java无法输出中文的问题，设置以UTF-8的格式编译
```bash
javac -encoding UTF-8  HelloWorld.java
```
## 2.java原则
* 一个Java源码只能定义一个public类型的class，并且class名称和文件名要完全一致；

* 使用javac可以将.java源码编译成.class字节码；

* 使用java可以运行一个已编译的Java程序，参数是类名。
## 3.window下杀进程
```bash
# 查找port端口的进程
netstat -ano | findstr <port>
# 杀死PID进程
taskkill -PID <PID> -F
```
## 4.java中的基本数据类型及其包装类

虽然 Java 语言是典型的面向对象编程语言，但其中的八种基本数据类型并不支持面向对象编程，
基本类型的数据不具备“对象”的特性——不携带属性、没有方法可调用。 沿用它们只是为了迎合人
类根深蒂固的习惯，并的确能简单、有效地进行常规数据处理。这种借助于非面向对象技术的做法
有时也会带来不便，比如引用类型数据均继承了 Object 类的特性，要转换为 String 类型（经常
有这种需要）时只要简单调用 Object 类中定义的```toString()```即可，而基本数据类型转换为 String 
类型则要麻烦得多。为解决此类问题 ，Java为每种基本数据类型分别设计了对应的类，称之为包装类(Wrapper Classes)，
也有教材称为外覆类或数据类型类。

同时也存在拆箱和装箱的概念。

| 基本数据类型 | 对应包装类型 |
| ------ | ------ | ------ |
| int(4字节) | Integer |
| byte(1字节) | Byte |
| short(2字节) | Short |
| long(8字节) | Long |
| float(4字节) | Float |
| double(8字节) | Double |
| char(2字节) | Character |
| Boolean(未定) | Boolean |
