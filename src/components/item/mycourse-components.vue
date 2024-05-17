<template>
    <div class="course-container">
        <div v-if="random == 1" style="width: 100%; text-align: center; margin-top: 150px;">
            <img style="width: 96.8px;height: 96.8px;" src="@/assets/search.png" />
            <div style="margin-top: 18px; font-size: 16px; font-weight: 600; color: rgba(19, 20, 20, 1); line-height: 24px;">
                暂无课程数据
            </div>
            <div style="margin-top: 4px; font-size: 14px; font-weight: 400; color: rgba(144, 147, 153, 1);    line-height: 24px;">
                你尚未报名年度继续教育，请先完成继续教育报名
            </div>

            <div style="margin-top: 32px;">
                <el-button type="primary" @click="continueRegister()">我要报名</el-button>
            </div>
        </div>
        <div v-if="random == 2" style="width: 100%; display: flex; justify-content: center; margin-top: 150px;">
            
            <div class="continue-item">
                <div style="font-size: 20px; font-weight: 700; line-height: 28px; color: rgba(48, 49, 51, 1); text-align: center;">
                    2024 学年继续教育
                </div>
                <div style="font-size: 12px; font-weight: 400; line-height: 22px; color: rgba(96, 98, 102, 1); margin-top: 4px; text-align: center;">
                    学习周期： 2024/07/01-2025/01/01
                </div>
                <div class="continue-item2" style="margin-top: 16px;">
                    <div>
                        专业课：<span style="font-weight: 700;">24</span>
                    </div>
                    <div>
                        已完成专业课：<span style="font-weight: 700;">24</span>
                    </div>
                </div>
                <div class="continue-item2" style="margin-top: 8px;">
                    <div>
                        公需课：<span style="font-weight: 700;">24</span>
                    </div>
                    <div>
                        已完成公需课：<span style="font-weight: 700;">24</span>
                    </div>
                </div>
                <div class="continue-item2" style="font-size: 12px; font-weight: 400; color: rgba(144, 147, 153, 1); line-height: 22px; margin-top: 8px;">
                    <div>
                        学习总进度
                    </div>
                    <div>
                        40%
                    </div>
                </div>
                <div>
                    <el-progress :percentage="50" :show-text="false" status="success"></el-progress>
                </div>
                <div style="margin-top: 15px;">
                    <el-button type="primary" style="width: 100%;" @click="random = 3">去学习</el-button>
                </div>
            </div>
            <div class="continue-item" style="margin-left: 24px; background-color: rgba(245, 247, 250, 1); padding-top: 0px;">
                <div style="width: 104px; height: 21px; background-color: rgba(245, 108, 108, 1); color: #FFFFFF; font-size: 12px; font-weight: 400; margin-left: 135px; display: flex; align-items: center; justify-content: center;">
                    学习通道已关闭
                </div>
                <div style="font-size: 20px; font-weight: 700; line-height: 28px; color: rgba(48, 49, 51, 1); text-align: center; margin-top: 3px;">
                    2024 学年继续教育
                </div>
                <div style="font-size: 12px; font-weight: 400; line-height: 22px; color: rgba(96, 98, 102, 1); margin-top: 4px; text-align: center;">
                    学习周期： 2024/07/01-2025/01/01
                </div>
                <div class="continue-item2" style="margin-top: 16px;">
                    <div>
                        专业课：<span style="font-weight: 700;">24</span>
                    </div>
                    <div>
                        已完成专业课：<span style="font-weight: 700;">24</span>
                    </div>
                </div>
                <div class="continue-item2" style="margin-top: 8px;">
                    <div>
                        公需课：<span style="font-weight: 700;">24</span>
                    </div>
                    <div>
                        已完成公需课：<span style="font-weight: 700;">24</span>
                    </div>
                </div>
                <div class="continue-item2" style="font-size: 12px; font-weight: 400; color: rgba(144, 147, 153, 1); line-height: 22px; margin-top: 8px;">
                    <div>
                        学习总进度
                    </div>
                    <div>
                        100%
                    </div>
                </div>
                <div>
                    <el-progress :percentage="100" :show-text="false" status="success"></el-progress>
                </div>
                <div style="margin-top: 15px;">
                    <el-button type="primary" style="width: 100%;" :disabled="true">去学习</el-button>
                </div>
            </div>
        </div>

        <div v-if="random == 3" >
            <div style="display: flex; width: 100%; justify-content: space-between; align-items: center;">
                <div style="width: 84px; height: 28px; border-radius: 10px; box-shadow: inset 0 0 0 1px rgba(64, 158, 255, 1); text-align: center; line-height: 28px; font-size: 14px; color: rgba(64, 158, 255, 1);">
                    2024学年
                </div>
                <div>
                    <el-button style="width: 100px; height: 28px;" @click="random = 2">返回</el-button>
                </div>
            </div>

            <div style="margin-top: 16px; display: flex; justify-content: space-between;">
                <div style="width: 360px;height: 114px;background: rgba(255, 255, 255, 1); border: 1px solid rgba(220, 223, 230, 1); ">
                    <div style="width: calc(100% - 32px); margin: 0 auto; margin-top: 16px; display: flex; justify-content: space-between;">
                        <div>
                            <div style="font-size: 16px; font-weight: 600; line-height: 22px; color: rgba(48, 49, 51, 1);">
                                学习周期
                            </div>
                            <div style="font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(96, 98, 102, 1); margin-top: 7px;">
                                2024/07/01-2025/01/01
                            </div>
                            <div style="font-size: 14px; font-weight: 400; line-height: 22px; color:  rgba(103, 194, 58, 1); margin-top: 7px;">
                                进行中...
                            </div>
                        </div>

                        <img src="@/assets/xuexizhouqi.png" style="width: 75px; height: 77px; margin-top: 6px;" />
                    </div>
                </div>
                <div style="width: 360px;height: 114px;background: rgba(255, 255, 255, 1); border: 1px solid rgba(220, 223, 230, 1);  ;">
                    <div style="font-size: 16px; font-weight: 600; line-height: 22px; color: rgba(48, 49, 51, 1); margin-top: 16px; margin-left: 16px;">
                        课程统计
                    </div>
                    <div style="margin-left: 16px; margin-top: 8px; display: flex; justify-content: space-between; border-radius: 4px; padding-right: 16px;">
                        <div class="prince-container" style="background: linear-gradient(180deg, rgba(51, 126, 204, 1) 0%, rgba(121, 187, 255, 1) 100%); ">
                            <div class="prince-desc" style="color: rgba(255, 255, 255, 1);">课程数</div>
                            <div class="prince-num" style="color: rgba(255, 255, 255, 1);">34</div>
                        </div>
                        <div class="prince-container">
                            <div class="prince-desc" style="color: rgba(96, 98, 102, 1);">未完成</div>
                            <div class="prince-num" >28</div>
                        </div>
                        <div class="prince-container">
                            <div class="prince-desc" style="color: rgba(96, 98, 102, 1);">待考核</div>
                            <div class="prince-num" >28</div>
                        </div>
                        <div style="height: 52px; width: 1px; background-color:  rgba(220, 223, 230, 1);; ">

                        </div>
                        <div class="prince-container">
                            <div class="prince-desc" style="color: rgba(96, 98, 102, 1);">考核通过</div>
                            <div class="prince-num" >6</div>
                        </div>
                    </div>
                </div>
                <div style="width: 180px;;height: 114px;background: rgba(255, 255, 255, 1); border: 1px solid rgba(220, 223, 230, 1);">
                    <div style="font-size: 16px; font-weight: 600; line-height: 22px; color: rgba(48, 49, 51, 1); margin-top: 16px; margin-left: 16px;">
                        学习进度
                    </div>

                    <div style="text-align: center;">
                        <svg width="105" height="50" viewBox="0 0 200 100" style="margin-top: 8px;">
                            <defs>
                                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style="stop-color:rgba(176, 208, 255, 1);stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:rgba(91, 143, 249, 1);stop-opacity:1" />
                                </linearGradient>
                            </defs>
                            <path class="background-path" d="M10,100 A90,90 0 0,1 190,100" fill="none" stroke="#e6e6e6" stroke-width="15"/>
                            <!-- 进度圆弧 -->
                            <path class="progress-path" d="M10,100 A90,90 0 0,1 190,100" fill="none" stroke="url(#grad)" stroke-width="15"
                                    :stroke-dasharray="progressStrokeDasharray"
                                    :stroke-dashoffset="progressStrokeDashoffset"/>

                        </svg>
                        <div style="color: rgba(0, 0, 0, 1); font-size: 24px; font-weight: 400; position: relative; bottom: 30px;">
                            75<span style="font-size: 14px;">%</span>
                        </div>
                    </div>

                </div>
            </div>

            <el-tabs v-model="tableStatus" @tab-click="elTabsClick" style="margin-top: 37px;">
                <el-tab-pane label="全部" :name="1"></el-tab-pane>
                <el-tab-pane label="学习未完成" :name="2"></el-tab-pane>
                <el-tab-pane label="学习已完成" :name="3"></el-tab-pane>
                <el-tab-pane label="待考核" :name="4"></el-tab-pane>
                <el-tab-pane label="考核合格" :name="5"></el-tab-pane>
            </el-tabs>

            <div style="margin-top: 20px; display: flex; justify-content: center;">
                <div>
                    <div class="menuasdf" :style="{ backgroundColor: menuIndex == 1 ? 'rgba(64, 158, 255, 0.7)' : 'rgba(51, 126, 204, 0.7)' }" @click="menuIndex = 1">
                        专业科目
                    </div>
                    <div v-if="menuIndex == 1" class="menusanjiaoxing"></div>
                </div>
                <div>
                    <div class="menuasdf" :style="{ backgroundColor: menuIndex == 2 ? 'rgba(64, 158, 255, 0.7)' : 'rgba(51, 126, 204, 0.7)' , marginLeft: '16px'}" @click="menuIndex = 2">
                        共需科目
                    </div>
                    <div v-if="menuIndex == 2" class="menusanjiaoxing"></div>
                </div>
            </div>

            <div style="margin-top: 16px; flex-wrap: wrap;  display: flex; gap: 29px;">
                <div v-for="item in courseData" :key="item.id" class="course-card">
                    <div style="width: 242px;margin-top: 16px; ">
                        <img :src="item.img" style="width: 242px; height: 112px; margin-top: 16px; " />
                        <div style="margin-top: 12px; min-height: 48px; font-size: 16px; font-weight: 400; line-height: 24px; color: rgba(48, 49, 51, 1); width: 242px;">
                            {{ item.title }}
                        </div>
                        <div style="margin-top: 6px; display: flex; justify-content: space-between;">
                            <div style="font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(144, 147, 153, 1);">
                                <div>讲师：&nbsp;{{ item.teacher.name }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.teacher.zhi }}</div>
                                <div>单位：&nbsp;{{ item.danwei }}</div>
                            </div>

                            <div style="font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(255, 141, 26, 1); margin-top: 7px;">
                                {{ item.xueshi }}学时
                            </div>
                        </div>
                        <el-progress :percentage="item.programs" color="#B3E19D" style="width: 105%;" class="custom-progress"></el-progress>
                        <div style="display: flex; justify-content: space-between; padding-bottom: 16px; margin-top: 12px;">
                            <el-button style="width: 116px; height: 36px;" type="primary" @click="random=4">开始学习</el-button>
                            <el-button style="width: 116px; height: 36px;" type="primary" :disabled="item.programs != 100" @click="toOnlineExamination">在线考试</el-button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div v-if="random == 4">
            <div style="width: 100%; display: flex;">
                <div class="video-container">
                    <video-player
                        ref="videoPlayRef"
                        src="https://video.hnlpa.cn/sv/1de8e80d-173231c3629/1de8e80d-173231c3629.mp4"
                        poster="https://img.js.design/assets/img/6628ab151d3bafbf1f438419.jpg"
                        controls
                        :loop="true"
                        :volume="0.6"
                        :width="704"
                        :height="396"
                        @play="videoPlay"
                        @pause="videoPause"
                        @ready="onPlayerReady"
                    >
                    </video-player>
                </div>

                <div style="width: calc(100% - 688px); height: 364px; padding-left: 8px; padding-right: 8px; padding-top: 16px; padding-bottom: 16px; background-color:  rgba(64, 158, 255, 0.2);">
                    <div style="height: 364px;">
                        <div style="font-size: 16px; font-weight: 400; line-height: 24px; min-height: 48px; text-align: center; color: rgba(48, 49, 51, 1);;">
                            我国药品管理动态及新法规特别解读
                        </div>
                        <div style="height: 1px; background: linear-gradient(90deg, rgba(144, 147, 153, 0) 0%, rgba(144, 147, 153, 1) 48.27%, rgba(144, 147, 153, 0) 100%); margin-top:10px ;"></div>
                        <div style="margin-top: 10px; display: flex; font-size: 14px; line-height: 22px; font-weight: 400; color: rgba(144, 147, 153, 1);">
                            <div style="margin-left: 45px;">
                                讲师：&nbsp;
                            </div>
                            <div>
                                杨世民&nbsp;&nbsp;&nbsp;&nbsp;教授
                            </div>
                        </div>

                        <div style="margin-top: 10px; display: flex; font-size: 14px; line-height: 22px; font-weight: 400; color: rgba(144, 147, 153, 1);">
                            <div style="margin-left: 45px;">
                                单位：&nbsp;
                            </div>
                            <div>
                                西安交通大学
                            </div>
                        </div>

                        <div style="margin-top: 6px; height: 34px; width: 100%; background: linear-gradient(90deg, rgba(64, 158, 255, 0) 0%, rgba(64, 158, 255, 0.7) 48.56%, rgba(64, 158, 255, 0) 100%); 
                            font-weight: 400; font-size: 14px; line-height: 22px; color: rgba(255, 255, 255, 1); display: flex; justify-content: center; align-items: center;">
                            3.5&nbsp;学时
                        </div>

                        <div style="height: 140px; margin-top: 18px;">
                            <el-scrollbar height="140px">
                                <div >
                                    <div v-for="(item, index) in playData"  :key="index"
                                        style=" padding-left: 23px; font-size: 14px; font-weight: 400; line-height: 22px; cursor: pointer;"
                                        @click="updatePlayIndex(index)"
                                        :class="{ 'isSelectVideoPlay' : selectPlayIndex == index, 'notSelectVideoPlay' : selectPlayIndex != index }">
                                        <div style="display: flex; margin-top: 10px;">
                                            <el-icon size="22" :color="selectPlayIndex == index ? 'rgba(196, 86, 86, 1)' : 'rgba(144, 147, 153, 1)'">
                                            <video-play />
                                        </el-icon>
                                        <div style="padding-left: 19px; display: flex; justify-content: space-between; width: 130px; font-size: 14px; line-height: 22px; font-weight: 400;">
                                            <div>第{{ item.order.toString().padStart(2, '0') }}节</div>
                                            <div>{{ selectPlayIndex == index ? '正在播放' :  item.programs + '%'}}</div>
                                        </div>
                                        </div>
                                        <div v-if="index != playData.length - 1" style=" width: 100%; height: 1px; background: linear-gradient(90deg, rgba(144, 147, 153, 0) 0%, rgba(144, 147, 153, 1) 48.27%, rgba(144, 147, 153, 0) 100%); margin-top: 9px;"></div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </div>
                        <div style=" width: 100%; height: 1px; background: linear-gradient(90deg, rgba(144, 147, 153, 0) 0%, rgba(144, 147, 153, 1) 48.27%, rgba(144, 147, 153, 0) 100%); margin-top: 9px;"></div>

                        <div> 
                            <div style="height: 19px; display: flex; justify-content: end; align-items: end; font-size: 12px; font-weight: 400; line-height: 12px; color: rgba(96, 98, 102, 1);;">
                                20%
                            </div>
                            <div style="display: flex; align-items: center; ">
                                <div style="padding-left: 18px; font-size: 12px; font-weight: 400; color: rgba(96, 98, 102, 1); padding-right: 14px; line-height: 20px;">
                                    观看总进度
                                </div>
                                <div style="width: 118px;">
                                    <el-progress :percentage="50" color="#B3E19D" :show-text="false"></el-progress>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style="width: 100%; margin-top: 24px;">
                <el-tabs v-model="operationClickIndex" @tab-click="handleOperationClick">
                    <el-tab-pane label="课程介绍" :name="1">
                        <div style="margin-top: 24px; width: 833px;margin-left: 24px; font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(96, 98, 102, 1); padding-bottom: 27px;">
                            该课程主要讲解新法规，中药饮片是中药材经过按中医药理论、经过加工炮制后的，可直接用于中医临床的中药。本课程主要讲述中药传统理论的简介，通过外形探究中药饮片里的秘密。
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="相关资料" :name="2">
                        <div style="margin-top: 24px; margin-left: 24px; font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(96, 98, 102, 1); padding-bottom: 27px;">
                            课程PPT下载
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="学习记录" :name="3">
                        <div>
                            <el-timeline>
                                <el-timeline-item
                                    icon="More"
                                    type="primary"
                                    size="large"
                                    timestamp="2024-05-01 20:05:10 - 2024-05-01 20:15:02"
                                    >
                                    观看约10分钟
                                </el-timeline-item>
                                <el-timeline-item
                                    icon="More"
                                    type="primary"
                                    size="large"
                                    >
                                    抓拍人脸上传<br>
                                    <img src="https://img.js.design/assets/smartFill/img332164da748e08.png" style="width: 80px; height: 60px; margin-top: 8px;" />

                                </el-timeline-item>
                            </el-timeline>
                        </div>
                    </el-tab-pane>

                    <div>
                        <el-tabs v-model="pingjia">
                            <el-tab-pane label="课程评价" :name="1"></el-tab-pane>
                        </el-tabs>

                        <div style="display: flex; align-items: center;">
                            <div style="padding-right: 29px; font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(96, 98, 102, 1);;">
                                课程满意度
                            </div>
                            <el-rate v-model="kechengmanyi" allow-half />
                        </div>
                        <div style="display: flex; align-items: center;">
                            <div style="padding-right: 29px; font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(96, 98, 102, 1);;">
                                老师满意度
                            </div>
                            <el-rate v-model="kechengmanyi" allow-half />
                        </div>
                        <div style="display: flex; align-items: center;">
                            <div style="padding-right: 29px; font-size: 14px; font-weight: 400; line-height: 22px; color: rgba(96, 98, 102, 1);;">
                                整体满意度
                            </div>
                            <el-rate v-model="kechengmanyi" allow-half />
                        </div>

                        <div style="margin-top: 16px;">
                            <el-input style="width: 100%;" :rows="3" type="textarea" placeholder="请输入内容" ></el-input>
                            <el-button style="width: 71px; height: 30px; margin-top: 16px;">保存评价</el-button>
                        </div>
                    </div>

                </el-tabs>
            </div>
            
        </div>
    </div>
