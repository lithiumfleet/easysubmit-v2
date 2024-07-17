<script setup>
import { defineModel, computed, ref, watch } from 'vue';

/* info: get id from user and validate using server, then show tasklist and file uploader */
/* protocols
*       post /ckeckid {"stuid": "1234567890"} => {"result": true/false}
*       post /checktasklist {"stuid": "1234567890"} => [...{"taskid","name","deadline","info","status","allowextent"}]
*       post /submit {"stuid": "1234567890", "file": file, "taskid"="12"} => {"status": true/false}
*       post /checkhistory {"stuid": "1234567890"} => {"time", "is"}
*/

let stuid = defineModel();
let idIsValid = ref(null);

let taskList = ref([]);
let selectedTaskID = ref("");

let file = ref(null);

const selectedTaskStatus = computed(() => {
    if (selectedTaskID.value === "") return false;
    else return taskList.value.filter(task=>task.taskid===selectedTaskID.value)[0].status === "fin";
});

watch(selectedTaskID, () => {
    file.value = null;
});

watch(idIsValid, (newVal) => {
    if (newVal) getTaskList();
});

function _postToServer(endpoint, jsondata, cb) {
    console.log('send ' + JSON.stringify(jsondata) + ' to server');
    const url = "http://127.0.0.1:9999" + endpoint;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsondata)
    })
    .then(res => res.json())
    .then(data => {
        console.log('receive data' + JSON.stringify(data));
        cb(data);
    })
    .catch(error => {
        console.log('receive error' + error);
    });
}

function getTaskList() {
    _postToServer('/checktasklist', { "stuid": stuid.value }, data => taskList.value = data);
}

function checkID() {
    if (stuid.value === "") {
        idIsValid.value = null;
    } else {
        _postToServer('/checkid', { "stuid": stuid.value }, data => idIsValid.value = data.result);
    }
}

const amiSelected = (taskid) => {
    return selectedTaskID.value === taskid ? 'selected' : 'not-selected';
};

function handleFileUpload(event) {
    file.value = event.target.files[0];
}

function submitFile() {
    const formData = new FormData();
    formData.append("stuid", stuid.value);
    formData.append("file", file.value);
    formData.append("taskid", selectedTaskID.value);

    fetch("http://127.0.0.1:9999/submit", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        console.log('File upload response:', data.status);
    })
    .catch(error => {
        console.log('File upload error:', error);
    });
}

</script>

<template>
    <div class="flow-area">
        <div class="id-inserter">
            <div>step 1. 输入学号</div>
            <input type="text" v-model="stuid" @blur="checkID"/>
            <div v-if="idIsValid!==null&&!idIsValid">请再次检查学号是否输入错误</div>
        </div>

        <div class="task-list">
            <div>step 2. 选择任务</div>
            <div v-for="task in taskList" :key="task.taskid" @click="selectedTaskID=task.taskid" :class="{'not-selected':task.taskid!==selectedTaskID,'selected':task.taskid===selectedTaskID}">
                taskid: {{ task.taskid }}<br/>
                taskname: {{ task.name }}<br/>
                deadline: {{ task.deadline }}<br/>
                info: {{ task.info }}<br/>
            </div>
        </div>
        <div class="upload-box">
            <div>step 3. 上传文件</div>
            <input type="file" @change="handleFileUpload" />
            <div v-if="file!==null">当前待提交文件: {{ file.name }}</div>
            <button v-if="selectedTaskStatus" @click="submitFile">重新提交</button>
            <button v-else @click="submitFile">提交</button>
        </div>
    </div>
</template>

<style scoped>
.flow-area {
    width: 60%;
}
.selected {
    border: 2px solid greenyellow;
}
.not-selected {
    border: 1px solid transparent;
}
</style>
