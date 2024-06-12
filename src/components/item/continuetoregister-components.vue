<template>
    <div class="continue-container">
        <div v-if="random == 0" style="width: 100%; text-align: center; margin-top: 189px;">
            <img style="width: 96.8px;height: 96.8px;" src="@/assets/search.png" />
            <div style="margin-top: 18px; font-size: 16px; font-weight: 600; color: rgba(19, 20, 20, 1); line-height: 24px;">
                暂无学年可报名
            </div>
            <div style="margin-top: 4px; font-size: 14px; font-weight: 400; color: rgba(144, 147, 153, 1);    line-height: 24px;">
                系统暂无可报名通道，如有疑问，可致电<span style="color:rgba(255, 87, 51, 1);"> 010-65279180</span>
            </div>
        </div>

        <div v-if="random == 4" style="width: 584px; margin: 0 auto">
            <el-steps :active="aciveIndex">
                <el-step title="选择学年"></el-step>
                <el-step title="课程展示"></el-step>
                <el-step title="支付"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>

            <div v-if="aciveIndex == 1">
                <div  style="margin-top: 78px; display: flex; justify-content: center;">
                    <div @click="selectYearId = item.id;" class="continue-radio" v-for="(item, index) in yearData" :key="item.id" :style="{ marginLeft: index > 0 ? '37px' : '0px',  border : selectYearId == item.id ? '1px solid rgba(64, 158, 255, 1)' : '1px solid rgba(220, 223, 230, 1)'} " >
                        <div class="continue-radio-quan" :class="{ 'bg-color-primary-brand-10' : selectYearId == item.id }" :style="{border : selectYearId == item.id ? '1px solid rgba(64, 158, 255, 1)' : '1px solid rgba(220, 223, 230, 1)'}">

                        </div>
                        <div style="margin-top: 31px; font-size: 20px; font-weight: 400; line-height: 28px;" :class="{ 'isActiveRadioClass':  selectYearId == item.id}">
                            {{ item.year }}学年
                        </div>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 80px;">
                    <el-button style="width: 200px; height: 40px;" type="primary" @click="selectYearById(item)">下一步</el-button>
                </div>
            </div>

            <div v-if="aciveIndex == 2">
                
                 <div style="margin-top: 25px; min-height: 390px;">

                    <div class="continue-course-item" v-for="(item, index) in courseList" :key="item.id" :style="{ marginTop: index > 0 ? '16px' : '0px' }">
                        <div style="display: flex; justify-content: space-between;">
                            <div style="display: flex;">
                                <!-- <img :src="serverUrl + '/' + item.thumb" style="width: 80px; height: 60px;" /> -->
                                <ImgTextCommonPage :width="80" :height="60" :img="item.thumb" :text="item.type == 1 ? '专业课' : '公需课'" :fontSize="14"></ImgTextCommonPage>
                                <div style="margin-left: 16px;">
                                    <div style="font-size: 16px; font-weight: 400; color: rgba(48, 49, 51, 1); line-height: 24px;">
                                        {{ item.title }}
                                    </div>
                                    <div style="font-size: 14px; font-weight: 400; color: rgba(48, 49, 51, 1); line-height: 22px; margin-top: 14px;">
                                        学时：{{ item.courseHour }}
                                    </div>
                                </div>
                            </div>
                            
                            <div style="padding-top: 30px;">
                                <el-button  type="primary" style="width: 80px; height: 30px; " @click="selectVideo(item)">试看</el-button>
                            </div>
                        </div>
                    </div>

                 </div>

                 <div style="text-align: center; padding-bottom: 30px;">
                    <el-button style="width: 200px; height: 40px; margin-top: 32px;" @click="toBuildOrder" type="primary">下一步</el-button>
                 </div>

            </div>

            <div v-if="aciveIndex == 3" style="width: 100%; text-align: center;">
                <div>
                    <!--  const orderDetail = reactive({
            id: '',
            payUrl: ''
        }) -->
                    <!-- <img :src="@/assets/test-qrcode.png" style="width: 247px; height: 244px; margin-top: 71px;"/> -->
                    <!-- <canvas ref="qrcodeCanvas" style="width: 247px; height: 244px; margin-top: 71px;"></canvas> -->
                    <div style="width: 247px; height: 244px; margin: 0 auto;margin-top: 71px; padding: 18px; border: 1px solid rgb(211, 212, 212);">
                        <QRCodeVue 
                            :value="orderDetail.payUrl"
                            :size="240"
                            :level="'H'"
                            :background="'#ffffff'"
                            :foreground="'#000000'"
                            />
                    </div>
                    
                    <div style="font-size: 12px; font-weight: 400; line-height: 20px; color: rgba(255, 0, 0, 1); margin-top: 8px;">
                        请于24小时内完成支付，超时无法支付请重新发起报名
                    </div>
                </div>
                <!-- <div style="margin-top: 76px;">
                    <el-button style="width: 200px; height: 40px; " @click="aciveIndex = 4" type="primary" >下一步</el-button>
                 </div> -->
            </div>

            <div v-if="aciveIndex == 4" style="width: 100%; text-align: center;">
                <div>
                    <el-icon size="63" style="margin-top: 134px;" color="green"><SuccessFilled /></el-icon>
                    <div style="font-size: 16px; font-weight: 400; line-height: 25px; color: rgba(19, 20, 20, 1); margin-top: 21px;">
                        继教教育报名成功
                    </div>
                    <div style="font-size: 14px; font-weight: 400; line-height: 24px; color:rgba(144, 147, 153, 1); margin-top: 4px;">
                        请务必在{{ yearData.find(y => y.id = selectYearId).learnStartDate }}-{{ yearData.find(y => y.id = selectYearId).learnEndDate }}学习周期内完成学习及考核
                    </div>
                </div>
                <div style="margin-top: 40px;">
                    <el-button style="width: 200px; height: 40px;"  type="primary" @click="toStudyPage" >开始学习</el-button>
                 </div>
            </div>
            
            
        </div>


            <el-dialog
                v-model="videoDialogVisible"
                title="课程试看"
                width="600"
                destroy-on-close
                center
            >
                <div style="color:red; text-align:center">{{ tipMessage }}</div>
                <div style="display: flex; justify-content: center;">
                    
                    <video-player
                        ref="videoPlayRef"
                        :src="skVideo"
                        :poster="skPoster"
                        controls
                        :volume="0.6"
                        :width="500"

                        @timeupdate="onTimeUpdate"
                        @seeking="onSeeking"
                    />
                </div>
            </el-dialog>
    </div>
