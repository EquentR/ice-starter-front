<template>
  <div id="back">
    <div id="mask">
      <div class="dark-mode">
        <span style="color: white">{{ modeName }}&nbsp;</span>
        <el-switch
            v-model="is_dark"
            active-color="#0079d2"
            inactive-color="#f3c373">
        </el-switch>
      </div>
      <!--  登录图标  -->
      <div class="login" @click="loginOut">
        <i class="el-icon-user-solid login-icon"></i>
        <span class="login-text">&nbsp;{{ userInfo ? userInfo.userName : '登录' }}</span>
      </div>

    </div>

<!--    下拉菜单   -->
    <el-dropdown
        trigger="click" class="dropdown"
        @command="handleCommand">
      <span class="el-dropdown-link">
        <i class="el-icon-more el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">更换壁纸</el-dropdown-item>
<!--        <el-dropdown-item command="b">登录</el-dropdown-item>-->
<!--        <el-dropdown-item disabled>双皮奶</el-dropdown-item>-->
<!--        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>-->
      </el-dropdown-menu>
    </el-dropdown>


    <footer id="footer-beian">
      ©&nbsp;2022&nbsp;&nbsp;冰清起始页 |
      <a href="https://beian.miit.gov.cn/" target="_blank">
        粤ICP备2022066970号-1
      </a>
    </footer>

<!--    以下为弹出框内容   -->
    <el-dialog
        title="更换壁纸"
        :visible.sync="changeBackgroundVisible"
        width="30%"
        class="changeBackground"
        :append-to-body="true"
        :close-on-click-modal="false">
      <span style="font-size: 12px">&nbsp;图片分辨率和文件大小请勿过大</span><br/>
      <span style="font-size: 12px">&nbsp;登录用户支持10MB大小，非登录用户仅支持4.5MB</span><br/>
      <img
          src="../assets/upload.png"
          style="width: 60%;cursor: pointer; border-radius: 10px"
          @click="changeBackground"
          alt="背景图"
          id="background" >
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearBack">恢复默认</el-button>
        <el-button type="primary" @click="confirmChangeBack" :disabled="!isBackgroundChange">确 定</el-button>
      </span>
    </el-dialog>
<!-- 图片上传 -->
    <input
        type="file"
        ref="file"
        @change="uploadFile"
        style="display: none;"
        id="file" accept="image/*"></input>
  </div>
</template>

<script>
import login from "@/components/login";
import userApi from "@/api/userApi";
import ossApi from "@/api/ossApi";
import userSettingApi from "@/api/userSettingApi";


