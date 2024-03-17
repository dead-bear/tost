<script setup>
import usdt from '@/assets/img/usdt.png'
import t_report from '@/assets/img/t_report.png'
import m_team from '@/assets/img/m_team.png'
import {computed, reactive} from "vue";
import useStore from "@/store";
import vueQr from 'vue-qr/src/packages/vue-qr.vue';

import {useI18n} from "vue-i18n";
import {apiGetUserInfo} from "@/utils/api";
import {copyClick} from "@/utils";
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('invite')
})
const store = useStore();
let form = reactive({
  address: ''
})
async function apiGetUserInfoHandel() {
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  store.setUserInfo(data.info)
  form.address = data.info.promoteUrl
  console.log(data)
}

apiGetUserInfoHandel()
</script>

<template>
  <div class="v_main g-flex-column">
    <div class="v-main-head g-flex-align-center">
      <img src="@/assets/img/topimg.png" alt="logo" class="public_headerLogo">
    </div>
    <div class="v-main-container">
        <h5>Team data</h5>
      <div class="v-container">
        <div class="top">
          <div class="left">
              <div>
                <p>
                  <img :src="usdt" alt="">
                  <span>2,585.55 </span>
                </p>
                <p>Assets Available</p>
              </div>
              <hr/>
              <div>
                <p>
                  <img :src="usdt" alt="">
                  <span>2,585.55 </span>
                </p>
                <p>Assets Available</p>
              </div>
            </div>
          <span class="vertical"/>
          <div class="right">
            <div>
              <p>
                <img :src="usdt" alt="">
                <span>2,585.55 </span>
              </p>
              <p>Assets Available</p>
            </div>
            <hr/>
            <div>
              <p>
                <img :src="usdt" alt="">
                <span>2,585.55 </span>
              </p>
              <p>Assets Available</p>
            </div>
          </div>
        </div>
        <div class="invite">{{i18n.titleText}}</div>
        <div class="code">
            <div class="crcode">
              <vue-qr v-if="form.address" :correctLevel="3" ref="refVueQr" :text="form.address" :margin="marginVal"
                      :size="130"></vue-qr>
            </div>
        </div>
        <div class="link">
          <span>{{i18n.inviteLinkText}}</span>
          <p>
            <span>{{form.address}}</span>
            <img src="@/assets/img/mycenter_ copy.png" alt="" @click="copyClick(form.address)"/>
          </p>
        </div>
        <div class="bottom_f">
          <p>
            <img :src="t_report" alt="">
            <span>Team report</span>
          </p>
          <p @click="$router.push({name:'myteam'})">
            <img :src="m_team" alt="">
            <span>My team</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.v_main {
  height: 100%;
  padding-bottom: 90px;
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
    img{
      height: 39px;
      width: 133px;
    }
  }


  .v-main-container{
    margin-top: 22px;
    padding: 0;
    h5{
      text-align: center;
      font-weight: bold;
      font-size: 11px;
      color: #000000;
    }
    .v-container{
      padding: 11px 15px;
      .top{
        background: #FFFFFF;
        border-radius: 23px;
        border: 1px solid #000000;
        padding: 28px 46px;
        display: flex;
        justify-content: space-between;
        img{
          height: 17px;
          width: 17px;
        }
        .vertical{
          border-left: 1px solid #767676;
          height: 95px;
          display: inline-block;
          opacity: 0.35;
        }
        .left{
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          hr{
            margin: 16px 0;
            opacity: 0.35;
          }
          p{
            font-weight: bold;
            font-size: 11px;
            color: #000000;
            &:first-child{
              display: flex;
              margin-bottom: 4px;
              align-items: center;
              span{
                margin-left: 3px;
                font-weight: 900;
                font-size: 16px;
                color: #000000;
              }
            }
          }
        }
        .right{
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          hr{
            margin: 16px 0;
            opacity: 0.35;
          }
          p{
            font-weight: bold;
            font-size: 11px;
            color: #000000;
            &:first-child{
              display: flex;
              margin-bottom: 4px;
              align-items: center;
              span{
                margin-left: 3px;
                font-weight: 900;
                font-size: 16px;
                color: #000000;
              }
            }
          }
        }
      }
    }
    .invite{
      background: linear-gradient(0deg, #A1C4FD 0%, #C2E9FB 100%);
      border-radius: 14px;
      padding: 13px 0;
      font-weight: bold;
      font-size: 11px;
      margin: 15px 0 24px;
      color: #000000;
      text-align: center;
      border: 1px solid #000000;
    }
    .code{
      background: url('@/assets/img/robot.png') no-repeat left center / 90% 100%;
      height: 208px;
      display: flex;
      align-items: center;
      justify-content: center;
      .crcode{
        height: 173px;
        width: 173px;
        background: url('@/assets/img/code_m.png') no-repeat center center / 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .link{
      background: #FFFFFF;
      box-shadow: 2px 1px 9px 4px rgba(12,13,12,0.14);
      border-radius: 19px;
      padding: 14px 19px;
      span{
        font-weight: bold;
        font-size: 9px;
        color: #ACACAC;
      }
      p{
        font-weight: 900;
        font-size: 8px;

        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
          color: #000000;
        }
        img{
          width: 13px;
          height: 15px;
        }
      }
    }
    .bottom_f{
      display: flex;
      justify-content: space-between;
      margin-top: 19px;
      p{
        width: calc(100% / 2 - 8px);
        background: #FDFDFE;
        border-radius: 15px;
        border: 1px solid #000000;
        padding: 9px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          font-weight: bold;
          font-size: 13px;
          color: #000000;
        }
        img{
          margin-right: 18px;
          width: 27px;
          height: 27px;
        }
      }
    }
  }
}
</style>
