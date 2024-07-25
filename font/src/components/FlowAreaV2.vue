<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { rooturl } from '../config';
import { _postToServer } from './_postToServer';
import { _compareTimeString, formatTimeString } from './_timeUtils';
import UploadFileBox from './UploadFileBox.vue';


const stuid = ref(""); // FIXME: what about using const stuid = ref("")? 
const idIsValid = ref(null);

const taskList = ref([]);
const selectedTaskID = ref("");

const file = ref(null);

enum Status {
    // for page state
    noUploading,
    uploading,
    failed,
    unknownerror,
    // for server response
    ok = "ok",
    emptyfile = "emptyfile",
    timeout = "timeout"
}

const uploadStatus: Status = ref(Status.noUploading);
const uploadStatusMessage = ref("");

watch(selectedTaskID, () => {
    file.value = null;
    uploadStatus.value = Status.noUploading;
    uploadStatusMessage.value = "";
});

watch(idIsValid, (newVal) => {
    if (newVal) getTaskList();
});

function getTaskList() {
    _postToServer('/checktasklist', { "stuid": stuid.value }, data => taskList.value = data);
}

function checkID() {
    idIsValid.value = null;
    if (stuid.value !== "") {
        _postToServer('/checkid', { "stuid": stuid.value }, data => idIsValid.value = data.result);
    }
}

function checkIfSelected(taskid: string) {
    return selectedTaskID.value === taskid ? true : false;
}

function handleChangeFile(newFile: string) {
    file.value = newFile;
}

function submitFile() {
    const formData = new FormData();
    formData.append("stuid", stuid.value);
    formData.append("taskid", selectedTaskID.value);
    formData.append("file", file.value);

    uploadStatus.value = Status.uploading;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    fetch(`${rooturl}/submit`, {
        method: "POST",
        enctype: "multipart/form-data",
        body: formData,
        signal: controller.signal
    })
        .then(res => res.json())
        .then(data => {
            clearTimeout(timeoutId);
            console.log('File upload response:', data.status, data.message);
            uploadStatus.value = data.status;
            uploadStatusMessage.value = data.message;
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                console.log('File upload timed out');
                uploadStatus.value = Status.timeout;
                uploadStatusMessage.value = "文件提交超时";
            } else {
                console.log('File upload error:', error);
                uploadStatus.value = Status.unknownerror;
                uploadStatusMessage.value = "请检查网络环境或联系管理员";
            }
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
            <img v-if="!idIsValid" src="/src/assets/lock.png" alt="locked">
            <img v-else src="/src/assets/uploadfile.png" alt="locked">
            <div v-if="idIsValid">当前学号</div>
            <div v-else>请输入学号进行后续操作</div>
            <input @keyup.enter="checkID" type="text" v-model="stuid" @blur="checkID" />
            <div v-if="idIsValid !== null && !idIsValid">请再次检查学号是否输入错误</div>
        </div>

        <div v-if="idIsValid" class="task-list-warp">
            <div class="prompt">选择任务</div>
            <div class="task-list">
                <div class="task-card" v-for="task in taskList" :key="task.taskid" @click="selectedTaskID = task.taskid"
                    :class="{ 'not-selected': !checkIfSelected(task.taskid), 'selected': checkIfSelected(task.taskid) }">
                    <div class="details" v-if="checkIfSelected(task.taskid)">
                        <h3>{{ task.name }}</h3>
                        <div class="info-and-box">
                            <div>
                                <div>任务ID: {{ task.taskid }}</div>
                                <div>截止日期: {{ formatTimeString(task.deadline, 'MMMDo') }}</div>
                                <div class="extent-explain">
                                    <div>文件类型: </div>
                                    <img v-for="extent in task.allowextent" :src="`/src/assets/${extent}.png`"
                                        :alt="extent">
                                </div>
                                <div>完成情况: {{ _printTaskStatus(task.status) }} </div>
                            </div>
                            <UploadFileBox class="upload-file-box" @change-file="handleChangeFile"
                                :allowed-extent="task.allowextent" />
                        </div>
                        <div class="task-desc-area">
                            <p>说明: {{ task.info }}</p>
                        </div>
                        <div class="upload-button">
                            <div v-if="file !== null">
                                <div v-if="uploadStatus === Status.noUploading" class="upload-box isnormal">
                                    <div>当前待提交文件: {{ file.name }}</div>
                                    <button v-if="checkTaskStatus(task.status)" @click="submitFile">再次提交</button>
                                    <button v-else @click="submitFile">点击提交</button>
                                </div>
                                <div v-else-if="uploadStatus === Status.uploading" class="upload-box isuploading">
                                    <div>当前待提交文件: {{ file.name }}</div>
                                    <button disabled @click="submitFile">处理中,请勿离开页面...</button>
                                </div>
                                <div v-else>
                                    <div v-if="uploadStatus === Status.ok" class="upload-box isnormal">
                                        <div>{{ uploadStatusMessage }}</div>
                                        <button @click="submitFile">重新提交</button>
                                    </div>
                                    <div v-else class="upload-box isfailed">
                                        <div>{{ uploadStatusMessage }}</div>
                                        <button @click="submitFile">重新提交</button>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                    <div class="thumbnail" v-else>
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
    </div>
</template>

<style scoped>
.flow-area {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.id-inserter {
    margin: 2em;
    margin-top: 0;
    text-align: center;
}

.id-inserter>* {
    margin: 0.6rem;
}

.task-list-warp {
    width: 60%;
    margin-left: 20%;
}

.task-list-warp .prompt {
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
    box-shadow: 3px 3px 5px rgb(150, 174, 176);
}

.extent-explain {
    display: inline-flex;
}

.extent-explain img {
    width: 1.2em;
    height: 1.2em;
    padding-left: 0.3em;
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

.info-and-box .upload-file-box {
    width: 35%;
}

.task-desc-area {
    margin-left: 1em;
    margin-right: 1em;
}

.upload-button {
    margin-left: 1em;
    margin-right: 1em;
}

.upload-box.isuploading button {
    background-color: rgba(182, 179, 181, 0.953);
    border-radius: 10px;
}

.upload-box.isfailed,
.upload-box.isuploading,
.upload-box.isnormal {
    font-size: xx-small;
}

.upload-box.isfailed button {
    background-color: rgba(255, 0, 81, 0.726);
    border-radius: 10px;
}

.upload-box .isfailed button:hover {
    background-color: rgba(167, 4, 55, 0.692);
}

.upload-box.isnormal button {
    background-color: rgba(102, 244, 67, 0.823);
    border-radius: 10px;
}

.upload-box .isnormal button:hover {
    background-color: rgba(8, 166, 32, 0.783);
}
</style>
