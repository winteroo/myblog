# element-ui日期时间选择控件特殊用法

## 设置日期选择范围
```vue
<template>
  <el-date-picker
    v-model="dateValue"
    type="daterange"
    range-separator="至"
    value-format="yyyy-MM-dd"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :picker-options="pickerOptions"
  ></el-date-picker>
</template>
<script>
export default {
  name: 'xxx',
  data () {
    return {
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.choiceDate = minDate.getTime();
          if (maxDate) {
            this.choiceDate = '';
          }
        },
        disabledDate: (time) => {
          if (this.choiceDate) {
            // 设置30天的选择范围
            const one = 30 * 24 * 3600 * 1000;
            const minTime = this.choiceDate - one;
            const maxTime = this.choiceDate + one;
            return time.getTime() < minTime || time.getTime() > maxTime;
          }
        }
      }
    };
  }
}
</script>
```
## 效果图
选择了开始日期后，组件会自动将超出一月的日期默认置成不可选状态。

![datepciker](~@Front/Vue/images/datePicker.png)