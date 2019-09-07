<template>
  <div class="main">
    <image
      class="banner-bg"
      src="/static/images/mine-bg.png"
      mode="widthFix"
    />

    <div class="user-info">
      <!-- 头部信息 -->
      <div class="user-content flex align-center">
        <open-data
          class="user-content__avater"
          type="userAvatarUrl"
        ></open-data>
        <div class="flex flex-column justify-center">
          <div class="mb-3">
            <open-data
              class="nick-name primary bg-white"
              type="userNickName"
              lang="zh_CN"
            ></open-data>
          </div>
          <div>
            <div
              class="user-content__text flex align-center"
              v-if="logged"
            >
              <span>已绑定Myscse账号</span>
              <i class="iconfont icon-v ml-1"></i>
            </div>
            <span
              class="user-content__text"
              v-else
            >未绑定Myscse账号</span>
          </div>
        </div>
      </div>

      <!-- 卡片 -->
      <div class="user-card bg-white">
        <div class="user-card__header flex align-center justify-between p-2">
          <div>查看个人信息</div>
          <i
            class="iconfont icon-more"
            style="font-size: 36rpx;"
          ></i>
        </div>
        <div class="user-card__content flex align-center justify-around py-3">
          <div
            class="user-card__section flex flex-column align-center justify-center"
            v-for="(section, i) in sections"
            :key="i"
          >
            <image
              class="user-card__icon"
              mode="widthFix"
              :src="section.icon"
            />
            <div
              class="gray"
              style="margin: 15rpx 0;"
            >{{ section.label }}</div>
            <div>{{ section.value }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="cell-group mb-2 bg-white">
      <div
        class="cell flex align-center p-3"
        v-for="(cell, i) in cells"
        :key="i"
      >
        <i
          class="iconfont cell-icon mr-3"
          :class="cell.icon"
        ></i>
        <div>{{ cell.title }}</div>
        <i class="iconfont icon-arrow"></i>
      </div>
    </div>
    <div class="cell-group mb-2 bg-white">
      <div class="cell flex align-center p-3">
        <i class="iconfont icon-bind cell-icon mr-3"></i>
        <div>{{ logged ? '取消绑定' : '绑定学号' }}</div>
        <i class="iconfont icon-arrow"></i>
      </div>
    </div>
  </div>
</template>

<script>
const sections = [
  {
    label: '年级',
    value: '--',
    icon: '/static/icons/icon-major.png'
  },
  {
    label: '姓名',
    value: '--',
    icon: '/static/icons/icon-student.png'
  },
  {
    label: '绩点',
    value: '--',
    icon: '/static/icons/icon-grade-point.png'
  }
]
const cells = [
  {
    title: '待开发功能',
    icon: 'icon-block'
  },
  {
    title: '关于本程序',
    icon: 'icon-code'
  },
  {
    title: '更多信息',
    icon: 'icon-list'
  }
]

export default {
  data () {
    return {
      logged: true,
      sections,
      cells
    }
  }
}
</script>

<style scoped>
.main {
  position: relative;
  min-height: calc(100vh - 60rpx);
  padding-top: 60rpx;
}

.banner-bg {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 0;
}

.user-info {
  position: relative;
  z-index: 999;
  padding: 50rpx;
}

.user-content__avater {
  width: 150rpx;
  height: 150rpx;
  margin-right: 40rpx;
  border-radius: 50%;
  background-size: cover;
  overflow: hidden;
}

.user-content__text {
  color: #969696;
}

.nick-name {
  max-width: 300rpx;
  padding: 10rpx 15rpx;
  font-size: 32rpx;
  border-radius: 10rpx;
  overflow: hidden;
}

.user-card {
  margin-top: 40rpx;
  border-radius: 10rpx;
  box-shadow: 0 0 30rpx #ececec;
}

.user-card__header {
  border-bottom: 1rpx solid #ececec;
}

.user-card__icon {
  width: 100rpx;
  height: 100rpx;
}

.cell {
  border-bottom: 1rpx solid #ececec;
}
.cell:last-child {
  border: none;
}

.cell-icon {
  font-size: 40rpx;
}

.icon-arrow {
  margin-left: auto;
}
</style>