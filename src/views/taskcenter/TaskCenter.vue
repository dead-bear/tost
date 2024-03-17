<template>
  <div class="v_main g-flex-column">
    <div class="v-main-head g-flex-align-center">
      <img src="@/assets/img/topimg.png" alt="logo" class="public_headerLogo">
    </div>
    <div class="top-tip">
      <span>{{ i18n.titleText }}</span>
    </div>
    <ul>
      <li v-for="(item, index) in list.list" :key="index">
        <div class="top">
          {{ item.title }}
        </div>
        <div class="info">
            <div class="tag">
              <span>Task {{index + 1 < 10 ? `0${index + 1}`: index + 1}}</span>
              <span>({{ item.finishNums }}/{{ item.nums }})</span>
            </div>
          <div class="content">
            <div v-html="item.des" class="v-task-item-bottom-left-content"/>
            <div class="bottom">
              <p v-if="(item.userTaskId == 0) && (item.finishNums >= item.nums)">
                <span>{{ i18n.yilingquText }}</span>
              </p>
              <p @click="lingquClick(item)" v-if="item.userTaskId > 0">
                <span>{{ i18n.lingquJiangLiText }}</span>
              </p>
              <p v-if="(item.userTaskId == 0) && (item.finishNums < item.nums)">
                <span>{{ i18n.nowanchengText }}</span>
              </p>
            </div>

          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script setup>
import { apiGetTaskList, apiLingQuTask } from '@/utils/api.js'
import { reactive, ref, computed } from 'vue';
import useStore from '@/store/index.js'
import { useI18n } from "vue-i18n";
import { Dialog, Toast } from 'vant';
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('taskCenter')
})

// 点击领取
function lingquClick(item) {
  Dialog.confirm({
    message: i18n.value.lingquTipsText,
    width: '220px',
    theme: 'round',
    cancelButtonColor: '#000',
    confirmButtonColor: '#0077ff',
  }).then(() => {
    apiLingQuTaskHandel(item)
  }).catch(() => { });
}

async function apiLingQuTaskHandel(item) {
  store.loadingShow = true
  const { success, data } = await apiLingQuTask({ userTaskId: item.userTaskId })
  if(!success) return
  Toast.success(data.msg)
  apiGetTaskListHandel()
}

let list = reactive({
  list: []
})
apiGetTaskListHandel()

async function apiGetTaskListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetTaskList()
  if(!success) return
  list.list = data.list
  console.log(data)
}
</script>

<style scoped lang='scss'>

