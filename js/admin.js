
class Curso {
  constructor(id, titulo, descripcion, imagen, mentor, precio = 0) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.mentor = mentor;
    this.precio = precio;
  }
}


let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
let tableBody = document.querySelector("#table_body");
let user = JSON.parse(localStorage.getItem("user"))

//para poder usar el modal
let myModal = new bootstrap.Modal(document.getElementById('myModal'))

const validarUsuario =()=>{


  if (user.rol !== "admin") 
  {
    document.querySelector("main").innerHTML = ""

    let div = document.createElement("div")
    div.classList= "container"

    let estructura = `<div class="container">
                        <div class="row">
                          <div class="col">
                            <div class="alert alert-danger mt-5" role="alert">
                              NO TIENE PERMISO PARA VER ESTA PAGINA!
                            </div>
                            <div>
                              <a href="./home.js" class="link-danger">Volver</a>
                            </<div>
                          </div>
                        </div>`

    div.innerHTML = estructura
    document.querySelector("main").appendChild(div)

  }
  else{
    cargarTabla()
  }

}


function agregarCurso(e) {
  e.preventDefault();

  let id = new Date().getTime();
  let titulo = document.getElementById("titulo").value;
  let desc = document.getElementById("desc").value;
  let imagen = document.getElementById("imagen").value;
  let mentor = document.getElementById("mentor").value;
  let precio = document.getElementById("precio").value;

  cursos.push(new Curso(id, titulo, desc, imagen, mentor, precio));
  localStorage.setItem("cursos", JSON.stringify(cursos));
  document.getElementById("formulario").reset();
  document.getElementById("titulo").focus();

  cargarTabla();
}


//----------------------------------MODIFICAR UN CURSO------------------------------------

//Mostrar el modal
const editModal = function(cursoId){
  myModal.show()
  crearCuerpoModal(cursoId)
}

//crear el cuerpo del modal
const crearCuerpoModal = function(index){

  //limpiar el body del modal
  document.querySelector(".modal-body").innerHTML = ""


  //crear el contenido del body del modal, el formulario
  let bodyModal = document.querySelector(".modal-body")
  let contenidoBody = `<form id="form-update" onSubmit="actualizarCurso(event,${index})">
  <label><b>Título</b></label>
  <input id="titulo-update" class="form-control" type="text" value="${cursos[index].titulo}" required />
  <label>Descripción</label>
  <textarea id="desc-update" class="form-control" value="${cursos[index].descripcion}" required>${cursos[index].descripcion}</textarea>
  <label>Imagen</label>
  <input
    id="imagen-update"
    class="form-control"
    type="text"
    placeholder="Ingrese una url"
    value="${cursos[index].imagen}"
    required
  />
  <label>Mentor</label>
  <select id="mentor-update" class="form-control" required>
    <option selected>${cursos[index].mentor}</option>
    <option value="Ludovico Peluche">Ludovico Peluche</option>
    <option value="Daniel Pastoruti">Daniel Pastoruti</option>
    <option value="Rocio Pereyra">Rocio Pereyra</option>
  </select>
  <label>Precio</label>
  <input id="precio-update" class="form-control" type="number" 
  value="${cursos[index].precio}" required />
  <button class="btn btn-primary mt-3 float-end">Guardar</button>
</form>`

  //agregar al body del modal
  bodyModal.innerHTML = contenidoBody

}


function actualizarCurso(e,index){
  e.preventDefault()

  //tenemos que obtener todos los datos del formulario
  let titulo = document.getElementById("titulo-update").value
  let descripcion = document.getElementById("desc-update").value
  let imagen = document.getElementById("imagen-update").value
  let mentor = document.getElementById("mentor-update").value
  let precio = document.getElementById("precio-update").value


  const newData = {
    titulo,
    descripcion,
    imagen,
    mentor,
    precio
  }

  cursos.splice(index, 1, newData)
  localStorage.setItem("cursos", JSON.stringify(cursos))
  myModal.hide()
  cargarTabla()
}
//---------------------------------------------------------------------------

//----------------------------------ELIMINAR UN CURSO-----------------------------------

function borrarCurso(cursoId){
  
  let validar = confirm(`Esta seguro que desea eliminar el curso: ${cursos[cursoId].titulo}?`)

  if (validar)
  {
    cursos.splice(cursoId, 1)
    localStorage.setItem("cursos", JSON.stringify(cursos))
    alert("Curso eliminado con exito")
    cargarTabla()
  }
}


const cargarTabla = () => {
  tableBody.innerHTML = "";

  cursos.map(function (curso, index) {
    let tr = document.createElement("tr");
    let celda = `<th scope="row">${index + 1}</th>
        <td>${curso.titulo}</td>
        <td>${curso.descripcion}</td>
        <td>${curso.mentor}</td>
        <td>${curso.precio}</td>
        <td><button id="editar_curso" class="btn btn-warning btn-sm" onclick="editModal(${index})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
        <td><button id="borrar_curso" class="btn btn-danger btn-sm" onclick="borrarCurso(${index})"><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>`;

        tr.innerHTML = celda;
    tableBody.appendChild(tr);
  });
};

document.getElementById("formulario").addEventListener("submit", agregarCurso);

validarUsuario();
