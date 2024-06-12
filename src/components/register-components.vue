<template>
    <div class="register-container">
      <div class="register-title">
        学员注册
      </div>
      <div class="register-know">
        <div class="know-item1">
          注册须知：
        </div>
        <div class="know-item2" style="margin-top: 16px;">
          1. 带“<span style="color: red">*</span>”的信息为必填
        </div>
        <div class="know-item2">
          2. 资格证号填写：2017年前通过的填写资格证书号，2017年及后通过的填写管理号
        </div>
        <div class="know-item2">
          3. 注册信息将作为培训认证的依据，请保证所填写信息的真实性。
        </div>
        <div class="know-item2">
          4. 您学习或注册的信息，本平台将严格遵守国家法律、法令并对您的个人信息进行保密，所有信息将不会提供给除国家法律机关之外的任何商业机构。
        </div>
      </div>
  
      <div style="margin-top: 14px; ">
        <StudentDetail ref="studentDetailRef"></StudentDetail>
      </div>
  
      <div class="resiter-footer-button">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button style="margin-left: 16px;" @click="toLogin">返回</el-button>
      </div>

        <el-dialog
            v-model="dialogVisible"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="730px"
            >

            <div style="width: 100%; height: 341px;">
                
                <div style="width: 100%; display: flex; justify-content: center; align-items: center; margin-top: 62px;">
                    <el-icon v-if="registerSuccess" color="rgba(103, 197, 58, 1)" size="100">
                        <circle-check-filled  />
                    </el-icon>
                    <el-icon v-else color="red" size="100">
                        <circle-close-filled />
                    </el-icon>
                </div>

                <div style="width: 100%; text-align: center; margin-top: 16px; font-size: 16px; font-weight: 400; color: rgba(19, 20, 20, 1);">
                    {{ registerSuccess ? '提交成功' : '提交失败' }}
                </div>

                <div style="width: 100%; text-align: center; margin-top: 4px; font-size: 14px; font-weight: 400; color: rgba(144, 147, 153, 1); line-height: 24px;">
                    <div v-if="registerSuccess">
                        请登录后前往“我的信息”再次核对个人资料，如有错误，
                    </div>
                    <div v-if="registerSuccess">
                        请修改后保存，以免影响继续教育。若有疑问可咨询：<span style="color: rgba(255, 87, 51, 1);">0451-82738127</span>
                    </div>
                    <div v-if="!registerSuccess">
                        {{ errorMessaage }}。如有疑问，可致电 <span style="color: rgba(255, 87, 51, 1);">010-65279180</span>
                    </div>
                </div>

                <div style="width: 100%; display: flex; justify-content: center; align-items: center; margin-top: 36px;">
                    <el-button v-if="registerSuccess" type="primary" @click="toLogin">前往登录</el-button>
                    <el-button v-else type="primary" @click="dialogVisible = false">我已知晓</el-button>
                </div>
            </div>

        </el-dialog>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, getCurrentInstance } from 'vue'
  import StudentDetail from '@/components/common/student-detail-components'
  import http from '@/axios'
  
  export default defineComponent({
    name: "registerPage",
    components: {
        StudentDetail
    },
    setup() {

      const registerSuccess = ref(true)

      const dialogVisible = ref(false)
      const errorMessaage = ref('')
      const studentDetailRef = ref(null)
      const onSubmit = async () => {
        let result = studentDetailRef.value.canSubmit()
        if (result != null) {
          let r = await http.post('/api/client/student/v1/register', result)
          registerSuccess.value = r.data.code == 1
          if (registerSuccess.value) {
            dialogVisible.value = true
          }
          // if (!registerSuccess.value) {
          //   errorMessaage.value = r.data.msg
          // }
          
        }
      }

      
      const { proxy } = getCurrentInstance();

      const toLogin = () => {
            proxy.$router.push('/login');
        }

  
      return {
        toLogin,
        dialogVisible,
        registerSuccess,
        onSubmit,
        studentDetailRef,
        errorMessaage
      }
    }
  })
  </script>

<style scoped>
body {
    background-color: rgba(236, 245, 255, 1) ;
}

.resiter-footer-button {
    display: flex;
    width: 100%;
    justify-content: center;
    padding-bottom: 20px;
    margin-top: 20px;

    button {
        width: 180px;
        height: 32px;
    }
}

.register-container {
    width: 1200px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);;
    margin-top: 51px;

    .register-title {
        margin: 0 auto;
        padding-top: 16px;
        font-size: 20px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 28px;
        color: rgba(48, 49, 51, 1);
        text-align: center;
        vertical-align: top;
    }

    .register-know {
        width: 1120px;
        height: 159px;
        margin: 0 auto;
        opacity: 1;
        background: rgba(240, 249, 235, 1);
        margin-top: 28px;


        .know-item1 {
            padding-top: 8px; 
            padding-left: 9px;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 22px;
            color: rgba(96, 98, 102, 1);
        }

        .know-item2 {
            padding-left: 9px;
            font-size: 12px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 22px;
            color: rgba(144, 147, 153, 1);
            white-space: pre-line;
        }
    }
}


</style>