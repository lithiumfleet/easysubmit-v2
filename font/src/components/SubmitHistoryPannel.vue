<script setup>
import { ref, watch } from 'vue';
import { _postToServer } from './_postToServer';
import { _compareTimeString, formatTimeString } from './_timeUtils';

const stuid = ref("");
const idIsValid = ref(null);

const historyList = ref([]);

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
    <div class="pannel">
        <div v-if="!idIsValid" class="id-inserter">
            <img src="/src/assets/lock.png" alt="locked">
            <div>请输入学号查看提交记录</div>
            <input @keyup.enter="checkID" type="text" v-model="stuid" @blur="checkID" />
            <div v-if="idIsValid !== null && !idIsValid">请再次检查学号是否输入错误</div>
        </div>
        <div v-if="idIsValid" class="table-warp">
            <img src="/src/assets/search.png" alt="search">
            <table>
                <caption>
                    <h3>{{ stuid }}的提交记录表</h3>
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
                        <td>{{ formatTimeString(hist.time) }}</td>
                        <td>{{ hist.taskname }}({{ hist.taskid }})</td>
                        <td v-if="hist.coveredfile === ''">提交{{ hist.filename }}</td>
                        <td v-else>提交{{ hist.filename }}, 覆盖{{ hist.coveredfile }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="no-hist" v-if="historyList.length===0">暂无提交记录</div>
        </div>
    </div>
</template>

<style scoped>
.pannel>* {
    margin: 2em;
    text-align: center;
}

.id-inserter {
    margin-top: 0;
    text-align: center;
}

.id-inserter>* {
    margin: 0.6rem;
}

.table-wrap {
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.35);
}

.no-hist {
    margin-top: 5em;
    margin-bottom: 5em;
    color: rgb(160, 159, 159);
    font-size: larger;
}

table {
    font-family: 'Oswald', sans-serif;
    border-collapse: collapse;
    width: 80%;
    margin-left: 10%;
}

caption {
    margin: 1.5em 1em 1em 1em;
    font-size: large;
}

th {
    background-color: #009879;
    color: #ffffff;
    width: 25vw;
    height: 75px;
}

td {
    background-color: #ffffff;
    width: 25vw;
    height: 50px;
    text-align: center;
}

tr {
    border-bottom: 1px solid #dddddd;
}

tr:last-of-type {
    border-bottom: 2px solid #009879;
}

tr:nth-of-type(even) td {
    background-color: #f3f3f3;
}
</style>