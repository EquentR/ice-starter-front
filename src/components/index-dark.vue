<template>
  <div>
    <div class="main">
      <br/><br/><br/>
      <h1 style="color: white;text-shadow: 0px 3px 10px #0000001A;font-size: 2.5em">{{nowTime}}</h1>
      <h3 style="color: white;text-shadow: 0px 3px 10px #0000001A;">冰清起始页正在建设中...</h3>
      <el-autocomplete
          placeholder="请输入搜索内容2..."
          class="searchClass"
          id="searchBox"
          v-model="keyWord"
          size="medium"
          :debounce="0"
          :fetch-suggestions="querySearch"
          @select="handleSelect"
          :trigger-on-focus="false"
          :popper-append-to-body="true"
          @keyup.enter.native="search">
        <div slot="prepend">
          <div class="centerClass">
            <el-select v-model="engine" placeholder="请选择" style="width: 100px" default-first-option>
              <el-option label="百度" value="1"></el-option>
            </el-select>
          </div>
        </div>
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        <template slot-scope="item">
          <div class="name">{{ item.item }}</div>
        </template>
      </el-autocomplete>
      <br/><br/><br/>

    </div>
  </div>
</template>

<script>

import SiteIcon from "@/components/site-icon";
export default {
  name: "index-dark",
  components: {SiteIcon},
  data() {
    return {
      keyWord: '',
      engine: '百度',
      suggest: [],
      nowTime: ''
    }
  },
  methods: {
    search() {
      let url = `https://www.baidu.com/s?wd=${this.keyWord}&ie=UTF-8`
      window.open(url);
    },
    querySearch(queryString, cb) {
      let url = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${queryString}&json=1`;
      const jsonp = require('jsonp');
      window.baidu = {
        sug: json => {
          console.log(json)
          this.suggest = json.s;
          cb(this.suggest)
        }
      }
      jsonp(url,null,null);
      console.log(this.suggest)

    },
    handleSelect(item) {
      console.log(item);
      this.keyWord = item;
      this.search();
    },
    setTime() {
      let myDate = new Date();
      let hou = String(
          myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours()
      );
      let min = String(
          myDate.getMinutes() < 10
              ? "0" + myDate.getMinutes()
              : myDate.getMinutes()
      );
      // let sec = String(
      //     myDate.getSeconds() < 10
      //         ? "0" + myDate.getSeconds()
      //         : myDate.getSeconds()
      // );
      this.nowTime = hou + ":" + min;
    }
  },
  filters: {

  },
  watch: {
    keyWord() {
      if (this.keyWord === '') {
        this.suggest = []
      }
    },
    is_dark() {
      if (this.is_dark) {

      }
    }
  },
  computed: {
    is_dark() {
      return this.$store.state.theme.is_dark;
    }
  },
  mounted() {
    this.setTime();
    this.timer = setInterval(() => {
      this.setTime();
    }, 2000);
  }
}
</script>

<style scoped>


.searchBox {
  height: 30px;
  width: 40%;
  font-size: 20px;
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;
}
.searchButton {
  height: 35px;
  width: 10%;
  border-radius: 10px;
}
a{
  text-decoration:none;
}
.main{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}
</style>

<style>
.input-with-select .el-input-group__prepend {
  background-color: #000000;
}
/* 搜索框样式 */
.searchClass{
  /*border: 1px solid #c5c5c5;*/
  border-radius: 20px;
  background: #1a1a1a;
  width: 45vw !important;
  opacity: 0.8;
  box-shadow: 0px 3px 10px #0000001A;
  transition: 0.2s;
  transition-timing-function: ease-in-out;

}
/*当屏幕宽度小于960px生效*/
@media screen and (max-width: 960px) {
  .searchClass{
    width: 90vw !important;
  }
}
/*当屏幕宽度大于1700px生效*/
@media screen and (min-width: 1700px) {
  .searchClass{
    width: 35vw !important;
  }
}

.searchClass .el-input-group__prepend {
  border: none;
  background-color: transparent;
  padding: 0 10px 0 30px;
}
.searchClass .el-input-group__append {
  border: none;
  background-color: transparent;
}
.searchClass .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: none;
  background-color: transparent;
  color: white;
}
.searchClass .el-icon-search{
  font-size: 16px;
}
.searchClass .centerClass {
  height: 100%;
  line-height: 100%;
  display: inline-block;
  vertical-align: middle;
  text-align: right;
}
.searchClass .line {
  width: 1px;
  height: 30px;
  background-color: #3f3f3f;
  margin-left: 14px;
}
.searchClass:hover{
  /*border: 1px solid #D5E3E8;*/
  background: #2a2a2a;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.13);
  transition: 0.2s;
  transition-timing-function: ease-in-out;
}
.searchClass:hover .line {
  background-color: #333738;
}
.searchClass:hover .el-icon-search{
  color: #00b5b2;
  font-size: 16px;
}
.el-popper[x-placement^=bottom]{
  opacity: 0.9;
  background-color: #1a1a1a;
}
.el-autocomplete-suggestion__wrap{
  max-height: 380px !important;
  text-align: left;
  background-color: #1a1a1a;
}
.el-autocomplete-suggestion {
  border-radius: 8px !important;
  background-color: #1a1a1a;
  border: none !important;
  border-radius: 8px !important;;
}
.el-select-dropdown {
  opacity: 0.9;
  border-radius: 8px !important;
  border: none !important;
  background-color: #1a1a1a;
}
.popper__arrow {
  color: #1a1a1a;
  visibility: hidden;
}
.el-scrollbar__view el-select-dropdown__list{
  color: white;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background-color: #333333 !important;
}
.el-popper[x-placement^=bottom] .popper__arrow::after{
  border-bottom-color: #1a1a1a !important;
}
</style>