</template>

<script>

import { defineComponent, ref, getCurrentInstance, computed, onUnmounted } from 'vue'

const playData = [
    {
        id: 1,
        order: 1,
        programs: 0
    },
    {
        id: 2,
        order: 2,
        programs: 11
    },
    {
        id: 3,
        order: 3,
        programs: 1
    },
    {
        id: 4,
        order: 4,
        programs: 0
    }
]

const courseData = [
    {
        id: 1,
        img: 'https://img.js.design/assets/img/6628ab151d3bafbf1f438419.jpg',
        title: '我国药品管理动态及新法规特别解读',
        teacher: { name: '杨世民', zhi: '教授' },
        danwei: '西安交通大学',
        xueshi: 3.5,
        programs: 0
    },{
        id: 2,
        img: 'https://img.js.design/assets/img/6628ab151d3bafbf1f438419.jpg',
        title: '我国药品管理动态',
        teacher: { name: '杨世民', zhi: '教授' },
        danwei: '西安交通大学',
        xueshi: 4,
        programs: 10
    },{
        id: 3,
        img: 'https://img.js.design/assets/img/6628ab151d3bafbf1f438419.jpg',
        title: '我国药品管理动态',
        teacher: { name: '杨世民', zhi: '教授' },
        danwei: '西安交通大学',
        xueshi: 4,
        programs: 100
    },{
        id: 4,
        img: 'https://img.js.design/assets/img/6628ab151d3bafbf1f438419.jpg',
        title: '我国药品管理动态',
        teacher: { name: '杨世民', zhi: '教授' },
        danwei: '西安交通大学',
        xueshi: 4,
        programs: 10
    },{
        id: 5,
        img: 'https://img.js.design/assets/img/6628ab151d3bafbf1f438419.jpg',
        title: '我国药品管理动态',
        teacher: { name: '杨世民', zhi: '教授' },
        danwei: '西安交通大学',
        xueshi: 4,
        programs: 100
    },{
        id: 6,
        img: 'https://img.js.design/assets/img/6628ab151d3bafbf1f438419.jpg',
        title: '我国药品管理动态',
        teacher: { name: '杨世民', zhi: '教授' },
        danwei: '西安交通大学',
        xueshi: 4,
        programs: 10
    },{
        id: 7,
        img: 'https://img.js.design/assets/img/6628ab151d3bafbf1f438419.jpg',
        title: '我国药品管理动态',
        teacher: { name: '杨世民', zhi: '教授' },
        danwei: '西安交通大学',
        xueshi: 4,
        programs: 10
    },{
        id: 8,
        img: 'https://img.js.design/assets/img/6628ab151d3bafbf1f438419.jpg',
        title: '我国药品管理动态',
        teacher: { name: '杨世民', zhi: '教授' },
        danwei: '西安交通大学',
        xueshi: 4,
        programs: 10
    },
]

