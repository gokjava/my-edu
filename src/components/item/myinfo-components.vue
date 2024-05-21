<template>
    <div style="width: 100%;" class="myinfo-container">
        <el-tabs v-model="activeName" @tab-click="handleClick" justify="center">
            <el-tab-pane label="学员信息" :name="1">
                <StudentDetail :needGetUserInfo="true" ref="studentDetailRef"></StudentDetail>

                <div style="text-align: center;">
                    <el-button type="primary" style="width: 180px; height: 35px; margin-top: 10px; margin-bottom: 20px;" @click="onSubmit">保存更改</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="其它信息" :name="2">
                <div style="height: 10px; width: 1px"></div>
                <el-tabs type="card" v-model="itemActive" @tab-click="handleClick2" >
                    <el-tab-pane label="修改密码" :name="1">
                        <div style="width: 360px; margin: 0 auto; padding-top: 10px;">
                            <el-form ref="form1" label-width="100px">
                                <el-form-item label="旧密码">
                                    <el-input placeholder="请输入旧密码" v-model="oldPassword"></el-input>
                                </el-form-item>
                                <el-form-item label="新密码">
                                    <el-input placeholder="请输入新密码" v-model="newPassword"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码">
                                    <el-input placeholder="请再次输入新密码" v-model="confirmPassword"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button style="width: 180px; height: 30px;" type="primary" @click="updatePassword">保存更改</el-button>
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
                                    <el-button v-if="scope.row.status == 1" type="text" @click="openDrawer">申请开票</el-button>
                                    <el-button v-else type="text">查看详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
        </el-tabs>

        <el-drawer
            v-model="drawer"
            direction="rtl"
            destroy-on-close
            size="520px"
            :show-close="false"
            :withHeader="false"
            >

            <div style="font-size: 20px;font-weight: 400;letter-spacing: 0px;line-height: 28px;color: rgba(48, 49, 51, 1);">
                申请开票
            </div>

            <div style="font-size: 14px;font-weight: 600;letter-spacing: 0px;line-height: 22px;color: rgba(0, 0, 0, 1); margin-top: 23px;">
                订单信息
            </div>

            <div style="height: 1px; width: 100%;  background-color: rgba(220, 223, 230, 1); margin-top: 8px;"></div>

            <div style="display: flex;width: 100%; margin-top: 16px;">
                <div class="item-left">
                    年度
                </div>
                <div class="item-right" style="font-size: 14px;font-weight: 600;letter-spacing: 0px;line-height: 22px;">
                    2024
                </div>
            </div>
            <div style="display: flex;width: 100%; margin-top: 12px;">
                <div class="item-left">
                    订单编号
                </div>
                <div class="item-right" style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(0, 0, 0, 1);">
                    2024042510251420100005
                </div>
            </div>
            <div style="display: flex;width: 100%; margin-top: 12px;">
                <div class="item-left">
                    金额
                </div>
                <div class="item-right" style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(255, 0, 0, 1);">
                    ￥180
                </div>
            </div>

            <div style="font-size: 14px;font-weight: 600;letter-spacing: 0px;line-height: 22px;color: rgba(0, 0, 0, 1); margin-top: 23px;">
                开票信息
            </div>
            <div style="height: 1px; width: 100%;  background-color: rgba(220, 223, 230, 1); margin-top: 8px;"></div>

        </el-drawer>
    </div>
</template>

<script>

import { defineComponent, ref } from 'vue'
import StudentDetail from '@/components/common/student-detail-components'
import axios from '@/axios'
import { ElMessage } from 'element-plus'
import { doubleMd5Reversed } from '@/components/common/common-encry'

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

        const oldPassword = ref('')
        const newPassword = ref('')
        const confirmPassword = ref('')

        const updatePassword = async () => {
            let r = await axios.post('/api/client/student/v1/modify_password', {
                "confirmPassword": doubleMd5Reversed(confirmPassword.value),
                "newPassword":     doubleMd5Reversed(newPassword.value),
                "oldPassword":     doubleMd5Reversed(oldPassword.value)
            })
            if (r.data.code == 1) {
                ElMessage({
                    message: '修改密码成功',
                    type: 'success',
                })
                confirmPassword.value = ''
                newPassword.value = ''
                oldPassword.value = ''
            }
        }
        const drawer = ref(false)
        const openDrawer = () => {
            drawer.value = true
        }

        const studentDetailRef = ref(null)
        const onSubmit = async () => {
            let result = studentDetailRef.value.canSubmit()
            if (result != null) {
                let r = await axios.post('/api/client/student/v1/modify', result)
                if (r.data.code == 1) {
                    ElMessage.success('修改成功')
                }
            } 
        }

        return {
            activeName, handleClick, itemActive, handleClick2, testData, studentDetailRef,onSubmit,
            oldPassword, newPassword, confirmPassword, updatePassword, openDrawer, drawer
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