<template>
  <div class="v_my_team g-flex-column tost-container ">
    <div class="t-head">
      <!-- <img :src="left" @click="$router.go(-1)" alt=""> -->
      <span></span>
      <img :src="topImg" alt="" class="header_topImg">
      <span></span>
    </div>
    <div class="head-title">
      <span>{{ i18n.titleText }}</span>
    </div>


    <div class="v-my-team-container">
      <div class="v-my-team-card-one public_border2Black">
        <div class="v-my-team-card-title g-flex-align-center g-flex-justify-between">
          <div class="v-my-team-card-title-left public_border2Black g-flex-align-center g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.tuanduiShuJuGaiLanText }}</span>
          </div>
          <div @click="selectTopTimeClick"
            class="v-my-team-card-title-right public_border2Black g-flex-align-center g-flex-justify-between">
            <span class="v-my-team-card-title-right-text">
              {{ topForm.topDayText }}
            </span>
            <i class="iconfont icon-xiala"></i>
          </div>
        </div>
        <div class="v-my-team-card-one-middle-list g-flex-align-center">
          <div class="v-my-team-card-one-middle-item g-flex-column g-flex-align-center">
            <div class="v-my-team-card-one-middle-item-title">
              <span>{{ i18n.zhuceHuiYuanText }}</span>
            </div>
            <div class="v-my-team-card-one-middle-item-val">
              <span>{{ topTotalInfo.obj.agentNums }}</span>
              <img :src="registeredMember" alt="money">
            </div>
          </div>
          <div class="v-my-team-card-one-middle-item g-flex-column g-flex-align-center">
            <div class="v-my-team-card-one-middle-item-title">
              <span>{{ i18n.youxiaoHuiYuanText }}</span>
            </div>
            <div class="v-my-team-card-one-middle-item-val">
              <span>{{ topTotalInfo.obj.agentValidNums }}</span>
              <img :src="validMembers" alt="money">
            </div>
          </div>
          <div class="v-my-team-card-one-middle-item g-flex-column g-flex-align-center">
            <div class="v-my-team-card-one-middle-item-title">
              <span>{{ i18n.tuanduiShouRuText }}</span>
            </div>
            <div class="v-my-team-card-one-middle-item-val">
              <span>{{ topTotalInfo.obj.totalAmount }}</span>
              <img :src="teamIncome" alt="money">
            </div>
          </div>
        </div>
        <div class="v-my-team-card-one-bottom g-flex-align-center g-flex-justify-between">
          <div class="v-my-team-card-one-bottom-left g-flex-align-center">
            <div class="v-my-team-card-one-bottom-left-title">{{ i18n.leijiTuanDuiGuiMiText }}:</div>
            <span class="v-my-team-card-one-bottom-left-val">{{ topTotalInfo.obj.totalAgentNums }}</span>
          </div>
          <div @click="$router.push({ name: 'myteammemberlist' })"
            class="v-my-team-card-one-bottom-right g-flex-align-center">
            <span class="v-my-team-card-one-bottom-right-val public_border2Black public_div">{{ i18n.chakanTuanDuiLieBiaoText }}</span>
          </div>
        </div>
      </div>


      <div class="v-my-team-card-two">
        <div class="v-my-team-card-title g-flex-align-center g-flex-justify-between">
          <div class="v-my-team-card-title-left public_border2Black public_div">
            <span >{{ i18n.zuijingSanDaiShuJuText }}</span>
          </div>
          <div @click="selectBottomTimeClick"
            class="v-my-team-card-title-right g-flex-align-center g-flex-justify-between public_div public_border2Black">
            <span class="v-my-team-card-title-right-text">
              {{ bottomForm.bottomDayText }}
            </span>
            <i class="iconfont icon-xiala"></i>
          </div>
        </div>
        <div class="v-my-team-card-two-second-title">
          {{ i18n.yidaiShuJuText }}
        </div>
        <div class="v-my-team-card-two-middle-list g-flex-align-center">
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">

            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.tuanduiYongJinText }}</span>
            </div>
            <div class="v-my-team-card-two-middle-item-val public_color0030FE">
              <span>{{ bottomTotalInfo.obj.Quantify1 }}</span>
            </div>
          </div>
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">

            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.zhuceHuiYuanText }}</span>
            </div>

            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.agent1 }}</span>
              <img :src="registeredMember" alt="money">
            </div>

          </div>
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">

            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.youxiaoHuiYuanText }}</span>
            </div>
            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.agentValid1 }}</span>
              <img :src="validMembers" alt="money">
            </div>
          </div>
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">

            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.tuanduiShouRuText }}</span>
            </div>
            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.agentAmount1 }}</span>
              <img :src="teamIncome" alt="money">
            </div>
          </div>
        </div>
        <div class="v-my-team-card-two-second-title">
          {{ i18n.erdaiShuJuText }}
        </div>
        <div class="v-my-team-card-two-middle-list g-flex-align-center">
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">

            <div class="v-my-team-card-two-middle-item-title ">
              <span>{{ i18n.tuanduiYongJinText }}</span>
            </div>
            <div class="v-my-team-card-two-middle-item-val public_color0030FE">
              <span>{{ bottomTotalInfo.obj.Quantify2 }}</span>
            </div>
          </div>
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">

            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.zhuceHuiYuanText }}</span>
            </div>

            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.agent2 }}</span>
              <img :src="registeredMember" alt="money">
            </div>

          </div>
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">

            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.youxiaoHuiYuanText }}</span>
            </div>

            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.agentValid2 }}</span>
              <img :src="validMembers" alt="money">
            </div>

          </div>
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">

            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.tuanduiShouRuText }}</span>
            </div>

            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.agentAmount2 }}</span>
              <img :src="teamIncome" alt="money">
            </div>
          </div>
        </div>

        <div class="v-my-team-card-two-second-title">
          {{ i18n.sandaiShuJuText }}
        </div>
        <div class="v-my-team-card-two-middle-list g-flex-align-center">
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">

            <div class="v-my-team-card-two-middle-item-title ">
              <span>{{ i18n.tuanduiYongJinText }}</span>
            </div>

            <div class="v-my-team-card-two-middle-item-val public_color0030FE">
              <span>{{ bottomTotalInfo.obj.Quantify3 }}</span>
            </div>
          </div>
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">
            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.zhuceHuiYuanText }}</span>
            </div>

            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.agent3 }}</span>
              <img :src="registeredMember" alt="money">
            </div>

          </div>
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">

            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.youxiaoHuiYuanText }}</span>
            </div>

            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.agentValid3 }}</span>
              <img :src="validMembers" alt="money">
            </div>
          </div>
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">

            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.tuanduiShouRuText }}</span>
            </div>

            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.agentAmount3 }}</span>
              <img :src="teamIncome" alt="money">
            </div>
          </div>
        </div>
      </div>

    </div>

    <SelectRadioPop :columns="timeListTop.list" @emitsSelectConfirm="emitsSelectConfirm" :selectVal="topForm.day"
      ref="refSelectRadioPop" />

    <SelectRadioPop :columns="timeList.list" @emitsSelectConfirm="emitsSelectBottomConfirm" :selectVal="bottomForm.day"
      ref="refBottomSelectRadioPop" />


  </div>
