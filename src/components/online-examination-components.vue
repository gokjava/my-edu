<template>
    <TitlePage></TitlePage>
    <div style=" width: 1200px; min-height: 1072px; background-color: #ffffff; margin: 0 auto; margin-top: 24px; display: flex;">
        <div style="width: 233px; height: 1015px; margin-top: 32px; padding-left: 32px; padding-right: 32px;">
            <div style="width: 233px; height: 175px; ">
                <video id="customExamVideo" width="223" height="175" style="width: 233px; height: 175px;" autoplay></video>
                <canvas id="customExamCanvas"  width="223" height="175" style="display:none;width: 233px; height: 175px;"></canvas>
            </div>
            <div style="width: 233px; text-align: center;margin-top: 8px; font-size: 12px;font-weight: 400;letter-spacing: 0px;line-height: 17.38px;color: rgba(96, 98, 102, 1);">
                摄像头区域
            </div>

            <div style="font-size: 14px;font-weight: 600;letter-spacing: 0px;line-height: 19.6px;color: rgba(48, 49, 51, 1); margin-top: 16px;">
                考试须知：
            </div>

            <div style="margin-top: 8px; font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(96, 98, 102, 1);">
                1.考试需要全程开启摄像头，防止代考
            </div>

            <div style="margin-top: 30px; font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(96, 98, 102, 1);">
                2.考试过程不能切换到其他页面，系统将记录每一次行为
            </div>
            <div style="margin-top: 30px; font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(96, 98, 102, 1);">
                3.每门课程的考试机会最多10次，若10次仍未通过则本课程按不合格处理
            </div>
            <div style="margin-top: 30px; font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(96, 98, 102, 1);">
                4.考试过程中，系统将随机补抓若干张人像，请调整好坐姿，确保人像出现在摄像头区域内
            </div>
        </div>
        <div style="margin-top: 32px; width: 1px; background: linear-gradient(90deg, rgba(220, 223, 230, 1) 0%, rgba(204, 204, 204, 0.55) 53.76%, rgba(220, 223, 230, 0) 100%); "></div>

        <div style="padding-left: 33px; padding-right: 33px;  flex-grow: 1; margin-top: 32px;">
            <div style="width: 100%; height: 87px; display: flex; justify-content: space-between;">
                <div style="display: flex; justify-content: space-between; flex-direction: column; height: 87px;">
                    <div style="font-size: 22px;font-weight: 600;letter-spacing: 0px;line-height: 40px;color: rgba(48, 49, 51, 1);">
                        在线考核
                    </div>
                    <div>
                        <span style="font-size: 16px;font-weight: 400;letter-spacing: 0px;line-height: 24px;color: rgba(96, 98, 102, 1);">课程名称：</span>
                        <span style="font-size: 16px;font-weight: 400;letter-spacing: 0px;line-height: 24px;color: rgba(64, 158, 255, 1);">《{{title}}》</span>
                    </div>
                </div>
                <div style="width: 141px; height: 87px; border-radius: 4px; border: 1px solid rgba(220, 223, 230, 1); text-align: center;">
                    <div style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(96, 98, 102, 1); margin-top: 17px;">
                        考试倒计时
                    </div>
                    <div style="font-size: 20px;font-weight: 400;letter-spacing: 0px;line-height: 23.3px;color: rgba(0, 0, 0, 1); margin-top: 8px;">
                        {{ m.toString().padStart(2, '0') }}&nbsp;:&nbsp;{{ s.toString().padStart(2, '0') }}
                    </div>
                </div>
            </div>

            <div style=" margin-top: 16px; width: 100%; height: 1px; background: linear-gradient(90deg, rgba(220, 223, 230, 1) 0%, rgba(204, 204, 204, 0.55) 53.76%, rgba(220, 223, 230, 0) 100%);"></div>

            <div style="margin-top: 19px;" class="option-class">
                <div v-for="(item, index) in questions" :key="item.id" style="margin-top: 16px;">
                    <div style="font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(48, 49, 51, 1);">
                        {{ index + 1 }}.[{{ item.type == 1 ? '单选题' : item.type == 2 ? '复选题' : '判断题' }}]{{ item.title }}
                    </div>
                    <div style="margin-top: 16px;">
                        <div v-if="item.type == 1">
                            <el-radio-group v-model="item.selectAnswer" @change="() => answerUpdate(index)">
                                <div v-for="itemSelect in item.select" :key="itemSelect.id">
                                    <el-radio :disabled="commited" style="display: block;" :label="itemSelect.id">{{ itemSelect.select }}.{{ itemSelect.value }}</el-radio>
                                </div>
                            </el-radio-group>
                        </div>
                        <div v-else-if="item.type == 2">
                        <el-checkbox-group v-model="item.selectAnswer" @change="() => answerUpdate(index)" >
                            <div v-for="itemSelect in item.select" :key="itemSelect.id">
                                <el-checkbox :disabled="commited" :label="itemSelect.id">{{ itemSelect.select }}.{{ itemSelect.value }}</el-checkbox>
                            </div>
                        </el-checkbox-group>
                        </div>
                        <div v-else>
                            <el-radio-group v-model="item.selectAnswer" @change="() => answerUpdate(index)">
                                <el-radio :disabled="commited" :value="true">1.对</el-radio>
                                <el-radio :disabled="commited" :value="false">2.错</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
            </div>

            <div style="text-align: center; margin-top: 52px;">
                <el-button type="primary" style="width: 200px; height: 40px;" @click="submit">提交</el-button>
            </div>

        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, getCurrentInstance, nextTick, ref, onUnmounted } from 'vue'
