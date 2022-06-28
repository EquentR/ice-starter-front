<template>
  <div class="login-box">
    <p class="title">登录&nbsp;ice-starter</p>
    <input class="user-input" type="text" placeholder="邮箱" v-model="user" name="username" autocomplete="off">
    <input class="user-input" type="password" placeholder="密码" v-model="pwd" name="password" autocomplete="off">
    <button @click="login" class="submit">登录</button>
    <button @click="regist" class="register">去注册</button><br>

    <div class="back-to-home">
      <router-link to="/" class="back-to-home">返回首页</router-link>
    </div>
    <footer class="footer-beian">
      ©&nbsp;2022&nbsp;&nbsp;冰清起始页 |
      <a href="https://beian.miit.gov.cn/" target="_blank">
        粤ICP备2022066970号-1
      </a>
    </footer>
  </div>
</template>

<script>
import userApi from "@/api/userApi";
export default {
  name: "login",
  data(){
    return{
      user: '',
      pwd: '',
      token: '',
    }
  },
  methods: {
    login() {
      if (this.user !== '' && this.pwd !== '') {
        userApi.login(this.user, this.pwd)
          .then(
            response => {
              if (response.data.code === 400) {
                this.$notify({
                  title: '提示',
                  message: `${response.data.data}`,
                  type: 'error',
                  duration: 5000,
                  position: 'top-right'
                });
              } else {
                this.token = response.headers.token
                localStorage.setItem("jwt", this.token)
                this.$notify({
                  title: '提示',
                  message: '登录成功',
                  type: 'success',
                  duration: 5000,
                  position: 'top-right'
                });
                setTimeout(() => {
                  this.$router.push({name: 'naviMain'})
                }, 1000)
              }
            }
          ).catch(
          error => {
            this.$notify({
              title: '提示',
              message: `${error.response.data.data}`,
              type: 'error',
              duration: 5000,
              position: 'top-right'
            });
          }
        )
      } else {
        this.$notify({
          title: '提示',
          message: `请输入邮箱和密码`,
          type: 'error',
          duration: 5000,
          position: 'top-right'
        });
      }

    },
    regist() {
      this.$router.push({
        name: 'register'
      })
    }
  }
}
</script>

<style scoped>
.login-box {
  width: 375px;
  height: 600px;
  margin: auto;
  opacity: 0.8;
}
.title{
  margin-bottom: 10px;
  text-align: center;
  font: normal normal bold 35px Source Han Sans SC;
  letter-spacing: 0px;
  color: #ccf4ff;
  opacity: 1;
}
.user-input{
  margin-top: 20px;
  width: 375px;
  height: 35px;
  background: #eaeaea;
  text-align: center;
  box-shadow: 0px 0px 3px #00000029;
  border-radius: 10px;
  border: 0px;
  outline-style: none;
  opacity: 1;
  font-size: 20px;
  color: #565656;
  padding: 3px 0 3px 0;
  margin-right: 5px;
  transition-duration: 0.2s;
}
.user-input:focus{
  border-color: #66afe9;
  outline: 0;
  /*-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(60, 171, 255, 0.6);*/
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(0, 145, 255)
}
.register{
  margin-top: 30px;
  width: 180px;
  height: 40px;
  float: right;
  background: #ff8746 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 3px #00000029;
  border-radius: 10px;
  opacity: 1;
  font: normal normal normal 20px Source Han Sans SC;
  letter-spacing: 0px;
  color: #FFFFFF;
  border: 0px;
  outline-style: none;
  transition-duration: 0.2s;
}
.register:hover{
  background: #ffac71 0% 0% no-repeat padding-box;
}
.register:active{
  background: #ad6133 0% 0% no-repeat padding-box;
}

.submit{
  margin-top: 30px;
  width: 180px;
  height: 40px;
  float: left;
  background: #6DE4FC 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 3px #00000029;
  border-radius: 10px;
  opacity: 1;
  font: normal normal normal 20px Source Han Sans SC;
  letter-spacing: 0px;
  color: #FFFFFF;
  border: 0px;
  outline-style: none;
  transition-duration: 0.2s;
}
.submit:hover{
  background: #9cebff 0% 0% no-repeat padding-box;
}
.submit:active{
  background: #67bfd6 0% 0% no-repeat padding-box;
}

.back-to-home {
  margin-top: 80px;
  text-align: center;
  color: white;
  text-decoration: none;
}
.footer-beian{
  position:absolute;
  bottom: 0;
  width: 375px;
  height: 100px;
  text-align: center;
  color: white;
  font-size: 12px;
  margin-bottom: -75px;
}
.footer-beian a {
  color: white;
}
@media screen and (max-height: 600px) {
  .footer-beian{
    visibility: hidden;
  }
}
</style>