</template>

<script setup>

import topImg from '@/assets/img/topimg.png'

import registeredMember from '@/assets/img/team_registeredMember.png'
import teamIncome from '@/assets/img/team_teamIncome.png'
import validMembers from '@/assets/img/team_validMembers.png'


import SelectRadioPop from '@/components/SelectRadioPop.vue'
import { apiGetUserInfo, apiNewTeamGetTeamInfo, apiNewTeamGetThreeLayerInfo } from '@/utils/api.js'
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
import { Dialog, ImagePreview, Toast } from 'vant';
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("myTeamNew");
});

const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})
let loading = ref(false)
let finished = ref(false)

let timeListTop = reactive({
  list: [
    { title: i18n.value.allText, val: '' },
    { title: i18n.value.oneDayText, val: 1 },
    { title: i18n.value.threeDayText, val: 3 },
    { title: i18n.value.sevenDayText, val: 7 },
    { title: i18n.value.fifteenDayText, val: 15 },
    { title: i18n.value.thirdtyDayText, val: 30 },
  ]
})


let timeList = reactive({
  list: [
    { title: i18n.value.allText, val: '' },
    { title: i18n.value.oneDayText, val: 1 },
    { title: i18n.value.threeDayText, val: 3 },
    { title: i18n.value.sevenDayText, val: 7 },
    { title: i18n.value.fifteenDayText, val: 15 },
    { title: i18n.value.thirdtyDayText, val: 30 },
  ]
})

