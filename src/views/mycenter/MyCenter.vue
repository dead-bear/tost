<template>
  <div class="v_mycenter g-flex-column">
    <div class="v-head">
      <div class="g-flex-align-center g-flex-justify-center ">
          <img src="@/assets/img/topimg.png" alt="logo" class="public_headerLogo">
        </div>
    </div>
    <div class="v-mycenter-container">
     
      <div class="v-mycenter-head-box">
        <div @click="$router.push({ name: 'safecenter' })" class="v-mycenter-head-right-img">
          <!-- <img :src="userInfo.level.img" alt="" class="v-mycenter-head-right-level"/> -->

          
          <img src="@/assets/img/mycenter_ vip.png" alt="" class="v-mycenter-head-right-level"/>
          <img :src="userInfo.avatar" alt="" class="v-mycenter-head-right-headImg">
        </div>
        
        <div @click="$router.push({ name: 'safecenter' })" class="v-mycenter-head">
          <!-- <div class="v-mycenter-head-top g-flex-align-center">
            <div class="v-mycenter-head-title">
              <span>{{userInfo.email}}</span>
            </div>
           
            

          </div> -->
          <div @click.stop="copyClick(userInfo.user_name)" class="v-mycenter-head-bottom g-flex-space-between">
            <div class="v-mycenter-head-bottom-copy g-flex-align-center">
              <img src="@/assets/img/mycenter_ username.png" alt="" />
              <div class="v-mycenter-head-bottom-id">
              {{ userInfo.user_name}}
            </div>
            </div>
            
            <div class="v-mycenter-head-bottom-copy g-flex-align-center">
              <img src="@/assets/img/mycenter_ copy.png" alt="" />
            </div>
          </div>
          <div @click.stop="copyClick(userInfo.id)" class="v-mycenter-head-bottom g-flex-space-between">
            <div class="v-mycenter-head-bottom-copy g-flex-align-center">
              <img src="@/assets/img/mycenter_ id.png" alt="" />
              <div class="v-mycenter-head-bottom-id">
              {{ userInfo.id }}
            </div>
            </div>
           
            <div class="v-mycenter-head-bottom-copy g-flex-align-center">
              <img src="@/assets/img/mycenter_ copy.png" alt="" />
            </div>
          </div>
          <div @click.stop="copyClick(userInfo.email)" class="v-mycenter-head-bottom g-flex-space-between">
            <div class="v-mycenter-head-bottom-copy g-flex-align-center">
              <img src="@/assets/img/mycenter_ email.png" alt="" />
              <div class="v-mycenter-head-bottom-id">
                {{ userInfo.email }}
              </div>
            </div>
           
            <div class="v-mycenter-head-bottom-copy g-flex-align-center">
              <img src="@/assets/img/mycenter_ copy.png" alt="" />
            </div>
          </div>
          
        </div>

        
        
      </div>

      <div class="v-mycenter-top-card">
        <van-grid class="v-mycenter-top-card-list" :border="false" :column-num="3" style="display: none;">
          <van-grid-item>
            <div class="v-mycenter-top-card-item g-flex-column g-flex-align-center">
              <div class="v-mycenter-top-card-item-val">
                <span>{{ Number(userInfo.balance).toFixed(2)  }}</span>
              </div>
              <div class="v-mycenter-top-card-item-title">
                <span>{{ i18n.zongyuerText }}</span>
              </div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="v-mycenter-top-card-item g-flex-column g-flex-align-center">
              <div class="v-mycenter-top-card-item-val">
                <span>{{ Number(userInfo.balance).toFixed(2) }}</span>
              </div>
              <div class="v-mycenter-top-card-item-title">
                <span>{{ i18n.kecaozuoMoneyText }}</span>
              </div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="v-mycenter-top-card-item g-flex-column g-flex-align-center">
              <div class="v-mycenter-top-card-item-val">
                <span>0.00</span>
              </div>
              <div class="v-mycenter-top-card-item-title">
                <span>{{ i18n.dsfzjText }}</span>
              </div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="v-mycenter-top-card-item g-flex-column g-flex-align-center">
              <div class="v-mycenter-top-card-item-val">
                <span>{{ Number(totalInfo.totalProfit).toFixed(2) }}</span>
              </div>
              <div class="v-mycenter-top-card-item-title">
                <span>{{ i18n.zongShouYiText }}</span>
              </div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="v-mycenter-top-card-item g-flex-column g-flex-align-center">
              <div class="v-mycenter-top-card-item-val">
                <span>{{ Number(totalInfo.todayRebateAmount).toFixed(2) }} </span>
              </div>
              <div class="v-mycenter-top-card-item-title">
                <span>{{ i18n.jinriYongJinText }}</span>
              </div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="v-mycenter-top-card-item g-flex-column g-flex-align-center">
              <div class="v-mycenter-top-card-item-val">
                <span>{{ Number(totalInfo.todayQuantifyProfit).toFixed(2) }} </span>
              </div>
              <div class="v-mycenter-top-card-item-title">
                <span>{{ i18n.jinriShouYiText }}</span>
              </div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="v-mycenter-top-card-item g-flex-column g-flex-align-center">
              <div class="v-mycenter-top-card-item-val">
                <span>{{ Number(totalInfo.yesterdayQuantifyProfit).toFixed(2) }} </span>
              </div>
              <div class="v-mycenter-top-card-item-title">
                <span>{{ i18n.zuoriShouYiText }}</span>
              </div>
            </div>
          </van-grid-item>
          <!-- 量化收益 -->
          <van-grid-item>
            <div class="v-mycenter-top-card-item g-flex-column g-flex-align-center">
              <div class="v-mycenter-top-card-item-val">
                <span>{{ Number(totalInfo.quantifyProfit).toFixed(2) }} </span>
              </div>
              <div class="v-mycenter-top-card-item-title">
                <span>{{ i18n.lianghuaShouYiText }}</span>
              </div>
            </div>
          </van-grid-item>
          <!-- 未释放资金 -->
          <!-- <van-grid-item>
            <div class="v-mycenter-top-card-item g-flex-column g-flex-align-center">
              <div class="v-mycenter-top-card-item-val">
                <span>{{ Number(userInfo.unReleasedAmount).toFixed(2) }} </span>
              </div>
              <div class="v-mycenter-top-card-item-title">
                <span>{{ i18n.weishifangMoneyText }}</span>
              </div>
            </div>
          </van-grid-item> -->
          <van-grid-item>
            <div class="v-mycenter-top-card-item g-flex-column g-flex-align-center">
              <div class="v-mycenter-top-card-item-val">
                <span>{{ Number(totalInfo.monthProfit).toFixed(2) }} </span>
              </div>
              <div class="v-mycenter-top-card-item-title">
                <span>{{ i18n.benyueText }}</span>
              </div>
            </div>
          </van-grid-item>
          <!--<van-grid-item>
            <div class="v-mycenter-top-card-item g-flex-column g-flex-align-center">
              <div class="v-mycenter-top-card-item-val">
                <span>{{ Number(totalInfo.lastMonthProfit).toFixed(2) }} </span>
              </div>
              <div class="v-mycenter-top-card-item-title">
                <span>{{ i18n.shangyueText }}</span>
              </div>
            </div>
          </van-grid-item>-->
        </van-grid>
        <div class="v-mycenter-top-card-list">
          <div class="v-mycenter-top-card-item g-flex-align-center">
              <div class="v-mycenter-top-card-item-title">
                <span>{{ i18n.zongyuerText }}</span>
              </div>
              <div class="v-mycenter-top-card-item-val">
                <span>{{ Number(userInfo.balance).toFixed(2)  }}</span>
              </div>
          </div>
          
          <div class="v-mycenter-top-card-item  g-flex-align-center">
             <div class="v-mycenter-top-card-item-title">
                <span>{{ i18n.jinriShouYiText }}</span>
              </div>
            <div class="v-mycenter-top-card-item-val">
                <span>{{ Number(totalInfo.todayQuantifyProfit).toFixed(2) }} </span>
              </div>
            </div>

            <div class="v-mycenter-top-card-item g-flex-align-center">
              <div class="v-mycenter-top-card-item-title">
                <span>{{ i18n.zuoriShouYiText }}</span>
              </div>
              <div class="v-mycenter-top-card-item-val">
                <span>{{ Number(totalInfo.yesterdayQuantifyProfit).toFixed(2) }} </span>
              </div>
            
            </div>


            <div class="v-mycenter-top-card-item  g-flex-align-center">
              <div class="v-mycenter-top-card-item-title">
                <span>{{ i18n.zongShouYiText }}</span>
              </div>

              <div class="v-mycenter-top-card-item-val">
                <span>{{ Number(totalInfo.totalProfit).toFixed(2) }}</span>
              </div>
             
            </div>

            
             

        </div>
      </div>

      <div v-if="userInfo.levelNext.id" class="v-mycenter-top-next">
        <div class="v-mycenter-top-next-card">
          <div class="v-mycenter-top-next-card-top g-flex-align-center">
            <div class="v-next-card-left g-flex-column">
              <div class="v-next-card-left-title">
                <span>{{ i18n.nextLevelText }}</span>
              </div>
              <div class="v-next-card-left-val g-flex-align-center">
                <span>{{ userInfo.levelNext.title }}</span>
                <img src="/img/icon/mine_vip_crown.png" alt=""/>
              </div>
            </div>
            <div class="v-next-card-right g-flex-column g-flex-align-end g-flex-justify-center">
              <div class="v-next-card-right-money g-flex-align-center">
                <span class="v-next-card-right-money-title">{{ i18n.youxiaoMoneyText }}</span>
                <span class="v-next-card-right-money-value">({{ userInfo.balance }}/{{ userInfo.levelNext.amount
                }})</span>
              </div>
              <div v-show="userInfo.levelNext.spread_nums && userInfo.levelNext.id != 3" class="v-next-card-right-vip g-flex-align-center">
                <span class="v-next-card-right-money-title">{{ $t('mycenter.yishangHuiYuanTipText', {
                  val1:
                    filtersSperadLevelTitle(userInfo.levelNext)
                }) }}</span>
                <!-- <span class="v-next-card-right-money-title">{{ filtersSperadLevelTitle(userInfo.levelNext) }}{{ i18n.yishangVipText }}</span> -->
                <span class="v-next-card-right-money-value">({{ userInfo.levelNext.valid_nums }}/{{
                  userInfo.levelNext.spread_nums }})</span>
              </div>

              <div v-show="userInfo.levelNext.id == 3" class="v-next-card-right-vip g-flex-align-center">
                <!-- <span class="v-next-card-right-money-title">{{ filtersSperadLevelTitle(userInfo.levelNext) }}{{ i18n.yishangVipText }}</span> -->
                <span class="v-next-card-right-money-valu">{{ $t('mycenter.xuyaoYaoQingText', { val1: userInfo.levelNext.spread_nums, val2: store.system.UserRechargeAmount })}}</span>
              </div>
              
            </div>
          </div>
          <div class="v-mycenter-top-next-card-bottom g-flex-align-center">
            <div class="v-mycenter-top-next-card-bottom-item g-flex-column g-flex-align-center">
              <span
                class="v-mycenter-top-next-card-bottom-item-val">{{ totalInfo.agent1 }}({{ totalInfo.agentValid1 }})</span>
              <span class="v-mycenter-top-next-card-bottom-item-title">{{ i18n.yijiText }}</span>
            </div>
            <div class="v-mycenter-top-next-card-bottom-item g-flex-column g-flex-align-center">
              <span
                class="v-mycenter-top-next-card-bottom-item-val">{{ totalInfo.agent2 }}({{ totalInfo.agentValid2 }})</span>
              <span class="v-mycenter-top-next-card-bottom-item-title">{{ i18n.erjiText }}</span>
            </div>
            <div class="v-mycenter-top-next-card-bottom-item g-flex-column g-flex-align-center">
              <span
                class="v-mycenter-top-next-card-bottom-item-val">{{ totalInfo.agent3 }}({{ totalInfo.agentValid3 }})</span>
              <span class="v-mycenter-top-next-card-bottom-item-title">{{ i18n.sanjiText }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="v-mycenter-content-list">
        <!-- 公司简介 -->
        <div @click="ruleClick(6)" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-pop-about-us.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.gongsijianjieText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <!-- <div class="v-mycenter-content-right-text">
                <span>简体中文</span>
              </div> -->
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>
        <!-- 平台规则 -->
        <div @click="itemClick('intro')"
          class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/footer/intro_active.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.pingtaiguizeText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <!-- <div class="v-mycenter-content-right-text">
                <span>未认证</span>
              </div> -->
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>
        <!-- 身份认证 -->
        <!-- <div @click="userRealClick" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-pop-userreal.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.shengfengRengZhengText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <div :class="filtersRealStatusClass(userInfo.userReal.status)" class="v-mycenter-content-right-text">
              <span>{{ filtersRealStatus() }}</span>
            </div>
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div> -->

        <!-- 钱包管理 -->
        <div v-if="false" @click="itemClick('walletlist')"
          class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-pop-wallet.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.qianbaoGuanLiText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <!-- <div class="v-mycenter-content-right-text">
                <span>未认证</span>
              </div> -->
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <!-- 银行卡管理 -->
        <div v-if="false" @click="itemClick('bankcardlist')"
          class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-pop-wallet.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.yinghangkaGuanLiText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <!-- <div class="v-mycenter-content-right-text">
                <span>未认证</span>
              </div> -->
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>
        <!-- 常见问题 -->
        <div @click="ruleClick(8)" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-pop-problem.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.changjianwentiText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <!-- <div class="v-mycenter-content-right-text">
                <span>未认证</span>
              </div> -->
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <!-- 安全中心 -->
        <div @click="itemClick('safecenter')" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-pop-safe.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.safeCenterText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <!-- <div class="v-mycenter-content-right-text">
                <span>未认证</span>
              </div> -->
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <div @click="itemClick('mybill')" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-pop-mingxi.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.zijingmingxiText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <div @click="itemClick('invite')" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-pop-invite.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.inviteFriendText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <div @click="itemClick('myteam')" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-myteam.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.myTeamText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <!-- 量化教程 -->
        <div @click="ruleClick(21)" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-pop-jiaoxue.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.lianghuajiaochengText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <!-- <div class="v-mycenter-content-right-text">
                <span>未认证</span>
              </div> -->
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <!-- 语言设置 -->
        <div @click="itemClick('languageset')" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-pop-language.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.yuyanSetText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <div class="v-mycenter-content-right-text">
              <span>{{ selectLangObj.name }}</span>
            </div>
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <!-- 下载APP -->
        <div @click="downClick" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-pop-down.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.xiazaiAppText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <!-- <div class="v-mycenter-content-right-text">
                <span>简体中文</span>
              </div> -->
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="v-mycenter-exit-login-box g-flex-align-center g-flex-justify-center">
        <div @click="exitClick" class="v-mycenter-exit-login g-flex-align-center g-flex-justify-center">
          <span>{{ i18n.tuichuLoginText }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { apiGetUserInfo, apiGetLiangHuaTotalInfo, apiGetLiangHuaLevelList } from '@/utils/api.js'
import { filterBankCardNumber, dotDealWith, filtersRealStatusClass, formatDate, copyClick, upDownClass, upDownBgClass, filtersZhangfu, kefuClick, upDownBgFontColorClass } from "@/utils/index.js";
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
  return i18nObj.tm("mycenter");
});

