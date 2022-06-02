<template>
  <div id="app">
    <index class="foreground"></index>
    <br/>
    <siteIcon></siteIcon>
    <br/>
    <beautyNotes></beautyNotes>
    <background class="background"></background>
  </div>
</template>

<script>

import index from "@/components";
import background from "@/components/background";
import siteIcon from "@/components/site-icon";
import beautyNotes from "@/components/beauty-notes";
export default {
  name: 'App',
  components: {
    index,
    background,
    siteIcon,
    beautyNotes,
  }
}
</script>

<style>
.background {
  z-index: -1;
}
.foreground {
  z-index: 0;
}
#app {

}
</style>
