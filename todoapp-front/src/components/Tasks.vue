<script>
import Task from "./Task.vue";

export default {
  name: "Tasks",
  components: {
    Task,
  },
  props: {
    tasks: Array,
  },
  emits: ["delete-task", "toggle-reminder"],
};
</script>

<template>
  <div :key="task._id" v-for="task in tasks">
    <Task
      @toggle-reminder="$emit('toggle-reminder', task._id)"
      @delete-task="$emit('delete-task', task._id)"
      :task="task"
    ></Task>
  </div>
</template>
