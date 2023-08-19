const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const elemento = document.querySelector("#elemento");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#boton-enter");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";
let LIST = [];

let id = 0;

//creacion de fecha actualizada

const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString("es-CO", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// funcion de agregar tarea

function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) {
    return;
  }

  const REALIZADO = realizado ? check : uncheck; // si realizado es verdadero check si no uncheck

  const LINE = realizado ? lineThrough : "";

  const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `;
  lista.insertAdjacentHTML("beforeend", elemento);
}

// funcion de Tarea Realizada

function tareaRealizada(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}

function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].eliminado = true;
}

// crear un evento para escuchar el enter y para habilitar el boton

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
    input.value = "";
    id++;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    const tarea = input.value;
    if (tarea) {
      agregarTarea(tarea, id, false, false);
      LIST.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false,
      });
      input.value = "";
      id++;
    }
  }
});

lista.addEventListener("click", function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value;
  if (elementData === "realizado") {
    tareaRealizada(element);
  } else if (elementData === "eliminado") {
    tareaEliminada(element);
  }
});
