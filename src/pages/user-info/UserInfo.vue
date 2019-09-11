<template>
  <div class="main">
    <div
      class="item flex align-center justify-between bg-white p-3"
      v-for="(item, key) in info"
      :key="key"
    >
      <div class="gray">{{ item.label }}</div>
      <div>{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      info: [
        {
          label: '姓名',
          value: '陈梓聪'
        }
      ]
    }
  },

  created () {
    // this.info = mpvue.getStorageSync('info') || []
  }
}
</script>

<style scoped>
.main {
  height: 100vh;
}

.item {
  border-bottom: 1rpx solid #ececec;
}

.item:last-child {
  border: none;
}
</style>