<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-form label-position="left" label-width="80px" :model="formLabelAlign">
          <el-form-item label="邮箱地址">
            <el-input v-model="formLabelAlign.name" />
          </el-form-item>
          <el-form-item label="验证码">
            <el-row>
              <el-col span="17">
                <el-input v-model="formLabelAlign.region" />
              </el-col>
              <el-col offset="1" span="4">
                <el-button type="info">信息按钮</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formLabelAlign.type" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      formLabelAlign: {
        name: 'xxx',
        region: 'xxxx',
        type: 'xxxx'
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style>

</style>
