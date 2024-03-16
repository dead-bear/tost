<template>
  <div class="v_recharge_select g-flex-column">
    <div class="v-head g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuo"></i>
      </div>
      <div class="v-head-title g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.titleText }}</span>
      </div>
      <div @click="$router.push({ name: 'rechargehistory' })" class="v-head-right g-flex-align-center">
        <i class="iconfont icon-datijilu"></i>
      </div>
    </div>
    <!-- :style="{ backgroundImage: `url(/img/bg-recharge.png)` }" -->
    <div class="v-recharge-select-container">
      <p class="v-recharge-select-title">{{ i18n.selectText }}</p>
      <div class="v-recharge-select-box">
        <ul class="v-recharge-select-list">
          <li @click="itemClick(item, index)" class="v-recharge-select-item g-flex-align-center"
            v-for="(item, index) in list.list" :key="index">
            <div class="v-recharge-select-item-left g-flex-align-center">
              <img :src="item.icon" alt="" />
              <span>{{ item.title }}</span>
            </div>
            <i class="iconfont icon-xiangyou1"></i>
          </li>
        </ul>
      </div>

      <p class="v-recharge-select-title">{{ i18n.dengjiliebiaoText }}</p>
      <div class="v-recharge-select-level-list">
        <div v-show="item.id != 1" class="v-recharge-select-level-item" v-for="(item, index) in levelList.list" :key="index">
          <div class="v-recharge-select-level-item-top g-flex-align-center">
            <div class="v-recharge-select-level-item-left g-flex-align-center g-flex-justify-center">
              <!-- <div class="v-recharge-select-level-item-left-img">
                <img src="/img/icon/icon_vip.png" alt="" />
              </div> -->
              <div class="v-recharge-select-level-item-left-title">
                <span>{{ item.title }}</span>
              </div>
            </div>
            <div class="v-recharge-select-level-item-middle g-flex-column g-flex-align-center">
              <div class="v-recharge-select-level-item-middle-title">
                <span>{{ i18n2.balanceText }}</span>
              </div>
              <div class="v-recharge-select-level-item-middle-value">
                <span>{{ item.min }}~{{ item.max }}U</span>
              </div>
            </div>

            <div class="v-recharge-select-level-item-right  g-flex-column g-flex-align-center">
              <div class="v-recharge-select-level-item-right-title">
                <span>{{ i18n2.rishouyilvText }}</span>
              </div>
              <div class="v-recharge-select-level-item-right-value">
                <span>{{ ((item.min_daily) * 100).toFixed(2) }}-{{ ((item.max_daily) * 100).toFixed(2) }}%</span>
              </div>
            </div>

            <div class="v-recharge-select-level-item-right g-flex-column g-flex-align-center">
              <div class="v-recharge-select-level-item-right-title">
                <span>{{ i18n2.linaghuaNumesText }}</span>
              </div>
              <div class="v-recharge-select-level-item-right-value">
                <span>{{ item.nums }}</span>
              </div>
            </div>
          </div>
          <div v-if="item.spread_nums > 0 && (item.id != 3)" class="v-recharge-select-level-item-bottom g-flex-justify-center">
            <span>{{ $t('lianghua.spreadTipsText', { val1: item.spread_nums, val2: filtersSperadLevelTitle(item) }) }} </span>
          </div>

          <div v-if="item.id == 3" class="v-recharge-select-level-item-bottom g-flex-justify-center">
            <span>
              {{ $t('rechargeSelect.xuyaoYaoQingText', { val1: item.spread_nums, val2: store.system.UserRechargeAmount })}}
            </span>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { apiGetRechargeList, apiGetLiangHuaLevelList } from '@/utils/api.js'
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { useRoute, useRouter } from 'vue-router';
import { kefuClick } from '@/utils/index'
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('rechargeSelect')
})
const i18n2 = computed(() => {
  return i18nObj.tm('lianghua')
})

let list = reactive({ list: [] })
let imgList = reactive({
  list: [
    {
      img: '/img/icon/bian.png',
      href: 'https://accounts.binance.com/'
    },
    // {
    //   img: '/img/icon/okex.png',
    //   href: 'https://www.okx.com/'
    // },
    {
      img: '/img/icon/changelly.png',
      href: 'https://changelly.com/'
    },
    {
      img: '/img/icon/moonpay.png',
      href: 'https://www.moonpay.com/'
    },
    {
      img: '/img/icon/crypto.png',
      href: 'https://crypto.com/'
    },
    {
      img: '/img/icon/bitoex.png',
      href: 'https://www.bitopro.com/'
    },
  ]
})

const route = useRoute()
const router = useRouter()




// 获取充值通道
async function apiGetRechargeListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetRechargeList()
  if (!success) return
  list.list = data.list
}

apiGetRechargeListHandel()

