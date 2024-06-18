<template>
        <div>
            <div style="display: flex; width: 100%; justify-content: space-between; align-items: center;">
                <div style="width: 84px; height: 28px; border-radius: 10px; box-shadow: inset 0 0 0 1px rgba(64, 158, 255, 1); text-align: center; line-height: 28px; font-size: 14px; color: rgba(64, 158, 255, 1);">
                    {{ selectCourse.year }}学年
                </div>
                <div>
                    <el-button style="width: 100px; height: 28px;" @click="backup">返回</el-button>
                </div>
            </div>

            <div style="margin-top: 16px; display: flex; justify-content: space-between;">
                <div style="width: 360px;height: 114px;background: rgba(255, 255, 255, 1); border: 1px solid rgba(220, 223, 230, 1); ">
                    <div style="width: calc(100% - 32px); margin: 0 auto; margin-top: 16px; display: flex; justify-content: space-between;">
                        <div>
                            <div style="font-size: 16px; font-weight: 600; line-height: 22px; color: rgba(48, 49, 51, 1);">
                                学习周期
                            </div>
                            <div style="font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(96, 98, 102, 1); margin-top: 7px;">
                                {{ selectCourse.learnStartDate }}
                            </div>
                            <div style="font-size: 14px; font-weight: 400; line-height: 22px; color:  rgba(103, 194, 58, 1); margin-top: 7px;">
                                进行中...
                            </div>
                        </div>

                        <img src="@/assets/xuexizhouqi.png" style="width: 75px; height: 77px; margin-top: 6px;" />
                    </div>
                </div>
                <div style="width: 360px;height: 114px;background: rgba(255, 255, 255, 1); border: 1px solid rgba(220, 223, 230, 1);  ;">
                    <div style="font-size: 16px; font-weight: 600; line-height: 22px; color: rgba(48, 49, 51, 1); margin-top: 16px; margin-left: 16px;">
                        课程统计
                    </div>
                    <div style="margin-left: 16px; margin-top: 8px; display: flex; justify-content: space-between; border-radius: 4px; padding-right: 16px;">
                        <div class="prince-container" style="background: linear-gradient(180deg, rgba(51, 126, 204, 1) 0%, rgba(121, 187, 255, 1) 100%); ">
                            <div class="prince-desc" style="color: rgba(255, 255, 255, 1);">课程数</div>
                            <div class="prince-num" style="color: rgba(255, 255, 255, 1);">{{ selectCourse.courseTotal }}</div>
                        </div>
                        <div class="prince-container">
                            <div class="prince-desc" style="color: rgba(96, 98, 102, 1);">未完成</div>
                            <div class="prince-num" >{{ selectCourse.courseTotal - selectCourse.completeMajor - selectCourse.completeMinor }}</div>
                        </div>
                        <div class="prince-container">
                            <div class="prince-desc" style="color: rgba(96, 98, 102, 1);">待考核</div>
                            <div class="prince-num" >{{ selectCourse.courseExam - selectCourse.courseExamed }}</div>
                        </div>
                        
                        <div style="height: 52px; width: 1px; background-color:  rgba(220, 223, 230, 1); ">

                        </div>
                        <div class="prince-container">
                            <div class="prince-desc" style="color: rgba(96, 98, 102, 1);">考核通过</div>
                            <div class="prince-num" >{{ selectCourse.courseExamed }}</div>
                        </div>
                    </div>
                </div>
                <div style="width: 180px;;height: 114px;background: rgba(255, 255, 255, 1); border: 1px solid rgba(220, 223, 230, 1);">
                    <div style="font-size: 16px; font-weight: 600; line-height: 22px; color: rgba(48, 49, 51, 1); margin-top: 16px; margin-left: 16px;">
                        学习进度
                    </div>

                    <div style="text-align: center;">
                        <svg width="105" height="50" viewBox="0 0 200 100" style="margin-top: 8px;">
                            <defs>
                                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style="stop-color:rgba(176, 208, 255, 1);stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:rgba(91, 143, 249, 1);stop-opacity:1" />
                                </linearGradient>
                            </defs>
                            <path class="background-path" d="M10,100 A90,90 0 0,1 190,100" fill="none" stroke="#e6e6e6" stroke-width="15"/>
                            <!-- 进度圆弧 -->
                            <path class="progress-path" d="M10,100 A90,90 0 0,1 190,100" fill="none" stroke="url(#grad)" stroke-width="15"
                                    :stroke-dasharray="progressStrokeDasharray"
                                    :stroke-dashoffset="progressStrokeDashoffset"/>

                        </svg>
                        <div style="color: rgba(0, 0, 0, 1); font-size: 24px; font-weight: 400; position: relative; bottom: 30px;">
                            {{ selectCourse.process || 0 }}<span style="font-size: 14px;">%</span>
                        </div>
                    </div>

                </div>
            </div>

            <el-tabs v-model="tableStatus" @tab-click="elTabsClick" style="margin-top: 37px;">
                <el-tab-pane label="全部" :name="1"></el-tab-pane>
                <el-tab-pane label="学习未完成" :name="2"></el-tab-pane>
                <el-tab-pane label="学习已完成" :name="3"></el-tab-pane>
                <el-tab-pane label="待考核" :name="4"></el-tab-pane>
                <el-tab-pane label="考核合格" :name="5"></el-tab-pane>
            </el-tabs>

            <div style="margin-top: 20px; display: flex; justify-content: center; ">
                <div>
                    <div class="menuasdf" :style="{ backgroundColor: menuIndex == 1 ? 'rgba(64, 158, 255, 0.7)' : 'rgba(51, 126, 204, 0.7)' }" @click="switchKm(1)">
                        专业科目
                    </div>
                    <div v-if="menuIndex == 1" class="menusanjiaoxing"></div>
                </div>
                <div>
                    <div class="menuasdf" :style="{ backgroundColor: menuIndex == 2 ? 'rgba(64, 158, 255, 0.7)' : 'rgba(51, 126, 204, 0.7)' , marginLeft: '16px'}" @click="switchKm(2)">
                        公需科目
                    </div>
                    <div v-if="menuIndex == 2" class="menusanjiaoxing"></div>
                </div>
            </div>


            <div style="margin-top: 16px; flex-wrap: wrap;  display: flex; gap: 29px;">
                <div v-for="(item, index) in courseData" :key="item.id" class="course-card">
                    <div style="width: 242px;margin-top: 16px; ">
                        <!-- <img :src="item.img" style="width: 242px; height: 112px; margin-top: 16px; " /> -->
                        <div style="margin-top: 16px;">
                            <ImgTextCommonPage :width="242" :height="112" :text="menuIndex == 1 ? '专业科目' : '公需科目'" :img="item.thumb"></ImgTextCommonPage>
                        </div>
                        
                        <div class="courrse-detail-double-line-ellipsis">
                            {{ item.title }}
                        </div>
                        <div style="margin-top: 6px; display: flex; justify-content: space-between;">
                            <div style="font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(144, 147, 153, 1); width: 180px;">
                                <div>讲师：&nbsp;{{ item.teacher.name }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.teacher.zhi }}</div>
                                <div class="one-line-ellipsis">单位：&nbsp;{{ item.danwei }}</div>
                            </div>

                            <div style="font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(255, 141, 26, 1); margin-top: 7px;">
                                {{ item.xueshi }}学时
                            </div>
                        </div>
                        <el-progress :percentage="item.programs" color="#B3E19D" style="width: 105%;" class="custom-progress"></el-progress>
                        <div style="display: flex; justify-content: space-between; padding-bottom: 16px; margin-top: 12px;">
                            <el-button style="width: 116px; height: 36px;" type="primary" @click="startStudy(item, index)">
                                {{ item.progress == 0 ? '开始学习' : item.progress == 100 ? '进入复习' : '继续学习' }}
                            </el-button>
                            <!-- :disabled="item.programs != 100" -->
                            <el-button style="width: 116px; height: 36px;" type="danger" :disabled="item.programs != 100" @click="toOnlineExamination(item)">在线考试</el-button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from '@/axios'
