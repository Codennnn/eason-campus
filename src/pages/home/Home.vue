<template>
  <div class="main">
    <image
      class="banner-img"
      src="/static/images/img-banner.png"
      mode="widthFix"
    />

    <div class="content p-4">
      <!-- 首要功能 -->
      <div class="card slide-left flex justify-around">
        <navigator
          class="flex flex-column align-center justify-center px-4 py-1"
          style="border-radius: 15rpx;"
          v-for="(block, i) in blocks"
          :key="i"
          :url="block.url"
        >
          <image
            class="block-icon mb-1"
            mode="widthFix"
            :src="block.icon"
          />
          <div>{{ block.label }}</div>
        </navigator>
      </div>

      <!-- 今日课程 -->
      <div
        class="card slide-right"
        style="padding: 0;"
      >
        <div class="header flex align-center justify-between px-3 pt-2 pb-1">
          <span>{{ currentDate }}</span>
          <span>{{ days[currentDay] }}课程</span>
          <span class="flex align-center">
            <span
              class="primary mr-1"
              style="font-weight: bold;font-size: 38rpx;"
            >{{ currentWeek - 1 }}</span>
            周
          </span>
        </div>
        <div
          class="to-login p-3"
          v-if="currentDay"
        >
          <div>
            <image
              class="to-login__icon mb-2"
              mode="widthFix"
              src="/static/images/empty-1.svg"
            />
            <div class="gray">周末愉快</div>
          </div>
        </div>
        <div
          class="to-login p-3"
          v-elif="!logged"
        >
          <div>
            <image
              class="to-login__icon mb-2"
              mode="widthFix"
              src="/static/images/empty-3.svg"
            />
            <navigator
              class="to-login__btn bg-primary"
              url="../login/main"
            >去登录</navigator>
          </div>
        </div>
      </div>

      <!-- 次要功能 -->
      <div class="card slide-left flex justify-around">
        <navigator
          class="flex flex-column align-center justify-center py-2 px-3"
          style="border-radius: 10rpx;"
          v-for="(section, i) in sections"
          :key="i"
          url
        >
          <image
            class="section-icon mb-1"
            mode="widthFix"
            :src="section.icon"
          />
          <div class="section-label">{{ section.label }}</div>
        </navigator>
      </div>
    </div>
  </div>
</template>

<script>
const blocks = [
  {
    label: '成绩',
    icon: '/static/icons/icon-grade.png',
    url: '../grade/main'
  },
  {
    label: '考勤',
    icon: '/static/icons/icon-attendance.png'
  },
  {
    label: '考试',
    icon: '/static/icons/icon-notice.png'
  }
]
const sections = [
  {
    label: '华软校历',
    icon: '/static/icons/icon-cal.png'
  },
  {
    label: '平时成绩',
    icon: '/static/icons/icon-pin.png'
  },
  {
    label: '待开发',
    icon: '/static/icons/icon-tag.png'
  },
  {
    label: '待开发',
    icon: '/static/icons/icon-flash.png'
  }
]
const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

export default {
  data () {
    return {
      blocks,
      sections,
      days,
      currentWeek: 1,
      currentDate: '',
      currentDay: 0
    }
  },

  mounted () {
    const state = this.$store.state
    this.currentWeek = state.currentWeek
    this.currentDate = state.currentDate
    this.currentDay = state.currentDay
  },

  computed: {
    logged () {
      return this.$store.state.logged
    }
  }
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.banner-img {
  width: 100%;
}

.content {
  flex: 1;
  height: auto;
  overflow-y: scroll;
}

.card {
  box-sizing: border-box;
  margin-bottom: 25rpx;
  padding: 15rpx;
  background: white;
  box-shadow: 0 0 20rpx #ececec;
  border-radius: 20rpx;
}

.slide-left {
  animation: 1.2s ease 0s slide_left;
}
@keyframes slide_left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}

.slide-right {
  animation: 1.2s ease 0s slide_right;
}
@keyframes slide_right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}

.block-icon {
  width: 100rpx;
  height: 100rpx;
}

.section-icon {
  width: 60rpx;
  height: 60rpx;
}

.section-label {
  font-size: 25rpx;
}

.header {
  border-bottom: 1rpx solid #ececec;
}

.to-login {
  box-sizing: border-box;
  width: 100%;
  text-align: center;
}
.to-login__icon {
  width: 40%;
}
.to-login__btn {
  width: 180rpx;
  height: 60rpx;
  margin: 0 auto;
  padding: 0;
  line-height: 60rpx;
  font-size: 28rpx;
  color: white;
  border-radius: 30rpx;
}
</style>