<template>
  <div class="content-main">
    <SketchRule
      :thick="state.thick"
      :scale="state.scale"
      :width="1000"
      :height="1000"
      :startX="state.startX"
      :startY="state.startY"
      :lines="state.lines"
      :isShowReferLine="state.isShowReferLine"
    />
  </div>
</template>

<script setup name="ContentMain">
import { ref, reactive } from 'vue'
import SketchRule from 'vue3-sketch-ruler'
import 'vue3-sketch-ruler/lib/style.css'
const state = reactive({
  thick: 20,
  scale: 0.1, //658813476562495, //1,
  startX: 0,
  startY: 0,
  lines: {
    h: [433, 588],
    v: [33, 143],
  },
  isShowReferLine: true, // 显示参考线
})
</script>

<style lang="scss" scoped>
.content-main {
  position: relative;
}
</style>
