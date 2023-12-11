const button = document.querySelector(".button-add-task");
const task = document.querySelector(".input-task");
const fullList = document.querySelector(".list-tasks");

let itemsList = [];

const addNewTask = () => {
  itemsList.push({
    task: task.value,
    complete: false
  });

  task.value = '';  

  showTasks();
}

const showTasks = () => {

  let newLi = '';

  itemsList.forEach((item, index) => {
    newLi = newLi +
      `
      <li class="task ${item.complete && "done"}">
        <img src="./img/checked.png" alt="check task" onclick="completeTask(${index})">
        <p>${item.task}</p>
        <img src="./img/trash.png" alt="task for the trash" onclick="deleteItem(${index})">
      </li>
    `
  });

  fullList.innerHTML = newLi;

  localStorage.setItem('list', JSON.stringify(itemsList));
}

const completeTask = (index) => {
  itemsList[index].complete = !itemsList[index].complete;
  
  showTasks();
}

const deleteItem = (index) => {
  itemsList.splice(index, 1);

  showTasks();
}

const reloadTasks = () => {
  const localStorageTasks = localStorage.getItem('list');

  if (localStorageTasks) {
    itemsList = JSON.parse(localStorageTasks);
  }

  showTasks();
}

reloadTasks();
button.addEventListener('click', addNewTask);