import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404') },
  {// 教室
    path: '/room',
    component: Layout,
    redirect: '/room/100',
    name: 'room',
    meta: { title: '教室', icon: 'room' },
    children: [{
      path: '100',
      name: '100',
      component: () => import('@/views/room/room'),
      meta: { title: '100', icon: 'room' }
    }
    ]
  },
  // 历史纪录
  {
    path: '/history',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'history',
        component: () => import('@/views/history/HistoryData'),
        meta: { title: '历史数据', icon: 'history' }
      }
    ]
  },
  // 操作记录
  {
    path: '/log',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'log',
        component: () => import('@/views/log/OperLog'),
        meta: { title: '操作记录', icon: 'log' }
      }
    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: '菜单1', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: '菜单1-1', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: '菜单1-2', icon: 'tree' }
  //     }
  //   ]
  // },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: '菜单2', icon: 'form' }
  //     }
  //   ]
  // },
  { path: '/', component: () => import('@/views/login/index'), hidden: true },
  { path: '*', redirect: '/404', hidden: false }
]

export default new Router({
  mode: 'history',
  base: '/igrs/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

