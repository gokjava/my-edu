<template>
    <div class="announcement-container">
        <TitlePage></TitlePage>

        <div class="home-body2">
            <div style="text-align: center; padding-top: 56px; font-size: 20px; font-weight: 400; color: rgba(48, 49, 51, 1);">
                {{ poster.title }}
            </div>
            <div style="text-align: center; padding-top: 24px; font-size: 14px; font-weight: 700; color: rgba(96, 98, 102, 1); padding-bottom: 24px;">
                发布时间：{{ poster.postTime }}
            </div>

            <div style="height: 2px; width: calc(100%  - 220px); margin: 0 auto; border-bottom: 1px solid rgba(220, 223, 230, 1);">

            </div>

            <div style="padding-top: 34px;width: calc(100%  - 220px); margin: 0 auto; " v-if="poster.content" v-html="poster.content">

            </div>

            <div style="display: flex; justify-content: center; padding-top: 72px; padding-bottom: 56px;">
                <el-button @click="toHome">返回主页</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, getCurrentInstance, ref  } from 'vue'
import TitlePage from '@/components/common/title-components'
import { useRoute } from 'vue-router';
import axios from '@/axios'

export default defineComponent({

    name: "HomePage",
    components: {
        TitlePage
    },
    setup() {
        let id = useRoute().query.id
        const poster = ref({})
        axios.get(`/api/client/first_page/v1/posters_info?id=${id}`).then(r => {
            poster.value = r.data.data
            // 2024-05-22T16:57:41
            if (poster.value.postTime) {
                let result1 = poster.value.postTime.split('-')
                poster.value.postTime = result1[0] + '年' + result1[1] + '月' + result1[2].substring(0, 2) + '日'
            }
        }) 
        const { proxy } = getCurrentInstance()
        const toHome = () => {
            proxy.$router.push('/main/workbench');
        }
        return {
            toHome, poster
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
