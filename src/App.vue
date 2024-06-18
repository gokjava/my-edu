<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  setup() {
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: var(--el-font-family);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizelegibility;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

.font-color-primary-brand-9 {
  color: #ECF5FF;
}
.bg-color-primary-brand-9 {
  background-color: #ECF5FF;
}

.bg-color-primary-brand-10 {
  background-color: #C6E2FF;
}

.one-line-ellipsis {
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 使用省略号表示溢出内容 */
}

</style>