export default defineComponent({
    name: "MycoursePage",
    components: {
    },
    setup() {

        const  { emit, proxy } = getCurrentInstance()

        const random = ref(2)
        const continueRegister = () => {
            emit('to-continue-register', true)
        }

        const progressStrokeDasharray = computed(() => {
            return calculateCircumference();
        })

        const progressStrokeDashoffset = computed(() => {
            return calculateCircumference() * (1 - 75 / 100);
        })

        const calculateCircumference = () => {
            const radius = 90; // 圆弧的半径
            return 2 * Math.PI * radius / 2; // 圆弧的周长的一半
        }

        const tableStatus = ref(1)

        const elTabsClick = (a) => {
            tableStatus.value = a.props.name
        }

        const selectPlayIndex = ref(0)

        const menuIndex = ref(1)

        const updatePlayIndex = (index) => {
            selectPlayIndex.value = index
        }

        const operationClickIndex = ref(1)
        const handleOperationClick = (a) => {
            operationClickIndex.value = a.props.name
        }
        
        const pingjia = ref(1)

        const videoPlay = () => {
            console.log('play...')
        }
        const videoPause = () => {
            console.log('pause')
        }

        const videoPlayRef = ref('')
        const onPlayerReady = () => {
        }

        const handleVisibilitychange = () => {
            if (document.visibilityState === 'hidden') {
                pauseVideo()
            }
        }

        const pauseVideo = () => {
            // 暂停
            if (videoPlayRef.value && videoPlayRef.value.$el) {
                let videos = videoPlayRef.value.$el.getElementsByTagName('video')
                if (videos && videos.length > 0) {
                    videos[0].pause()
                }
            }
        }

        const handleWindowBlur = () => {
            console.log('blur')
            pauseVideo()
        };

        // 检测页面可见性变化时
        document.addEventListener('visibilitychange', handleVisibilitychange);
        document.addEventListener('blur', handleWindowBlur);

        onUnmounted(() => {
            document.removeEventListener('visibilitychange', handleWindowBlur)
            document.removeEventListener('blur', handleWindowBlur)
        })

        const toOnlineExamination = () => {
            proxy.$router.push('/onlieExamination')
        }


        return {
            random, continueRegister, calculateCircumference, progressStrokeDashoffset, progressStrokeDasharray, elTabsClick, tableStatus, menuIndex, courseData, selectPlayIndex,
            updatePlayIndex, playData, operationClickIndex, handleOperationClick, pingjia, videoPlay, videoPause, videoPlayRef, onPlayerReady, toOnlineExamination
        }
    }

})

