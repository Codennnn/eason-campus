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
  data() {
    return {
      info: []
    }
  },

  mounted() {
    this.info = mpvue.getStorageSync('info') || []
  }
}
</script>

<style scoped>
.main {
  height: 100vh;
  background: white;
}
</style>