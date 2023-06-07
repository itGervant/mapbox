<template>
    <div class="header">
        <router-link class='link' to="/">Карта</router-link>
        <router-link class='link' to="/list">Информация</router-link>
        <router-link class='link' to="/stats">Статистика</router-link>
    </div>
</template>

<script>
export default {
    name: 'MyHeader'
}
</script>

<style scoped>
.header {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: black;
    border-bottom: 1px solid lightgray;
}

.link {
    padding: 10px;
    margin: 10px;

}


</style>