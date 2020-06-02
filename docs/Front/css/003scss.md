# SCSS

## 基础介绍

* 1、基础变量(```$```开头，需要```;```结尾)，在变量后添加```!default```标志，表示此变量可被覆盖
```scss
$blue: #409EFF !default;
$gray: #909399;
$green: #67c23a;
$red: #f56c6c;
$orange: #e6a23c;
```

* 2、节点嵌套
```scss
.content {
  .box {
    font-size: 14px;
  }
}
```

* 3、混入（``` @mixin```）
:::tip
利用``` @mixin```来定义一个混入样式

利用``` @include```来引入一个混入样式

混入样式可以带参数，并且可以设置默认参数
:::

```scss
// li 样式清除
@mixin list-unstyled {
  padding-left: 0;
  list-style: none;
}

// 宽高设置
@mixin size($width: auto, $height:auto) {
  width: $width;
  height: $height;
}

// 使用
.box{
  @include list-unstyled;
  @include size(100px, 100px);
  font-size: 16px;
}
```

* 4、```@extend```：允许一个选择器继承另一个选择器
```scss
.a{
  color: red;
}
.a1{
  @extend .a;
  font-size: 14px;
}
```
解析为：
```css
.a .a1 {
  font-size: 14px;
}
```
* 5、引用父元素```&```：在编译时，```&```将被替换成父选择符
```scss
.a{
  color: blue;
  &:hover{
    color: red;
  }
}
```
* 6、```@function```函数，必须有返回值
```scss
@function du($w){
  @return $w * 2;
}
.a {
  border: #{du(2)}px solid red;
}
// 输出
.a {
  border: 4px solid red;
}
```
:::tip
```#{scss变量}```类似js里面的字符串拼接，可引用变量与字符串进行拼接。
:::
* 7、```@if```、```@else```、```@else if```判断语句。
* 8、引入外部scss

利用```@import```来引入外部scss文件，并且可以省略scss文件的扩展名

:::tip
```_mixin.scss```这种以```_```开头的scss文件，编译器会默认不自动进行编译，只有当他被
引用的时候才会执行编译，一般用作混入或是基础变量。并且在引入时可以省略开头的```_```和结尾的```.scss```,
```@import 'mixin';  ===  @import '_mixin.scss'```
:::
```scss
@import 'main.scss';
@import 'mixin'; // => @import 'mixin.scss'
```

## 实用的混入函数

```scss
$blue: #409EFF;
$gray: #909399;
$green: #67c23a;
$red: #f56c6c;
$orange: #e6a23c;


// 清除浮动
@mixin clearfix {
  &::after {
    display: block;
    clear: both;
    content: "";
  }
}

// flex垂直水平居中
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// 普通垂直水平居中
@mixin pos-center {
  position: absolute;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
}

// 背景图片
@mixin bg-img($url) {
  background-image: url($url);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}


// 文字设置
@mixin font($size: 14px, $color: #000, $weight: normal) {
  font-size: $size;
  color: $color;
  font-weight: $weight;
}

// 设置行数据行高
@mixin line-height($height: auto) {
  height: $height;
  line-height: $height;
}

// 宽高设置
@mixin size($width: auto, $height:auto) {
  width: $width;
  height: $height;
}

// 强制折行
@mixin wrapper() {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

// 超出一行隐藏，显示...
@mixin text-truncate() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// li 样式清除
@mixin list-unstyled {
  padding-left: 0;
  list-style: none;
}


// 各个方向的三角
@mixin caret {
  display: inline-block;
  content: "";
}

@mixin caret-down($width: 5px, $bg-color: $blue) {
  @include caret;
  border-top: $width solid $bg-color;
  border-right: $width solid transparent;
  border-bottom: 0;
  border-left: $width solid transparent;
}


@mixin caret-up($width: 5px, $bg-color: $blue) {
  @include caret;
  border-top: 0;
  border-right: $width solid transparent;
  border-bottom: $width solid $bg-color;
  border-left: $width solid transparent;
}

@mixin caret-right($width: 5px, $bg-color: $blue) {
  @include caret;
  border-top: $width solid transparent;
  border-right: 0;
  border-bottom: $width solid transparent;
  border-left: $width solid $bg-color;
}

@mixin caret-left($width: 5px, $bg-color: $blue) {
  @include caret;
  border-top: $width solid transparent;
  border-right: $width solid $bg-color;
  border-bottom: $width solid transparent;
}

```