<template>
  <div class="app-container">
    <div>
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" fit
                :row-class-name="tableRowClassName" style="width: 100%;border: 1px solid #ebeef5;">
        <el-table-column align="center" label='用户名' prop="user">
        </el-table-column>
        <el-table-column label="操作时间" prop="operateTime">
        </el-table-column>
        <el-table-column label="操作设备" align="center" prop="deviceId">
        </el-table-column>
        <el-table-column label="操作指令" align="center" prop="instruction">
        </el-table-column>
      </el-table>
    </div>
    <div style="padding-top: 10px;display: flex;justify-content: flex-end;align-items: center;">
      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left" size="mini" round @click="prePage()">上一页</el-button>
        <el-button disabled  size="mini" plain>{{currentPage}}/{{totalPage}}</el-button>
        <el-button type="primary" size="mini" round @click="nextPage()">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  import { getList } from '@/api/table'

  export default {
    data() {
      return {
        list: null,
        listLoading: true,
        currentPage: 1,
        totalPage: 0
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList(this.currentPage).then(response => {
          this.list = response
          this.totalPage = this.list[0].totalPage
          this.listLoading = false
        })
      },
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex % 2 === 1) {
          return 'odd-row'
        } else {
          return 'even-row'
        }
      },
      prePage(val) {
        if (this.currentPage === 1) {
          return
        }
        this.currentPage--
        this.fetchData()
      },
      nextPage() {
        if (this.currentPage === parseInt(this.totalPage)) {
          return
        }
        this.currentPage++
        this.fetchData()
      }
    }
  }
</script>
<style>
  .el-table .odd-row {
    background: transparent;
  }

  .el-table .even-row {
    background: #f8f8f8;
  }
</style>
