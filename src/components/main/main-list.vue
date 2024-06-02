<template>
    <div style="margin-top: 16px; display: flex; justify-content: space-between; align-items: center;">
        <div style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 14px;color: rgba(96, 98, 102, 1);">
            位置：<span @click="toMain" style="cursor: pointer;">首页</span> > <span style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 14px;color: rgba(23, 137, 255, 1);">{{ tag }}</span>
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
        <div >
            <div v-for="(item, n) in mainList " :key="n" :style="{ marginTop: n == 0 ? '0px' : '24px' }">
                <div style="width: 887px; display: flex; justify-content: space-between;">
                    <!-- <div style="width: 200px; height: 120px;" v-if="item.thumb">
                        <img :src="item.thumb" style="width: 200px; height: 120px;" />
                    </div>
                    <div style="width: 200px; height: 120px;" class="bg-color-primary-brand-9" v-else>
                    
                    </div> -->
                    <div style="cursor: pointer;" @click="showDetails(item)">
                        <ImgTextCommonPage :width="200" :height="120" :text="'暂无图片'" :img="item.thumb"></ImgTextCommonPage>
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

            <div style="display: flex; justify-content: center; margin-top: 24px" v-if="total && total > 0">
                <el-pagination layout="prev, pager, next" :total="total"  v-model:current-page="curPage" :default-page-size="6" @change="pageChange" />
            </div>
        </div>
        
        <div style="width: 288px;">
            <MainRight></MainRight>
        </div>
    </div>
</template>

<script setup>
import MainRight from '@/components/common/main-right-common'
import {Time} from '@icon-park/vue-next';
import {ref, reactive, watch} from 'vue'
import axios from '@/axios'
import { useRoute, useRouter } from 'vue-router'
import { commonToDetail } from '@/components/common/common'
import ImgTextCommonPage from '@/components/common/img-text-common'

const total = ref(0)
const route = useRoute()
let cid = ref(route.query.cid)
let tag = ref(route.query.tag)

const mainList = reactive([])
const currentPage = ref(1)
const curPage = ref(1)
const pageChange = (c) => {
    currentPage.value = c
    fetchData()
}


const fetchData = () => {
    axios.get(`/api/client/first_page/v1/posters_list?cid=${cid.value}&pageSize=6${currentPage.value ? '&page=' + currentPage.value : ''}`).then(r => {
        mainList.splice(0, mainList.length)
        mainList.push(...r.data.data.records)
        total.value = r.data.data.total
    })
}

fetchData()

watch(
    () => route,
    (newRoute) => {
        currentPage.value = 1
        curPage.value = 1
        cid.value = newRoute.query.cid
        tag.value = newRoute.query.tag
        fetchData()
    },
    {
        deep:true
    }
)

const showDetails = (item) => {
    commonToDetail(router, item)
}

const router = useRouter()
const toMain = () => {
    router.push(`/home/first`)
}

</script>

<style>
</style>