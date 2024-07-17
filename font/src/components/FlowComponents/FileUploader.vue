<script setup>
import { ref, defineProps } from 'vue'

let file = ref(null);

function prefillFileHandler(event) {
    const files = event.target.files;
        if (files.length > 0) {
            file = files[0];
            console.log(file);
        }
}


</script>

<template>
    <div class="file-uploader-warp">
        <input type="file" @change="prefillFileHandler"/>
        <div v-if="file">当前选择文件:{{ file.name }}</div>
        <div v-if="!file">请选择文件</div>
    </div>
</template>

<style scoped>
</style>