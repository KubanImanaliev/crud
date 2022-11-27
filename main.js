

//?  вытаскиваем элементы
let btn = document.querySelector(".btn");
let inp = document.querySelector(".task-input");
let list = document.querySelector(".task-list");
let inpMail = document.querySelector('.task-input1');
let inpPhone = document.querySelector('.task-input2');
let inpImg = document.querySelector('.task-input3');


//?  добавляем слушатель событий на кнопку
btn.addEventListener("click", () => {
  //? добавляем проверку на заполненность поля
  if (!inp.value.trim() || !inpMail.value.trim() || !inpPhone.value.trim() || !inpImg.value.trim()) {
    alert("заполните поле");
    return;
  }

 
  //? формируем обьект таска, под ключом task добавляем значение из input'а
  let obj = { name: inp.value, email: inpMail.value , phone: inpPhone.value, imageUrl: inpImg.value};

  //? вызов функций для отправки данных в localStorage
  setItemStorage(obj);
});

//? функция для добавления в localStorage
function setItemStorage(task) {
  //? делаем проверку на то, есть ли в localStorage данные под ключом tasks-data, если нет, то под ключом tasks-data создаем пустой массив
  if (!localStorage.getItem("tasks-data")) {
    localStorage.setItem("tasks-data", "[]");
  }
  //? вытаскиваем данные из localStorage
  let data = JSON.parse(localStorage.getItem("tasks-data"));

  //? добавляем в массив новый таск
  data.push(task);
  //? отправляем обнавленный массив в localStorage
  localStorage.setItem("tasks-data", JSON.stringify(data));
}
//? вызов функции
createElement();

//? функция для отрисовки элементов в браузере
function createElement() {
  //? вытаскиваем данные из localStorage

  let newData = JSON.parse(localStorage.getItem("tasks-data"));

  //? очищаем список от предыдущих элементов
  list.innerHTML = "";

  //? перебираем массив с данными и на каждый элемент массива создаем li с кнопками и с текстом
  newData.forEach((item, index) => {
    let li = document.createElement("li");
    let name = document.createElement('div');
    let email = document.createElement('div');
    let phone = document.createElement('div');
    let imageUrl = document.createElement('img');
    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");

    li.classList.add('li');
    imageUrl.setAttribute('width', 100);
    imageUrl.setAttribute('height', 100);

    email.classList.add('ml');
    phone.classList.add('ml');
    imageUrl.classList.add('ml');
    btnDelete.classList.add('auto');
    btnEdit.classList.add('ml');

    // 
    name.innerText = item.name;
    email.innerText = item.email;
    phone.innerText = item.phone;
    imageUrl.setAttribute('src', item.imageUrl);
    btnDelete.innerText = "Delete";
    btnEdit.innerText = " Edit";
    li.append(name);
    li.append(email);
    li.append(phone);
    li.append(imageUrl);
    li.append(btnDelete);
    li.append(btnEdit);
    // навешиваем слушатель событий на кнопку delete
    btnDelete.addEventListener("click", () => {
      deleteElement(index);
    });

    btnEdit.addEventListener("click", () => {
      editElement(index);
    });

    list.append(li);
  });
}

//? функция для удаления таска
function deleteElement(index) {
  //? вытаскиваем массив данных из localStorage
  let data = JSON.parse(localStorage.getItem("tasks-data"));
  //? удаляем 1й элемент по индексу из массива
  data.splice(index, 1);
  //? помещаем обновленный массив (без одного элемента в localStorage)
  localStorage.setItem("tasks-data", JSON.stringify(data));
  createElement();
}

//! modal

//? вытаскиваем все элементы модального окна
let mainModal = document.querySelector(".main-modal");
let inpEdit = document.querySelector(".inp-edit");
let btnClose = document.querySelector(".close");
let btnSave = document.querySelector(".btn-save");
let inpName = document.querySelector('.inp-name');
let inpEmail =document.querySelector('.inp-email');
let inpPhonne = document.querySelector('.inp-phone');
let imgUrl = document.querySelector('.img-Url');

//? функция для редактирования
function editElement(index) {
  //? открывает модальное окно
  mainModal.style.display = "block";
  //? вытаскиваем массив с данными из localStorage
  let data = JSON.parse(localStorage.getItem("tasks-data"));
  //? задаем аттрибут id инпуту в модалке
  inpEdit.setAttribute("id", index);
  //? помещаем данные редактируемого таска в инпут
  inpEdit.value = data[index].name;
  inpEmail.value = data[index].email;
  inpPhonne.value = data[index].phone;
  imgUrl.value = data[index].imageUrl;
}
//? на крестик модалки вешаем слушатель событий для закрытия
btnClose.addEventListener("click", () => {
  mainModal.style.display = "none";
});
//? функция сохранения изменений
btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("tasks-data"));
  //? получаем индекс
  let index = inpEdit.id;
  //? проверка на отправку пустого массива
  if (!inpEdit.value.trim()) {
    alert("заполните поле");
    return;
  }

  //? формируем новый обьект с обнавленными данными
  let newTask = { name: inpEdit.value, email: inpEmail.value , phone: inpPhonne.value, imageUrl: imgUrl.value};
  //? обнавляем массив data
  data.splice(index, 1, newTask);
  //? отправляем обнавленный массив в localStorage
  localStorage.setItem("tasks-data", JSON.stringify(data));
  //? закрываем модалку
  mainModal.style.display = "none";
  //? вызываем функцию отображения
  createElement();
});

// имя , фамилия, адрес, номер
