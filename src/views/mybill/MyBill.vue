<template>
  <div class="tost-container">
    <div class="t-head">
      <img :src="left" @click="$router.go(-1)" alt="">
      <img :src="topImg" alt="">
      <div></div>
    </div>
    <div class="head-title">
      <span>{{ i18n.titleText }}</span>
    </div>
    <section>
      <div class="v-licai-container-box g-flex-column">
        <div class="v-licai-head">
          <div class="v-licai-head-list g-flex-align-center">
            <div @click="navItemClick(0)" :class="navTypeVal == 0 ? 'active' : ''"
                 class="v-licai-head-item g-flex-justify-center g-flex-align-center">
              <div class="v-licai-head-item-title">{{ i18n.jiangliHistoryText }}</div>
            </div>
            <div @click="navItemClick(1)" :class="navTypeVal == 1 ? 'active' : ''"
                 class="v-licai-head-item g-flex-justify-center g-flex-align-center">
              <div class="v-licai-head-item-title">{{ i18n.rechargeHistoryText }}</div>
            </div>
            <div @click="navItemClick(2)" :class="navTypeVal == 2 ? 'active' : ''"
                 class="v-licai-head-item g-flex-align-center g-flex-justify-center">
              <div class="v-licai-head-item-title">{{ i18n.cashoutHistoryText }}</div>
            </div>
          </div>
        </div>
        <!-- <div v-show="navTypeVal == 0" @click="searchListPopShow" class="v-my-bill-search-box g-flex-justify-end">
          <div class="v-my-bill-search">
            <span>全部</span>
            <i class="iconfont icon-shixiangxiajiantou-"></i>
          </div>
        </div> -->
        <div class="v-my-bill-container">
          <div v-if="navTypeVal == 0" class="v-my-bill-content">
            <van-list v-show="list.list.length" class="v-list" v-model:loading="loading" :finished="finished"
                      :loading-text="i18n2.loadingText" :finished-text="i18n2.finishText" @load="onLoad" :immediate-check="false">
              <div v-for="(item, index) in list.list" :key="index" class="v-list-item">
                <div class="left">
                  <p>{{ item.title }}</p>
                  <p>{{ item.des }}</p>
                  <p>{{ formatDate(item.create_time, 'YYYY/MM/dd HH:mm:ss') }}</p>
                </div>
                <div :class="inoutClass(item.amount)" class="v-list-item-top-money">
                  {{ Number(item.amount) >= 0 ? ('+' + item.amount) : item.amount }} {{ item.currency }}
                </div>
              </div>
            </van-list>
            <no-list v-show="!list.list.length" />
          </div>

          <div v-if="navTypeVal != 0" class="v-finance-list-box">
            <!-- <van-pull-refresh v-show="listSecond.list.length" v-model="isLoading" :success-text="i18n3.refreshSuccessText" @refresh="onRefresh"> -->
            <van-list v-show="listSecond.list.length" class="v-list" v-model:loading="loading" :finished="finished"
                      :loading-text="i18n2.loadingText" :finished-text="i18n2.finishText" @load="onSecondLoad"
                      :immediate-check="false">
              <div @click="orderItemClick(item)" v-for="(item, index) in listSecond.list" :key="index" class="v-list-item">
                <div class="left">
                  <p>{{ item.title }}</p>
                  <p>{{ i18nc.shouxuFeiText }}: {{item.fee}}</p>
                  <p>{{navTypeVal == 1 ? i18nc.cunkuanNumText:i18nc.qukuanNumText}}: {{item.amount || item.apply_amount}}</p>
                  <p>{{navTypeVal == 1 ? i18nc.rechargeAddressText:i18nc.cashoutAddressText}}: <br/><span>{{item.info.address}}</span></p>
                  <p v-if="item.status == 0 && item.reason" style="color: #C23030;">{{i18nc.shibaiyuanyingText}}: <br/><span>{{item.reason}}</span></p>
                  <p>{{ formatDate(item.create_time, 'MM/DD HH:mm') }}</p>
                </div>
                <div class="right">
                  <p>{{item.amount || item.apply_amount}}</p>
                  <p><span :class="filtersRealStatusClass(item.status)" />{{ filtersRealStatus(item.status ) }}</p>
                </div>
