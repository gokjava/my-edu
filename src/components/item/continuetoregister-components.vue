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

            <div v-show="aciveIndex == 1">
                <div  style="margin-top: 78px; display: flex; justify-content: center;">
                    <div @click="selectYearId = item.id" class="continue-radio" v-for="(item, index) in yearData" :key="item.id" :style="{ marginLeft: index > 0 ? '37px' : '0px',  border : selectYearId == item.id ? '1px solid rgba(64, 158, 255, 1)' : '1px solid rgba(220, 223, 230, 1)'} " >
                        <div class="continue-radio-quan" :style="{border : selectYearId == item.id ? '1px solid rgba(64, 158, 255, 1)' : '1px solid rgba(220, 223, 230, 1)'}">

                        </div>
                        <div style="margin-top: 31px; font-size: 20px; font-weight: 400; line-height: 28px;" :class="{ 'isActiveRadioClass':  selectYearId == item.id}">
                            {{ item.title }}
                        </div>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 80px;">
                    <el-button style="width: 200px; height: 40px;" type="primary" @click="aciveIndex = 2">下一步</el-button>
                </div>
            </div>

            <div v-show="aciveIndex == 2">
                
                 <div style="margin-top: 25px; min-height: 390px;">

                    <div class="continue-course-item" v-for="(item, index) in courseList" :key="item.id" :style="{ marginTop: index > 0 ? '16px' : '0px' }">
                        <div style="display: flex; justify-content: space-between;">
                            <div style="display: flex;">
                                <img :src="imageSrc" style="width: 80px; height: 60px;" />
                                <div style="margin-left: 16px;">
                                    <div style="font-size: 16px; font-weight: 400; color: rgba(48, 49, 51, 1); line-height: 24px;">
                                        {{ item.title }}
                                    </div>
                                    <div style="font-size: 14px; font-weight: 400; color: rgba(48, 49, 51, 1); line-height: 22px; margin-top: 14px;">
                                        {{ item.desc }}
                                    </div>
                                </div>
                            </div>
                            
                            <div style="padding-top: 30px;">
                                <el-button :disabled="true" type="primary" style="width: 80px; height: 30px; ">试看</el-button>
                            </div>
                        </div>
                    </div>

                 </div>

                 <div style="text-align: center; padding-bottom: 30px;">
                    <el-button style="width: 200px; height: 40px; margin-top: 32px;" @click="aciveIndex = 3" type="primary">下一步</el-button>
                 </div>

            </div>

            <div v-show="aciveIndex == 3" style="width: 100%; text-align: center;">
                <div>
                    <img src="@/assets/test-qrcode.png" style="width: 247px; height: 244px; margin-top: 71px;"/>
                    <div style="font-size: 12px; font-weight: 400; line-height: 20px; color: rgba(255, 0, 0, 1); margin-top: 8px;">
                        请于24小时内完成支付，超时无法支付请重新发起报名
                    </div>
                </div>
                <div style="margin-top: 76px;">
                    <el-button style="width: 200px; height: 40px; " @click="aciveIndex = 4" type="primary" >下一步</el-button>
                 </div>
            </div>

            <div v-show="aciveIndex == 4" style="width: 100%; text-align: center;">
                <div>
                    <img src="@/assets/continue-success.png" style="width: 63px; height: 63px; margin-top: 134px;"/>
                    <div style="font-size: 16px; font-weight: 400; line-height: 25px; color: rgba(19, 20, 20, 1); margin-top: 21px;">
                        继续教育报名成功
                    </div>
                    <div style="font-size: 14px; font-weight: 400; line-height: 24px; color:rgba(144, 147, 153, 1); margin-top: 4px;">
                        请务必在2024/07/01-2025/01/01学习周期内完成学习及考核
                    </div>
                </div>
                <div style="margin-top: 40px;">
                    <el-button style="width: 200px; height: 40px;"  type="primary" >开始学习</el-button>
                 </div>
            </div>
            
            
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import imageSrc from '@/assets/continue-course.png';

const yearData = [
    {
        id:1,
        title: '2024学年'
    },{
        id:2,
        title: '2023学年'
    }
]

const courseList = [
    {
        id: 1,
        img: '@/assets/continue-course.png',
        title: '医疗质量药学指标的管理',
        desc: '学时：2.0'
    }, {
        id: 2,
        img: '@/assets/continue-course.png',
        title: '医疗质量药学指标的管理',
        desc: '学时：2.0'
    }, {
        id: 3,
        img: '@/assets/continue-course.png',
        title: '医疗质量药学指标的管理',
        desc: '学时：2.0'
    }, {
        id: 4,
        img: '@/assets/continue-course.png',
        title: '医疗质量药学指标的管理',
        desc: '学时：2.0'
    }
]

export default defineComponent({

    name: "ContinueRetisger",
    components: {
    },
    setup() {

        // 三种情况随机产生
        let random = ref(4) // Math.floor(Math.random() * 2)
        const continueRegister = () => {
            random.value = 4
        }

        const selectYearId = ref(yearData[0].id)
        const aciveIndex = ref(1)

        return {
            random, continueRegister, yearData, selectYearId, aciveIndex, courseList, imageSrc
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
