<template>
  <div>
    <Header />
    <p>Histórico</p>

    <li v-for="(task, index) in tasks" :key="index">
      <div class="tasks-li">
        {{ task.name }}
      </div>
    </li>
  </div>
</template>

<script>
import Header from "../components/Header.vue"
export default {
  name: "Historic",
  components: {
    Header,
  },
  watch: {
    "$store.state.tasks.tasks": {
      immediate: true,
      deep: true,
      handler(task) {
        this.tasks = task
      }
    },
  },
  data() {
    return {
      todo: "",
      tasks: [], 
     
    };
  }}
</script>
