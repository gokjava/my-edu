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



        <div v-if="random == 3" >
            <div style="display: flex; width: 100%; justify-content: space-between; align-items: center;">
                <div style="width: 84px; height: 28px; border-radius: 10px; box-shadow: inset 0 0 0 1px rgba(64, 158, 255, 1); text-align: center; line-height: 28px; font-size: 14px; color: rgba(64, 158, 255, 1);">
                    {{ selectCourse.year }}学年
                </div>
                <div>
                    <el-button style="width: 100px; height: 28px;" @click="random = 2">返回</el-button>
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
                            <div class="prince-num" >{{ selectCourse.courseTotal - selectCourse.courseMajor - selectCourse.courseMinor }}</div>
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
                        
                        <div style="margin-top: 12px; min-height: 48px; font-size: 16px; font-weight: 400; line-height: 24px; color: rgba(48, 49, 51, 1); width: 242px;">
                            {{ item.title }}
                        </div>
                        <div style="margin-top: 6px; display: flex; justify-content: space-between;">
                            <div style="font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(144, 147, 153, 1);">
                                <div>讲师：&nbsp;{{ item.teacher.name }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.teacher.zhi }}</div>
                                <div>单位：&nbsp;{{ item.danwei }}</div>
                            </div>

                            <div style="font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(255, 141, 26, 1); margin-top: 7px;">
                                {{ item.xueshi }}学时
                            </div>
                        </div>
                        <el-progress :percentage="item.programs" color="#B3E19D" style="width: 105%;" class="custom-progress"></el-progress>
                        <div style="display: flex; justify-content: space-between; padding-bottom: 16px; margin-top: 12px;">
                            <el-button style="width: 116px; height: 36px;" type="primary" @click="startStudy(item, index)">开始学习</el-button>
                            <!-- :disabled="item.programs != 100" -->
                            <el-button style="width: 116px; height: 36px;" type="primary" :disabled="item.programs != 100" @click="toOnlineExamination(item)">在线考试</el-button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div v-if="random == 4">
            <div style="width: 100%; display: flex;">
                <div class="video-container">
                    <video-player
                        v-if="selectVideoUrl"
                        ref="videoPlayRef"
                        :src="selectVideoUrl"
                        controls
                        :loop="false"
                        :volume="0.6"
                        :width="704"
                        :height="396"
                        :defaultPrevented="true"
                        @play="videoPlay"
                        @pause="videoPause"
                        @ready="onPlayerReady"
                        @timeupdate="onTimeUpdate"
                        @seeking="onSeeking"
                        @ended="onEnded"
                        @seeked="onSeeked"
                    >
                    </video-player>
                </div>

                <div style="width: calc(100% - 688px); height: 364px; padding-left: 8px; padding-right: 8px; padding-top: 16px; padding-bottom: 16px; background-color:  rgba(64, 158, 255, 0.2);">
                    <div style="height: 364px;">
                        <div style="font-size: 16px; font-weight: 400; line-height: 24px; min-height: 48px; text-align: center; color: rgba(48, 49, 51, 1);;">
                            {{ videoData.title }}
                        </div>
                        <div style="height: 1px; background: linear-gradient(90deg, rgba(144, 147, 153, 0) 0%, rgba(144, 147, 153, 1) 48.27%, rgba(144, 147, 153, 0) 100%); margin-top:10px ;"></div>
                        <div style="margin-top: 10px; display: flex; font-size: 14px; line-height: 22px; font-weight: 400; color: rgba(144, 147, 153, 1);">
                            <div style="margin-left: 45px;">
                                讲师：&nbsp;
                            </div>
                            <div>
                                {{ videoData.teacherName }}&nbsp;&nbsp;&nbsp;&nbsp;{{ zhiMapping[videoData.teacherProfession - 1]  }}
                            </div>
                        </div>

                        <div style="margin-top: 10px; display: flex; font-size: 14px; line-height: 22px; font-weight: 400; color: rgba(144, 147, 153, 1);">
                            <div style="margin-left: 45px;">
                                单位：&nbsp;
                            </div>
                            <div>
                                {{ videoData.teacherWorkplace }}
                            </div>
                        </div>

                        <div style="margin-top: 6px; height: 34px; width: 100%; background: linear-gradient(90deg, rgba(64, 158, 255, 0) 0%, rgba(64, 158, 255, 0.7) 48.56%, rgba(64, 158, 255, 0) 100%); 
                            font-weight: 400; font-size: 14px; line-height: 22px; color: rgba(255, 255, 255, 1); display: flex; justify-content: center; align-items: center;">
                            {{videoData.courseHour}}&nbsp;学时
                        </div>
                        <div style="height: 140px; margin-top: 18px;">
                            <el-scrollbar height="140px">
                                <div >
                                    <div v-for="(item, index) in playData"  :key="index"
                                        style=" padding-left: 23px; font-size: 14px; font-weight: 400; line-height: 22px; cursor: pointer;"
                                        @click="updatePlayIndex(index)"
                                        :class="{ 'isSelectVideoPlay' : selectPlayIndex == index, 'notSelectVideoPlay' : selectPlayIndex != index }">
                                        <div style="display: flex; margin-top: 10px;">
                                            <el-icon size="22" :color="selectPlayIndex == index ? 'rgba(196, 86, 86, 1)' : 'rgba(144, 147, 153, 1)'">
                                            <video-play />
                                        </el-icon>
                                        <div style="padding-left: 19px; display: flex; justify-content: space-between; width: 130px; font-size: 14px; line-height: 22px; font-weight: 400;">
                                            <div>第{{ item.order.toString().padStart(2, '0') }}节</div>
                                            <div>{{ selectPlayIndex == index ? '正在播放' :  item.progress + '%'}}</div>
                                        </div>
                                        </div>
                                        <div v-if="index != playData.length - 1" style=" width: 100%; height: 1px; background: linear-gradient(90deg, rgba(144, 147, 153, 0) 0%, rgba(144, 147, 153, 1) 48.27%, rgba(144, 147, 153, 0) 100%); margin-top: 9px;"></div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </div>
                        <div style=" width: 100%; height: 1px; background: linear-gradient(90deg, rgba(144, 147, 153, 0) 0%, rgba(144, 147, 153, 1) 48.27%, rgba(144, 147, 153, 0) 100%); margin-top: 9px;"></div>

                        <div> 
                            <div style="height: 19px; display: flex; justify-content: end; align-items: end; font-size: 12px; font-weight: 400; line-height: 12px; color: rgba(96, 98, 102, 1);;">
                                {{videoData.progress}}%
                            </div>
                            <div style="display: flex; align-items: center; ">
                                <div style="padding-left: 18px; font-size: 12px; font-weight: 400; color: rgba(96, 98, 102, 1); padding-right: 14px; line-height: 20px;">
                                    观看总进度
                                </div>
                                <div style="width: 118px;">
                                    <el-progress :percentage="videoData.progress" color="#B3E19D" :show-text="false"></el-progress>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style="width: 100%; margin-top: 24px;">
                <el-tabs v-model="operationClickIndex" @tab-click="handleOperationClick">
                    <el-tab-pane label="课程介绍" :name="1">
                        <div v-html="videoData.introduction" style="white-space: pre-wrap;margin-top: 24px; width: 833px;margin-left: 24px; font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(96, 98, 102, 1); padding-bottom: 27px;">
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="相关资料" :name="2">
                        <div style="margin-top: 24px; margin-left: 24px; font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(96, 98, 102, 1); padding-bottom: 27px;">
                            <div v-for="(item, index) in videoData.courseMaterials" :key="index">
                                <el-button type="text" @click="downloadByUrl(item.url)">{{ item.title }}</el-button>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="学习记录" :name="3">
                        <div>
                            <el-timeline>
                                <el-timeline-item
                                    v-for="(item, index) in videoData.learnRecords"
                                    :key="index"
                                    icon="More"
                                    type="primary"
                                    size="large"
                                    :timestamp="item.type == 1 ? `${item.createTime} - ${item.updateTime}` : null"
                                    >
                                    <span v-if="item.type == 1">
                                        观看约{{ item.endTime - item.startTime <= 60 ? 1 :  parseInt((item.endTime - item.startTime) / 60)}}分钟
                                    </span>
                                    <span v-else>
                                        抓拍人脸上传<br>
                                        <img :src="item.url" style="width: 80px; height: 60px; margin-top: 8px;" />
                                    </span>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                    </el-tab-pane>

                    <div>
                        <el-tabs v-model="pingjia">
                            <el-tab-pane label="课程评价" :name="1"></el-tab-pane>
                        </el-tabs>

                        <div style="display: flex; align-items: center;">
                            <div style="padding-right: 29px; font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(96, 98, 102, 1);;">
                                课程满意度
                            </div>
                            <el-rate v-model="courseScore" />
                        </div>
                        <div style="display: flex; align-items: center;">
                            <div style="padding-right: 29px; font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(96, 98, 102, 1);;">
                                老师满意度
                            </div>
                            <el-rate v-model="teacherScore"  />
                        </div>
                        <div style="display: flex; align-items: center;">
                            <div style="padding-right: 29px; font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(96, 98, 102, 1);;">
                                整体满意度
                            </div>
                            <el-rate v-model="summaryScore"  />
                        </div>

                        <div style="margin-top: 16px;">
                            <el-input style="width: 100%;" :rows="3" type="textarea" placeholder="请输入内容" v-model="content"></el-input>
                            <el-button style="width: 71px; height: 30px; margin-top: 16px;" @click="savepj">保存评价</el-button>
                        </div>
                    </div>

                </el-tabs>
            </div>
            
        </div>


    </div>


    <el-dialog
        v-model="videoDialogVisible"
        width="896"
        :show-close="false"
        style="padding: 0px"
        class="customElDialogitem"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
    >
        <div style="width:100%; display: flex">
            <div style="width:448px; background-color: rgba(48, 49, 51, 1); display:flex; flex-direction: column; align-items:center">
                <div style="width: 400px">
                    <div style="padding-top: 24px;width: 400px; font-size: 14px;font-weight: 600;letter-spacing: 0px;line-height: 19.6px;color: rgba(255, 255, 255, 1);">
                        认证说明
                    </div>
                    <div style="margin-top: 8px;background-color:rgba(24, 24, 28, 1); color:  rgba(255, 255, 255, 0.8);font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px; padding:12px">
                        抓拍学员人脸记录，仅用于确认学员本人参与学习，不做他用，请学员知晓
                    </div>
                    <div style="padding-top: 8px;width: 400px; font-size: 14px;font-weight: 600;letter-spacing: 0px;line-height: 19.6px;color: rgba(255, 255, 255, 1);">
                        操作提示
                    </div>
                    <div style="margin-bottom: 24px;margin-top: 8px;background-color:rgba(24, 24, 28, 1); color:  rgba(255, 255, 255, 0.8);font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px; padding:12px">
                        1.确保学员本人参加学习<br>
                        2.确保摄像头已连接且正常工作<br>
                        3.请保持光源充足<br>
                        4.请确保脸部正面面向摄像头，调整姿势以保证整个脸部进入摄像头范围<br>
                        5.拍摄过程请注意隐私保护<br>
                    </div>
                </div>
            </div>
            <div style="width:448px; background-color:#ffffff; display:flex; flex-direction: column; align-items:center">
                <div style="margin-top:24px; width: 297px; height:223px; ">
                    <video id="customPzPlayer" autoplay width="297" heigth="223"></video>
                </div>
                <canvas id="customPzCanvas" width="297" height="223" style="display: none; width: 297px; height: 223px"></canvas>
                <img :src="photoDataUrl" style="display: none" />
                <div style="margin-top: 24px; margin-bottom: 24px"> 
                    <el-button style="width:200px; height:40px" type="primary" @click="pzSuccess">拍照</el-button>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>

