<template>
    <div>
        <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 24px;">
            <div style="display: flex; flex-direction: column; align-items: center;width: 887px">
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

                <div class="main-detail-content" style="margin-top: 49px; width: 100%;white-space: pre-wrap;font-size: 16px;font-weight: 400;letter-spacing: 0px;line-height: 30px;color: rgba(48, 49, 51, 1);" v-html="poster.content">

                </div>
            </div>
            <div style="width: 288px;">
                <MainRight></MainRight>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import axios from '@/axios'
import { ref, watch } from 'vue'
import {Time, People, PreviewOpen} from '@icon-park/vue-next';
import MainRight from '@/components/common/main-right-common'

const route = useRoute()
let cid = route.query.id
let type = route.query.type
watch(
    () => route,
    newRoute => {
        cid = newRoute.query.id
        poster.value = {}
        showDetails()
    },
    {
        deep: true
    }
)

const poster = ref({})
const showDetails = () => {
    if (type == 2) {
        // 获取list接口
        axios.get(`/api/client/first_page/v1/posters_list?cid=${cid}&pageSize=1`).then(r => {
            if (r.data.code == 1 && r.data.data.records && r.data.data.records.length > 0) {
                axios.get(`/api/client/first_page/v1/posters_info?id=${r.data.data.records[0].id}`).then(r => {
                    if (r.data.code == 1) {
                        poster.value = r.data.data
                    }
                }) 
            }
        })
        // 获取详情接口
    } else {
        axios.get(`/api/client/first_page/v1/posters_info?id=${cid}`).then(r => {
            if (r.data.code == 1) {
                poster.value = r.data.data
            }
        }) 
    }
    
}
showDetails()
</script>

<style>
.main-detail-content {
    img {
        max-width: 100%;
    }
    video {
        max-width: 100%;
    }
}
</style>