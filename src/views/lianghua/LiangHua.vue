<template>
  <div class="v_liang_hua g-flex-column">
    <div class="v-head g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuo"></i>
      </div>
      <div class="v-head-title g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.titleText }}</span>
      </div>
      <div @click="$router.push({ name: 'lianghuahistory' })" class="v-head-right g-flex-align-center">
        <i class="iconfont icon-datijilu"></i>
      </div>
    </div>
    <div class="v-liang-hua-container">
      <!-- {{ totalInfo.balance }} {{ totalInfo.todayProfit }} {{ totalInfo.totalProfit }}-->
      <div class="v-liang-hua-top">
        <div class="v-liang-hua-top-title-list g-flex-align-center">
          <div class="v-liang-hua-top-title-item">
            <div class="v-lianghua-top-title">
              <span>{{ i18n.kelianghuaMoneyText }}</span>
            </div>
            <div class="v-lianghua-top-balance">
              <span class="v-lianghua-top-balance-value">{{ totalInfo.balance }}</span>
              <span class="v-lianghua-top-balance-danwei">USDT</span>
            </div>
          </div>

          <!-- <div class="v-liang-hua-top-title-item">
            <div class="v-lianghua-top-title">
              <span>{{ i18n.tiyanYuErText }}</span>
            </div>
            <div class="v-lianghua-top-balance">
              <span class="v-lianghua-top-balance-value">{{ Number(userInfo.giftAmount).toFixed(2) }}</span>
              <span class="v-lianghua-top-balance-danwei">USDT</span>
            </div>
          </div> -->
        </div>

        <div class="v-lianghua-top-btn-list g-flex-align-center g-flex-justify-between">
          <div @click="router.push({ name: 'lianghuahistory' })"
            class="v-lianghua-top-btn-item v-lianghua-top-btn-item-recharge g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.linaghuaShouruMingXiText }}</span>
          </div>
          <div @click="router.push({ name: 'myteam' })"
            class="v-lianghua-top-btn-item v-lianghua-top-btn-item-cashout g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.tuanduiShouruMingXiText }}</span>
          </div>
        </div>
      </div>

      <div class="v-liang-hua-card-box">
        <div class="v-liang-hua-card g-flex-align-center">
          <div class="v-liang-hua-card-item g-flex-column g-flex-align-center">
            <div class="v-liang-hua-card-item-value">
              <span>{{ totalInfo.todayQuantifyProfit }}</span>
            </div>
            <div class="v-liang-hua-card-item-title">
              <span>{{ i18n.jinriShouYiText }}</span>
            </div>
          </div>

          <div class="v-liang-hua-card-item g-flex-column g-flex-align-center">
            <div class="v-liang-hua-card-item-value">
              <span>{{ Number(totalInfo.monthQuantifyProfit).toFixed(2) }}</span>
            </div>
            <div class="v-liang-hua-card-item-title">
              <span>{{ i18n.benyueShouYiText }}</span>
            </div>
          </div>

          <div class="v-liang-hua-card-item g-flex-column g-flex-align-center">
            <div class="v-liang-hua-card-item-value">
              <span>{{ Number(totalInfo.quantifyProfit).toFixed(2) }}</span>
            </div>
            <div class="v-liang-hua-card-item-title">
              <span>{{ i18n.lianghuaZongShouYiText }}</span>
            </div>
          </div>
        </div>
        <div class="v-liang-hua-card g-flex-align-center">
          <div class="v-liang-hua-card-item g-flex-column g-flex-align-center">
            <div class="v-liang-hua-card-item-value">
              <span>{{ Number(totalInfo.todayRebateAmount).toFixed(2) }}</span>
            </div>
            <div class="v-liang-hua-card-item-title">
              <span>{{ i18n.jinriTuanDuiText }}</span>
            </div>
          </div>
          <div class="v-liang-hua-card-item g-flex-column g-flex-align-center">
            <div class="v-liang-hua-card-item-value">
              <span>{{ Number(totalInfo.monthRebateAmount).toFixed(2) }}</span>
            </div>
            <div class="v-liang-hua-card-item-title">
              <span>{{ i18n.benyueTuanDuiText }}</span>
            </div>
          </div>

          <div class="v-liang-hua-card-item g-flex-column g-flex-align-center">
            <div class="v-liang-hua-card-item-value">
              <span>{{ Number(totalInfo.rebateAmount).toFixed(2) }}</span>
            </div>
            <div class="v-liang-hua-card-item-title">
              <span>{{ i18n.tuanduiZongShouYiText }}</span>
            </div>
          </div>
        </div>

        <!-- v-show="userInfo.status != 3 && userInfo.status != 5"  -->
        <div class="v-liang-hua-card-btn-box g-flex-align-center g-flex-justify-center">
          <div @click="apiStartLiangHuaHandel" v-show="userInfo.level.taskStatus == 0"
            class="v-liang-hua-card-btn g-flex-align-center g-flex-justify-center">
            <!-- <span>{{ i18n.danciqidongText }}({{ userInfo.level.todayNums }})</span> -->
            <!-- <span>{{ i18n.danciqidongText }}({{ userInfo.level.shengyuNums }}/{{ userInfo.level.nums }})</span> -->
            <span>{{ i18n.danciqidongText }}({{ userInfo.level.todayNums }}/{{ userInfo.level.nums }})</span>
          </div>
          <div v-show="userInfo.level.taskStatus == 1"
            class="v-liang-hua-card-btn-ing g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.lianghuaIngText }}</span>
          </div>
        </div>

        <div v-show="userInfo.level.taskStatus == 1" class="v-liang-hua-step-box">
          <van-steps class="v-liang-hua-step" direction="vertical" :active="activeVal" active-icon="success"
            active-color="#644FDC">
            <van-step v-show="activeVal >= item.status" v-for="(item, index) in stepList">
              <span v-show="activeVal <= item.status">{{ item.title }}</span>
              <span v-show="activeVal > item.status">{{ item.title2 }}</span>
              <i v-if="activeVal == item.status" class="iconfont icon-loading"></i>
            </van-step>
          </van-steps>
        </div>
      </div>

      <div class="v-liang-hua-bottom">
        <div class="v-liang-hua-bottom-title g-flex-align-center">
          <div class="v-liang-hua-bottom-title-img g-flex-align-center">
            <img src="/img/icon/liubianxing.png" alt="" />
          </div>
          <div class="v-liang-hua-bottom-title-text">
            <span>{{ i18n.dengjiTitleText }}</span>
          </div>
        </div>

        <div class="v-liang-hua-swiper-box">
          <div class="v-liang-hua-swiper-one">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in levelList.list" :key="index">
                <div class="v-swiper-slide-item">
                  <div class="v-swiper-slide-item-img g-flex-align-center">
                    <img :src="item.img" alt="">
                  </div>
                  <div v-show="filtersIsOrNoIsTitle(item) == 1" class="v-swiper-slide-item-lock g-flex-align-center">
                    <img src="/img/icon/un-lock.png" alt=""/>
                  </div>
                  <div v-show="filtersIsOrNoIsTitle(item) == 2" class="v-swiper-slide-item-lock g-flex-align-center">
                    <img src="/img/icon/lock.png" alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="currentSelectLevelObj.obj.id" class="v-liang-hua-swiper-content">
            <div class="v-liang-hua-swiper-content-card">
              <div class="v-swiper-content-card-title">
                {{currentSelectLevelObj.obj.title}} {{ i18n.shenjitiaoJianText }}
              </div>
              <div class="v-swiper-content-card-list">
                <div class="v-swiper-content-card-item g-flex">
                  <div class="v-swiper-content-card-item-title">
                    <span>{{ i18n.balanceText }}</span>
                  </div>
                  <div class="v-swiper-content-card-item-val">
                    <span>{{currentSelectLevelObj.obj.min}}~{{currentSelectLevelObj.obj.max}} U</span>
                  </div>
                </div>
                <div v-show="Number(currentSelectLevelObj.obj.spread_nums) > 0 " class="v-swiper-content-card-item g-flex">
                  <div class="v-swiper-content-card-item-title">
                    <span>{{i18n.tuiguangHuiYuanText }}{{ filterTuiGuanLevelText() }}</span>
                  </div>
                  <div class="v-swiper-content-card-item-val">
                    <span>&gt;{{ currentSelectLevelObj.obj.spread_nums }}</span>
                  </div>
                </div>
                <!--<div v-show="currentSelectLevelObj.obj.id == 33" class="v-swiper-content-card-item g-flex">
                  <div class="v-swiper-content-card-item-val v-swiper-content-card-item-val-tips">
                    <span>{{ i18n.zhuyiText }}: {{ $t('lianghua.xuyaoYaoQingText', { val1: currentSelectLevelObj.obj.spread_nums, val2: store.system.UserRechargeAmount })}}
                      </span>
                  </div>
                </div>-->
              </div>
            </div>
            <div class="v-liang-hua-swiper-content-card">
              <div class="v-swiper-content-card-title">
                {{ $t('lianghua.quanyiText', { val1: currentSelectLevelObj.obj.title }) }}
              </div>
              <div class="v-swiper-content-card-list">
                <div class="v-swiper-content-card-item g-flex">
                  <div class="v-swiper-content-card-item-title">
                    <span>{{ i18n.zuixiaoLiangHuaShuLiangText }}</span>
                  </div>
                  <div class="v-swiper-content-card-item-val">
                    <span>{{ currentSelectLevelObj.obj.min }}</span>
                  </div>
                </div>
                <div class="v-swiper-content-card-item g-flex">
                  <div class="v-swiper-content-card-item-title">
                    <span>{{ i18n.zuidaLiangHuaShuLiangText }}</span>
                  </div>
                  <div class="v-swiper-content-card-item-val">
                    <span>{{ currentSelectLevelObj.obj.max }}</span>
                  </div>
                </div>
                <div class="v-swiper-content-card-item g-flex">
                  <div class="v-swiper-content-card-item-title">
                    <span>{{ i18n.lianghuaNumsText }}</span>
                  </div>
                  <div class="v-swiper-content-card-item-val">
                    <span>{{ $t('lianghua.ciText', { val1: currentSelectLevelObj.obj.nums }) }}</span>
                  </div>
                </div>
                <div class="v-swiper-content-card-item g-flex">
                  <div class="v-swiper-content-card-item-title">
                    <span>{{ i18n.rishouyilvText }}</span>
                  </div>
                  <div v-show="currentSelectLevelObj.obj.min_daily == currentSelectLevelObj.obj.max_daily" class="v-swiper-content-card-item-val">
                    <span>{{ (Number(currentSelectLevelObj.obj.min_daily) * 100).toFixed(2) }}%</span>
                  </div>
                  <div v-show="currentSelectLevelObj.obj.min_daily != currentSelectLevelObj.obj.max_daily" class="v-swiper-content-card-item-val">
                    <span>{{ (Number(currentSelectLevelObj.obj.min_daily) * 100).toFixed(2) }}% ~ {{ (Number(currentSelectLevelObj.obj.max_daily) * 100).toFixed(2) }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<NoticePop ref="refNoticePop" />-->
    <NoticeUserPop ref="refNoticeUserPop"/>
  </div>
</template>

<script setup>
import { apiStartLiangHua, apiGetVip, apiGetLiangHuaRadomList, apiGetNoticeList, apiGetLiangHuaTotalInfo, apiGetLiangHuaPlatformList, apiGetLiangHuaLevelList, apiGetUserInfo } from '@/utils/api.js'
import NoticeUserPop from '@/components/NoticeUserPop.vue'
import TuanDuiBottomSwiper from '@/components/TuanDuiBottomSwiper.vue'
import Swiper, { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import { dotDealWith, formatDate, copyClick, upDownClass, upDownBgClass, filtersZhangfu, kefuClick, upDownBgFontColorClass } from "@/utils/index.js";
import {
  reactive,
  ref,
  computed,
  onMounted,
  onUnmounted,
  nextTick,
} from "vue";
import { useI18n } from "vue-i18n";
import useStore from "@/store/index.js";
import { useRouter, useRoute } from "vue-router";
import { ImagePreview, Toast } from 'vant';
import ws from "@/utils/ws.js";
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("lianghua");
});

