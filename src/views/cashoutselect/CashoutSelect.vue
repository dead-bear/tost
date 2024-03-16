<template>
  <div class="v_cashout_select g-flex-column">
    <div class="v-head g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuo"></i>
      </div>
      <div class="v-head-title g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.titleText }}</span>
      </div>
      <div @click="$router.push({ name: 'cashouthistory'})" class="v-head-right g-flex-align-center">
        <i class="iconfont icon-datijilu"></i>
      </div>
    </div>
    <div class="v-cashout-select-container">
      <div class="v-cashout-select-list">
        <div @click="itemClick(item)" v-for="(item, index) in list.list" :key="index"
          class="v-cashout-select-item g-flex-align-center">
          <div class="v-cashout-methon-item-left g-flex-align-center">
            <img :src="item.icon" alt="" />
            <span>{{ item.title }}</span>
          </div>
          <div class="v-cashout-methon-item-right g-flex-align-center">
            <i class="iconfont icon-you"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script setup>
import useStore from '@/store/index.js'
import { reactive, ref, computed } from 'vue';
import { apiGetCashOutList } from '@/utils/api.js'
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from 'vue-router';
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('cashoutSelect')
})
const route = useRoute()
const router = useRouter()
let list = reactive({ list: [] })

// 获取充值通道
async function apiGetCashOutListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetCashOutList({ type: 1 })
  if (!success) return
  list.list = data.list
}

apiGetCashOutListHandel()


function itemClick(item) {
  if (item.fn == 'Bank') {
    router.push({ name: 'cashoutbank', params: { id: item.id } })
  } else if (item.fn == 'Wallet') {
    router.push({ name: 'cashoutbi', params: { id: item.id } })
  } else if (item.fn == 'KeFu') {
    router.push({ name: 'cashoutkefu', params: { id: item.id } })
  }
}

</script>
 
<style lang='scss'>
.v_cashout_select {
  height: 100%;
  overflow: auto;
 background-color: var(--g-white);
  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
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

  .v-cashout-select-container {
    flex: 1;
    overflow: auto;
    padding-top: 50px;
    padding-bottom: 70px;

    .v-cashout-select-list {
      padding: 15px;

      .v-cashout-select-item {
        padding: 15px 0;
        border-bottom: 0.5px solid #e4e7ed;

        .v-cashout-methon-item-left {
          flex: 1;

          img {
            width: 22px;
          }

          span {
            font-size: 14px;
            color: var(--g-black);
            padding-left: 10px;
          }
        }

        .v-cashout-methon-item-right {
          padding-right: 5px;

          img {
            width: 10px;
          }
          .iconfont {
            font-size: 18px;
            font-weight: 700;
            color: var(--g-black);
          }
        }
      }
    }
  }
}</style>