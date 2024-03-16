<template>
  <div class="v_rule g-flex-column">
    <div class="v-head g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon">
        <i class="iconfont icon-zuo"></i>
      </div>
      
    </div>


    <div class="v-head-title">
        <span class="v-head-titleName">{{ infoObj.obj.title }}</span>
        <div class="v-rule-container" v-html="infoObj.obj.content">

        </div>

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
  id: route.query.id
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
  overflow: hidden;
  background-color: var(--g-white);

  .v-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background: url(/img/icon/quantify_top_inset.png) 50% 50% no-repeat;
    background-size: cover;
    padding: 20px 0px 0px;
    height: 300px;
    .v-head-back-icon {
      position: absolute;
      left: 10px;
      top: 20px;
      padding: 0 16px;
      .iconfont {
        font-size: 24px;
        font-weight: 600;
        color: var(--g-white);
      }
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

  .v-head-title {
      flex: 1;
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin-top: 200px;
      flex-direction: column;
      z-index: 100;

      .v-head-titleName {
        background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(36, 83, 248, 1) 100%);
        display: inline-block;
        width: 100%;
        height: 170px;
        border-top-left-radius: 40px;
        border-top-right-radius: 40px;
        padding-top: 30px;
      }
    }

  .v-rule-container {
    flex: 1;
    overflow: auto;
    padding: 15px;
    color: var(--g-black);
    font-size: 14px;
    z-index: 100;
    margin-top: -100px;
    overflow: auto;
    max-height: 400px;
    padding-bottom: 30px;
    background: #fff;
    img {
      max-width: 100%;
    }
  }
}</style>