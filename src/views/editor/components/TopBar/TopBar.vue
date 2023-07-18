<template>
  <div class="top-bar" :style="{ height: `${props.height}px` }">
    <div class="left">
      <p class="logo">编辑器</p>
      <button @click="editorStore.clearBgImg()">清空背景</button>
      <button @click="editorStore.clear()" title="ctrl+alt+c">清空元素</button>
      <button @click="editorStore.removeElement()" title="ctrl+r">删除元素</button>
      <button @click="editorStore.copyElement()" title="ctrl+d">复制元素</button>
      <button @click="editorStore.exportJson()" title="ctrl+s">保存json</button>
      <button @click="editorStore.openCloseScale()">
        {{ editorStore.scale ? '关闭' : '启用' }}自适应
      </button>
      <!-- <div class="api-box">
        <label for="api">api地址：</label>
        <input type="text" id="api" v-model="apiValue" placeholder="请输入上传的api地址" />
        <button @click="handleUpdateApi">上传json</button>
      </div> -->
      <button class="caozuo" @click="handleUpdate(0)">库区数据上传</button>
      <button @click="handleUpdate(1)">生产数据上传</button>
    </div>
    <div class="right">
      <p>鼠标位置: x:{{ editorStore.mouse.x }} y:{{ editorStore.mouse.y }}</p>
    </div>
  </div>
</template>

<script setup name="TopBar">
import { ref } from 'vue'
import axios from 'axios'
import { asyncTasks } from 'roc-utils'
import { isApi } from '@/utils/validate'
import { useEditorStore } from '@/stores/editor'

const editorStore = useEditorStore()
const props = defineProps({
  height: {
    type: Number,
    required: true,
  },
})

/**
 * 上传json数据
 * @param {Number} type 类型 0库区 1生产
 */
async function handleUpdate(type) {
  const r = confirm(`确认提交${type == 0 ? ' 库区数据' : ' 生产数据'}`)
  if (!r) return
  const apiUrl = 'http://sxjk2.lishengnet.com/api.php?_=ScreenApi::save_camera_json'
  const sendObj = {
    type,
    json_data: JSON.stringify(editorStore.allElementJson),
  }
  const [err, res] = await asyncTasks(
    axios.post(apiUrl, sendObj, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
  )
  if (err) return alert('上传失败')
  if (res.data.result == 1) {
    alert('上传成功')
  } else {
    alert('上传失败')
  }
}

const apiValue = ref('')
/**
 * 上传json前 参数检验
 */
function checkApiValue() {
  if (!apiValue.value.trim()) {
    alert('api地址不能为空')
    return false
  } else if (!isApi(apiValue.value)) {
    alert('api地址有误')
    return false
  } else {
    return true
  }
}
/**
 * 上传json
 */
async function handleUpdateApi() {
  if (!checkApiValue()) return
  const sendObj = {
    json: JSON.stringify(editorStore.allElementJson),
  }
  const [err, res] = await asyncTasks(axios.post(apiValue.value.trim(), sendObj))
  if (err) return alert('上传失败')
  console.log(res)
}
</script>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #ccc;
  padding: 0 10px;
  .left {
    display: flex;
    .logo {
      padding: 0 6px;
    }
    .caozuo {
      margin-left: 100px;
    }
    .api-box {
      input {
        padding: 0 10px;
        line-height: 22px;
        border-radius: 4px;
      }
    }
    button {
      margin: 0 5px;
    }
  }
}
</style>
