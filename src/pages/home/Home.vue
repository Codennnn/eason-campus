<template>
  <div class="main">
    <image
      class="banner-img"
      src="/static/images/img-banner.png"
      mode="widthFix"
    />

    <div class="content p-4">
      <div class="card flex justify-around">
        <div
          class="flex flex-column align-center justify-center"
          v-for="(block, i) in blocks"
          :key="i"
        >
          <image
            class="block-icon mb-2"
            mode="widthFix"
            :src="block.icon"
          />
          <div>{{ block.label }}</div>
        </div>
      </div>
      <div class="card flex justify-around">
        <div
          class="flex flex-column align-center justify-center"
          v-for="(section, i) in sections"
          :key="i"
        >
          <image
            class="section-icon mb-2"
            mode="widthFix"
            :src="section.icon"
          />
          <div class="section-label">{{ section.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const blocks = [
  {
    label: '成绩',
    icon: '/static/icons/icon-grade.png'
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

export default {
  data () {
    return {
      blocks,
      sections
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
  margin-bottom: 25rpx;
  background: white;
  box-shadow: 0 0 20rpx #ececec;
  border-radius: 20rpx;
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
</style>