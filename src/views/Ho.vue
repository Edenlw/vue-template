<template>
  <div>
    123
  </div>
</template>

<script>
export default {
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  components: {},
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
        console.log(newVal, oldVal, '---');
      },
      immediate: true
    }
  }
};
</script>

<style lang='scss' scoped>

</style>
