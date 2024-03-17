<template>
  <div class="tost-container">
    <div class="t-head">
      <img :src="left" @click="$router.go(-1)" alt="">
      <img :src="topImg" alt="">
      <img :src="history" alt="">
    </div>
    <div class="head-title">
      <span>{{ i18n.titleText }}</span>
    </div>
    <section>
      <div class="balance-box">
        <h1>${{canUserWallet.balance}}</h1>
        <div>
          <p>{{i18n.availableText || 'Available Balance'}}</p>
          <p>{{i18n.currencyText || 'Currency'}} <span>{{seletCoinItem.obj.currency}}</span></p>
        </div>
      </div>
      <div class="item">
        <h5>{{i18n.selectText}}</h5>
        <div class="v-cashout-coin-two-select-box">
          <div class="v-cashout-coin-two-select" @click="selectCoinClick">
            <span>{{ seletCoinItem.obj.currency }}</span>
            <i class="iconfont icon-xiala" :style="styObjOne"></i>
          </div>
          <!-- 选择币 -->
          <select-coin-pop :coinList="cashoutInfo.info.list" @emitCoinItemClick="emitCoinItemClick"
                           ref="refSelectCoinPop" />
        </div>
      </div>
      <div class="item">
        <h5>{{i18n.chianText}}</h5>
        <ul class="v-cashout-coin-link-list g-flex-align-center">
          <li @click="linkItemClick(item, index)" :class="linkIndex == index ? 'active' : ''"
              class="v-cashout-coin-link-item" v-for="(item, index) in seletCoinItem.obj.chainList" :key="index">
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
      <div class="item">
        <h5>{{i18n.addressText}}</h5>
        <van-field :readonly="(cashoutInfo.info.isSelect == 1) ? true : false" v-model="form.info.address" label=""
                   label-width="0"
                   :placeholder="cashoutInfo.info.isSelect == 1 ? `${i18n.addressSelectText}` : `${i18n.addressPlaceholderText}`">
          <template #extra>
            <div v-show="cashoutInfo.info.isSelect == 1" @click="selectAddressClick"
                 class="v-cashout-coin-bottom-address-select">
              <i class="iconfont icon-zu15"></i>
            </div>
          </template>
        </van-field>
      </div>
      <div class="item">
        <h5>{{i18n.numText}}</h5>
        <van-field @input="amountChange" v-model="form.amount" label="" label-width="0"
                   :placeholder="i18n.numTextPlaceholderText + '(' + 'USDT' + ')'">
          <template #extra>
            <span @click="allClick">{{ i18n.allText }}</span>
          </template>
        </van-field>
      </div>
      <div v-show="seletCoinItem.obj.currency != 'USDT' && form.amount"
           class="v-recharge-bi-yuedengyu g-flex-align-center">
        <span>≈</span>
        <p>{{ form.money }} </p>
        <span>{{ seletCoinItem.obj.currency }}</span>
      </div>

      <p class="v-cashout-coin-bottom-canuse g-flex-align-center">{{ i18n.shouxuFeiText
        }}({{ canUserWallet.currency }}): <span> {{ shouxuFei }}</span></p>

      <p v-if="store.system.WithdrawModel == 2" class="v-cashout-coin-bottom-canuse g-flex-align-center">{{
          i18n.shijidaozhangText
        }}({{ seletCoinItem.obj.currency }}): <span> {{ shijiDaoZhang }}</span></p>

      <p class="v-cashout-coin-bottom-canuse g-flex-align-center">{{ i18n.canUseText }}({{ canUserWallet.currency }}):
        <span> {{ canUserWallet.balance }}</span>
      </p>
      <div @click="cashOutClick" class="v-cashout-coin-btn g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.cashText }}</span>
      </div>
    </section>

<!--          <p class="v-cashout-coin-title">{{ i18n.chianText }}</p>-->
<!--          <ul class="v-cashout-coin-link-list g-flex-align-center">-->
<!--            <li @click="linkItemClick(item, index)" :class="linkIndex == index ? 'active' : ''"-->
<!--              class="v-cashout-coin-link-item" v-for="(item, index) in seletCoinItem.obj.chainList" :key="index">-->
<!--              <span>{{ item }}</span>-->
<!--            </li>-->
<!--          </ul>-->

