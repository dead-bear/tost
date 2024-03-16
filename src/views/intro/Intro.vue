<template>
  <div class="v_rule g-flex-column">
    <div class="v-head g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuo"></i>
      </div>
      <!-- <div class="v-head-title g-flex-align-center g-flex-justify-center">
        <span>{{ infoObj.obj.title }}</span>
      </div> -->
      <!-- <div class="v-head-right g-flex-align-center">
      <i class="iconfont icon-datijilu"></i>
    </div> -->
    </div>

    <div class="v-rule-container" >
      <div class="v-intro-top-img-box">
        <div class="v-intro-top-img-content">
          <span>{{ infoObj.obj.title }}</span>
        </div>
      </div>
      <div class="v-rule-container-content" v-html="infoObj.obj.content"></div>
    </div>
  </div>
</template>

<script setup>
import { apiGetNoticeInfo } from '@/utils/api.js'
import { useRouter, useRoute } from 'vue-router';
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { formatDate } from '@/utils/index.js'
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()

const i18n = computed(() => {
  return i18nObj.tm('rule')
})

const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})

const route = useRoute()
const router = useRouter()

let form = reactive({
  id: 5
})

let infoObj = reactive({ obj: { create_time: 0 } })

async function apiGetNoticeInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetNoticeInfo(form)
  if (!success) return
  infoObj.obj = data.info
  console.log(data)
}

apiGetNoticeInfoHandel()
</script>

<style lang='scss'>
.v_rule {
  height: 100%;
  overflow: auto;
  background-color: var(--g-main-bgColor);

  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background-color: var(--g-main-bgColor);
    // border-bottom: 0.5px solid #474e5d;

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
        font-weight: 700;
        color: var(--g-black);
      }
    }
  }



  .v-rule-container {
    flex: 1;
    overflow: auto;
    padding: 15px;
    padding-top: 50px;
    background-color: var(--g-main-bgColor);
    .v-intro-top-img-box {
      width: 100%;
      height: 150px;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      background-image: url(/img/icon/introduce_top_inset.png);
      position: relative;
      .v-intro-top-img-content {
        width: 140px;
        color: #3D2BA2;
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 22px;
        font-weight: 700;
      }
    }
    .v-rule-container-content {
      margin-top: 10px;
      background: var(--g-white);
      font-size: 14px;
      border-radius: 10px;
      padding: 0 10px 10px 10px;
      line-height: 1.5;
      img {
        max-width: 100%;
      }
    }
  }
}</style>