function downClick() {
  window.location.href = store.system.downUrl
}

function userRealClick() {
  if (!store.token) return router.push({ name: 'login' })
  if ((!userInfo.value.userReal.id) || userInfo.value.userReal.status == 0) return router.push({ name: 'userreal' })
  if (userInfo.value.userReal.status == 1) return Toast(i18n.value.userRealSuccessTipsText)
  if (userInfo.value.userReal.status == 2) return Toast(i18n.value.userRealIngTipsText)
}

function itemClick(name) {
  router.push({ name: name })
}
function ruleClick(id) {
  router.push({ name: 'rule', query: { id: id } })
}

function exitClick(item) {
  Dialog.confirm({
    title: '',
    message: i18n.value.exitLoginOutTipsText,
    cancelButtonColor: '#000',
    confirmButtonColor: '#644FDC'
  })
    .then(() => { store.logout() }).catch(() => { });
}


let userInfo = computed(() => {
  return store.userInfo
})

async function apiGetUserInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  store.setUserInfo(data.info)
  apiGetLiangHuaLevelListHandel()
  console.log(data)
}

apiGetUserInfoHandel()

let levelList = reactive({
  list: []
})

function filtersSperadLevelTitle(obj) {
  let target = levelList.list.find(item => {
    return item.id == obj.spread_level
  })
  if (target) return target.title
  else return ''
}


