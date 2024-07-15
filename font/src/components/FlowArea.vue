<script setup>
import IDInserter from './IDInserter.vue';
import TaskSelector from './TaskSelector.vue';
import FileUploader from './FileUploader.vue';
</script>

<template>
    <div class="flow-area">
        <IDInserter/>
        <TaskSelector/>
        <FileUploader/>
    </div>
</template>

<style scoped>
.flow-area {
    display: flex;
    flex-direction: column;
    width: 50%;
}
.flow-area > * {
    margin-top: 2em;
}
</style>