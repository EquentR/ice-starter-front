<template>
  <div class="sites">
    <div class="favorite-site" v-for="item in favorites" @click="jumpTo(item.url)">
      <div class="icon" :style="`background-color: ${item.color}`">
        {{ item.name.substring(0,1) }}
      </div>
      <span style="text-shadow: 0px 3px 10px rgba(0,0,0,0.34);">{{ item.name }}</span>
    </div>
<!--    <div class="favorite-site" @click="newSiteVisible = true">
      <div class="icon" style="background-color: rgba(190,190,190,0.3)">
        +
      </div>
      <span style="text-shadow: 0px 3px 10px rgba(0,0,0,0.34);">添加</span>
    </div>
    <el-dialog title="新建网址收藏"
               :visible.sync="newSiteVisible"
               class="text-dialog"
               width="40vw"
               :close-on-click-modal="false">
      <span>请输入标题：</span>
      <input type="text" class="text-title" id="text-title" autocomplete="off"></input><br/>
      <span style="padding-top: 15px">请输入内容：</span>
      <input type="text" class="text-title" id="text-title" autocomplete="off"></input><br/>
      <button class="submit-text" @click="addSite">提交</button>
    </el-dialog>-->
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
    }
  },
  methods: {
    jumpTo(url) {
      window.open(url);
    },
    addSite() {

    }
  }
}
</script>

<style scoped>
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
</style>
