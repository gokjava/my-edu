<template>
    <div style="width: 100%;" class="myinfo-container">
        <el-tabs v-model="activeName" @tab-click="handleClick" justify="center">
            <el-tab-pane label="学员信息" :name="1">
                <StudentDetail></StudentDetail>

                <div style="text-align: center;">
                    <el-button type="primary" style="width: 180px; height: 35px; margin-top: 10px; margin-bottom: 20px;">保存更改</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="其它信息" :name="2">
                <div style="height: 10px; width: 1px"></div>
                <el-tabs type="card" v-model="itemActive" @tab-click="handleClick2" >
                    <el-tab-pane label="修改密码" :name="1">
                        <div style="width: 360px; margin: 0 auto; padding-top: 10px;">
                            <el-form ref="form1" label-width="100px">
                                <el-form-item label="旧密码">
                                    <el-input placeholder="请输入旧密码"></el-input>
                                </el-form-item>
                                <el-form-item label="新密码">
                                    <el-input placeholder="请输入新密码"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码">
                                    <el-input placeholder="请再次输入新密码"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button style="width: 180px; height: 30px;" type="primary">保存更改</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="电子发票" :name="2">
                        <el-table :data="testData" style="width: 100%" header-cell-class-name="customheaderRowClassName" header-row-style="customheaderRowClassName"   >
                            <el-table-column align="center" prop="id" label="序号" ></el-table-column>
                            <el-table-column align="center" prop="year" label="学年" ></el-table-column>
                            <el-table-column align="center" prop="orderNumber" label="订单编号" min-width="200"></el-table-column>
                            <el-table-column align="center" prop="amount" label="金额" >
                                <template #default="scope">
                                    <div style="color: rgba(255, 0, 0, 1)">¥{{ scope.row.amount }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="amount" label="申请状态" >
                                <template #default="scope">
                                    {{ scope.applyStatus == 1 ? '带申请' : '已申请' }}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="amount" label="发票状态" >
                                <template #default="scope">
                                    <div>{{ scope.applyStatus == 2 ? '待开票' : scope.applyStatus == 3?'已开票' : '' }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="status" label="状态" >
                                <template #default="scope">
                                    <el-button v-if="scope.status == 1" type="text">申请开票</el-button>
                                    <el-button v-else type="text">查看详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

import { defineComponent, ref } from 'vue'
import StudentDetail from '@/components/common/student-detail-components'
const testData = [
  {
    "id": "01",
    "year": 2024,
    "orderNumber": "2024042510251420100005",
    "buidTime": "2024-04-25 10:25:14",
    "amount": "180",
    "payType": "微信扫码",
    "payTime": "2024-04-25 10:25:16",
    "status": 1,
    'applyStatus': 1,
  },
  {
    "id": "02",
    "year": 2024,
    "orderNumber": "2024042510251420100005",
    "buidTime": "2024-04-25 10:25:14",
    "amount": "180",
    "payType": "微信扫码",
    "payTime": "2024-04-25 10:25:16",
    "status": 2,
    'applyStatus': 2,
  },
  {
    "id": "03",
    "year": 2024,
    "orderNumber": "2024042510251420100005",
    "buidTime": "2024-04-25 10:25:14",
    "amount": "180",
    "payType": "微信扫码",
    "payTime": "2024-04-25 10:25:16",
    "status": 2,
    'applyStatus': 3,
  }
];

export default defineComponent({
    name: 'myinfoComponent',
    components:{
        StudentDetail
    },
    setup() {

        const activeName = ref(1)
        const handleClick = (a) => {
            activeName.value = a.props.name
        }

        const itemActive = ref(1)
        const handleClick2 = (a) => {
            itemActive.value = a.props.name
        }

        

        return {
            activeName, handleClick, itemActive, handleClick2, testData
        }
    }
})

</script>

<style>
.myinfo-container {
    .el-tabs__nav-scroll {
        display: flex;
        justify-content: center;
    }
}

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



</style>