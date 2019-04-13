<template>
  <div class="dashboard-editor-container">
    <panel-group :home-data="{
        'btcusdt': {'price': 4545, 'rate': 33.04},
        'eosusdt': {'price': 23, 'rate': -23.99},
        'ethusdt': {'price': 4, 'rate': -0.7},
        'htusdt': {'price': 5, 'rate': 0},
    }"/>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <VueTradingView
        ref="trading"
        :options="trading"
        style="height: 610px"/>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import VueTradingView from 'vue-trading-view'

const trading = {
  autosize: true,
  symbol: 'HUOBI:BTCUSDT',
  interval: 'D',
  timezone: 'Etc/UTC',
  theme: 'Light',
  style: '1',
  locale: 'zh_CN',
  toolbar_bg: '#f1f3f6',
  enable_publishing: false,
  withdateranges: true,
  hide_side_toolbar: false,
  allow_symbol_change: true,
  studies: ['BB@tv-basicstudies']
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    VueTradingView
  },
  data() {
    return {
      trading: trading
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
