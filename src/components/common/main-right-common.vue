<template>
    <div style="border: 1px solid rgba(251, 248, 241, 1);">
        <div style="width: 100%; height: 40px;border-radius: 4px 4px, 0px, 0px;background: rgba(251, 248, 241, 1); display: flex; align-items: center;font-size: 16px;font-weight: 600;letter-spacing: 0px;line-height: 24px;color: rgba(23, 137, 255, 1);">
            <PhoneCall theme="outline" size="23" fill="rgba(23, 137, 255, 1)" :strokeWidth="2" style="position: relative; top: 3px; padding-left: 15px; padding-right: 10px;"/>联系我们
        </div>
        <div style="width: 100%; display: flex;font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(96, 98, 102, 1); margin-top: 16px; margin-left: 15px">
            <div style="width: 50px; flex-shrink: 1;">
                地址
            </div>
            <div style="width: 205px;">
                黑龙江省哈尔滨市南岗区宣利街2号龙之港大厦1801室
            </div>
        </div>
        <div style="width: 100%; display: flex;font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(96, 98, 102, 1);margin-top: 8px; margin-left: 15px;">
            <div style="width: 50px;">
                邮箱
            </div>
            <div style="width: 205px;">
                171084082@qq.com
            </div>
        </div>
        <div style="width: 100%; display: flex;font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(96, 98, 102, 1);margin-top: 8px; margin-bottom: 20px; margin-left: 15px">
            <div style="width: 50px;">
                电话
            </div>
            <div style="width: 205px;">
                0451-82738127
            </div>
        </div>
    </div>
    
    <div style="border: 1px solid rgba(251, 248, 241, 1); margin-top: 30px;">
        <div style="width: 100%; height: 40px;border-radius: 4px 4px, 0px, 0px;background: rgba(251, 248, 241, 1); display: flex; align-items: center;font-size: 16px;font-weight: 600;letter-spacing: 0px;line-height: 24px;color: rgba(23, 137, 255, 1);">
            <Wechat theme="outline" size="23" fill="rgba(23, 137, 255, 1)" :strokeWidth="2" style="position: relative; top: 3px; padding-left: 15px; padding-right: 10px;"/>微信客服
        </div>

        <div style="text-align: center; padding-bottom: 12px;">
            <img src="https://assets.hljszyys.com/static/wechat.png" style="height: 140px; width: 140px; margin-top: 16px;" />
            <div>
                微信客服二维码
            </div>
        </div>
    </div>

    
</template>

<script setup>
import {PhoneCall, Wechat} from '@icon-park/vue-next';
</script>