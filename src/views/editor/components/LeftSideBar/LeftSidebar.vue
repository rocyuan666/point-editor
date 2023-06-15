<template>
  <div class="left-side-bar">
    <div class="cont-box" v-if="editorStore.bgImg">
      <p class="title-p">基础</p>
      <div class="btn-box">
        <a
          href="javascript:;"
          @click="addElement(item)"
          v-for="item in editorStore.componentsJson"
          :key="item.name"
          >{{ item.name }}</a
        >
      </div>
    </div>
    <div class="add-bgimg" v-else>
      <p>请先添加背景</p>
      <div>
        <input type="text" placeholder="图片名称加后缀(xxx.jpg)" v-model="bgImgName" />
      </div>
      <button @click="editorStore.addBgImg(bgImgName)">添加背景</button>
    </div>
  </div>
</template>

<script setup name="LeftSideBar">
import { ref } from 'vue'
import { useEditorStore } from '@/stores/editor'

const bgImgName = ref('')

const editorStore = useEditorStore()
function addElement(item) {
  editorStore.addElement(item)
}
</script>

<style lang="scss" scoped>
.left-side-bar {
  padding: 20px 0;
  .add-bgimg {
    text-align: center;
    color: #ccc;
    padding-top: 50px;
    font-size: 18px;
    input {
      padding: 5px 10px;
    }
  }
  .cont-box {
    .title-p {
      color: #fff;
      font-size: 16px;
    }
    .btn-box {
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      padding: 3px;
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30%;
        height: 40px;
        line-height: 1.2;
        background-color: #666;
        border: 1px solid #ccc;
        color: #fff;
        margin: 0 3px 10px 3px;
        padding: 0 4px;
        transition: all 0.2s;
        &:hover {
          background-color: #aaa;
        }
      }
    }
  }
}
</style>