<!--                <div class="v-item-top g-flex-justify-between g-flex-align-center">-->
<!--                  <div class="v-item-top-title">-->
<!--                    {{ item.title }}-->
<!--                  </div>-->
<!--                  <div class="v-item-top-status g-flex-align-center">-->
<!--                    <span :class="filtersRealStatusClass(item.status)">{{ filtersRealStatus(item.status ) }}</span>-->
<!--                    <i class="iconfont icon-you"></i>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="v-item-bottom-list g-flex-align-center">-->
<!--                  <div class="v-bottom-list-item">-->
<!--                    <div class="v-bottom-list-item-title" v-show="navTypeVal == 1">-->
<!--                      {{ i18n3.rechargeBiZhongText }}-->
<!--                    </div>-->
<!--                    <div class="v-bottom-list-item-title" v-show="navTypeVal == 2">-->
<!--                      {{ i18n3.tixianBiZhongText }}-->
<!--                    </div>-->
<!--                    <div class="v-bottom-list-item-val">-->
<!--                      {{ item.currency }}-->
<!--                    </div>-->
<!--                  </div>-->

<!--                  <div class="v-bottom-list-item">-->
<!--                    <div class="v-bottom-list-item-title">-->
<!--                      {{ i18n3.moneyText }}-->
<!--                    </div>-->
<!--                    <div class="v-bottom-list-item-val">-->
<!--                      {{ item.amount }}-->
<!--                    </div>-->
<!--                  </div>-->

<!--                  <div class="v-bottom-list-item g-flex-column g-flex-align-end">-->
<!--                    <div class="v-bottom-list-item-title">-->
<!--                      {{ i18n3.timeText }}-->
<!--                    </div>-->
<!--                    <div class="v-bottom-list-item-val">-->
<!--                      {{ formatDate(item.create_time, 'MM/DD HH:mm') }}-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div @click.stop="cehuiClick(item)" v-show="item.status == 2 && navTypeVal == 2" class="v-item-bottom-btn g-flex-align-center g-flex-justify-center">-->
<!--                  <span>{{ i18n2.cehuitikuanText }}</span>-->
<!--                </div>-->
              </div>
            </van-list>
            <!-- </van-pull-refresh> -->
            <NoList v-show="!listSecond.list.length" />
          </div>
        </div>
      </div>
    </section>
  </div>