import ImgTextCommonPage from '@/components/common/img-text-common'

const menuIndex = ref(1)
const tableStatus = ref(1)
const selectCourse = ref({})

const { proxy } = getCurrentInstance()

const toOnlineExamination = (item) => {
    proxy.$router.push(`/onlieExamination?id=${item.id}&title=${item.title}`)
}

const progressStrokeDasharray = computed(() => {
    return calculateCircumference();
})

const progressStrokeDashoffset = computed(() => {
    return calculateCircumference() * (1 - (selectCourse.value && selectCourse.value.process ? selectCourse.value.process  : 0) / 100);
})

const calculateCircumference = () => {
    const radius = 90; // 圆弧的半径
    return 2 * Math.PI * radius / 2; // 圆弧的周长的一半
}


const elTabsClick = (a) => {
    tableStatus.value = a.props.name
    getCourseList()
}

const router = useRouter()
const route = useRoute()
const item = route.query.item
selectCourse.value = JSON.parse(item)
console.log(selectCourse)

const tableStatusSwitch = [null, 1, 2, 3, 4]
const courseData = reactive([])
const zhiMapping = ['教授', '副教授', '其他', '无']
const getCourseList = async () => {
    let r = await axios.post('/api/client/course/v1/course_list', {
        pageSize: 1000,
        status: tableStatusSwitch[tableStatus.value - 1],
        type: menuIndex.value,
        id: selectCourse.value.id
    })
    courseData.splice(0, courseData.length)
    if (r.data.data) {
        courseData.push(...r.data.data.records.map(item => {
            return {
                id: item.id,
                img: item.thumb,
                title: item.title,
                teacher: { name: item.teacherName, zhi: zhiMapping[item.teacherProfession - 1] },
                danwei: item.teacherWorkplace,
                xueshi: item.courseHour,
                programs: item.progress,
                ...item
            };
        }));
    }
}


