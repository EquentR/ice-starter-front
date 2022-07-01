<template>
  <div class="sites">
    <div class="favorite-site"
         v-for="(item, i) in favorites"
         @click="jumpTo(item.url)"
         @contextmenu.prevent="changeSite(i)">
      <div class="icon" :style="`background-color: ${item.color}`">
        {{ item.name.substring(0,1) }}
      </div>
      <span style="text-shadow: 0px 3px 10px rgba(0,0,0,0.34);">{{ item.name }}</span>
    </div>
    <div class="favorite-site" @click="changeSite(-1)" v-show="favorites.length < 12">
      <div class="icon" style="background-color: rgba(190,190,190,0.3)">
        +
      </div>
      <span style="text-shadow: 0px 3px 10px rgba(0,0,0,0.34);">添加</span>
    </div>
<!--  网址弹出框  -->
    <el-dialog title="编辑网址收藏"
               :visible.sync="newSiteVisible"
               class="text-dialog"
               width="30vw"
               :close-on-click-modal="false">
      <el-form :rules="rules">
        <el-form-item label="请输入网址" prop="url">
          <el-input
              placeholder="请输入网址内容"
              v-model="tempSite"
              clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="请输入名称">
          <el-input
              placeholder="请输入名称"
              v-model="tempName"
              clearable>
          </el-input>
        </el-form-item>
        <div style="height: 10px"></div>
        <el-form-item label="请选择图标颜色">
          <span>
            <el-color-picker
                v-model="tempColor"
                :predefine="defaultColor"
                size="medium"
                color-format="hex">
            </el-color-picker>
          </span><br/>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button type="danger" @click="deleteItem" :disabled="!canDelete">删除</el-button>
          <el-button type="primary" @click="submitChange">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "site-icon",
  data() {
    return {
      favorites: [
        {url: "https://www.bilibili.com", name: '哔哩哔哩', color: '#ff6cb2'},
        {url: "https://www.acfun.cn", name: 'AcFun', color: '#ff6d38'},
        {url: "https://www.baidu.com", name: '百度', color: '#0082ff'},
        {url: "https://map.baidu.com", name: '地图', color: '#00b677'},
        {url: "https://translate.google.cn/", name: '谷歌翻译', color: '#5290f5'},
        {url: "https://www.youdao.com", name: '有道翻译', color: '#f84a4a'},

      ],
      newSiteVisible: false,
      tempColor: "#528eec",
      tempSite: "",
      tempName: "",
      tempIndex: 0,
      canDelete: false,
      defaultColor: ["#ff6cb2","#0082ff","#00b677","#ff6d38"],
      //输入框规则
      rules: {
        url: {type: "url"}
      }
    }
  },
  methods: {
    jumpTo(url) {
      window.open(url);
    },
    addSite() {

    },
    changeSite(index) {
      if (index !== -1) {
        this.tempSite = this.favorites[index].url
        this.tempName = this.favorites[index].name
        this.tempColor = this.favorites[index].color
        this.tempIndex = index
        this.canDelete = true
      } else {
        this.tempIndex = -1
        this.tempSite = ''
        this.tempName = ''
        this.canDelete = false
      }
      this.newSiteVisible = true
    },
    deleteItem() {
      this.$confirm('您要删除这个项目吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.favorites.splice(this.tempIndex, 1)
        this.newSiteVisible = false;
        //TODO
      })
    },
    submitChange() {
      let urlRule = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
      let isValid = urlRule.test(this.tempSite)
      let isEmpty = this.tempName === '' || this.tempColor === '' || this.tempColor === null
      if (isValid && !isEmpty) {
        this.tempSite = this.tempSite.startsWith("http") ? this.tempSite : "https://" + this.tempSite
        if (this.tempIndex >= 0) {
          this.favorites[this.tempIndex].color = this.tempColor
          this.favorites[this.tempIndex].url = this.tempSite
          this.favorites[this.tempIndex].name = this.tempName
        } else {
          this.favorites.push({
            url: this.tempSite,
            name: this.tempName,
            color: this.tempColor
          })
        }
        this.newSiteVisible = false
      } else {
        if (!isValid) {
          this.$alert('网址似乎不合法呢！', '错误', {
            confirmButtonText: '确定',
            type: "error"
          });
        }
        if (isEmpty) {
          this.$alert('东西似乎没填写完呢！', '错误', {
            confirmButtonText: '确定',
            type: "error"
          });
        }
      }

    }
  },
  watch: {
    favorites: {
      handler() {
        localStorage.setItem("site", JSON.stringify(this.favorites))
      },
      deep: true
    }
  },
  created() {
    var item = localStorage.getItem("site");
    if (item !== 'null' && item !== null) {
      this.favorites = JSON.parse(item)
    }
  }
}
</script>

<style scoped>
.input-name {
  /*margin-top: 10px;*/
}

.icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin: 0px auto 6px;
  color: white;
  text-align: center;
  font-size: 20px;
  line-height: 50px;
  box-shadow: 0px 3px 10px #0000001A;
  transition: 0.1s;
  transition-timing-function: ease-in-out;
}
.icon:hover {
  width: 55px;
  height: 55px;
  font-size: 25px;
  line-height: 55px;
}
.favorite-site {
  width: 100px;
  height: 80px;
  border: 80px;
  margin-bottom: 1em;
  text-align: center;
  cursor: pointer;
  float: left;
  color: white;
  position: center;
}
.sites {
  width: 38em;
  height: 10em;
  margin: auto;
}
@media screen and (max-width: 600px) {
  .sites {
    width: 19em;
    height: 20em;
    margin: auto;
  }
}
.text-title{
  width: 35vw;
  height: 30px;
  font-size: 15px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  border: #9d9d9d solid 2px;
  color: #1f1f1f;
  margin-right: 10px;
}
.text-content{
  width: 500px;
  height: 400px;
  font-size: 18px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 8px;
  border: #9d9d9d solid 2px;
  resize:none;
  color: #1f1f1f;
}
.submit-text{
  margin-top: 16px;
  width: 500px;
  height: 50px;
  background: #8f82b5 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 3px #00000029;
  border-radius: 15px;
  opacity: 1;
  font: normal normal normal 18px Source Han Sans SC;
  letter-spacing: 0px;
  color: #FFFFFF;
  border: 0px;
  outline-style: none;
  transition-duration: 0.2s;
}
.submit-text:hover{
  background: #a89bcf 0% 0% no-repeat padding-box;
}
.submit-text:active{
  background: #7d6fa4 0% 0% no-repeat padding-box;
}
</style>

<style>
.el-dialog{
  border-radius: 10px !important;
  width: 40vw;
}
.el-dialog__body{
  padding-top: 20px !important;
  padding-bottom: 20px !important;
}
.el-color-picker--medium .el-color-picker__trigger {
  height: 50px !important;
  width: 50px !important;
}
.el-color-picker__icon {
  display: none !important;
}
.el-form-item {
  margin-bottom: 5px !important;
}
.el-form-item__content {
  line-height: 30px !important;
}
</style>
