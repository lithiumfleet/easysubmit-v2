<script lang="ts" setup>
import WelcomeTitle from './WelcomeTitle.vue';
</script>

<template>
    <div class="title">
        <WelcomeTitle />
    </div>
    <div class="about">
        <div class="text-main">
            <div class="intro">
                <div class="h">稳定</div>
                <div class="p">easysubmit相较于TIM更不容易吞文件</div>
            </div>
            <div class="intro">
                <div class="h">便捷</div>
                <div class="p">文件自动重命名;可覆盖提交文件</div>
            </div>
            <div class="intro">
                <div class="h">快速</div>
                <div class="p">使用国内VPS,延时更低</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.title {
    background-image: url("/src/assets/paperplane.png");
    background-size: 100% 200%;
    z-index: -1;
    box-shadow: 0 0 200px 5px #ffffff inset;
    height: 60%;
}

.user-area {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.about {
    background-color: white;
    height: 30%;
    margin-bottom: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
}

.text-main {
    margin-top: 4%;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.text-main .intro {
    margin: 1em;
    width: 33%;
    border: #dfe1e3 1px;
    padding: 1em;
    border-radius: 5px;
    background-color: whitesmoke;
}

.intro {
    height: 4em;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.intro .h {
    font-size: 0.8em;
    font-weight: bold;
}

.intro .p {
    font-size: 0.6em;
}
</style>