const uncheckedIcon = new Image();
uncheckedIcon.src = 'images/unchecked.png';

const checkedIcon = new Image();
checkedIcon.src = 'images/checked.png';

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = document.createElement('li');

    const checkBtn = document.createElement('img');
    checkBtn.src = task.completed ? checkedIcon.src : uncheckedIcon.src;
    checkBtn.classList.add('check-icon');

    const span = document.createElement('span');
    span.textContent = task.text;

    const delBtn = document.createElement('button');
    delBtn.textContent = '✖';
    delBtn.classList.add('delete');

    if(task.completed) li.classList.add('completed');

    checkBtn.addEventListener('click', () => {
      li.classList.toggle('completed');
      checkBtn.src = li.classList.contains('completed') ? checkedIcon.src : uncheckedIcon.src;
      saveTasks();
    });

    delBtn.addEventListener('click', () => {
      li.remove();
      saveTasks();
    });

    li.appendChild(checkBtn);
    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const li = document.createElement('li');

  const checkBtn = document.createElement('img');
  checkBtn.src = uncheckedIcon.src;
  checkBtn.classList.add('check-icon');

  const span = document.createElement('span');
  span.textContent = text;

  const delBtn = document.createElement('button');
  delBtn.textContent = '✖';
  delBtn.classList.add('delete');

  checkBtn.addEventListener('click', () => {
    li.classList.toggle('completed');
    checkBtn.src = li.classList.contains('completed') ? checkedIcon.src : uncheckedIcon.src;
    saveTasks();
  });

  delBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(checkBtn);
  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);

  taskInput.value = '';
  taskInput.focus();

  saveTasks();
}

window.addEventListener('DOMContentLoaded', loadTasks);
