<template>
  <div class="main pt-5">
    <i class="iconfont icon-protocol mt-5"></i>
    <div class="protocol mb-2">隐私协议</div>
    <div class="p-5">
      <p>
        「意想课表」尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，我们会按照本隐私权政策的规定使用和披露您的个人信息。
      </p>
      <p>
        我们将以高度的勤勉、审慎义务对待这些信息。在未征得您事先许可的情况下，我们绝不会将这些信息对外披露或向第三方提供。
      </p>
      <p>
        在如下情况下，本应用将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：<br />
        a) 经您事先同意，向第三方披露；<br />
        b) 为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；
      </p>
    </div>
  </div>
</template>

<style>
.main {
  height: 100vh;
  text-align: center;
  background: white;
}

.icon-protocol {
  font-size: 100rpx;
}

.protocol {
  position: relative;
  font-size: 40rpx;
}

.protocol::after {
  content: "";
  position: absolute;
  bottom: -10rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 180rpx;
  height: 12rpx;
  background: #5d97f7;
}

p {
  margin-bottom: 40rpx;
  text-align: justify;
  color: #999999;
}
</style>