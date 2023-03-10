//^
// 
const container = document.createElement('div')
document.body.appendChild(container);
container.classList.add("container");

//^
let arr = [];
let total = 0;

//^
const html = `
      <input type="text" class ='input' placeholder="new todo" />
      <div>
        <h1 class= "todos">
        Todos (<span class="done__todos">0</span>/<span class="total__todos"
            >0</span
            >)
            </h1>
        <ul class="todos-container"></ul>
      </div>
`;
container.insertAdjacentHTML("afterbegin", html);

//^
const todosContainer = document.querySelector(".todos-container");
const totalTodos = document.querySelector(".total__todos");
const doneTodos = document.querySelector(".done__todos");
const todosH1 = document.querySelector(".todos");
const todosInput = document.querySelector('[type="text"]');


//^
let link = `<a href="" class = 'filter-btn'>clear filter</a>`;
todosContainer.insertAdjacentHTML("afterend", link);

const filterbtn = document.querySelector(".filter-btn");
filterbtn.classList.add("hidden");

//^
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") c.call(arr);
});

//^

function c() {
  arr.push(todosInput.value);

  run(arr);

  //^
  todosInput.value = "";
}

//^

function run(arr) {
  console.log(`After run : ${arr}`);


  addTodo(arr);
}

function addTodo(arr) {
  let i = 0;
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => (todo.style.display = "none"));

  total = arr.length;
  totalTodos.textContent = total;

  arr.forEach((todo) => {
    let t = todo.includes("#") ? todo.indexOf("#") : false;
    let word;
    let hash;
    if (todo.includes("#")) {
      word = todo.slice(0, todo.indexOf("#"));
      hash = `<span class= "hash">${todo.slice(todo.indexOf("#"))}</span>`;
    } else {
      word = todo;
      hash = false;
    }
    i++;
    const html = `
    <li class="todo" id ="todo--${i}">
      <input type="checkbox" name="" id="" />
      <p class = 'word'>${word}${hash || ""}</p>
  </li>`;
    todosContainer.insertAdjacentHTML("beforeend", html);

    const hashes = document.querySelectorAll(".hash");
    const checkboxes = document.querySelectorAll('[type="checkbox"]');
    actions(hashes, checkboxes);
  });
}

//^
function actions(hashes, checkboxes) {
  //^
  let done = 0;
  checkboxes.forEach((checkbox) =>
    checkbox.addEventListener("click", function () {
      if (this.checked == true) {
        done++;
        this.nextElementSibling.style.textDecoration = "line-through";
      } else {
        done--;
        this.nextElementSibling.style.textDecoration = "none";
      }
      doneTodos.innerHTML = done;
    })
  );

  //^
  checkboxes.forEach(
    (checkbox) =>
      (checkbox.ondblclick = (event) => {
        if (event.target.checked) {
          console.log(
            arr.findIndex(
              (todo) => todo === event.target.closest(".todo").innerText
            )
          );
          console.log(
            arr[
              arr.findIndex(
                (todo) => todo === event.target.closest(".todo").innerText
              )
            ]
          );

          arr.splice(
            arr.findIndex(
              (todo) => todo === event.target.closest(".todo").innerText
            ),
            1
          );
          event.target.closest(".todo").style.display = "none";
        }
      })
  );

  //^
  hashes.forEach((hash) =>
    hash.addEventListener("click", () => {
      let newHashesArr = [];
      for (let i = 0; i < arr.length; i++) {
        if (window.localStorage.getItem(i).includes(hash.textContent))
          newHashesArr.push(window.localStorage.getItem(i));
      }

      //^
      addTodo(newHashesArr);

      let allTodos = [];
      for (let i = 0; i < arr.length; i++) {
        if (window.localStorage.getItem(i))
          allTodos.push(window.localStorage.getItem(i));
      }

      //^
      filterbtn.classList.remove("hidden");
      filterbtn.addEventListener("click", btn);
      function btn(event) {
        event.preventDefault();

        addTodo(allTodos);

        filterbtn.classList.add("hidden");
        filterbtn.addEventListener("click", btn);
      }
    })
  );
}