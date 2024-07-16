<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  taskinfo : {
    type: Object,
    required: true
  },
  selectedID: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['selectTask']);
const handleClick = () => {
  emit('selectTask', props.taskinfo.taskid);
};
</script>

<template>
    <div class="task-card" :class="{'selected':selectedID===taskinfo.taskid }" @click="handleClick">
        <img class="status" v-if="taskinfo.status" src="https://img.icons8.com/?size=100&id=IMtcTiP3h6cw&format=png&color=000000"/>
        <div class="taskid">{{ taskinfo.taskid }}</div>
        <div class="taskname">{{ taskinfo.taskname }}</div>
        <div class="deadline">{{ taskinfo.deadline}}</div>
        <div class="description">{{ taskinfo.description }}</div>
    </div>
</template>

<style scoped>
.task-card {
    margin-top: 1em;
    border: 1px solid;
    border-color: brown;
    position: relative;
}
.status {
    position: absolute;
    width: 0.8em;
    left: -0.4em;
    top: -0.4em;
}
.selected {
    border: 2px solid;
    border-color: greenyellow;
}
</style>