<!--  <div class="v_my_bill g-flex-column">-->
<!--    <div class="v-head g-flex-align-center">-->
<!--      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">-->
<!--        <i class="iconfont icon-zuo"></i>-->
<!--      </div>-->
<!--      <div class="v-head-title g-flex-align-center g-flex-justify-center">-->
<!--        <span>{{ i18n.titleText }}</span>-->
<!--      </div>-->
<!--      &lt;!&ndash; <div class="v-head-right g-flex-align-center">-->
<!--        <i class="iconfont icon-datijilu"></i>-->
<!--      </div> &ndash;&gt;-->
<!--    </div>-->
<!--    <div class="v-licai-container-box g-flex-column">-->
<!--      <div class="v-licai-head g-flex-align-center g-flex-justify-center">-->
<!--        <div class="v-licai-head-list g-flex-align-center">-->
<!--          <div @click="navItemClick(0)" :class="navTypeVal == 0 ? 'active' : ''"-->
<!--            class="v-licai-head-item g-flex-justify-center g-flex-align-center">-->
<!--            <div class="v-licai-head-item-title">{{ i18n.jiangliHistoryText }}</div>-->
<!--          </div>-->
<!--          <div @click="navItemClick(1)" :class="navTypeVal == 1 ? 'active' : ''"-->
<!--            class="v-licai-head-item g-flex-justify-center g-flex-align-center">-->
<!--            <div class="v-licai-head-item-title">{{ i18n.rechargeHistoryText }}</div>-->
<!--          </div>-->
<!--          <div @click="navItemClick(2)" :class="navTypeVal == 2 ? 'active' : ''"-->
<!--            class="v-licai-head-item g-flex-align-center g-flex-justify-center">-->
<!--            <div class="v-licai-head-item-title">{{ i18n.cashoutHistoryText }}</div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      &lt;!&ndash; <div v-show="navTypeVal == 0" @click="searchListPopShow" class="v-my-bill-search-box g-flex-justify-end">-->
<!--        <div class="v-my-bill-search">-->
<!--          <span>全部</span>-->
<!--          <i class="iconfont icon-shixiangxiajiantou-"></i>-->
<!--        </div>-->
<!--      </div> &ndash;&gt;-->
<!--      <div class="v-my-bill-container">-->
<!--        <div v-if="navTypeVal == 0" class="v-my-bill-content">-->
<!--          <van-list v-show="list.list.length" class="v-list" v-model:loading="loading" :finished="finished"-->
<!--            :loading-text="i18n2.loadingText" :finished-text="i18n2.finishText" @load="onLoad" :immediate-check="false">-->
<!--            <div v-for="(item, index) in list.list" :key="index" class="v-list-item">-->
<!--              <div class="v-list-item-top g-flex-align-center g-flex-justify-between">-->
<!--                <div class="v-list-item-top-title">-->
<!--                  {{ item.title }}-->
<!--                </div>-->
<!--                <div :class="inoutClass(item.amount)" class="v-list-item-top-money">-->
<!--                  {{ Number(item.amount) >= 0 ? ('+' + item.amount) : item.amount }} {{ item.currency }}-->
<!--                </div>-->
<!--              </div>-->

<!--              <div class="v-list-item-middle g-flex-align-center">-->
<!--                <div class="v-list-item-middle-title">-->
<!--                  {{ item.des }}-->
<!--                </div>-->
<!--              </div>-->

<!--              <div class="v-list-item-bottom g-flex-justify-between g-flex-align-center">-->
<!--                <div class="v-list-item-middle-time">-->
<!--                  {{ formatDate(item.create_time, 'YYYY/MM/dd HH:mm:ss') }}-->
<!--                </div>-->
<!--                &lt;!&ndash; <div class="v-list-item-middle-balance">-->
<!--                {{ i18n.balanceText }}: {{ item.balance }}-->
<!--              </div> &ndash;&gt;-->
<!--              </div>-->

<!--            </div>-->
<!--          </van-list>-->
<!--          <no-list v-show="!list.list.length" />-->
<!--        </div>-->

<!--        <div v-if="navTypeVal != 0" class="v-finance-list-box">-->
<!--          &lt;!&ndash; <van-pull-refresh v-show="listSecond.list.length" v-model="isLoading" :success-text="i18n3.refreshSuccessText" @refresh="onRefresh"> &ndash;&gt;-->
<!--          <van-list v-show="listSecond.list.length" class="v-list" v-model:loading="loading" :finished="finished"-->
<!--            :loading-text="i18n2.loadingText" :finished-text="i18n2.finishText" @load="onSecondLoad"-->
<!--            :immediate-check="false">-->
<!--            <div @click="orderItemClick(item)" v-for="(item, index) in listSecond.list" :key="index" class="v-list-item">-->
<!--              <div class="v-item-top g-flex-justify-between g-flex-align-center">-->
<!--                <div class="v-item-top-title">-->
<!--                  {{ item.title }}-->
<!--                </div>-->
<!--                <div class="v-item-top-status g-flex-align-center">-->
<!--                  <span :class="filtersRealStatusClass(item.status)">{{ filtersRealStatus(item.status ) }}</span>-->
<!--                  <i class="iconfont icon-you"></i>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="v-item-bottom-list g-flex-align-center">-->
<!--                <div class="v-bottom-list-item">-->
<!--                  <div class="v-bottom-list-item-title" v-show="navTypeVal == 1">-->
<!--                    {{ i18n3.rechargeBiZhongText }}-->
<!--                  </div>-->
<!--                  <div class="v-bottom-list-item-title" v-show="navTypeVal == 2">-->
<!--                    {{ i18n3.tixianBiZhongText }}-->
<!--                  </div>-->
<!--                  <div class="v-bottom-list-item-val">-->
<!--                    {{ item.currency }}-->
<!--                  </div>-->
<!--                </div>-->

