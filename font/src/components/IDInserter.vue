<script setup>
import { ref } from 'vue'
let idString = new String();
let status = ref(true);

function sendID(id) {
    const req = new XMLHttpRequest();
    const url = "http://localhost:9999/api/upload_id/";
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            let json = JSON.parse(req.responseText);
        }
    };
    let data = JSON.stringify({"stu_id": id});
    req.send(data);
}

function parseIDString(input) {
    input = input.trim();
    const pattern = /^\d{10}$/;
    if (pattern.test(input)) {
        return parseInt(input, 10);
    } else {
        throw new Error(`Invalid input: ${input}`);
    }
}


function printToConsole(idString) {
    console.debug(`current id string: ${idString}`);
}

function handleBlur() {
    printToConsole(idString);
    try {
        let id = parseIDString(idString);
        sendID(id);
    } catch(err) {
        console.debug(err);
    }
}

</script>

<template>
    <div>
        <div class="notice">
            Step 1. 输入学号
        </div>
        <input class="input" v-model="idString" @blur="handleBlur" type="string" />
    </div>
</template>

<style scoped>
.notice {
    margin-bottom: 10px;
    font-size: small;
}
</style>