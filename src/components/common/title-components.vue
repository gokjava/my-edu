<template>
    <div style="width: 100%; height: 80px; background-size: cover;" :style="{ backgroundImage: `url(${mainTitleBg})` }">
        <div class="title-page-cls" >
            <div style="font-size: 22px;font-weight: 400;letter-spacing: 0px;line-height: 40px;color: rgba(255, 255, 255, 1);">
                黑龙江省医药流通行业执业药师继续教育
            </div>
            <div style="display: flex; align-items: center;">
                <el-icon color="#ffffff" style="margin-right: 5px;">
                    <phone />
                </el-icon>
              
                <span style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(255, 255, 255, 1);">咨询热线</span>
                &nbsp;&nbsp;
                <span style="font-size: 14px;font-weight: 700;letter-spacing: 0px;line-height: 22px;color: rgba(255, 255, 255, 1);">0451-82738127</span>
            </div>
        </div>
    </div>
    
  </template>
  
  <script>
  export default {
    name:'MyTitleComponent',
    setup() {

        const mainTitleBg = require('@/assets/main-title-background.png')
      return {
        mainTitleBg
      };
    }
  };
  </script>
  
  <style scoped>
  .title-page-cls {
    width: 1200px; margin: 0 auto; height: 80px; display: flex; justify-content: space-between; align-items: center; 
  }
  </style>
  