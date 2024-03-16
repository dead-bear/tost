<template>
  <div class="c_notice_pop">
    <van-popup safe-area-inset-bottom class="c-pop" v-model:show="show" position="center">
      <div class="c-pop-container g-flex-column g-flex-align-center">
        <div :style="headBgStyle" class="c-pop-title g-flex-align-center">
          <div class="c-pop-title-text">
            <span>{{ noticeObj.title }}</span>
          </div>
        </div>
        <div class="c-pop-content">
          <div class="c-pop-content-list">
            <div class="c-pop-content-item">
              <div class="c-pop-item-content-text" v-html="noticeObj.content">
              </div>
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
import { myRequire } from '@/utils/index.js'
const store = useStore();
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('noticePop')
})

let bgImg = ref('url("'+store.banner.bulletin+'")')

let show = ref(false)
function onShow(list) {
  noticeObj.value = list[0]
  show.value = true
}

let noticeObj = ref({})

let noticeList = reactive({
  list: []
})

let headBgStyle = computed(() => {
  let urlString = myRequire(`notice-head.png`)
  return { 
    backgroundImage: `url(${urlString})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 0'
  }
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
    border-radius: 40px 0 10px 10px;
    background: var(--g-white);
    overflow-y: visible;
    .c-pop-container {
      height: 450px;
      width: 300px;
      position: relative;
      .c-pop-title {
        margin-top: -5px;
        width: calc(100% + 10px);
        height: 100px;
        .c-pop-title-text {
          color: #ffa129;
          font-size: 20px;
          font-weight: 700;
          text-align: center;
          line-height: 1.1;
          padding-left: 15px;
          padding-right: 10px;
          // width: 250px;
        }
      }
      .c-pop-content {
        width: 100%;
        flex: 1;
        overflow: auto;
        .c-pop-content-list {
          padding: 15px;
          .c-pop-content-item {
            .c-pop-item-title {
              position: relative;
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
        // top: 0px;
        // right: 0px;
        bottom: -36px;
        .iconfont {
          font-size: 26px;
          // font-weight: 700;
          color: var(--g-white)
        }
      }
    }
    
  }
}
</style>