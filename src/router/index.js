import { createRouter, createWebHashHistory  } from 'vue-router'
import MainLayout from '../components/MainLayout.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout,
      redirect: '/main',
      children: [
        // 任务中心
        { path: '/taskcenter', name: 'taskcenter', component: () => import('@/views/taskcenter/TaskCenter.vue'), meta: { index: 40, name: '任务中心' } },
        { path: '/main', name: 'main', component: () => import(/* webpackChunkName: "main" */'@/views/mainview/MainView.vue'), meta: { index: 0, name: '首页' } },
        { path: '/quantify', name: 'quantify', component: () => import(/* webpackChunkName: "main" */'@/views/lianghua/LiangHua.vue'), meta: { index: 0, name: '量化' } },
        { path: '/myteam', name: 'myteam', component: () => import(/* webpackChunkName: "main" */'@/views/myteam/MyTeam.vue'), meta: { index: 0, name: '我的团队' } },
        { path: '/team', name: 'team', component: () => import(/* webpackChunkName: "main" */'@/views/myteam/team.vue'), meta: { index: 0, name: '团队' } },
        { path: '/wakuang', name: 'wakuang', component: () => import('@/views/wakuang/WaKuang.vue'), meta: { index: 0, name: '质押挖矿' } },
        { path: '/mycenter', name: 'mycenter', component: () => import(/* webpackChunkName: "main" */'@/views/mycenter/MyCenter.vue'), meta: { index: 0, name: '我的' } },
      ]
    },

    { path: '/myteammemberlist', name: 'myteammemberlist', component: () => import('@/views/myteammemberlist/MyTeamMemberList.vue'), meta: { index: 50, name: '团队成员列表' } },

    { path: '/rechargeselect', name: 'rechargeselect', component: () => import('@/views/rechargeselect/RechargeSelect.vue'), meta: { index: 50, name: '选择充值' } },

    { path: '/intro', name: 'intro', component: () => import(/* webpackChunkName: "main" */'@/views/intro/Intro.vue'), meta: { index: 30, name: '介绍' } },

    { path: '/kefu', name: 'kefu', component: () => import(/* webpackChunkName: "main" */'@/views/kefu/KeFu.vue'), meta: { index: 20, name: '客服' } },

    { path: '/login', name: 'login', component: () => import('@/views/login/Login.vue'), meta: { index: 1, name: '登录' } },

    { path: '/register', name: 'register', component: () => import('@/views/register/Register.vue'), meta: { index: 2, name: '注册' } },

    { path: '/forgetpwd', name: 'forgetpwd', component: () => import('@/views/forgetpwd/ForgetPwd.vue'), meta: { index: 20, name: '忘记密码' } },

    { path: '/invite', name: 'invite', component: () => import('@/views/invite/Invite.vue'), meta: { index: 20, name: '邀请好友' } },

    {
      path: '/msgcenter',
      name: 'msgcenter',
      component: () => import( '@/views/msgcenter/MsgCenter.vue'),
      meta: { index: 10 }
    },
    {
      path: '/userreal',
      name: 'userreal',
      component: () => import( '@/views/userreal/UserReal.vue'),
      meta: { index: 40 }
    },
    {
      path: '/walletlist',
      name: 'walletlist',
      component: () => import( '@/views/walletlist/WalletList.vue'),
      meta: { index: 5 }
    },

    {
      path: '/walletadd',
      name: 'walletadd',
      component: () => import( '@/views/walletadd/WalletAdd.vue'),
      meta: { index: 40 }
    },

    {
      path: '/rule',
      name: 'rule',
      component: () => import( '@/views/rule/Rule.vue'),
      meta: { index: 30 }
    },
    {
      path: '/safecenter',
      name: 'safecenter',
      component: () => import( '@/views/safecenter/SafeCenter.vue'),
      meta: { index: 6 }
    },
    // 关于我们
    {
      path: '/aboutus',
      name: 'aboutus',
      component: () => import( '@/views/aboutus/AboutUs.vue'),
      meta: { index: 20 }
    },

    // 语言设置
    { path: '/languageset', name: 'languageset', component: () => import('@/views/languageset/LanguageSet.vue'), meta: { index: 6, name: '语言设置' } },

    // 修改登录密码
    { path: '/changepwd', name: 'changepwd', component: () => import('@/views/changepwd/ChangePwd.vue'), meta: { index: 11, name: '修改登录密码' } },

    // 修改交易密码
    { path: '/changebuspwd', name: 'changebuspwd', component: () => import('@/views/changebuspwd/ChangeBusPwd.vue'), meta: { index: 10, name: '修改交易密码' } },
     // 绑定手机
     { path: '/bindmobile', name: 'bindmobile', component: () => import('@/views/bindmobile/BindMobile.vue'), meta: { index: 9, name: '绑定手机' } },
    // 绑定邮箱
    { path: '/bindemail', name: 'bindemail', component: () => import('@/views/bindemail/BindEmail.vue'), meta: { index: 9, name: '绑定邮箱' } },


    // 平台币充值
    {
      path: '/rechargebi/:id',
      name: 'rechargebi',
      component: () => import('@/views/rechargebi/RechargeBi.vue'),
      meta: { index: 16 }
    },
    // 第三方充值
    {
      path: '/rechargethird/:id',
      name: 'rechargethird',
      component: () => import('@/views/rechargethird/RechargeThird.vue'),
      meta: { index: 16 }
    },
    // 第三方充值第二步
    {
      path: '/rechargethirdsecond',
      name: 'rechargethirdsecond',
      component: () => import('@/views/rechargethirdsecond/RechargeThirdSecond.vue'),
      meta: { index: 17 }
    },
     // 平台网银充值
     {
      path: '/rechargebank/:id',
      name: 'rechargebank',
      component: () => import('@/views/rechargebank/RechargeBank.vue'),
      meta: { index: 16 }
    },
    // 平台客服充值
    {
      path: '/rechargekefu/:id',
      name: 'rechargekefu',
      component: () => import('@/views/rechargekefu/RechargeKefu.vue'),
      meta: { index: 16 }
    },

    // 选择提现方式
    { path: '/cashoutselect', name: 'cashoutselect', component: () => import('@/views/cashoutselect/CashoutSelect.vue'), meta: { index: 15, name: '选择提现' } },

    // 提现到用户钱包
    {
      path: '/cashoutbi/:id',
      name: 'cashoutbi',
      component: () => import('@/views/cashoutbi/CashoutBi.vue'),
      meta: { index: 16 }
    },

    // 提现到银行卡
    {
      path: '/cashoutbank/:id',
      name: 'cashoutbank',
      component: () => import('@/views/cashoutbank/CashoutBank.vue'),
      meta: { index: 16 }
    },
    // 公告详情
    { path: '/noticedetail', name: 'noticedetail', component: () => import('@/views/noticedetail/NoticeDetail.vue'), meta: { index: 11, name: '公告详情' } },

   // 消息详情
   { path: '/msgdetail', name: 'msgdetail', component: () => import('@/views/msgdetail/MsgDetail.vue'), meta: { index: 11, name: '消息详情' } },

    // 明细
    { path: '/mybill', name: 'mybill', component: () => import('@/views/mybill/MyBill.vue'), meta: { index: 24, name: '明细' } },
    // 量化记录
    { path: '/lianghuahistory', name: 'lianghuahistory', component: () => import('@/views/lianghuahistory/LiangHuaHistory.vue'), meta: { index: 24, name: '量化记录' } },

    // 提现记录
    { path: '/cashouthistory', name: 'cashouthistory', component: () => import('@/views/cashouthistory/CashoutHistory.vue'), meta: { index: 24, name: '提现记录' } },

    // 充值记录
    { path: '/rechargehistory', name: 'rechargehistory', component: () => import('@/views/rechargehistory/RechargeHistory.vue'), meta: { index: 24, name: '充值记录' } },

    // 银行卡列表
    { path: '/bankcardlist', name: 'bankcardlist', component: () => import('@/views/bankcardlist/BankCardList.vue'), meta: { index: 39, name: '银行卡列表' } },

    // 添加银行卡
    { path: '/addbankcard', name: 'addbankcard', component: () => import('@/views/addbankcard/AddBankCard.vue'), meta: { index: 40, name: '添加银行卡' } },

    // 锁仓 挖矿 产品详情
    {
      path: '/wakuangdetail',
      name: 'wakuangdetail',
      component: () => import('@/views/wakuangdetail/WaKuanDetail.vue'),
      meta: { index: 14 }
    },

    // 挖矿订单
    {
      path: '/wakuangorderlist',
      name: 'wakuangorderlist',
      component: () => import('@/views/wakuangorderlist/WaKuangOrderList.vue'),
      meta: { index: 15 }
    },
    {
      path: '/refresh',
      name: 'refresh',
      component: () => import( '@/views/refresh/Refresh.vue'),
      meta: { index: 24 }
    },
  ]
})


router.beforeEach((to, from, next) => {
  if(to.name == from.name) {
    console.log('=================', to, from)
    Object.assign(from, to)
    next({ name: 'refresh' })
  }else {
    next()
  }
})

export default router
