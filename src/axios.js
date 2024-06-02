import axios from 'axios';
import { ElMessage } from 'element-plus'
import { getServerUrl } from '@/components/common/constant'
import router from '@/router/index'

// 创建 Axios 实例
const instance = axios.create({
  baseURL: getServerUrl(), // 替换为你的 API 基础 URL
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 例如，在 headers 中添加 token
    const token = localStorage.getItem('token');
    if (token) {
        // config.headers['token'] = token
        config.headers.Authorization = `${token}`;
    }
    return config;
  },
  error => {
    ElMessage({
        message: `请求异常${error}`,
        type: 'error',
    });
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    if (response.status == 401) {
        router.push('/login')
    }
    // 对响应数据做些什么
    let code = response.data.code
    if (code != 1) {
        ElMessage({
            message: `${response.data.msg}`,
            type: 'error',
        });
    }
    
    return response;
  },
  error => {
    // 对响应错误做些什么
    if (error.response.status  == 401) {
      ElMessage({
        message: `请重新登陆`,
        type: 'error',
      });
      router.push('/login')
    }
    return Promise.reject(error);
  }
);

export default instance;
