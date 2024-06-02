import { createRouter, createWebHistory } from 'vue-router'
// 使用懒加载方式导入组件
const LoginPage = () => import('@/components/login-components')
const RegisterPage = () => import('@/components/register-components')
const HomePage = () => import('@/components/home-components')
const AnnouncementPage = () => import('@/components/announcement-components')
const CameraPage = () => import('@/components/common/camera-components')
const OnlieExamination = () => import('@/components/online-examination-components')
const MainPage = () => import('@/components/main-components')

const FirstPage = () => import('@/components/main/firstpage-components')
const SecondPage = () => import('@/components/main/main-details')
const MainListPage = () => import('@/components/main/main-list')

const ConRegisterPage = () => import('@/components/item/continuetoregister-components')
const WorkbenchPage = () => import('@/components/item/workbench-components')
const MycoursePage = () => import('@/components/item/mycourse-components')
const ReductionPage = () => import('@/components/item/reduction-components')
const EductionPage = () => import('@/components/item/education-components')
const OrderPage = () => import('@/components/item/order-components')
const MyInfoPage = () => import('@/components/item/myinfo-components')

const routes = [
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },{
        path: '/register',
        name: 'RegisterPage',
        component: RegisterPage
    },{
        path: '/main',
        name: 'HomePage',
        component: HomePage,
        redirect: '/main/workbench',
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
    },{
      path: '/',
      component: MainPage,
      redirect: '/home'
    }, {
        path: '/home',
        component: MainPage,
        children: [
          {
            path: '',
            component: FirstPage
          },{
            path: 'first',
            component: FirstPage
          },{
            path: 'conEdu',
            component: SecondPage
          },{
            path: 'register',
            component: SecondPage
          },{
            path: 'info',
            component: SecondPage
          },{
            path: 'zcfg',
            component: SecondPage
          },{
            path: 'xscx',
            component: SecondPage
          },{
            path: 'lxwm',
            component: SecondPage
          },{
            path: 'item',
            component: SecondPage
          },{
            path: 'list',
            component: MainListPage
          }
        ]
    }
  ]

  
  const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { top: 0 }
      }
    }
  })
  
  export default router