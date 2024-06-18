<template>
    <div style="width: 100%;" class="myinfo-container">
        <el-tabs v-model="activeName" @tab-click="handleClick" justify="center">
            <el-tab-pane label="学员信息" :name="1">
                <StudentDetail :needGetUserInfo="true" ref="studentDetailRef" :isUpdate="true"></StudentDetail>

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
                                    <el-input type="password" placeholder="请输入旧密码" v-model="oldPassword"></el-input>
                                </el-form-item>
                                <el-form-item label="新密码">
                                    <el-input type="password" placeholder="请输入新密码" v-model="newPassword"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码">
                                    <el-input type="password" placeholder="请再次输入新密码" v-model="confirmPassword"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button style="width: 180px; height: 30px;" type="primary" @click="updatePassword">保存更改</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="电子发票" :name="2">
                        <el-table :data="fpList" style="width: 100%" header-cell-class-name="customheaderRowClassName" header-row-style="customheaderRowClassName"   >
                            <el-table-column align="center" prop="id" label="序号" ></el-table-column>
                            <el-table-column align="center" prop="year" label="学年" ></el-table-column>
                            <el-table-column align="center" prop="orderSn" label="订单编号" min-width="200"></el-table-column>
                            <el-table-column align="center" prop="amount" label="金额" >
                                <template #default="scope">
                                    <div style="color: rgba(255, 0, 0, 1)">¥{{ scope.row.paidinAmount }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="amount" label="申请状态" >
                                <template #default="scope">
                                    {{ scope.row.requestStatus == 1 ? '待申请' : '已申请' }}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="amount" label="发票状态" >
                                <template #default="scope">
                                    <div>{{ scope.row.invoiceStatus == 1 ? '待开票' : '已开票' }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="status" label="状态" >
                                <template #default="scope">
                                    <el-button v-if="scope.row.requestStatus == 1" type="text" @click="openDrawer(scope.row)">申请开票</el-button>
                                    <el-button v-else type="text" @click="openDrawer(scope.row)">查看详情</el-button>
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
                    {{ selectFp.year }}
                </div>
            </div>
            <div style="display: flex;width: 100%; margin-top: 12px;">
                <div class="item-left">
                    订单编号
                </div>
                <div class="item-right" style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(0, 0, 0, 1);">
                    {{ selectFp.orderSn }}
                </div>
            </div>
            <div style="display: flex;width: 100%; margin-top: 12px;">
                <div class="item-left">
                    金额
                </div>
                <div class="item-right" style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(255, 0, 0, 1);">
                    ￥{{ selectFp.amount }}
                </div>
            </div>

            <div style="font-size: 14px;font-weight: 600;letter-spacing: 0px;line-height: 22px;color: rgba(0, 0, 0, 1); margin-top: 23px;">
                开票信息
            </div>
            <div style="height: 1px; width: 100%;  background-color: rgba(220, 223, 230, 1); margin-top: 8px;"></div>
            <div v-if="isSuccessFp">
                <div class="item-right-body">
                    <div class="item-left">
                        抬头类型
                    </div>
                    <div class="item-right-bottom" style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(255, 0, 0, 1);">
                        <el-radio v-model="addFpForm.invoiceType" :value="1" size="large">企业单位</el-radio>
                        <el-radio v-model="addFpForm.invoiceType" :value="2" size="large">个人/非企业</el-radio>
                    </div>
                </div>
                <div class="item-right-body">
                    <div class="item-left">
                        发票抬头
                    </div>
                    <div class="item-right-bottom" style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(255, 0, 0, 1);">
                        <el-input placeholder="请输入内容" v-model="addFpForm.invoiceTitle"></el-input>
                    </div>
                </div>
                <div class="item-right-body">
                    <div class="item-left">
                        税号
                    </div>
                    <div class="item-right-bottom" style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(255, 0, 0, 1);">
                        <el-input placeholder="请输入内容" v-model="addFpForm.taxNumber"></el-input>
                    </div>
                </div>
                <div class="item-right-body">
                    <div class="item-left">
                        发票内容
                    </div>
                    <div class="item-right-bottom" style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;">
                        培训费
                    </div>
                </div>
                <div class="item-right-body">
                    <div class="item-left">
                        发票金额
                    </div>
                    <div class="item-right-bottom" style="font-size: 20px;font-weight: 700;letter-spacing: 0px;line-height: 22px;color: rgba(48, 49, 51, 1);">
                        {{ selectFp.amount }}元
                    </div>
                </div>
                <div class="item-right-body" style="margin-top: 30px;">
                    <div class="item-left">
                        
                    </div>
                    <div class="item-right-bottom">
                        <el-button type="primary" @click="addFp">提交电子发票</el-button>
                    </div>
                </div>
            </div>

            <div v-else>
                <div style="display: flex;width: 100%; margin-top: 16px;">
                    <div class="item-left">
                        抬头类型
                    </div>
                    <div class="item-right-one" >
                        {{ selectFp.invoiceType == 1 ? '企业' : '非企业' }}
                    </div>
                </div>
                <div style="display: flex;width: 100%; margin-top: 16px;">
                    <div class="item-left">
                        发票抬头
                    </div>
                    <div class="item-right-one" >
                        {{ selectFp.invoiceTitle }}
                    </div>
                </div>
                <div style="display: flex;width: 100%; margin-top: 16px;">
                    <div class="item-left">
                        税号
                    </div>
                    <div class="item-right-one">
                        {{ selectFp.taxNumber }}
                    </div>
                </div>
                <div style="display: flex;width: 100%; margin-top: 16px;">
                    <div class="item-left">
                        发票内容
                    </div>
                    <div class="item-right-one" >
                        培训费
                    </div>
                </div>
                <div style="display: flex;width: 100%; margin-top: 16px;">
                    <div class="item-left">
                        提交时间
                    </div>
                    <div class="item-right-one">
                        {{ selectFp.invoiceTime }}
                    </div>
                </div>
                <div class="item-right-body">
                    <div class="item-left">
                        发票金额
                    </div>
                    <div class="item-right-bottom" style="font-size: 20px;font-weight: 700;letter-spacing: 0px;line-height: 22px;color: rgba(48, 49, 51, 1);">
                        {{ selectFp.amount }}元
                    </div>
                </div>

                <div style="font-size: 14px;font-weight: 600;letter-spacing: 0px;line-height: 22px;color: rgba(0, 0, 0, 1); margin-top: 23px;">
                    开票状态
                </div>
                <div style="height: 1px; width: 100%;  background-color: rgba(220, 223, 230, 1); margin-top: 8px;"></div>

                <div style="display: flex;width: 100%; margin-top: 16px;">
                    <div class="item-left">
                        开票状态
                    </div>
                    <div class="item-right-one">
                        {{ selectItemFp.invoiceStatus == 1 ? '待开票' : '已开票' }}
                    </div>
                </div>

                <div style="display: flex;width: 100%; margin-top: 16px;" v-if="selectItemFp.invoiceStatus == 2">
                    <div class="item-left">
                        发票下载
                    </div>
                    <div class="item-right-one">
                        <el-button type="text" @click="toDownloadPdf(selectFp.invoiceUrl)">下载</el-button>
                    </div>
                </div>
            </div>

            
           

        </el-drawer>
    </div>
</template>

<script>

import { defineComponent, ref, reactive } from 'vue'
import StudentDetail from '@/components/common/student-detail-components'
import axios from '@/axios'
import { ElMessage } from 'element-plus'
import { doubleMd5Reversed } from '@/components/common/common-encry'

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

            // 校验新密码和确认密码是否一致
            // let newPassword = doubleMd5Reversed(newPassword.value)
            // let confirmPassword = doubleMd5Reversed(confirmPassword.value)
            // if (newPassword != confirmPassword) {
            //     ElMessage({
            //         message: '确认密码和新密码不一致',
            //         type: 'waning',
            //     })
            //     return
            // }

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
        const selectFp = ref({})
        const selectItemFp = ref({})
        const openDrawer = async (id) => {
            drawer.value = true
            addFpForm.value.id = id.id
            selectItemFp.value = id
            let r = await axios.get(`/api/client/invoice/v1/info?id=${id.id}`)
            if (r.data.code == 1) {
                selectFp.value = r.data.data
                isSuccessFp.value = id.requestStatus == 1
            }
           
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

        const fpList = reactive([])
        const getFpList = () => {
            axios.get('/api/client/invoice/v1/my_invoice').then(r => {
                fpList.splice(0, fpList.length)
                fpList.push(...r.data.data.records)
            })
        }

        getFpList()

        const addFpForm = ref({
            id: 0,
            invoiceTitle: '',
            invoiceType: 0,
            taxNumber: ''
        })

        const addFp = async () => {
            let r = await axios.post('/api/client/invoice/v1/apply', {...addFpForm.value})
            if (r.data.code == 1) {
                getFpList()
                drawer.value = false
            }
        }

        const isSuccessFp = ref(false)
        const toDownloadPdf = (url) => {
            window.open(url)
        }

        return {
            activeName, handleClick, itemActive, handleClick2, studentDetailRef,onSubmit,addFp,selectFp,selectItemFp,toDownloadPdf,
            oldPassword, newPassword, confirmPassword, updatePassword, openDrawer, drawer, fpList, addFpForm, isSuccessFp
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
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 22px;
    min-width: 80px;
    color: rgba(0, 0, 0, 1);
}

.item-right-bottom {

}

.item-right-one {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 22px;
    color: rgba(96, 98, 102, 1);
}

.item-right-body {
    display: flex;width: 100%; margin-top: 12px;  align-items: center;
}

</style>