<!--      </div>-->
<!--      <div class="v-cashout-info-tips">-->
<!--        <div class="v-cashout-info-tips-title">{{ i18n.wenxingtishiText }}:</div>-->
<!--        <div class="v-cashout-info-tips-content">-->
<!--          1.{{ i18n.tishiOneText }}<br />-->
<!--          &lt;!&ndash;{{ i18n.tishiTwoText }}<br />&ndash;&gt;-->
<!--          2.{{ i18n.tishiThreeText }}<br />-->
<!--          3.{{ i18n.tishiFourText }}<br />-->
<!--          4.{{ i18n.tishiFiveText }}<br />-->
<!--          5.{{ i18n.tishiSixText }}<br />-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->


    <!-- 密码 -->
    <BussinessPwdPop ref="refBussinessPwdPop" @emitPwd="emitPwd" />

    <SelectWalletAddressPop :addressList="porpAddressList" @emitDelAddress="emitDelAddress"
      @emitSelectAddress="emitSelectAddress" ref="refSelectWalletAddressPop" />
  </div>
</template>

<script setup>
import topImg from '@/assets/img/topimg.png'
import left from '@/assets/img/left.png'
import history from '@/assets/img/history.png'
import SelectCoinPop from '@/components/SelectCoinPop.vue'
import { apiCashout, apiGetCashoutInfo, apiGetUserInfo, apiGetWalletAddressList, apiGetDuoWalletList } from '@/utils/api.js'
import BussinessPwdPop from '@/components/BussinessPwdPop.vue'
import { cashoutMoney, formatDownFloat } from '@/utils/index.js'
import SelectWalletAddressPop from '@/components/SelectWalletAddressPop.vue'
import { reactive, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { Toast } from 'vant';
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('cashoutBi')
})
const router = useRouter()
const route = useRoute()

let form = reactive({
  id: route.params.id,
  info: {
    address: '',
    chain: '',
    currency: ''
  },
  amount: '', //数量
  fundPassword: '',
  money: ''
})

let addressList = reactive({
  list: []
})

let porpAddressList = computed(() => {
  if (!addressList.list.length) return []
  let reusltArr = addressList.list.filter(item => {
    return (item.currency == form.info.currency) && (item.chain == form.info.chain)
  })
  return reusltArr
})

const refSelectWalletAddressPop = ref(null)

function selectAddressClick() {
  refSelectWalletAddressPop.value.onShow(seletCoinItem.obj.currency)
}

// 获取钱包地址列表
async function apiGetWalletAddressListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetWalletAddressList()
  if (!success) return
  addressList.list = data.list
  console.log(data)
}

apiGetWalletAddressListHandel()

function emitDelAddress(item) {
  if (item.address == form.info.address) {
    form.info.address = ''
  }
  apiGetWalletAddressListHandel()
}

function emitSelectAddress(item) {
  console.log('item', item)
  form.info.address = item.address
}

let userInfo = computed(() => {
  return store.userInfo
})

async function apiGetUserInfoHandel() {
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  // data.info.balance = '10000'
  store.setUserInfo(data.info)
  // if ((!userInfo.value.userReal.id) || userInfo.value.userReal.status != 1) {
  //   Toast(i18n.value.realNameText)
  //   setTimeout(() => {
  //     router.replace({ name: 'userreal' })
  //   }, 500);
  //   return
  // }
  if (!userInfo.value.email) {
    Toast(i18n.value.bindEmailText)
    setTimeout(() => {
      router.replace({ name: 'bindemail' })
    }, 500);
    return
  }
  if (!userInfo.value.fundPasswordStatus) {
    Toast(i18n.value.setBusPwdText)
    setTimeout(() => {
      router.replace({ name: 'changebuspwd' })
    }, 500);
    return
  }
}

apiGetUserInfoHandel()


let cashoutInfo = reactive({
  info: {
    list: [],
    isSelect: ''
  }
})

// 获取提现信息
async function apiGetCashoutInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetCashoutInfo({ id: form.id })
  if (!success) return
  console.log(data)
  Object.assign(cashoutInfo, data.info)
  seletCoinItem.obj = data.info.info.list[0]
  form.info.chain = seletCoinItem.obj.chainList[0]
  form.info.currency = seletCoinItem.obj.currency
}

apiGetCashoutInfoHandel()

