<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="navbar">
        <div class="icon">
            <RouterLink class="item" to="/">
                <img src="https://www.filemail.com/images/logo/logo-horiz.svg" alt="logo">
            </RouterLink>
        </div>
        <div class="list">
            <RouterLink class="item" to="/upload">提交文件</RouterLink>
            <RouterLink class="item" to="/history">提交记录</RouterLink>
            <RouterLink class="item" to="/about">关于网站</RouterLink>
        </div>
        <a class="github" href="https://github.com/lithiumfleet/easysubmit-v2">
            <img src="https://img.icons8.com/?size=100&id=80462&format=png&color=000000" alt="github">
        </a>
    </nav>
</template>

<style scoped>
.navbar {
    display: flex;
    flex-direction: row;
    width: 100%;
    position: sticky;
    top: 0px;
    padding: 1em 0em 1em 0em;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.8);
    background-clip: border-box;
    backdrop-filter: blur(10px);
}

.icon {
    margin-left: 10%;
}

.icon img {
    width: 80px;
    vertical-align: auto;
}

.list {
    display: inline-flex;
    margin-left: 6%;
}

.list>.item {
    font-weight: 550;
    font-size: xx-small;
    margin-left: 2em;
    color: rgba(26, 26, 40, 0.548) ;


}

.github img {
    width: 25px;
    vertical-align: auto;
    position: absolute;
    right: 5%;
}
</style>