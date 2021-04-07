<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="w200">
      <Input class="pb-10" placeholder="请输入用户名" v-model="userName"/>
      <Input placeholder="请输入密码" type="password" v-model="userPassword"/>
    </div>
    <test-aaa></test-aaa>
    <Button @click="registerHandle">注册</Button>
    <Button @click="login">登录</Button>
    <Button @click="add">创建文章</Button>
    <hom :flag="flagBoolean"/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import Hom from './Hom';
import testAaa from 'npm-btn';
export default {
  name: 'Home',
  components: {

    // HelloWorld
    Hom,
    testAaa
  },
  data() {
    return {
      userName: '',
      userPassword: '',
      flagBoolean: true
    };
  },
  mounted() {
    console.log(testAaa, 9);
  },
  methods: {
    async registerHandle() {
      const data = {
        userName: this.userName,
        userPassword: this.userPassword
      };
      const res = await this.$api.register(data);
      if (res) {
        console.log(res);
      }
    },
    async login() {
      this.flagBoolean = !this.flagBoolean;
      const data = {
        userName: this.userName,
        userPassword: this.userPassword
      };
      const res = await this.$api.login(data);
      if (res) {
        console.log(res);
      }
    },
    async addArticle() {
      const data = {
        title: '文章',
        author: '作者',
        content: '内容',
        category: '金融'
      };
      const res = await this.$api.addArticle(data);
      if (res) {
        console.log(res);
      }
    },
    add() {
      this.addArticle();
    }
  }
};
</script>
<style lang="scss" scoped>
  .w200 {
    width: 200px;
    margin: auto;
    padding-bottom: 20px;
  }
  .pb-10 {
    padding-bottom: 10px;
  }
</style>
