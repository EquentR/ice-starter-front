<template>
  <div class="userSetting">
    <div class="avatar-username" v-if="isLogin">
      <br/>
      <el-upload
          class="avatar-uploader"
          action="#"
          ref="upload"
          :show-file-list="false"
          :http-request="uploadAvatar">
        <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div style="margin-top: 10px">头像</div>
      <input v-if="changeUsername" class="user-input" type="text" placeholder="用户名" v-model="userInfo.username" autocomplete="off">
      <h5 v-else class="username">用户名：{{ userInfo.username }}</h5>
      <el-checkbox v-model="changeUsername" @change="changeUserName">修改</el-checkbox><br/><br/>
      <router-link to="/deleteAccount" class="delete-account">注销（删除）账号</router-link><br/>
      <router-link to="/restoreAccount" class="delete-account">恢复注销的账号（7天内有效）</router-link><br/>
    </div>
    <div v-else class="avatar-username">
      <h5>您还未登录，此页面需要用户登录后才可使用</h5>
      <button @click="login" class="submit">登录</button><br/><br/>
      <router-link to="/restoreAccount" class="delete-account">恢复注销的账号（7天内有效）</router-link>
    </div>

<!--  裁切工具  -->
    <el-dialog
        title="裁切图片"
        width="440px"
        :visible.sync="cropperShow"
        :append-to-body="true"
        :close-on-click-modal="false">
      <div>
        <VueCropper
            ref="cropper"
            :img="optionImg"
            style = "width: 400px;height: 220px"
            :info="true"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"
            @realTime="realTime"
        ></VueCropper>
        <div class = "control">
          <el-upload action="#" :show-file-list="false" :before-upload="beforeUpload">
            <el-button size="small">
              重新选择
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-upload>
          <div>
            <el-button size="small" @click="changeScale(1)">放大</el-button>
          </div>
          <div>
            <el-button size="small" @click="changeScale(-1)">缩小</el-button>
          </div>
          <div>
            <el-button size="small" @click="rotateLeft()">左侧偏转</el-button>
          </div>
          <div>
            <el-button size="small" @click="rotateRight()">右侧偏转</el-button>
          </div>
        </div>
        <div class = "control">
          <el-button type="primary"  @click="submit()">提交</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>


import ossApi from "@/api/ossApi";
import userApi from "@/api/userApi";

export default {
  name: "user-setting",
  data() {
    return {
      avatarUrl: '',
      optionImg: '',
      cropperShow: false,
      oldUsername: '',
      option: {
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true // 固定截图框大小 不允许改变
      },
      changeUsername: false,
      isLogin: false,
      userInfo: {}
    }
  },
  methods: {
    login() {
      setTimeout(() => {
        this.$router.push({name: 'login'})
      },200);
    },
    uploadAvatar(data) {
      this.optionImg = URL.createObjectURL(data.file)
      this.cropperShow = true
      this.$refs.upload.clearFiles()
    },
    realTime(data) {
      console.log(data);
    },
    // 上传预处理
    beforeUpload(file) {
      if (file.type.indexOf("image/") === -1) {
        this.$notify({
          title: '错误',
          message: '图片格式错误',
          type: 'error',
          duration: 2000,
          position: 'top-right'
        });
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.optionImg = reader.result;
        };
      }
    },
    // 图片缩放
    changeScale(num) {
      num = num || 2;
      this.$refs.cropper.changeScale(num);
    },
    // 向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    // 向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    submit(){
      this.$refs.cropper.getCropBlob(data => {
        let file = new File([data], "avatar.png", {type: "image/", lastModified: Date.now()});
        let formData = new FormData()
        let jwt = localStorage.getItem("jwt")
        formData.append("file", file);
        ossApi.uploadAvatar(jwt, formData).then(
          res => {
            let url = res.data.data.url;
            let jwt = localStorage.getItem("jwt")
            let thatRes = res
            userApi.updateUserInfo(jwt, url, "").then(
              res => {
                this.$notify({
                  title: '成功',
                  message: '头像修改成功！',
                  type: 'success',
                  duration: 2000,
                  position: 'top-right'
                });
                this.cropperShow = false;
                this.avatarUrl = thatRes.data.data.url
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
          }
        )
      })
    },
    changeUserName() {
      if (this.changeUsername === false && this.oldUsername !== this.userInfo.username) {
        let jwt = localStorage.getItem("jwt")
        userApi.updateUserInfo(jwt, "", this.userInfo.username).then(
          res => {
            this.$bus.$emit('reGetName', this.userInfo.username)
            this.$notify({
              title: '成功',
              message: `用户名修改成功！`,
              type: 'success',
              duration: 2000,
              position: 'top-right'
            });
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
      } else {
        this.oldUsername = this.userInfo.username
      }
    }
  },
  created() {
    let jwt = localStorage.getItem("jwt")
    if (jwt === null) {
      this.isLogin = false
    } else {
      userApi.getUserInfo(jwt).then(
        res => {
          this.userInfo = res.data.data
          this.avatarUrl = res.data.data.avatar
          this.isLogin = true
        }
      ).catch(
        error => {
          this.isLogin = false
        }
      )
    }

  }
}
</script>

<style scoped>
.avatar-username {
  text-align: center;
}
.username{
  margin: auto;
  margin-top: 20px;
  width: 200px;
  height: 20px;
  font-size: 14px;
}
.user-input{
  margin-top: 20px;
  width: 200px;
  height: 20px;
  background: #ffffff;
  text-align: center;
  box-shadow: 0px 0px 3px rgba(79, 77, 77, 0.16);
  border-radius: 5px;
  border: 0px;
  outline-style: none;
  opacity: 1;
  font-size: 14px;
  color: #313131;
  padding: 3px 0 3px 0;
  margin-right: 5px;
  transition-duration: 0.2s;
}
.user-input:focus{
  border-color: #66afe9;
  outline: 0;
  /*-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(60, 171, 255, 0.6);*/
  box-shadow: inset 0 0px 1px rgba(0,0,0,.075),0 0 8px rgb(0, 145, 255)
}
.submit{
  margin-top: 10px;
  width: 180px;
  height: 40px;
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
.delete-account {
  text-decoration: none;
  color: #7d6fa4;
  font-size: 12px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 40px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px !important;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
.control{
  display: flex;
  margin-top:15px;
}
</style>