</script>

<style>
.isSelectVideoPlay {
    color: rgba(196, 86, 86, 1);
}

.notSelectVideoPlay {
    color: rgba(144, 147, 153, 1);;
}

.custom-progress {
  position: relative;
  width: 100%;
  margin-top: 12px;
}

.custom-progress::v-deep .el-progress__text {
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(50%);
}

.course-card{
    flex: 1 1 calc(33.333% - 20px);
    max-width: calc(33.333% - 20px); 
    opacity: 1;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 6px  rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
}

.menusanjiaoxing {
    width: 0;
    height: 0;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-top: 12px solid rgba(64, 158, 255, 0.7);
    margin: 0 auto;
}

.menuasdf {
    display: flex; align-items: center; justify-content: center;
    width: 136px;
    height: 36px;
    opacity: 1;
    border-radius: 4px;
    background: rgba(51, 126, 204, 0.7);
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 22px;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
}

.prince-container {
    width: 58px; 
    height: 52px; 
    text-align: center;
}

.prince-desc {
    font-size: 12px; 
    font-weight: 400; 
    line-height: 20px; 
    margin-top: 5px;
}

.prince-num {
    font-size: 20px; 
    font-weight: 500; 
    line-height: 20px; 
}

.continue-item {
    width: 229px;
    opacity: 1;
    border-radius: 4px;
    background: rgba(236, 245, 255, 1);
    padding-top: 23px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 27px;
}

.continue-item2 {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 22px;
    color: rgba(96, 98, 102, 1);
}
</style>