onMounted(() => {
  apiGetNoticeListHandel();
})

let activeVal = ref(0)
let buyPlatForm = ref('')
let sellPlatForm = ref('')
let stepList = computed(() => {
  return [
    {
      title: i18n.value.zhengzaiqidongText,
      title2: i18n.value.qidongSuccessText,
      status: 0
    },
    {
      title: i18n.value.zhengzaisaomiaoText,
      title2: i18n.value.saomiaoSuccessText,
      status: 1
    },
    {
      title: i18n.value.dingDanPipeiZhongText,
      title2: i18n.value.dingDanPiPeiSuccess,
      status: 2
    },
    {
      title: `${i18n.value.zhengzaiText}${buyPlatForm.value}${i18n.value.faqiBullDanText}`,
      title2: `${i18n.value.zaiText}${buyPlatForm.value}${i18n.value.buySuccessText}`,
      status: 3
    },
    {
      title: `${i18n.value.zhengzaiText}${sellPlatForm.value}${i18n.value.faqiSellDanText}`,
      title2: `${i18n.value.zaiText}${sellPlatForm.value}${i18n.value.sellSuccessText}`,
      status: 4
    },
    {
      title: i18n.value.xitongJieSuanZhongText,
      title2: i18n.value.xitongJieSuanSuccessText,
      status: 5
    },
    {
      title: i18n.value.shouyiFaFangZhongText,
      title2: i18n.value.lianghuaWanChengText,
      status: 6
    }
  ]
})