<!--                <div class="v-bottom-list-item">-->
<!--                  <div class="v-bottom-list-item-title">-->
<!--                    {{ i18n3.moneyText }}-->
<!--                  </div>-->
<!--                  <div class="v-bottom-list-item-val">-->
<!--                    {{ item.amount }}-->
<!--                  </div>-->
<!--                </div>-->

<!--                <div class="v-bottom-list-item g-flex-column g-flex-align-end">-->
<!--                  <div class="v-bottom-list-item-title">-->
<!--                    {{ i18n3.timeText }}-->
<!--                  </div>-->
<!--                  <div class="v-bottom-list-item-val">-->
<!--                    {{ formatDate(item.create_time, 'MM/DD HH:mm') }}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div @click.stop="cehuiClick(item)" v-show="item.status == 2 && navTypeVal == 2" class="v-item-bottom-btn g-flex-align-center g-flex-justify-center">-->
<!--                <span>{{ i18n2.cehuitikuanText }}</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </van-list>-->
<!--          &lt;!&ndash; </van-pull-refresh> &ndash;&gt;-->
<!--          <NoList v-show="!listSecond.list.length" />-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->


    <CashoutDetailPop :typeVal="navTypeVal" ref="refCashoutDetailPop" />

    <!-- <SelectRadioPop :columns="searchList.list" @emitsSelectConfirm="emitsSelectConfirm" :selectVal="form.type" ref="refSelectRadioPop"/> -->
<!--  </div>-->
</template>

<script setup>
// import SelectRadioPop from '@/components/SelectRadioPop.vue'
import CashoutDetailPop from '@/components/CashoutDetailPop.vue'
import { apiMyBillList, apiGetRechargeHistory, apiGetCashoutHistory, apiCeHuiCashOut } from '@/utils/api.js'
import { reactive, ref, computed } from 'vue';
import useStore from '@/store/index.js'
import { useI18n } from "vue-i18n";
import { inoutClass, formatDate, filtersRealStatusClass, dotDealWith  } from '@/utils/index.js'
import { Dialog, Toast } from 'vant';
import left from "@/assets/img/left.png";
import topImg from "@/assets/img/topimg.png";
import history from "@/assets/img/history.png";
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('mybill')
})
const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})
const i18nc = computed(() => {
  return i18nObj.tm('cashoutDetailPop')
})

const i18n3 = computed(() => {
  return i18nObj.tm('finance')
})


function cehuiClick(item) {
  Dialog.confirm({
    title: '',
    message: i18n2.value.cehuitikuanTipsText,
    cancelButtonColor: '#000',
    confirmButtonColor: 'var(--g-main_color)'
  })
    .then(() => {
      apiCeHuiCashOutHandel(item)
    }).catch(() => { });
}

async function apiCeHuiCashOutHandel(item) {
  store.loadingShow = true
  const { success, data } = await apiCeHuiCashOut({ id: item.id })
  if(!success) return
  Toast.success(data.success)
  loading.value = true
  finished.value = false
  form.page = 1
  listSecond.list = []
  apiGetCashoutHistoryHandel()
}
// let searchList = reactive({
//   list: [
//     {
//       title:'全部',
//       val: 1
//     },
//     {
//       title:'奖励',
//       val: 2
//     }
//   ]
// })

// let refSelectRadioPop = ref(null)
// function searchListPopShow() {
//   refSelectRadioPop.value.onShow()
// }


// function emitsSelectConfirm() {

// }

let loading = ref(false)
let finished = ref(false)

let form = reactive({
  page: 1,
  limit: 30,
  type: 0
})

let navTypeVal = ref(0)

let list = reactive({
  list: []
})

apiGetListHandel()

function onLoad() {
  form.page++
  apiGetListHandel()
}

