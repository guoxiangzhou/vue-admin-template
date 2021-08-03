<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        <div class="top-gap" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        <el-card shadow="never">
          <h1>欢迎登陆</h1>
          <el-divider />
          <el-form :model="loginForm" label-position="left">
            <el-form-item label="邮箱" prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入邮箱地址"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                tabindex="2"
                auto-complete="off"
                show-password
              />
            </el-form-item>

            <el-row>
              <el-col :offset="4" :span="7">
                <el-button type="primary" style="width: 100%" @click="handleLogin">登陆</el-button>
              </el-col>
              <el-col :offset="2" :span="7">
                <el-button style="width: 100%" @click.native.prevent="showRegisterDlg">注册</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="注册账户" width="40%" :close-on-click-modal="false" :visible.sync="showRegisterDialog">
      <el-form :model="registerForm">
        <el-form-item label="邮箱" prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="请输入邮箱地址"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
            tabindex="2"
            auto-complete="off"
            show-password
          />
        </el-form-item>

        <el-form-item label="验证码" prop="verifyCode">
          <el-row :gutter="1" />
          <el-row>
            <el-col :span="6">
              <el-input
                v-model="registerForm.verifyCode"
                type="text"
                placeholder="输入验证码"
                tabindex="3"
                auto-complete="off"
              />
            </el-col>
            <el-col :span="2">
              <el-button @click="getVerifyCode">获取验证码</el-button>
            </el-col>
          </el-row>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showRegisterDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleRegister">注 册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { Message } from 'element-ui'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '8188755@qq.com',
        password: '1Qaz2Wsx.'
      },
      redirect: undefined,

      showRegisterDialog: false,
      registerForm: {
        username: '',
        password: '',
        verifyCode: ''
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$store
        .dispatch('user/login', this.loginForm)
        .then((res) => {
          Message({
            message: '登陆成功',
            type: 'success',
            duration: 5 * 1000
          })
          this.$router.push({ path: this.redirect || '/' })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    showRegisterDlg() {
      this.registerForm.username = '8188755@qq.com'
      this.registerForm.password = '1Qaz2Wsx.'
      this.showRegisterDialog = true
    },
    getVerifyCode() {
      this.$store
        .dispatch('user/getVerifyCode', { username: this.registerForm.username, type: 'register' })
        .then((res) => {
          console.log('获取验证码成功 ')
        })
        .catch((err) => {
          Message({
            message: err,
            type: 'error',
            duration: 5 * 1000
          })
        })
    },
    handleRegister() {
      console.log('handle register: ' + JSON.stringify(this.registerForm))
      this.$store
        .dispatch('user/register', this.registerForm)
        .then((res) => {
          console.log('服务器返回结果 : ' + JSON.stringify(res))
          if (res.code !== 0) {
            Message({
              message: res.data,
              type: 'error',
              duration: 5 * 1000
            })
          } else {
            this.loginForm.username = this.registerForm.username
            this.loginForm.password = this.registerForm.password
            this.showRegisterDialog = false
            Message({
              message: '注册成功',
              type: 'success',
              duration: 5 * 1000
            })
          }
        })
        .catch(() => {
          console.log('注册失败')
        })
    }
  }
}
</script>

<style>
.top-gap {
  border-radius: 4px;
  min-height: 200px;
}
</style>
