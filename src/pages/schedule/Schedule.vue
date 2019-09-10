<template>
  <div class="main">
    <div class="header bg-primary"></div>

    <div class="content">
      <div
        class="to-login flex flex-column align-center justify-center"
        v-if="logged"
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
        >去登录</navigator>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logged: false
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
  height: 125rpx;
}

.content {
  flex: 1;
  height: auto;
  overflow-y: scroll;
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