function allClick() {
  if (store.system.WithdrawModel == 1) {
    if (seletCoinItem.obj.fee == 0) {
      form.amount = canUserWallet.value.balance
    } else {
      form.amount = cashoutMoney(canUserWallet.value.balance, seletCoinItem.obj.fee, 2)
    }
  } else {
    form.amount = canUserWallet.value.balance
  }
  amountChange()
}

// 输入密码触发
function emitPwd(val) {
  form.fundPassword = val
  apiCashoutHandel()
}

const refBussinessPwdPop = ref(null)

// 提币点击
function cashOutClick() {
  if (!userInfo.value.fundPasswordStatus) {
    Toast(i18n.value.setBusPwdText)
    setTimeout(() => {
      router.push({ name: 'changebuspwd' })
    }, 500);
    return
  }
  refBussinessPwdPop.value.onShow()
}

// 提现提交
async function apiCashoutHandel() {
  store.loadingShow = true
  const { success, data } = await apiCashout(form)
  if (!success) return
  Toast(data.msg)
  router.go(-1)
}

let styObjOne = reactive({ transform: '' })

let selectCoinShow = ref(false)

let seletCoinItem = reactive({ obj: {} })

const refSelectCoinPop = ref(null)

// 点击币
function selectCoinClick() {
  selectCoinShow.value = !selectCoinShow.value
  if (selectCoinShow.value) {
    refSelectCoinPop.value.onShow()
    styObjOne.transform = 'rotate(180deg)'
  } else {
    styObjOne.transform = 'rotate(0deg)'
    refSelectCoinPop.value.onClose()
  }
}

// 选择币触发
function emitCoinItemClick(item) {
  refSelectCoinPop.value.onClose()
  selectCoinShow.value = false
  styObjOne.transform = 'rotate(0deg)'
  seletCoinItem.obj = item
  linkIndex.value = 0
  form.info.currency = seletCoinItem.obj.currency
  form.info.chain = seletCoinItem.obj.chainList[0]
  amountChange()
}

let linkIndex = ref(0) //链 index

// 链点击
function linkItemClick(item, index) {
  linkIndex.value = index
  form.info.chain = item
}

let balanceList = reactive({
  list: []
})

// 获取钱包余额列表
async function apiGetDuoWalletListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetDuoWalletList({ type: 1 })
  if (!success) return
  balanceList.list = data.list
  console.log(data)
}

apiGetDuoWalletListHandel()

function amountChange() {
  if (!form.amount) return form.money = ''
  // WithdrawModel 1 金额外收取手续费  2 金额内收取手续费
  form.money = (formatDownFloat(Number(form.amount) * Number(seletCoinItem.obj.rate), seletCoinItem.obj.fixed)).toFixed(seletCoinItem.obj.fixed)
}

// 实际到账
const shijiDaoZhang = computed(() => {
  if (!form.amount) return '0.00'
  return ((Number(form.amount) - Number(shouxuFei.value)) * Number(seletCoinItem.obj.rate)).toFixed(seletCoinItem.obj.fixed)
})

// 可用余额
const canUserWallet = computed(() => {
  if ((!balanceList.list.length) || (!seletCoinItem.obj.currency)) return { balance: '', currency: '' }
  let target = balanceList.list.find((item, index) => {
    return item.currency == 'USDT'
  })
  if (target) return { balance: Number(target.balance).toFixed(2), currency: target.currency }
  return { balance: '', currency: '' }
})


// 手续费
const shouxuFei = computed(() => {
  if (!seletCoinItem.obj.fee) return '0.00'
  else {
    if (Number(seletCoinItem.obj.fee) == 0) {
      return '0.00'
    } else if (Number(seletCoinItem.obj.fee) < 1) {
      return (form.amount * seletCoinItem.obj.fee).toFixed(2)
    } else {
      return Number(seletCoinItem.obj.fee).toFixed(2)
    }
  }
})
</script>

<style lang='scss'>
@import "@/styles/withdrawal";
.v-cashout-coin-link-list{
  span{
    border-radius: 6px;
    padding: 6px 8px;
    font-size: 11px;
    color: #FFFFFF;
    font-weight: bold;
    margin-left: 8px;
    background: linear-gradient(90deg, #0030FE 0%, #007BFE 50%, #0030FE 100%);
  }
}
</style>
