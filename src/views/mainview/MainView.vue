<template>
  <div class="v_main g-flex-column">
    <div class="v-main-head g-flex-align-center">
      <div @click="mycenterClick" class="v-main-head-left g-flex-align-center">
        <img src="/img/icon/home_top_person.png" alt="" />
      </div>
      <!-- <div class="v-main-head-middle g-flex-justify-center g-flex-align-center">
        <img :src="store.banner.logo[1]" alt="" />
      </div> -->
      <div class="v-main-head-right g-flex-align-center">
        <div @click="kefuClick" class="v-main-head-right-img g-flex-align-center">
          <img src="/img/icon/icon_service.png" alt="">
        </div>
        <div @click="$router.push({ name: 'msgcenter' })" class="v-main-head-right-img v-main-head-right-img-msg g-flex-align-center">
          <div class="v-main-head-right-have-msg" v-show="unReadNums"></div>
          <img src="/img/icon/home_top_news.png" alt="">
        </div>
      </div>
    </div>
    <div class="v-main-container">
      <van-swipe class="v-main-swipe" :autoplay="3000" indicator-color="#644fdd">
        <!-- store.banner.lunbo -->
        <van-swipe-item class="v-main-swipe-item" v-for="(item, index) in store.banner.lunbo" :key="index">
          <img :src="item.img" alt="" />
        </van-swipe-item>
      </van-swipe>

      <!-- 通知栏2 -->
      <!--  -->
      <div v-if="noticeList.list.length" @click="noticeClick" class="v-notice-two g-flex-align-center">
        <div class="v-notice-two-left g-flex-align-center">
          <img src="/img/icon/news_icon.png" alt="" />
        </div>
        <van-notice-bar scrollable :speed="80">
          <p class="v-notice-two-tips-val">
            <span v-for="(item, index) in noticeList.list" :key="index">
              {{  item.des }}
            </span>
          </p>
        </van-notice-bar>
        <div @click.stop="$router.push({ name: 'msgcenter', query: { type: 2 } })" class="v-notice-two-right g-flex-align-center">
          <!-- <span>&gt;</span> -->
          <span>{{ i18n.moreText }}&gt;</span>
          <img src="/img/icon/home_notice_more.png" alt="">
        </div>
      </div>

      <div v-if="false" class="v-main-card-one">
        <div class="v-main-card-one-list g-flex-align-center">
          <div class="v-main-card-one-item g-flex-column g-flex-align-center" v-for="(item, index) in topProcudtList.list" :key="index">
            <div class="v-card-one-item-title">
              <span>{{ item.title }}</span>
            </div>
            <div class="v-card-one-item-price">
              <span>{{ item.kline.close }}</span>
            </div>
            <div class="v-card-one-item-zhangfu">
              <!-- :class="upDownClass(item.kline.zhangfu)" -->
              <span>{{ filtersZhangfu(item.kline.zhangfu, 2) }}</span>
            </div>
          </div>
        </div>
        
      </div>

      <div v-if="store.system.AboutUs" class="v-main-bottom-part-aboutus-video">
        <VideoPlayer @emitLoadVideo="emitLoadVideo" :needAsyncLoad="needAsyncLoad" :url="store.system.AboutUs" :pic="store.system.AboutUsPic" ref="refVideoPlayer" />
      </div>

      <div class="v-main-card-two">
        <div class="v-main-card-two-list g-flex-align-center">
          <div @click="$router.push({ name: 'rechargeselect' })" class="v-main-card-two-item g-flex-column g-flex-align-center">
            <div class="v-card-two-item-top">
              <img src="/img/icon/icon_recharge.png" alt=""/>
            </div>
            <div class="v-card-two-item-bottom">
              <span>{{ i18n.chongzhiText }}</span>
            </div>
          </div>
          <div @click="$router.push({ name: 'cashoutselect' })" class="v-main-card-two-item g-flex-column g-flex-align-center">
            <div class="v-card-two-item-top">
              <img src="/img/icon/icon_withdraw.png" alt=""/>
            </div>
            <div class="v-card-two-item-bottom">
              <span>{{ i18n.tixianText }}</span>
            </div>
          </div>
          <div @click="$router.push({ name: 'myteam' })" class="v-main-card-two-item g-flex-column g-flex-align-center">
            <div class="v-card-two-item-top">
              <img src="/img/icon/icon_team.png" alt=""/>
            </div>
            <div class="v-card-two-item-bottom">
              <span>{{ i18n.tuanduiText }}</span>
            </div>
          </div>

          <!-- 任务中心 -->
           <div @click="$router.push({ name: 'taskcenter' })" class="v-main-card-two-item g-flex-column g-flex-align-center">
            <div class="v-card-two-item-top">
              <img src="/img/icon/taskcenter.png" alt=""/>
            </div>
            <div class="v-card-two-item-bottom">
              <span>{{ i18n.renwuzhongxingText }}</span>
            </div>
          </div>
          <div @click="$router.push({ name: 'invite' })" class="v-main-card-two-item g-flex-column g-flex-align-center">
            <div class="v-card-two-item-top">
              <img src="/img/icon/icon_activity.png" alt=""/>
            </div>
            <div class="v-card-two-item-bottom">
              <span>{{ i18n.yaoqingHaoYouText }}</span>
            </div>
          </div>
        </div>
      </div>


      <!-- <div class="v-main-card-three-box">
        <div @click="$router.push({ name: 'quantify' })" class="v-main-card-three g-flex-align-center">
          <div class="v-main-card-three-left g-flex-align-center">
            <div class="v-main-card-three-left-img">
              <img src="/img/icon/home_lianghua.png" alt=""/>
            </div>
            <div class="v-main-card-three-left-content">
              <div class="v-main-card-three-left-title g-flex-align-center">
                {{ i18n.linaghuaJiaoYiText }}
              </div>
              <div class="v-main-card-three-left-desc g-flex-align-center">
                {{ i18n.lianghuaJiaoYiTipsText }}
              </div>
            </div> 
          </div>
          <div class="v-main-card-three-right">
            <i class="iconfont icon-you"></i>
          </div>
        </div>
       
      </div> -->

      <div class="v-main-bottom">
        <!-- <div class="v-main-nav-list g-flex-align-center">
          <div :class="form.navType == 1 ? 'active': ''" @click="typeItemClick(1)" class="v-main-nav-item">
            <span>{{ i18n.shishiHangQingText }}</span>
          </div>
          <div :class="form.navType == 2 ? 'active': ''" @click="typeItemClick(2)" class="v-main-nav-item">
            <span>{{ i18n.huiyuanDongTaiText }}</span>
          </div>
        </div> -->
        <div v-show="form.navType == 1" class="v-main-bottom-list-one-box">
          <div class="v-main-bottom-list-one-head g-flex-align-center">
            <div class="v-main-bottom-list-one-head-item v-main-bottom-list-one-head-item-name">
              <span>{{ i18n.jiaoyiDuiText }}</span>
            </div>
            <div class="v-main-bottom-list-one-head-item v-main-bottom-list-one-head-item-price">
              <span>{{ i18n.newMostPriceText }}</span>
            </div>
            <div class="v-main-bottom-list-one-head-item v-main-bottom-list-one-head-item-zhangfu g-flex-justify-center">
              <span>{{ i18n.zhangdieFuText }}</span>
            </div>
          </div>

          <div class="v-main-bottom-list-one">
            <div class="v-main-bottom-list-one-item g-flex-align-center"  v-for="(item, index) in procudtList.list" :key="index">
              <div class="v-main-bottom-list-one-item-second g-flex-align-center">
                <div class="v-main-bottom-list-one-item-img g-flex-align-center">
                  <img :src="item.icon" alt=""/>
                </div>
                <div class="v-main-bottom-list-one-item-text g-flex-align-center">
                  <span>{{  item.title  }}</span>
                </div>
              </div>
              <div class="v-main-bottom-list-one-item-second g-flex-align-center">
                <div :class="upDownClass(item.kline.zhangfu)" class="v-main-bottom-list-one-item-price g-flex-align-center">
                  <span>{{  item.kline.close  }}</span>
                </div>
              </div>
              <div class="v-main-bottom-list-one-item-second g-flex-justify-center g-flex-align-center">
                <div :class="upDownBgClass(item.kline.zhangfu)" class="v-main-bottom-list-one-item-zhangfu g-flex-align-center g-flex-justify-center">
                  <span>{{ filtersZhangfu(item.kline.zhangfu, 2) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!-- <div v-if="false" class="v-main-bottom-list-two-box">
          <div class="v-main-bottom-list-two-head g-flex-align-center">
            <div class="v-main-bottom-list-two-head-item v-main-bottom-list-two-head-item-name">
              <span>{{ i18n.huiyuanNameText }}</span>
            </div>
            <div class="v-main-bottom-list-two-head-item v-main-bottom-list-two-head-item-shouyi">
              <span>{{ i18n.shouyiText }}</span>
            </div>
            <div class="v-main-bottom-list-two-head-item v-main-bottom-list-two-head-item-status g-flex-justify-center">
              <span>{{ i18n.zhuangtaiText }}</span>
            </div>
          </div>
            <MainBottomSwiper :list="radomList.list" ref="refMainBottomSwiper"/>
        </div> -->
      </div>


    </div>

    <!--<NoticePop ref="refNoticePop"/>-->
    <NoticeUserPop ref="refNoticeUserPop"/>

    <MyCenterPop ref="refMyCenterPop"/>

    <UpdatePop ref="refUpdatePop"/>
  </div>
</template>

<script setup>
//import NoticePop from '@/components/NoticePop.vue'
import NoticeUserPop from '@/components/NoticeUserPop.vue'
import MainBottomSwiper from '@/components/MainBottomSwiper.vue'
import TestSwiper from '@/components/TestSwiper.vue'
import MyCenterPop from '@/components/MyCenterPop.vue'
import { dotDealWith, formatDate, copyClick, upDownClass, upDownBgClass, filtersZhangfu, kefuClick, upDownBgFontColorClass } from "@/utils/index.js";
import {
  apiGetWeiDuMsgNums,
  apiGetUserInfo,
  apiGetKefuConfig,
  apiGetNoticeList,
  apiGetProductList,
  apiGetHelpCenterList,
  apiGetLiangHuaRadomList
} from "@/utils/api.js";
import VideoPlayer from "@/components/VideoPlayer.vue";
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
import ws from "@/utils/ws.js";
import UpdatePop from "@/components/UpdatePop.vue";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("mainView");
});

