# 新建spring boot项目

学习了java的基础知识，我们需要上手框架，本文主要叙述利用idea创建spring boot项目的过程。

## 利用idea新建sprint boot项目

### 在idea中新建项目，在左侧菜单中选择Spring Initializr选项
默认从https://start.spring.io下载默认模板
![springboot1](~@Backend/Java/images/initSpring1.png)

### 修改项目的名称
设置自己的项目名称
![springboot2](~@Backend/Java/images/initSpring2.png)

### 选择 依赖项
这里选择自己项目的依赖项，现在我们先创建最简单的web项目，所以只选择一个spring web的依赖性，后续我们会
不断向项目中添加各种依赖。
![springboot3](~@Backend/Java/images/initSpring3.png)

### 修改项目的创建位置
记得修改自己项目的位置，别总丢在c盘内，拖慢电脑的运行速度哦。点击finish项目创建成功。
![springboot4](~@Backend/Java/images/initSpring4.png)

### 编写hello world
编写测试类HelloWorld
![springboot5](~@Backend/Java/images/initSpring5.png)

### 查看效果
打开浏览器输入http://localhost:8086/hello
![springboot6](~@Backend/Java/images/initSpring6.png)


::: warning 说明
:loud_sound:
idea有时会报错找不到主类sprintboot,如下，可以在cmd中运行**mvn spring-boot:run**进行启动，发现项目可以正常启动
这里是idea的问题，目前还没有找到很好的解决办法
![springboot5](~@Backend/Java/images/error.png)
:::

### 查看效果


## 添加mybatis框架支持


## 添加logback日志支持