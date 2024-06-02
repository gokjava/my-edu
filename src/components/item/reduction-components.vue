<template>
    <div v-if="random == 1">
        <div class="tabs-with-button">
            <el-tabs style="width: 85%;" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" :name="0"></el-tab-pane>
                <el-tab-pane label="待审核" :name="1"></el-tab-pane>
                <el-tab-pane label="审核通过" :name="2"></el-tab-pane>
                <el-tab-pane label="审核驳回" :name="3"></el-tab-pane>
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
                        <el-button  type="text" @click="queryDetail(scope.row)">查看详情</el-button>
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
                    {{ selectItem.year }}
                </div>
            </div>
            <div style="display: flex;width: 100%; margin-top: 12px;">
                <div class="item-left">
                    减免类型
                </div>
                <div class="item-right">
                    {{ selectItem.type == 1 ? '专业' : '公需' }}
                </div>
            </div>
            <div style="display: flex;width: 100%; margin-top: 12px;">
                <div class="item-left">
                    申请理由
                </div>
                <div class="item-right">
                    {{ selectItem.reason }}
                </div>
            </div>
            <div style="display: flex;width: 100%; margin-top: 12px;">
                <div class="item-left">
                    作证材料
                </div>
                <div class="item-right" >
                    <div v-for="(item, index) in selectItem.materials" :key="index">
                        <el-button type="text" style="font-size: 15px" @click="openMaterial(item)">材料{{ index+1 }}</el-button>
                    </div>
                    <!-- <img v-for="(item, index) in selectItem.materials" :key="index" :src="item" style="width: 114px; height: 86px" /> -->
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
                <div v-if="selectItem.status == 1" class="item-right" style="color: rgba(0,0,0,1);">
                    待审核
                </div>
                <div v-if="selectItem.status == 2" class="item-right" style="color: rgba(82, 155, 46, 1);">
                    审核通过
                </div>
                <div v-if="selectItem.status == 3" class="item-right" style="color: rgba(255, 87, 51,1);">
                    审核驳回
                </div>
            </div>

            <div style="display: flex;width: 100%; margin-top: 12px;" v-if="selectItem.status == 2 ">
                <div class="item-left">
                    减免学时
                </div>
                <div class="item-right">
                    <span  style="color: rgba(255, 87, 51, 1); font-size: 14px; font-weight: 600;">&nbsp;&nbsp;&nbsp;{{ selectItem.reduceHours }}&nbsp;&nbsp;&nbsp;</span>学时
                </div>
            </div>

            <div style="display: flex;width: 100%; margin-top: 12px;" v-if="selectItem.status == 3">
                <div class="item-left">
                    驳回理由
                </div>
                <div class="item-right" v-if="selectItem.status == 3">
                    {{ selectItem.denyReason }}
                </div>
            </div>

        </el-drawer>
    </div>

    <div v-if="random == 2">
        <el-form ref="form" label-width="100px">
            <el-form-item label="申请年度:" required>
                <el-select v-model="formId" placeholder="请选择" style="width: 115px;">
                    <el-option v-for="item in years" :key="item.id" :label="item.year + '年度' " :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="减免类型:" required>
                <el-radio label="专业" v-model="formType" :value="1"></el-radio>
                <el-radio label="公需" v-model="formType" :value="2"></el-radio>
            </el-form-item>
            <el-form-item label="申请理由:">
                <el-input type="textarea" v-model="formReason" :rows="8"></el-input>
            </el-form-item>
            <el-form-item label="辅佐材料:">
                <el-upload 
                    :action="serverUrl + '/api/admin/file/v1/upload?type=10'" 
                    list-type="text" 
                    name="file"
                    :show-file-list="true"
                    :limit="10"
                    :multiple="true"
                    :headers=" {Authorization: tokenRef}"
                    :on-success="onSuccess"
                    :on-remove="onRemove"
                >

                    <div style="display:flex; width: 148px; height: 148px; border: 1px solid rgba(220, 223,230,1); border-radius:4px; align-items: center; justify-content: center;">
                        <el-icon size="20">
                            <plus />
                        </el-icon>
                    </div>
                    
                        
                    <template #tip>
                        <div style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(255, 87, 51, 1); margin-top: 12px;">可上传图片、文档、PDF类型文件，最多可上传10份材料</div>
                    </template>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitApplication">提交申请</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import axios from '@/axios'
import { ElMessage } from 'element-plus'
import { getServerUrl } from '@/components/common/constant'
const serverUrl = getServerUrl()


export default defineComponent({

    name: "ReductionComponent",
    components: {
    },
    setup() {

        const activeName =  ref(0)

        const handleClick = (a) => {
            activeName.value = a.props.name
            getList()
        }

        const selectItem = ref({})
        const queryDetail = async (item) => {
            let r = await axios.get(`/api/client/course_reduce/v1/info?id=${item.id}`)
            if (r.data.code == 1) {
                drawer.value = true
                selectItem.value = r.data.data.data
            }
        }

        const drawer = ref(false)

        const random = ref(1)

        const formId = ref(null)
        const formType = ref(null)
        const formReason = ref('')

        const years = reactive([])
        axios.get('/api/client/course/v1/my_course').then(r => {
            if (r.data.code == 1) {
                years.push(...r.data.data)
            }
        })

        const getHeaders = () => {
            console.log('-------------', localStorage.getItem('token'))
            return {
                Authorization: localStorage.getItem('token')
            }
        }

        const fileListData = reactive([])

        const submitApplication = async () => {
            if (!formId.value) {
                ElMessage.error('请选择申请年度')
                return
            }
            if (!formType.value) {
                ElMessage.error('请选择减免类型')
                return
            }
            if (!fileListData || fileListData.length == 0) {
                ElMessage.error('请上传辅佐材料')
                return
            }
            let r = await axios.post('/api/client/course_reduce/v1/submit', {
                signId: formId.value,
                type: formType.value,
                reason: formReason.value,
                materials: fileListData.map(item => item.fullurl)
            })
            if (r.data.code == 1) {
                random.value = 1
                getList()
            }
        }


        const testData = reactive([])

        const getList = async () => {
            let r = await axios.get(`/api/client/course_reduce/v1/query?${activeName.value == 0 ? '' : 'status=' + activeName.value}`)
            testData.splice(0, testData.length)
            testData.push(...r.data.data.records.map(item => {
                return {
                    ...item,
                    "id": item.id,
                    "year": item.year,
                    "exemptionType": item.type == 1 ? '专业' : '公需',
                    "reason": item.reason,
                    "applicationTime": item.createTime,
                    "status": item.status == 1 ? '待审核' : item.status == 2 ? '审核通过' : '审核不通过',
                    "details": "查看详情"
                }
            }))
        }

        getList()

        const onSuccess = (response) => {
            fileListData.push(response.data)
        }

        const onRemove = (file, fileList) => {
            console.log(file)
            fileListData.splice(0, fileListData.length)
            fileListData.push(...fileList.map(item => item.response.data))
        }

        const openMaterial = (url) => {
            window.open(url)
        }

        const tokenRef = ref(localStorage.getItem('token'))

        return {
            activeName,handleClick, testData, queryDetail, drawer, random, formId, formType, formReason, years, serverUrl,
            getHeaders, submitApplication, onSuccess, onRemove, selectItem, openMaterial, tokenRef
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
