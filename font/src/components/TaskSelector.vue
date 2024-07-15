<script setup>
import TaskCard from './TaskCard.vue'
</script>

<template>
    <div>
        <div class="notice">
            Step 2. 选择提交任务
        </div>
        <div class="task-list-warp">
            <div class="task-list">
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
            </div>
            <div class="task-info">

            </div>
        </div>
    </div>
</template>

<style scoped>
.task-list-warp {
    margin-top: 1em;
    width: 45%;
}
.task-list {
    height: 100px;
    overflow-y: scroll;
    scroll-behavior: smooth;
    white-space: nowarp;
    border-bottom: rgba(166, 170, 169, 0.55) 1px solid;
    border-top: rgba(166, 170, 169, 0.55) 1px solid;
}
.task-list::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}
</style>