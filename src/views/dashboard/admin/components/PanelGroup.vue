<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="bitcoin" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">BTC</div>
          <span class="price">{{ homeData.btcusdt.price }}</span>
          <span
            :class="homeData.btcusdt.rate >= 0 ? 'rate-green' : 'rate-red'"
            style
          >{{ homeData.btcusdt.rate }}%</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="eos" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">EOS</div>
          <span class="price">{{ homeData.eosusdt.price }}</span>
          <span
            :class="homeData.eosusdt.rate >= 0 ? 'rate-green' : 'rate-red'"
            style
          >{{ homeData.eosusdt.rate }}%</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="eth" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">ETH</div>
          <span class="price">{{ homeData.ethusdt.price }}</span>
          <span
            :class="homeData.ethusdt.rate >= 0 ? 'rate-green' : 'rate-red'"
            style
          >{{ homeData.ethusdt.rate }}%</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="ht" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">HT</div>
          <span class="price">{{ homeData.htusdt.price }}</span>
          <span
            :class="homeData.htusdt.rate >= 0 ? 'rate-green' : 'rate-red'"
            style
          >{{ homeData.htusdt.rate }}%</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
    homeData: {
      type: Object,
      default: () => {
        return {
          btcusdt: { price: 0, rate: 0 },
          eosusdt: { price: 0, rate: 0 },
          ethusdt: { price: 0, rate: 0 },
          htusdt: { price: 0, rate: 0 }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3;
    }
    .price {
      font-size: 22px;
      color: #666;
      margin-top: 10px;
    }
    .rate-green {
      font-size: 18px;
      margin-left: 25px;
      color: green;
    }
    .rate-red {
      font-size: 18px;
      margin-left: 25px;
      color: red;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