let topForm = reactive({
  day: '',
  topDayText: timeListTop.list[0].title,
})

let bottomForm = reactive({
  day: '',
  bottomDayText: timeList.list[0].title,
})

// 上面的
let refSelectRadioPop = ref(null)
function selectTopTimeClick() {
  refSelectRadioPop.value.onShow()
}

function emitsSelectConfirm(item) {
  topForm.day = item.val
  topForm.topDayText = item.title
  apiNewTeamGetTeamInfoHandel()
}


// 下面的
let refBottomSelectRadioPop = ref(null)
function selectBottomTimeClick() {
  refBottomSelectRadioPop.value.onShow()
}
function emitsSelectBottomConfirm(item) {
  bottomForm.day = item.val
  bottomForm.bottomDayText = item.title
  apiNewTeamGetThreeLayerInfoHandel()
}


let topTotalInfo = reactive({
  obj: {
    "totalAgentNums": '-',
    "agentNums": '-',
    "agentValidNums": '-',
    "totalAmount": '-'
  }
})

// 获取统计
async function apiNewTeamGetTeamInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiNewTeamGetTeamInfo(topForm)
  if (!success) return
  data.info.totalAmount = Number(data.info.totalAmount).toFixed(2)
  topTotalInfo.obj = data.info
}

apiNewTeamGetTeamInfoHandel()


let bottomTotalInfo = reactive({
  obj: {
    "Quantify1": "-",
    "Quantify2": "-",
    "Quantify3": "-",
    "agent1": '-',
    "agentValid1": '-',
    "agentAmount1": "-",
    "agent2": '-',
    "agentValid2": '-',
    "agentAmount2": "-",
    "agent3": '-',
    "agentValid3": '-',
    "agentAmount3": "-"
  }
})


// 获取三代数据
async function apiNewTeamGetThreeLayerInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiNewTeamGetThreeLayerInfo(bottomForm)
  if (!success) return
  data.info.Quantify1 = Number(data.info.Quantify1 * 100).toFixed(2) + '%'
  data.info.Quantify2 = Number(data.info.Quantify2 * 100).toFixed(2) + '%'
  data.info.Quantify3 = Number(data.info.Quantify3 * 100).toFixed(2) + '%'
  data.info.agentAmount1 = Number(data.info.agentAmount1).toFixed(2)
  data.info.agentAmount2 = Number(data.info.agentAmount2).toFixed(2)
  data.info.agentAmount3 = Number(data.info.agentAmount3).toFixed(2)
  bottomTotalInfo.obj = data.info
  console.log(data)
}

apiNewTeamGetThreeLayerInfoHandel()


let userInfo = computed(() => {
  return store.userInfo
})

async function apiGetUserInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  store.setUserInfo(data.info)
}


</script>

<style lang='scss'>

@import "@/styles/index";

