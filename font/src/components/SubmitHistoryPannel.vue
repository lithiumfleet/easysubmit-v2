<script setup>
import { ref, watch } from 'vue';
import { _postToServer } from './_postToServer';
import moment from 'moment'; 

const stuid = ref("");
const idIsValid = ref(null);

const historyList = ref([]);

function _compareTimeString(a,b) {
    if (moment(a.time).isSame(b.time)) {
        return 0;
    } 
    if (moment(a.time).isAfter(b.time)) {
        return -1;
    } 
    if (moment(a.time).isBefore(b.time)) {
        return 1;
    }
    throw Error('Cannot recognize time data');
}

watch(idIsValid, (newVal) => {
    if (newVal) {
        _postToServer("/checkhistory", { stuid: stuid.value }, data => historyList.value = data.sort(_compareTimeString));
    }
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
        <input type="text" v-model="stuid" @blur="checkID" />
        <div v-if="idIsValid !== null && !idIsValid">请再次检查学号是否输入错误</div>
    </div>
    <div v-if="idIsValid">
        <div class="table-warp">
            <table>
                <caption>
                    {{ stuid }}的提交记录表
                </caption>
                <thead>
                    <tr>
                        <th>time</th>
                        <th>taskname(taskid)</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="hist in historyList">
                    <td>{{ hist.time }}</td>
                    <td>{{ hist.taskname }}({{ hist.taskid }})</td>
                    <td v-if="hist.coveredfile===''">提交{{ hist.filename }}</td>
                    <td v-else>提交{{ hist.filename }}, 覆盖{{ hist.coveredfile }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.table-wrap{
  overflow:hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.35);
}

table{
  font-family: 'Oswald', sans-serif;
  border-collapse:collapse;
}

th{
  background-color:#009879;
  color:#ffffff;
  width:25vw;
  height:75px;
}

td{
  background-color:#ffffff;
  width:25vw;
  height:50px;
  text-align:center;
}

tr{
  border-bottom: 1px solid #dddddd;
}

tr:last-of-type{
  border-bottom: 2px solid #009879;
}

tr:nth-of-type(even) td{
  background-color:#f3f3f3;
}
</style>