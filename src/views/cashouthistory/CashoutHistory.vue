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
      <van-tabs line-height="2px" color="#644FDC" title-inactive-color="#000" title-active-color="#644FDC"
                background="var(--g-main-bgColor)" class="v-licai-head g-flex-align-center" @change="headNavItemClick"
                :ellipsis="false" v-model:active="form.status">
        <van-tab title-class="v-history-nav-list-item-title" :name="''" :title="i18n.statusAllText">
        </van-tab>
        <van-tab title-class="v-history-nav-list-item-title" :name="2" :title="i18n.statusIngText">
        </van-tab>
        <van-tab title-class="v-history-nav-list-item-title" :name="1" :title="i18n.statusSuccessText">
        </van-tab>
        <van-tab title-class="v-history-nav-list-item-title" :name="0" :title="i18n.statusFailText">
        </van-tab>
      </van-tabs>
      <div class="v-my-bill-container">
        <div class="v-finance-list-box" style="height: 100%">
          <!-- <van-pull-refresh v-show="list.list.length" v-model="isLoading" :success-text="i18n.refreshSuccessText" @refresh="onRefresh"> -->
          <van-list v-show="list.list.length" class="v-list" v-model:loading="loading" :finished="finished"
                    :loading-text="i18n2.loadingText" :finished-text="i18n2.finishText" @load="onLoad"
                    :immediate-check="false">
            <!--          <div @click="orderItemClick(item)" v-for="(item, index) in list.list" :key="index" class="v-list-item">-->
            <!--            <div class="v-item-top g-flex-justify-between g-flex-align-center">-->
            <!--              <div class="v-item-top-title">-->
            <!--                {{ item.title }}-->
            <!--              </div>-->
            <!--              <div class="v-item-top-status g-flex-align-center">-->
            <!--                <span :class="filtersRealStatusClass(item.status)">{{ filtersRealStatus(item.status ) }}</span>-->
            <!--                <i class="iconfont icon-you"></i>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <div class="v-item-bottom-list g-flex-align-center">-->
            <!--              <div class="v-bottom-list-item">-->
            <!--                <div class="v-bottom-list-item-title">-->
            <!--                  {{ i18n.cashoutBiZhongText }}-->
            <!--                </div>-->

            <!--                <div class="v-bottom-list-item-val">-->
            <!--                  {{ item.currency }}-->
            <!--                </div>-->
            <!--              </div>-->

            <!--              <div class="v-bottom-list-item">-->
            <!--                <div class="v-bottom-list-item-title">-->
            <!--                  {{ i18n.moneyText }}-->
            <!--                </div>-->
            <!--                <div class="v-bottom-list-item-val" v-show="store.system.WithdrawModel == 1">-->
            <!--                  {{ item.amount }}-->
            <!--                </div>-->
            <!--                <div class="v-bottom-list-item-val" v-show="store.system.WithdrawModel == 2">-->
            <!--                  {{ item.apply_amount }}-->
            <!--                </div>-->
            <!--              </div>-->

            <!--              <div class="v-bottom-list-item g-flex-column g-flex-align-end">-->
            <!--                <div class="v-bottom-list-item-title">-->
            <!--                  {{ i18n.timeText }}-->
            <!--                </div>-->
            <!--                <div class="v-bottom-list-item-val">-->
            <!--                  {{ formatDate(item.create_time, 'MM/DD HH:mm') }}-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->

            <!--            <div class="v-item-bottom-fail" v-if="item.status == 0 && item.reason">-->
            <!--              {{ i18n.failRemarkText }}: {{ item.reason }}-->
            <!--            </div>-->

            <!--            <div @click.stop="cehuiClick(item)" v-show="item.status == 2" class="v-item-bottom-btn g-flex-align-center g-flex-justify-center">-->
            <!--              <span>{{ i18n2.cehuitikuanText }}</span>-->
            <!--            </div>-->
            <!--          </div>-->
            <div @click="orderItemClick(item)" v-for="(item, index) in list.list" :key="index" class="v-list-item">
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
          <NoList v-show="!list.list.length" />
        </div>
      </div>
    </section>
