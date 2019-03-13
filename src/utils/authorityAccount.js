import Authorized from '@/components/Authorized';

const {check} = Authorized;

// 权限分配
export function authorityAccount() {
    return {
        // 角色：admin
        admin: {
            path: [
                '/dashboard',
                '/dashboard/analysis',
                '/dashboard/monitor',
                '/dashboard/workplace',
                // '/form',
                '/list',
                '/list/table-list',
                '/list/basic-list',
                '/list/card-list',
                '/list/search',
                '/profile',
                '/profile/basic',
                '/profile/basic/:id',
                '/profile/advanced',
                '/result',
                '/result/success',
                // '/exception',
                // '/exception/403',
                // '/exception/404',
                // '/exception/500',
                '/exception/trigger',
                '/account',
                '/account/center',
                '/account/settings',
                '/account/admin',
                '/system',
                '/system/role',
                '/system/user',
                '/merchant',
                '/merchant/list',
                '/merchant/recharge',
                '/merchant/info',
                '/merchant/balance-info',
            ],
            module: []
        },
    }
}

// 菜单权限处理
export function menuAccount (path, parentAuthority) {
    const authority = authorityAccount()['admin'];
    if (authority.path.indexOf(path) !== -1 || parentAuthority) {
        return  parentAuthority || 'admin';
    }else{
        return 'no-account';
    }
}

/**
 *  功能模块权限处理
 * Common check permissions method
 * @param { 权限判定 Permission judgment type string |array | Promise | Function } authority
 * @param { 你的权限 Your permission description  type:string} currentAuthority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } Exception
 */
export function moduleAccount () {
    return check((authority, currentAuthority, target, Exception) => {

    }) 
}

