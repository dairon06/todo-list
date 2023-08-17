const d = document;

const fecha = d.querySelector("#fecha");
const lista = d.querySelector("#lista");
const input = d.querySelector("#input");
const botonEnter = d.querySelector("#enter");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";
let id;
let LIST;

//CREACION DE FECHA
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString("es-CO", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

//funcion agg tarea
function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) {
    return;
  }

  const REALIZADO = realizado ? check : uncheck;
  const LINE = realizado ? lineThrough : "";

  const elemento = ` <li id="elemento">
  <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
  <p class="text ${LINE}">${tarea}</p>
  <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
  `;
  lista.insertAdjacentHTML("beforeend", elemento);
}

//FUNCION DE TAREA REALIZADA

function tareaRealizada(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}

//FUNCION TAREA ELIMINADA

function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].eliminado = true;
}

botonEnter.addEventListener("click", () => {
  const tarea = input.value;
  if (tarea) {
    agregarTarea(tarea, id, false, false);
    LIST.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false,
    });
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
  input.value = "";
  id++;
});

d.addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    const tarea = input.value;
    if (tarea) {
      agregarTarea(tarea, id, false, false);
      LIST.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false,
      });
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
    input.value = "";
    id++;
  }
});

lista.addEventListener("click", function (e) {
  const element = e.target;
  const elementData = element.attributes.data.value;
  if (elementData === "realizado") {
    tareaRealizada(element);
  } else if (elementData === "eliminado") {
    tareaEliminada(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

//LOCAL STORAGE GET ITEM

let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  cargarLista(LIST);
} else {
  LIST = [];
  id = 0;
}

function cargarLista(DATA) {
  DATA.forEach(function (i) {
    agregarTarea(i.nombre, i.id, i.realizado, i.eliminado);
  });
}
