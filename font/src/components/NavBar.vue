<script setup>
</script>

<template>
    <nav class="navbar">
        <div class="icon"> 
            <img src="https://www.filemail.com/images/logo/logo-horiz.svg" alt="logo">
        </div>
        <div class="direct"> </div>
            <div class="list">
                <div>提交文件</div>
                <div>提交记录</div>
                <div>关于网站</div>
            </div>
        <div class="github"> 
            <img src="https://img.icons8.com/?size=100&id=80462&format=png&color=000000" alt="github">
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    display: flex;
    flex-direction: row;
    width:100%;
    position: sticky;
    top: 0px;
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

.list div{
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