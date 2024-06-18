<template>
        <div>
            <div style="width: 100%; display: flex;">
                <div class="video-container">
                    <video-player
                        v-if="selectVideoUrl"
                        :key="componentKey"
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
                        <div style="font-size: 16px; font-weight: 400; line-height: 24px; min-height: 48px; text-align: center; color: rgba(48, 49, 51, 1);    display: -webkit-box; /* 设置显示方式为 WebKit box */-webkit-box-orient: vertical; /* 垂直排列子元素 */-webkit-line-clamp: 2; /* 限制显示的行数 */overflow: hidden; /* 隐藏溢出内容 */text-overflow: ellipsis; /* 显示省略号 */">
                            {{ videoData.title }}
                        </div>
                        <div style="height: 1px; background: linear-gradient(90deg, rgba(144, 147, 153, 0) 0%, rgba(144, 147, 153, 1) 48.27%, rgba(144, 147, 153, 0) 100%); margin-top:10px ;"></div>
                        <div style="margin-top: 10px; display: flex; font-size: 14px; line-height: 22px; font-weight: 400; color: rgba(144, 147, 153, 1);">
                            <div style="margin-left: 45px;">
                                讲师：&nbsp;
                            </div>
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="videoData.teacherName + '&nbsp;&nbsp;&nbsp;&nbsp;' + zhiMapping[videoData.teacherProfession - 1]  "
                                placement="top-start"
                            >
                                <div style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis ; width: 100px; ">
                                    {{ videoData.teacherName }}&nbsp;&nbsp;&nbsp;&nbsp;{{ zhiMapping[videoData.teacherProfession - 1]  }}
                                </div>
                            </el-tooltip>
                            
                        </div>

                        <div style="margin-top: 10px; display: flex; font-size: 14px; line-height: 22px; font-weight: 400; color: rgba(144, 147, 153, 1);">
                            <div style="margin-left: 45px;">
                                单位：&nbsp;
                            </div>
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="videoData.teacherWorkplace"
                                placement="bottom-start"
                            >
                                <div style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis; width: 100px;">
                                    {{ videoData.teacherWorkplace }}
                                </div>
                            </el-tooltip>
                            
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
                                                <VideoPlay />
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
                        <div v-if="videoData.introduction" v-html="videoData.introduction" style="white-space: pre-wrap;margin-top: 24px; width: 833px;margin-left: 24px; font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(96, 98, 102, 1); padding-bottom: 27px;">
                        </div>
                        <div v-else style="width: 200px;">
                            <el-empty :image-size="110" />
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="相关资料" :name="2">
                        <div v-if="videoData.courseMaterials && videoData.courseMaterials.length > 0" style="margin-top: 24px; margin-left: 24px; font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(96, 98, 102, 1); padding-bottom: 27px;">
                            <div v-for="(item, index) in videoData.courseMaterials" :key="index">
                                <el-button type="text" @click="downloadByUrl(item.url)">{{ item.title }}</el-button>
                            </div>
                        </div>
                        <div v-else style="width: 200px;">
                            <el-empty :image-size="110" />
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="学习记录" :name="3">
                        <div v-if="videoData.learnRecords && videoData.learnRecords.length > 0">
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
                        <div v-else style="width: 200px;">
                            <el-empty :image-size="110" />
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

        <el-dialog v-model="levelHtmlVisible"  width="500" center>
            <div style="width: 100%; text-align: center;">
                <div>
                    <el-icon size="70" color="green" v-if="showType == 1">
                        <VideoPlay />
                    </el-icon>
                    <GoodTwo v-else theme="outline" size="70" fill="green" :strokeWidth="3"/>
                </div>
                
                <div style="margin-top: 10px; margin-bottom: 20px;" >
                    <span v-show="showType == 1">请勿离开页面</span>
                    <span v-show="showType == 2">恭喜你，当前小节学习完成</span>
                    <span v-show="showType == 3">恭喜你，顺利完成该课程的学习</span>
                </div>
                <div style="margin-bottom: 20px;">
                    <el-button v-show="showType == 1" type="primary" @click="continuePlayer">点击继续播放</el-button>
                    <el-button v-show="showType == 2" type="primary" @click="studyNext">学习下一章节</el-button>
                    <el-button v-show="showType == 3" type="primary" @click="backCourse">学习下一门课</el-button>
                </div>
            </div>
        </el-dialog>

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

