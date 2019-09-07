<template>
  <div class="main">
    <image
      class="banner-bg"
      src="/static/images/mine-bg.png"
      mode="widthFix"
    />

    <div class="user-info">
      <div class="user-content">
        <open-data
          class="user-content__avater"
          type="userAvatarUrl"
        ></open-data>
        <div class="user-content__info">
          <div style="margin-bottom: 30rpx;">
            <open-data
              class="nick-name primary"
              type="userNickName"
              lang="zh_CN"
            ></open-data>
          </div>
          <div>
            <div
              class="user-content__text"
              v-if="logged"
            >
              <span>已绑定Myscse账号</span>
              <i class="iconfont icon-v"></i>
            </div>
            <span
              class="user-content__text"
              v-else
            >未绑定Myscse账号</span>
          </div>
        </div>
      </div>

      <div class="user-card">
        <div class="user-card__header">
          <div>查看个人信息</div>
          <i class="iconfont icon-more"></i>
        </div>
        <div class="user-card__content">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logged: true
    }
  }
}
</script>

<style scoped>
.main {
  position: relative;
  min-height: 100vh;
  padding-top: 90rpx;
}

.banner-bg {
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 0;
}

.user-info {
  position: relative;
  z-index: 999;
  padding: 50rpx;
}

.user-content {
  display: flex;
  align-items: center;
}
.user-content__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.user-content__avater {
  width: 150rpx;
  height: 150rpx;
  margin-right: 40rpx;
  border-radius: 50%;
  background-size: cover;
  background: white;
  overflow: hidden;
}
.user-content__text {
  display: flex;
  align-items: center;
  color: #969696;
}
.nick-name {
  max-width: 200rpx;
  padding: 10rpx 15rpx;
  font-size: 32rpx;
  background: #fff;
  border-radius: 10rpx;
  overflow: hidden;
}

.user-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10rpx 15rpx;
}
.user-card__content {
  display: flex;
  align-items: center;
  /* // padding: 20rpx; */
  justify-content: space-around;
}
</style>