import TitlePage from '@/components/common/title-components'
import { ElMessageBox, ElMessage } from 'element-plus';
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import axios from '@/axios'

export default defineComponent({
    name: "onlineExamination",
    components: {
        TitlePage
    },
    setup() {
        const questions = reactive([])

        const { proxy } = getCurrentInstance()
        let commited = ref(false)

        const commitSubmot = () => {
            commited.value = true
            if (customTimeout) {
                clearInterval(customTimeout)
            }

            let answers = questions.map(item => {
                let itemId = item.id
                let answer = ''
                if (item.type == 1) {
                    answer = item.selectAnswer
                } else if (item.type == 2) {
                    answer = item.selectAnswer.sort().join('')
                } else {
                    if (item.selectAnswer === true) {
                        answer = 'A'
                    }
                    if (item.selectAnswer === false) {
                        answer = 'B'
                    }
                }
                return {
                    id: itemId,
                    answer
                }
            })
            console.log(answers)
            axios.post('/api/client/exam/v1/submit_exam', {
                answers,
                id: newId.value
            }).then(r => {
                if (r.data.code == 1) {
                    ElMessageBox.alert(`您考了${r.data.data}分`, '结果', {
                        confirmButtonText: '确定',
                        showClose: false,
                        callback: () => {
                            proxy.$router.push('/home/mycourse')
                        },
                    });
                }
            })
            
        }

        const submit = () => {
            ElMessageBox.confirm('提交答案?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                commitSubmot()
            }).catch(() => {
                
            });
        }
        const route = useRoute();
        const id = route.query.id;
        onUnmounted(async () => {
            const permission = await navigator.permissions.query({ name: 'camera' })
            permission.onchange = () => {}
        })
        // 打开摄像头,再进行考试处理
        const checkCameraPermission = async () => {
            const permission = await navigator.permissions.query({ name: 'camera' })
            if (permission.state != 'granted') {
                await requestCameraPermission()
                permission.onchange = () => {
                    console.log('permission.onchange', permission, permission.state == 'granted')
                    if (permission.state == 'granted') {
                        startExam()
                    } else {
                        // 退到上一步
                        ElMessage.error('请您打开摄像头权限')
                    }
                }
            }
            if (permission.state == 'granted') {
                startExam()
            }
        }
        let stream;
        const requestCameraPermission = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({video: true})
                stream.getTracks().forEach(track => track.stop())
            } catch(e) {
                console.log('请求参数异常', e)
                ElMessage.error('您已关闭摄像头权限，请您打开，操作在地址栏左侧')
            }
            
        }
        const answerTransfer = ['A', 'B', 'C', 'D']
        const transferSelect = (item) => {
            if (item.type == 1 || item.type == 2) {
                return item.options.map((content, index) => {
                    return {
                        id: answerTransfer[index],
                        select: answerTransfer[index],
                        value: content
                    }
                })
            } else {
                return []
            } 
        }
        const newId = ref(null)
        const title = ref(route.query.title)
        const m = ref(30)
        const s = ref(0)
        let customTimeout = null
        const startExam = () => {
            axios.get(`/api/client/exam/v1/start?id=${id}`).then(r => {
                questions.splice(0, questions.length)
                questions.push(...r.data.data.questions.map(item => {
                    return {
                        id: item.id,
                        type: item.type,
                        title: item.title,
                        selectAnswer: item.type == 2 ? [] : null,
                        select: transferSelect(item)
                    }
                }))
                newId.value = r.data.data.id
                // open摄像头
                openMedia()
                // 开始倒计时
                customTimeout = setInterval(() => {
                    if (s.value == 0) {
                        if (m.value == 0) {
                            if (!commited.value) {
                                commitSubmot()
                            }
                            clearInterval(customTimeout)
                            return
                        }
                        s.value = 59
                        m.value = m.value - 1
                    } else {
                        s.value = s.value - 1
                    }

                }, 1000);
            })
        }

        onUnmounted(() => {
            if (customTimeout) {
                setInterval(customTimeout)
            }
            if (pzStream) {
                pzStream.getTracks().forEach(track => track.stop())
            }
        })

        checkCameraPermission()

        let pzStream
        const openMedia = async () => {
            pzStream = await navigator.mediaDevices.getUserMedia({video: true})
            nextTick(() => {
                try {
                    document.getElementById('customExamVideo').srcObject = pzStream
                } catch(e) {
                    console.log('err异常', e)
                }
            })
        }

        // 每2次触发一次上传
        let mySet = new Set()
        const answerUpdate = (index) => {
            if (!mySet.has(index)) {
                mySet.add(index)
                if (mySet.size % 2 == 0) {
                    // 触发操作
                    uploadPhone()
                }
            }
        }


        const uploadPhone = () => {
            // 拍照
            let c = document.getElementById('customExamCanvas')
            let context = c.getContext('2d')
            context.drawImage(document.getElementById('customExamVideo'), 0, 0, c.width, c.height)
            let u = document.getElementById('customExamCanvas').toDataURL('image/png')
            axios.post('/api/client/exam/v1/exam_capture', {
                url: u,
                createTime: dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
                eid: newId.value
            }).then(r => {
                console.log(r.data)
            })
        }

        return {
            questions, submit, title, m, s, answerUpdate, commited
        }
    }
})

</script>

<style>
/* .el-radio-group {
  display: flex;
  flex-direction: column;
  align-items: start;
} */
.option-class {
    .el-radio-group {
        display: flex !important;
        flex-direction: column !important;
        align-items: start !important;
    }
}
</style>