<script setup>
import { ref, reactive,onUnmounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import axios from '@/axios'
import { useRoute, useRouter } from 'vue-router'
import { GoodTwo } from '@icon-park/vue-next';

const zhiMapping = ['教授', '副教授', '其他', '无']
const videoData = ref({})
const selectVideoUrl = ref('')
const playData = reactive([])
const selectPlayIndex = ref(0)
const route = useRoute()
const router = useRouter()
const id = route.query.id
const cid = route.query.cid

const levelHtmlVisible = ref(false)
const showType = ref(1)
const componentKey = ref(0)

const canStartStudy = async () => {
    let r = await axios.get(`/api/client/course/v1/learn_course_detail?id=${id}`)
    videoData.value = r.data.data
    playData.splice(0, playData.length)
    if (r.data.data.chapter) {
        playData.push(...r.data.data.chapter)
        selectVideoUrl.value = playData[selectPlayIndex.value].url
    }
}

let stream;
const requestCameraPermission = async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({video: true})
    } catch(e) {
        console.log('请求参数异常', e)
        ElMessage.error('您已关闭摄像头权限，请您打开，操作在地址栏左侧')
        setTimeout(() => {
            router.go(-1)
        }, 1000);
    }
}


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
            setTimeout(() => {
                router.go(-1)
            }, 1000);
        }
    }
    if (permission.state == 'granted') {
        canStartStudy(item)
    }
}

checkCameraPermission()
const handleVisibilitychange = () => {
    if (document.visibilityState === 'hidden') {
        pauseVideo()
        levelHtmlVisible.value = true
        showType.value = 1
    }
}

const handleWindowBlur = () => {
    console.log('blur')
    pauseVideo()
};
// 检测页面可见性变化时
document.addEventListener('visibilitychange', handleVisibilitychange);
document.addEventListener('blur', handleWindowBlur);

onUnmounted(async () => {
    document.removeEventListener('visibilitychange', handleWindowBlur)
    document.removeEventListener('blur', handleWindowBlur)
    const permission = await navigator.permissions.query({ name: 'camera' })
    permission.onchange = null
})
const downloadByUrl = (url) => {
    window.open(url)
}

let customInterval = null
onUnmounted(() => {
    if (customInterval) {
        clearInterval(customInterval)
    }
    if (stream) {
        stream.getTracks().forEach(track => track.stop())
    }
})

const operationClickIndex = ref(1)
const handleOperationClick = (a) => {
    operationClickIndex.value = a.props.name
}