let levelList = reactive({
  list: []
})

// 当前选中的等级swiper对象
let currentSelectLevelObj = reactive({
  obj: {
    "id": '',
    "title": "",
    "img": "",
    "nums": "",
    "min": "",
    "max": "",
    "min_rate": "",
    "max_rate": "",
    "min_daily": "",
    "max_daily": "",
    "team_min_rate": "",
    "team_max_rate": "",
    "fee": "",
    "reward": "",
    "amount": "",
    "spread_nums": "",
    "spread_level": "",
    "status": ""
  }
})

const swiperOneInstance = ref(null);
Swiper.use([Pagination, Navigation, Autoplay]);

// 获取等级列表
async function apiGetLiangHuaLevelListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetLiangHuaLevelList()
  if (!success) return
  levelList.list = data.list
  let targetIndex = levelList.list.findIndex(item => {
    return item.id == userInfo.value.level.id
  })
  console.log('targetIndex', targetIndex)
  if (targetIndex == -1) {
    targetIndex = 0
  }
  currentSelectLevelObj.obj = levelList.list[targetIndex]
  console.log('currentSelectLevelObj.obj', currentSelectLevelObj.obj)
  nextTick(() => {
    swiperOneInstance.value = new Swiper('.v-liang-hua-swiper-one', {
      // loop: true,
      // direction: 'vertical',
      spaceBetween: 20,
      slidesPerView: 1.4,
      initialSlide: targetIndex,
      // autoplay: {
      //   delay: 3000
      // },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      speed: 800
    });

    slideChange()
  })

}

