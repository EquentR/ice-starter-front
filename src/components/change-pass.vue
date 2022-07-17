<template>
  <div class="change-pass-box">
    <p class="title">修改密码&nbsp;ice-starter</p>
    <input class="user-input" type="email" placeholder="要修改密码的邮箱" v-model="email" name="username" autocomplete="off"></input>
    <input class="user-input" type="password" placeholder="旧密码" v-model="oldPwd" autocomplete="off">
    <input class="user-input" type="password" placeholder="新密码" v-model="pwd" name="password" autocomplete="off">
    <input class="user-input" type="password" placeholder="确认新密码" v-model="confPwd" autocomplete="off">
    <div class="forget-pass">
      <router-link to="/forgetPass" class="back-to-home">忘记密码？</router-link>
    </div>
    <button @click="changePass" class="change-pass">修改密码</button><br>

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
  name: "change-pass",
  data() {
    return {
      email: '',
      oldPwd: '',
      pwd: '',
      confPwd: '',
    }
  },
  methods: {
    changePass() {
      if (this.email !== '' &&
          this.pwd !== '' &&
          this.confPwd !== '' &&
          this.oldPwd !== '') {
        if (this.pwd === this.confPwd) {
          let userInfo = {
            email: this.email,
            oldPassword: this.oldPwd,
            newPassword: this.pwd,
          }
          userApi.modifyPasswordByOld(userInfo).then(
              res => {
                this.$notify({
                  title: '成功',
                  message: `密码修改成功！`,
                  type: 'success',
                  duration: 5000,
                  position: 'top-right'
                });
                setTimeout(() => {
                  this.$router.push({name: 'naviMain'})
                }, 1000);
              }
          ).catch(
              error => {
                this.$notify({
                  title: '失败',
                  message: `${error.response.data.data}，请重试`,
                  type: 'error',
                  duration: 5000,
                  position: 'top-right'
                });
              }
          )
        } else {
          this.$notify({
            title: '错误',
            message: `两次新密码不一致！`,
            type: 'error',
            duration: 5000,
            position: 'top-right'
          });
        }
      } else {
        this.$notify({
          title: '错误',
          message: `请补充完整信息！`,
          type: 'error',
          duration: 5000,
          position: 'top-right'
        });
      }
    }
  }
}
</script>

<style scoped>
.change-pass-box {
  width: 375px;
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
  /*margin-right: 15px;*/
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
.user-input:focus , .code-input:focus{
  border-color: #66afe9;
  outline: 0;
  /*-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(60, 171, 255, 0.6);*/
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(0, 145, 255)
}
.change-pass{
  margin-top: 10px;
  width: 375px;
  height: 40px;
  /*float: right;*/
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
.change-pass:hover{
  background: #ffac71 0% 0% no-repeat padding-box;
}
.change-pass:active{
  background: #ad6133 0% 0% no-repeat padding-box;
}
.back-to-home {
  margin-top: 30px;
  text-align: center;
  color: white;
  text-decoration: none;
}
.forget-pass {
  margin-top: 10px;
  text-align: right;
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
