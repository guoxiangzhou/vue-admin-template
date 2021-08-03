<template>
  <div>
    <div class="app-container">
      <div class="filter-container">
        <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="clickNewGameButton">
          创建应用
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

    <el-dialog title="新应用" width="40%" :close-on-click-modal="false" :visible.sync="showNewGameDialog">
      <el-form :model="newGameForm">
        <el-form-item label="应用名称" prop="game_name">
          <el-input
            v-model="newGameForm.game_name"
            placeholder="请输入应用名称"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showNewGameDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleCreate">创 建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { Message } from 'element-ui'

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
      ],
      showNewGameDialog: false,
      newGameForm: {
        game_name: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.$store
        .dispatch('user/listGame')
        .then((res) => {
          this.listLoading = false
          console.log('服务器返回结果 : ' + JSON.stringify(res))
          if (res.code !== 0) {
            Message({
              message: res.data,
              type: '获取失败',
              duration: 5 * 1000
            })
          } else {
            Message({
              message: '获取成功',
              type: 'success',
              duration: 5 * 1000
            })
          }
        })
        .catch(() => {
          console.log('获取失败')
          this.listLoading = false
        })
    },
    clickNewGameButton() {
      this.showNewGameDialog = true
    },
    handleCreate() {
      this.$store
        .dispatch('user/newGame', this.newGameForm)
        .then((res) => {
          if (res.code !== 0) {
            Message({
              message: res.data,
              type: '创建失败',
              duration: 5 * 1000
            })
          } else {
            Message({
              message: '创建成功',
              type: 'success',
              duration: 5 * 1000
            })
          }
        })
        .catch(() => {
          console.log('创建失败')
        })
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
