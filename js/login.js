
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function handleSubmit(e) {
  e.preventDefault();

  let email = document.querySelector("#text_email").value;
  let pass = document.querySelector("#text_password").value;

  //buscar el email en el arreglo
  let validar = usuarios.find((user) => {
    return user.email === email;
  });

  if (validar) {
    if (validar.password === pass) {
      localStorage.setItem("user", JSON.stringify(validar));
      location.replace("./pages/home.html");
    } else {
      alert("El correo o el password es incorrecto");
    }
  } else {
    alert("El correo o el password es incorrecto");
  }
}

document.getElementById("formulario").addEventListener("submit", handleSubmit);

