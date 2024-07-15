<script setup>

</script>

<template>
    <div class="task-card">
        <img class="status" src="https://img.icons8.com/?size=100&id=IMtcTiP3h6cw&format=png&color=000000"/>
        <div class="name">TaskName</div>
        <div class="ddl"></div>
    </div>
</template>

<style scoped>
.task-card {
    margin: 1em;
    border: 1px solid;
    border-color: brown;
    position: relative;
}
.status {
    position: absolute;
    width: 0.8em;
    left: -0.4em;
    top: -0.4em;
}
</style>