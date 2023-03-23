//==============================================================
//FILTRADO POR TOKEN
//==============================================================
let btn_acceder = document.getElementById("btn_acceder");
let token = document.getElementById("token");

let filtrado;

function find_client(array) {
  const client = token.value;
  return array.filter((item) => {
    if (typeof item.id !== "string") {
      item.id = String(item.id);
    }
    return item.id.includes(client);
  });
}

btn_acceder.addEventListener("click", async () => {
  try {
    const response = await fetch("../data/data.json");
    const data = await response.json();
    filtrado = find_client(data);
    createStep1(filtrado);
  } catch (error) {
    console.error(error);
  }
});

//==============================================================
//AREAS MODIFICABLES
//==============================================================

let step1;
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

function createStep1(array) {
  btn_acceder.remove();
  token.remove();
  array.forEach((client) => {
    step1 = document.createElement("section");
    step1.innerHTML = `
    <header>
    <img
      src=${client.logo}
      class="animate__animated animate__zoomIn"
      alt="sanofi-logo"
      id="logo"
    />
  </header>
    <section id="face-section">
  <div id="q-cont">
    <h1 class="animate__animated animate__zoomIn" id="pregunta">
      ${client.pregunta}
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
  });

  document.getElementById("face-1").addEventListener("click", () => {
    calif = "1";
    createStep2(filtrado);
  });

  document.getElementById("face-2").addEventListener("click", () => {
    calif = "2";
    createStep2(filtrado);
  });

  document.getElementById("face-3").addEventListener("click", () => {
    calif = "3";
    createStep2(filtrado);
  });

  document.getElementById("face-4").addEventListener("click", () => {
    calif = "4";
    createStep2(filtrado);
  });
}

function createStep2(array) {
  step1.remove();
  array.forEach((client) => {
    step2 = document.createElement("section");
    step2.innerHTML = `<header>
    <img
      src=${client.logo}
      class="animate__animated animate__zoomIn"
      alt="sanofi-logo"
      id="logo"
    />
  </header>
    <div id="q-cont">
<h1 class="animate__animated animate__zoomIn" id="pregunta">
${client.pregunta}
</h1>
</div>
<div id="opt">
<div>
  <h2 class="animate__animated animate__zoomIn" id="subpregunta">
  ${client.subpregunta}
  </h2>
</div>
<div id="opt-cont" class="animate__animated animate__zoomIn">
  ${client.botones}
  <button id='q6' class='option'>OTROS</button>
</div>
</div>`;

    document.body.append(step2);

    if (client.botonera === "No") {
      createStep3(filtrado);
    }
  });

  document.getElementById("q1").addEventListener("click", function () {
    aspect = 1;
    createStep3(filtrado);
    clearTimeout(step2_TO1);
    clearTimeout(step2_TO2);
    clearTimeout(step2_TO3);
  });

  document.getElementById("q2").addEventListener("click", function () {
    aspect = 2;
    createStep3(filtrado);
    clearTimeout(step2_TO1);
    clearTimeout(step2_TO2);
    clearTimeout(step2_TO3);
  });

  document.getElementById("q3").addEventListener("click", function () {
    aspect = 3;
    createStep3(filtrado);
    clearTimeout(step2_TO1);
    clearTimeout(step2_TO2);
    clearTimeout(step2_TO3);
  });

  document.getElementById("q4").addEventListener("click", function () {
    aspect = 4;
    createStep3(filtrado);
    clearTimeout(step2_TO1);
    clearTimeout(step2_TO2);
    clearTimeout(step2_TO3);
  });

  document.getElementById("q5").addEventListener("click", function () {
    aspect = 5;
    createStep3(filtrado);
    clearTimeout(step2_TO1);
    clearTimeout(step2_TO2);
    clearTimeout(step2_TO3);
  });

  document.getElementById("q6").addEventListener("click", function () {
    aspect = 6;
    createStep3(filtrado);
    clearTimeout(step2_TO1);
    clearTimeout(step2_TO2);
    clearTimeout(step2_TO3);
  });

  let step2_TO1 = setTimeout("createStep1(filtrado)", 6000);
  let step2_TO2 = setTimeout("step2.remove()", 6000);
  let step2_TO3 = setTimeout("pushUser()", 6000);
}

function createStep3(array) {
  step2.remove();
  array.forEach((client) => {
    step3 = document.createElement("section");
    step3.innerHTML = `<header>
    <img
      src=${client.logo}
      class="animate__animated animate__zoomIn"
      alt="sanofi-logo"
      id="logo"
    />
  </header>
    <div id="q-cont">
    <h1 class="animate__animated animate__zoomIn">
      ${client.mensaje}
    </h1>
    </div>
    <div id="inpt-cont" class="animate__animated animate__zoomIn">
    <textarea name="adicional" id="coment" cols="30" rows="8"></textarea>
    <button id="btn-send">Enviar formulario</button>
    </div>`;
    document.body.append(step3);
    if (client.cajaTexto === "No") {
      createGreeting();
    }
  });

  document.getElementById("btn-send").addEventListener("click", function () {
    comment = document.getElementById("coment").value;
    createGreeting();
    pushUser();
    clearTimeout(step3_TO1);
    clearTimeout(step3_TO2);
    clearTimeout(step3_TO3);
  });
  let step3_TO1 = setTimeout("createStep1(filtrado)", 5000);
  let step3_TO2 = setTimeout("step3.remove()", 5000);
  let step3_TO3 = setTimeout("pushUser();", 5000);
}

function pushUser() {
  newUser = new User(calif, aspect, comment, fecha.toLocaleString());
  localStorage.setItem("users", JSON.stringify(users));
  storeUser(newUser);
  storeStorage(users);
  calif = "";
  aspect = "";
  comment = "";
  fecha = new Date();
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
  setTimeout("createStep1(filtrado)", 5000);
  setTimeout("greeting.remove()", 5000);
}
