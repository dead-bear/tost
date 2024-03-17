<template>
    <van-tabbar @change="onChange" v-model="active" class="s_footer_layout_container" :safe-area-inset-bottom="false"
                active-color="#644FDC" inactive-color="#85858D">
      <van-tabbar-item :name="'main'" class="s-tab-item">
        <!--      <span class="s-footer-layout-title">{{ i18n.mainText }}</span>-->
        <template #icon="props">
          <img :src="
          props.active
            ? homen
            : homen
        " alt="" />
        </template>
      </van-tabbar-item>



      <van-tabbar-item :name="'quantify'" class="s-tab-item s-tab-item-middle">
        <!--      <span class="s-footer-layout-title">{{ i18n.lianghuaText }}</span>-->
        <template #icon="props">
          <img :src="
          props.active
            ? lianghu_n_e
            : lianghu_n
        " alt="" />
        </template>
      </van-tabbar-item>


      <van-tabbar-item :name="'team'" class="s-tab-item">
        <!--      <span class="s-footer-layout-title">{{ i18n.teamText }}</span>-->
        <template #icon="props">
          <img :src="
          props.active
            ? myteam_n_e
            : myteam_n
        " alt="" />
        </template>
      </van-tabbar-item>


      <van-tabbar-item :name="'taskcenter'" class="s-tab-item">
        <!--      <span class="s-footer-layout-title">{{ i18n.kuangjiText }}</span>-->
        <template #icon="props">
          <img :src="
          props.active
            ? wenb_n_e
            : wenb_n
        " alt="" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item :name="'mycenter'" class="s-tab-item">
        <!--      <span class="s-footer-layout-title">{{ i18n.myText }}</span>-->
        <template #icon="props">
          <img :src="
          props.active
            ? my_n
            : my_n
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
import homen from '@/assets/img/footer/home_n.png'
import lianghu_n from '@/assets/img/footer/lianghu_n.png'
import lianghu_n_e from '@/assets/img/footer/lianghu_n_e.png'
import myteam_n from '@/assets/img/footer/myteam_n.png'
import myteam_n_e from '@/assets/img/footer/myteam_n_e.png'
import wenb_n from '@/assets/img/footer/wenb_n.png'
import wenb_n_e from '@/assets/img/footer/wenb_n_e.png'
import my_n from '@/assets/img/footer/my_n.png'
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
footer{
  background: #FFFFFF;
  box-shadow: 2px 1px 7px 3px rgba(12,13,12,0.1);

  padding: 0 37px;
}
.s_footer_layout_container {
  &.van-tabbar {
    background: var(--g-white);
    z-index: 999;
    width: 80%;
    left: 37px;
    height: 60px;
    border-radius: 16px;
    overflow: hidden;
    //padding: 8px 13px 13px;
    bottom: 22px;
    //bottom: constant(safe-area-inset-bottom); //苹果底部安全距离
    //bottom: env(safe-area-inset-bottom); //苹果底部安全距离
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
          height: 40px;
          //width: 47px;
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
