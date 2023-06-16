<template>
  <div class="text-center">
    <form class="form-login" method="get" @submit.prevent="login">
      <img alt="" class="mb-4" height="72" src="../assets/LogIn.png" width="72">
      <h1 class="h3 mb-3 font-weight-normal">请登录</h1>
      <label class="sr-only" for="UserName">UserName</label>
      <input id="UserName" v-model="userName" autofocus class="form-control" name="UserName"
             placeholder="用户名：默认为admin" required type="text">
      <label class="sr-only" for="PassWord">PassWord</label>
      <input id="Password" v-model="passWord" class="form-control" name="PassWord" placeholder="密码：默认为admin"
             required type="password">
      <div class="checkbox mb-3">
        <label>
          <input v-model="rememberMe" name="checkbox" type="checkbox"> 记住我
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
      <p class="mt-5 mb-3 text-muted">&copy; 图书管理</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from 'js-cookie';

export default {
  created() {
    //此处请求cookie 自动填写表单
    const savedUserName = Cookies.get('username');
    const savedPassWord = Cookies.get('password');
    if (savedUserName && savedPassWord) {
      this.userName = savedUserName;
      this.passWord = savedPassWord;
      this.rememberMe = true;
    }
  },
  data() {
    return {
      userName: '',
      passWord: '',
      rememberMe: false,
    };
  },
  methods: {
    login() {
      axios.get('/api/LogIn', {
        params: {
          userName: this.userName,
          passWord: this.passWord
        }
      }).then(response => {
        // Handle successful login
        if (response.data.code === 200 && response.data.status === 1) {
          if (this.rememberMe) {
            Cookies.set('username', this.userName, {expires: 1}); // 设置用户名 cookie，有效期为 1 天
            Cookies.set('password', this.passWord, {expires: 1}); // 设置密码 cookie，有效期为 1 天
          }
          sessionStorage.setItem('status', "1"); // 使用 sessionStorage 保存用户信息
          this.$router.push('/MainView')
        } else {
          alert("登陆失败！")
        }
      }).catch(error => {
        // Handle login error
        console.error('登录请求出错', error)
      });
    }
  }
};

</script>

<style scoped>

html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: white;
}

.form-login {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-login .checkbox {
  font-weight: 400;
}

.form-login .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-login .form-control:focus {
  z-index: 2;
}

.form-login input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-login input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.text-center {
  padding-top: 10%;
}
</style>