</template>

<script>
import { defineComponent, ref, reactive, onUnmounted, getCurrentInstance } from 'vue'
import ImgTextCommonPage from '@/components/common/img-text-common'
import imageSrc from '@/assets/continue-course.png';
import axios from '@/axios'
import QRCodeVue from 'qrcode.vue';
import { getServerUrl } from '@/components/common/constant'
import { ElMessageBox } from 'element-plus';
const serverUrl = getServerUrl()

export default defineComponent({

    name: "ContinueRetisger",
    components: {
        QRCodeVue, ImgTextCommonPage
    },
    setup() {
        const yearData = reactive([])
        const { proxy } = getCurrentInstance()
        const toStudyPage = () => {
            proxy.$router.push(`/main/mycourse`)
        }

        // 三种情况随机产生
        let random = ref(0) // Math.floor(Math.random() * 2)
        const continueRegister = () => {
            random.value = 4
        }

        axios.get('/api/client/course/v1/year_list').then(r => {
            if (r.data.code == 1) {
                yearData.push(...r.data.data)
                if (yearData.length  == 0) {
                    random.value = 0
                } else {
                    selectYearId.value = yearData[0].id
                    random.value = 4
                }
            }
        })

        const selectYearId = ref(0)
        const aciveIndex = ref(1)
        const selectYear = ref(null)

        const courseList = reactive([])

        const selectYearById = async () => {
            aciveIndex.value = 2
            // 请求数据
            let r = await axios.get(`/api/client/course/v1/try_see?id=${selectYearId.value}`)
            courseList.splice(0, courseList.length)
            courseList.push(...r.data.data)
        }

        const skVideo = ref('')
        const skPoster = ref('')
        const videoDialogVisible = ref(false)
        const selectVideo = (videoUrl) => {
            skVideo.value = videoUrl.chapter.url
            skPoster.value = videoUrl.thumb
            videoDialogVisible.value = true
            tipMessage.value = ''
        }
        const lastTime = ref()
        const maxTimeAllowed = 60; // 3 minutes in seconds
        const onTimeUpdate = (event) => {
            const video = event.target.getElementsByTagName('video')[0];
            const currentTime = video.currentTime;
            if (currentTime > maxTimeAllowed) {
                video.pause();
                tipMessage.value = '观看已结束'
                // ElMessage.warning(`试看已结束`)
            } else {
                lastTime.value = currentTime;
            }
        }
        const onSeeking = (event) => {
            const video = event.target.getElementsByTagName('video')[0];
            if (video.currentTime !== lastTime.value) {
                video.currentTime = lastTime.value;
            }
        }

        const orderDetail = reactive({
            id: '',
            payUrl: ''
        })

        const qrcodeCanvas = ref()

        const toBuildOrder = async () => {

            // 校验学时问题：
            let selectYear = yearData.find(item => item.id == selectYearId.value)
            let a = 0
            let b = 0
            let courseScopes = 0
            courseList.forEach(item => {
                if (item.type == 1) {
                    a+=item.courseHour
                } else {
                    b+=item.courseHour
                }
                courseScopes += item.courseHour
            })
            let yearScopes = selectYear.classMajorHours + selectYear.classMinorHours
            if (courseScopes < yearScopes) {
                ElMessageBox.alert(`${selectYear.year}年度要求完成${yearScopes}学时，专业课${selectYear.classMajorHours}学时，公需课${selectYear.classMinorHours}学时，本次所选的课程含${courseScopes}学时，专业课${a}学时，公需课${b}学时，请返回选择足够学时的课程`, '学时未达标', {
                    confirmButtonText: '确定',
                    callback: () => {
                        
                    },
                })
                return;
            }

            aciveIndex.value = 3
            let r = await axios.post('/api/client/order/v1/create_order', {
                paymentFrom: 1,
                paymentMethod: 1,
                selectedCourses: courseList.map(course => course.id).join(','),
                year: yearData.find(y => y.id = selectYearId.value).year,
                yid: selectYearId.value
            })
            if (r.data.code == 1) {
                orderDetail.id = r.data.data.id
                orderDetail.payUrl = r.data.data.payUrl
                // 添加定时任务
                let t = setInterval(() => {
                    // 请求后台
                    axios.get(`/api/client/order/v1/query_status?id=${orderDetail.id}`).then(r => {
                        if (r.data.data == 2) {
                            timer = null
                            clearInterval(t)
                            // 成功
                            aciveIndex.value = 4
                        } else if (r.data.data > 2) {
                            timer = null
                            clearInterval(t)
                            // 支付失败, 返回上一步
                            aciveIndex.value = 2
                        }
                    })
                }, 3000);
                timer = t
            }
        }

        let timer = null

        onUnmounted(() => {
            if (timer) {
                clearInterval(timer)
            }     
        })

        const tipMessage = ref('')
        

        return {
            random, continueRegister, yearData, selectYearId, aciveIndex, courseList, imageSrc,selectYearById, serverUrl,
            selectVideo, videoDialogVisible, skVideo, onSeeking, onTimeUpdate, skPoster, toBuildOrder, orderDetail, qrcodeCanvas,
            tipMessage, toStudyPage, selectYear
        }
    }
    
})
</script>

<style>

.continue-course-item {
    width: 584px;
    opacity: 1;
    border-radius: 4px;
    border: 1px solid rgba(220, 223, 230, 1);
    padding: 16px;
}

.isActiveRadioClass {
    color: rgba(64, 158, 255, 1);
}
.continue-radio-quan {
    width: 20px;
    height: 20px;
    opacity: 1;
    border-radius: 50%;
    margin-top: 31px;
}

.continue-radio {
    width: 144px;
    height: 144px;
    opacity: 1;
    border-radius: 4px;
    background: rgba(244, 244, 245, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
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

</style>
