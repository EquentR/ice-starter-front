<template>
  <div class="engine-setting">
    <h4 style="text-align: center">你可以对搜索引擎进行排序，也可以
      <span style="color: #00778c;cursor: pointer" @click="changeEngine(-1)">添加</span>
      新的引擎</h4>
    <draggable v-model="engines.props"
               chosenClass="chosen"
               forceFallback="true"
               group="people"
               animation="0"
               @start="onStart"
               @end="onEnd">
      <transition-group>
        <div class="searchEngListItem"
             v-for="(item, index) in engines.props"
             :key="item.sort"
             @click="changeEngine(index)">
          <span>{{ item.name }}</span>
          <span class="searchEngUrl" id="baiduSearchEngUrl">{{ item.target }}</span>
        </div>
      </transition-group>
    </draggable>

<!--  增加搜索引擎  -->
    <el-dialog :visible.sync="addEngineVisible"
               width="400px"
               title="设置搜索引擎"
               :append-to-body="true"
               :close-on-click-modal="false">
      <div class="add-engine">
        <h4>注意！搜索引擎格式需要按照如下方式编写</h4>
        <div style="text-align: left">
          <span>例：https://www.baidu.com/s?ie=UTF-8&wd=</span><br/>
          <span>最后的“wd=”就是你需要搜索的文字参数</span><br/>
          <span>每个网站的参数不一定是wd，也有可能是s、q</span><br/>
          <span>但是请保证将搜索参数放在最后面，并以等号结尾</span><br/>
        </div>
        <el-form :rules="rules">
          <el-form-item label="请输入带参数的搜索网址" prop="url">
            <el-input
                placeholder="请输入搜索网址"
                v-model="tempSite"
                clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="请输入引擎名称">
            <el-input
                placeholder="请输入引擎名称"
                v-model="tempName"
                clearable>
            </el-input>
          </el-form-item>
          <div style="height: 10px"></div>
          <el-form-item style="text-align: right">
            <el-button type="danger" @click="deleteItem" :disabled="!canDelete">删除</el-button>
            <el-button type="primary" @click="submitChange">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import userSettingApi from "@/api/userSettingApi";
import engineApi from "@/api/engineApi";
export default {
  name: "engine-setting",
  components: {draggable},
  data() {
    return {
      engines: {props:[]},
      drag: false,
      addEngineVisible: false,
      tempName: '',
      tempSite: '',
      tempIndex: -1,
      canDelete: false,
      //输入框规则
      rules: {
        url: {type: "url"}
      },
    }
  },
  computed: {
    engineCopy() {
      return JSON.stringify(this.engines)
    }
  },
  watch: {
    engineCopy: {
      handler() {
        localStorage.setItem("engineSetting", JSON.stringify(this.engines))
        this.$bus.$emit("reSetEngines", this.engines)
      },
      deep: true
    }
  },
  methods: {
    //开始拖拽事件
    onStart(){
      this.drag=true;
    },
    //拖拽结束事件
    onEnd() {
      this.drag=false;
    },
    changeEngine(index) {
      if (index !== -1) {
        this.tempSite = this.engines.props[index].target
        this.tempName = this.engines.props[index].name
        this.tempIndex = index
        this.canDelete = true
      } else {
        this.tempIndex = -1
        this.tempSite = ''
        this.tempName = ''
        this.canDelete = false
      }
      this.addEngineVisible = true
    },
    submitChange() {
      let urlRule = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
      let isValid = urlRule.test(this.tempSite) & this.tempSite.endsWith("=")
      let isEmpty = this.tempName === '' || this.tempColor === ''
      if (isValid && !isEmpty) {
        this.tempSite = this.tempSite.startsWith("http") ? this.tempSite : "https://" + this.tempSite
        if (this.tempIndex >= 0) {
          this.engines.props[this.tempIndex].target = this.tempSite
          this.engines.props[this.tempIndex].name = this.tempName
          this.engines.props[this.tempIndex].sort = this.tempIndex
        } else {
          this.engines.props.push({
            target: this.tempSite,
            name: this.tempName,
            sort: this.engines.props.length
          })
        }
        this.addEngineVisible = false
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
    },
    deleteItem() {
      this.$confirm('您要删除这个项目吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.engines.props.splice(this.tempIndex, 1)
        this.addEngineVisible = false;
      })
    }
  },
  async created() {
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
    if (isLogin === "1") {
      await engineApi.get(jwt).then(
        res => {
          let engines = res.data.data
          localStorage.removeItem("engineSetting")
          localStorage.setItem("engineSetting", JSON.stringify(engines))
        }
      ).catch(
        error => {
          this.engines = {
            props: [
              {name: '百度', target: 'https://www.baidu.com/s?ie=UTF-8&wd=', sort: 0},
              {name: '必应', target: 'https://cn.bing.com/search?q=', sort: 1},
              {name: '360搜索', target: 'https://www.so.com/s?q=', sort: 2}
            ]
          }
        }
      )
    }
    let engineSetting = localStorage.getItem("engineSetting")
    console.log(engineSetting)
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
  }
}
</script>

<style scoped>
.engine-setting {
  max-height: 352px;
}
.engine-item {
  height: 30px;
  border-top: solid 1px #c4c4c4;

}
.searchEngListItem {
  padding: 10px 26px;
  border-radius: 3px;
  cursor: pointer;
  transition-timing-function: ease-in-out;
}
.searchEngListItem:hover {
  background-color: #e9eaea;
  /*transition: .25s;*/
  /*transition-timing-function: ease-in-out;*/
}

.searchEngUrl {
  position: sticky;
  left: 110px;
}

.add-engine {
  text-align: center;
}
</style>
