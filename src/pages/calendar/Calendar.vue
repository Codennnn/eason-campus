<template>
  <div>
    <div
      v-for="(item, key) in imgUrls"
      :key="key"
    >
      <image
        class="mb-1"
        style="width: 100%"
        mode="widthFix"
        :src="item"
        @click="preview(key)"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgUrls: [
        'https://ws1.sinaimg.cn/large/775017f8gy1g6xw8x1g6tj20i90n4jsi.jpg',
        'https://ws1.sinaimg.cn/large/775017f8gy1g6xw97msldj20ib0nf3zi.jpg'
      ]
    }
  },

  mounted () {
    mpvue.setNavigationBarTitle({
      title: '2019-2020 华软校历'
    })
  },

  methods: {
    preview (i) {
      mpvue.previewImage({
        current: this.imgUrls[i],
        urls: this.imgUrls
      })
    }
  }
}
</script>