<template>
    <div class="login-container">
        <div class="left-container">
            <img class="item-img" src="@/assets/login-left.png" />
            <div class="item1"></div>
            <div class="item2"></div>
            <div class="item3"></div>
            <div class="item4"></div>
        </div>

        <div class="right-container">
            <div class="form">
                <div class="form-title">
                    黑龙江省执业药师继续教育服务平台
                </div>
                <div class="form-input">
                    <el-input style="height: 36px;" v-model="username" placeholder="请输入身份证号">
                        <template #prefix>
                            <el-icon>
                                <user />
                            </el-icon>
                        </template>
                    </el-input>
                </div>
                <div class="form-input">
                    <el-input v-model="password" :type="showPassword ? 'input' :'password'" style="height: 36px;" placeholder="请输入密码">
                        <template #prefix>
                            <el-icon>
                                <lock />
                            </el-icon>
                        </template>
                        <template #append>
                            <el-button 
                                @click="updateInputType"
                                style="border: none; background-color: transparent;">
                                <el-icon v-if="!showPassword">
                                    <View />
                                </el-icon>
                                <el-icon v-else>
                                    <remove />
                                </el-icon>
                            </el-button>
                        </template> 
                    </el-input>
                </div>

                <div class="menus">
                    <div class="menu-item" @click="toReigster">
                        学员注册
                    </div>
                    <div class="menu-item">
                        忘记密码
                    </div>
                </div>

                <div style="margin-top: 25px; width: 100%;">
                    <el-button type="primary" style="width: 100%;" @click="login">登录</el-button>
                </div>
            </div>
            <div class="desc1">
                温馨提示：
            </div>
            <div class="desc1" style="font-size: 12px; color: rgba(144, 147, 153, 1);;">
                首次登录默认密码为身份证后6位，登录后请及时修改密码
            </div>
        </div>
        
    </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance  } from 'vue'
import axios from '@/axios'
import { ElMessageBox } from 'element-plus'
import { doubleMd5Reversed } from '@/components/common/common-encry'

export default defineComponent({

    name: "loginPage",
    setup() {
        const username = ref(null)
        const password = ref(null)
        const showPassword = ref(false)
        const { proxy } = getCurrentInstance();
        const updateInputType = () => {
            showPassword.value = !showPassword.value
        }

        const toReigster = () => {
            proxy.$router.push('/register');
        }

        const login = async () => {
            // md5(md5(password).split('').reverse().join(''));

            let r = await axios.post('/api/client/student/v1/login', {
                "idcard": username.value,
                "password": doubleMd5Reversed(password.value)
            })
            if (r.data.code == 1) {
                console.log(r.data)
                // 存储localStorage
                localStorage.setItem('token', r.data.data.data.token)
                if (!r.data.data.data.user.isInitPassword) {
                    ElMessageBox.alert('请您修改密码，否则会存在安全问题；请到 我的信息-其它信息-修改密码 处修改', '提示', {
                        confirmButtonText: 'OK',
                        callback: () => {
                            proxy.$router.push('/home/workbench')
                        }
                    })
                } else {
                    proxy.$router.push('/home/workbench')
                }
            }
        }

        return {
            username, password, showPassword, updateInputType, toReigster, login
        }
    }
    
})
</script>

<style>

body {
    background-color: rgba(236, 245, 255, 1) ;
}

.menus {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 17px;

    .menu-item {
        opacity: 1;
        /** 文本1 */
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 22px;
        color:  rgba(64, 158, 255, 1);
        text-align: left;
        vertical-align: top;
        cursor: pointer; 
    }
}

.form-input {
    margin-top: 17px;
}

.desc1 {
    height: 22px;
    width: 320px;
    opacity: 1;
    /** 文本1 */
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 22px;
    color: rgba(96, 98, 102, 1);
    text-align: left;
    vertical-align: top;
    margin: 0 auto;
    margin-top: 8px;
}

.form {
    width: 320px;
    height: 319.77px;
    opacity: 1;
    margin: 0 auto;
    margin-top: 46px;

    .form-title {
        width: 320px;
        height: 80px;
        opacity: 1;
        /** 文本1 */
        font-size: 24px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 40px;
        color: rgba(48, 49, 51, 1);
        text-align: center;
        vertical-align: top;

    }
}

.login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 800px;
    width: 100%;
}

.right-container {
    width: 400px;
    height: 460px;
    opacity: 1;
    border-radius: 0px 8px, 8px, 0px;
    background: rgba(255, 255, 255, 1);

}

.left-container {
    width: 400px;
    height: 460px;
    opacity: 1;
    border-radius: 8px 0px 0px 8px;
    background: rgba(82, 149, 249, 1);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .item-img {
        width: 349.63px;
        height: 273px;
        opacity: 1;
    }

    .item1 {
        left: 324.5px;
        top: 33.68px;
        width: 45px;
        height: 45px;
        opacity: 0.12;
        transform: rotate(45deg);
        background: rgba(255, 255, 255, 1);
        position: absolute;
    }

    .item2 {
        left: 302.67px;
        top: 387.27px;
        width: 25px;
        height: 60px;
        opacity: 0.07;
        transform: rotate(-30deg);
        background: rgba(255, 255, 255, 1);
        position: absolute;
    }

    .item3 {
        left: -147px;
        top: 304px;
        width: 300px;
        height: 300px;
        opacity: 0.07;
        border-radius: 50%;
        background: rgba(255, 255, 255, 1);
        position: absolute;
    }

    .item4 {
        left: 309.74px;
        top: 3px;
        width: 42.26px;
        height: 133.44px;
        opacity: 0.09;
        position: absolute;
        border-left: 115px solid transparent;
        border-right: 96px solid transparent;
        border-bottom: 100px solid rgba(255, 255, 255, 1);
        transform: rotate(-21deg);
    }

}

</style>
