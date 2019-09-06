<template>
  <div class="loader-part">正在加载中...</div>
</template>

<style>
.loader-part {
  width: 250px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: helvetica, arial, sans-serif;
  text-transform: uppercase;
  font-weight: 900;
  color: #5d97f7;
  letter-spacing: 0.2em;
}
.loader-part::before,
.loader-part::after {
  content: "";
  display: block;
  width: 15px;
  height: 15px;
  background: #5d97f7;
  position: absolute;
  animation: load 0.7s infinite alternate ease-in-out;
}
.loader-part::before {
  top: 0;
}
.loader-part::after {
  bottom: 0;
}

@keyframes load {
  0% {
    left: 0;
    height: 30px;
    width: 15px;
  }
  50% {
    height: 8px;
    width: 40px;
  }
  100% {
    left: 235px;
    height: 30px;
    width: 15px;
  }
}
</style>
