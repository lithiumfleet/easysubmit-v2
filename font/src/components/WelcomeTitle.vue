<script setup>
</script>

<template>
    <div class="welcome">
        <h1>欢迎使用 EasySubmit</h1>
        <div>上传word,pdf,zip等文件. 无需担心命名格式和接收问题.</div>
        <div class="nav-area">
            <button class="item" >
                <RouterLink to="/upload">提交文件</RouterLink>
            </button>
            <button class="item" >
                <RouterLink to="/history">查看记录</RouterLink>
            </button>
        </div>
    </div>
</template>

<style scoped>
.welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding-top: 10%;
    padding-bottom: 8%;
    backdrop-filter: blur(5px) brightness(1.2);
}
.welcome h1 {
    font-size:2em;
}

.welcome div {
    color: gray;
    font-weight: 300;
    font-size:larger;
}

.nav-area {
    display: flex;
    margin-top: 2.5em;
    flex-direction: row;
}
.nav-area .item{
    margin-right: 2em;
    border-radius: 6px;
    background-color: rgba(125, 51, 244, 0.583);
    height: 2em;
    border: 5px;
}
.nav-area .item>*{
    color: rgb(240, 250, 255);
    font-weight: bold;
}
</style>