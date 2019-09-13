<template>
  <div class="main">
    <div
      class="hidden-bar "
      :class="active ? 'show' : 'hide'"
    >123</div>
    <div class="day-bar grid bg-white">
      <template v-if="logged">
        <div
          class="line-group week flex flex-column align-center justify-center py-2"
          @click="active = !active"
        >
          <div
            class="line"
            :class=" active ? 'line-one-active' : ''"
          ></div>
          <div
            class="line"
            :class=" active ? 'line-two-active' : ''"
          ></div>
          <div
            class="line"
            :class=" active ? 'line-three-active' : ''"
          ></div>
        </div>
        <div
          class="week py-2"
          v-for="(day, i) in days"
          :key="i"
        >
          {{ day }}
        </div>
      </template>
    </div>

    <div class="content py-1">
      <template v-if="logged && currentWeek">
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
      </template>

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
      days: ['周一', '周二', '周三', '周四', '周五'],
      active: false
    }
  },

  mounted () {
    const state = this.$store.state
    this.currentWeek = state.currentWeek
    this.currentDay = state.currentDay
    mpvue.setNavigationBarTitle({
      title: `第 ${this.currentWeek} 周课表`
    })
  },

  computed: {
    logged () {
      return this.$store.state.logged
    },

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
              return it.weeks.includes(week)
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

.hidden-bar {
  margin: 0 auto;
  transition: all ease 0.3s;
}

.show {
  height: 150rpx;
  line-height: 150rpx;
}

.hide {
  height: 0;
  line-height: 0;
}

.day-bar {
  position: relative;
  z-index: 9999;
  box-shadow: 0 10rpx 40rpx #fff;
}

.line {
  width: 45rpx;
  height: 5rpx;
  margin: 5rpx 0;
  background: rgb(85, 85, 85);
  border-radius: 3rpx;
  transition: all ease 0.3s;
}

.line-one-active {
  width: 38rpx;
  transform-origin: 8%;
  transform: rotateZ(45deg);
}

.line-two-active {
  opacity: 0;
}

.line-three-active {
  width: 38rpx;
  transform-origin: 8%;
  transform: rotateZ(-45deg);
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