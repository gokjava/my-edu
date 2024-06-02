<template>
    <div class="main-com-class">
        <div>   
            <div style="width: 100%; height: 144px; background: rgba(236, 245, 255, 1); display: flex; justify-content: center;"  >
                <!-- <div  style="url(https://img.js.design/assets/img/665352ced606f208c9b98530.png#9d2ac928629cbe21f5c7406052f9328c);"> -->
                <div  class="main-com-class-title" >
                    <div style="font-size: 32px;font-weight: 600;letter-spacing: 0px;line-height: 48px;color: rgba(51, 126, 204, 1); width: 100%;">黑龙江省执业药师继续教育服务平台</div>
                </div>
            </div>
            <div style="width: 100%; height: 100px; background: rgba(23, 137, 255, 1); display: flex; justify-content: center;">
                <div style="display: flex; width: 1200px; height: 100px; justify-content: space-between;">
                    <div v-for="(menu, index) in menus" :key="index" class="main-menu" :style="{ backgroundColor: index == menuIndex ? 'rgba(77, 164, 255, 1)' : 'rgba(23, 137, 255, 1)' }" @click="switchMenu(index, menu)">
                        <div>
                            <component :is="menu.icon" :size="32" :strokeWidth="2"></component>
                        </div>
                        <div style="font-size: 18px;font-weight: 400;letter-spacing: 0px;line-height: 26px; margin-top: 5px;">
                            {{ menu.name }}
                        </div>
                    </div>
                </div>
            </div>

            <div style="width: 100%; display: flex; justify-content: center;">
                <div style="width: 1200px; min-height: 320px;">
                    <router-view></router-view>
                </div>
            </div>
        </div>

        <div style="width: 100%; height: 272px; margin-top: 48px; background-color:rgba(23, 137, 255, 1); display: flex; align-items: center;flex-direction: column; ">
            <div style="width: 1200px; margin-top: 32px; display: flex; border-bottom: 1px solid rgba(255, 255, 255, 0.3); height: 60px;">
                <div style="font-size: 16px;font-weight: 600;letter-spacing: 0px;line-height: 40px;color: rgba(255, 255, 255, 1);">
                    友情连接
                </div>
                <div v-for="(item, n) in friendLink" :key="n" style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 40px;color: rgba(255, 255, 255, 1); margin-left: 32px;">
                    {{ item.title}}
                </div>
            </div>

            <div style="width: 1200px; margin-top: 20px; display: flex; justify-content: center;">
                <div style="width: 651px;  display: flex; justify-content: space-between;">
                    <div style="text-align: center; ">
                        <img src="https://img.js.design/assets/img/6634929e46a9c21101abcbe4.png#671faedaf8013c54f81139e6871489ca" style="height: 140px; width: 140px;" />
                        <div style="font-size: 12px;font-weight: 400;letter-spacing: 0px;line-height: 20px;color: rgba(255, 255, 255, 1);">官方微信公众号</div>
                    </div>
                    <div style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 28px;color: rgba(255, 255, 255, 1);">
                        <div>
                            主办单位：黑龙江医药零售行业协会
                        </div>
                        <div>
                            地         址:  黑龙江省哈尔滨市南岗区宣利街与黄河路交叉口北50米龙港厦18楼
                        </div>
                        <div>
                            邮         箱：171084082@qq.com
                        </div>
                        <div>
                            技术支持：北京百兴园创信息科技有限公司
                        </div>
                        <div>
                            Copyright © 2024 版权所有 黑ICP备2021001053号-1
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

        <!-- <div style="position: fixed; top: 350px; right: 0px; display: flex; flex-direction: column;">
            <img src="@/assets/main/mobileStudy.png" style="width: 56px; height: 80px;"  />
            <img src="@/assets/main/kf.png" style="width: 56px; height: 56px; margin-top: 4px;"  />
        </div> -->
        <div style="position: fixed; top: 350px; right: 0px; display: flex; flex-direction: column;">

            <el-tooltip
                    class="box-item"
                    effect="light"
                    placement="top-start"
                >

                <template #content>
                    <div class="qrcode-container">
                        <img src="https://img.js.design/assets/img/6634929e46a9c21101abcbe4.png#671faedaf8013c54f81139e6871489ca" style="height: 140px; width: 140px; " />
                    </div>
                </template>

                <img src="@/assets/main/mobileStudy.png" style="width: 56px; height: 80px;" />

            </el-tooltip>
                <el-tooltip class="box-item" content="电话：0451-82738127" placement="bottom-start">
                    <img src="@/assets/main/kf.png" style="width: 56px; height: 56px; margin-top: 4px;" />
                </el-tooltip>
        </div>
    </div>
    
