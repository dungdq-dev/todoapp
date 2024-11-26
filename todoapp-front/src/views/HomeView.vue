<script>
import axios from "axios";
import AddTask from "@/components/AddTask.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import Tasks from "@/components/Tasks.vue";

export default {
  name: "Home",
  components: {
    Header,
    Tasks,
    AddTask,
    Footer,
  },
  data() {
    return {
      tasks: [],
      showAddTask: false,
    };
  },
  async created() {
    await this.fetchTasks();
  },
  methods: {
    async addTask(task) {
      const headers = {
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.post(
          `/api/tasks`,
          task,
          { headers: headers }
        );
        if (response) {
          this.responseMessage = "Form submitted successfully!";
        }
        this.fetchTasks();
      } catch (error) {
        this.responseMessage = "An error occurred: " + error.message;
      }
    },
    async fetchTasks() {
      const response = await axios.get("api/tasks");
      this.tasks = response.data;
    },
    async fetchTask(id) {
      const response = await axios.get(`api/tasks/${id}`);
      return response.data;
    },
    async toggleReminder(id) {
      const taskToToggle = await this.fetchTask(id);
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

      const res = await fetch(`api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updTask),
      });

      this.fetchTasks();
    },
    async deleteTask(id) {
      if (confirm("Are you sure?")) {
        try {
          const response = await axios.delete(`api/tasks/${id}`);
          
          if (response.status === 204) 
            await this.fetchTasks();
        } catch (err) {
          this.error = err.message;
        }
      }
    },
    toggleAddTask() {
      this.showAddTask = !this.showAddTask;
    },
  },
};
</script>

<template>
  <div class="container">
    <Header
      @toggle-add-task="toggleAddTask"
      title="Task Tracker"
      :showAddTask="showAddTask"
    ></Header>
    <div v-show="showAddTask">
      <AddTask @add-task="addTask"></AddTask>
    </div>
    <Tasks
      @toggle-reminder="toggleReminder"
      @delete-task="deleteTask"
      :tasks="tasks"
    ></Tasks>
    <Footer></Footer>
  </div>
</template>
