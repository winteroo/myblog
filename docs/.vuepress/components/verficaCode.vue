<template>
  <div @click="refreshCode" class="code">
    <s-identify :identify-code="identifyCode"></s-identify>
  </div>
</template>

<script>
import SIdentify from './SIdentify.vue';
export default {
  name: 'verficaCode',
  components: {
    SIdentify
  },
  data () {
    return {
      identifyCode: '',
      identifyCodes: '1234567890zxcvbnmasdfghjklqwertyuiop'
    };
  },
  mounted () {
    this.refreshCode();
  },
  methods: {
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode () {
      this.identifyCode = '';
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
    },
  }
}
</script>

<style>
.code {
  cursor: pointer;
}
</style>