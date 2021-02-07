const carrito = document.querySelector('#carrito');

// inyectar de forma dinámica al body la lista de cursos
const contenedoresCarrito = document.querySelector('#lista-carrito tbody');

const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

// Acceder al div con el id lista-cursos
const listaCursos = document.querySelector('#lista-cursos');

// Arreglo para almacenar el número de objetos selccionados
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // Cuando agregas un curso presionando "Agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);

  // Elimina cursos del carrito
  carrito.addEventListener('click', eliminarCurso);


  // Vaciar carrito
  vaciarCarritoBtn.addEventListener('click', ()=>{
      articulosCarrito=[]; // reseteamos el arreglo

      limpiarHTML();
  })
}

// Funciones

// Event bubbling permite detectar las clases del html al hacer clic sobre alguna parte de la página
function agregarCurso(e) {
  // Evita que al dar clic en el botó de agragar carrito de un salto al inicio de la página
  e.preventDefault();

  // Pregunta si dentor del nombre de la clase estan las palabras agregar carrito
  if (e.target.classList.contains('agregar-carrito')) {
    // va de adentro hacia afuera mientras mas parentElement se agreguen, llega a una jerarquía superior
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

// Elimina un curso del carrito
function eliminarCurso(e){

    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        // Elimina del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();
    }
    

   /* */
}

// Leer el contenido del HTML al que le demos click y extrae la información del curso
function leerDatosCurso(curso) {
  //console.log(curso)

  // Crear un objeto con el contenido del curso
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some( curso => curso.id  === infoCurso.id);
  if(existe){
    // Actualizamos la cantidad del producto
    const cursos = articulosCarrito.map( curso=>{
        if( curso.id  === infoCurso.id){
            curso.cantidad ++;
            return curso; // retorna objeto actualizado 

        }else{
            return curso; // retorna objetos que no estan duplicados
        }
    });
    // spread operator
    articulosCarrito = [...cursos];
  }else{
    // Agregar elementos al carrito con spread operator
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

 

  console.log(articulosCarrito);

  carritoHTML();
}

// muestra el carrito de compras en el HTML
function carritoHTML() {
  //Limpiar el HTML
  limpiarHTML();

  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    //Aplicando Destructuring
    const {imagen, titulo, precio, cantidad, id}= curso;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        
        </td>
        
        <td> ${titulo}</td>
        <td> ${precio} </td>
        <td>${cantidad}</td>

        <td>
            <a href="#" class="borrar-curso" data-id= "${id}">X</a>
        </td>
        `;

    // Agrega el HTML del carrito en el tbody al final, pero no limpia los seleccionados previamente
    contenedoresCarrito.appendChild(row);
  });
}

// Elimina los cursos del tbody
function limpiarHTML() {
  //Forma lenta
  //contenedoresCarrito.innerHTML='';

  while (contenedoresCarrito.firstChild) {
    contenedoresCarrito.removeChild(contenedoresCarrito.firstChild);
  }
}
