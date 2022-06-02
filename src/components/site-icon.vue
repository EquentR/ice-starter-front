<template>
  <div class="sites">
    <div class="favorite-site" v-for="item in favorites" @click="jumpTo(item.url)">
      <div class="icon" :style="`background-color: ${item.color}`">
        {{ item.name.substring(0,1) }}
      </div>
      <span style="text-shadow: 0px 3px 10px rgba(0,0,0,0.34);">{{ item.name }}</span>
    </div>
<!--    <div class="favorite-site">
      <div class="icon" style="background-color: rgba(190,190,190,0.3)">
        +
      </div>
      <span style="text-shadow: 0px 3px 10px rgba(0,0,0,0.34);">添加</span>
    </div>-->
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
      ]
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

</style>
