const output = document.querySelector("#output");
const button = document.querySelector("#get-tasks-btn");
const form = document.querySelector("#add-task-form");

// Get and show tasks
async function showTasks() {
  try {
    const res = await fetch("http://localhost:5000/api/tasks");
    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const tasks = await res.json();
    output.innerHTML = "";

    tasks.forEach((task) => {
      const taskEl = document.createElement("div");
      taskEl.textContent = task.title;
      output.appendChild(taskEl);
    });
  } catch (error) {
    console.log("Error fetching tasks: ", error);
  }

  // Event listeners
  button.addEventListener("click", showTasks);
}
