export class Task
{
    constructor(host, id, title, description, dueDate)
    {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.host = host;
    
    }

    crtajTask(host)
    {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task-div");
        this.taskD = taskDiv;
        host.appendChild(taskDiv);

        //get all tasks
const form = document.createElement("form");
form.style.backgroundColor = "#f9dcc4";
const listButtonDiv = document.createElement("div");
const listButton = document.createElement("input");
listButton.type = "button";
listButton.value = "List all tasks";
const taskListDiv = document.createElement("div");

// Add the button to the form
listButtonDiv.appendChild(listButton);
form.appendChild(listButtonDiv);

// Add the task list to the form
form.appendChild(taskListDiv);

// Add the form to the page
document.body.appendChild(form);

// Add a click event listener to the button
listButton.addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:5261/Task/GetTasks");
    const tasks = await response.json();
    console.log(tasks); // do something with the tasks

    // Create an unordered list to display the tasks
    const ul = document.createElement("ul");

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.style.display = "block";
      li.textContent = `${task.id}: ${task.title} - ${task.description} - ${task.employeeId ? 'Assigned to employee ' + task.employeeId : 'Unassigned'} - Due Date: ${new Date(task.dueDate).toLocaleDateString()}`;
      ul.appendChild(li);
     
    });

    // Add the list to the page
    taskListDiv.innerHTML = "";
    taskListDiv.appendChild(ul);
  } catch (error) {
    console.error(error);
  }
});

      //Display top 5 assignees
    const topDiv = document.createElement("div");
    topDiv.classList.add("top-div");
    topDiv.style.backgroundColor = "#219ebc";
    taskDiv.appendChild(topDiv);

    const topButton = document.createElement("div");
    topButton.classList.add("avg-button");
    topDiv.appendChild(topButton);

    const top = document.createElement("input");
    top.type = "button";
    top.value = "Top 5 employees";
    topButton.appendChild(top);

    top.addEventListener("click", async () => {
    try {
    const response = await fetch("http://localhost:5261/Task/GetEmployeesWithMostExpiredTasks");
    const data = await response.json();

    // Manipulate the data as needed, e.g. display it in a list
    const topList = document.createElement("ul");
    topDiv.appendChild(topList);

    data.forEach(item => {
      const listItem = document.createElement("li");
      listItem.textContent = `Employee ID: ${item.employeeId}, Done Tasks: ${item.expiredTaskCount}`;
      topList.appendChild(listItem);
    });
  } catch (error) {
    console.error(error);
  }
});


    }
}