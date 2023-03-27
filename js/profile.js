// Get the user data from sessionStorage
const userData = JSON.parse(sessionStorage.getItem("user"));
if (userData) {
  // Display the user data
  let step1;
  createStep1(userData);
} else {
  // If user data is not found, redirect to the login page
  window.location.replace("login.html");
}

//==============================================================
//AREAS MODIFICABLES
//==============================================================

let step2;
let step3;
let greeting;

//==============================================================
//VALORES DE PREGUNTA
//==============================================================

let calif;
let aspect;
let comment;

//==============================================================
//CONFIGURACION DE USUARIO
//==============================================================

let users;
let newUser;

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}

let fecha = new Date();

class User {
  constructor(calif, aspect, comment, fecha) {
    this.calif = calif;
    this.aspect = aspect;
    this.comment = comment;
    this.fecha = fecha;
  }
}

function storeUser(user) {
  return users.unshift(user);
}

function storeStorage(user) {
  let storage = localStorage.setItem("users", JSON.stringify(user));
  return storage;
}

//==============================================================
//INICIO DE PROGRAMA
//==============================================================

function createStep1(userData) {
  step1 = document.createElement("section");
  step1.innerHTML = `
      <header>
      <img
        src=${userData.logo}
        class="animate__animated animate__zoomIn"
        alt="sanofi-logo"
        id="logo"
      />
    </header>
      <section id="face-section">
    <div id="q-cont">
      <h1 class="animate__animated animate__zoomIn" id="pregunta">
        ${userData.pregunta}
      </h1>
    </div>
    <div id="face-cont" class="animate__animated animate__zoomIn">
      <button id="face-1" value="1">
        <img src="img/face-1.png" alt="face-1" />
      </button>
      <button id="face-2" value="2">
        <img src="img/face-2.png" alt="face-2" />
      </button>
      <button id="face-3" value="3">
        <img src="img/face-3.png" alt="face-3" />
      </button>
      <button id="face-4" value="4">
        <img src="img/face-4.png" alt="face-4" />
      </button>
    </div>
  </section>`;
  document.body.append(step1);

  document.getElementById("face-1").addEventListener("click", () => {
    calif = "1";
    createStep2(userData);
  });

  document.getElementById("face-2").addEventListener("click", () => {
    calif = "2";
    createStep2(userData);
  });

  document.getElementById("face-3").addEventListener("click", () => {
    calif = "3";
    createStep2(userData);
  });

  document.getElementById("face-4").addEventListener("click", () => {
    calif = "4";
    createStep2(userData);
  });
}

function createStep2(userData) {
  step1.remove();
  step2 = document.createElement("section");
  step2.innerHTML = `<header>
      <img
        src=${userData.logo}
        class="animate__animated animate__zoomIn"
        alt="sanofi-logo"
        id="logo"
      />
    </header>
      <div id="q-cont">
  <h1 class="animate__animated animate__zoomIn" id="pregunta">
  ${userData.pregunta}
  </h1>
  </div>
  <div id="opt">
  <div>
    <h2 class="animate__animated animate__zoomIn" id="subpregunta">
    ${userData.subpregunta}
    </h2>
  </div>
  <div id="opt-cont" class="animate__animated animate__zoomIn">
    ${userData.botones}
    <button id='q6' class='option'>OTROS</button>
  </div>
  </div>`;

  document.body.append(step2);

  if (userData.botonera === "No") {
    createStep3(userData);
  }

  document.getElementById("q1").addEventListener("click", function () {
    aspect = 1;
    createStep3(userData);
  });

  document.getElementById("q2").addEventListener("click", function () {
    aspect = 2;
    createStep3(userData);
  });

  document.getElementById("q3").addEventListener("click", function () {
    aspect = 3;
    createStep3(userData);
  });

  document.getElementById("q4").addEventListener("click", function () {
    aspect = 4;
    createStep3(userData);
  });

  document.getElementById("q5").addEventListener("click", function () {
    aspect = 5;
    createStep3(userData);
  });

  document.getElementById("q6").addEventListener("click", function () {
    aspect = 6;
    createStep3(userData);
  });

  setTimeout(() => {
    pushUser();
    location.reload();
  }, 60000);
}

function createStep3(userData) {
  step2.remove();
  step3 = document.createElement("section");
  step3.innerHTML = `<header>
      <img
        src=${userData.logo}
        class="animate__animated animate__zoomIn"
        alt="sanofi-logo"
        id="logo"
      />
    </header>
      <div id="q-cont">
      <h1 class="animate__animated animate__zoomIn">
        ${userData.mensaje}
      </h1>
      </div>
      <div id="inpt-cont" class="animate__animated animate__zoomIn">
      <textarea name="adicional" id="coment" cols="30" rows="8"></textarea>
      <button id="btn-send">Enviar formulario</button>
      </div>`;
  document.body.append(step3);

  if (userData.cajaTexto === "No") {
    createGreeting();
  }

  document.getElementById("btn-send").addEventListener("click", function () {
    comment = document.getElementById("coment").value;
    pushUser();
    createGreeting();
  });

  setTimeout(() => {
    pushUser();
    location.reload();
  }, 60000);
}

function pushUser() {
  newUser = new User(calif, aspect, comment, fecha.toLocaleString());
  localStorage.setItem("users", JSON.stringify(users));
  storeUser(newUser);
  storeStorage(users);
}

function createGreeting() {
  step3.remove();
  greeting = document.createElement("section");
  greeting.innerHTML = `
    <section id="greeting" class="animate__animated animate__zoomIn">
      <h1>Enviado!</h1>
      <p>Muchas gracias! Que tenga un buen dia</p>
    </section>`;
  document.body.append(greeting);

  if (userData.cajaTexto === "No") {
    pushUser();
  }
  setTimeout(() => {
    location.reload();
  }, 5000);
}
