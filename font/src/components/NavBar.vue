<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="navbar">
        <div class="icon"> 
            <img src="https://www.filemail.com/images/logo/logo-horiz.svg" alt="logo">
        </div>
        <div class="direct"> </div>
            <div class="list">
                <RouterLink class="item" to="/">提交文件</RouterLink>
                <RouterLink class="item" to="/history">提交记录</RouterLink>
                <div class="item" >关于网站</div>
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
    width:100%;
    position: sticky;
    top: 0px;
    padding: 1em;
    z-index: 1000;
    background-color: whitesmoke;
    background-clip: border-box;
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

.list > .item {
    font: bold;
    font-size: small;
    margin-left: 1em;
}

.github img {
    width: 25px;
    vertical-align: auto;
    position: absolute;
    right: 5%;
}
</style>