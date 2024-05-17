<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部" :name="1"></el-tab-pane>
            <el-tab-pane label="待支付" :name="2"></el-tab-pane>
            <el-tab-pane label="已完成" :name="3"></el-tab-pane>
        </el-tabs>

        <el-table :data="testData" style="width: 100%" header-cell-class-name="customheaderRowClassName" header-row-style="customheaderRowClassName" :fit="true"  >
            <el-table-column align="center" prop="id" label="序号" ></el-table-column>
            <el-table-column align="center" prop="year" label="学年" ></el-table-column>
            <el-table-column align="center" prop="orderNumber" label="订单编号" min-width="100"></el-table-column>
            <el-table-column align="center" prop="buidTime" label="下单时间"  min-width="150"></el-table-column>
            <el-table-column align="center" prop="amount" label="金额" >
                <template #default="scope">
                    <div style="color: rgba(255, 0, 0, 1)">¥{{ scope.row.amount }}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="payType" label="支付方式" ></el-table-column>
            <el-table-column align="center" prop="payTime" label="支付时间" min-width="150"></el-table-column>
            <el-table-column align="center" prop="status" label="状态" >
                <template #default="scope">
                    <div :style="{color: scope.row.status == 1 ? 'rgba(255, 0, 0, 1)' : 'rgba(67, 207, 124, 1)'}">{{ scope.row.status == 1 ? '待支付' : '成功' }}</div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

const testData = [
  {
    "id": "01",
    "year": 2024,
    "orderNumber": "2024042510251420100005",
    "buidTime": "2024-04-25 10:25:14",
    "amount": "180",
    "payType": "微信扫码",
    "payTime": "2024-04-25 10:25:16",
    "status": 1
  },
  {
    "id": "02",
    "year": 2024,
    "orderNumber": "2024042510251420100005",
    "buidTime": "2024-04-25 10:25:14",
    "amount": "180",
    "payType": "微信扫码",
    "payTime": "2024-04-25 10:25:16",
    "status": 2
  },
  {
    "id": "03",
    "year": 2024,
    "orderNumber": "2024042510251420100005",
    "buidTime": "2024-04-25 10:25:14",
    "amount": "180",
    "payType": "微信扫码",
    "payTime": "2024-04-25 10:25:16",
    "status": 2
  }
];

export default defineComponent({
    name: 'orderComponent',
    setup() {

        const activeName = ref(1)
        const handleClick = (a) => {
            activeName.value = a.props.name
        }

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