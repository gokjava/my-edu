<template>
    <div v-for="(item, n) in props.jxjy" :key="n" style="width: 100%; display: flex; justify-content: space-between; align-items: center; margin-top: 18px;">
        <div style="display: flex; align-items: center;">
            <div style="width: 4px;height: 4px;opacity: 1;background: rgba(82, 155, 46, 1); margin-right: 8px; border-radius: 50%;"></div>
            <div style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer;" :style="{ width: `${width}px` }" @click="toQueryDetail(item)" >
                {{ item.title }}
            </div>
        </div>
        
        <div style="font-size: 14px;font-weight: 400;letter-spacing: 0px;line-height: 22px;color: rgba(96, 98, 102, 1);">
            {{ getDateStr(item.postTime) }}
        </div>
    </div>

    <el-empty v-if="!props.jxjy || props.jxjy.length <= 0" :image-size="110" />
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
    jxjy: Array,
    width: Number
})

const getDateStr = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${month}-${day}`;
    return formattedDate
}
const router = useRouter()

const toQueryDetail = (item) => {
    if (item.redirectUrl) {
        window.open(item.redirectUrl)
        return
    }
    router.push('/home/item?id=' + item.id)
}

</script>

<style>

</style>