<template>
  <div class="c_notice_pop">
    <van-popup safe-area-inset-bottom class="c-pop" v-model:show="show" position="center">
      <div :style="{ backgroundImage: bgImg }" class="c-pop-container g-flex-column g-flex-align-center">
        <div v-if="false" class="c-pop-title">
          <div class="c-pop-title-text">
            <span>{{ $t('noticePop.newTitleText', { val1: store.system.WebTitle }) }}</span>
          </div>
        </div>
        <div class="c-pop-content">
          <div class="c-pop-content-list">
            <div class="c-pop-content-item" v-for="(item, index) in noticeList.list" :key="index">
              <div class="c-pop-item-title g-flex-align-center">
                <div class="c-pop-item-title-nums g-flex-align-center g-flex-justify-center">
                  {{ index + 1 }}
                </div>
                <div class="c-pop-item-title-text" v-if="item.title">
                  {{ item.title }}
                </div>
              </div>
              <div class="c-pop-item-content-text" v-html="item.content">
              </div>
<!--              <div class="c-pop-item-content-text">-->
<!--                <span>{{ item.des }}</span>-->
<!--              </div>-->
            </div>
          </div>
        </div>
        <div class="c-pop-close" @click="onClose">
          <i class="iconfont icon-guanbi2"></i>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
const store = useStore();
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('noticePop')
})

let bgImg = ref('url("'+store.banner.bulletin+'")')

let show = ref(false)
function onShow(list) {
  noticeList.list = list
  show.value = true
}

let noticeList = reactive({
  list: []
})

function onClose() {
  show.value = false
}

defineExpose({
  onShow
})
</script>

<style lang='scss'>
.c_notice_pop {
  .c-pop {
    border-radius: 10px;
    background: var(--g-white);
    overflow-y: visible;
    .c-pop-container {
      height: 450px;
      width: 300px;
      position: relative;
      //background-image: url(/img/banner/bulletin.jpg?v=1);
      background-size: 100%;
      .c-pop-title {
        width: 100%;
        // height: 50px;
        padding: 0 10px;
        .c-pop-title-text {
          padding-top: 15px;
          color: #ffa129;
          //color: var(--g-black);
          font-size: 22px;
          font-weight: 700;
          text-align: center;
          line-height: 1.1;
          padding-bottom: 15px;
        }
      }
      .c-pop-content {
        width: 100%;
        flex: 1;
        overflow: auto;
        .c-pop-content-list {
          .c-pop-content-item {
            padding: 10px 10px 10px 35px;
            .c-pop-item-title {
              position: relative;
              .c-pop-item-title-nums {
                position: absolute;
                top: 1px;
                left: -24px;
                width: 17px;
                height: 17px;
                font-size: 12px;
                text-align: center;
                color: var(--g-white);
                line-height: .4533333333rem;
                background-color: var(--g-main_color);
                border-radius: 50%;
              }
              .c-pop-item-title-text {
                //color: var(--g-black);
                color: #ffa129;
                font-weight: 700;
                font-size: 18px;
                line-height: 1.5;
                padding-bottom: 5px;
              }
            }
            .c-pop-item-content-text {
              line-height: 1.3;
              font-size: 14px;
            }
          }
        }
      }
      .c-pop-close {
        position: absolute;
        z-index: 99999;
        bottom: -32px;
        .iconfont {
          font-size: 26px;
          color: var(--g-white)
        }
      }
    }
    
  }
}
</style>