// 获取等级列表
async function apiGetLiangHuaLevelListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetLiangHuaLevelList()
  if (!success) return
  levelList.list = data.list
}

let totalInfo = reactive({
  "balance": "0",
  "totalProfit": "0",
  "todayQuantifyProfit": "0",
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
  "quantifyProfit": "0"
})


async function apiGetLiangHuaTotalInfoHandel() {
  const { success, data } = await apiGetLiangHuaTotalInfo()
  if (!success) return
  Object.assign(totalInfo, data.info)
  console.log(data)
}

apiGetLiangHuaTotalInfoHandel()

function filtersRealStatus() {
  // status 0 认证失败
  // status 1 认证成功
  // status 2 认证中
  if ((!userInfo.value.userReal.id)) return i18n.value.noRenzhengText
  if (userInfo.value.userReal.status == 0) return i18n.value.statusFailText
  if (userInfo.value.userReal.status == 1) return i18n.value.statusSuccessText
  if (userInfo.value.userReal.status == 2) return i18n.value.statusIngText
}

let selectLangObj = computed(() => {
  console.log("store.lang", store.lang);
  if (!store.langList.length) return {};
  var target = store.langList.find((item) => item.code == store.lang);
  console.log("target", target);
  if (target) return target;
  else return store.langList[0];
});
</script>

