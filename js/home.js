
let usuario = JSON.parse(localStorage.getItem("user")) || null;
let contenedorLista = document.getElementById("menu_lista");


//contender de tarjetas
let contenderoTarjetas = document.getElementById("tarjetas_container")
let cursos = JSON.parse(localStorage.getItem("cursos")) || []



if (usuario) {

  if (usuario.rol === "admin")
  {
    let item = document.createElement("li");
    item.classList = "nav-item";
    let opcion = ` <a class="nav-link" aria-current="page" href="./admin.html"
        >Administración</a>`;
    item.innerHTML = opcion;

    contenedorLista.appendChild(item);
  }
  else
  {

    document.querySelector("body").innerHTML = ""

    let div = document.createElement("div")
    let estructura = `<div class="container">
                        <div class="row">
                          <div class="col">
                            <div class="alert alert-danger mt-5" role="alert">
                              NO TIENE PERMISO PARA VER ESTA PAGINA!
                            </div>
                            <div>
                              <a href="../index.html" class="link-danger">Volver</a>
                            </<div>
                          </div>
                        </div>
                      </div>`

    div.innerHTML = estructura
    document.querySelector("body").appendChild(div)
  }
//   location.replace("../index.html")
}

//Cargar los cursos en las tarjetas
function cargarTarjetas(){

    //limpiar el contenderos
    contenderoTarjetas.innerHTML =""

    //recorrer el arreglo de cursos y crear cada tarjeta
    if (cursos.length > 0) {
      cursos.map(function(curso){
      
        let div = document.createElement("div")
        div.classList="col-12 col-md-4 mb-3"
  
        let tarjeta = `<div class="card h-100">
                    <img src="${curso.imagen}" class="card-img-top" alt="${curso.titulo}">
                    <div class="card-body">
                      <h5 class="card-title">"${curso.titulo}"</h5>
                      <p class="card-text">"${curso.descripcion}"</p>
                    </div>
                    <div class="card-footer d-grid gap-2">
                      <a href="#" class="btn btn-success">Comprar</a>
                    </div>
                  </div>`
  
        div.innerHTML = tarjeta
        contenderoTarjetas.appendChild(div)   
      })

    }else{

      let div = document.createElement("div")
      let alerta = `<div class="alert alert-warning" role="alert">
      No hay cursos disponibles </div>`

      div.innerHTML = alerta
      contenderoTarjetas.appendChild(div)
    }
}

cargarTarjetas()