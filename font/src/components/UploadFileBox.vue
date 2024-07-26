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
        size: currentFile.size
    }
    emit("changeFile", currentFile);
    console.log('change file!')
}

type FileInfo = {
    name: string;
    size: string;
};

function formatFileinfo(info: FileInfo): FileInfo {
    const fsize = Math.round(info.size / 1000) + "kb";
    const fname = info.name.length > 10 ? info.name.slice(0, 5) + "..." + info.name.slice(-5) : info.name;
    return { name: fname, size: fsize };
}
</script>

<template>
    <div class="dropzone-container" :style="isDragging && 'border-color: greenyellow;'">
        <input type="file" multiple name="file" id="fileInput" class="hidden-input" @change="onChange" ref="file"
            :accept="props.allowedExtent" />
        <label v-if="currentFileinfo !== null" for="fileInput" class="preview-card">
            <img :title="currentFileinfo.name" src="/src/assets/newfile.png" alt="newfile">
            <div>{{ formatFileinfo(currentFileinfo).name }}</div>
            <div>{{ formatFileinfo(currentFileinfo).size }}</div>
        </label>
        <label v-else for="fileInput" class="file-label">
            <img src="/src/assets/addfile.png" alt="addfile">
            <div ><u>点击</u>上传文件</div><br/>
        </label>
    </div>
</template>

<style scoped>
.dropzone-container {
    padding: 1em;
    background: #f7fafc;
    border: 2px dashed;
    border-color: #9e9e9e;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.dropzone-container label {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
}

.file-label {
    cursor: pointer;
    align-content: center;
    font-size: 0.8em;
}

.file-label div u:hover {
    color: blueviolet;
}

label > img {
    width: 4em;
}

.preview-card {
    color: #817e7e;
    font-size: 0.8em;
    align-content: center;
}
</style>