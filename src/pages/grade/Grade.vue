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
        style="height: 100%;"
        duration="300"
        :current="currentTab"
        @change="swiperTab"
      >
        <swiper-item class="swiper-item">
          <scroll-view
            class="swiper-scroll"
            :scroll-y="true"
          >
            <div class="scroll-wrapper">
              <div class="card">
                <div class="title">当前学期</div>
                <div class="content">
                  <div
                    v-if="loading"
                    style="height:400rpx"
                  >
                    <LoaderCircle />
                  </div>
                  <!-- 错误提示 -->
                  <div
                    class="text-center py-2"
                    v-else-if="error"
                  >
                    <image
                      class="mb-3"
                      style="width: 350rpx;"
                      :src="errorImage"
                      mode="widthFix"
                    />
                    <div class="gray">{{ errorText }}</div>
                  </div>
                  <template v-else>
                    <div
                      class="item flex align-center justify-between"
                      v-for="(item, key) in currentGrades"
                      :key="key"
                    >
                      <span class="name">{{ item.name }}</span>
                      <span class="gray">{{ item.score }}</span>
                    </div>
                  </template>
                </div>
              </div>
              <div style="overflow: hidden;">
                <button
                  class="btn bg-primary mt-1"
                  :disabled="disabled"
                  @click="getCurrentGrades"
                >查询最新成绩</button>
              </div>
            </div>
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view
            class="swiper-scroll"
            :scroll-y="true"
          >
            <div class="scroll-wrapper">
              <div
                style="height: 100%;"
                v-if="loading2"
              >
                <LoaderCircle />
              </div>
              <!-- 错误提示 -->
              <div
                class="flex flex-column justify-center align-center py-2"
                style="height: 100%;"
                v-else-if="error2"
              >
                <image
                  class="mb-3"
                  style="width: 350rpx;"
                  :src="errorImage2"
                  mode="widthFix"
                />
                <div class="gray">{{ errorText2 }}</div>
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
                      <span class="name">{{ item.name }}</span>
                      <span class="gray">{{ item.score }}</span>
                    </div>
                  </div>
                </div>
              </template>
              <div
                v-if="allGrades.length !== 0"
                class="text-center gray pt-2 pb-4"
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
      account: {},
      currentTab: 0,
      currentGrades: [],
      allGrades: [],
      loading: true,
      loading2: true,
      disabled: false,
      errorImage: '',
      errorImage2: '',
      errorText: '',
      errorText2: '',
      error: false,
      error2: false
    }
  },

  components: { LoaderCircle },

  mounted () {
    this.account = mpvue.getStorageSync('user')
    this.getCurrentGrades()
  },

  methods: {
    swiperTab (e) {
      this.currentTab = e.mp.detail.current

      if (this.currentTab === 1 && this.allGrades.length === 0) {
        this.getAllGrades()
      }
    },

    // 获取当前学期成绩
    async getCurrentGrades () {
      this.error = false
      this.loading = true
      this.disabled = true

      try {
        const { code, data } = await getCurrentGrades(this.account)
        if (code === 1000) {
          this.currentGrades = data.courses
        } else {
          this.error = true
          this.errorImage = '/static/images/empty-2.svg'
          if (code === 2001) {
            this.errorText = 'Myscse 的登录密码错误，请重新绑定账号 (｡•ˇ‸ˇ•｡)'
          } else {
            this.errorText = '爬取教务系统失败 (｡•ˇ‸ˇ•｡)'
          }
        }
      } catch (err) {
        this.error = true
        this.errorImage = '/static/images/empty-1.svg'
        this.errorText = '服务器罢工了 (｡•ˇ‸ˇ•｡)'
      } finally {
        this.loading = false
        this.disabled = false
      }
    },

    // 获取所有成绩
    async getAllGrades () {
      this.error = false
      this.loading2 = true

      try {
        const { code, data } = await getAllGrades(this.account)
        if (code === 1000) {
          this.allGrades = data.courses
        } else {
          this.error2 = true
          this.errorImage2 = '/static/images/empty-2.svg'
          if (code === 2001) {
            this.errorText2 = 'Myscse 的登录密码错误，请重新绑定账号 (｡•ˇ‸ˇ•｡)'
          } else {
            this.errorText2 = '爬取教务系统失败 (｡•ˇ‸ˇ•｡)'
          }
        }
      } catch (err) {
        this.error2 = true
        this.errorImage2 = '/static/images/empty-1.svg'
        this.errorText2 = '服务器罢工了 (｡•ˇ‸ˇ•｡)'
      } finally {
        this.loading2 = false
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
  box-sizing: border-box;
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

.swiper {
  height: calc(100% - 90rpx);
}

.swiper-item {
  flex: 1;
  position: relative;
  min-height: 100%;
}

.swiper-scroll {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.scroll-wrapper {
  box-sizing: border-box;
  height: 100%;
  padding: 50rpx 40rpx;
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
.item {
  padding: 10rpx 0;
}
.item:active {
  border-radius: 10rpx;
  background: #ececec;
}
.name {
  width: 70%;
  word-wrap: break-word;
  word-break: break-all;
}

.btn {
  color: white;
}
</style>