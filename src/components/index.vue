<template>
  <div>
    <div class="naviMain">
      <h1 style="color: white;text-shadow: 0px 3px 10px #0000001A;font-size: 3em;cursor: default">{{ nowTime }}</h1>
      <h3 style="color: white;text-shadow: 0px 3px 10px #0000001A;cursor: default"><!--冰清起始页正在建设中...--></h3>
      <el-autocomplete
          placeholder="请输入搜索内容..."
          class="searchClass"
          id="searchBox"
          v-model="keyWord"
          size="medium"
          :debounce="0"
          :fetch-suggestions="querySearch"
          @select="handleSelect"
          :trigger-on-focus="false"
          :popper-append-to-body="true"
          @keyup.enter.native="search"
          clearable>
        <div slot="prepend">
          <div class="centerClass">
            <el-select v-model="engine" placeholder="请选择" style="width: 100px" default-first-option>
              <el-option v-for="(item, i) in engines.props" :label="item.name" :value="i+1" :key="i"></el-option>
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
import userSettingApi from "@/api/userSettingApi";
import engineApi from "@/api/engineApi";
export default {
  name: "index",
  components: {SiteIcon},
  data() {
    return {
      keyWord: '',
      engine: 1,
      suggest: [],
      is_dark: true,
      nowTime: '',
      engines: {props:[]}
    }
  },
  methods: {
    search() {
      for (let i = 0; i < this.engines.props.length; i++) {
        if (this.engine === i+1) {
          let url = `${this.engines.props[i].target}${this.keyWord}`
          window.open(url);
        }
      }
    },
    querySearch(queryString, cb) {
      let url = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${queryString}&json=1`;
      const jsonp = require('jsonp');
      window.baidu = {
        sug: json => {
          this.suggest = json.s;
          cb(this.suggest)
        }
      }
      jsonp(url,null,null);

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
      if (this.nowTime !== hou + " : " + min) {
        this.nowTime = hou + " : " + min;
      }
    },
    //重新获取引擎
    reSetEngines(engines) {
      this.engines = engines
    }
  },
  computed: {
    enginesCopy() {
      return JSON.stringify(this.engines);
    }
  },
  watch: {
    keyWord() {
      if (this.keyWord === '') {
        this.suggest = []
      }
    },
    engine() {
      localStorage.setItem("engine",this.engine)
      let login = localStorage.getItem("login")
      if (login === "1") {
        userSettingApi.update({
          searchEngine: this.engine
        }, localStorage.getItem("jwt"))
      }
    },
    enginesCopy: {
      deep: true,
      handler(newEngine, oldEngine) {
        localStorage.setItem("engineSetting", JSON.stringify(this.engines))
        let login = localStorage.getItem("login")
        if (login === "1") {
          console.log(newEngine)
          console.log(oldEngine)
          if (newEngine !== oldEngine && oldEngine !== "{\"props\":[]}") {
            engineApi.update(localStorage.getItem("jwt"), this.engines.props)
          }
        }
      }
    }
  },
  async mounted() {
    this.$bus.$on('reSetEngines', this.reSetEngines)
    this.setTime();
    this.timer = setInterval(() => {
      this.setTime();
    }, 1000);
    let jwt = localStorage.getItem("jwt")
    let isLogin = localStorage.getItem("login");
    if (isLogin === "1") {
      await userSettingApi.get(jwt).then(
        response => {
          let engine = response.data.data.searchEngine
          if (engine !== null) {
            localStorage.setItem("engine", engine)
          }
        }
      )
    }
    let defaultEngines = {
      props: [
        {name: '百度', target: 'https://www.baidu.com/s?ie=UTF-8&wd=', sort: 0},
        {name: '必应', target: 'https://cn.bing.com/search?q=', sort: 1},
        {name: '360搜索', target: 'https://www.so.com/s?q=', sort: 2}
      ]
    }
    //搜索引擎偏好设定
    if (isLogin === "1") {
      await engineApi.get(jwt).then(
        res => {
          let engines = res.data.data
          localStorage.setItem("engineSetting", JSON.stringify(engines))
        }
      ).catch(
        error => {
          localStorage.setItem("engineSetting", JSON.stringify(defaultEngines))
        }
      )
    }
    let engineSetting = localStorage.getItem("engineSetting")
    if (engineSetting === null) {
      this.engines = {
        props: [
          {name: '百度', target: 'https://www.baidu.com/s?ie=UTF-8&wd=', sort: 0},
          {name: '必应', target: 'https://cn.bing.com/search?q=', sort: 1},
          {name: '360搜索', target: 'https://www.so.com/s?q=', sort: 2}
        ]
      }
    } else {
      this.engines = JSON.parse(engineSetting)
    }
    let engine = localStorage.getItem("engine")
    if (engine !== null) {
      if (engine === 'NaN'){
        localStorage.setItem("engine", '1')
      }
      if (engine >= this.engines.length) {
        localStorage.setItem("engine", '1')
      }
      this.engine = parseInt(localStorage.getItem("engine"))
    } else {
      localStorage.setItem("engine", '1')
    }
  }
}
</script>

<style scoped>
a{
  text-decoration:none;
}
.naviMain{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  margin-top: 12vh;
}
</style>

<style>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
/* 搜索框样式 */
.searchClass{
  /*border: 1px solid #c5c5c5;*/
  border-radius: 20px;
  background: #e5e5e5;
  width: 600px !important;
  opacity: 0.8;
  box-shadow: 0px 3px 10px #0000001A;
  transition: background-color 0.2s;
  transition-timing-function: ease-in-out;
}
/*当屏幕宽度小于960px生效*/
@media screen and (max-width: 667px) {
  .searchClass{
    width: 90vw !important;
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
  background-color: #c5c5c5;
  margin-left: 14px;
}
.searchClass:hover{
  /*border: 1px solid #D5E3E8;*/
  background: #fff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.13);
  transition: 0.2s;
  transition-timing-function: ease-in-out;
}
.searchClass:hover .line {
  background-color: #D5E3E8;
}
.searchClass:hover .el-icon-search{
  color: #00b5b2;
  font-size: 16px;
}
.el-popper[x-placement^=bottom]{
  opacity: 0.9;

}
.el-autocomplete-suggestion__wrap{
  max-height: 370px !important;
  text-align: left;
}
.el-autocomplete-suggestion {
  border-radius: 8px !important;
}
.el-select-dropdown {
  opacity: 0.9;
  border-radius: 8px !important;
}
.popper__arrow {
  visibility: hidden;
}
</style>
