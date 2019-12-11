<template>
  <div class="main">
    <div
      class="flex flex-column align-center justify-center"
      style="height: 100%;"
      v-if="examTime.length === 0"
    >
      <image
        class="mb-3"
        style="width: 350rpx;"
        src="/static/images/empty-1.svg"
        mode="widthFix"
      />
      <div class="gray">系统暂未公布考试时间</div>
    </div>
  </div>
</template>

<script>
import { getExamTime } from '@/request/api'

export default {
  data () {
    return {
      examTime: []
    }
  },

  created () {
    this.getExamTime()
  },

  methods: {
    async getExamTime () {
      try {
        const account = mpvue.getStorageSync('user')
        const { code, data } = await getExamTime(account)
        if (code === 1000) {
          this.examTime = data.exam_time
        }
      } catch (err) { }
    }
  }
}
</script>

<style scoped>
.main {
  height: 100vh;
  background: white;
}
</style>