// 是否需要预加载视频
let needAsyncLoad = ref(true)
function emitLoadVideo() {
  needAsyncLoad.value = false
}

let refMyCenterPop = ref(null)
function mycenterClick() {
  refMyCenterPop.value.onShow()
}

getParams();

function getParams() {
  var tid = route.query.tid;
  if (tid) {
    window.localStorage.setItem("tid", tid);
  }
}


function noOpenItemClick() {
  Toast(i18n.value.jingqingqidaiText)
}

let selectLangObj = computed(() => {
  console.log("store.lang", store.lang);
  if (!store.langList.length) return {};
  var target = store.langList.find((item) => item.code == store.lang);
  console.log("target", target);
  if (target) return target;
  else return store.langList[0];
});

onMounted(() => {
  console.log("route", route);
});


let refUpdatePop = ref(null);

apiGetKefuConfigHandel();

// 获取配置
async function apiGetKefuConfigHandel() {
  const { success, data } = await apiGetKefuConfig({ id: 1 });
  if (!success) return;
  if (store.system.Version != data.info.Version) {
    refUpdatePop.value.onShow();
  }
}

let noticeList = reactive({ list: [] });

// 获取公告列表
async function apiGetNoticeListHandel() {
  store.loadingShow = true;
  const { success, data } = await apiGetNoticeList();
  if (!success) return;
  noticeList.list = data.list;
  if(!noticeList.list.length) {
    return
  }else {
    noticeClick()
  }
}
let refNoticeUserPop = ref(null)
function noticeClick() {
  refNoticeUserPop.value.onShow(noticeList.list[0])
}

