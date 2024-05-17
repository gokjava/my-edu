<template>
    <div class="workbench-container">
        <div class="workbench-item1-container">
            <div v-for="(item, index) in item1Data" :key="index" class="workbench-item1">
                <div style="font-size: 12px; font-weight: 400; color: rgba(144, 147, 153, 1); margin-top: 20px;">
                    {{ item.name }}
                </div>
                <div style="font-size: 20px; font-weight: 400; color:  rgba(48, 49, 51, 1);; margin-top: 9px;">
                    {{ 0 }}
                </div>
            </div>
        </div>
        <div style="width: 100%; display: flex; margin-top: 24px;">
            <div class="workbench-item2-left">
                
                <div class="workbench-item2-left-title-c">
                    <div class="workbench-item2-left-title-b">
                        系统公告
                    </div>
                </div>

                <div style="width: 98%">
                    <div class="workbench-item2-left-gg">
                        <div class="workbench-item2-left-gg-left" @click="toAnnou">
                            2024年度黑龙江省执业药师继续教育报名通知
                        </div>
                        <div class="workbench-item2-left-gg-right">
                            2024-05-01 10:10:10
                        </div>
                    </div>
                    <div class="workbench-item2-left-gg">
                        <div class="workbench-item2-left-gg-left" @click="toAnnou">
                            2024年度黑龙江省执业药师继续教育报名通知
                        </div>
                        <div class="workbench-item2-left-gg-right">
                            2024-05-01 10:10:10
                        </div>
                    </div>
                    <div class="workbench-item2-left-gg">
                        <div class="workbench-item2-left-gg-left" @click="toAnnou">
                            2024年度黑龙江省执业药师继续教育报名通知
                        </div>
                        <div class="workbench-item2-left-gg-right">
                            2024-05-01 10:10:10
                        </div>
                    </div>
                </div>

                <div class="workbench-item2-left-title-c" style="margin-top: 24px;">
                    <div class="workbench-item2-left-title-b">
                        使用指南
                    </div>
                </div>
                <div style="height: 8px; width: 98%;"></div>
                <div class="workbench-item2-left-last" v-for="(item, index) in useData" :key="index">
                    <div style="display: flex;">
                        <div style="width: 33px;     text-align: center;">
                            <el-icon v-if="!item.select" @click="item.select = true">
                                <caret-right />
                            </el-icon>
                            <el-icon v-else  @click="item.select = false">
                                <caret-bottom />
                            </el-icon>
                        </div>
                        <div style="padding-right: 33px; color: rgba(96, 98, 102, 1); font-size: 14px; font-weight: 400;">
                            {{ item.title }}
                        </div>
                    </div>
                    <div v-show="item.select" style="padding-left: 33px; padding-right: 33px;  margin-top: 16px; font-size: 12px; font-weight: 400; color: rgba(144, 147, 153, 1); ">
                        {{ item.desc }}
                    </div>
                </div>

            </div>
            <div class="workbench-item2-right">
                <div class="workbench-item2-right-qrcode">
                    <img class="workbench-item2-right-qrcode-item" src="https://img.js.design/assets/img/662df7931f0c469d4e99060d.png#993efa9cd662c2c7be753cbb44327216" />
                    <div style="font-size: 12px; font-weight: 400; color: rgba(144, 147, 153, 1); margin-top: 8px;">
                        扫一扫即可移动端访问
                    </div>
                </div>

                <div class="workbench-item2-right2">
                    <div class="workbench-item2-right2-title">
                        施教机构：
                    </div>
                    <div class="workbench-item2-right2-desc">
                        黑龙江省医药零售行业协会
                    </div>
                    <div class="workbench-item2-right2-title">
                        客服电话：
                    </div>
                    <div class="workbench-item2-right2-desc">
                        010-65279180
                    </div>
                    <div class="workbench-item2-right2-title">
                        客服微信：
                    </div>
                    <div class="workbench-item2-right2-desc">
                        18810123476
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, getCurrentInstance } from 'vue'

const item1Data = [
    {
        name: '继续报名次数',
        prop: 'aa'
    },
    {
        name: '已选择课程数',
        prop: 'aa'
    },{
        name: '已学习课程数',
        prop: 'aa'
    },{
        name: '累计学习时长(学时)',
        prop: 'aa'
    },{
        name: '已获学时证明(个)',
        prop: 'aa'
    }
]



export default defineComponent({

    name: "WorkbenchPage",
    components: {
    },
    setup() {
        const useData = reactive([
            {
                title: '学习流程',
                desc: '新学员提交注册信息后，等待审核（工作日24小时内）；登录服务平台；点击继教报名；选课，报名，缴费；点击继续教育学习，进行视频学习；考试通过，在学时查询中下载学时。',
                select: false
            },{
                title: '学习流程',
                desc: '新学员提交注册信息后，等待审核（工作日24小时内）；登录服务平台；点击继教报名；选课，报名，缴费；点击继续教育学习，进行视频学习；考试通过，在学时查询中下载学时。',
                select: false
            },{
                title: '学习流程',
                desc: '新学员提交注册信息后，等待审核（工作日24小时内）；登录服务平台；点击继教报名；选课，报名，缴费；点击继续教育学习，进行视频学习；考试通过，在学时查询中下载学时。',
                select: false
            }
        ])
        const { proxy } = getCurrentInstance();
        const toAnnou = () => {
            proxy.$router.push('/announcement');
        }
        return {
            item1Data, useData, toAnnou
        }
    }
    
})
</script>

<style>
.workbench-item1 {
    width: 176px;
    height: 90px;
    opacity: 1;
    border-radius: 4px;
    background: rgba(236, 245, 255, 1);
    text-align: center;
}
.workbench-item1-container {
    display: flex;
    justify-content: space-between;
}
.workbench-item2-right {
    width: 176px;
}
.workbench-item2-left {
    width: calc(100% - 176px);
}
.workbench-item2-right-qrcode {
    height: 178px;
    opacity: 1;
    border-radius: 4px;
    border: 1px solid rgba(220, 223, 230, 1);
    text-align: center;
}
.workbench-item2-right-qrcode-item {
    width: 120px;
    height: 120px;
    opacity: 1;
    margin-top: 15px;
}

.workbench-item2-right2 {
    width: 174px;
    height: 208px;
    opacity: 1;
    border-radius: 4px;
    border: 1px solid rgba(220, 223, 230, 1);
    margin-top: 12px;
    padding-left: 16px;
}

.workbench-item2-right2-title {
    margin-top: 16px;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 20px;
    color: rgba(96, 98, 102, 1);
}

.workbench-item2-right2-desc {
    margin-top: 8px;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 20px;
    color: rgba(144, 147, 153, 1);
}

.workbench-item2-left-title-c {
    width: 98%;
    border-bottom: 1px solid rgba(220, 223, 230, 1);
}
.workbench-item2-left-title-b {
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 24px;
    color: rgba(64, 158, 255, 1);
    box-shadow: inset 0 -1px 0 0 rgba(64, 158, 255, 1);
    width: 100px;
    text-align: center;
    padding-bottom: 4px;
}
.workbench-item2-left-gg{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
}
.workbench-item2-left-gg-left {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 22px;
    color: rgba(96, 98, 102, 1);
    cursor: pointer;
}
.workbench-item2-left-gg-right {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 20px;
    color: rgba(96, 98, 102, 1);
}

.workbench-item2-left-last {
    margin-top: 8px; 
    width: 98%;
    padding-top: 16px;
    background-color: rgba(245, 247, 250, 1);
    border-radius: 4px;
    padding-bottom: 16px;
}                  

</style>
