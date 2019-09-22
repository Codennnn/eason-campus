<template>
  <div class="main">
    <div class="logo-content text-center bg-white py-3">
      <image
        class="logo"
        src="/static/images/logo.png"
        mode="widthFix"
      />
      <div class="py-2">
        <span class="primary">v2.0.1</span>
        <spanc class="beta">beta</spanc>
      </div>
    </div>
    <div class="cell flex align-center bg-white">
      <i class="iconfont icon-cache ml-1 mr-3"></i>
      <div>应用缓存</div>
      <div
        class="gray"
        style="margin-left: auto;"
      >{{ cache }}</div>
    </div>
    <button
      class="cell flex align-center bg-white"
      v-for="(cell, key) in cells"
      :key="key"
      :open-type="cell.openType"
    >
      <i
        class="iconfont ml-1 mr-3"
        :class="cell.icon"
      ></i>
      <div>{{ cell.label }}</div>
      <i
        class="iconfont icon-arrow gray"
        style="margin-left: auto;font-size: 30rpx;"
      ></i>
    </button>
  </div>
</template>

<script>
const cells = [
  { icon: 'icon-setting', label: '授权设置', openType: 'openSetting' },
  { icon: 'icon-feedback', label: '使用反馈', openType: 'feedback' },
  { icon: 'icon-message', label: '联系开发者', openType: 'contact' }
]

export default {
  data () {
    return {
      cells,
      cache: ''
    }
  },

  mounted () {
    mpvue.getStorageInfo({
      success: (res) => {
        const size = res.currentSize
        if (size < 1000) {
          this.cache = `${size}KB`
        } else {
          this.cache = `${size / 10000}M`
        }
      }
    })
  }
}
</script>

<style scoped>
.main {
  height: 100vh;
}

.logo {
  width: 22%;
  margin-bottom: 35rpx;
  border-radius: 15rpx;
  box-shadow: 0 0 40rpx #e6e6e6;
}

.beta {
  margin-left: 12rpx;
  padding: 4rpx 10rpx;
  background-color: #e7e7e7;
  border-radius: 10rpx;
  font-size: 26rpx;
  color: #b4b4b4;
}

.cell {
  padding: 30rpx;
  border-bottom: 1rpx solid #ececec;
}

.cell:last-child {
  border: none;
}

.iconfont {
  font-size: 40rpx;
}

button {
  margin: 0;
  padding: 30rpx;
  line-height: normal;
  border-radius: 0;
  font-size: 30rpx;
}

button::after {
  border: none;
}
</style>