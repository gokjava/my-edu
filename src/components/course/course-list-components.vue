<template>
    <div class="course-container">
        <div v-if="random == 1" style="width: 100%; text-align: center; margin-top: 150px;">
            <img style="width: 96.8px;height: 96.8px;" src="@/assets/search.png" />
            <div style="margin-top: 18px; font-size: 16px; font-weight: 600; color: rgba(19, 20, 20, 1); line-height: 24px;">
                暂无课程数据
            </div>
            <div style="margin-top: 4px; font-size: 14px; font-weight: 400; color: rgba(144, 147, 153, 1);    line-height: 24px;">
                你尚未报名年度继续教育，请先完成继续教育报名
            </div>
            <div style="margin-top: 32px;">
                <el-button type="primary" @click="continueRegister()">我要报名</el-button>
            </div>
        </div>
        <div v-if="random == 2" style="width: 100%; display: flex; justify-content: center; margin-top: 150px;flex-wrap: wrap; gap: 24px">
            <div class="continue-item" v-for="(item) in courseList" :key="item.id" :style="{ backgroundColor: item.learnStatus == 1 ? 'rgba(236, 245, 255, 1)' : 'rgba(245, 247, 250, 1)'}">
                <div v-if="item.learnStatus != 1" style="width: 104px; height: 21px; background-color: rgba(245, 108, 108, 1); color: #FFFFFF; font-size: 12px; font-weight: 400; margin-left: 135px; display: flex; align-items: center; justify-content: center;">
                    学习通道已关闭
                </div>
                <div style="font-size: 20px; font-weight: 700; line-height: 28px; color: rgba(48, 49, 51, 1); text-align: center;">
                    {{ item.year }} <span style="color: var(--el-menu-text-color); font-weight: 400;">学年继续教育</span>
                </div>
                <div style="font-size: 12px; font-weight: 400; line-height: 22px; color: rgba(96, 98, 102, 1); margin-top: 4px; text-align: center;">
                    学习周期： {{ item.learnStartDate }}
                </div>
                <div class="continue-item2" style="margin-top: 16px;">
                    <div>
                        专业课：<span style="font-weight: 700;">{{ item.courseMajor }}</span>
                    </div>
                    <div>
                        已完成专业课：<span style="font-weight: 700;">{{ item.completeMajor }}</span>
                    </div>
                </div>
                <div class="continue-item2" style="margin-top: 8px;">
                    <div>
                        公需课：<span style="font-weight: 700;">{{ item.courseMinor }}</span>
                    </div>
                    <div>
                        已完成公需课：<span style="font-weight: 700;">{{ item.completeMinor }}</span>
                    </div>
                </div>
                <div class="continue-item2" style="font-size: 12px; font-weight: 400; color: rgba(144, 147, 153, 1); line-height: 22px; margin-top: 8px;">
                    <div>
                        学习总进度
                    </div>
                    <div>
                        {{item.progress || 0}}%
                    </div>
                </div>
                <div>
                    <el-progress :percentage="item.progress" :show-text="false" status="success"></el-progress>
                </div>
                <div style="margin-top: 15px;">
                    <el-button type="primary" style="width: 100%;" @click="toStudy(item)" :disabled="item.learnStatus != 1">去学习</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/axios'

const random = ref(0)
const router = useRouter()
const continueRegister = () => {
    router.push('/main/con')
}

const courseList = reactive([])
axios.get('/api/client/course/v1/my_course').then(r => {
    // console.log(r.data)
    if (!r.data.data || r.data.data.length == 0) {
        random.value = 1
    } else {
        random.value = 2
    }
    courseList.push(...r.data.data)
})

const toStudy = (item) => {
    router.push('/main/mycourse/detail?item=' + JSON.stringify(item))
}


</script>

<style>

.continue-item {
    width: 229px;
    opacity: 1;
    border-radius: 4px;
    background: rgba(236, 245, 255, 1);
    padding-top: 23px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 27px;
}

.continue-item2 {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 22px;
    color: rgba(96, 98, 102, 1);
}
</style>