// 监听swiper变化
function slideChange() {
  swiperOneInstance.value.on('slideChange', (swiper) => {
    currentSelectLevelObj.obj = levelList.list[swiper.realIndex]
  })
}


let totalInfo = reactive({
  "balance": "0",
  "totalProfit": "0",
  "todayQuantifyProfit": "0",
  "monthQuantifyProfit": "0",
  "yesterdayQuantifyProfit": "0",
  "todayRebateAmount": "0",
  "monthProfit": "0",
  "lastMonthProfit": "0",
  "agent1": 0,
  "agentValid1": 0,
  "agent2": 0,
  "agentValid2": 0,
  "agent3": 0,
  "agentValid3": 0,
  "quantifyProfit": '0',
  "monthRebateAmount": 0,
  "rebateAmount": 0
})

async function apiGetLiangHuaTotalInfoHandel() {
  const { success, data } = await apiGetLiangHuaTotalInfo()
  if (!success) return
  Object.assign(totalInfo, data.info)
  console.log(data)
}

apiGetLiangHuaTotalInfoHandel()


let userInfo = computed(() => {
  return store.userInfo
})

let timer = ref(0)

apiGetUserInfoHandel()

// 用户信息
async function apiGetUserInfoHandel(flag = true) {
  if (flag) store.loadingShow = true
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  data.info.level.shengyuNums = (Number(data.info.level.nums) - Number(data.info.level.todayNums))
  data.info.level.shengyuNums = data.info.level.shengyuNums < 0 ? 0 : data.info.level.shengyuNums
  store.setUserInfo(data.info)
  if(!currentSelectLevelObj.obj.id) {
    apiGetLiangHuaLevelListHandel()
  }
  if (data.info.userQuantify.id) {
    activeVal.value = data.info.userQuantify.step
    buyPlatForm.value = data.info.userQuantify.buy_platform
    sellPlatForm.value = data.info.userQuantify.sell_platform
    if (timer.value) clearInterval(timer.value)
    timer.value = setTimeout(() => {
      apiGetUserInfoHandel(false)
    }, 2000);
  } else {
    clearInterval(timer.value)
  }
  // console.log(data)
}