const teacherScore = ref(0)
const summaryScore = ref(0)
const courseScore = ref(0)
const content = ref('')
const savepj = async () => {
    if (teacherScore.value == 0 ||summaryScore.value == 0 ||  courseScore.value == 0) {
        ElMessage.error('所有评价必须打分')
        return
    }
    let r = await axios.post('/api/client/course/v1/evaluate', {
        cid: cid,
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


const videoPlayRef = ref('')
const pauseVideo = () => {
    // 暂停
    if (videoPlayRef.value && videoPlayRef.value.$el) {
        let videos = videoPlayRef.value.$el.getElementsByTagName('video')
        if (videos && videos.length > 0) {
            videos[0].pause()
        }
    }
}

const isLearnSuccess = () => {
    return playData[selectPlayIndex.value].progress == 100
}
let uploadRecordObject = {
            
}
const capturePoints = [0.2, 0.4, 0.6, 0.8];
const capturePointFlags = [0, 0, 0, 0]

// 每次开始的时候都会创建新的startDateTime
const videoPlay = () => {
    if (isLearnSuccess()) {
        return
    }
    console.log('play...')
    if (!videoPlayRef.value || !videoPlayRef.value.$el) {
        return
    }
    // 处理已经有进度的情况
    let v = videoPlayRef.value.$el.getElementsByTagName('video')[0]
    let ps = playData[selectPlayIndex.value].currentDuration
    if (ps > 0) {
        v.currentTime = ps
    } else {
        v.currentTime = 0
    }
    
    uploadRecordObject.chapterId = playData[selectPlayIndex.value].id
    uploadRecordObject.cid = cid
    uploadRecordObject.courseRecordId = id
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

const uploadRecord = () => {
    console.log('上报进度')
    // 上报进度
    let v = videoPlayRef.value.$el.getElementsByTagName('video')[0]
    uploadRecordObject.endTime = parseInt(v.currentTime)
    uploadRecordObject.currentDuration = parseInt(v.currentTime)
    if (uploadRecordObject.endTime == 0 && uploadRecordObject.currentDuration == 0) {
        return
    }
    axios.post('/api/client/course/v1/learn_process', uploadRecordObject).then(r => {
        if (r.data.code == 1) {
            if (r.data.data) {
                uploadRecordObject.id = r.data.data
            }
        }
    })
}

const updatePlayIndex = (index) => {
    if (index != 0 && playData[index - 1].progress != 100) {
        ElMessage.warning('上一个视频还未观看完毕')
        return
    }
    componentKey.value = componentKey.value + 1
    selectPlayIndex.value = index
    // 视频暂停，并且时间切换为0秒进度
    pauseVideo()
    selectVideoUrl.value = playData[selectPlayIndex.value].url
   
    nextTick(() => {
        let v = videoPlayRef.value.$el.getElementsByTagName('video')[0]
        v.currentTime = 0
    })

}

let collectAvatarInterval = null
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

const onEnded = () => {
    if (isLearnSuccess()) {
        return
    }
    canUpdateTime = false
    playData[selectPlayIndex.value].progress = 100
    lastTime.value = 0
    try {
        exitFullscreen()
    } catch(e) {
        console.log(e)
    }
    
    // 清楚定时任务
    if (customInterval) {
        clearInterval(customInterval)
    }
    uploadRecord()
    // 判断是否是最后一个
    showType.value = (playData.length - 1 == selectPlayIndex.value ? 3 : 2 )
    if (playData.length - 1 != selectPlayIndex.value) {
        let v = videoPlayRef.value.$el.getElementsByTagName('video')[0]
        v.currentTime = 0
    }
    levelHtmlVisible.value = true
}

const studyNext = () => {
    updatePlayIndex(selectPlayIndex.value + 1)
    levelHtmlVisible.value = false
    // 自动播放
    nextTick(() => {
        let v = videoPlayRef.value.$el.getElementsByTagName('video')[0]
        v.currentTime = 0
        
        // 渲染完之后，再播放
        v.play()
    })
}


function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen(); // W3C 规范
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen(); // Firefox 旧版
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen(); // Chrome, Safari 和 Opera 旧版
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen(); // IE 11
  }
}

const lastTime = ref()
const onSeeked = () => {
    if (isLearnSuccess()) {
        return
    }
    canUpdateTime = true
}
const photoDataUrl = ref(null)
const videoDialogVisible = ref(false)
const captureImage = async () => {
    try {
        exitFullscreen()
    } catch(e) {
        // 忽略报错内容
    }
    
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

const continuePlayer = () => {
    const video = videoPlayRef.value.$el.getElementsByTagName('video')[0]
    video.play()
    levelHtmlVisible.value = false
}

const onSeeking = () => {
    if (isLearnSuccess()) {
        return
    }
    console.log('seeking...')
    canUpdateTime = false
    const video = videoPlayRef.value.$el.getElementsByTagName('video')[0]
    if (video.currentTime !== lastTime.value) {
        video.currentTime = lastTime.value;
    }
}

let canUpdateTime = true
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
        cid: cid,
        courseRecordId: id
    }).then(r => {
        if (r.data.code == 1) {
            if (videoPlayRef.value && videoPlayRef.value.$el) {
                let videos = videoPlayRef.value.$el.getElementsByTagName('video')
                if (videos && videos.length > 0) {
                    videos[0].play()
                }
            }
        }
    }).finally(() => {
        videoDialogVisible.value = false
    })
}

const backCourse = () => {
    router.go(-1)
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
</style>