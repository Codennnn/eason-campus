<template>
  <div class="main">
    <div
      class="wrapper"
      :class="display ? 'blur' : ''"
    >
      <div
        class="hidden-bar flex align-center justify-around bg-white"
        :class="active ? 'show' : 'hide'"
      >
        <picker
          style="flex: 1;"
          @change="weekChange"
          :value="index"
          :range="weeks"
        >
          <i
            class="iconfont icon-group"
            data-label="选择周数"
          ></i>
        </picker>
        <i
          class="iconfont icon-done"
          data-label="当前周"
          @click="setCurrentSchedule"
        ></i>
        <i
          class="iconfont icon-calendar"
          data-label="全学期"
          @click="setAllSchedule"
        ></i>
      </div>

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
                :style="currentDay === key + 1 ? 'background: #5d97f7' : ''"
                v-if="it.course.length > 0"
                @click="showDetail(it.course[0])"
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

    <div
      class="modal"
      :class="display ? 'modal-display' : 'modal-hidden'"
    >
      <div class="modal-header">
        <div class="flex align-center">
          <i
            class="iconfont icon-clear mr-2 p-2"
            style="flex: 0;margin-left: auto;font-size: 34rpx;font-weight: bold;"
            @click="display = false"
          ></i>
        </div>
      </div>

      <div class="modal-content p-3">
        <div class="flex align-center mb-2">
          <image
            class="modal-icon mr-1"
            src="/static/images/name.svg"
            mode="widthFix"
          />
          <span>课程名称</span>
          <span class="gray ml-2">{{ detail.name }}</span>
        </div>
        <div class="modal-grid">
          <div class="flex align-center mb-2">
            <image
              class="modal-icon mr-1"
              src="/static/images/teacher.svg"
              mode="widthFix"
            />
            <span>任课老师</span>
            <span class="gray ml-2">{{ detail.teacher }}</span>
          </div>
          <div class="flex align-center mb-2">
            <image
              class="modal-icon mr-1"
              src="/static/images/map.svg"
              mode="widthFix"
            />
            <span>课室地点</span>
            <span class="gray ml-2">{{ detail.addr }}</span>
          </div>
          <div class="flex align-center mb-2">
            <image
              class="modal-icon mr-1"
              src="/static/images/3D-chart.svg"
              mode="widthFix"
            />
            <span>课程代码</span>
            <span class="gray ml-2">{{ detail.code }}</span>
          </div>
          <div class="flex align-center mb-2">
            <image
              class="modal-icon mr-1"
              src="/static/images/pie-chart.svg"
              mode="widthFix"
            />
            <span>上课周数</span>
            <span
              class="gray ml-2"
              v-if="detail.weeks && detail.weeks.length > 1"
            >
              {{ detail.weeks[0] }}-{{ detail.weeks[detail.weeks.length - 1] }}周
            </span>
            <span
              v-else
              class="gray ml-2"
            >
              {{ detail.weeks[0] }}周
            </span>
          </div>
        </div>
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
      display: false, // 是否显示课程详细信息
      detail: {
        name: '--',
        teacher: '--',
        addr: '--',
        code: '--',
        weeks: [1]
      }, // 课程详细信息
      days: ['周一', '周二', '周三', '周四', '周五'],
      weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      active: false
    }
  },

  mounted () {
    const state = this.$store.state
    this.currentWeek = state.currentWeek
    this.currentDay = state.currentDay
    this.setNavigationBarTitle(this.currentWeek)
  },

  computed: {
    logged () {
      return this.$store.state.logged
    },

    schedule () {
      if (this.logged && this.currentWeek) {
        this.active = false
        return this.getCurrentSchedule(this.currentWeek)
      }
      return []
    }
  },

  methods: {
    // 获取当前周的课表
    getCurrentSchedule (week) {
      if (week <= 18) {
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
      return mpvue.getStorageSync('schedule')
    },

    setNavigationBarTitle (week) {
      mpvue.setNavigationBarTitle({
        title: `第 ${week} 周课表`
      })
    },

    weekChange (e) {
      this.currentWeek = +e.mp.detail.value + 1
      this.setNavigationBarTitle(this.currentWeek)
    },

    setCurrentSchedule () {
      const state = this.$store.state
      this.currentWeek = state.currentWeek
      this.setNavigationBarTitle(this.currentWeek)
    },

    setAllSchedule () {
      this.currentWeek = 19
      mpvue.setNavigationBarTitle({ title: '全学期课表' })
    },

    showDetail (v) {
      this.display = true
      this.detail = v
    }
  },

  onShareAppMessage () {
    return {
      path: '/pages/schedule/Schedule.vue'
    }
  }
}
</script>

<style>
.main {
  position: relative;
}

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.header {
  height: 10%;
}

.hidden-bar {
  width: 100vw;
  margin: 0 auto;
  text-align: center;
  transition: all ease 0.3s;
}

.iconfont {
  position: relative;
  flex: 1;
  font-size: 50rpx;
}
.iconfont::after {
  position: absolute;
  width: 150rpx;
  content: attr(data-label);
  bottom: -45rpx;
  left: 50%;
  transform: translateX(-50%);
  font-size: 26rpx;
}

.show {
  opacity: 1;
  height: 150rpx;
  line-height: 150rpx;
}

.hide {
  opacity: 0;
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
  transform: rotate3d(0, 0, 1, 45deg);
}
.line-two-active {
  opacity: 0;
}
.line-three-active {
  width: 38rpx;
  transform-origin: 8%;
  transform: rotate3d(0, 0, 1, -45deg);
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

.blur {
  filter: blur(3rpx);
}

.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.modal {
  position: fixed;
  z-index: 9999;
  left: 0;
  bottom: 0;
  width: 100vw;
  background: #fff;
  overflow: hidden;
  transition: all 0.3s;
}
.modal-display {
  transform: translate3d(0, 0, 0);
}
.modal-hidden {
  transform: translate3d(0, 100%, 0);
}
.modal-header {
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  text-align: right;
  color: white;
  font-size: 32rpx;
  background: rgba(93, 151, 247);
  overflow: hidden;
}
.modal-content {
  font-size: 26rpx;
}
.modal-icon {
  width: 45rpx;
}
</style>