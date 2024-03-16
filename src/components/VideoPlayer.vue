<template>
  <div :style="{ width: props.size.width, height: props.size.height }" class="c_video_player">
    <div :style="{ width: props.size.width, height: props.size.height }" @click="loadVideoClick" v-if="needAsyncLoad"
      class="c-video-player-no-video">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 32">
        <path
          d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z">
        </path>
      </svg>
      <img v-show="props.pic" :src="props.pic" alt="">
    </div>
    <div :style="{ width: props.size.width, height: props.size.height }" v-if="!needAsyncLoad">
      <div :id="'dplayer' + props.id" class="dplayer" :style="{ width: props.size.width, height: props.size.height }">
      </div>
    </div>
  </div>
</template>
<script setup>
import { nextTick, onMounted, watch, onUnmounted, ref } from 'vue'
import HLS from 'hls.js'
import DPlayer from 'dplayer';
const props = defineProps({
  needAsyncLoad: {
    type: Boolean,
    default() {
      return true
    }
  },
  id: {
    type: Number,
    default() {
      return new Date().getTime()
    }
  },
  url: {
    type: String,
    default() {
      return ''
    }
  },
  size: {
    type: Object,
    default() {
      return { width: '100%', height: '100%' }
    }
  },
  live: {
    type: Boolean,
    default() {
      return false
    }
  },
  pic: {
    type: String,
    default() {
      return ''
    }
  }
})

let emits = defineEmits(['emitLoadVideo'])

let isClickLoad = ref(false)
function loadVideoClick() {
  isClickLoad.value = true
  emits('emitLoadVideo')
}


let dp = ref({})
function initDPlayer() {
  dp.value = new DPlayer({
    preload: 'none',
    live: props.live,
    container: document.getElementById(`dplayer${props.id}`),
    hotkey: false,
    lang: 'en',
    video: { url: props.url, pic: props.pic },
  })
  if (isClickLoad.value) {
    if (HLS.isSupported()) {
      dp.value.video.play()
    } else {
      // 苹果不知道为什么需要延迟一下才能播放
      setTimeout(() => {
        dp.value.video.play()
      }, 100);
    }
  }
}

function initDFenPianPlayer() {
  // 苹果默认就支持播放m3u8的视频 不需要使用hls.js处理
  if (HLS.isSupported()) {
    // 是安卓
    dp.value = new DPlayer({
      preload: 'none',
      container: document.getElementById(`dplayer${props.id}`),
      lang: 'en',
      video: {
        url: props.url,
        type: 'customHls',
        customType: {
          customHls: (video, player) => {
            const hls = new HLS();
            console.log('hls', hls)
            hls.loadSource(video.src);
            hls.attachMedia(video);
          }
        }
      }
    })
    if (isClickLoad.value) {
      dp.value.video.play()
    }
  } else {
    // 是苹果
    initDPlayer()
  }
}

// watch(() => props.url, (nVal, oVal) => {
//   console.log('nVal', nVal)
//   console.log('nVal', oVal)
//   const fileName = nVal.lastIndexOf('.'); // 取到文件名开始到最后一个点的长度
//   const fileNameLen = nVal.length; // 取到文件名长度
//   const fileType = nVal.substring(fileName + 1, fileNameLen).toLowerCase(); // 截文件后缀
//   console.log('fileType', fileType)
//   if (fileType != 'm3u8') {
//     nextTick(() => {
//       initDPlayer()
//     })
//   } else {
//     nextTick(() => {
//       initDFenPianPlayer()
//     })
//   }
// }, {
//   immediate: true
// })


watch(() => props.needAsyncLoad, (nVal, oVal) => {
  console.log('nVal', nVal)
  console.log('oVal', oVal)
  if (!nVal && props.url) {
    let fileType = getFileType(props.url)
    console.log('fileType', fileType)
    if (fileType != 'm3u8') {
      nextTick(() => {
        initDPlayer()
      })
    } else {
      nextTick(() => {
        initDFenPianPlayer()
      })
    }
  }
}, {
  immediate: true
})

function getFileType(url) {
  const fileName = url.lastIndexOf('.'); // 取到文件名开始到最后一个点的长度
  const fileNameLen = url.length; // 取到文件名长度
  const fileType = url.substring(fileName + 1, fileNameLen).toLowerCase(); // 截文件后缀
  return fileType
}


onUnmounted(() => {
  if (!props.needAsyncLoad && dp.value.destroy) {
    console.log('销毁dplayer')
    dp.value.destroy()
  }
})
</script>

 
<style lang='scss'>
.c_video_player {
  width: 100%;

  .dplayer {
    .dplayer-notice-list {
      display: none!important;
    }
    // .dplayer-controller {
    //   display: none !important;
    // }

    //设置按钮
    .dplayer-setting {
      display: none !important;
    }

    //全屏按钮
    // .dplayer-full {
    //   display: none !important;
    // }
  }

  .c-video-player-no-video {
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    background: #000;

    svg {
      position: absolute;
      z-index: 999;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 50px;
      fill: #CCCCCC;
      height: 50px;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}</style>