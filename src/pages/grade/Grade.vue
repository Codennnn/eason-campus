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
    <div class="swiper">
      <swiper
        duration="300"
        :current="currentTab"
        @change="swiperTab"
      >
        <swiper-item class="swiper-item">
          <scroll-view
            class="swiper-scroll"
            :scroll-y="true"
          >
            <div class="py-5 px-4">
              <div class="card">
                <div class="title">当前学期</div>
                <div class="content">
                  <div
                    v-if="currentGrades.length === 0"
                    style="height:400rpx"
                  >
                    <LoaderCircle />
                  </div>
                  <template v-else>
                    <div
                      class="item flex align-center justify-between"
                      v-for="(item, key) in currentGrades"
                      :key="key"
                    >
                      <span class="">{{ item.name }}</span>
                      <span class="gray">{{ item.score }}</span>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view
            class="swiper-scroll"
            :scroll-y="true"
          >
            <div
              class="py-5 px-4"
              style="height: 100%;"
            >
              <div
                style="height: 100%;"
                v-if="allGrades.length === 0"
              >
                <LoaderCircle />
              </div>
              <template v-else>
                <div
                  class="card"
                  v-for="(card, key) in allGrades"
                  :key="key"
                >
                  <div
                    class="title"
                    v-if="key !== allGrades.length - 1"
                  >第{{ key + 1 }}学期</div>
                  <div
                    class="title"
                    v-else
                  >选修课程</div>
                  <div class="content">
                    <div
                      class="item flex align-center justify-between"
                      v-for="(item, i) in card"
                      :key="i"
                    >
                      <span class="">{{ item.name }}</span>
                      <span class="gray">{{ item.score }}</span>
                    </div>
                  </div>
                </div>
              </template>
              <div
                class="gray pt-2 pb-3"
                style="text-align: center;"
              >- 已经到底啦 -</div>
            </div>
          </scroll-view>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import { getCurrentGrades, getAllGrades } from '@/request/api'
import LoaderCircle from '@/components/LoaderCircle'

export default {
  data () {
    return {
      currentTab: 0,
      currentGrades: [],
      allGrades: []
    }
  },

  components: { LoaderCircle },

  mounted () {
    this.getCurrentGrades()
  },

  methods: {
    swiperTab (e) {
      this.currentTab = e.mp.detail.current

      if (this.currentTab === 1 && this.allGrades.length === 0) {
        this.getAllGrades()
      }
    },

    async getCurrentGrades () {
      const user = mpvue.getStorageSync('user')
      const { code, msg, data } = await getCurrentGrades(user)
      if (code === 1000) {
        this.currentGrades = data.courses
      } else {
        mpvue.showToast({title: msg, icon: 'none'})
      }
    },

    async getAllGrades () {
      const user = mpvue.getStorageSync('user')
      const { code, msg, data } = await getAllGrades(user)
      if (code === 1000) {
        this.allGrades = data.courses
      } else {
        mpvue.showToast({title: msg, icon: 'none'})
      }
    }
  }
}
</script>

<style scoped>
.main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tabs {
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
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

swiper {
  height: 100%;
}

.swiper-scroll {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.swiper {
  flex: 1;
  position: relative;
}

.swiper-item {
  min-height: 100%;
  box-sizing: border-box;
}

.card {
  border-radius: 10rpx;
  margin-bottom: 30rpx;
  box-shadow: 0px 5rpx 10rpx 5rpx #ebebeb;
  overflow: hidden;
}

.title {
  padding: 20rpx 0;
  text-align: center;
  font-size: 32rpx;
  color: #89aadd;
  background-color: #e9f0fb;
}

.content {
  padding: 30rpx;
  background: white;
  font-size: 27rpx;
}

.content .item {
  padding: 5rpx 0;
}
</style>