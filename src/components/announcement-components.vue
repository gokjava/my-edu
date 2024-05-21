<template>
    <div class="announcement-container">
        <TitlePage></TitlePage>

        <div class="home-body2">
            <div style="text-align: center; padding-top: 56px; font-size: 20px; font-weight: 400; color: rgba(48, 49, 51, 1);">
                关于2023年度黑龙江省执业药师继续教育学习延期结束的通知
            </div>
            <div style="text-align: center; padding-top: 24px; font-size: 14px; font-weight: 700; color: rgba(96, 98, 102, 1); padding-bottom: 24px;">
                发布时间：2023年12月19日
            </div>

            <div style="height: 2px; width: calc(100%  - 220px); margin: 0 auto; border-bottom: 1px solid rgba(220, 223, 230, 1);">

            </div>

            <div style="padding-top: 34px;width: calc(100%  - 220px); margin: 0 auto; ">
                各位学员：        
                2023年度黑龙江省执业药师继续教育报名时间已于2023年11月20日结束，学习时间延至2024年1月20日结束，请未完成学习的学员抓紧时间，以免耽误您获取学分。请学员间相互转告！             
                  黑龙江省医药零售行业协会                                                                                                                                                                                                            
                  2023年12月19日
            </div>

            <div style="display: flex; justify-content: center; padding-top: 72px; padding-bottom: 56px;">
                <el-button @click="toHome">返回主页</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, getCurrentInstance  } from 'vue'
import TitlePage from '@/components/common/title-components'

export default defineComponent({

    name: "HomePage",
    components: {
        TitlePage
    },
    setup() {
        const { proxy } = getCurrentInstance()
        const toHome = () => {
            proxy.$router.push('/home/workbench');
        }
        return {
            toHome
        }
    }
    
})
</script>

<style>

body {
    background-color: rgba(236, 245, 255, 1) ;
}
.announcement-container {
    width: 100%;
}

.home-title-img {
    width: 100%;
    height: 80px;
}

.home-body2 {
    width: calc(100% - 240px);
    margin: 0 auto;
    margin-top: 24px;
    background-color: #ffffff;
}

</style>
