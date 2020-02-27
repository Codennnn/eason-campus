<template>
  <div class="main">
    <div
      class="p-4"
      v-if="examTime.length > 0"
    >
      <div
        class="exam-item"
        v-for="(item, i) in examTime"
        :key="i"
      >
        <div
          class="flex align-center px-2 py-3"
          style="font-size: 28rpx;"
          @click="setCurrent(i)"
        >
          <span class="primary">{{ item.date }}</span>
          <span style="flex: 1; text-align: right;">{{ item.name }}</span>
          <i
            class="iconfont icon-arrow ml-1"
            :class="{'spin': current === i}"
            style="color: #eaeaea;"
          ></i>
        </div>
        <div
          class="detail"
          :class="current === i ? 'show pb-2' : 'hide'"
        >
          <div class="item">
            <span class="label">时间</span>
            <span class="value">{{ item.time }}</span>
          </div>
          <div class="item">
            <span class="label">课室</span>
            <span class="value">{{ item.addr }}</span>
          </div>
          <div class="item">
            <span class="label">座位</span>
            <span class="value">{{ item.seat }}</span>
          </div>
          <div class="item">
            <span class="label">状态</span>
            <span class="value">{{ item.status }}</span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex flex-column align-center justify-center"
      style="min-height: 95vh;"
      v-else
    >
      <image
        class="mb-3"
        style="width: 350rpx;"
        src="/static/images/empty-1.png"
        mode="widthFix"
      />
      <div class="gray">系统暂未公布考试时间</div>
    </div>

    <loading :hidden="hidden">
      加载中...
    </loading>
  </div>
</template>

<script>
import { getExamTime } from '@/request/api'

export default {
  data() {
    return {
      examTime: [],
      current: null,
      hidden: false
    }
  },

  mounted() {
    this.getExamTime()
  },

  methods: {
    async getExamTime() {
      mpvue.showNavigationBarLoading()
      this.hidden = false

      try {
        const account = mpvue.getStorageSync('user')
        const { code, data } = await getExamTime(account)
        if (code === 1000) {
          this.examTime = data.exam_time
        }
      } finally {
        this.hidden = true
        mpvue.hideNavigationBarLoading()
        mpvue.stopPullDownRefresh()
      }
    },

    setCurrent(i) {
      if (this.current === i) {
        this.current = null
        return
      }
      this.current = i
    },

    compare(date) {
      return (new Date(date).getTime() > Date.now())
    }
  },

  onPullDownRefresh() {
    this.getExamTime()
  }
}
</script>

<style scoped>
.main {
  min-height: 100vh;
  background: white;
}

.exam-item {
  margin-bottom: 40rpx;
  box-shadow: 0 0 30rpx 0 #ececec;
  border-radius: 15rpx;
  overflow: hidden;
}

.detail {
  transition: all 0.4s;
}
.detail.show {
  max-height: 300rpx;
}
.detail.hide {
  max-height: 0;
}
.item {
  padding: 5rpx 20rpx;
  display: flex;
  align-content: center;
  justify-content: space-between;
  margin-bottom: 5rpx;
  font-size: 26rpx;
}
.label {
  color: #afafaf;
}
.value {
  color: #666;
}

.icon-arrow {
  transition: transform 0.3s;
}
.icon-arrow.spin {
  transform: rotateZ(90deg);
}
</style>
