let tasks = JSON.parse(localStorage.getItem("tasks"))||[]

console.log(tasks)

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks))
}

console.log(saveTasks())

function renderTasks(taskList = tasks){
    const ul = document.getElementById("task-list")
    ul.innerHTML =""
    taskList.forEach((task,index) => {
        const li = document.createElement("li")
        
        li.innerHTML = `
       <input type="checkbox" onchange = "toggleCompletethis(${index})" ${task.completed ?"checked":""}>
        <span>${task.text}</span>
        <div class="menu">
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
        </div>`;

        ul.appendChild(li)
        
    });
}

console.log(renderTasks())

function addTask(){
    const input = document.getElementById("task-input")
    const tasktext = input.value.trim();
    if(tasktext === "") {
        alert("Please enter your task")
        return
    }

    tasks.push({text:tasktext, completed:false})
    saveTasks()
    renderTasks();
    input.value =""
}


function toggleCompletethis(index){
    tasks[index].completed = !tasks[index].completed;

     
    saveTasks();
    renderTasks();

}

function deleteTask(index){
    tasks.splice(index,1)
    saveTasks()
    renderTasks()
}

function editTask(index){
    const  newText = prompt("Edit task:",tasks[index].text)
    if(newText !== null && newText.trim() !== ""){
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks()

    }
}

function searchTasks() {
  const input = document.getElementById("search-input");
  const query = input.value.trim().toLowerCase();

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(query)
  );

  renderTasks(filteredTasks);  // pass filtered list
}


renderTasks()
 
