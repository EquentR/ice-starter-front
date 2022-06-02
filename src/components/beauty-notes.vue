<template>
  <div class="note-box">
    <el-tooltip class="item" effect="dark" content="点我复制" placement="top" :visible-arrow="false" :hide-after="2000">
      <div class="note"
           v-clipboard:copy="copyContent"
           v-clipboard:success="onCopy"
           v-clipboard:error="onError" @mouseenter="mouseIn" @mouseleave="mouseOut">
        <p>「&nbsp&nbsp{{ noteJson.hitokoto }}&nbsp&nbsp」</p>
        <p ref="origin"
           style="font-style: italic;font-size: 12px;transition: 0.25s;opacity: 0">
          ——{{ noteJson.from }}&nbsp&nbsp{{ noteJson.from_who }}
        </p>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "beauty-notes",
  data() {
    return {
      noteJson: {},
      copyContent: '',
    }
  },
  mounted() {
    this.getNote()
  },
  watch: {
    noteJson() {
      let temp = this.noteJson.hitokoto
      if (this.noteJson.from !== null) {
        temp = temp + " " + this.noteJson.from
      }
      if (this.noteJson.from_who !== null) {
        temp = temp + " " + this.noteJson.from_who
      }
      this.copyContent = temp
    }
  },
  methods: {
    getNote() {
      axios.get(`https://v1.hitokoto.cn/`).then(
          response => {
            this.noteJson = response.data
          }
      ).catch(
          error => {
            console.error(`获取壁纸美文失败`)
            this.noteJson = {
              'hitokoto': "暂时无法获取美文",
            }
          }
      )
    },
    onCopy() {
      this.$notify({
        title: '提示',
        message: '复制文案成功！',
        type: 'success',
        duration: 2000,
        position: 'bottom-right'
      });
    },
    onError() {
      this.$notify({
        title: '提示',
        message: '复制失败，请重试！',
        type: 'error',
        duration: 2000,
        position: 'bottom-right'
      });
    },
    mouseIn() {
      this.$refs.origin.style.opacity = '1'
    },
    mouseOut() {
      this.$refs.origin.style.opacity = '0'
    }
  }
}
</script>

<style scoped>
.note-box {
  flex: content;
  margin: auto;
}
.note {
  margin: auto;
  text-align: center;
  color: #e5f2f8;
  font-size: 13px;
  font-weight: 500;
  text-shadow: 0px 0px 5px #0000001A;;
  padding: 0.5em 1em;
  margin-top: 1em;
  transition: 0.2s;
  transition-timing-function: ease-in-out;
  border-radius: 20px;
  width: 45vw !important;
}
.note:hover {
  background-color: rgba(0, 0, 0, 0.11);
  box-shadow: 0px 3px 10px #0000001A;
  transition: 0.2s;
  transition-timing-function: ease-in-out;
  cursor: pointer;
}
.note:active {
  background-color: rgba(66, 66, 66, 0.11);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.19);
  transition: 0.2s;
}
/*当屏幕宽度小于960px生效*/
@media screen and (max-width: 960px) {
  .note{
    width: 90vw !important;
  }
}
/*当屏幕宽度大于1700px生效*/
@media screen and (min-width: 1700px) {
  .note{
    width: 35vw !important;
  }
}

</style>