<!--  </div>-->
    <div class="v-history-container g-flex-column">


      <CashoutDetailPop :typeVal="navTypeVal" ref="refCashoutDetailPop" />
    </div>
  </div>
</template>

<script setup>
import CashoutDetailPop from '@/components/CashoutDetailPop.vue'
import { apiGetCashoutHistory, apiCeHuiCashOut } from '@/utils/api.js'
import { reactive, ref, computed } from 'vue';
import useStore from '@/store/index.js'
import { useI18n } from "vue-i18n";
import { inoutClass, formatDate, filtersRealStatusClass, dotDealWith } from '@/utils/index.js'
import { Dialog, Toast } from 'vant';
import left from "@/assets/img/left.png";
import topImg from "@/assets/img/topimg.png";
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('cashoutHistory')
})
const i18nc = computed(() => {
  return i18nObj.tm('cashoutDetailPop')
})
const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
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
    }).catch(() => {});
}

async function apiCeHuiCashOutHandel(item) {
  store.loadingShow = true
  const { success, data } = await apiCeHuiCashOut({ id: item.id })
  if(!success) return
  Toast.success(data.success)
  headNavItemClick()
  console.log(data)
}

let loading = ref(false)
let finished = ref(false)

let form = reactive({
  page: 1,
  limit: 30,
  status: ''
})

let list = reactive({
  list: []
})

// navTypeVal 提现
let navTypeVal = ref(2)

apiGetListHandel()

function onLoad() {
  form.page++
  apiGetListHandel()
}

// 获取充值记录
async function apiGetListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetCashoutHistory(form)
  if (!success) return
  list.list = list.list.concat(data.list)
  loading.value = false
  finished.value = data.list.length ? false : true
  console.log(data)
}

function headNavItemClick() {
  form.page = 1
  list.list = []
  loading.value = true
  finished.value = false
  apiGetListHandel()
}

const refCashoutDetailPop = ref(null)

function orderItemClick(item) {
  refCashoutDetailPop.value.onShow(item)
}

function filtersRealStatus(status) {
  // status 0 认证失败
  // status 1 认证成功
  // status 2 认证中
  if (status == 0) return i18n.value.statusFailText
  if (status == 1) return i18n.value.statusSuccessText
  if (status == 2) return i18n.value.statusIngText
  if (status == 3) return i18n.value.statusWaitText
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
  //.v-licai-container-box{
  //  height: 100%;
    .v-my-bill-container{
      height: calc(100% - 40px);
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .v-list{
        margin-top: 21px;
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
                text-align: right;
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
//}


.v_cashout_history {
  height: 100%;
  overflow: auto;
  background-color: var(--g-white);
  padding-bottom: 10px;
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
      .iconfont {
        font-size: 22px;
        color: var(--g-black);
      }
    }
  }

  .v-history-container {
    flex: 1;
    overflow: auto;
    padding-top: 50px;

    .v-history-nav-list {
      width: 100%;
      overflow: auto;

      .van-tabs__wrap {
        width: 100%;
      }

      .v-history-nav-list-item-title {
        font-size: 14px;
      }
    }
    .v-finance-list-box {
      flex: 1;
      overflow: auto;
      color: #111;

      .v-list {
        .v-list-item {
          padding: 15px;
          border-bottom: 1px solid #e4e7ed;

          .v-item-top {
            .v-item-top-title {
              font-size: 16px;
              color: var(--g-black);
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
                color: #9c9c9c;
              }

              .v-bottom-list-item-val {
                padding-top: 8px;
                color: var(--g-black);
              }
            }

          }

          .v-item-bottom-fail {
            font-size: 14px;
            color: var(--g-red);
            padding-top: 15px;
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
