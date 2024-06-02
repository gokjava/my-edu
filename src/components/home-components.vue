<template>
    <div class="home-container">
        <TitlePage></TitlePage>

        <div class="home-body">
            <div class="home-body-left">
                <div class="home-body-left-container">
                    <div>
                        <div class="home-body-left-img" :style="{ backgroundColor: extractColorByName().background, color: extractColorByName().text }">
                            {{ name[0] }}
                        </div>
                        <div style="margin-top: 12px; text-align: center; font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(0, 0, 0, 0.6);">
                            {{ name }}
                        </div>
                        <div class="home-body-left-menu">
                            <div>
                                <div v-for="item in menus" :key="item.index" class="home-body-left-menu-item" :class="{ 'home-body-left-menu-item-isActive': isActive == item.index }" :style="{ color: isActive == item.index ? 'rgba(64, 158, 255, 1)' : 'rgba(96, 98, 102, 1)' }" @click="selectMenu(item)">
                                    <!-- <MoreApp :size="20" theme="filled" style="padding-top: 5px; padding-left: 50px;"/>  -->
                                    <component :is="item.icon" :size="20" :strokeWidth="1" style="padding-top: 5px; padding-left: 50px;"/>&nbsp;&nbsp;&nbsp;{{ item.name }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; align-items: center; padding-top: 10px;">
                        <div class="home-gradient-dashed-line"></div>
                        <div style="margin-top: 6px;font-size: 12px;font-weight: 400;letter-spacing: 0px;line-height: 20px;color: rgba(144, 147, 153, 1);">
                            版本：v1.0
                        </div>
                    </div>
                </div>
            </div> 

            <div class="home-body-right">
                <div style="margin-top: 24px; font-size: 20px; font-weight: 600; line-height: 28px; padding-bottom: 32px;">
                    {{ menus[isActive].name }}
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue'
import TitlePage from '@/components/common/title-components'
import { ElMessageBox } from 'element-plus'
import { MoreApp, Announcement, System, Book, Schedule,  BachelorCapOne,ListView, DataUser, Logout } from '@icon-park/vue-next'
import { useRoute, useRouter } from 'vue-router';
const backgroundColors = [
    { background: '#f56a00', text: '#FFFFFF' },
    { background: '#7BC616', text: '#FFFFFF' },
    { background: '#14C9C9', text: '#FFFFFF' },
    { background: '#168CFF', text: '#FFFFFF' },
    { background: '#FF7D00', text: '#FFFFFF' },
    { background: '#FFC72E', text: '#FFFFFF' },
    { background: '#7265e6', text: '#FFFFFF' },
    { background: '#ffbf00', text: '#FFFFFF' },
    { background: '#00a2ae', text: '#FFFFFF' },
];
const menus = [
    {
        index: 0,
        icon: Announcement,
        name: '工作台',
        path: 'main/workbench'
    },
    {
        index: 1,
        icon: System,
        name: '继教报名',
        path: 'main/con'
    },{
        index: 2,
        icon: Book,
        name: '我的课程',
        path: 'main/mycourse'
    },{
        index: 3,
        icon: Schedule,
        name: '学时减免',
        path: 'main/hour'
    },{
        index: 4,
        icon: BachelorCapOne,
        name: '学时证明',
        path: 'main/eduction'
    },{
        index: 5,
        icon: ListView,
        name: '我的订单',
        path: 'main/order'
    },{
        index: 6,
        icon: DataUser,
        name: '我的信息',
        path: 'main/myinfo'
    },{
        index: 7,
        icon: Logout,
        name: '退出系统',
    }


    
]

export default defineComponent({

    name: "HomePage",
    components: {
        MoreApp, Announcement, System, Book, Schedule,  BachelorCapOne,ListView, DataUser, Logout, TitlePage
    },
    setup() {

        const route = useRoute();
        const a = route.query.isActive;
        const router = useRouter()
        const isActive = ref(a || 0)
        for (let i = 0; i < menus.length; i++) {
            let item = menus[i]
            if (route.path.indexOf(item.path) != -1) {
                isActive.value = i
                break
            }
        }
        
        const name = ref('昵称')
        let user = localStorage.getItem('user')
        if (user) {
            let userObject = JSON.parse(user)
            name.value = userObject.name
        }
        const extractColorByName = () => {
            const index = name.value[0].charCodeAt(0) % backgroundColors.length;
            return backgroundColors[index]
        }

        const selectMenu = (menuItem) => {
            if (menuItem.index == 7) {
                ElMessageBox.confirm(
                    '确定要退出系统吗？',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }
                ).then(() => {
                    localStorage.removeItem('token')
                    router.push(`/login`)
                }).catch(() => {
                })
                return
            }
            isActive.value = menuItem.index
            router.push(`/${menuItem.path}`)
        }

        const toContinueRegister = () => {
            isActive.value = 1
        }

        watch(
            () => route,
            (newRoute) => {
                for (let i = 0; i < menus.length; i++) {
                    let item = menus[i]
                    if (newRoute.fullPath.indexOf(item.path) != -1) {
                        isActive.value = i
                        break
                    }
                }
            },
            {
                deep: true
            }
        )

        return {
             name, extractColorByName, menus, isActive, selectMenu, toContinueRegister
        }
    }
    
})
</script>

<style>

body {
    background-color: rgba(236, 245, 255, 1) ;
}

.home-body-left-menu {

}

.home-body-left-menu-item-isActive {
    background-color:  rgba(217, 236, 255, 1);
    color:  rgba(64, 158, 255, 1);
    box-shadow: inset -2px 0 0 0 rgba(64, 158, 255, 1);
}

.home-body-right {
    width: 100%;
    padding-left: 33px;
    padding-right: 31px;
}

.home-body-left-menu-item {
    width: 100%;
    display: flex;
    align-items: center;
    height: 40px;
    margin-top: 16px;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    color: rgba(96, 98, 102, 1);
}

.el-menu-vertical-demo .el-menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
}


.home-body-left-img {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    margin-top: 17px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 35px;
}

.home-container {
    width: 100%;
}

.home-title-img {
    width: 100%;
    height: 80px;
}

.home-body {
    width: 1200px;
    margin: 0 auto;
    margin-top: 24px;
    background-color: #ffffff;
    display: flex;
    margin-bottom: 24px;
    padding-top: 18px;
    padding-bottom: 18px;
}

.home-body-left {
    width: 200px;
    opacity: 1;
    display: flex;
}

.home-body-left-container {
    width: 200px;
    opacity: 1;
    border-right: 1px solid #E0E0E0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}


.home-gradient-dashed-line {
    width: 176px;
    height: 1px;
    position: relative;
}

.home-gradient-dashed-line::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: inherit;
    border-bottom: 1px dashed rgba(144, 147, 153, 1);
    -webkit-mask: linear-gradient(90deg, rgba(144, 147, 153, 0) 0%, rgba(144, 147, 153, 0.52) 50.5%, rgba(144, 147, 153, 0) 100%);
    mask: linear-gradient(90deg, rgba(144, 147, 153, 0) 0%, rgba(144, 147, 153, 0.52) 50.5%, rgba(144, 147, 153, 0) 100%);
    pointer-events: none;
}

</style>
