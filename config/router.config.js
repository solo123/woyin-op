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
        icon: 'dashboard',
          routes: [
            {
              path: '/system/role',
              name: 'role',
              component: './System/Role',
            },
            {
              path: '/system/user',
              name: 'user',
              component: './Exception/modelNo',
            },
            {
              path: 'system/menuseit',
              name: 'menuSite',
              component: './Exception/modelNo',
            },
            {
              path: 'system/parameter',
              name: 'parameter',
              component: './Exception/modelNo',
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
              component: './Exception/modelNo',
            },
            {
              path: '/merchant/recharge',
              name: 'merchant-recharge',
              component: './Exception/modelNo',
            },
            {
              path: '/merchant/info',
              name: 'merchant-info',
              component: './Exception/modelNo',
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
        icon: 'shop',
        routes: [
          {
            path: '/order/shoporder',
            name: 'shoporder',
            component: './Exception/modelNo',
         },
         {
           path: '/order/findrefundorder',
           name: 'findrefundorder',
           component: './Exception/modelNo',
         },
         {
           path: '/order/findbuyorder',
           name: 'findbuyorder',
           component: './Exception/modelNo',
         },
         {
           path: '/order/shopcreateroll',
           name: 'shopcreateroll',
           component: './Exception/modelNo',
         },
         {
          path: '/order/lotteryorder',
          name: 'lotteryorder',
          component: './Exception/modelNo',
         }
        ]
      },
      {
        path: '/product',
        name: 'product',
        icon: 'shop',
        routes: [
          {
            path: '/product/productinfo',
            name: 'productinfo',
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
