<template>
    <div v-if="random == 1">
        <el-table :data="testData" style="width: 100%; height: 490px;" header-cell-class-name="customheaderRowClassName" header-row-style="customheaderRowClassName" :fit="true"  >
            <el-table-column align="center" prop="year" label="年度" ></el-table-column>
            <el-table-column align="center" prop="zhuan" label="专业课" ></el-table-column>
            <el-table-column align="center" prop="gong" label="公需课" ></el-table-column>
            <el-table-column align="center" prop="p" label="培训方式"  min-width="200"></el-table-column>
            <el-table-column align="center" label="操作" >
                <template #default="scope">
                    <el-button type="success" size="small" @click="print(scope.row.id)">打印学时证明</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="padding-left: 8px; font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(96, 98, 102, 1); margin-top: 11px;">
            提醒
        </div>
        <div style="padding-left: 8px;font-size: 12px;font-weight: 400;letter-spacing: 0px;line-height: 20px;color: rgba(144, 147, 153, 1); margin-top: 10px;">
            公需课和专业课学习完毕后请耐心等待人工审核，预计7个工作日后可以打印学时证明。
        </div>

    </div>

    <div v-if="random == 2" style="width: 100%; display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
        <div style="width: 336px; text-align: center;" >
            <div :class="`custom-print-${n}`" class="common-edu-img" style="width: 336px; height: 484px;  " :style="{ backgroundImage: `url(${bg1})` }">
                <div class="common-edu-img" style="width: 283px; height: 432px; " :style="{ backgroundImage: `url(${bg2})` }">
                    <div style="width: 227px; height: 409px; background: linear-gradient(90deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 1) 50.26%, rgba(255, 255, 255, 0.7) 100%); padding-left: 16px; padding-right: 16px;">
                        <div style="margin-top: 32px; font-size: 18px;font-weight: 600;letter-spacing: 0px;line-height: 25.2px;color: rgba(0, 89, 169, 1);">
                            黑龙江省执业药师继续教育
                        </div>
                        <div style="height: 1px; width: 200px; background-color: rgba(0, 0, 0, 1); margin-top: 4px;"></div>
                        <div style="margin-top: 8px;font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 20px;color: rgba(0, 0, 0, 1);">
                            {{detail.year}}学年专业科目学时证明
                        </div>
                        <div style="display: flex; font-size: 10px;font-weight: 400;letter-spacing: 0px;line-height: 20px;color: rgba(48, 49, 51, 1); margin-top: 22px;">
                            <div>
                                姓<span style="margin-left: 2em">名:</span>
                            </div>
                            <div>
                                &nbsp;&nbsp;{{detail.name}}
                            </div>
                        </div>
                        <div style="display: flex;font-size: 10px;font-weight: 400;letter-spacing: 0px;line-height: 20px;color: rgba(48, 49, 51, 1);">
                            <div>
                                资格证号:
                            </div>
                            <div>
                                &nbsp;&nbsp;{{detail.certificationNo}}
                            </div>
                        </div>
                        <div style="display: flex;font-size: 10px;font-weight: 400;letter-spacing: 0px;line-height: 20px;color: rgba(48, 49, 51, 1);">
                            <div>
                                身份证号:
                            </div>
                            <div>
                                &nbsp;&nbsp;{{detail.idcard}}
                            </div>
                        </div>

                        <div style="text-indent: 2em; margin-top: 12px; font-size: 10px;font-weight: 400;letter-spacing: 0px;line-height: 16px;color: rgba(48, 49, 51, 1); min-height: 110px; text-align: start;">
                            依据《专业技术人员继续教育规定》、《执业药师职业资格制度规定》及有关文件要求，该同志参加了执业(从业）药师继续教育专业课培训，学习成绩合格，授予专业课{{detail.hours}}学时，计{{detail.majorHour}}学分。
                        </div>

                        <div style="display: flex; margin-top: 10px; justify-content: space-between;">
                            <div style="text-align: center; width: 90px;">
                                <img :src="qrCode" style="width: 80px; height: 80px;" />
                                <div style="font-size: 10px;font-weight: 400;letter-spacing: 0px;line-height: 20px;color: rgba(48, 49, 51, 1);">
                                    扫一扫查验真伪
                                </div>
                            </div>
                            <div style="margin-top: 40px; text-align: end;">
                                <div style="font-size: 10px;font-weight: 600;letter-spacing: 0px;line-height: 20px;color: rgba(0, 0, 0, 1);">
                                    黑龙江省医药零售行业协会
                                </div>
                                <div style="font-size: 10px;font-weight: 400;letter-spacing: 0px;line-height: 20px;color: rgba(0, 0, 0, 1);">
                                    {{detail.grantTime}}
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>

            <div style="margin-top: 21px; text-align: center;">
                <el-button style="width: 100px ;height: 30px;" type="primary" @click="printEducation(n)" :disabled="true">打印</el-button>
                <el-button style="width: 100px ;height: 30px; margin-left: 12px;" @click="download(n)">下载</el-button>
            </div>
        </div>
    </div>
</template>


<script>

import { defineComponent,reactive,ref, onMounted } from 'vue'
import bg1 from '@/assets/bg1.png'
import bg2 from '@/assets/bg2.jpg'
import qrCode from '@/assets/test-qrcode.png'
import axios from '@/axios'


export default defineComponent({
    name: 'eductionComponent',
    setup() {

        onMounted(() => {
            // 动态加载本地的 html2canvas
            const script = document.createElement('script');
            script.src = '@/assets/html2canvas.min.js';
            script.onload = () => {
            this.html2canvas = window.html2canvas;
            };
            document.head.appendChild(script);
        })

        const detail = ref({})
        const print = async (id) => {
            
            let r = await axios.get(`/api/client/certification_grant/v1/info?id=${id}`)
            if (r.data.code == 1) {
                detail.value = r.data.data
                random.value = 2
            }
        }
        const random = ref(1)
        const printEducation = () => {
        }
        const download = (n) => {
            let element = document.getElementsByClassName(`custom-print-${n}`)[0]
            window.html2canvas(element).then(canvas => {
                const image = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = image;
                link.download = 'capture.png';
                link.click();
            });
        }
        const testData = reactive([])

        const getList = async () => {
            let r = await axios.get('/api/client/certification_grant/v1/query')
            if (r.data.code == 1) {
                testData.push(...r.data.data.records.map(item => {
                    return {
                        id: item.id,
                        year: item.year,
                        zhuan: item.majorHour,
                        gong: item.minorHour,
                        p: item.grantType == 1 ? '网授' : '面授'
                    }
                }))
            }
        }
        getList()
        return {
            testData, print, random, download, printEducation, bg1, bg2, qrCode, detail
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
.common-edu-img {
    background-size: cover; display: flex; justify-content: center; align-items: center;
}
</style>