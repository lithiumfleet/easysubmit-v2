<script setup>
import { computed, ref, watch } from 'vue';
import { _postToServer } from './_postToServer';
import { _compareTimeString, formatTimeString } from './_timeUtils';
import UploadFileBox from './UploadFileBox.vue';

/* info: get id from user and validate using server, then show tasklist and file uploader */
/* protocols
*       post /ckeckid {"stuid": "1234567890"} => {"result": true/false}
*       post /checktasklist {"stuid": "1234567890"} => [...{"taskid","name","deadline","info","status","allowextent"}]
*       post /submit {"stuid": "1234567890", "file": file, "taskid"="12"} => {"status": true/false}
*       post /checkhistory {"stuid": "1234567890"} => {"time", "taskid", "taskname", "filename", "coveredfile"}
*/

const stuid = ref(""); // FIXME: what about using const stuid = ref("")? 
const idIsValid = ref(null);

const taskList = ref([]);
const selectedTaskID = ref("");

const file = ref(null);

watch(selectedTaskID, () => {
    file.value = null;
});

watch(idIsValid, (newVal) => {
    if (newVal) getTaskList();
});

function getTaskList() {
    _postToServer('/checktasklist', { "stuid": stuid.value }, data => taskList.value = data);
}

function checkID() {
    idIsValid.value = false;
    if (stuid.value === "") {
        idIsValid.value = null;
    } else {
        _postToServer('/checkid', { "stuid": stuid.value }, data => idIsValid.value = data.result);
    }
}

function checkIfSelected(taskid) {
    return selectedTaskID.value === taskid ? true : false;
}

function handleChangeFile(newFile) {
    file.value = newFile;
}

function submitFile() {
    const formData = new FormData();
    formData.append("stuid", stuid.value);
    formData.append("file", file.value);
    formData.append("taskid", selectedTaskID.value);

    fetch("http://127.0.0.1:9999/submit", {
        method: "POST",
        enctype: "multipart/form-data",
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            console.log('File upload response:', data.uploadstatus);
        })
        .catch(error => {
            console.log('File upload error:', error);
        });
}

function checkTaskStatus(status) {
    return status === "finished" ? true : false;
}

function _printTaskStatus(status) {
    return checkTaskStatus(status) ? "已提交" : "未提交";
}

</script>

<template>
    <div class="flow-area">
        <div class="id-inserter">
            <div v-if="idIsValid">step 1. 输入学号</div>
            <div v-else>请输入学号进行后续操作</div>
            <input type="text" v-model="stuid" @blur="checkID" />
            <div v-if="idIsValid !== null && !idIsValid">请再次检查学号是否输入错误</div>
        </div>



        <div v-if="idIsValid" class="task-list">
            <div>step 2. 选择任务</div>
            <div class="task-card" v-for="task in taskList" :key="task.taskid" @click="selectedTaskID = task.taskid"
                :class="{ 'not-selected': !checkIfSelected(task.taskid), 'selected': checkIfSelected(task.taskid) }">
                <div class="details" v-if="checkIfSelected(task.taskid)">
                    <h3>{{ task.name }}</h3>
                    <div class="info-and-box">
                        <div>
                            <div>任务ID: {{ task.taskid }}</div>
                            <div>截止日期: {{ formatTimeString(task.deadline, 'MMMDo') }}</div>
                            <div class="extent-explain">
                                <div>提交文件类型: </div>
                                <img v-for="extent in task.allowextent" :src="`/src/assets/${extent}.png`"
                                    :alt="extent">
                            </div>
                            <div> 完成情况: {{ _printTaskStatus(task.status) }} </div>
                        </div>
                        <UploadFileBox class="upload-file-box" @change-file="handleChangeFile" :allowed-extent="task.allowextent" />
                    </div>
                    <div class="info-and-button">
                        <p>说明: {{ task.info }}</p>

                        <div v-if="file !== null" class="upload-box">
                            <div>当前待提交文件: {{ file.name }}</div>
                            <button @click="submitFile">点击提交</button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="task-name">{{ task.name }}</div>
                    <div>{{ formatTimeString(task.deadline, 'MMMDo') }} 截止</div>
                    <img class="extent-img" v-for="extent in task.allowextent" :src="`/src/assets/${extent}.png`"
                        :alt="extent">
                    <img class="status-img" v-if="checkTaskStatus(task.status)" src="/src/assets/finish.png"
                        alt="status">
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.flow-area {
    width: 60%;
}

.flow-area>* {
    margin: 2em;
    text-align: center;
}

.id-inserter {
    margin-top: 0;
    text-align: center;
}

.selected {
    border: 1.5px solid greenyellow;
}

.not-selected {
    border: 1px solid transparent;
}

.task-card {
    background-color: rgba(118, 114, 120, 0.09);
    margin: 0.6em;
    border-radius: 15px;
    padding: 1em;
    width: 100%;
    position: relative;
    overflow: hidden;
}

.extent-explain {
    display: inline-flex;
}

.extent-explain img {
    width: 1.5em;
}

.extent-img {
    width: 2em;
}

.status-img {
    position: absolute;
    bottom: -1em;
    right: -1em;
    width: 7em;
}

.details {
    text-align: left;
}

.details h3 {
    text-align: center;    
}

.info-and-box {
    display: flex;
    justify-content: space-between;
    margin-inline-start: 2em;
    margin-inline-end: 2em;
}

.info-and-box .upload-file-box{
    width: 30%;
}

.info-and-button {
    margin-left: 1em;
    margin-right: 1em;
}

.upload-box button {
    background-color: rgba(255, 0, 81, 0.726);
}

.upload-box button:hover {
    background-color: rgba(167, 4, 55, 0.692);
}
</style>