.v_main {
  height: 100%;
  //padding-bottom: 90px;
  overflow: auto;
  background-image: url('@/assets/img/mycenter_ headBg.png'), url('@/assets/img/home_2.png');
  background-repeat: no-repeat, no-repeat;
  background-position: top center, bottom center;
  background-size: 100% 98px, 100% 317px;
  background-color: #FAFAFA;

  .v-main-head {
    width: 100%;
    background-size: 100% 100%;
    padding: 6px 0 0;
    display: flex;
    justify-content: center;
    overflow: hidden;
    img {
      height: 39px;
      width: 133px;
    }
  }
  .top-tip{
    margin: 24px 0 10px 17px;
    background: linear-gradient(90deg, #000000 0%, #e2e2e2 100%);
    border-radius: 6px;
    width: 279px;
    padding: 5px 12px;
    span{
      font-weight: 400;
      font-size: 13px;
      color: #FFFFFF;
    }
  }
  ul{
    padding: 10px 16px 70px;
    height: 100%;
    overflow-y: auto;
    li{
      background: #FFFFFF;
      box-shadow: 0px 0px 3px 1px rgba(12,13,12,0.39);
      border-radius: 12px;
      margin-bottom: 16px;
      .top{
        width: 100%;
        height: 87px;
      }
      .info{
        padding: 5px 9px 11px;
        .tag{
          display: flex;
          justify-content: space-between;
          align-items: center;
          span{
            font-weight: 400;
            font-size: 12px;
            color: #000000;
            &:first-child{
              background: linear-gradient(90deg, #000CFF 0%, rgba(0,12,255,0) 100%);
              border-radius: 2px;
              padding: 3px;
              font-weight: 400;
              font-size: 10px;
              color: #FFFFFF;
              width: 81px;
              display: inline-block;
            }
          }

          margin-bottom: 12px;
        }
      }
      .content{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        font-weight: 400;
        font-size: 17px;
        color: #000000;
        .bottom{
          margin-left: 20px;
          p{
            &:nth-of-type(2){
              background: #5488F6;
              color: var(--g-white);
              width: 90px;
              font-size: 15px;
              border-radius: 4px;
              line-height: 30px;
              text-align: center;
              height: 30px;
            }
          }
        }
      }
    }
  }
}


//.v_task_center {
//  height: 100%;
//  overflow: auto;
//  background-color: #F2F1F6;
//
//  .v-head {
//    height: 46px;
//    position: fixed;
//    background-color: #F2F1F6;
//    left: 0;
//    top: 0;
//    z-index: 9;
//    width: 100%;
//
//    .v-head-back-icon {
//      position: absolute;
//      left: 0;
//      top: 0;
//      height: 100%;
//      padding: 0 16px;
//
//      .iconfont {
//        font-size: 26px;
//        font-weight: 700;
//        color: var(--g-black);
//      }
//    }
//
//    .v-head-title {
//      flex: 1;
//      height: 100%;
//      text-align: center;
//      font-weight: 700;
//      font-size: 16px;
//      color: var(--g-black);
//    }
//
//    .v-head-right {
//      position: absolute;
//      height: 100%;
//      right: 0;
//      top: 0;
//      padding: 0 0 0 10px;
//
//      .iconfont {
//        font-size: 22px;
//        font-weight: 700;
//        color: var(--g-black);
//      }
//    }
//  }
//
//  .v-task-container {
//    flex: 1;
//    background-color: #F2F1F6;
//    padding-top: 50px;
//
//    .v-task-top {
//      padding: 0 15px;
//
//      .v-task-top-left {
//        flex: 1;
//
//        .v-task-top-left-title {
//          font-size: 26px;
//          line-height: 30px;
//        }
//
//        .v-task-top-left-des {
//          padding-top: 6px;
//          font-size: 14px;
//        }
//      }
//
//      .v-task-top-right {
//        img {
//          width: 120px;
//        }
//      }
//    }
//
//    .v-task-list {
//      padding: 15px;
//
//      .v-task-item {
//        background-color: var(--g-white);
//        border-radius: 10px;
//        padding: 15px;
//        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, .2);
//        margin-bottom: 15px;
//
//        .v-task-item-top {
//          .v-task-item-top-title {
//            .v-task-item-top-title-text {
//              font-size: 19px;
//              line-height: 24px;
//              color: var(--g-main_color);
//            }
//
//            .v-task-item-top-title-tips {
//              margin-left: 10px;
//              background-color: #C8D9FF;
//              color: var(--g-main_color);
//              padding: 2px 4px;
//              border-radius: 4px;
//              font-size: 14px;
//            }
//          }
//        }
//
//        .v-task-item-bottom {
//          gap: 10px;
//          .v-task-item-bottom-left {
//            flex: 1;
//            flex-shrink: 1;
//            padding-right: 15px;
//            .v-task-item-bottom-left-content {
//              padding: 10px 0;
//              color: var(--g-black);
//              font-size: 15px;
//              line-height: 20px;
//              text-align: justify;
//              word-break: break-all;
//            }
//          }
//
//          .v-task-item-bottom-right {
//            &.v-task-item-right-already {
//              background: #aec6f9;
//              color: var(--g-white);
//              width: 90px;
//              font-size: 15px;
//              border-radius: 4px;
//              height: 30px;
//            }
//
//            &.v-task-item-right-lingqu {
//              background: #5488F6;
//              color: var(--g-white);
//              width: 90px;
//              font-size: 15px;
//              border-radius: 4px;
//              height: 30px;
//            }
//
//            &.v-task-item-right-nolingqu {
//              background: #A9C3FA;
//              color: var(--g-black);
//              width: 90px;
//              font-size: 15px;
//              border-radius: 4px;
//              height: 30px;
//            }
//          }
//        }
//      }
//    }
//  }
//}
</style>
