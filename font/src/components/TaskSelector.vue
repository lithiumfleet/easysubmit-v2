<script setup>
import TaskCard from './TaskCard.vue'
import { ref,watch,computed } from 'vue'
let task_1 = {
    taskid: 1,
    taskname: "数字信号处理实践大作业",
    deadline: "2024-12-24",
    status: false,
    description: "第一次课的内容包括：\
1、我要围绕西电出版社书后四个实验及程序（基本上与新教材四个实验对应一直）来讲一下实验的内容。之所以这样做是因为西电出版社书后四个实验有完整matlab代码，搞懂之后可以为大家完成工大版教材实验任务提供重要支撑。\
具体程序文件是给你们群里共享的文件里\
西电出版社的教学资源课程实验资源课后习题及实验程序集\
这个文件夹下 \
exp2a exp2b exp3 exp4 exp5这几个程序。\
解释大家务必将整个文件夹都用优盘拷贝好带着，或者直接携带自己的笔记本电脑（提前安装好matlab，什么版本都可以）去机房。\
2、讲该课程大作业其中的图像处理案例，作为大作业的引子   "
};
let task_2 = {
    taskid: 2,
    taskname: "数字信号处理实践大作业",
    deadline: "2024-12-24",
    status: true,
    description: " 1、我要围绕西电出版社书后四个实验及程序（基本上与新教材四个实验对应一直）来讲一下实验的内容。之所以这样做是因为西电出版社书后四个实验有完整matlab代码，搞懂之后可以为大家完成工大版教材实验任务提供重要支撑。\
具体程序文件是给你们群里共享的文件里"
};

const taskList = [task_1, task_2]; // can get from server

let selectedTaskid = ref(-1);
const selectTaskHandler = (taskid) => {
    selectedTaskid.value = taskid;
    console.debug(`select id: ${taskid}`);
};

</script>

<template>
    <div>
        <div class="notice">
            Step 2. 选择提交任务
        </div>
        <div class="task-list-warp">
            <div class="task-list" >
                <TaskCard 
                    v-for="(task, _) in taskList" 
                    :taskinfo="task" 
                    :selectedID="selectedTaskid"
                    @selectTask="selectTaskHandler"
                    />
            </div>
        </div>
    </div>
</template>

<style scoped>
.task-list-warp {
    margin-top: 1em;
}
.task-list {
    height: 20em; /* Control task list height here */
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