<template>
  <div id="app">
    <MyHeader />
    <router-view/>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue';

export default {
  name: 'App',
  components: {
    MyHeader
  }
}
</script>

<style>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 1920px;
 
}

a {
  text-decoration: none;
  color: white;
}
</style>
