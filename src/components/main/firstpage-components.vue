<template>
    <div v-show="random == 1">
        <div style="width: 100%; display: flex; justify-content: space-between;">
            <div style="width: 288px;height: 288px; display: flex; flex-direction: column; justify-content: space-between;">
                <div style="width: 100%; height: 60px; background: rgba(255, 138, 0, 1); display: flex; align-items: center;">
                    <div style="height: 32px; width: 32px; display: flex; justify-content: center; align-items: center; padding-left: 14px; padding-right: 14px; cursor: pointer;">
                        <TajMahal theme="outline" size="30" fill="#ffffff" :strokeWidth="2" style="padding-top: 3px"/>
                    </div>
                    <div style="font-size: 16px;font-weight: 400;letter-spacing: 0px;line-height: 24px;color: rgba(255, 255, 255, 1);">
                        执业药师继续教育
                    </div>
                </div>
                <div style="width: 100%; height: 60px; background:  rgba(38, 150, 153, 1); display: flex; align-items: center;">
                    <div style="height: 32px; width: 32px; display: flex; justify-content: center; align-items: center; padding-left: 14px; padding-right: 14px; cursor: pointer;">
                        <PeoplesTwo theme="outline" size="30" fill="#ffffff" :strokeWidth="2" style="padding-top: 3px"/>
                    </div>
                    <div style="font-size: 16px;font-weight: 400;letter-spacing: 0px;line-height: 24px;color: rgba(255, 255, 255, 1);">
                        寻找身边最美药师
                    </div>
                </div>

                <div style="width: 100%; height: 60px; background:  rgba(236, 245, 255, 1); display: flex; align-items: center;">
                    <div style="height: 32px; width: 32px; display: flex; justify-content: center; align-items: center; padding-left: 14px; padding-right: 14px; cursor: pointer;">
                        <img src="@/assets/gh.png" style="height: 32px; height: 32px;"/>
                    </div>
                    <div style="font-size: 16px;font-weight: 400;letter-spacing: 0px;line-height: 24px;color: rgba(64, 158, 255, 1);">
                        国家药品监督政务服务
                    </div>
                </div>

                <div style="width: 100%; height: 60px; background: rgba(64, 158, 255, 1); display: flex; align-items: center;">
                    <div style="height: 32px; width: 32px; display: flex; justify-content: center; align-items: center; padding-left: 14px; padding-right: 14px; cursor: pointer;">
                        <PeopleBottomCard theme="outline" size="30" fill="#ffffff" :strokeWidth="2" style="padding-top: 3px"/>
                    </div>
                    <div style="font-size: 16px;font-weight: 400;letter-spacing: 0px;line-height: 24px;color: rgba(255, 255, 255, 1);">
                        专家介绍
                    </div>
                </div>
            </div>

            <div style="width: 432px;height: 288px; ">
                <el-carousel height="auto" autoplay v-if="swiperList && swiperList.length > 0">
                    <el-carousel-item style="width: 432px;height: 288px; " v-for="(item, index) in swiperList" :key="index">
                        <img :src="item.thumb" style="width: 432px;height: 288px; cursor: pointer;" @click="openNewWindow(item.redirectUrl)"/>
                    </el-carousel-item>
                </el-carousel>
            </div>

            <div style="width: 432px; height: 288px; border-radius: 4px;background: linear-gradient(180deg, rgba(217, 236, 255, 1) 0%, rgba(217, 236, 255, 0) 100%); display: flex;  flex-direction: column; align-items: center;">
                <div style="width: 384px;margin-top: 16px; display: flex;">

                    <div v-if="tzgg && tzgg.length > 0" style="font-size: 18px;font-weight: 600;letter-spacing: 0px;line-height: 32px;color: rgba(48, 49, 51, 1); overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;"> 
                        <jinritoutiao theme="outline" size="30" fill="rgba(255, 87, 51, 1)" :strokeWidth="2" style="position: relative; top: 9px;" /> {{ tzgg[0].title }}
                    </div>
                </div>
                <div class="main-item1"  v-if="tzgg && tzgg.length > 1">
                    <div v-for="(item, n) in tzgg" :key="n" style="width: 384px; display: flex; justify-content: space-between; align-items: center; margin-top: 18px;" >
                        <div v-if="n > 0" style="width: 4px;height: 4px;opacity: 1;background: rgba(82, 155, 46, 1);"></div>
                        <div v-if="n > 0" style="width: 324px;font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            {{ item.title }}
                        </div>
                        <div v-if="n > 0" style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(96, 98, 102, 1);">
                            {{getDateStr(item.postTime)}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :style="{marginTop: '28px', backgroundImage: `url(${main1})`, width: '100%', height: '100px', backgroundSize: 'cover'}"  style="display: flex; justify-content: center; align-items: center; font-size: 24px;font-weight: 600;letter-spacing: 4px;line-height: 36px;color: rgba(255, 255, 255, 1);">
            执(从)业药师继续教育入口
        </div>
        <div :style="{marginTop: '28px', backgroundImage: `url(${main2})`, width: '100%', height: '100px', backgroundSize: 'cover'}"  style="display: flex; justify-content: center; align-items: center; text-shadow: 0px 0px 6px  rgba(0, 0, 0, 0.25);font-size: 24px;font-weight: 600;letter-spacing: 4px;line-height: 40px;color: rgba(255, 255, 255, 1);">
            寻找身边最美药师
        </div>

        <div style="height: 100px; width: 100%; display: flex; justify-content: space-between; margin-top: 28px;">
            <div style="width: 744px; height: 100px; background-size: cover" :style="{ backgroundImage: `url(${main3})` }">
                
            </div>
            <div style="width: 433px; height: 100px; background-size: cover" :style="{ backgroundImage: `url(${main4})` }">

            </div>
        </div>

        <div style="height: 284px; width: 100%; display: flex; justify-content: space-between; margin-top: 28px;">
            <div style="width: 744px; height: 284px" class="main-item1">
                <div style="width: 100%; height: 40px; display: flex;justify-content: space-between; background: linear-gradient(90deg, rgba(198, 226, 255, 1) 0%, rgba(198, 226, 255, 0) 100%);  align-items: center;">
                    <div style="display: flex;">
                        <div class="main-abcd" :style="{ boxShadow: clickMainIndex == 1 ? '0 1px 0 0 rgba(64, 158, 255, 1)' : '', color : clickMainIndex == 1 ? 'rgba(23, 137, 255, 1)' : 'black', fontWeight: clickMainIndex == 1 ? '600' : '400'}" @click="switchIndex(1)">
                            继续教育
                        </div>
                        <div class="main-abcd" :style="{ boxShadow: clickMainIndex == 2 ? '0 1px 0 0 rgba(64, 158, 255, 1)' : '', color : clickMainIndex == 2 ? 'rgba(23, 137, 255, 1)' : 'black', fontWeight: clickMainIndex == 1 ? '600' : '400'}" @click="switchIndex(2)">
                            政策法规
                        </div>
                    </div>
                    <div style="font-size: 12px;font-weight: 400;letter-spacing: 0px;line-height: 20px;color: rgba(96, 98, 102, 1);" @click="showMore( clickMainIndex == 1 ? 3:5)">
                        更多>>
                    </div>
                </div>
                <MainItemPage :jxjy="jxjy" :width="670"></MainItemPage>
            </div>
            <div style="width: 433px; height: 284px" class="main-item1">
                <div style="width: 100%; height: 40px; display: flex; background: linear-gradient(90deg, rgba(198, 226, 255, 1) 0%, rgba(198, 226, 255, 0) 100%); justify-content: space-between;align-items: center;">
                    <div class="main-abcd" :style="{ boxShadow: '0 1px 0 0 rgba(64, 158, 255, 1)', color : 'rgba(23, 137, 255, 1)',  fontWeight:'600' }">
                        信息咨询
                    </div>
                    <div style="font-size: 12px;font-weight: 400;letter-spacing: 0px;line-height: 20px;color: rgba(96, 98, 102, 1);">
                        更多>>
                    </div>
                </div>
                <MainItemPage :jxjy="xxzx" :width="350"></MainItemPage>
            </div>
        </div>

        <div :style="{marginTop: '28px', backgroundImage: `url(${main5})`, width: '100%', height: '100px', backgroundSize: 'cover'}">
            
        </div>

        <div style="width: 100%; height: 379px; display: flex; flex-direction: column; align-items: center;background: linear-gradient(270deg, rgba(198, 226, 255, 0) 0%, rgba(198, 226, 255, 1) 100%); margin-top: 28px;">
            <div style="margin-top: 24px; height: 40px; display: flex; align-items: center;">
                <div style="background: linear-gradient(to right, rgba(236, 245, 255, 0), rgba(23, 137, 255, 1));height: 2px; width: 520px;"></div>
                <div style="font-size: 22px;font-weight: 600;letter-spacing: 0px;line-height: 40px;color: rgba(23, 137, 255, 1); padding-left: 10px; padding-right: 10px;">
                    科普专栏
                </div>
                <div style="background: linear-gradient(to right, rgba(23, 137, 255, 1), rgba(236, 245, 255, 0));height: 2px; width: 520px;"></div>
            </div>

            <div style="width: 1152px; height: 277px; display: flex; justify-content: space-between;">
                <div style="width: 698px; height: 277px; ">
                    <div style="border-bottom: 1px solid rgba(220, 223, 230, 1); width: 100%; display: flex; justify-content: space-between; align-items: center;">
                        <div class="main-abcd" :style="{ boxShadow: '0 1px 0 0 rgba(64, 158, 255, 1)', color : 'black',  fontWeight:'600' }">
                            科普知识
                        </div>
                        <div style="font-size: 12px;font-weight: 400;letter-spacing: 0px;line-height: 20px;color: rgba(96, 98, 102, 1);">
                            更多>>
                        </div>
                    </div>

                    <MainItemPage :jxjy="kpzs" :width="615"></MainItemPage>
                    
                </div>
                <div style="width: 410px; height: 277px; ">
                    <div style="border-bottom: 1px solid rgba(220, 223, 230, 1); width: 100%; display: flex; align-items: center; justify-content: space-between;">
                        <div class="main-abcd" :style="{ boxShadow: '0 1px 0 0 rgba(64, 158, 255, 1)', color : 'black',  fontWeight:'600' }">
                            科普视频
                        </div>
                        <div style="font-size: 12px;font-weight: 400;letter-spacing: 0px;line-height: 20px;color: rgba(96, 98, 102, 1);">
                            更多>>
                        </div>
                    </div>

                    <div>
                        <img src="https://img.js.design/assets/smartFill/img431164da758808.jpg"  style="width: 408px; height: 212px; margin-top: 24px;"/>
                    </div>
                    
                </div>
            </div>
        </div>

        <div style="width: 100%; height: 379px; display: flex; flex-direction: column; align-items: center;background: linear-gradient(270deg, rgba(198, 226, 255, 1) 0%,  rgba(198, 226, 255, 0) 100%); margin-top: 28px;">
            <div style="margin-top: 24px; height: 40px; display: flex; align-items: center;">
                <div style="background: linear-gradient(to right, rgba(236, 245, 255, 0), rgba(23, 137, 255, 1));height: 2px; width: 520px;"></div>
                <div style="font-size: 22px;font-weight: 600;letter-spacing: 0px;line-height: 40px;color: rgba(23, 137, 255, 1); padding-left: 10px; padding-right: 10px;">
                    法普专栏
                </div>
                <div style="background: linear-gradient(to right, rgba(23, 137, 255, 1), rgba(236, 245, 255, 0));height: 2px; width: 520px;"></div>
            </div>

            <div style="width: 1152px; height: 277px; display: flex; justify-content: space-between;">
                <div style="width: 698px; height: 277px; ">
                    <div style="border-bottom: 1px solid rgba(220, 223, 230, 1); width: 100%; display: flex; justify-content: space-between; align-items: center;">
                        <div class="main-abcd" :style="{ boxShadow: '0 1px 0 0 rgba(64, 158, 255, 1)', color : 'black',  fontWeight:'600' }">
                            法律法规
                        </div>
                        <div style="font-size: 12px;font-weight: 400;letter-spacing: 0px;line-height: 20px;color: rgba(96, 98, 102, 1);">
                            更多>>
                        </div>
                    </div>
                    <MainItemPage :jxjy="flfg" :width="615"></MainItemPage>
                    
                </div>
                <div style="width: 410px; height: 277px; ">
                    <div style="border-bottom: 1px solid rgba(220, 223, 230, 1); width: 100%; display: flex; align-items: center; justify-content: space-between;">
                        <div class="main-abcd" :style="{ boxShadow: '0 1px 0 0 rgba(64, 158, 255, 1)', color : 'black',  fontWeight:'600' }">
                            法普视频
                        </div>
                        <div style="font-size: 12px;font-weight: 400;letter-spacing: 0px;line-height: 20px;color: rgba(96, 98, 102, 1);">
                            更多>>
                        </div>
                    </div>

                    <div>
                        <img src="https://img.js.design/assets/smartFill/img431164da758808.jpg"  style="width: 408px; height: 212px; margin-top: 24px;"/>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>

    <MainListPage v-if="random == 2" :mainList="mainList" :total="totalCount" :cid="cid" @pageChange="showMore"></MainListPage>
</template>

<script setup>
import MainItemPage from '@/components/common/main-item-components'
import MainListPage from '@/components/common/main-list-components'
import {ref, reactive, defineProps, watch} from 'vue'
import axios from '@/axios'
import { TajMahal, PeoplesTwo,PeopleBottomCard, Jinritoutiao  } from '@icon-park/vue-next';
import main1 from '@/assets/main/main-1.png'
import main2 from '@/assets/main/main-2.png'
import main3 from '@/assets/main/main-3.png'
import main4 from '@/assets/main/main-4.png'
import main5 from '@/assets/main/main-5.png'
const props = defineProps({
    selectType: Number
})


watch(
    () => props.selectType,
    (newValue) => {
        if (newValue) {
            axios.get(`/api/client/first_page/v1/posters_list?cid=2&pageSize=6`).then(r => {
                console.log(r.data)
                random.value = 2
            })
        } else if (newValue == 0) {
            random.value = 1
        }
    }
)
const cid = ref(0)
const mainList = reactive([])
const totalCount = ref(0)
const showMore=(id, currentPage) => {
    cid.value = id
    axios.get(`/api/client/first_page/v1/posters_list?cid=${id}&pageSize=6${currentPage ? '&page=' + currentPage : ''}`).then(r => {
        console.log(r.data)
        random.value = 2
        mainList.splice(0, mainList.length)
        mainList.push(...r.data.data.records)
        totalCount.value = r.data.data.total
    })
}


const clickMainIndex = ref(1)
const switchIndex = (index) => {
    clickMainIndex.value = index
    axios.get(`/api/client/first_page/v1/posters_list?cid=${index == 1 ? 3 : 5}&pageSize=6`).then(r => {
        jxjy.splice(0, jxjy.length)
        jxjy.push(...r.data.data.records)
    })

}

let swiperList = reactive([])
const getSwiperList = async () => {
    let r = await axios.get('/api/client/first_page/v1/swiper_list')
    swiperList.push(...r.data.data)
}
getSwiperList()
const openNewWindow = (url) => {
    window.open(url)
}

const jxjy = reactive([])
axios.get(`/api/client/first_page/v1/posters_list?cid=3&pageSize=6`).then(r => {
    jxjy.push(...r.data.data.records)
})


const xxzx = reactive([])
axios.get(`/api/client/first_page/v1/posters_list?cid=4&pageSize=6`).then(r => {
    xxzx.push(...r.data.data.records)
})

const kpzs = reactive([])
axios.get(`/api/client/first_page/v1/posters_list?cid=7&pageSize=6`).then(r => {
    kpzs.push(...r.data.data.records)
})
const flfg = reactive([])
axios.get(`/api/client/first_page/v1/posters_list?cid=11&pageSize=6`).then(r => {
    flfg.push(...r.data.data.records)
})

const tzgg = reactive([])
axios.get(`/api/client/first_page/v1/posters_list?cid=1&pageSize=6`).then(r => {
    tzgg.push(...r.data.data.records)
})

const getDateStr = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${month}-${day}`;
    return formattedDate
}

let random = ref(1)

</script>

<style>
.main-item1 {
    overflow: auto;
    scrollbar-width: none; /* Firefox */
}
.main-item1::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
}

.main-abcd {
    width: 80px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0px;
    line-height: 24px;
}

</style>