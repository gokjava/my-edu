<template>
    <div class="home-container">
        <TitlePage></TitlePage>

        <div class="home-body">
            <div class="home-body-left">
                <div class="home-body-left-container">
                    <div class="home-body-left-img" :style="{ backgroundColor: extractColorByName().background, color: extractColorByName().text }">
                        {{ name[0] }}
                    </div>

                    <div class="home-body-left-menu">
                        <div v-for="item in menus" :key="item.index" class="home-body-left-menu-item" :class="{ 'home-body-left-menu-item-isActive': isActive == item.index }" @click="selectMenu(item)">
                            <MoreApp :size="20" theme="filled" style="padding-top: 5px; padding-left: 50px;"/> &nbsp;&nbsp;&nbsp;{{ item.name }}
                        </div>
                    </div>
                </div>
            </div> 

            <div class="home-body-right">
                <div style="margin-top: 24px; font-size: 20px; font-weight: 600; line-height: 28px; padding-bottom: 32px;">
                    {{ menus[isActive].name }}
                </div>
                <WorkbenchPage v-if="isActive == 0"></WorkbenchPage>
                <ContinuePage v-if="isActive == 1"></ContinuePage>
                <MycoursePage @to-continue-register="toContinueRegister" v-if="isActive == 2"></MycoursePage>
                <ReductionPage v-if="isActive == 3"></ReductionPage>
                <EductionPage v-if="isActive == 4"></EductionPage>
                <OrderPage v-if="isActive == 5"></OrderPage>
                <MyInfoPage v-if="isActive == 6"> </MyInfoPage>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref  } from 'vue'
import TitlePage from '@/components/common/title-components'
import { MoreApp } from '@icon-park/vue-next'
import WorkbenchPage from '@/components/item/workbench-components'
import ContinuePage from '@/components/item/continuetoregister-components'
import MycoursePage from '@/components/item/mycourse-components'
import ReductionPage from '@/components/item/reduction-components'
import EductionPage from '@/components/item/education-components'
import OrderPage from '@/components/item/order-components'
import MyInfoPage from '@/components/item/myinfo-components'
import { useRoute } from 'vue-router';

const backgroundColors = [
    { background: '#f56a00', text: '#FFFFFF' },
    { background: '#7BC616', text: '#000000' },
    { background: '#14C9C9', text: '#000000' },
    { background: '#168CFF', text: '#FFFFFF' },
    { background: '#FF7D00', text: '#FFFFFF' },
    { background: '#FFC72E', text: '#000000' },
    { background: '#7265e6', text: '#FFFFFF' },
    { background: '#ffbf00', text: '#000000' },
    { background: '#00a2ae', text: '#000000' },
];

const menus = [
    {
        index: 0,
        icon: '',
        name: '工作台',
    },
    {
        index: 1,
        icon: '',
        name: '继续报名',
    },{
        index: 2,
        icon: '',
        name: '我的课程',
    },{
        index: 3,
        icon: '',
        name: '学时减免',
    },{
        index: 4,
        icon: '',
        name: '学时证明',
    },{
        index: 5,
        icon: '',
        name: '我的订单',
    },{
        index: 6,
        icon: '',
        name: '我的信息',
    }
]


export default defineComponent({

    name: "HomePage",
    components: {
        MoreApp, WorkbenchPage, ContinuePage, MycoursePage, TitlePage, ReductionPage, EductionPage, OrderPage, MyInfoPage
    },
    setup() {

        const route = useRoute();
        const a = route.query.isActive;

        const isActive = ref(a || 0)
        const name = ref('高鲲')
        const extractColorByName = () => {
            const index = name.value[0].charCodeAt(0) % backgroundColors.length;
            return backgroundColors[index]
        }

        const selectMenu = (menuItem) => {
            isActive.value = menuItem.index
        }

        const toContinueRegister = () => {
            isActive.value = 1
        }

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

.home-body-left-menu-item-isActive {
    background-color:  rgba(217, 236, 255, 1);
    color:  rgba(64, 158, 255, 1);;
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
}

.home-body-left {
    width: 200px;
    height: 672px;
    opacity: 1;
    display: flex;
    align-items: center;
}

.home-body-left-container {
    width: 200px;
    height: 638px;
    opacity: 1;
    border-right: 1px solid #E0E0E0;
}

</style>
