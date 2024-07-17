<script setup>
import IDInserter from './FlowComponents/IDInserter.vue';
import TaskSelector from './FlowComponents/TaskSelector.vue';
import FileUploader from './FlowComponents/FileUploader.vue';
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
    width: 60%;
}
.flow-area > * {
    margin-top: 2em;
}
</style>