<style lang='scss'>
.v_mycenter {
 
  .v-head {
    width: 100%;
    background: url('@/assets/img/mycenter_ headBg.png') 50% 50% no-repeat;
    background-size: 100% 100%;
    padding: 12px 10px 0px;
    height: 130px;
    overflow: hidden;

    .public_headerLogo {
      width: 131px;
                height: 39px;
    }
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
  .v-mycenter-container {
    padding: 0px 10px 10px 10px;
    flex: 1;
    overflow: auto;
    margin-top: -60px;

    .v-mycenter-head-box {
      overflow: hidden;
      position: relative;
      display: flex;
          align-items: end;
          padding: 2px;
          justify-content: space-between;
          padding-bottom: 10px;
      .v-mycenter-head-right-img {
          overflow: hidden;
          float: left;
          text-align: center;

          img.v-mycenter-head-right-level {
            width: auto;
            height: 30px;
            display: inline-block;
            margin-bottom: 5px;
          }
        img.v-mycenter-head-right-headImg {
          display: inline-block;
          padding:5px;
          border: 3px solid #0030FE;
          border-radius: 50%;
          display: block;
          width: 90px;
          height: 90px;
          border-radius: 50%;
        }
      }
    }
    .v-mycenter-head {
      float: right;
      width: calc(100% - 110px);
      // box-shadow: 0px 0px 5px #d3d3d3;
      box-shadow: 2px 1px 7px 2px rgba(12, 13, 12, 0.1);
      background: var(--g-white);
      border-radius: 8px;
      padding: 15px 10px;

      .v-mycenter-head-top {
        margin-bottom: 10px;

        .v-mycenter-head-title {
          font-size: 22px;
          font-weight: 700;
          color: #333;
        }

        .v-mycenter-head-level {
          margin-left: 10px;
          background-image: url(/img/icon/mine_information_vip.png);
          width: 65px;
          height: 32px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          .v-mycenter-head-level-text {
            height: 32px;
            line-height: 32px;
            font-size: 14px;
            padding-left: 20px;
            padding-top: 1px;
            font-weight: 700;
          }
          // img {
          //   width: 25px;
          //   object-fit: contain;
          // }
        }

        .v-my-center-team {
          margin-left: 10px;
          padding: 5px 10px;
          border-radius: 20px;
          background: var(--g-main_color);
          color: var(--g-white);
          font-size: 12px;

          .iconfont {
            font-size: 15px;
            margin-right: 4px;
          }
        }

        .v-my-center-no-active {
          margin-left: 10px;
          padding: 5px 10px;
          border-radius: 20px;
          background: var(--g-red);
          color: var(--g-white);
          font-size: 12px;

          .iconfont {
            font-size: 15px;
            margin-right: 4px;
          }
        }
      }

      .v-mycenter-head-bottom + .v-mycenter-head-bottom {
        margin-top: 5px;
      }
      .v-mycenter-head-bottom {
        .v-mycenter-head-bottom-id {
          font-size: 16px;
          color: #333;
          font-weight: 600;
          margin-left: 10px;
          word-break: break-all;
        }

        .v-mycenter-head-bottom-copy {
          padding-left: 5px;

          img {
            width: 12px;
          }
        }
      }

    }

    .v-mycenter-userreal {
      margin-top: 10px;
      background: #EEEBFC;
      border-radius: 8px;
      height: 40px;
      padding: 0 15px;

      .v-mycenter-userreal-left {
        flex: 1;

        .v-mycenter-userreal-left-img {
          img {
            width: 20px;
          }
        }

        .v-mycenter-userreal-left-title {
          color: var(--g-black);
          padding-left: 10px;
          font-size: 14px;
        }
      }

      .v-mycenter-userreal-right {
        // border: 1px solid var(--g-main_color);
        color: var(--g-main_color);
        font-size: 14px;
        padding: 2px 10px;
        border-radius: 10px;
        .iconfont {
          font-weight: 700;
        }
      }
    }

    .v-mycenter-top-card {
      padding: 10px 0px;
      box-shadow: 0px 0px 5px #d3d3d3;;
      border-radius: 10px;
      margin-bottom: 20px;
      margin-top: 20px;
      .v-mycenter-top-card-list {
       
        background: var(--g-white);
        
        padding: 0px 20px;

        .van-grid-item {
          background: transparent;

          .van-grid-item__content {
            background: transparent;
          }
        }


        .v-mycenter-top-card-item + .v-mycenter-top-card-item {
          border-top: 1px solid #D4D4D4;
        }
        .v-mycenter-top-card-item {
          
          flex: 1;
          line-height: 20px;
          position: relative;
          color: #000;
          padding: 10px 0px;

          .v-mycenter-top-card-item-title {
            text-align: center;
            font-size: 12px;
            padding-top: 5px;
            width: 50%;
            font-weight: 700;
            position: relative;
            border-right: 1px solid #D4D4D4;
            padding-right: 10px;
            text-align: right;
            
            ::after {
              content: '';
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #6400FE;
              position: absolute;
              left: 0px;
              top: 50%;
              margin-top: -6px;
            }
          }

          .v-mycenter-top-card-item-val {
            font-weight: 900;
            font-size: 18px;
            width: 50%;
            padding-left: 10px;
            
          }

          // &:nth-of-type(1) {
          //   &::after {
          //     content: "";
          //     position: absolute;
          //     right: 0;
          //     top: 4px;
          //     width: 1px;
          //     height: 30px;
          //     background: #e8e7e7;
          //   }
          // }
        }
      }
    }

    .v-mycenter-top-next {
      margin-top: 0px;
      background: #fff;
      box-shadow: 0px 0px 5px #d3d3d3;;
      border-radius: 10px;
      overflow: hidden;
      .v-mycenter-top-next-title {
        text-align: center;
        color: var(--g-black);
        font-weight: 700;
        line-height: 30px;
        font-size: 19px;
      }

      .v-mycenter-top-next-card {

        .v-mycenter-top-next-card-top {
          background-image: linear-gradient(to right, #FCCE83, #CF9C5B);
          padding: 15px;
          .v-next-card-left {
            width: 35%;
           .v-next-card-left-title {
            color: #935733;
            font-weight: normal;
           }
           .v-next-card-left-val {
            padding-top: 8px;
            font-size: 22px;
            letter-spacing: 0;
            font-weight: 700;
            color: #935636;
            line-height: 26px;
            img {
              height: 26px;
            }
           }
          }

          .v-next-card-right {
            color: #935733;
            font-size: 13px;
            flex: 1;

            .v-next-card-right-money {
              line-height: 22px;
            }
          }
        }


        .v-mycenter-top-next-card-bottom {
          padding: 10px 15px;
          background-image: linear-gradient(45deg, #fddbaa, #D8AD78);
          box-shadow: 0 0 10px #D7A968;
          .v-mycenter-top-next-card-bottom-item {
            flex: 1;
            font-size: 13px;

            .v-mycenter-top-next-card-bottom-item-val {
              color: var(--g-white);
              font-size: 16px;
            }
            .v-mycenter-top-next-card-bottom-item-title {
              padding-top: 5px;
              color: var(--g-white);
            }
          }
        }
      }
    }

    .v-mycenter-content-list {
      box-shadow: 2px 1px 7px 2px rgba(12, 13, 12, 0.1);
      margin-top: 15px;
      border-radius: 8px;
      background: var(--g-white);

      .v-mycenter-content-item {
        padding: 11px 9px;
        position: relative;
        // border-bottom: 0.8px solid #ccc;
        &::after {
          content: "";
          position: absolute;
          width: calc(100% - 55px);
          right: 5px;
          height: 1px;
          bottom: 0;
          background: #e9e8f0;
        }

        &:nth-last-of-type(1) {
        &::after {
          display: none;
        }
        }

        .v-mycenter-content-item-left {
          .v-mycenter-content-left-img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            justify-content: center;
            background: #EAE7F1;
            margin-right: 14px;
            img {
              width: 22px;
              height: 22px;
            }
          }

          .v-mycenter-content-left-text {
            padding-left: 0px;
            color: var(--g-black);
            font-size: 14px;
            font-weight: 700;
          }
        }

        .v-mycenter-content-item-right {
          .v-mycenter-content-right-text {
            font-size: 12px;
            color: var(--g-black);
            padding-right: 4px;
          }

          .v-mycenter-content-right-icon {
            .iconfont {
              font-size: 22px;
              color: #B5B2C4;
            }
          }
        }
      }
    }

    .v-mycenter-exit-login-box {
      margin-top: 10px;
      padding: 10px 10px;
      width: 100%;

      .v-mycenter-exit-login {
        background: var(--g-main_color);
        width: 100%;
        height: 40px;
        color: var(--g-white);
        font-size: 14px;
        border-radius: 4px;
      }
    }
  }

}</style>