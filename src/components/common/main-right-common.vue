<template>
    <div style="width: 100%; height: 40px;border-radius: 4px 4px, 0px, 0px;background: rgba(251, 248, 241, 1); display: flex; align-items: center;font-size: 16px;font-weight: 600;letter-spacing: 0px;line-height: 24px;color: rgba(23, 137, 255, 1);">
        <PhoneCall theme="outline" size="23" fill="rgba(23, 137, 255, 1)" :strokeWidth="2" style="position: relative; top: 3px; padding-left: 10px; padding-right: 10px;"/>联系我们
    </div>
    <div style="width: 100%; display: flex;font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(96, 98, 102, 1); margin-top: 16px;">
        <div style="width: 50px; flex-shrink: 1;">
            地址
        </div>
        <div style="width: 205px;">
            黑龙江省哈尔滨市南岗区宣利街与黄河路交叉口北50米龙港厦18楼
        </div>
    </div>
    <div style="width: 100%; display: flex;font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(96, 98, 102, 1);margin-top: 8px;">
        <div style="width: 50px;">
            邮箱
        </div>
        <div style="width: 205px;">
            171084082@qq.com
        </div>
    </div>
    <div style="width: 100%; display: flex;font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(96, 98, 102, 1);margin-top: 8px">
        <div style="width: 50px;">
            电话
        </div>
        <div style="width: 205px;">
            0451-82738127
        </div>
    </div>

    <div style="width: 100%; height: 40px;border-radius: 4px 4px, 0px, 0px;background: rgba(251, 248, 241, 1); margin-top: 30px;display: flex; align-items: center;font-size: 16px;font-weight: 600;letter-spacing: 0px;line-height: 24px;color: rgba(23, 137, 255, 1);">
        <Wechat theme="outline" size="23" fill="rgba(23, 137, 255, 1)" :strokeWidth="2" style="position: relative; top: 3px; padding-left: 10px; padding-right: 10px;"/>微信客服
    </div>

    <div style="text-align: center;">
        <img src="https://img.js.design/assets/img/6634929e46a9c21101abcbe4.png#671faedaf8013c54f81139e6871489ca" style="height: 140px; width: 140px; margin-top: 16px;" />
        <div>
            微信客服二维码
        </div>
    </div>
</template>

<script setup>
import {PhoneCall, Wechat} from '@icon-park/vue-next';
</script>