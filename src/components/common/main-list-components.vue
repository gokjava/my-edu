<template>
    <div style="margin-top: 16px; display: flex; justify-content: space-between; align-items: center;">
        <div style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 14px;color: rgba(96, 98, 102, 1);">
            位置：<span @click="toMain" style="cursor: pointer;">首页</span> > <span style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 14px;color: rgba(23, 137, 255, 1);">重要通知</span>
        </div>
        <div>
            <div style="display: flex; justify-content: space-between;">
                <el-input style="margin-right: 12px;"></el-input>
                <el-button>搜索</el-button>
            </div>
        </div>
    </div>
    <div style="width: 100%; height: 1px; background-color: rgba(220, 223, 230, 1); margin-top: 20px;">

    </div>

    <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 24px;">
        <div v-if="random == 2" style="display: flex; flex-direction: column; align-items: center;width: 887px">
            <div style="font-size: 20px;font-weight: 600;letter-spacing: 0px;line-height: 28px;color: rgba(0, 0, 0, 1);">
                {{ poster.title }}
            </div>

            <div style="display: flex;font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(96, 98, 102, 1); gap: 10px; align-items: center; margin-top: 22px;">
                <div>
                    <People theme="outline" size="13" fill=" rgba(96, 98, 102, 1)" :strokeWidth="2"/>&nbsp;黑龙江医药零售行业协会
                </div>
                <div>
                    <PreviewOpen theme="outline" size="13" fill=" rgba(96, 98, 102, 1)" :strokeWidth="2"/>&nbsp;{{ poster.views }}
                </div>
                <div>
                    <Time theme="outline" size="13" fill=" rgba(96, 98, 102, 1)" :strokeWidth="2"/>&nbsp;{{ poster.postTime }}
                </div>
            </div>

            <div style="margin-top: 49px; width: 100%;white-space: pre-wrap;font-size: 16px;font-weight: 400;letter-spacing: 0px;line-height: 30px;color: rgba(48, 49, 51, 1);" v-html="poster.content">

            </div>
        </div>
        <div v-if="random == 1">
            <div v-for="(item, n) in props.mainList " :key="n" :style="{ marginTop: n == 0 ? '0px' : '24px' }">
                <div style="width: 887px; display: flex; justify-content: space-between;">
                    <div style="width: 200px; height: 120px;" v-if="item.thumb">
                        <img :src="item.thumb" style="width: 200px; height: 120px;" />
                    </div>
                    <div style="background-color: black; width: 200px; height: 120px;" v-else>
                    
                    </div>


                    <div style="width: 671px;">
                        <div style="font-size: 16px;font-weight: 600;letter-spacing: 0px;line-height: 14px;color: rgba(96, 98, 102, 1); margin-top: 8px; cursor: pointer;" @click="showDetails(item)">{{ item.title }}</div>
                        <div style="min-height: 44px;font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(96, 98, 102, 1); margin-top: 20px;">{{ item.description }}</div>
                        <div style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(144, 147, 153, 1); margin-top: 12px;">
                            <Time theme="outline" size="15" fill="#333" :strokeWidth="2" style="position: relative; top: 2px; padding-right: 6px;" />{{ item.postTime ?  item.postTime.replace('T', ' ') : null}}
                        </div>
                    </div>
                    
                </div>
                
            </div>

            <div style="display: flex; justify-content: center; margin-top: 24px" v-if="props.total && props.total > 0">
                <el-pagination layout="prev, pager, next" :total="props.total"  :default-page-size="6" @change="pageChange"/>
            </div>
        </div>
        
        <div style="width: 288px;">
            <MainRight></MainRight>
        </div>
    </div>
</template>

<script setup>
import MainRight from '@/components/common/main-right-common'
import {Time, People, PreviewOpen} from '@icon-park/vue-next';
import {ref, defineProps,defineEmits} from 'vue'
import axios from '@/axios'

const props = defineProps({
    mainList: Array,
    total: Number,
    cid: Number
})
const emit = defineEmits(['pageChange'])
const pageChange = (currentPage) => {
    emit('pageChange', props.cid,currentPage)
}

const random = ref(1)
const  poster = ref({})
const showDetails = (item) => {
    random.value = 2
    axios.get(`/api/client/first_page/v1/posters_info?id=${item.id}`).then(r => {
        poster.value = r.data.data
    }) 
}

const toMain = () => {
    location.reload()
}

// const content = ref(`尊敬的专业技术人员：
// 您好！
// 为进一步做好全省专业技术人员继续教育公需科目学习，从即日起，我们将对安徽省专业技术人员继续教育管理平台升级改造，届时系统将关闭，具体开放时间另行通知。这不会影响本年度专业技术人员申报职称评审，请广大专业技术人员放心。给您学习带来不便，我们深表歉意！请相互转告。
// 咨询电话：0551-63710079 



// 2024年4月3日`)

</script>

<style>
</style>