export default {
  name: "background",
  data() {
    return {
      is_dark: true,
      modeName: '夜间模式',
      firstIn: true,
      theme: this.$store.state.theme,
      changeBackgroundVisible: false,
      imgBase64: '',
      isBackgroundChange: false,
      userInfo: null,
      isLogin: false,
      userSetting: {
        darkMode: this.is_dark,
        background: this.imgBase64
      }
    }
  },
  methods: {
    handleCommand(e) {
      if (e === 'a') {
        this.changeBackgroundVisible = true
      } else if (e === 'b') {
        this.$router.push({
          name: 'login'
        })
      }
    },
    changeBackground() {
      this.$refs.file.click()
    },
    uploadFile(){
      const loading = this.$loading({
        lock: true,
        text: '上传中...请稍等',
        spinner: 'el-icon-loading',
        background: 'rgba(0,0,0,0.6)',
      });
      var file = document.querySelector('input[type=file]').files[0]
      if (this.isLogin) {
        let formData = new FormData()
        formData.append("file", file);
        ossApi.uploadImage(formData).then(
          response => {
            loading.close()
            this.imgBase64 = response.data.data.url;
            document.getElementById("background").src = this.imgBase64
            this.isBackgroundChange = true;
          }
        ).catch(
          error => {
            loading.close()
            this.$notify({
              title: '错误',
              message: '图片大于10M或者服务器错误，请检查文件大小',
              type: 'error',
              duration: 2000,
              position: 'top-right'
            });
          }
        )
      } else {
        loading.close()
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.imgBase64 = reader.result
          if (this.imgBase64.length >= 5240000) {
            this.$notify({
              title: '错误',
              message: '图片过大！',
              type: 'error',
              duration: 2000,
              position: 'top-right'
            });
            return
          }
          document.getElementById("background").src = this.imgBase64
          this.isBackgroundChange = true;
        }
        reader.onerror = function(error) {
          console.log("Error: ", error);
        };
      }
    },
    confirmChangeBack() {
      document.body.style.transition = 'background-image 2s'
      document.body.style.transitionTimingFunction = 'ease-in-out'
      if (this.isBackgroundChange) {
        document.body.style.background =
            `url("${this.imgBase64}") no-repeat center`;
        document.body.style.backgroundSize =
            `cover`;
        document.body.style.backgroundAttachment = 'fixed';
        localStorage.setItem("background",this.imgBase64.toString())
        this.isBackgroundChange = false
        //this.imgBase64 = ''
        let jwt = localStorage.getItem("jwt")
        this.userSetting= {
          darkMode: this.is_dark ? 1 : 0,
          background: this.imgBase64,
        }
        userSettingApi.update(this.userSetting, jwt)
      }
      this.changeBackgroundVisible = false;
    },
    clearBack() {
      document.body.style.transition = 'background-image 2s'
      document.body.style.transitionTimingFunction = 'ease-in-out'
      localStorage.removeItem("background")
      document.body.style.background =
          `url("${this.theme.pictureUrl}") no-repeat center`;
      document.body.style.backgroundSize = `cover`;
      document.body.style.backgroundAttachment = 'fixed';
    },
    loginOut() {
      if (this.isLogin) {
        this.logout()
      } else {
        this.login()
      }
    },
    login() {
      setTimeout(() => {
        this.$router.push({name: 'login'})
      },200);
    },
    logout() {
      this.$confirm('您要退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        let jwt = localStorage.getItem("jwt");
        userApi.logout(jwt).then(
          response => {
            localStorage.removeItem("jwt");
            this.$notify({
              title: '成功',
              message: `已退出登录`,
              type: 'success',
              duration: 2000,
              position: 'top-right'
            });
            //强制刷新
            window.location.reload();
          }
        ).catch(
          error => {
            this.$notify({
              title: '错误',
              message: `${error.response.data.data}`,
              type: 'error',
              duration: 2000,
              position: 'top-right'
            });
          }
        )
      }).catch(() => {

      });
    }
  },
  watch: {
    is_dark() {
      if (this.is_dark === false) {
        this.theme.is_dark = false
        this.modeName = '日间模式'
        document.getElementById("mask").style.background = "rgba(250,250,250,0.15)"
        localStorage.setItem("dark","false")
      }else{
        this.theme.is_dark = true
        this.modeName = '夜间模式'
        document.getElementById("mask").style.background = "rgba(0,0,0,0.2)"
        localStorage.setItem("dark","true")
        if (this.firstIn) {
          this.firstIn = false;
        } else {
          this.$notify({
            title: '提示',
            message: '夜间模式尚未开发完全，后期可能舍弃',
            type: 'success',
            duration: 5000,
            position: 'bottom-right'
          });
        }
      }
      userSettingApi.update({
        darkMode: this.is_dark ? 1 : 0
      }, localStorage.getItem("jwt"))
    }
  },
  async mounted() {

    //登录状态校验
    let jwt = localStorage.getItem("jwt");
    if (jwt !== null && jwt !== '') {
      await userApi.verify(jwt).then(
        async response => {
          this.userInfo = response.data.data
          this.isLogin = true
          await userSettingApi.get(jwt).then(
            response => {
              let dark = response.data.data.darkMode === 1;
              let image = response.data.data.background;
              localStorage.setItem("background", image);
              localStorage.setItem("dark", dark);
              this.is_dark = dark === true;
            }
          )
        }
      ).catch(
        error => {
          localStorage.removeItem("jwt");
          this.$notify({
            title: '错误',
            message: `${error.response.data.data}`,
            type: 'error',
            duration: 5000,
            position: 'top-right'
          });
        }
      )
    }
    let back = localStorage.getItem("background");
    if (back !== null) {
      document.body.style.background =
          `url("${back}") no-repeat center`;
    } else {
      document.body.style.background =
          `url("${this.theme.pictureUrl}") no-repeat center`;
    }
    document.body.style.backgroundSize =
        `cover`;
    document.body.style.backgroundAttachment = 'fixed';
    let dark = localStorage.getItem("dark");
    this.is_dark = dark === 'true';
  },
  destroyed() {
    document.body.style.background = '#282f38'
  }
}
</script>

<style scoped>
#back {
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position:fixed;
  overflow: hidden;
}
#mask {
  background: rgba(0,0,0,0.2);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.3s;
  transition-timing-function: ease-in-out;
  z-index: 1;
}
.dark-mode {
  position: absolute;
  left: 20px;
  bottom: 30px;
}

footer{
  position:absolute;
  bottom: 0;
  width: 100vw;
  height: 100px;
  text-align: center;
  color: white;
  font-size: 12px;
  margin-bottom: -75px;
}
footer a {
  color: white;
}
@media screen and (max-height: 600px) {
  footer{
    visibility: hidden;
  }
}
.dropdown {
  float: right;
  margin-top: 1em;
  margin-right: 1.5em;
  z-index: 9999;
}

.login {
  float: right;
  margin-right: 6em;
  margin-top: 1.5em;
  z-index: 8888;
  cursor: pointer;
  color: white;
}
.login-icon {
  font-size: 20px;
  float: left;
}
.login-text {
  font-size: 15px;
  float: left;
}
</style>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #ffffff;
  text-shadow: 0px 0px 5px #0000001A;;
}
.el-dropdown {
  font-size: 20px !important;
}
.el-icon-arrow-down {
  font-size: 20px;
}
.el-dialog {
  transition: 0.3s;
  transition-timing-function: ease-in-out;
}
@media screen and (max-width: 900px) {
  .el-dialog{
    width: 50% !important;
  }
}
@media screen and (max-width: 750px) {
  .el-dialog{
    width: 60% !important;
  }
}
@media screen and (max-width: 600px) {
  .el-dialog{
    width: 80% !important;
  }
}
/*设置图标颜色*/
.el-loading-spinner i{
  color: #ffffff !important;
  font-size: 50px;
}
/*设置文字颜色*/
.el-loading-spinner .el-loading-text{
  color: #ffffff !important;
  font-size: 25px !important;
}

</style>
