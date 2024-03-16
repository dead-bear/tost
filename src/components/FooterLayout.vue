<template>
  <van-tabbar @change="onChange" v-model="active" class="s_footer_layout_container" :safe-area-inset-bottom="false"
    active-color="#644FDC" inactive-color="#85858D">
    <van-tabbar-item :name="'main'" class="s-tab-item">
      <span class="s-footer-layout-title">{{ i18n.mainText }}</span>
      <template #icon="props">
        <img :src="
          props.active
            ? '/img/footer/home_active.png'
            : '/img/footer/home.png'
        " alt="" />
      </template>
    </van-tabbar-item>



    <van-tabbar-item :name="'quantify'" class="s-tab-item s-tab-item-middle">
      <span class="s-footer-layout-title">{{ i18n.lianghuaText }}</span>
      <template #icon="props">
        <img :src="
          props.active
            ? '/img/footer/lianghua_active.png'
            : '/img/footer/lianghua.png'
        " alt="" />
      </template>
    </van-tabbar-item>


    <van-tabbar-item :name="'myteam'" class="s-tab-item">
      <span class="s-footer-layout-title">{{ i18n.teamText }}</span>
      <template #icon="props">
        <img :src="
          props.active
            ? '/img/footer/myteam_active.png'
            : '/img/footer/myteam.png'
        " alt="" />
      </template>
    </van-tabbar-item>
    

<!--    <van-tabbar-item :name="'wakuang'" class="s-tab-item">-->
<!--      <span class="s-footer-layout-title">{{ i18n.kuangjiText }}</span>-->
<!--      <template #icon="props">-->
<!--        <img :src="-->
<!--          props.active-->
<!--            ? '/img/footer/wakuang_active.png'-->
<!--            : '/img/footer/wakuang.png'-->
<!--        " alt="" />-->
<!--      </template>-->
<!--    </van-tabbar-item>-->

    <van-tabbar-item :name="'mycenter'" class="s-tab-item">
      <span class="s-footer-layout-title">{{ i18n.myText }}</span>
      <template #icon="props">
        <img :src="
          props.active
            ? '/img/footer/my_active.png'
            : '/img/footer/my.png'
        " alt="" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { apiGetUserInfo } from '@/utils/api.js'
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import useStore from "@/store/index.js";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("footerLayout");
});

const router = useRouter();
const route = useRoute();

const active = ref("");

let userInfo = computed(() => {
  return store.userInfo
})


async function apiGetUserInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  store.setUserInfo(data.info)
  console.log(data)
}

// if(store.token) {
//   apiGetUserInfoHandel()
// }


watch(
  route,
  (nval, oval) => {
    // if (nval.name == "quantify" && (userInfo.value.status == 3 || userInfo.value.status == 5)) {
    //   Toast(i18n.value.meiyouLiangHuaText)
    // }
    active.value = nval.name;
  },
  {
    immediate: true,
  }
);

function onChange(name) {
  // if(name == 'quantify' && (userInfo.value.status == 3 || userInfo.value.status == 5)) {
  //   return Toast(i18n.value.meiyouLiangHuaText)
  // }else {
  // }
  router.push({ name })
}
</script>

<style lang="scss">
.s_footer_layout_container {
  &.van-tabbar {
    background: var(--g-white);
    z-index: 999;
    height: 50px;
    bottom: 0px;
    bottom: constant(safe-area-inset-bottom); //苹果底部安全距离
    bottom: env(safe-area-inset-bottom); //苹果底部安全距离
    &::after {
      border-width: 0;
    }
    // @include mediaMaxWidth();
    // left: 50%;
    // transform: translateX(-50%);
    .s-tab-item {
      font-size: 12px;
      &.van-tabbar-item--active {
        background: var(--g-white);
      }
      .s-footer-layout-title {
        @include textManyOverflow(1);
      }

      .van-tabbar-item__icon {
        .iconfont {
          font-size: 22px;
        }

        img {
          height: 24px;
        }
      }
      // &.s-tab-item-middle {
      //   .van-tabbar-item__icon {
      //     img {
      //         background: transparent;
      //         position: relative;
      //         z-index: 99999;
      //         transform: translate3d(0,-10px,0) scale(2);
      //       }
      //     }
      //   }
    }
  }
}
</style>