let form = reactive({
  navType: 1
});
let procudtList = reactive({ list: [] });
let topProcudtList = reactive({ list: [] });
let refMainBottomSwiper = ref(null)

let radomList = reactive({
  list: []
})

apiGetLiangHuaRadomListHandel()

async function apiGetLiangHuaRadomListHandel() {
  const { success, data } = await apiGetLiangHuaRadomList()
  if(!success) return
  radomList.list = data.list
  console.log(data)
}

// 点击分类
async function typeItemClick(val) {
  form.navType = val
  if(form.navType == 2) {
    refMainBottomSwiper.value.onShow()
  }
}

// 获取币种列表
async function apiGetProductListHandel() {
  const { success, data } = await apiGetProductList({ type: 0, limit: 10 });
  if (!success) return;
  if (procudtList.list.length) {
    leaveGrupHandle();
  }
  procudtList.list = data.list.map((item) => {
    item.kline.open = Number(item.kline.open).toFixed(item.fixed);
    item.kline.close = Number(item.kline.close).toFixed(item.fixed);
    item.kline.low = Number(item.kline.low).toFixed(item.fixed);
    item.kline.high = Number(item.kline.high).toFixed(item.fixed);
    // item.currency = (Number(item.close) * Number(this.$global.currency.rate)).toFixed(this.$global.currency.fixed)
    item.kline.zhangfu =
      Math.formatFloat(Number(item.kline.close) - Number(item.kline.open), item.fixed) /
      Number(item.kline.open);
    return item;
  });
  // 使用slice实现浅拷贝 websocket只需要推 上面的三个也可以被改
  topProcudtList.list = procudtList.list.slice(0, 3);
  procudtList.list.forEach((item) => {
    ws.joinGroup("market_" + item.id, (data) => {
      item.kline.open = Number(data.open).toFixed(item.fixed);
      item.kline.close = Number(data.close).toFixed(item.fixed);
      item.kline.low = Number(data.low).toFixed(item.fixed);
      item.kline.high = Number(data.high).toFixed(item.fixed);
      // item.currency = (Number(data.close) * Number(this.$global.currency.rate)).toFixed(this.$global.currency.fixed)
      item.kline.zhangfu =
        Math.formatFloat(Number(data.close) - Number(data.open), item.fixed) /
        Number(data.open);
      item.kline.vol = data.vol;
    });
  });
  console.log(data);
}

