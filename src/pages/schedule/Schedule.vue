<template>
  <div class="main">
    <div class="header bg-primary"></div>
    <div class="grid bg-white">
      <div></div>
      <template v-if="logged">
        <div
          class="week py-2"
          v-for="(week, i) in weeks"
          :key="i"
        >
          {{ week }}
        </div>
      </template>
    </div>

    <div class="content">
      <div
        class="grid courses"
        v-for="(item, i) in schedule"
        :key="i"
      >
        <!-- 时间段 -->
        <div class="period flex align-center justify-center p-3">
          {{ periods[i] }}
        </div>
        <!-- 课程内容 -->
        <div
          class="course flex align-center justify-center"
          v-for="(it, key) in item"
          :key="key"
        >
          <div
            class="course-content flex flex-column align-center justify-center"
            :style="currentDay === key ? 'background: #5d97f7' : ''"
            v-if="it.course.length > 0"
          >
            <span class="mb-1">{{ it.course[0].name }}</span>
            <br />
            <span>{{ it.course[0].addr }}</span>
          </div>
          <div v-else></div>
        </div>
      </div>

      <!-- 前往登录 -->
      <div
        class="to-login flex flex-column align-center justify-center"
        v-if="!logged"
      >
        <image
          class="to-login__icon"
          src="/static/images/img-tip.svg"
          mode="widthFix"
        />
        <div class="gray m-3">登录后查看课表</div>
        <navigator
          class="to-login__btn bg-primary"
          url="../login/main"
        >前往登录</navigator>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logged: false,
      currentDay: null,
      currentWeek: null,
      periods: [
        '09:00 - 10:20',
        '10:40 - 12:00',
        '12:30 - 13:50',
        '14:00 - 15:20',
        '15:30 - 16:50',
        '17:00 - 18:20',
        '19:00 - 20:20',
        '20:30 - 21:50'
      ],
      weeks: ['周一', '周二', '周三', '周四', '周五']
    }
  },

  mounted () {
    const state = this.$store.state
    this.logged = state.logged
    this.currentWeek = state.currentWeek
    this.currentDay = state.currentDay
  },

  computed: {
    schedule () {
      if (this.logged && this.currentWeek) {
        return this.getCurrentSchedule(this.currentWeek)
      }
      return []
    }
  },

  methods: {
    // 获取当前周的课表
    getCurrentSchedule (week) {
      return mpvue.getStorageSync('schedule').map(el => {
        return el.map(item => {
          if (item.course.length > 0) {
            const course = item.course.filter(it => {
              return it.weeks.includes(this.currentWeek)
            })
            return { course }
          }
          return item
        })
      })
    }
  }
}
</script>

<style>
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.header {
  height: 10%;
}

.content {
  flex: 1;
  height: auto;
  max-width: 100vw;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
}

.grid {
  display: grid;
  grid-template-columns: repeat(6, 16.666%);
}

.row {
  text-align: center;
}

.week {
  text-align: center;
}

.period {
  margin: 5rpx 0;
  text-align: center;
  background: white;
  font-size: 28rpx;
}

.course {
  box-sizing: border-box;
  margin: 5rpx 0;
  padding: 0 5rpx;
  text-align: center;
  font-size: 25rpx;
  border-radius: 14rpx;
  color: white;
  overflow: hidden;
}

.course-content {
  width: 100%;
  height: 100%;
  padding: 0 4rpx;
  background: rgba(93, 151, 247, 0.5);
  word-wrap: break-word;
  word-break: break-all;
}

.to-login {
  width: 100%;
  height: 100%;
}
.to-login__icon {
  width: 70%;
}
.to-login__btn {
  width: 50%;
  height: 70rpx;
  margin: 0 auto;
  line-height: 70rpx;
  border-radius: 35rpx;
  color: white;
  text-align: center;
}
</style>