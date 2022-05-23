
let consulta = JSON.parse(localStorage.getItem("consulta")) || [];

class Consulta {
    constructor(nombre, apellido, email, mensaje)
    {
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.mensaje = mensaje
    }
}


function mandarConsulta(e){
    e.preventDefault()

    let id = new Date().getDate()
    let nombre = document.getElementById("contactoNombre").value
    let apellido = document.getElementById("contactoApellido").value
    let email = document.getElementById("contactoEmail").value
    let mensaje = document.getElementById("contactoMensaje").value

    consulta.push(new Consulta(nombre, apellido, email, mensaje))
    localStorage.setItem("consulta", JSON.stringify(consulta))
    document.getElementById("formulario").reset()

    alert("Su consulta ha sido enviada con exito. A la brevedad nos contactaremos con usted.")
}

document.getElementById("formulario").addEventListener("submit", mandarConsulta)