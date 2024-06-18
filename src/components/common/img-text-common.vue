<template>

    <div v-if="props.img && !showText" >
        <img :src="props.img "  :style="{ width: props.width + 'px', height: props.height + 'px' }" style="object-fit: cover; object-position: center top"  @error="handleError"/>
    </div>
    <div v-if="!props.img || showText" class="bg-color-primary-brand-9 img-text-common" :style="{ width: props.width + 'px', height: props.height + 'px', fontSize: props.fontSize ? fontSize + 'px' : '16px' }">
        {{ props.text }}
    </div>

</template>
<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
    img: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    fontSize: {
        type: Number
    }
})

const showText = ref(false)
const handleError = () => {
  showText.value = true;
};

</script>

<style>

.img-text-common {
    font-weight: 400; 
    line-height: 24px; 
    color: rgba(48, 49, 51, 1);
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>