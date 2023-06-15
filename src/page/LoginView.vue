<template>
  <div class="text-center">
    <form class="form-login" @submit.prevent="login" method="get">
      <img class="mb-4" src="../assets/LogIn.png" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">请登录</h1>
      <label for="UserName" class="sr-only">UserName</label>
      <input v-model="userName" type="text" id="UserName" name="UserName" class="form-control" placeholder="用户名：默认为admin" required autofocus>
      <label for="PassWord" class="sr-only">PassWord</label>
      <input v-model="passWord" type="password" id="Password" name="PassWord" class="form-control" placeholder="密码：默认为admin" required>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" name="checkbox" v-model="rememberMe"> 记住我
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
      <p class="mt-5 mb-3 text-muted">&copy; 图书管理系统</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userName: '',
      passWord: '',
      rememberMe: false
    };
  },
  methods: {
    login() {
      axios.get('/api/LogIn', {
        params: {
          userName: this.userName,
          passWord: this.passWord
        }
      })
      .then(response => {
        // Handle successful login
        if(response.data.code === 200 && response.data.status===1){
          console.log('登陆成功')
          console.log(response)
          this.$router.push('/Main')
        }else{
          console.log('登陆失败')
          console.log(response)
          alert("登陆失败！")
        }
      })
      .catch(error => {
        // Handle login error
        console.error('登录请求出错',error)
      });

    }
  }
};
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css';

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

.text-center{
  padding-top: 10%;
}
</style>
