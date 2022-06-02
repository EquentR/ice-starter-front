<template>
  <div id="back">
    <div id="mask">
      <div class="dark-mode">
        <span style="color: white">{{ modeName }}&nbsp</span>
        <el-switch
            v-model="is_dark"
            active-color="#0079d2"
            inactive-color="#f3c373">
        </el-switch>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "background",
  data() {
    return {
      is_dark: false,
      modeName: '日间模式',
      firstIn: true,
      theme: this.$store.state.theme
    }
  },
  watch: {
    is_dark() {
      if (this.is_dark === false) {
        this.theme.is_dark = false
        this.modeName = '日间模式'
        document.getElementById("mask").style.background = "rgba(255,255,255,0.15)"
        localStorage.setItem("dark","false")
      }else{
        this.theme.is_dark = true
        this.modeName = '夜间模式'
        document.getElementById("mask").style.background = "rgba(0,0,0,0.15)"
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
    }
  },
  mounted() {
    document.body.style.background =
        `url("${this.theme.pictureUrl}") no-repeat center`;
    document.body.style.backgroundSize =
        `cover`;
    document.body.style.backgroundAttachment = 'fixed';
    let dark = localStorage.getItem("dark");
    this.is_dark = dark === 'true';
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
  position:fixed
}
#mask {
  background: rgba(255,255,255,0.15);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.3s;
  transition-timing-function: ease-in-out;
}
.dark-mode {
  position: absolute;
  left: 20px;
  bottom: 20px;
}
</style>
