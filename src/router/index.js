import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/login-components'
import RegisterPage from '@/components/register-components'
import HomePage from '@/components/home-components'
import WorkbenchPage from '@/components/item/workbench-components'
import AnnouncementPage from '@/components/announcement-components'
import CameraPage from '@/components/common/camera-components'
import OnlieExamination from '@/components/online-examination-components'

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
        component: HomePage
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
    }
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router