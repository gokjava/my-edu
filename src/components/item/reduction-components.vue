<template>
    <div v-if="random == 1">
        <div class="tabs-with-button">
            <el-tabs style="width: 85%;" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" :name="1"></el-tab-pane>
                <el-tab-pane label="待审核" :name="2"></el-tab-pane>
                <el-tab-pane label="审核通过" :name="3"></el-tab-pane>
                <el-tab-pane label="审核驳回" :name="4"></el-tab-pane>
            </el-tabs>
            <el-button type="primary" style="width: 88px; height: 32px;" @click="random = 2">新增</el-button>
        </div>

        <div>
            <el-table :data="testData" style="width: 100%" header-cell-class-name="customheaderRowClassName" header-row-style="customheaderRowClassName" :fit="true"  >
                <el-table-column align="center" prop="id" label="序号" ></el-table-column>
                <el-table-column align="center" prop="year" label="年度" ></el-table-column>
                <el-table-column align="center" prop="exemptionType" label="减免类型" ></el-table-column>
                <el-table-column  prop="reason" label="申请理由" min-width="250"></el-table-column>
                <el-table-column align="center" prop="applicationTime" label="申请时间"  min-width="200"></el-table-column>
                <el-table-column align="center" prop="status" label="状态" ></el-table-column>
                <el-table-column align="center" label="-" >
                    <template #default="scope">
                        <el-button  type="text" @click="queryDetail(scope.row.id)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-drawer
            v-model="drawer"
            direction="rtl"
            destroy-on-close
            size="520px"
            :show-close="false"
            :withHeader="false"
            >
                
            <div style="font-size: 20px;font-weight: 400;letter-spacing: 0px;line-height: 28px;color: rgba(48, 49, 51, 1);">
                查看详情
            </div>

            <div style="font-size: 14px;font-weight: 600;letter-spacing: 0px;line-height: 22px;color: rgba(0, 0, 0, 1); margin-top: 23px;">
                申请信息
            </div>

            <div style="height: 1px; width: 100%;  background-color: rgba(220, 223, 230, 1); margin-top: 8px;"></div>

            <div style="display: flex;width: 100%; margin-top: 16px;">
                <div class="item-left">
                    申请年度
                </div>
                <div class="item-right">
                    2024
                </div>
            </div>
            <div style="display: flex;width: 100%; margin-top: 12px;">
                <div class="item-left">
                    减免类型
                </div>
                <div class="item-right">
                    专业
                </div>
            </div>
            <div style="display: flex;width: 100%; margin-top: 12px;">
                <div class="item-left">
                    申请理由
                </div>
                <div class="item-right">
                    参加了执业药师继续教育课程录制，共4课时
                </div>
            </div>
            <div style="display: flex;width: 100%; margin-top: 12px;">
                <div class="item-left">
                    作证材料
                </div>
                <div class="item-right" style="display: flex; gap: 16px; flex-wrap: wrap;">
                    <img src="https://img.js.design/assets/smartFill/img358164da74c4b8.jpeg" />
                    <img src="https://img.js.design/assets/smartFill/img358164da74c4b8.jpeg" />
                    <img src="https://img.js.design/assets/smartFill/img358164da74c4b8.jpeg" />
                    <img src="https://img.js.design/assets/smartFill/img358164da74c4b8.jpeg" />
                    <img src="https://img.js.design/assets/smartFill/img358164da74c4b8.jpeg" />
                    <img src="https://img.js.design/assets/smartFill/img358164da74c4b8.jpeg" />
                </div>
            </div>

            <div style="font-size: 14px;font-weight: 600;letter-spacing: 0px;line-height: 22px;color: rgba(0, 0, 0, 1); margin-top: 24px;">
                审核结果
            </div>

            <div style="height: 1px; width: 100%;  background-color: rgba(220, 223, 230, 1); margin-top: 8px;"></div>

            <div style="display: flex;width: 100%; margin-top: 16px;">
                <div class="item-left">
                    审核状态
                </div>
                <div class="item-right" style="color: rgba(82, 155, 46, 1);;">
                    通过
                </div>
            </div>

            <div style="display: flex;width: 100%; margin-top: 12px;">
                <div class="item-left">
                    审核状态
                </div>
                <div class="item-right" >
                    <span style="color: rgba(255, 87, 51, 1); font-size: 14px; font-weight: 600;">&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;</span>学时
                </div>
            </div>

        </el-drawer>
    </div>

    <div v-if="random == 2">
        <el-form ref="form" label-width="100px">
            <el-form-item label="申请年度:">
                <el-select v-model="form.region" placeholder="请选择" style="width: 115px;">
                    <el-option label="2023年度" value="shanghai"></el-option>
                    <el-option label="2024年度" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="减免类型:">
                <el-radio label="专业"></el-radio>
                <el-radio label="公需"></el-radio>
            </el-form-item>
            <el-form-item label="申请理由:">
                <el-input type="textarea" v-model="form.desc" :rows="8"></el-input>
            </el-form-item>
            <el-form-item label="辅佐材料:">
                <el-upload action="#" list-type="picture-card" :auto-upload="false">
                    <el-icon>
                        <plus />
                    </el-icon>
                        
                    <template #tip>
                        <div style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(255, 87, 51, 1); margin-top: 12px;">可上传图片、文档、PDF类型文件，最多可上传10份材料</div>
                    </template>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" >提交申请</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

const testData = [
  {
    "id": "01",
    "year": 2024,
    "exemptionType": "专业",
    "reason": "参加会议，申请减免",
    "applicationTime": "2024-05-10 14:20:14",
    "status": "待审核",
    "details": "查看详情"
  },
  {
    "id": "02",
    "year": 2024,
    "exemptionType": "公需",
    "reason": "学习通课程学习，积分达到2000分",
    "applicationTime": "2024-05-10 14:20:14",
    "status": "审核通过",
    "details": "查看详情"
  },
  {
    "id": "03",
    "year": 2024,
    "exemptionType": "专业",
    "reason": "主题报告",
    "applicationTime": "2024-05-10 14:20:14",
    "status": "审核驳回",
    "details": "查看详情"
  }
]

export default defineComponent({

    name: "ReductionComponent",
    components: {
    },
    setup() {

        const activeName =  ref(1)

        const handleClick = (a) => {
            activeName.value = a.props.name
        }

        const queryDetail = (id) => {
            console.log(id)
            drawer.value = true
        }

        const drawer = ref(false)

        const random = ref(1)

        const form = ref({})

        return {
            activeName,handleClick, testData, queryDetail, drawer, random, form
        }
    }
    
})
</script>

<style>               
.tabs-with-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
/* ::v-deep .el-table thead {
    --el-table-bg-color: rgba(240, 242, 245, 1);
    --el-table-text-color: rgba(0, 0, 0, 1);
} */
/* 自定义表头样式 */
.customheaderRowClassName {
    background-color: rgba(240, 242, 245, 1) !important; 
    color: rgba(0, 0, 0, 1) !important; /* 设置表头文本颜色 */
    font-size: 14px !important;
    font-weight: 400 !important;
    letter-spacing: 0px !important;
    line-height: 48px !important;
    height: 69px !important;
}

.item-right {
    img {
        width: 114px;
        height: 86px;
    }
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0px;
    flex: 1;
    color: rgba(0, 0, 0, 1);
    line-height: 22px;
}

.item-left {
    padding-right: 24px;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 22px;
    color: rgba(0, 0, 0, 1);
}

</style>
