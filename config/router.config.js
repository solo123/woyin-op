export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/ResetPaswrod', name: 'ResetPaswrod', component: './User/ResetPaswrod' }
    ]
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/merchant/list' },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
          {
            path: '/exception/modelno',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/modelNo',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
            ],
          }
        ],
      },
      // 系统管理
      {
        path: '/system',
        name: 'system',
        icon: 'deployment-unit',
          routes: [
            {
              path: '/system/role',
              name: 'role',
              component: './System/Role',
            },
            {
              path: '/system/user',
              name: 'user',
              component: './System/User',
            },
            {
              path: 'system/menuseit',
              name: 'menuSite',
              component: './System/Menu',
            },
            {
              path: 'system/parameter',
              name: 'parameter',
              component: './System/Parameter',
            }
        ]
      },
      // 商户管理
      {
        path: '/merchant',
        name: 'merchant',
        icon: 'shop',
        routes: [
            {
              path: '/merchant/list',
              name: 'merchant-list',
              component: './Merchant/list',
            },
            {
              path: '/merchant/recharge',
              name: 'merchant-recharge',
              component: './Merchant/Recharge',
            },
            {
              path: '/merchant/merchant-member-inter-apply',
              name: 'merchant-member-inter-apply',
              component: './Merchant/MemberInterApply',
            },
            {
              path: '/merchant/MerchantInfo',
              name: 'MerchantInfo',
              component: './Merchant/MerchantInfo',
            },
            {
              path: '/merchant/balanceinfo',
              name: 'merchant-info',
              component: './Merchant/BalanceInfo',
            },
            {
              path: '/merchant/noactionuserList',
              name: 'noActionUserList',
              component: './Merchant/noActionUserList',
            },
            {
              path: '/merchant/alluserupdatestate',
              name: 'allUserUpdateState',
              component: './Merchant/allUserUpdateState',
            },
            {
              path: '/merchant/balance-info',
              name: 'merchant-balance-info',
              component: './Merchant/merchantBalanceInfo',
            },
            {
              path: '/merchant/createralluser',
              name: 'createralluser',
              component: './Merchant/CreaterAllUser',
            },
            {
              path: '/merchant/allrectpoint',
              name: 'allrectpoint',
              component: './Merchant/AllRectPoint',
            },
            {
              path: '/merchant/arecpointmerchantlist',
              name: 'arecpointmerchantlist',
              component: './Merchant/ARecPointMerchantList',
            },
            { path: '/Merchant/MemberProduct', name: 'MemberProduct', component: './Merchant/MemberProduct' },
      ]
      },
      // 用户订单管理
      {
        path: '/order',
        name: 'order',
        icon: 'file-text',
        routes: [
          {
            path: '/order/intersubmit',
            name: 'InterSubmit',
            component: './Order/InterSubmit',
         },
          {
            path: '/order/shoporder',
            name: 'shoporder',
            component: './Order/Shoporder',
         },
         {
           path: '/order/findrefundorder',
           name: 'findrefundorder',
           component: './Order/FindreFundorder',
         },
         {
           path: '/order/findbuyorder',
           name: 'findbuyorder',
           component: './Order/FindBuyOrder',
         },
         {
          path: '/order/transferorderlist',
          name: 'TransferOrderList',
          component: './Order/TransferOrderList',
        },
         {
           path: '/order/shopcreateroll',
           name: 'shopcreateroll',
           component: './Order/ShopCreateroll',
         },
         {
          path: '/order/lotteryorder',
          name: 'lotteryorder',
          component: './Order/LotteryOrder',
         },
        {
          path: '/order/retuersmorder',
          name: 'retuersmorder',
          component: './Order/RetuerMOrder',
        },
        {
          path: '/order/creditcardorder',
          name: 'CreditCardOrder',
          component: './Order/CreditCardOrder',
        }
      ]
      },
      // 产品管理
      {
        path: '/product',
        name: 'product',
        icon: 'inbox',
        routes: [
          {
            path: '/product/productinfo',
            name: 'productinfo',
            component: './Product/ProductInfo',
          },
          {
            path: '/product/productclass',
            name: 'productclass',
            component: './Product/productclass',
          }
        ]
      },
      // 转让管理
      {
        path: '/transfer',
        name: 'transfer',
        icon: 'sync',
        routes: [
          {
            path: '/transfer/transferaudit',
            name: 'transferaudit',
            component: './Transfer/Transferaudit',
          },
          {
            path: '/transfer/transferorderlist',
            name: 'transferorderlist',
            component:'./Transfer/TransferOrderList',
          },
          {
            path: '/transfer/trandsfercredit',
            name: 'trandsfercredit',
            component: './Transfer/TrandsferCredit',
          }
        ]
      },
      // 电子卷管理
      {
        path: '/etag',
        name: 'etag',
        icon: 'profile',
        routes: [
          {
            path: '/etag/findetag',
            name: 'findetag',
            component: './Etag/FindEtag',
          }
        ]
      },
      // 任务调度管理
      {
        path: '/task',
        name: 'task',
        icon: 'profile',
        routes: [
          {
            path: '/task/tasklist',
            name: 'tasklist',
            component: './Task/TaskList',
          },
          {
            path: '/task/taskdiary',
            name: 'taskdiary',
            component: './Exception/modelNo',
          }
        ]
      },
      // 财务管理
      {
        path: '/finance',
        name: 'finance',
        icon: 'profile',
        routes: [
          {
            path: '/finance/accountwater',
            name: 'accountWater',
            component: './Finance/accountWater',
          },
          {
            path: '/finance/userwater',
            name: 'userwater',
            component: './Finance/UserWater',
          },
          {
            path: '/finance/merchantwater',
            name: 'merchantwater',
            component: './Finance/MerchantWater',
          },
          {
            path: '/finance/WaterDetails',
            name: 'WaterDetails',
            component: './Finance/WaterDetails',
          },
        ]
      },
      // 还款管理
      {
        path: '/repayment',
        name: 'repayment',
        icon: 'profile',
        routes: [
          {
            path: '/repayment/list',
            name: 'list',
            component: './Repayment/List',
          },
          {
            path: '/repayment/repaymenthiston',
            name: 'RepaymentHiston',
            component: './Repayment/RepaymentHiston',
          },
        ]
      },
      // 商城产品管理
      {
        path: '/shop',
        name: 'shop',
        icon: 'file-markdown',
        routes: [
          {
            path: '/shop/jdshop',
            name: 'jdshop',
            component: './Exception/modelNo',
          },
          {
            path: '/shop/jdshopsort',
            name: 'jdshopsort',
            component: './Exception/modelNo',
          },
        ]
      },
      // 报表管理
      {
        path: '/report',
        name: 'report',
        icon: 'bar-chart',
        routes: [
          {
            path: '/report/reportlist',
            name: 'reportlist',
            component: './Exception/modelNo',
          }
        ]
      },
      // 产品管理
      // 转让管理
      // 电子卷管理
      // 任务调度管理
      // 还款管理
      // 商城产品管理
      // 报表管理
      {
        component: '404',
      },
    ],
  },
];
