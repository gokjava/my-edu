<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部" :name="0"></el-tab-pane>
            <el-tab-pane label="待支付" :name="2"></el-tab-pane>
            <el-tab-pane label="已完成" :name="3"></el-tab-pane>
        </el-tabs>

        <el-table :data="testData" style="width: 100%" header-cell-class-name="customheaderRowClassName" header-row-style="customheaderRowClassName"  >
            <el-table-column align="center" prop="id" label="序号" width="70"></el-table-column>
            <el-table-column align="center" prop="year" label="学年" width="80" ></el-table-column>
            <el-table-column align="center" prop="orderNumber" label="订单编号" min-width="220"></el-table-column>
            <el-table-column align="center" prop="buidTime" label="下单时间"  min-width="150"></el-table-column>
            <el-table-column align="center" prop="amount" label="金额" width="80" >
                <template #default="scope">
                    <div style="color: rgba(255, 0, 0, 1)">¥{{ scope.row.amount }}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="payType" label="支付方式" width="80" ></el-table-column>
            <el-table-column align="center" prop="payTime" label="支付时间" min-width="150"></el-table-column>
            <el-table-column align="center" prop="status" label="状态" width="80" ></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import axios from '@/axios'



export default defineComponent({
    name: 'orderComponent',
    setup() {

        const activeName = ref(0)
        const handleClick = (a) => {
            activeName.value = a.props.name
            getList()
        }

        const testData = reactive([
            
        ]);
        const getList = async () => {
            let r = await axios.get(`/api/client/order/v1/my_order?status=${activeName.value}`)
            if (r.data.code == 1) {
                testData.splice(0, testData.length)
                testData.push(...r.data.data.records.map(item => {
                    return {
                        ...item,
                        "id": item.id,
                        "year": item.year,
                        "orderNumber": item.orderSn,
                        "buidTime": item.createTime,
                        "amount": item.paidinAmount,
                        "payType": item.paymentMethod == 1 ? '微信' : item.paymentMethod == 2 ? '支付宝' : '线下',
                        "payTime": item.payTime,
                        "status": item.statusName
                    }
                }))
            }
        }
        getList()

        return {
            activeName, testData, handleClick
        }
    }
})

</script>

<style>
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