// 量化接口
async function apiStartLiangHuaHandel() {
  store.loadingShow = true
  const { success, data } = await apiStartLiangHua()
  if (!success) return
  Toast.success(data.msg)
  apiGetUserInfoHandel()
  apiGetLiangHuaTotalInfoHandel()
}

function addFnQuantify() {
  ws.addFn('quantify', data => {
    if (data.code == 1) {
      Toast.success(i18n.value.lianghuaSuccessText)
    } else {
      Toast.success(i18n.value.lianghuaFailText)
    }
    apiGetUserInfoHandel()
    apiGetLiangHuaTotalInfoHandel()
  })
}
addFnQuantify()
onUnmounted(() => {
  ws.removeFn('quantify')
  clearInterval(timer.value)
});

async function lingquItemClick(item) {
  store.loadingShow = true
  const { success, data } = await apiGetVip({ id: item.id })
  if (!success) return
  Toast.success(data.msg)
  apiGetUserInfoHandel()
  console.log(data)
}

let noticeList = reactive({ list: [] });

let refNoticeUserPop = ref(null)
function noticeClick() {
  //refNoticePop.value.onShow(noticeList.list)
  refNoticeUserPop.value.onShow(noticeList.list[0])
}
//获取公告
async function apiGetNoticeListHandel() {
  store.loadingShow = true;
  const { success, data } = await apiGetNoticeList();
  if (!success) return;
  noticeList.list = data.list;
  if (noticeList.list.length > 0) {
    noticeClick()
  }
}

// 有没有解锁
function filtersIsOrNoIsTitle(item) {
  if(userInfo.value.level.id >= item.id) return 1
  if(userInfo.value.level.id < item.id) return 2
}

function filterTuiGuanLevelText() {
  if(currentSelectLevelObj.obj.id == 1) return ''
  let targetIndex = levelList.list.findIndex(item => {
    return item.id == currentSelectLevelObj.obj.id
  })
  if(targetIndex != -1) {
    return `(${levelList.list[targetIndex - 1].title})`
  }else return ''
}

</script>

