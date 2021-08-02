<template>
  <div>
    <div class="app-container">
      <div class="filter-container">
        <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">
          新游戏
        </el-button>
      </div>
    </div>
  </div></template>

<script>
export default {
  name: 'Register',
  data() {
    return {
    }
  },
  methods: {
    handleCreate() {
      console.log('handleCreate!')
    }
  }
}
</script>

<style>

</style>