async function apiGetListHandel() {
  store.loadingShow = true
  const { success, data } = await apiMyBillList(form)
  if (!success) return
  list.list = list.list.concat(data.list)
  loading.value = false
  finished.value = data.list.length ? false : true
  console.log(data)
}

function navItemClick(val) {
  if (navTypeVal.value == val) return
  navTypeVal.value = val
  loading.value = true
  finished.value = false
  form.page = 1
  list.list = []
  listSecond.list = []
  if (navTypeVal.value == 0) {
    store.loadingShow = true
    apiGetListHandel()
  }
  else if (navTypeVal.value == 1) {
    store.loadingShow = true
    apiGetRechargeHistoryHandel()
  } else {
    store.loadingShow = true
    apiGetCashoutHistoryHandel()
  }
}

let isLoading = ref(false)

let listSecond = reactive({
  list: []
})

function onRefresh() {
  form.page = 1
  list.list = []
  listSecond.list = []
  if (navTypeVal.value == 1) {
    store.loadingShow = true
    apiGetRechargeHistoryHandel()
  } else {
    store.loadingShow = true
    apiGetCashoutHistoryHandel()
  }
}

function onSecondLoad() {
  form.page++
  if (navTypeVal.value == 1) return apiGetRechargeHistoryHandel()
  apiGetCashoutHistoryHandel()
}

// 获取充值记录
async function apiGetRechargeHistoryHandel() {
  const { success, data } = await apiGetRechargeHistory(form)
  if (!success) return
  listSecond.list = listSecond.list.concat(data.list)
  loading.value = false
  isLoading.value = false;
  finished.value = data.list.length ? false : true
  console.log(data)
}

// 获取提现记录
async function apiGetCashoutHistoryHandel() {
  const { success, data } = await apiGetCashoutHistory(form)
  if (!success) return
  listSecond.list = listSecond.list.concat(data.list)
  isLoading.value = false;
  loading.value = false
  finished.value = data.list.length ? false : true
  console.log(data)
}


const refCashoutDetailPop = ref(null)

function orderItemClick(item) {
  refCashoutDetailPop.value.onShow(item)
}

function filtersRealStatus(status) {
  // status 0 认证失败
  // status 1 认证成功
  // status 2 认证中
  if (status == 0) return i18n3.value.statusFailText
  if (status == 1) return i18n3.value.statusSuccessText
  if (status == 2) return i18n3.value.statusIngText
  if (status == 3) return i18n3.value.statusWaitText
}
</script>