getCourseList()


const backup = () => {
    router.go(-1);
}


const switchKm = (index) => {
    menuIndex.value = index
    getCourseList()
}

const startStudy = async (item) => {
    // 判断上一个任务是否完成了
    // if (index != 0 && courseData[index - 1].programs != 100) {
    //     ElMessage.error('上一个任务还未完成')
    //     return;
    // }

    router.push('/main/mycourse/study?id=' + item.id + '&cid=' + item.cid)
}

</script>

<style>

.isSelectVideoPlay {
    color: rgba(196, 86, 86, 1);
}

.notSelectVideoPlay {
    color: rgba(144, 147, 153, 1);;
}

.custom-progress {
  position: relative;
  width: 100%;
  margin-top: 12px;
}

.custom-progress::v-deep .el-progress__text {
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(50%);
}

.course-card{
    flex: 1 1 calc(33.333% - 20px);
    max-width: calc(33.333% - 20px); 
    opacity: 1;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 6px  rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
}

.menusanjiaoxing {
    width: 0;
    height: 0;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-top: 12px solid rgba(64, 158, 255, 0.7);
    margin: 0 auto;
}

.menuasdf {
    display: flex; align-items: center; justify-content: center;
    width: 136px;
    height: 36px;
    opacity: 1;
    border-radius: 4px;
    background: rgba(51, 126, 204, 0.7);
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 22px;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
}

.prince-container {
    width: 58px; 
    height: 52px; 
    text-align: center;
}

.customElDialogitem {
    .el-dialog__header {
        padding-bottom: 0px !important;
    }
}

.prince-desc {
    font-size: 12px; 
    font-weight: 400; 
    line-height: 20px; 
    margin-top: 5px;
}

.prince-num {
    font-size: 20px; 
    font-weight: 500; 
    line-height: 20px; 
}

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

.courrse-detail-double-line-ellipsis {
    margin-top: 12px; min-height: 48px; font-size: 16px; font-weight: 400; line-height: 24px; color: rgba(48, 49, 51, 1); width: 242px;
    display: -webkit-box; /* 设置显示方式为 WebKit box */
    -webkit-box-orient: vertical; /* 垂直排列子元素 */
    -webkit-line-clamp: 2; /* 限制显示的行数 */
    overflow: hidden; /* 隐藏溢出内容 */
    text-overflow: ellipsis; /* 显示省略号 */
}
</style>