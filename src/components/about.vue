<template>
  <div class="about">
    <img src="../assets/logotext.png" width="200px">
    <p>©&nbsp;2022&nbsp;&nbsp;冰清起始页</p>
    <span class="content">
      特别鸣谢：<br/>
      <a href="https://cn.vuejs.org/index.html">Vue.js</a><br/>
      <a href="https://element.eleme.cn">Element-UI</a><br/>
      <a href="https://github.com/SortableJS/Sortable">Sortable.js</a><br/>
      <a href="https://space.bilibili.com/294832787">B站UP主：Chemistry_残鸢</a>
      <br/><br/>
      有任何建议请发邮件或B站私信联系我：<br/>
      邮箱：<a href="mailto:ice-starter@126.com">ice-starter@126.com</a><br/>
      B站：<a href="https://space.bilibili.com/36219054">毅乐_Equent</a>
    </span><br/><br/><br/>
    <span>
      更新日志：2022-8-19<br/>
      1、新增修复起始页功能<br/>
      2、新增清空账号自定义内容功能<br/>
      3、新增注销账号、恢复账号功能<br/>
      4、修复部分页面动画不生效问题<br/>
      5、修复了一些bug，修改部分显示效果<br/>
      6、重构部分应用代码，提升起始页加载速度<br/>
      7、修改数据传输格式和错误处理响应<br/>
      8、新增部分错误页面显示<br/>
    </span><br/><br/>
    <span>
      更新日志：2022-7-24<br/>
      1、紧急修复了一些致命bug<br/>
    </span><br/><br/>
    <span>
      更新日志：2022-7-24<br/>
      1、更新图标拖拽排序功能<br/>
      2、更新自定义引擎功能<br/>
      3、输入框添加清空按钮<br/>
      4、新增设置面板<br/>
      5、新增增加头像功能
    </span>
  </div>
</template>

<script>
export default {
  name: "about"
}
</script>

<style scoped>
.about {
  text-align: left;
  height: 352px;
  margin-left: 10px;
}
.content a{
  color: #00778c;
  text-decoration: none;
}
</style>