import { defineComponent, ref, getCurrentInstance, computed, onUnmounted, reactive, nextTick } from 'vue'
import ImgTextCommonPage from '@/components/common/img-text-common'
import { getServerUrl } from '@/components/common/constant'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const serverUrl = getServerUrl()
import axios from '@/axios'

export default defineComponent({
    name: "MycoursePage",
    components: {
        ImgTextCommonPage
    },
    setup() {
        const router = useRouter()
        const courseList = reactive([])
        axios.get('/api/client/course/v1/my_course').then(r => {
            // console.log(r.data)
            if (!r.data.data || r.data.data.length == 0) {
                //random.value = 1
            } else {
                // random.value = 2
            }
            courseList.push(...r.data.data)
            console.log(courseList)
        })

        const  { proxy } = getCurrentInstance()

        const random = ref(0)
        const continueRegister = () => {
            // emit('to-continue-register', true)
            router.push('/main/con')
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

        const tableStatus = ref(1)

        const elTabsClick = (a) => {
            tableStatus.value = a.props.name
            getCourseList()
        }

        const selectPlayIndex = ref(0)

        const menuIndex = ref(1)

        const updatePlayIndex = (index) => {
            if (index != 0 && playData[index - 1].progress != 100) {
                ElMessage.error('上一个视频还未观看完毕')
                return
            }
            selectPlayIndex.value = index
            // 视频暂停，并且时间切换为0秒进度
            pauseVideo()
            let v = videoPlayRef.value.$el.getElementsByTagName('video')[0]
            let ps = playData[selectPlayIndex.value].currentDuration
            if (ps > 0 && ps != parseInt(v.duration)) {
                v.currentTime = ps
            } else {
                v.currentTime = 0
            }
            selectVideoUrl.value = playData[selectPlayIndex.value].url

        }

        const operationClickIndex = ref(1)
        const handleOperationClick = (a) => {
            operationClickIndex.value = a.props.name
        }
        
        const pingjia = ref(1)

        const videoPlayRef = ref('')
        const handleVisibilitychange = () => {
            if (document.visibilityState === 'hidden') {
                pauseVideo()
            }
        }

        const pauseVideo = () => {
            // 暂停
            if (videoPlayRef.value && videoPlayRef.value.$el) {
                let videos = videoPlayRef.value.$el.getElementsByTagName('video')
                if (videos && videos.length > 0) {
                    videos[0].pause()
                }
            }
        }

        const handleWindowBlur = () => {
            console.log('blur')
            pauseVideo()
        };

        // 检测页面可见性变化时
        document.addEventListener('visibilitychange', handleVisibilitychange);
        document.addEventListener('blur', handleWindowBlur);

        onUnmounted(() => {
            document.removeEventListener('visibilitychange', handleWindowBlur)
            document.removeEventListener('blur', handleWindowBlur)
        })

        const toOnlineExamination = (item) => {
            proxy.$router.push(`/onlieExamination?id=${item.id}&title=${item.title}`)
        }

        const selectCourse = ref()
        const toStudy = async (item) => {
            selectCourse.value = item
            random.value = 3
            // let r = await axios.get(`/api/client/course/v1/learn_course_detail?id=4`)
            // console.log(r.data)
            await getCourseList()
        }

        const tableStatusSwitch = [null, 1, 2, 3, 4]
        const courseData = reactive([
        ])
        const zhiMapping = ['教授', '副教授', '其他', '无']
        const getCourseList = async () => {
            console.log(selectCourse.value)
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

        const switchKm = (index) => {
            menuIndex.value = index
            getCourseList()
        }

        onUnmounted(async ()=> {
            const permission = await navigator.permissions.query({ name: 'camera' })
            permission.onchange = () => {}
        })

        const checkCameraPermission = async (item) => {
            const permission = await navigator.permissions.query({ name: 'camera' })
            await requestCameraPermission()
            permission.onchange = () => {
                console.log('permission.onchange', permission, permission.state == 'granted')
                if (permission.state == 'granted') {
                    canStartStudy(item)
                } else {
                    // 退到上一步
                    ElMessage.error('请您打开摄像头权限')
                    random.value = 3
                }
            }
            if (permission.state == 'granted') {
                canStartStudy(item)
            }
        }
        let stream;
        const requestCameraPermission = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({video: true})
                // stream.getTracks().forEach(track => track.stop())
            } catch(e) {
                console.log('请求参数异常', e)
                ElMessage.error('您已关闭摄像头权限，请您打开，操作在地址栏左侧')
            }
            
        }

        const videoData = ref({})
        const selectCourseNew = ref({})
        const canStartStudy = async (item) => {
            random.value = 4
            selectCourseNew.value = item
            let r = await axios.get(`/api/client/course/v1/learn_course_detail?id=${item.id}`)
            videoData.value = r.data.data
            playData.splice(0, playData.length)
            if (r.data.data.chapter) {
                playData.push(...r.data.data.chapter)
                selectVideoUrl.value = playData[selectPlayIndex.value].url
            }
        }
        const startStudy = async (item, index) => {
            // 判断上一个任务是否完成了
            if (index != 0 && courseData[index - 1].programs != 100) {
                ElMessage.error('上一个任务还未完成')
                return;
            }
            await checkCameraPermission(item)
        }

        const selectVideoUrl = ref('')
        const playData = reactive([])

        let uploadRecordObject = {
            
        }
        let customInterval = null
        let collectAvatarInterval = null
        // 每次开始的时候都会创建新的startDateTime
        const videoPlay = () => {
            if (isLearnSuccess()) {
                return
            }
            console.log('play...')
            
            // 处理已经有进度的情况
            let v = videoPlayRef.value.$el.getElementsByTagName('video')[0]
            let ps = playData[selectPlayIndex.value].currentDuration
            if (ps > 0) {
                v.currentTime = ps
            }
            uploadRecordObject.chapterId = playData[selectPlayIndex.value].id
            uploadRecordObject.cid = selectCourseNew.value.cid
            uploadRecordObject.courseRecordId = selectCourseNew.value.id
            uploadRecordObject.currentDuration = parseInt(v.currentTime)
            // endTime 是在上报的时候生成
            // id 是调用接口返回的
            uploadRecordObject.startTime =  uploadRecordObject.currentDuration; // 当前时间 yyyy-MM-dd HH:mm:ss
            uploadRecordObject.totalDuration = parseInt(v.duration)
            uploadRecordObject.type = 1
            uploadRecordObject.id = null

            // 更新要收集的算法index
            // uploadRecordObject.currentDuration / uploadRecordObject.totalDuration
            for (let i = capturePoints.length - 1; i >= 0; i--) {
                if (uploadRecordObject.currentDuration / uploadRecordObject.totalDuration > capturePoints[i]) {
                    capturePointFlags[i] = 1
                    break
                }
            }

            // 开启定时任务
            customInterval = setInterval(() => {
                uploadRecord()
            }, 5000);

            uploadRecord()
        }
        const videoPause = () => {
            if (isLearnSuccess()) {
                return
            }
            console.log('pause')
            uploadRecord()
            // 关闭定时任务
            if (customInterval) {
                clearInterval(customInterval)
            }
            if (collectAvatarInterval) {
                clearInterval(collectAvatarInterval)
            }
        }
        onUnmounted(() => {
            if (customInterval) {
                clearInterval(customInterval)
            }
            if (stream) {
                stream.getTracks().forEach(track => track.stop())
            }
        })

        const uploadRecord = () => {
            console.log('上报进度')
            // 上报进度
            let v = videoPlayRef.value.$el.getElementsByTagName('video')[0]
            uploadRecordObject.endTime = parseInt(v.currentTime)
            uploadRecordObject.currentDuration = parseInt(v.currentTime)
            axios.post('/api/client/course/v1/learn_process', uploadRecordObject).then(r => {
                if (r.data.code == 1) {
                    if (r.data.data) {
                        uploadRecordObject.id = r.data.data
                    }
                }
            })
        }

        const isLearnSuccess = () => {
            return playData[selectPlayIndex.value].progress == 100
        }

        let canUpdateTime = true
        const lastTime = ref()
        const capturePoints = [0.2, 0.4, 0.6, 0.8];
        const capturePointFlags = [0, 0, 0, 0]
        const onTimeUpdate = () => {
            if (isLearnSuccess()) {
                return
            }
            if (canUpdateTime) {
                const video = videoPlayRef.value.$el.getElementsByTagName('video')[0]
                const currentTime = video.currentTime;
                if (currentTime - lastTime.value > 2) {
                    console.log('假设的自定义拖拽的识别...')
                } else {
                    lastTime.value = currentTime;
                    for (let i = 0; i < capturePoints.length; i++) {
                        let all = capturePoints[i] * video.duration
                        let a = Math.abs(all - currentTime)
                        if (a > 0 && a < 2 && capturePointFlags[i] == 0) {
                            capturePointFlags[i] = 1
                            captureImage();
                            break
                        }
                    }
                }
            } else {
                // console.log('不可以更新时间')
            }
        }
        const captureImage = async () => {
            pauseVideo()
            // 打开摄像头
            // pzStream = await navigator.mediaDevices.getUserMedia({video: true})
            videoDialogVisible.value = true
            nextTick(() => {
                try {
                    document.getElementById('customPzPlayer').srcObject = stream
                } catch(e) {
                    console.log('err异常', e)
                }
            })
            
        }

        const onSeeking = () => {
            if (isLearnSuccess()) {
                return
            }
            canUpdateTime = false
            const video = videoPlayRef.value.$el.getElementsByTagName('video')[0]
            if (video.currentTime !== lastTime.value) {
                video.currentTime = lastTime.value;
            }
        }

        const onProgress = () => {
        }

        const onPlayerReady = () => {
        }

        const onEnded = () => {
            if (isLearnSuccess()) {
                return
            }
            uploadRecord()
            playData[selectPlayIndex.value].progress = 100
        }

        const onSeeked = () => {
            if (isLearnSuccess()) {
                return
            }
            canUpdateTime = true
        }

        const videoDialogVisible = ref(false)
        // let pzStream = null
        const photoDataUrl = ref(null)
        const pzSuccess = () => {
            // 拍照
            let c = document.getElementById('customPzCanvas')
            let context = c.getContext('2d')
            // width: 297px; heigth: 223px
            console.log(c.width, c.height)
            context.drawImage(document.getElementById('customPzPlayer'), 0, 0, c.width, c.height)
            photoDataUrl.value = document.getElementById('customPzCanvas').toDataURL('image/png')
            // 上报学习进度
            axios.post('/api/client/course/v1/learn_process', {
                url: photoDataUrl.value,
                type: 2,
                chapterId: playData[selectPlayIndex.value].id,
                cid: selectCourseNew.value.cid,
                courseRecordId: selectCourseNew.value.id
            }).finally(() => {
                videoDialogVisible.value = false
            })
        }
        const downloadByUrl = (url) => {
            window.open(url)
        }

        const differenceData = (d1, d2) => {
            const date1Obj = new Date(d1.replace(' ', 'T'))
            const date2Obj = new Date(d2.replace(' ', 'T'))
            const diffInMs = Math.abs(date2Obj - date1Obj)
            const result = Math.floor(diffInMs / (1000* 60))
            return result == 0 ? 1 : Math.floor(diffInMs / (1000* 60))
        }

        const savepj = async () => {
            if (teacherScore.value == 0 ||summaryScore.value == 0 ||  courseScore.value == 0) {
                ElMessage.error('所有评价必须打分')
                return
            }
            let r = await axios.post('/api/client/course/v1/evaluate', {
                cid: selectCourseNew.value.cid,
                content: content.value,
                teacherScore: teacherScore.value,
                summaryScore: summaryScore.value,
                courseScore: courseScore.value
            })
            if (r.data.code == 1) {
                teacherScore.value = 0
                summaryScore.value = 0
                courseScore.value = 0
                content.value = ''
                ElMessage.success('保存评价成功')
            }
        }

        const teacherScore = ref(0)
        const summaryScore = ref(0)
        const courseScore = ref(0)
        const content = ref('')

        return {
            random, continueRegister, calculateCircumference, progressStrokeDashoffset, progressStrokeDasharray, elTabsClick, tableStatus, menuIndex, courseData, selectPlayIndex,
            updatePlayIndex, playData, operationClickIndex, handleOperationClick, pingjia, videoPlay, videoPause, videoPlayRef, onPlayerReady, toOnlineExamination, courseList, toStudy,
            selectCourse, switchKm, startStudy, videoData, zhiMapping, serverUrl, selectVideoUrl, onTimeUpdate, onSeeking, onProgress, onEnded, onSeeked, videoDialogVisible, pzSuccess,
            downloadByUrl, photoDataUrl, differenceData, savepj, teacherScore, summaryScore, courseScore, content
        }
    }

})

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
</style>