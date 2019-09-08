<template>
  <div class="main">
    <!-- 返回按钮 -->
    <navigator
      open-type="navigateBack"
      url="delta:1"
    >
      <i class="back-icon iconfont icon-back"></i>
    </navigator>

    <!-- 登录表单 -->
    <div class="form flex flex-column align-center justify-center">
      <image
        class="mb-4"
        style="width: 350rpx;"
        src="/static/images/login-illustration.svg"
        mode="widthFix"
      />

      <div
        class="input-item flex align-center mb-3 py-1"
        v-for="(input, i) in inputs"
        :key="i"
      >
        <i
          class="input-icon iconfont mr-1"
          :class="input.icon"
        ></i>
        <input
          :id="input.id"
          :name="input.name"
          :type="input.type"
          :value="input.value"
          :password="input.password"
          :maxlength="input.maxlength"
          :placeholder="input.placeholder"
          :placeholder-class="input.invalid ? 'input-invalid' : ''"
          :style="input.error ? 'color: #ff9595;' : ''"
          @input="enter"
          @focus="focus(i)"
          @blur="blur(i)"
        />
        <i
          v-show="input.focus"
          class="iconfont icon-clear mr-1"
          style="margin-left: auto;"
          @click.stop="clear(i)"
        ></i>
      </div>

      <div style="width: 100%;">
        <button
          class="login-btn mt-1"
          :style="loading ? ' visibility: hidden;' : ''"
          :disabled="disabled"
          @click="login"
        >登 录
        </button>

        <!-- 加载动画 -->
        <div
          style="transform: translateY(-40rpx);"
          v-show="loading"
        >
          <LoaderLine />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStudentInfo, getSchedule } from '@/request/api'

import LoaderLine from '@/components/LoaderLine'

const inputs = [
  {
    id: 'username',
    name: 'username',
    type: 'number',
    icon: 'icon-username',
    placeholder: '请输入Myscse账号',
    value: '',
    maxlength: 12,
    focus: false,
    invalid: false,
    error: false,
    password: false
  },
  {
    id: 'password',
    name: 'password',
    type: 'text',
    icon: 'icon-password',
    placeholder: '请输入密码',
    value: '',
    maxlength: 20,
    focus: false,
    invalid: false,
    error: false,
    password: true
  }
]

export default {
  data () {
    return {
      inputs,
      loading: false
    }
  },

  components: {LoaderLine},

  computed: {
    disabled () {
      return !(
        this.inputs[0].value.length > 0 &&
        this.inputs[1].value.length > 0
      )
    }
  },

  methods: {
    enter (e) {
      const value = e.target.value

      if (e.target.id === 'username') {
        this.inputs[0].value = value.trim()
        this.inputs[0].focus = true
      } else if (e.target.id === 'password') {
        this.inputs[1].value = value.trim()
        this.inputs[1].focus = true
      }
    },

    focus (i) {
      const input = this.inputs[i]
      if (input.value.length > 0) {
        input.focus = true
        input.error = false
      }
    },

    blur (i) {
      this.inputs[i].focus = false
    },

    clear (i) {
      this.inputs[i].value = ''
    },

    async login () {
      const loginData = {
        username: this.inputs[0].value,
        password: this.inputs[1].value
      }
      this.loading = true
      const { code, msg, data } = await getStudentInfo(loginData)
        .catch(err => {
          this.loading = false
          console.log(err)
        })

      if (code === 1000) {
        const res = await getSchedule(loginData)
        if (res.code === 1000) {
          mpvue.setStorageSync('user', loginData)
          mpvue.setStorageSync('info', data.info)
          mpvue.setStorageSync('schedule', res.data.courses)
          wx.navigateBack()
        } else {
          wx.showToast({title: res.msg, icon: 'none'})
        }
      } else if (code === 2003) {
        this.inputs[0].error = true
        wx.showToast({title: msg, icon: 'none'})
      } else if (code === 2002) {
        this.inputs[1].error = true
        wx.showToast({title: msg, icon: 'none'})
      } else {
        wx.showToast({title: msg, icon: 'none'})
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
.main {
  min-height: 100vh;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-back {
  position: fixed;
  top: 65rpx;
  left: 35rpx;
  font-size: 55rpx;
}

.form {
  width: 60%;
  transform: translateY(-50rpx);
}

.input-icon {
  font-size: 45rpx;
}

.input-invalid {
  color: #ff9595;
}

.input-item {
  width: 100%;
  border-bottom: 1rpx solid #ddd;
}

.login-btn {
  width: 100%;
  color: #fff;
  background: #4285f4;
  font-size: 32rpx;
}
</style>