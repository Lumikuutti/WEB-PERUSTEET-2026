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
function createTask(item) {
  const li = document.createElement('li');
  const input = document.createElement('input');
  let id = 'todo-' + item.id;

  input.type = 'checkbox';
  input.id = id;
  input.checked = item.completed;

  const button = document.createElement('button');
  button.textContent = 'X';
  button.id = item.id;

  const label = document.createElement('label');

  label.htmlFor = id;
  label.textContent = item.task;

  li.appendChild(input);
  li.appendChild(button);
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

  button.addEventListener('click', function (evt) {
    const list = this.parentElement;
    ul.removeChild(list);
    if (todoList.length > item.id) {
      todoList.splice(item.id - 1, 1);
    } else {
      todoList.pop();
    }
    console.log(todoList);
  });
}

const ul = document.querySelector('ul');
const dialog = document.querySelector('dialog');
const addBtn = document.querySelector('.add-btn');
addBtn.addEventListener('click', function (evt) {
  dialog.show();
});

const form = document.querySelector('form');
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const task = document.getElementById('grab').value;
  console.log(task);
  const newItem = {id: todoList.length + 1, task: task, completed: false};
  todoList.push(newItem);
  createTask(newItem);
  console.log(todoList);
  dialog.close();
});

for (let item of todoList) {
  // const li = document.createElement('li');
  // const input = document.createElement('input');
  // let id = 'todo-' + item.id;

  // input.type = 'checkbox';
  // input.id = id;
  // input.checked = item.completed;

  // const button = document.createElement('button');
  // button.textContent = 'X';
  // button.id = item.id;

  // const label = document.createElement('label');

  // label.htmlFor = id;
  // label.textContent = item.task;

  // li.appendChild(input);
  // li.appendChild(button);
  // li.appendChild(label);
  // ul.appendChild(li);
  // input.addEventListener('click', function (evt) {
  //   if (item.completed) {
  //     item.completed = false;
  //   } else {
  //     item.completed = true;
  //   }
  //   console.log(todoList);
  // });

  // button.addEventListener('click', function (evt) {
  //   const list = this.parentElement;
  //   ul.removeChild(list);
  //   if (todoList.length > item.id) {
  //     todoList.splice(item.id - 1, 1);
  //   } else {
  //     todoList.pop();
  //   }
  //   console.log(todoList);
  // });
  createTask(item);
}
