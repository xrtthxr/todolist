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
    if (li.classList.contains('completed')) {
      checkBtn.src = checkedIcon.src; // usar precargada
    } else {
      checkBtn.src = uncheckedIcon.src; // usar precargada
    }
  });

  delBtn.addEventListener('click', () => li.remove());

  li.appendChild(checkBtn);
  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);

  taskInput.value = '';
  taskInput.focus();
}
