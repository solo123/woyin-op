export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/ResetPaswrod', name: 'ResetPaswrod', component: './User/ResetPaswrod' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/account/settings' },
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
              path: '/merchant/info',
              name: 'merchant-info',
              component: './Merchant/BalanceInfo',
            },
            {
              path: '/merchant/balance-info',
              name: 'merchant-balance-info',
              component: './Exception/modelNo',
            }
      ]
      },
      // 订单管理
      {
        path: '/order',
        name: 'order',
        icon: 'file-text',
        routes: [
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
           path: '/order/shopcreateroll',
           name: 'shopcreateroll',
           component: './Order/ShopCreateroll',
         },
         {
          path: '/order/lotteryorder',
          name: 'lotteryorder',
          component: './Order/LotteryOrder',
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
          }
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
