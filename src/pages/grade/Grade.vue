<template>
  <div class="main">
    <div class="tabs flex align-center bg-white">
      <div
        class="tab"
        :class="currentTab === 0 ? 'tab-active' : ''"
        @click="currentTab = 0"
      >在读课程</div>
      <div
        class="tab"
        :class="currentTab === 1 ? 'tab-active' : ''"
        @click="currentTab = 1"
      >当前学期</div>
    </div>
    <swiper
      duration="300"
      :current="currentTab"
      @change="swiperTab"
    >
      <swiper-item class="swiper-item py-4 px-3">
        123
      </swiper-item>
      <swiper-item class="swiper-item py-4 px-3">
        321
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentTab: 0
    }
  },

  methods: {
    swiperTab (e) {
      this.currentTab = e.mp.detail.current
    }
  }
}
</script>

<style scoped>
.main {
  height: 100vh;
}

.tabs {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
}

.tab {
  position: relative;
  width: 50%;
  text-align: center;
}

.tab::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 0;
  height: 8rpx;
  background: #5d97f7;
  border-radius: 4rpx;
  transition: all 0.3s;
}

.tab-active::after {
  width: 50%;
}
</style>