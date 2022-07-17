<template>
  <div class="forget-box">
    <p class="title">忘记密码&nbsp;ice-starter</p>
    <input class="user-input" type="email" placeholder="要重置密码的邮箱" v-model="email" name="username" autocomplete="off"></input>
    <span>
      <input class="code-input" id="u" type="text" placeholder="邮箱验证码" v-model="code" autocomplete="off">
    </span>
    <span>
      <button @click="getEmailCode" class="get-code" ref="codeButton" :disabled="isDisabled">{{buttonName}}</button>
    </span>
    <input class="user-input" type="password" placeholder="新密码" v-model="pwd" name="password" autocomplete="off">
    <input class="user-input" type="password" placeholder="确认密码" v-model="confPwd" autocomplete="off">

    <div class="forget-pass">
      <router-link to="/changePass" class="back-to-home">还记得旧密码？</router-link>
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
  name: "forget-pass",
  data() {
    return {
      CountDown: 60,
      buttonName: '发送验证码',
      email: '',
      pwd: '',
      confPwd: '',
      code: '',
      isDisabled: false,
      timer: null,
    }
  },
  methods: {
    getEmailCode() {
      //邮箱正则
      let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
      if (reg.test(this.email)) {
        this.isDisabled = true;
        let timerId = setInterval(() => {
          this.CountDown--;
          this.buttonName = this.CountDown + "秒后重试";
          if (this.CountDown <= 0) {
            clearInterval(timerId);
            this.buttonName = "重新发送";
            this.CountDown = 60;
            this.isDisabled = false;
          }
        }, 1000);
        //发送验证码
        userApi.sendCodeIgnoreRegist(this.email)
            .then(
                response => {
                  this.$notify({
                    title: '成功',
                    message: `验证码已发送至${this.email}`,
                    type: 'success',
                    duration: 5000,
                    position: 'top-right'
                  });
                  this.codeMD5 = response.data.data
                }
            ).catch(
            error => {
              console.log(error)
              this.$notify({
                title: '错误',
                message: `验证码发送失败，错误原因：${error.response.data.message}`,
                type: 'error',
                duration: 5000,
                position: 'top-right'
              });
              clearInterval(timerId);
              this.buttonName = "重新发送";
              this.CountDown = 60;
              this.isDisabled = false;
            }
        )
      } else {
        this.$notify({
          title: '错误',
          message: `邮箱不合法！`,
          type: 'error',
          duration: 5000,
          position: 'top-right'
        });
      }
    },
    changePass() {
      if (this.email !== '' &&
          this.pwd !== '' &&
          this.confPwd !== '' &&
          this.code !== '') {
        let userInfo = {
          email: this.email,
          password: this.pwd,
          rePassword: this.confPwd,
          code: this.code
        }
        userApi.modifyPasswordByCode(userInfo).then(
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
              message: `${error.response.data.data}，请稍后重试`,
              type: 'error',
              duration: 5000,
              position: 'top-right'
            });
          }
        )
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
  },
  created() {
    //从sessionStorage中读取倒计时相关信息
    if (sessionStorage.getItem("CountDownInfo")) {
      this.CountDown = JSON.parse(
          sessionStorage.getItem("CountDownInfo")
      ).CountDown;
      this.isDisabled = JSON.parse(
          sessionStorage.getItem("CountDownInfo")
      ).isDisabled;
    }
    //进入该页面时，若倒计时还在进行，则继续跑倒计时
    if (this.isDisabled) {
      let timerId = setInterval(() => {
        this.CountDown--;
        this.buttonName = this.CountDown + "秒后重试";
        if (this.CountDown <= 0) {
          clearInterval(timerId);
          this.buttonName = "重新发送";
          this.CountDown = 60;
          this.isDisabled = false;
        }
      }, 1000);
    }
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem(
          "CountDownInfo",
          JSON.stringify({
            CountDown: this.CountDown,
            isDisabled: this.isDisabled,
          })
      );
    });
  },
  beforeRouteLeave(to, from, next) {
    /*
      to:router 即将要进入的路由对象
      from:router  当前导航正要离开的路由
      next()进行管道中的下一个钩子
      最后要确保调用next方法，否则钩子不会被resolved
    */
    sessionStorage.setItem(
        "CountDownInfo",
        JSON.stringify({
          CountDown: this.CountDown,
          isDisabled: this.isDisabled,
        })
    );
    next();
  },
}
</script>

<style scoped>
.forget-box {
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
.code-input {
  margin-top: 20px;
  /*margin-right: 15px;*/
  width: 220px;
  height: 35px;
  float: left;
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

.get-code{
  margin-top: 20px;
  width: 140px;
  height: 42px;
  float: right;
  /*margin-right: 20px;*/
  background: #45c7a7 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 3px #00000029;
  border-radius: 10px;
  opacity: 1;
  font: normal normal normal 15px Source Han Sans SC;
  letter-spacing: 0px;
  color: #FFFFFF;
  border: 0px;
  outline-style: none;
  transition-duration: 0.2s;
}
.get-code:hover{
  background: #78d9c1 0% 0% no-repeat padding-box;
}
.get-code:active{
  background: #86c4b3 0% 0% no-repeat padding-box;
}
.get-code:disabled {
  background: #95a6ad 0% 0% no-repeat padding-box;
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
