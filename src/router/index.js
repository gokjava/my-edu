import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/login-components'
import RegisterPage from '@/components/register-components'
import HomePage from '@/components/home-components'
import AnnouncementPage from '@/components/announcement-components'
import CameraPage from '@/components/common/camera-components'
import OnlieExamination from '@/components/online-examination-components'
import MainPage from '@/components/main-components'

import FirstPage from '@/components/main/firstpage-components'

import ConRegisterPage from '@/components/item/continuetoregister-components'
import WorkbenchPage from '@/components/item/workbench-components'
import MycoursePage from '@/components/item/mycourse-components'
import ReductionPage from '@/components/item/reduction-components'
import EductionPage from '@/components/item/education-components'
import OrderPage from '@/components/item/order-components'
import MyInfoPage from '@/components/item/myinfo-components'

const routes = [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },{
        path: '/register',
        name: 'RegisterPage',
        component: RegisterPage
    },{
        path: '/home',
        name: 'HomePage',
        component: HomePage,
        children: [
            {
                path: 'con',
                component:  ConRegisterPage
            },{
                path: 'workbench',
                component: WorkbenchPage
            },{
                path: 'mycourse',
                component: MycoursePage
            },{
                path: 'hour',
                component: ReductionPage
            },{
                path: 'eduction',
                component: EductionPage
            },{
                path: 'order',
                component: OrderPage
            },{
                path: 'myinfo',
                component: MyInfoPage
            }
        ]
    },{
        path: '/workbench',
        name: 'WorkbenchPage',
        component: WorkbenchPage
    },{
        path: '/announcement',
        name: 'AnnouncementPage',
        component: AnnouncementPage
    },{
        path: '/camera',
        name: 'CameraPage',
        component: CameraPage
    }, {
        path: '/onlieExamination',
        name: 'OnlieExamination',
        component: OnlieExamination
    }, {
        path: '/main',
        component: MainPage,
        children: [
          {
            path: 'first',
            component: FirstPage
          }
        ]
    }
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router