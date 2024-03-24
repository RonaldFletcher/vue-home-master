/*
 * @Description:
 * @Author: yjgui
 * @Date: 2021-08-23 17:43:33
 * @LastEditTime: 2021-08-27 09:34:15
 * @LastEditors: gpli5
 */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const constantRoutes = [
  {
    path:'/home',
    component: () => import('@/views/student/index'),
    children:[
      {
        path: 'dashboard', 
        name: '主页',
        component: () => import('@/views/student/component/dashboard'),
      },
      {
        path: 'job', 
        name: '作业',
        component: () => import('@/views/student/component/job'),
      },
      {
        path: 'iotnode', 
        name: 'iotnode',
        component: () => import('@/views/student/component/creatlot'),
      },
      {
        path: 'fognode', 
        name: 'fognode',
        component: () => import('@/views/student/component/creatFog'),
      },
      { 
        path: 'create', 
        name: 'create',
        component: () => import('@/views/student/component/create'),
      }
    ]
  },
  {
    path:'/login',
    component: () => import('@/views/student/login'),
  }
];

const createRouter = () => new Router({
  // Mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // Reset router
}

export default router;