.v_my_team {
  height: 100%;
  overflow: auto;
  // background-color: var(--g-main-bgColor);
  .head-title {
    margin-bottom: 14px;
  }
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
      color: var(--g-black);
      font-weight: 700;

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

  .v-my-team-container {
    flex: 1;
    flex-shrink: 0;
    // padding-top: 46px;
    overflow: auto;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 90px;
    z-index: 100;

    .v-my-team-card-one {
      background: var(--g-white);
      border-radius: 20px;
      padding: 15px;
      border: 2px solid #000;

      .v-my-team-card-title {
        .v-my-team-card-title-left {
          font-size: 8px;
          color: #000;
          font-weight: 700;
          width: 50%;
          border-radius: 8px;
          text-align: center;
          height: 17px;
        }

        .v-my-team-card-title-right {
          padding: 4px 10px;
          width: 66px;
          height: 17px;
          border-radius: 20px;
          font-size: 8px;
          color: #000;
          font-weight: 700;
          overflow: hidden;

          .v-my-team-card-title-right-text {
            flex: 1;
            @include textEllipsis();
          }

          .iconfont {
            font-size: 20px;
            color: #000;
            font-weight: normal;
          }
        }
      }

      .v-my-team-card-one-middle-list {
        gap: 5px;
        padding-top: 15px;
        padding-bottom: 15px;
        //border-bottom: 1px solid #E7E7E7;

        .v-my-team-card-one-middle-item {
          width: calc(100% / 3);
          position: relative;
          flex-shrink: 0;

          &::after {
            position: absolute;
            right: 0;
            content: "";
            width: 1px;
            height: 40px;
            background: #E7E7E7;
            top: 50%;
            transform: translateY(-50%);
            z-index: 9;
          }

          &:nth-last-of-type(1) {
            &::after {
              display: none;
            }
          }

          .v-my-team-card-one-middle-item-title {
            color: #000;
            font-size: 13px;
            text-align: center;
            width: 100%;
            padding: 0 15px;
            height: 30px;
            font-weight: bold;

            span {
              @include textEllipsis(2);
            }
          }

          .v-my-team-card-one-middle-item-val {
            font-size: 24px;
            padding-top: 10px;
            color: #000;
            font-weight: 700;
            display: flex;
            align-items: baseline;
            img{
              width: 14px;
              height: auto;
              margin-left: 5px;
            }
          }
        }
      }

      .v-my-team-card-one-bottom {
        padding-top: 15px;

        .v-my-team-card-one-bottom-left {
          font-weight: bold;
          font-size: 15px;
          color: #000000;

          .v-my-team-card-one-bottom-left-val {
            color: #000;
            font-size: 16px;
            padding-left: 5px;
          }
        }

        .v-my-team-card-one-bottom-right {
          color: var(--g-main_color);
          font-size: 14px;
        }
      }
    }

    .v-my-team-card-two {
      margin-top: 15px;
      box-shadow: 1px 1px 10px #d3d3d3;
      padding: 15px;
      padding-bottom: 0;
      background: var(--g-white);
      border-radius: 20px;
      padding: 15px;
      border: 2px solid #000;

      .v-my-team-card-title {

        .v-my-team-card-title-right {
          padding: 4px 10px;
          width: 66px;
          height: 17px;
          border-radius: 20px;
          font-size: 8px;
          color: #000;
          font-weight: 700;
          overflow: hidden;

          .v-my-team-card-title-right-text {
            flex: 1;
            @include textEllipsis();
          }

          .iconfont {
            font-size: 20px;
            color: #000;
            font-weight: normal;
          }
        }
      }

      .v-my-team-card-two-second-title {
        color: var(--g-white);
        font-weight: 700;
        padding: 7px;
        background-image: linear-gradient(to right , #2453F8, #fff);
        border-radius: 10px;
        margin-top: 20px;
        font-size: 18px;
      }

      .v-my-team-card-two-middle-list {
        gap: 5px;
        padding-top: 20px;
        padding-bottom: 20px;
        // border-bottom: 1px solid #E7E7E7;

        &:nth-last-of-type(1) {
          border-bottom: none;
        }

        .v-my-team-card-two-middle-item {
          width: calc(100% / 4);
          position: relative;
          flex-shrink: 0;

          .v-my-team-card-two-middle-item-val {
            color: #000;
            font-weight: 700;
            font-size: 18px;
            margin-top: 10px;

            img{
              width: 14px;
              height: auto;
              margin-left: 5px;
            }



          }

          .v-my-team-card-two-middle-item-title {

            height: 36px;
            font-size: 14px;
            line-height: 18px;
            width: 100%;
            text-align: center;
            word-break: keep-all;
            color: #000;
            font-weight: bold;

            span {
              width: 100%;
              padding: 0 5px;
              display: inline-block;
              @include textEllipsis(2);
            }




          }
        }
      }
    }
  }
}
</style>
