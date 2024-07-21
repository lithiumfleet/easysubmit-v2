<script lang="ts" setup>
import { ref } from 'vue';
const isDragging = ref(false);
const currentFileinfo = ref(null);

const props = defineProps(["allowedExtent"]);
const emit = defineEmits(["changeFile"])

function onChange(event) {
    const currentFile = event.target.files[0];
    currentFileinfo.value = {
        name: currentFile.name,
        size: Math.round(currentFile.size / 1000) + "kb"
    }
    emit("changeFile", currentFile);
    console.log('change file!')
}
function dragover(e) {
    e.preventDefault();
    isDragging = true;
}
function dragleave() {
    isDragging = false;
}
function drop(event) {
    isDragging = false;
}
</script>

<template>
    <div class="dropzone-container" :style="isDragging && 'border-color: greenyellow;'" @dragover="dragover"
        @dragleave="dragleave" @drop="drop">
        <input type="file" multiple name="file" id="fileInput" class="hidden-input" @change="onChange" ref="file"
            :accept="props.allowedExtent" />

        <label for="fileInput" class="file-label">
            <div v-if="currentFileinfo !== null" class="preview-card">
                {{ currentFileinfo.name }}
                {{ currentFileinfo.size }}
                可以再次上传覆盖这个文件, 别忘了点击提交按钮.
            </div>
            <div v-else-if="isDragging">松开以上传文件</div>
            <div v-else>拖拽或<u>点击</u>上传文件</div>
        </label>
    </div>
</template>

<style scoped>
.dropzone-container {
    padding: 4rem;
    background: #f7fafc;
    border: 2px dashed;
    border-color: #9e9e9e;
}

.hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
}

.file-label {
    font-size: 20px;
    display: block;
    cursor: pointer;
}

.file-label div u:hover {
    color: blueviolet;
}

.preview-card {
    display: flex;
    border: 1px solid #a2a2a2;
    padding: 5px;
    margin-left: 5px;
}
</style>