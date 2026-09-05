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
  let id = 'todo-' + item.id;
  let task = '<label for="' + id + '">' + item.task + '</label>';
  if (item.completed) {
    const htmlinput = '<input type="checkbox" id="' + id + '" checked></input>';
    let li = '<li>' + htmlinput + task + '</li>';
    ul.insertAdjacentHTML('beforeend', li);
  } else {
    const htmlinput = '<input type="checkbox" id="' + id + '"></input>';
    let li = '<li>' + htmlinput + task + '</li>';
    ul.insertAdjacentHTML('beforeend', li);
  }
}