</template>

<script>
import { defineComponent, ref, reactive, watch } from 'vue'
import axios from '@/axios'
import {  Home, RoadSignBoth, Classroom, AllApplication, Agreement, Find ,PhoneVideoCall} from '@icon-park/vue-next'
import firstPage from '@/components/main/firstpage-components'
import { useRouter, useRoute } from 'vue-router'
import MainTitle from '@/assets/main/main-title.png'


const menus = [
    {
        name: '首页',
        icon: Home,
        path: '/home/first'
    },
    {
        name: '注册指南',
        icon: RoadSignBoth,
        path: '/home/register',
        cid: 2
    },
    {
        name: '继续教育',
        icon: Classroom,
        path: '/home/conEdu',
        cid: 3,
        list: true
    },
    {
        name: '信息资讯',
        icon: AllApplication,
        path: '/home/info',
        cid: 4,
        list: true
    },
    {
        name: '政策法规', 
        icon: Agreement,
        path: '/home/zcfg',
        cid: 5,
        list: true
    },
    {
        name: '学时查询',
        icon: Find,
        path: '/home/xscx',
        to: '/login'
    },
    {
        name: '联系我们',
        icon: PhoneVideoCall,
        path: '/home/lxwm',
        cid: 9
    }
]

export default defineComponent({
    name: 'mainComponents',
    components: {
        firstPage,  Home, RoadSignBoth, Classroom, AllApplication, Agreement, Find ,PhoneVideoCall
    },
    setup() {
        const menuIndex = ref(0)
        const selectType = ref(0)
        const router = useRouter()
        const switchMenu = (index, menu) => {
            menuIndex.value = index
            let type = menus[index].type
            selectType.value = type
            if (menu.list) {
                router.push(`/home/list?cid=${menu.cid}&tag=${menu.name}&index=${index}`)
                return
            }
            if (menu.to) {
                router.push(`${menu.to}`)
            } else {
                router.push(`${menu.path}?type=2${menu.cid ? '&id=' + menu.cid : ''}`)
            }
            
        }
        const friendLink = reactive([])
        axios.get('/api/client/first_page/v1/friendlink_list').then(r => {
            friendLink.push(...r.data.data)
        })
        const route = useRoute()
        watch(
            () => route,
            (newPath) => {
                watchPath(newPath.fullPath, newPath.query.index)

            },
            {
                deep: true
            }
        )

        const watchPath = (path, index, callback) => {
            menus.forEach((menu, index) => {
                if (path.indexOf(menu.path) != -1) {
                    menuIndex.value = index
                }
            })
            if (index) {
                menuIndex.value = index
            }
            callback && callback()
        }

        watchPath(route.fullPath, route.query.index, () => {

        })

        return {
            menuIndex, menus, switchMenu, friendLink, selectType, MainTitle
        }
    }
})




</script>

<style>
/* body {
    background-color: #ffffff;
} */
.main-com-class {
    background-color: #ffffff;
}

.main-menu {
    width: 140px;
    height: 100px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
}

.main-com-class-title {
    display: flex; 
    align-items: center ;
    width: 1200px; 
    height: 144px;
    opacity: 1;
    text-shadow: 
                -1px -1px 0 #ffffff,  
                1px -1px 0 #fff,  
                -1px 1px 0 #fff,  
                1px 1px 0 #fff;
    background: linear-gradient(90deg, rgba(236, 245, 255, 1) 0%, rgba(236, 245, 255, 0.2) 48.56%, rgba(236, 245, 255, 1) 100%), url(../assets/main/main-title.png);
    background-size: cover;
}

</style>