apiGetProductListHandel();

// 离开订阅
function leaveGrupHandle() {
  procudtList.list.forEach((item) => {
    ws.leaveGroup("market_" + item.id);
  });
}

function newsItemClick(item) {
  router.push({ name: "newsdetail", query: { id: item.id } });
}

function gridItemClick(name, type = 0) {
  if (name == "chart") {
    router.push({ name, query: { id: 2 } });
  } else if (name == "market") {
    router.push({ name: name, query: { type } });
  } else if (name == "download") {
    window.location.href = store.system.downUrl;
  } else {
    router.push({ name });
  }
}

// function goSameNameRouterClick() {
//   router.push({ name: 'main', query: { id: new Date().getTime() }}).then(faile => {
//     console.log('faile', faile)
//     if(faile && (faile.to.name == faile.from.name)) {
//       router.push({ name: 'refresh' })
//     }
//   })
// }

// 点击产品
function productItemClick(item) {
  router.push({ name: "chart", query: { id: item.id } });
}

let timeString = ref("?" + new Date().getTime());
let value = ref("");

let partnerList = reactive({
  list: [
    '/img/main/partner1.png',
    '/img/main/partner2.png',
    '/img/main/partner3.png',
    '/img/main/partner4.png',
    '/img/main/partner5.png',
    '/img/main/partner6.png',
    '/img/main/partner7.png',
    '/img/main/partner8.png',
    '/img/main/partner9.png'
  ]
})

// 获取首页问题
let questionList = reactive({
  list: []
})

async function apiGetHelpCenterListHandel() {
  const { success, data } = await apiGetHelpCenterList({ page: 1, limit: 10 })
  if(!success) return
  questionList.list = data.list
}

apiGetHelpCenterListHandel()


if(store.token) {
  apiGetUserInfoHandel()
  apiGetWeiDuMsgNumsHandel()
  apiGetNoticeListHandel()
}else{
  //退出登录
  router.push('/login')
}

let userInfo = computed(() => {
  return store.userInfo
})

// 获取用户信息
async function apiGetUserInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  store.setUserInfo(data.info)
  console.log(data)
}

let unReadNums = ref(0)
// 获取未读消息数量
async function apiGetWeiDuMsgNumsHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetWeiDuMsgNums()
  if(!success) return
  unReadNums.value = data.readNums
}

