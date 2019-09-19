<template>
  <div class="main">
    <div class="card bg-white">
      <div class="flex align-center justify-between">
        <div>课程名称</div>
        <div>分数</div>
      </div>
      <template v-if="!loading && itmes.length > 0">
        <div
          v-for="(item, key) in itmes"
          :key="key"
        >
          <div
            class="flex align-center justify-between mt-2 p-1"
            @click="showItems(key)"
          >
            <div>{{ item.name }}</div>
            <div
              class="primary"
              style="font-weight: bold;font-size: 28rpx;"
            >{{ item.total || '--' }}</div>
          </div>
          <div
            class="items"
            style="border-radius: 10rpx;background: #ececec;"
            :class="currentShow === key ? 'show my-1 p-2' : 'hide'"
          >
            <template v-if="currentShow === key">
              <div
                class="grid text-center"
                v-for="(it, i) in item.items"
                :key="i"
              >
                <span class="label">{{ it.label }}</span>
                <span>{{ it.percentage }}</span>
                <span>{{ it.most }}</span>
                <span>{{ it.score }}</span>
              </div>
            </template>
          </div>
        </div>
      </template>
      <div
        style="height: 500rpx;"
        v-if="loading"
      >
        <LoaderCircle />
      </div>
    </div>
  </div>
</template>

<script>
import { getUsualGrades } from '@/request/api'
import LoaderCircle from '@/components/LoaderCircle'

export default {
  data () {
    return {
      itmes: [],
      currentShow: null,
      loading: false
    }
  },

  components: { LoaderCircle },

  mounted () {
    this.getUsualGrades()
  },

  methods: {
    async getUsualGrades () {
      try {
        this.loading = true
        const account = mpvue.getStorageSync('user')
        const { code, data } = await getUsualGrades(account)
        if (code === 1000) {
          this.itmes = data.usual_grades
        } else {
          throw new Error()
        }
      } catch (err) {
        const that = this
        mpvue.showModal({
          content: '呜呜呜，服务器罢工了',
          confirmText: '再试一下',
          confirmColor: '#5d97f7',
          success ({ confirm, cancel }) {
            if (confirm) {
              that.getUsualGrades()
            } else if (cancel) {
              mpvue.navigateBack()
            }
          }
        })
      } finally {
        this.loading = false
      }
    },

    showItems (i) {
      if (this.currentShow === i) {
        this.currentShow = -1
        return
      }
      this.currentShow = i
    }
  }

}
</script>

<style scoped>
.main {
  height: 100vh;
  padding: 40rpx 40rpx;
}

.card {
  padding: 20rpx;
  border-radius: 10rpx;
  box-shadow: 0 0 20rpx #ececec;
}

.grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
}

.label {
  word-wrap: break-word;
  word-break: break-all;
}

.items {
  transition: all 0.3s;
}

.show {
  height: auto;
}

.hide {
  height: 0;
}
</style>
