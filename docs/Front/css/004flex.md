# Flex布局

Flex是Flexible Box的缩写，意思是“弹性布局”，用来为盒模型提供最大的灵活性，目前此属性已经得到了所有浏览器的支持，可以放心使用

## 基本概念

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。


## 容器属性

容器属性一共有以下6个：

::: tip 属性如下：
* **flex-direction**
* **flex-wrap**
* **flex-flow**
* **justify-content**
* **align-items**
* **align-content**
:::

### 1、flex-direction

```flex-direction ```属性决定了主轴的方向（项目的排列方向）

取值如下：

```css
.wrap {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

* ```row```（默认值）：主轴为水平方向，起点在左端。

* ```row-reverse```：主轴为水平方向，起点在右端。

* ```column```：主轴为垂直方向，起点在上沿。

* ```column-reverse```：主轴为垂直方向，起点在下沿。

### 2、flex-wrap

```flex-wrap```定义了当一行无法盛下全部项目时，如何换行。

取值如下：

```css
.wrap{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```
* 1、```nowrap```（默认）：不换行

![nowrap](~@Front/css/images/flex-nowrap.png)

* 2、```wrap```：换行，第一行在上方

![nowrap](~@Front/css/images/flex-wrap.png)

* 3、```wrap-reverse```：换行，第一行在下方

![nowrap](~@Front/css/images/flex-wrap-reverse.png)

### 3、flex-flow

flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

```css
.wrap{
  flex-flow: row wrap;
}
```

### justify-content

```justify-content```属性定义了项目在主轴上的对齐方式。

取值如下：

```css
.wrap {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```
* 1、```flex-start```（默认值）：左对齐

![nowrap](~@Front/css/images/flex-justify-content.png)

* 2、```flex-end```：右对齐

![nowrap](~@Front/css/images/flex-justify-content-flex-end.png)

* 3、```center```： 居中

![nowrap](~@Front/css/images/flex-justify-content-center.png)

* 4、```space-between```：两端对齐，项目之间的间隔都相等。

![nowrap](~@Front/css/images/flex-justify-content-space-between.png)

* 5、```space-around```：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

![nowrap](~@Front/css/images/flex-justify-content-space-around.png)

### align-items

align-items属性定义项目在交叉轴上如何对齐。

取值如下：

```css
.wrap {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```
![nowrap](~@Front/css/images/flex-align-items-all.png)

* 1、```flex-start```：交叉轴的起点对齐。

![nowrap](~@Front/css/images/flex-align-items-flex-start.png)

* 2、```flex-end```：交叉轴的终点对齐。

![nowrap](~@Front/css/images/flex-align-items-flex-end.png)

* 3、```center```：交叉轴的中点对齐。

![nowrap](~@Front/css/images/flex-align-items-center.png)

* 4、```baseline```: 项目的第一行文字的基线对齐。

![nowrap](~@Front/css/images/flex-align-items-baseline.png)

* 5、```stretch```（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

![nowrap](~@Front/css/images/flex-align-items-stretch.png)

### align-content

```align-content```属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

取值如下：

```css
.wrap {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}

```
![nowrap](~@Front/css/images/flex-align-content-all.png)

* ```flex-start```：与交叉轴的起点对齐。

![nowrap](~@Front/css/images/flex-align-content-flex-start.png)

* ```flex-end```：与交叉轴的终点对齐。

![nowrap](~@Front/css/images/flex-align-content-flex-end.png)

* ```center```：与交叉轴的中点对齐。

![nowrap](~@Front/css/images/flex-align-content-center.png)

* ```space-between```：与交叉轴两端对齐，轴线之间的间隔平均分布。

![nowrap](~@Front/css/images/flex-align-content-space-between.png)

* ```space-around```：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。

![nowrap](~@Front/css/images/flex-align-content-space-around.png)

* ```stretch```（默认值）：轴线占满整个交叉轴。

![nowrap](~@Front/css/images/flex-align-content-stretch.png)

## 项目属性

::: tip 属性如下：

* **order**
* **flex-grow**
* **flex-shrink**
* **flex-basis**
* **flex**
* **align-self**

:::

### order

```order```属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。


### flex-grow

```flex-grow```属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

### flex-shrink

```flex-shrink```属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

### flex-basis

```flex-basis```属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

### flex

```flex```属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

### align-self

```align-self```属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。