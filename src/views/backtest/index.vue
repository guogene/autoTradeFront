<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="策略名称"
        style="width: 300px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.importance"
        placeholder="推荐星级"
        clearable
        style="width: 180px"
        class="filter-item"
      >
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序列" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="策略名称" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleFetchPv(row.description)">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="推荐星级" width="80px">
        <template slot-scope="scope">
          <svg-icon
            v-for="n in +scope.row.importance"
            :key="n"
            icon-class="star"
            class="meta-item__icon"
          />
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-waves size="mini" @click="buildTest(row)">进行回测</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogPvVisible" title="简介">
      <span style="font-size: 14px">{{ description }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'

export default {
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        development: 'gray',
        unused: 'danger'
      }
      return statusMap[status]
    },
    parseTime
  },
  data() {
    return {
      listLoading: true,
      tableKey: 0,
      list: null,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined
      },
      importanceOptions: [1, 2, 3],
      dialogFormVisible: false,
      dialogStatus: '',
      dialogPvVisible: false,
      description: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleFetchPv(des) {
      this.description = des
      this.dialogPvVisible = true
    },
    buildTest(row) {
      this.$router.push({ path: '/backtest/build', query: { strategy: row.title }})
    }
  }
}
</script>

<style lang="scss" scoped>
.link-type {
  color: #337ab7;
  cursor: pointer
}
</style>