<style lang='scss'>
.v_liang_hua {
  height: 100%;
  overflow: auto;
  background-color: var(--g-main-bgColor);
  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    background-color: var(--g-main-bgColor);

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

  .v-liang-hua-container {
    padding-top: 46px;
    flex: 1;
    overflow: auto;
    padding-left: 10px;
    padding-right: 11px;

    .v-liang-hua-top {
      padding: 20px 20px;
      background-image: url(/img/icon/quantify_top_inset.png);
      border-radius: 10px;
      background-position: center;
      background-size: cover;

      .v-liang-hua-top-title-list {
        gap: 15px;

        .v-liang-hua-top-title-item {
          overflow: hidden;
          flex: 1;

          .v-lianghua-top-title {
            font-size: 18px;
            @include textEllipsis();
            line-height: 150%;
            // font-weight: 600;
            color: var(--g-white);
          }

          .v-lianghua-top-balance {
            margin-top: 10px;
            font-size: 24px;
            line-height: 120%;
            // font-weight: 600;
            color: var(--g-white);

            .v-lianghua-top-balance-danwei {
              font-size: 14px;
              color: var(--g-white);
              padding-left: 5px;
            }
          }
        }
      }


      .v-lianghua-top-btn-list {
        padding-top: 15px;

        .v-lianghua-top-btn-item {
          width: 135px;
          background-color: transparent;
          color: #fff;
          font-size: 16px;
          height: 36px;
          border: 0;
          border-radius: 25px;
          border: 1px solid var(--g-white);
          // &.v-lianghua-top-btn-item-recharge {
          //   background: var(--g-main_color);
          // }

          // &.v-lianghua-top-btn-item-cashout {
          //   background-color: #ccc;
          // }
        }
      }
    }

    .v-liang-hua-card-box {
      background: var(--g-white);
      margin-top: 15px;
      border-radius: 10px;
      box-shadow: 0px 0px 5px #d3d3d3;

      .v-liang-hua-card {
        .v-liang-hua-card-item {
          padding: 20px 0;
          flex: 1;

          .v-liang-hua-card-item-value {
            color: var(--g-black);
            font-weight: 700;
            font-size: 18px;
          }

          .v-liang-hua-card-item-title {
            padding-top: 10px;
            color: #b0aebe;
            font-size: 12px;
          }
        }
      }

      .v-liang-hua-card-btn-box {
        padding: 0 0 15px 0;

        .v-liang-hua-card-btn {
          width: 180px;
          background-color: #EDEBFA;
          color: var(--g-main_color);
          font-size: 16px;
          // font-weight: 600;
          border: 0;
          height: 40px;
          line-height: 40px;
          border-radius: 25px;
        }

        .v-liang-hua-card-btn-ing {
          width: 180px;
          background-color: #644FDC;
          color: #fff;
          font-size: 16px;
          border: 0;
          height: 40px;
          line-height: 40px;
          border-radius: 25px;
        }
      }

      .v-liang-hua-step-box {
        padding-bottom: 15px;

        .v-liang-hua-step {
          .van-steps__items {
            text-align: center;
          }

          .iconfont {
            margin-left: 10px;
            display: inline-block;
            color: var(--g-grey);
            animation: step-spin 1s infinite linear;
          }
        }
      }


    }

    @keyframes step-spin {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    .v-liang-hua-bottom {
      margin-top: 15px;
      .v-liang-hua-bottom-title {
        .v-liang-hua-bottom-title-img {
          img {
            width: 20px;
          }
        }

        .v-liang-hua-bottom-title-text {
          font-size: 14px;
          padding-left: 5px;
          color: #000;
          font-weight: 700;
        }
      }
      .v-liang-hua-swiper-box {
        padding-top: 15px;
        .v-liang-hua-swiper-one {
          overflow: hidden;
          .swiper-wrapper {
            .swiper-slide {
              .v-swiper-slide-item {
                position: relative;
                .v-swiper-slide-item-img {
                  img {
                    width: 100%;
                  }
                }
                .v-swiper-slide-item-lock {
                  position: absolute;
                  z-index: 999;
                  padding: 15px 0 0 15px;
                  left: 0px;
                  top: 0px;
                  opacity: 0.8;
                  img {
                    width: 20px;
                  }
                }
              }
            }
          }
        }
      }
      .v-liang-hua-swiper-content {
        padding-bottom: 30px;
        .v-liang-hua-swiper-content-card {
          margin-top: 20px;
          background: var(--g-white);
          border-radius: 8px;
          box-shadow: 1px 1px 10px #d3d3d3;
          padding: 15px;
          .v-swiper-content-card-title {
            color: #000;
            font-size: 16px;
            font-weight: 700;
          }
          .v-swiper-content-card-list {
            padding-top: 15px;
            .v-swiper-content-card-item {
              padding-top: 10px;
              justify-content: space-between;
              &:nth-of-type(1) {
                padding-top: 0;
              }
              .v-swiper-content-card-item-title {
                color: #8B9592;
                flex-shrink: 0;
                font-size: 14px;
                line-height: 18px;
              }
              .v-swiper-content-card-item-val {
                padding-left: 10px;
                word-break: break-all;
                color: #000;
                line-height: 18px;
                font-size: 16px;
                &.v-swiper-content-card-item-val-tips {
                  color: #8B9592;
                  padding-left: 0;
                  font-size: 14px;
                }
              }
            }
          }
        }
      }

    }



  }
}</style>