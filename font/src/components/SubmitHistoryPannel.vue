<script setup>
import { ref, watch } from 'vue';
import { _postToServer } from './_postToServer';

const stuid = ref("");
const idIsValid = ref(null);

const historyList = ref([]);

watch(idIsValid, (newVal) => {
    if (newVal) _postToServer("/checkhistory", { stuid:stuid.value }, data=>historyList.value=data);
});

function checkID() {
    idIsValid.value = false;
    if (stuid.value === "") {
        idIsValid.value = null;
    } else {
        _postToServer('/checkid', { "stuid": stuid.value }, data => idIsValid.value = data.result);
    }
}
</script>

<template>
    <div class="id-inserter">
        <div>step 1. 输入学号</div>
        <input type="text" v-model="stuid" @blur="checkID"/>
        <div v-if="idIsValid!==null&&!idIsValid">请再次检查学号是否输入错误</div>
    </div>
    <div v-if="idIsValid">
        <div v-for="hist in historyList" >{{ hist.taskname }}</div>
    </div>
</template>

<style scoped>
</style>