// 重新初始化
async function apiGetInitHandel() {
  const { success, data } = await apiGetKefuConfig({ id: 2 })
  if (!success) return
  store.kefu = data.info
  console.log('store', store)
}

onUnmounted(() => {
  leaveGrupHandle();
});
</script>
<style lang='scss'>
.v_main {
  height: 100%;
  overflow: auto;
  background-color: var(--g-main-bgColor);
  .v-main-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 9;
    height: 46px;
    // background: var(--g-main_bgColor);
    background-color: var(--g-main-bgColor);
    .v-main-head-left {
      position: absolute;
      left: 0;
      padding: 0 16px;
      height: 100%;

      img {
        width: 30px;
      }
    }

    .v-main-head-middle {
      flex: 1;
      height: 100%;

      img {
        width: 100px;
      }
    }

    .v-main-head-right {
      position: absolute;
      right: 0;
      padding: 0 12px 0 6px;
      height: 100%;
      .v-main-head-right-img {
        margin-right: 10px;
        position: relative;
        &.v-main-head-right-img-msg {
          margin-right: 0;
        }
        img {
          width: 30px;
        }
        .v-main-head-right-have-msg {
          position: absolute;
          top: 5px;
          right: 2px;
          background: #e82020;
          width: 8px;
          height: 8px;
          border-radius: 100%;
          transform: translateX(50%) translateY(-50%);
        }
      }
    }
  }

  .v-main-container {
    flex: 1;
    padding-top: 46px;
    overflow: auto;

    .v-main-swipe {
      .van-swipe__track {
        .v-main-swipe-item {
          padding: 0px 10px 0px 10px;
          border-radius: 8px;
          img {
            width: 100%;
            object-fit: cover;
            border-radius: 8px;
          }
        }
      }
    }

    .v-notice-two {
      // margin-top: 5px;
      // height: 40px;
      padding: 10px 10px 5px 10px;
      // background-color: var(--g-white);
      .v-notice-two-left {
        padding-right: 4px;
        img {
          height: 20px;
        }
       
      }
      .v-notice-two-tips-val {
        color: var(--g-black);
        background: transparent;
        font-weight: 700;
        span {
          padding: 0 10px;
        }
      }
      .van-notice-bar {
        flex: 1;
        padding: 0;
        width: 100%;
        height: 20px;
        color: var(--g-black);
        background: transparent;
      }
      .v-notice-two-right {
        padding: 0 4px;
        flex-shrink: 0;
        color: #a7a3a3;
        font-size: 12px;
        img {
          width: 8px;
        }
      }
    }

    .v-main-card-one {
      padding: 10px 10px 0 10px;
      .v-main-card-one-list {
        border-radius: 8px;
        background-color: var(--g-white);
        overflow: hidden;
        box-shadow: 0px 0px 3px #d3d3d3;;
        .v-main-card-one-item {
          width: calc(100% / 3);
          height: 90px;
          overflow: hidden;
          background-color: var(--g-white);
          .v-card-one-item-title {
            margin-top: 10px;
            width: 100%;
            font-size: 14px;
            @include textManyOverflow();
            height: 24px;
            font-weight: 700;
            text-align: center;
            line-height: 24px;
          }
          .v-card-one-item-price {
            padding: 5px 0;
            width: 100%;
            text-align: center;
            @include textManyOverflow();
            font-size: 20px;
            font-weight: 600;
            color: var(--g-main_color);
          }
          .v-card-one-item-zhangfu {
            width: 100%;
            text-align: center;
            @include textManyOverflow();
            font-size: 14px;
            color: #B6B4C1;
          }
        }
      }
    }
    
    .v-main-card-two {
      padding: 10px;
      .v-main-card-two-list {
        padding: 15px 0px;
        box-shadow: 0px 0px 3px #d3d3d3;;
        border-radius: 8px;
        background-color: var(--g-white);
        .v-main-card-two-item {
          width: calc(100% / 5);
          .v-card-two-item-top {
            img {
              width: 50px;
              height: 50px;
              object-fit: contain;
            }
          }
          .v-card-two-item-bottom {
            width: 100%;
            text-align: center;
            @include textManyOverflow();
            color: var(--g-black);
            font-size: 12px;
            font-weight: 700;
            padding-top: 4px;
          }
        }
      }
    }

    .v-main-card-three-box {
      padding: 0 10px 10px 10px;
      .v-main-card-three {
        padding: 10px;
        border-radius: 6px;
        background-image: url('/img/icon/list_bg.png');
        background-position: 0px 0px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .v-main-card-three-left {
          flex: 1;
          .v-main-card-three-left-img {
            img {
              width: 48px;
              height: 48px;
              border-radius: 50%;
            }
          }
          .v-main-card-three-left-content {
            padding-left: 5px;
            .v-main-card-three-left-title {
              color: var(--g-white);
              font-size: 14px;
            }
            .v-main-card-three-left-desc {
              color: var(--g-black);
              font-size: 13px;
              padding-top: 8px;
            }
          }
        }
        .v-main-card-three-right {
          .iconfont {
            font-size: 18px;
            color: #969799;
          }
        }
      }
    }

    .v-main-bottom {
      padding: 0 10px 8px 10px;
      .v-main-nav-list {
        padding: 7px 5px;
        height: 45px;
        .v-main-nav-item {
          line-height: 16px;
          font-size: 16px;
          margin: 0 7px;
          color: var(--g-less-white);
          position: relative;
          &:nth-of-type(1) {
            margin: 0;
          }
          &.active {
            font-size: 16px;
            color: var(--g-white);
            &::before {
              content: "";
              position: absolute;
              width: 80%;
              height: 2px;
              background: #644FDC;
              left: 10%;
              bottom: -6px;
            }
          }
        }
      }
      .v-main-bottom-list-one-box {
        padding: 0 0 5px 0px;
        .v-main-bottom-list-one-head {
          border-radius: 8px 8px 0 0 ;
          padding: 10px 5px;
          background: var(--g-white);
          // border-radius: 8px;
          .v-main-bottom-list-one-head-item {
            line-height: 18px;
            color: #B3B0BF;
            font-size: 13px;
            &.v-main-bottom-list-one-head-item-name {
              width: 45%;
            }
            &.v-main-bottom-list-one-head-item-price {
              width: 27.5%;
            }
            &.v-main-bottom-list-one-head-item-zhangfu {
              width: 27.5%;
              padding-left: 2px;
            }
          }
        }
        .v-main-bottom-list-one {
          border-radius: 0px 0px 8px 8px;
          background: var(--g-white);
          .v-main-bottom-list-one-item {
            padding: 10px 0 10px 5px;
            border-bottom:0.5px solid #f6f6f7;
            .v-main-bottom-list-one-item-second {
              .v-main-bottom-list-one-item-img {
                padding-right: 5px;
                img {
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  object-fit: contain;
                }
              }
              .v-main-bottom-list-one-item-text {
                font-size: 14px;
                color: var(--g-black);
                font-weight: 700;
              }
              .v-main-bottom-list-one-item-price {
                font-size: 16px;
                font-weight: 700;
                color: var(--g-main_color)!important;
              }
              .v-main-bottom-list-one-item-zhangfu {
                padding: 10px 7px;
                font-size: 14px;
                min-width: 90%;
                max-width: 100%;
                border-radius: 4px;
                color: var(--g-main_color)!important;
                background: #EEEBFC!important;
                font-weight: 700;
              }
              &:nth-of-type(1) {
                width: 45%;
              }
              &:nth-of-type(2) {
                width: 27.5%;
              }
              &:nth-of-type(3) {
                width: 27.5%;
                padding-left: 2px;
              }
            }
          }
        }
      }

      .v-main-bottom-list-two-box {
        padding: 5px 3px;
        .v-main-bottom-list-two-head {
          padding: 10px 5px;
          background: var(--g-main_less_bgColor);
          .v-main-bottom-list-two-head-item {
            line-height: 18px;
            color: var(--g-white);
            font-size: 13px;
            &.v-main-bottom-list-two-head-item-name {
              width: 100px;
            }
            &.v-main-bottom-list-two-head-item-shouyi {
              flex: 2;
            }
            &.v-main-bottom-list-two-head-item-status {
              flex: 2;
              padding-left: 6px;
            }
          }
        }
      }

    }
    .v-main-bottom-part-aboutus-video {
      margin: 10px 10px 0px 10px;
      height: 180px;
      border-radius: 5px;
      overflow: hidden;
      video {
        width: 100%;
        height: 180px;
      }
    }
  }
}</style>