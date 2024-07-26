<script lang="ts" setup>
</script>

<template>
    <div class="about-page">
        <img src="/src/assets/info.png" alt="info">
        <h1>About EasySubmit.</h1>
        <div class="text-main">
            <div>这是EasySubmit的第2次尝试. 比上一次简洁一些.</div>
            <div>这是一个简易文件接收服务器, 尽可能解决TIM吞文件和命名格式之类的问题.</div>
            <div>希望这个toy-project能帮到你.</div>
        </div>
    </div>
</template>

<style scoped>
.about-page {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.about-page h3 {
    margin-top: 2em;
}

.text-main {
    text-align: center;
    margin-top: 2%;
    margin-bottom: 10%;
    width: 55%;
}

.text-main div {
    margin-bottom: 0.5em;
}
</style>