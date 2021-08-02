<template>
  <div>
    <div class="app-container">
      <div class="filter-container">
        <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">
          新游戏
        </el-button>
      </div>

      <el-divider />

      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Date" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.timestamp }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Author" width="110px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini">
              编辑
            </el-button>
            <el-button v-if="row.status!='published'" size="mini" type="success">
              发布
            </el-button>
            <el-button v-if="row.status!='draft'" size="mini">
              草稿
            </el-button>
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'

export default {
  name: 'Register',
  data() {
    return {
      listLoading: false,
      list: [
        {
          id: 1,
          timestamp: parseTime(450431629957),
          author: 'gxz',
          status: 'published'
        },
        {
          id: 2,
          timestamp: parseTime(450431629957),
          author: 'gxz',
          status: 'draft'
        }
      ]
    }
  },
  methods: {
    getList() {
      this.listLoading = false
    },
    handleCreate() {
      console.log('handleCreate!')
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    getSortClass: function(key) {
      return 'descending'
    }
  }
}
</script>

<style>

</style>
