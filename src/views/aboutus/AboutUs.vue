<template>
  <div class="v_about_us g-flex-column">
    <div class="v-head g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuo"></i>
      </div>
      <div class="v-head-title g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.titleText }}</span>
      </div>
      <!-- <div class="v-head-right g-flex-align-center">
        <i class="iconfont icon-datijilu"></i>
      </div> -->
    </div>
    <div class="v-about-us-container">
      <div class="v-about-us-logo g-flex-align-center g-flex-justify-center">
        <img :src="store.banner.logo[1]" alt="">
      </div>

      <div class="v-content-list">
          <!-- 平台简介 -->
          <div @click="ruleClick(6)" class="v-content-item g-flex-justify-between g-flex-align-center">
            <div class="v-content-item-left g-flex-align-center">
              <!-- <div class="v-content-left-img g-flex-align-center">
                <img src="/img/icon/mycenter-pop-userreal.png" alt=""/>
              </div> -->
              <div class="v-content-left-text">
                <span>{{ i18n.pingtaijianjieText }}</span>
              </div>
            </div>
            <div class="v-content-item-right g-flex-align-center">
              <!-- <div class="v-content-right-text">
                <span>未认证</span>
              </div> -->
              <div class="v-content-right-icon g-flex-align-center">
                <i class="iconfont icon-you"></i>
              </div>
            </div>
          </div>

          <div v-if="false" @click="ruleClick(2)" class="v-content-item g-flex-justify-between g-flex-align-center">
            <div class="v-content-item-left g-flex-align-center">
              <!-- <div class="v-content-left-img g-flex-align-center">
                <img src="/img/icon/mycenter-pop-userreal.png" alt=""/>
              </div> -->
              <div class="v-content-left-text">
                <span>{{ i18n.yingsiText }}</span>
              </div>
            </div>
            <div class="v-content-item-right g-flex-align-center">
              <!-- <div class="v-content-right-text">
                <span>未认证</span>
              </div> -->
              <div class="v-content-right-icon g-flex-align-center">
                <i class="iconfont icon-you"></i>
              </div>
            </div>
          </div>

          <div v-if="false" @click="ruleClick(4)" class="v-content-item g-flex-justify-between g-flex-align-center">
            <div class="v-content-item-left g-flex-align-center">
              <!-- <div class="v-content-left-img g-flex-align-center">
                <img src="/img/icon/mycenter-pop-userreal.png" alt=""/>
              </div> -->
              <div class="v-content-left-text">
                <span>{{ i18n.zhucexieyiText }}</span>
              </div>
            </div>
            <div class="v-content-item-right g-flex-align-center">
              <!-- <div class="v-content-right-text">
                <span>未认证</span>
              </div> -->
              <div class="v-content-right-icon g-flex-align-center">
                <i class="iconfont icon-you"></i>
              </div>
            </div>
          </div>

          <div v-if="false" @click="ruleClick(1)" class="v-content-item g-flex-justify-between g-flex-align-center">
            <div class="v-content-item-left g-flex-align-center">
              <!-- <div class="v-content-left-img g-flex-align-center">
                <img src="/img/icon/mycenter-pop-userreal.png" alt=""/>
              </div> -->
              <div class="v-content-left-text">
                <span>{{ i18n.shiyongzheText }}</span>
              </div>
            </div>
            <div class="v-content-item-right g-flex-align-center">
              <!-- <div class="v-content-right-text">
                <span>未认证</span>
              </div> -->
              <div class="v-content-right-icon g-flex-align-center">
                <i class="iconfont icon-you"></i>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
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
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("aboutUs");
});


function ruleClick(id) {
  router.push({ name: 'rule', query: { id: id } })
}
</script>

<style lang='scss'>
.v_about_us {
  height: 100%;
  overflow: auto;
  background-color: var(--g-main-bgColor);
  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    z-index: 9;
    top: 0;
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
  .v-about-us-container {
    flex: 1;
    overflow: auto;
    padding-top: 46px;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 10px;
    .v-about-us-logo {
      padding-bottom: 20px;
      img {
        height: 100px;
      }
    }
    .v-content-list {
        background: #203036;
        .v-content-item {
          padding: 11px 9px;
          border-bottom: 0.8px solid #0e1721;
          .v-content-item-left {
            .v-content-left-img {
              padding-right: 4px;
              img {
                width: 22px;
                height: 22px;
              }
            }
            .v-content-left-text {
              color: var(--g-white);
              font-size: 13px;
            }
          }
          .v-content-item-right {
            .v-content-right-text {
              font-size: 12px;
              color: var(--g-white);
              padding-right: 4px;
            }
            .v-content-right-icon {
              .iconfont {
                font-size: 18px;
              }
            }
          }
        }
      }
  }
}
</style>