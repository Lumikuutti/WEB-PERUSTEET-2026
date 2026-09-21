// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

// add your code here
const ul = document.querySelector('ul');

for (let item of todoList) {
  const li = document.createElement('li');
  const input = document.createElement('input');
  let id = 'todo-' + item.id;

  input.type = 'checkbox';
  input.id = id;
  input.checked = item.completed;

  const label = document.createElement('label');

  label.htmlFor = id;
  label.textContent = item.task;

  li.appendChild(input);
  li.appendChild(label);
  ul.appendChild(li);
  input.addEventListener('click', function (evt) {
    if (item.completed) {
      item.completed = false;
    } else {
      item.completed = true;
    }
    console.log(todoList);
  });
}