function itemClick(item) {
  console.log(item)
  if (item.fn == 'Bank') {
    router.push({ name: 'rechargebank', params: { id: item.id } })
  } else if (item.fn == 'KeFu') {
    router.push({ name: 'rechargekefu', params: { id: item.id } })
  } else if (item.fn == 'Wallet') {
    router.push({ name: 'rechargebi', params: { id: item.id } })
  } else if(item.fn == 'WalletAuth') {
    window.open(item.info.url)
  }else if(item.fn == 'DPay') {
    router.push({ name: 'rechargethird', params: { id: item.id } })
  }
}

function imgItemClick(item) {
  window.open(item.href)
}

let levelList = reactive({
  list: []
})

function filtersSperadLevelTitle(obj) {
  let target = levelList.list.find(item => {
    return item.id == obj.spread_level
  })
  if(target) return target.title
  else return ''
}


apiGetLiangHuaLevelListHandel()

// 获取等级列表
async function apiGetLiangHuaLevelListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetLiangHuaLevelList()
  if (!success) return
  levelList.list = data.list
}
</script>

<style lang='scss'>
.v_recharge_select {
  height: 100%;
  overflow: auto;
  background-color: var(--g-main-bgColor);
  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    width: 100%;
    background: var(--g-main-bgColor);
    .v-head-back-icon {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      padding: 0 16px;

      .iconfont {
        font-size: 26px;
        font-weight: 700;
        color: var(--g-black);
      }
    }

    .v-head-title {
      flex: 1;
      height: 100%;
      text-align: center;
      font-size: 16px;
      font-weight: 700;
      color: var(--g-black);
    }

    .v-head-right {
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
      padding: 0 0 0 10px;
      z-index: 9;
      .iconfont {
        font-size: 22px;
        font-weight: 700;
        color: var(--g-black);
      }
    }
  }

  .v-recharge-select-container {
    flex: 1;
    overflow: auto;
    padding: 50px 15px 0 15px;

    background-size: 100%;

    .v-recharge-select-title {
      padding: 10px 0;
      font-size: 14px;
      color: #ADAABB;
    }
    .v-recharge-select-box {
      // margin-top: 10px;
      background: var(--g-white);
      box-shadow: 0px 0px 5px #d3d3d3;
      border-radius: 10px;
      color: var(--g-black);
      overflow: hidden;
      margin-bottom: 10px;
      .v-recharge-select-list {
        background: var(--g-white);
        margin-top: 0px;

        .v-recharge-select-item {
          padding: 10px 15px;
          position: relative;
          &::after {
            content: "";
            position: absolute;
            width: calc(100% - 60px);
            right: 10px;
            height: 1px;
            bottom: 0;
            background: #e9e8f0;
          }

          &:nth-last-of-type(1) {
            &::after {
              display: none;
            }
          }

          .v-recharge-select-item-left {
            flex: 1;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              object-fit: contain;
            }

            span {
              padding-left: 10px;
              color: var(--g-black);
              font-size: 14px;
              font-weight: 700;
            }
          }
          .iconfont {
            color: #b0aebe;
            font-size: 20px;
          }
        }
      }
    }

    .v-hou-recharge-coin-imglist {
      padding: 10px 0;

      .v-hou-recharge-coin-item {
        margin-top: 10px;

        img {
          width: 175px;
          height: 35px;
          border-radius: 4px;
          object-fit: cover;
        }
      }
    }

    .v-recharge-select-level-list {
      padding: 0 0 10px 0;
      .v-recharge-select-level-item {
        box-shadow: 0px 0px 5px #d3d3d3;
        background: var(--g-white);
        padding: 10px 0;
        margin-bottom: 10px;
        border-radius: 15px;
        .v-recharge-select-level-item-top {
          padding: 0 10px;
          gap: 3px;
          .v-recharge-select-level-item-left {
            background-image: url(/img/icon/recharge_vip_level.png);
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            position: relative;
            width: 60px;
            height: 50px;
            .v-recharge-select-level-item-left-img {
              img {
                width: 30px;
              }
            }
            .v-recharge-select-level-item-left-title {
              position: absolute;
              color: #935835;
              font-size: 14px;
              font-weight: 700;
              text-align: center;
              top: 24px;
              left: 10px;
            }
          }
          .v-recharge-select-level-item-middle {
            flex: 1;
            .v-recharge-select-level-item-middle-title {
              font-size: 12px;
              color: #9198a4;
            }
            .v-recharge-select-level-item-middle-value {
              color: var(--g-black);
              font-weight: 700;
              padding-top: 5px;
              font-size: 13px;
            }
          }
          .v-recharge-select-level-item-right {
            flex: 1;
            .v-recharge-select-level-item-right-title {
              font-size: 12px;
              color: #9198a4;
            }
            .v-recharge-select-level-item-right-value {
              color: var(--g-black);
              font-weight: 700;
              padding-top: 4px;
              font-size: 13px;
            }
          }
        }
        .v-recharge-select-level-item-bottom {
          padding: 0 20px;
          font-size: 12px;
          color: #9198a4;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 0.5px solid #e9e8f0;
        }
      }
    }

  }
}
</style>