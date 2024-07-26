<script setup>
</script>

<template>
    <div class="welcome">
        <img class="paper-plane" src="/src/assets/plane.png" alt="plane">
        <h1>欢迎使用 EasySubmit</h1>
        <div>上传word,pdf,zip等文件. 无需担心命名格式和接收问题.</div>
        <div class="nav-area">
            <button class="item nav-upload" >
                <RouterLink class="router" to="/upload"><div class="text" >提交文件</div></RouterLink>
            </button>
            <button class="item nav-history" >
                <RouterLink class="router" to="/history"><div class="text">查看记录</div></RouterLink>
            </button>
        </div>
    </div>
</template>

<style scoped>
.paper-plane {
    position: absolute;
    right: 22%;
    top: 8%
}
.welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding-top: 10%;
    padding-bottom: 8%;
    /* backdrop-filter: blur(5px) brightness(1.2); */
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
    padding: 2em;
    margin-right: 2em;
    border-radius: 6px;
    height: 2em;
    border: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.nav-upload {
    background-color: rgb(109, 118, 234);
}
.nav-upload .router {
    text-decoration: none;
}
.nav-upload .router .text {
    font-weight: bold;
    color: rgb(255, 255, 255);
    font-size: 1.2em;
}
.nav-history {
    background-color: rgb(234, 234, 235);
}
.nav-history .router {
    text-decoration: none;
}
.nav-history .router .text {
    font-weight: bold;
    color: black;
    font-size: 1.2em;
}
</style>