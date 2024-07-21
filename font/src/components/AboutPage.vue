<script lang="ts" setup>
</script>

<template>
    <div class="about-page">
        <h3>About EasySubmit.</h3>
        <div class="text-main">
            <div>这是EasySubmit的第2次尝试. 比上一次简洁一些.</div>
            <div>简单来说这是一个vue+express的简易文件收发服务器, 尽可能解决TIM吞文件和命名格式之类的问题.</div>
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

.text-main {
    text-align: start;
    width: 55%;
}

.text-main div {
    margin-bottom: 0.5em;
}
</style>