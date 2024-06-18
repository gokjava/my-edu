<template>
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
</template>

<script setup>
import  { ref, reactive } from 'vue'
import axios from '@/axios'
import { ElMessage } from "element-plus"
import { getServerUrl } from '@/components/common/constant'
import { useRouter } from 'vue-router'
const serverUrl = getServerUrl()

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
        // 返回
        ElMessage.success('添加成功')
        setTimeout(() => {
            router.go(-1)
        }, 1000);
    }

}

const router = useRouter()

const onSuccess = (response) => {
    fileListData.push(response.data)
}

const onRemove = (file, fileList) => {
    console.log(file)
    fileListData.splice(0, fileListData.length)
    fileListData.push(...fileList.map(item => item.response.data))
}


const tokenRef = ref(localStorage.getItem('token'))

</script>

<style scoped>
</style>