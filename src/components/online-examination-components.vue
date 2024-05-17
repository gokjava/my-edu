<template>
    <TitlePage></TitlePage>
    <div style=" width: 1200px; height: 1072px; background-color: #ffffff; margin: 0 auto; margin-top: 24px; display: flex;">
        <div style="width: 233px; height: 1015px; margin-top: 32px; padding-left: 32px; padding-right: 32px;">
            <div style="width: 233px; height: 175px; background-color: black;">
                
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
                        <span style="font-size: 16px;font-weight: 400;letter-spacing: 0px;line-height: 24px;color: rgba(64, 158, 255, 1);">《我国药品管理动态及新法规特别解读》</span>
                    </div>
                </div>
                <div style="width: 141px; height: 87px; border-radius: 4px; border: 1px solid rgba(220, 223, 230, 1); text-align: center;">
                    <div style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(96, 98, 102, 1); margin-top: 17px;">
                        考试倒计时
                    </div>
                    <div style="font-size: 20px;font-weight: 400;letter-spacing: 0px;line-height: 23.3px;color: rgba(0, 0, 0, 1); margin-top: 8px;">
                        30&nbsp;:&nbsp;00
                    </div>
                </div>
            </div>

            <div style=" margin-top: 16px; width: 100%; height: 1px; background: linear-gradient(90deg, rgba(220, 223, 230, 1) 0%, rgba(204, 204, 204, 0.55) 53.76%, rgba(220, 223, 230, 0) 100%);"></div>

            <div style="margin-top: 19px;">
                <div v-for="(item, index) in questions" :key="item.id" style="margin-top: 16px;">
                    <div style="font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(48, 49, 51, 1);;">
                        {{ index + 1 }}.[{{ item.type == 1 ? '单选题' : item.type == 2 ? '复选题' : '判断题' }}]{{ item.title }}
                    </div>
                    <div style="margin-top: 16px;">
                        <div v-if="item.type == 1">
                            <el-radio-group v-model="item.selectAnswer">
                                <div v-for="itemSelect in item.select" :key="itemSelect.id">
                                    <el-radio style="display: block;" :label="itemSelect.id">{{ itemSelect.select }}.{{ itemSelect.value }}</el-radio>
                                </div>
                            </el-radio-group>
                        </div>
                        <div v-else-if="item.type == 2">
                        <el-checkbox-group v-model="item.selectAnswer">
                            <div v-for="itemSelect in item.select" :key="itemSelect.id">
                                <el-checkbox :label="itemSelect.id">{{ itemSelect.select }}.{{ itemSelect.value }}</el-checkbox>
                            </div>
                        </el-checkbox-group>
                        </div>
                        <div v-else>
                            <el-radio-group v-model="item.selectAnswer">
                                <el-radio :value="true">√</el-radio>
                                <el-radio :value="false">×</el-radio>
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
import { defineComponent, reactive, getCurrentInstance } from 'vue'
import TitlePage from '@/components/common/title-components'
import { ElMessageBox } from 'element-plus';

export default defineComponent({
    name: "onlineExamination",
    components: {
        TitlePage
    },
    setup() {
        const questions = reactive([
            {
                id: 1,
                type: 1,
                title: '国家医疗保障基本制度中，用于帮助困难群众获得基本医疗服务并减轻其医疗费用负担的制度安排是（）。',
                select: [
                    {
                        id: 1,
                        select: 'A',
                        value: '基本医疗保险'
                    },
                    {
                        id: 2,
                        select: 'B',
                        value: '基本医疗保险'
                    },
                    {
                        id: 3,
                        select: 'C',
                        value: '基本医疗保险'
                    },
                    {
                        id: 4,
                        select: 'D',
                        value: '基本医疗保险'
                    }
                ],
                selectAnswer: null
            },{
                id: 2,
                type: 1,
                title: '国家通过加强公立医疗机构用药监管和考核，促进基本药物优先配备使用，提升基本药物使用占比，逐步实现政府办基层医疗卫生机构、二级公立医院、三级公立医院基本药物配备品种数量占比原则上分别不低于（）。。',
                select: [
                    {
                        id: 1,
                        select: 'A',
                        value: '基本医疗保险'
                    },
                    {
                        id: 2,
                        select: 'B',
                        value: '基本医疗保险'
                    },
                    {
                        id: 3,
                        select: 'C',
                        value: '基本医疗保险'
                    },
                    {
                        id: 4,
                        select: 'D',
                        value: '基本医疗保险'
                    }
                ],
                selectAnswer: null
            },{
                id: 3,
                type: 3,
                title: '国家通过加强公立医疗机构用药监管和考核，促进基本药物优先配备使用，提升基本药物使用占比，逐步实现政府办基层医疗卫生机构、二级公立医院、三级公立医院基本药物配备品种数量占比原则上分别不低于（）。',
                selectAnswer: null
            },{
                id: 4,
                type: 2,
                title: '国家医疗保障基本制度中，用于帮助困难群众获得基本医疗服务并减轻其医疗费用负担的制度安排是（）。',
                select: [
                    {
                        id: 1,
                        select: 'A',
                        value: '基本医疗保险'
                    },
                    {
                        id: 2,
                        select: 'B',
                        value: '基本医疗保险'
                    },
                    {
                        id: 3,
                        select: 'C',
                        value: '基本医疗保险'
                    },
                    {
                        id: 4,
                        select: 'D',
                        value: '基本医疗保险'
                    }
                ],
                selectAnswer: []
            }
        ])

        const { proxy } = getCurrentInstance()
        
        const submit = () => {
            ElMessageBox.confirm('提交答案?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                ElMessageBox.alert('您考了50分', '结果', {
                    confirmButtonText: '确定',
                    showClose: false,
                    callback: () => {
                        proxy.$router.push('/home?isActive=2')
                    },
                });
            }).catch(() => {
                
            });
        }

        return {
            questions, submit
        }
    }
})

</script>

<style>
.el-radio-group {
  display: flex;
  flex-direction: column;
  align-items: start;
}
</style>