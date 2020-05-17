# 003 -- JS字符串截取

## slice
::: tip 说明
:loud_sound:
stringObject.slice(start,end)
start：必选参数，初始选择的字符串的位置，可以为负数，负数即为从字符串末尾开始选取，-1是最后一个，-2是倒数第二个，**下标从0开始**
end：可选，截取的字符串为该数字位之前的字符串。省略则选取到字符串末尾。
slice的截取规范类似于前闭后开  => **[start, end)**
:::

## substring
::: tip 说明
:loud_sound:
stringObject.substring(start,end)
截取方式与slice相似，唯一不同点是
**substring总是会将start，end中的小值当做截取的开始值，即使大值在start位置**
:::

![chrome测试结果](~@Front/JS/image/slice.png)

## substr

::: warning 说明
:loud_sound:
stringObject.substr(start,length)
从start开始截取length长度的字符串，start支持负值截取，单length不支持，
**省略length会截取到字符串末尾**
**注意此api不是ECMAscript标准化的api，故少用**
:::

![chrome测试substr](~@Front/JS/image/substr.png)

## 总结
::: warning 说明
:loud_sound:
slice和substring都是**前闭后开**的截取方式，slice相对更加规范一点，建议使用slice。
:::
