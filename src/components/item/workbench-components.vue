<template>
    <div class="workbench-container">
        <div class="workbench-item1-container">
            <div v-for="(item, index) in item1Data" :key="index" class="workbench-item1">
                <div style="font-size: 12px; font-weight: 400; color: rgba(144, 147, 153, 1); margin-top: 20px;">
                    {{ item.name }}
                </div>
                <div style="font-size: 20px; font-weight: 400; color:  rgba(48, 49, 51, 1);; margin-top: 9px;">
                    {{ titles[item.prop] }}
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
                    <div v-for="item in content" class="workbench-item2-left-gg" :key="item.id" style="padding-bottom: 24px;">
                        <div class="workbench-item2-left-gg-left" @click="toAnnou(item)">
                            {{ item.title }}
                        </div>
                        <div class="workbench-item2-left-gg-right">
                            {{ item.postTime && item.postTime.replace('T', ' ') }}
                        </div>
                    </div>
                    <el-empty v-if="!content || content.length <= 0" :image-size="80" />
                </div>

                <div class="workbench-item2-left-title-c" >
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
                    <img class="workbench-item2-right-qrcode-item" src="https://assets.hljszyys.com/static/scan-qrcode.png" />
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
                        0451-82738127
                    </div>
                    <div class="workbench-item2-right2-title">
                        客服微信：
                    </div>
                    <div class="workbench-item2-right2-desc">
                        18745059653
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, getCurrentInstance, ref } from 'vue'
import axios from '@/axios'
// courseCount	已选择课程数	integer(int32)	
// grantCount	以获学时证明	integer(int32)	
// learnCourseCount	已学习课程数	integer(int32)	
// learnCourseHour	累计学习时长	number	
// signCount	继教报名次数	integer(int32)
const item1Data = [
    {
        name: '继续报名次数',
        prop: 'signCount'
    },
    {
        name: '已选择课程数',
        prop: 'courseCount'
    },{
        name: '已学习课程数',
        prop: 'learnCourseCount'
    },{
        name: '累计学习时长(学时)',
        prop: 'learnCourseHour'
    },{
        name: '已获学时证明(个)',
        prop: 'grantCount'
    }
]



export default defineComponent({

    name: "WorkbenchPage",
    components: {
    },
    setup() {
        const titles = ref({})
        axios.get('/api/client/course/v1/my_anlysis').then(r => {
            if (r.data.code == 1) {
                titles.value = r.data.data
            }
        })
        const content = reactive([])
        axios.get(`/api/client/first_page/v1/posters_list?cid=1&pageSize=3`).then(r => {
            content.push(...r.data.data.records)
        })
        const useData = reactive([
            {
                title: '学习流程',
                desc: '新学员提交注册信息后，等待审核（工作日24小时内）；登录服务平台；点击继教报名；选课，报名，缴费；点击继续教育学习，进行视频学习；考试通过，在学时查询中下载学时。',
                select: false
            },{
                title: '开票流程',
                desc: '暂无数据',
                select: false
            },{
                title: '课程观看须知',
                desc: '暂无数据',
                select: false
            }
        ])
        const { proxy } = getCurrentInstance();
        const toAnnou = (item) => {
            if (item.redirectUrl) {
                window.open(item.redirectUrl)
                return
            }
            proxy.$router.push(`/home/item?id=${item.id}`);
        }
        return {
            item1Data, useData, toAnnou, titles, content
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
