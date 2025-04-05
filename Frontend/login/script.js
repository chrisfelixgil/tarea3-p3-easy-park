const loginElement = document.getElementById("login-id");

loginElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const datosForm = new FormData(loginElement);
  const datos = Object.fromEntries(datosForm);
  const usuario = datos.nombreUsuario; 
  const clave = datos.contrasena;
  
// Logica para el login
  fetch(`https://localhost:7065/Usuarios/Login?nombreUsuario=${usuario}&contrasena=${clave}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(async (res) => {
      if (!res.ok) {
        // Maneja errores HTTP (como 400, 401, 500)
        const errorData = await res.json().catch(() => null);
        const errorMessage = errorData?.message || `HTTP error! Status: ${res.status}`;        
        throw new Error(errorMessage);
      }
      return res.json();
    })
    .then((person) => {
        if (!person.ok){
            alert(person.message);
        } else {
            console.log(person.data);
            alert("¡Bienvenido!")
            window.location.href = "/admin/admin.html";
        }
        
    })
    .catch((error) => {
      console.error("Error inesperado: ", error);
      alert(error.message || "An unexpected error occurred. Please try again.");
    });
});