<style lang='scss'>
@import "@/styles/index";
section{
  background: #FFFFFF;
  height: 635px;
  box-shadow: 2px 1px 7px 2px rgba(12,13,12,0.07);
  border-radius: 14px;
  padding: 8px;
  margin: 8px 20px 0;
  .v-licai-container-box{
    height: 100%;
    .v-my-bill-container{
      height: calc(100% - 40px);
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .v-list{
        margin-top: 21px;
      }
      .v-my-bill-content{
        height: 100%;
        .v-list-item{
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #FFFFFF;
          box-shadow: 2px 1px 7px 2px rgba(12,13,12,0.07);
          border-radius: 10px;
          padding: 6px 9px;
          margin-bottom: 15px;
          &:last-child{
            margin-bottom: 0;
          }
          p{
            font-weight: 400;
            font-size: 12px;
            color: #000000;
            &:first-child{
              margin-bottom: 14px;
              font-size: 14px;
              font-weight: bold;
            }
            &:last-child{
              font-weight: 400;
              font-size: 12px;
              margin-top: 10px;
              color: #000000;
              opacity: 0.5;
            }
          }
          .v-list-item-top-money{
            font-weight: bold;
            margin-right: 13px;
            font-size: 20px;
          }
        }
      }
      .v-finance-list-box{
        height: 100%;
        .v-list-item{
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background: #FFFFFF;
          box-shadow: 2px 1px 7px 2px rgba(12,13,12,0.07);
          border-radius: 10px;
          padding: 6px 9px;
          margin-bottom: 36px;
          &:last-child{
            margin-bottom: 0;
          }
          p{
            font-weight: 500;
            font-size: 13px;
            margin-bottom: 4px;
            color: #000000;
            span{
              color:#808080;
            }
            &:first-child{
              margin-bottom: 13px;
              font-size: 14px;
              font-weight: bold;
            }
            &:last-child{
              font-weight: 400;
              font-size: 15px;
              color: #000000;
              margin-top: 10px;
            }
          }
          .v-list-item-top-money{
            font-weight: bold;
            margin-right: 13px;
            font-size: 20px;
          }
          .left{
            span{
              width: 200px;
              display: inline-block;
              word-break: break-all;
            }
          }
          .right{
            p{
              font-weight: bold;
              font-size: 23px;
              color: #C23030;
              &:last-child{
                font-size: 14px;
                color: #000000;
                opacity: 1;
                font-weight: bold;
              }
              span{
                display: inline-block;
                width: 3px;
                height: 11px;
                margin-right: 4px;
                background: #C23030;
                border-radius: 1px;
              }
            }
          }
        }
      }
    }
  }
}
.v_my_bill {
  height: 100%;
  overflow: auto;
  background-color: var(--g-white);
  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    background-color: var(--g-white);
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
      font-weight: 700;
      font-size: 16px;
      color: var(--g-black);
    }
    .v-head-right {
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
      padding: 0 0 0 10px;
      .iconfont {
        font-size: 22px;
        font-weight: 700;
        color: var(--g-black);
      }
    }
  }

  .v-licai-container-box {
    flex: 1;
    overflow: auto;
    padding-top: 50px;
    .v-licai-head {
      height: 60px;
      // position: fixed;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 9;
      .v-licai-head-list {
        border: 1px solid #cfd1d0;
        height: 35px;
        border-radius: 4px;
        overflow: hidden;

        .v-licai-head-item {
          height: 100%;
          width: 116px;
          padding: 0 5px;
          font-weight: 500;
          color: var(--g-less-most-black);
          font-size: 14px;

          .v-licai-head-item-title {
            @include textManyOverflow()
          }

          &.active {
            background-color: var(--g-main_color);
            color: var(--g-white);
            border-radius: 4px;
          }
        }
      }
    }

    .v-my-bill-search-box {
      padding: 0 10px;
      .v-my-bill-search {
        background: #e4e3e3;
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 14px;
      }
    }
    .v-my-bill-container {
      flex: 1;
      overflow: auto;
      color: var(--g-black);


      .v-my-bill-content {
        .v-list {
          .v-list-item {
            padding: 15px;
            border-bottom: 1px solid #dbdada;

            .v-list-item-top {
              .v-list-item-top-title {
                font-size: 16px;
                color: var(--g-black);
              }

              .v-list-item-top-money {
                font-size: 16px;
                flex-shrink: 0;
              }
            }

            .v-list-item-middle {
              padding: 10px 0;
              font-size: 14px;
            }

            .v-list-item-bottom {
              font-size: 14px;
            }
          }
        }
      }

      .v-finance-list-box {
        height: 100%;
        overflow: auto;
        color: var(--g-black);

        .v-list {
          .v-list-item {
            padding: 15px;
            border-bottom: 1px solid #dbdada;

            .v-item-top {
              .v-item-top-title {
                font-size: 16px;
              }

              .v-item-top-status {
                color: #474e5d;
                font-size: 14px;
                .iconfont {
                  font-weight: 700;
                  font-size: 20px;
                }
                img {
                  margin-left: 5px;
                  width: 10px;
                }
              }
            }

            .v-item-bottom-list {
              padding-top: 15px;

              .v-bottom-list-item {
                font-size: 14px;
                flex: 1;

                .v-bottom-list-item-title {
                  color: #c1c1c1;
                }

                .v-bottom-list-item-val {
                  padding-top: 8px;
                  color: var(--g-black);
                }
              }

            }
          }
        }
      }
    }
  }
  .v-item-bottom-btn {
    margin-top: 20px;
    background: var(--g-main_color);
    color: var(--g-white);
    height: 40px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 700;
  }

}
</style>
