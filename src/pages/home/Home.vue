<template>
  <div class="main">
    <image
      class="banner-img"
      src="/static/images/img-banner.png"
      mode="widthFix"
    />

    <div class="content">
      <div
        v-for="(item, index) in 10"
        :key="index"
      >123</div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
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
</style>