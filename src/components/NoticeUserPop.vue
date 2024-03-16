<template>
  <div class="c_notice_user_pop">
    <van-popup :duration="0.6" :close-on-click-overlay="false" safe-area-inset-bottom class="c-pop" v-model:show="show" position="center">
      <div class="c-pop-container g-flex-column g-flex-align-center" style="background-size: 100% 100%; background-repeat: no-repeat; background-position: 0% 0%; background-image: url('/img/icon/notice-bg.png');">
        <div class="c-pop-title" style="background-image: url('/img/icon/notice-title-bg.png');">
          <div class="c-pop-title-text">
            <span>{{ noticeObj.obj.title }}</span>
          </div>
        </div>
        <div class="c-pop-content">
          <div class="c-pop-content-list">
            <div class="c-pop-content-item">
              <div class="c-pop-item-content-text" v-html="noticeObj.obj.content">
              </div>
            </div>
          </div>
        </div>
        <div class="c-pop-close" @click="onClose">
          <i class="iconfont icon-guanbi2">
          </i>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onUnmounted } from 'vue'
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
const store = useStore();
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('noticePop')
})
let show = ref(false)
function onShow(obj) {
  console.log("onShow obj",obj)
  secNums.value = 5
  noticeObj.obj = obj
  //setTimeDown()
  show.value = true
}

let noticeObj = reactive({
  obj: {}
})


function onClose() {
  cleanTimer()
  show.value = false
}

let secNums = ref(5)
let timer = ref(0)

function setTimeDown() {
  secNums.value = secNums.value - 1
  timer.value = setInterval(() => {
    secNums.value = secNums.value - 1
    if(secNums.value <= 0) {
      secNums.value = 0
      cleanTimer()
      onClose()
    }
  }, 1000)
}


function cleanTimer() {
  clearInterval(timer.value)
  timer.value = 0
}

defineExpose({
  onShow
})

onUnmounted(() => {
  cleanTimer()
})
</script>

<style lang='scss'>
.c_notice_user_pop {
  .c-pop {
    overflow-y: visible;
    z-index: 99999!important;
    background: transparent;

    .c-pop-container {
      height: 112vw;
      width: 80vw;
      position: relative;
      padding: 5.333333vw 4vw;
      .c-pop-title {
        width: 100%;
        height: 34.666667vw;
        background-position: left top;
        background-size: 34.666667vw 27.2vw;
        margin-top: -21.333333vw;
        background-repeat: no-repeat;
        .c-pop-title-text {
          margin-top: 22.4vw;
          color: var(--g-black);
          font-size: 4.8vw;
          text-align: center;
          font-weight: 700;
          line-height: 5.866667vw;
          word-break: break-all;
        }
      }
      .c-pop-content {
        width: 100%;
        flex: 1;
        overflow: auto;
        .c-pop-content-list {
          .c-pop-content-item {
            padding: 2.666667vw 4vw;

            .c-pop-item-content-text {
              color: var(--g-black);
              line-height: 1.3;
              font-size: 3.2vw;
              img {
                max-width: 100%!important;
              }
            }
          }
        }
      }
      .c-pop-close {
        position: absolute;
        z-index: 99999;
        top: 2.133333vw;
        right: 4.266667vw;
        .iconfont {
          font-size: 6.933333vw;
          font-weight: 700;
          color: var(--g-black);
        }
      }

    }

  }
}
</style>