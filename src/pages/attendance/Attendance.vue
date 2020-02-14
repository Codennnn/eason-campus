<template>
  <div class="main">
    <div
      v-if="!loading"
      class="bg-white px-3"
    >
      <div
        class="item flex align-center justify-between px-1 py-3"
        v-for="(item, key) in items"
        :key="key"
      >
        <div class="label">{{ item.label }}</div>
        <div class="value gray">{{ item.value }}</div>
      </div>
    </div>

    <div
      v-if="loading"
      style="height: 100%;"
    >
      <LoaderCircle />
    </div>
  </div>
</template>

<script>
import { getAttendance } from '@/request/api'
import LoaderCircle from '@/components/LoaderCircle'

export default {
  data() {
    return {
      loading: false,
      items: []
    }
  },

  components: { LoaderCircle },

  mounted() {
    this.getAttendance()
  },

  methods: {
    async getAttendance() {
      const account = mpvue.getStorageSync('user')
      try {
        this.loading = true
        const { code, data } = await getAttendance(account)
        if (code === 1000) {
          this.items = data.attendance
        } else {
          throw new Error()
        }
      } catch (err) {
        const that = this
        mpvue.showModal({
          content: '呜呜呜，服务器罢工了',
          confirmText: '再试一下',
          confirmColor: '#5d97f7',
          success({ confirm, cancel }) {
            if (confirm) {
              that.getAttendance(account)
            } else if (cancel) {
              mpvue.navigateBack()
            }
          }
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.main {
  height: 100vh;
  font-size: 28rpx;
}

.item {
  border-bottom: 1rpx solid #ececec;
}
.item:last-child {
  border: none;
}
.label,
.value {
  width: 50%;
  word-wrap: break-word;
  word-break: break-all;
}
.value {
  text-align: right;
}
</style>