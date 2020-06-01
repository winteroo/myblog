# 水平垂直居中子元素

子元素的水平垂直居中在css布局中是非常常用的技巧，下面就总结下实现方法，以下是基本的页面结构以及基本css样式：
```html
<div class="content content-el">
  <div class="box box-el"></div>
</div>
```
```css
.content{
  width: 400px;
  height: 400px;
  border: 2px solid #108adf;
}

.box{
  background-color: yellow;
  border: 1px dotted #108adf;
}
```
:::tip
在html代码中，我们为外层容器预留了```content-el```样式名，方便后续添加样式，同理也为内层子元素预留了```box-el```样式名。
:::

## 子元素宽高已知

当子元素的宽高已知的情况下，居中子元素的方法主要为以下三种：

* 1、absolute + top:50% left:50% + margin负值

* 2、absolute + top:0 left:0 right:0 botton:0 + margin:auto

* 3、absolute + top:calc left:calc

###  1、absolute + top:50% left:50% + margin负值

```css
.content-el{
  position: relative;
}

.box-el{
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
}
```

绝对定位的百分比(top50% left50%)是相对于父元素的宽高，通过这个特性可以让子元素居中显示，但是对于绝对定位是基于子元素的左上角，期望的效果是基于子元素的中心居中显示。
为了修正这个问题，可以借助外边距的负值，负的外边距可以让元素向相反的方向定位，通过指定子元素的外边距为子元素宽度(或高度)一半的负值，就可以让子元素居中了。

### 2、absolute + top:0 left:0 right:0 botton:0 + margin:auto

```css
.content-el{
  position: relative;
}

.box-el{
  position: absolute;
  width: 100px;
  height: 100px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
```

通过绝对定位子元素，并且在各个定位方向的距离上都设为0，此时再将margin设为auto，就可以让子元素居中显示了。

### 3、absolute + top:calc left:calc

```css
.content-el{
  position: relative;
}

.box-el{
  position: absolute;
  width: 100px;
  height: 100px;
  left: calc(100% - 50px);
  top: calc(100% - 50px);
}
```
基本思想与第一种方法类似，只是利用了css3的新特性对语法做了更改。

## 子元素宽高未知

当子元素的宽高已知的情况下，居中子元素的方法主要为以下三种：

* 1、absolute + transform

* 2、flex布局

* 3、css-table

### 1、absolute + transform

```css
.content-el{
  position: relative;
}

.box-el{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

原理同第一种方法，不过使用了css3新增的transform可以不必已知子元素的宽高。transform的translate属性也可以设置百分比，它是相对于自身的宽高，
所以可以在不知道子元素宽高的情况下设置translate(-50%,-50%)，就可以让子元素向相反方向移动自身宽高的一半，继而实现水平垂直居中。

### 2、flex布局

```css
.content-el{
  display: flex;
  /*垂直居中 */
  justify-content: center;
  /*水平居中*/
  align-items: center;
}

.box-el{}

```

利用flex布局，一句代码便可实现在水平或是垂直方向上的居中，非常方便。

### 3、css-table

```css
.content-el{
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.box-el{
  display: inline-block;
}

```

css新增的table属性，可以让我们把普通元素，变为table元素的现实效果，通过这个特性也可以实现水平垂直居中，这个属性和table标签一样的居中原理。