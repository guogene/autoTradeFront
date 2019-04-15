<template>
  <div class="dashboard-editor-container">
    <panel-group :home-data="homeData"/>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <VueTradingView ref="trading" :options="tradingViewOption" style="height: 610px"/>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import VueTradingView from 'vue-trading-view2'
import { getHomeData } from '@/api/trade'

const tradingViewOption = {
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
      tradingViewOption: tradingViewOption,
      homeData: {
        btcusdt: { price: 0, rate: 0 },
        eosusdt: { price: 0, rate: 0 },
        ethusdt: { price: 0, rate: 0 },
        htusdt: { price: 0, rate: 0 }
      }
    }
  },
  mounted() {
    this.setHomeData()
    this.heatInterval = setInterval(this.setHomeData, 1000)
  },
  beforeDestroy() {
    clearInterval(this.heatInterval)
  },
  methods: {
    setHomeData() {
      getHomeData().then(reponse => {
        const data = reponse.data
        this.homeData = data
      })
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
