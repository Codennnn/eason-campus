<template>
  <div class="main">
    <div>
      <p>本程序基于 mpvue 开发，源码已发布于码云</p>
      <p class="gray url mt-1">项目地址：https://gitee.com/chinesee/mpvue-hr</p>
      <div class="text-center py-4">
        <image
          class="img"
          style="width: 100%;"
          mode="widthFix"
          :src="imgs[0]"
          @click="preview(0)"
        />
      </div>
      <p class="mt-1">信息获取接口由 Node 爬虫服务提供</p>
      <p class="gray url mt-1">项目地址：https://gitee.com/chinesee/egg-spider</p>
      <div class="text-center py-4">
        <image
          class="img"
          style="width: 100%;"
          mode="widthFix"
          :src="imgs[1]"
          @click="preview(1)"
        />
      </div>
      <p class="my-3">欢迎克隆学习，开发不易，留个⭐️</p>

      <div class="recruitment py-3 px-2">
        <div style="line-height: 45rpx;">
          寻项目维护者，如有意可私信开发者 😀 <br />
          Wechat：czc12580520（令狐聪） <br />
          QQ：1559162803
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgs: [
        'https://gitee.com/chinesee/images/raw/master/img/img_002.png',
        'https://gitee.com/chinesee/images/raw/master/img/img_003.png'
      ]
    }
  },

  methods: {
    preview (i) {
      mpvue.previewImage({
        current: this.imgs[i],
        urls: this.imgs
      })
    }
  }
}
</script>

<style scoped>
.main {
  padding: 35rpx 30rpx;
  background: white;
  font-size: 28rpx;
}

.url {
  font-size: 26rpx;
}

.img {
  box-shadow: 0 0 20rpx #ececec;
}

.recruitment {
  border-radius: 15rpx;
  color: #aaaaaa;
  background: #ececec;
  line-height: 35rpx;
}
</style>