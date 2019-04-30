<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="交易对" style="width: 250px; display: inline-block;">
        <el-autocomplete
          v-model="form.symbol"
          :fetch-suggestions="querySearch"
          class="inline-input"
          placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="时间范围" style="display: inline-block; margin-left: 25px">
        <el-date-picker
          v-model="form.dateRange"
          :picker-options="pickerOptions"
          type="datetimerange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right" />
      </el-form-item>
      <el-form-item label="策略选择">
        <el-switch v-model="strategyCon" :active-text="strategy" disabled/>
      </el-form-item>
      <el-form-item label="K线类型-步长">
        <el-radio-group v-model="form.crossInterval">
          <el-radio label="1min"/>
          <el-radio label="5min"/>
          <el-radio label="15min"/>
          <el-radio label="60min"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="K线类型-计算">
        <el-radio-group v-model="form.calculateInterval">
          <el-radio label="1min"/>
          <el-radio label="5min"/>
          <el-radio label="15min"/>
          <el-radio label="60min"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="初始资金" style="width: 250px; display: inline-block;">
        <el-input
          v-model="form.balance"
          placeholder="请输入金额" >
          <span slot="suffix"> USDT </span>
        </el-input>
      </el-form-item>
      <el-form-item label="交易滑点" style="width: 250px; display: inline-block;">
        <el-input
          v-model="form.splitnum"
          placeholder="请输入数字" >
        </el-input>
      </el-form-item>
      <el-form-item label="手续费" style="width: 250px; display: inline-block;">
        <el-input
          v-model="form.fee"
          placeholder="请输入数字" >
          <span slot="suffix"> % </span>
        </el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">开始</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        symbol: '',
        dateRange: '',
        crossInterval: '',
        calculateInterval: '',
        balance: 1000,
        splitnum: 0.002,
        fee: 0.2,
        desc: ''
      },
      strategyCon: true,
      strategy: this.$route.query.strategy,
      adviceSymbol: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  mounted() {
    this.adviceSymbol = this.loadAll()
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    querySearch(queryString, cb) {
      var symbols = this.adviceSymbol
      var results = queryString ? symbols.filter(this.createFilter(queryString)) : symbols
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (symbol) => {
        return (symbol.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll() {
      return [
        { 'value': 'eosusdt' },
        { 'value': 'bchusdt' }
      ]
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

