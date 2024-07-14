<script setup>
import IDInserter from './IDInserter.vue';
import TaskSelector from './TaskSelector.vue';
import FileUploader from './FileUploader.vue';
</script>

<template>
    <div class="flow_area">
        <IDInserter/>
        <TaskSelector/>
        <FileUploader/>
    </div>
</template>

<style scoped>
.flow_area {
    display: flex;
    flex-direction: column;
}
</style>