<template>
  <div>
    <ho :flag="flag"/>
  </div>
</template>
<script>
import Ho from './Ho';
export default {
  components: { Ho },
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    };
  },
  mounted() {

  },
  methods: {

  },
  watch: {
    flag: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
      },
      immediate: true
    }
  }
};
</script>

<style lang='scss' scoped>

</style>
