document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validar campos vacíos
    if (!email || !password) {
      alert("Por favor, llena todos los campos.");
      return;
    }

    // Obtener usuarios del localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar usuario
    const userFound = users.find(user => user.email === email && user.password === password);

    if (userFound) {
      // Guardar sesión
      localStorage.setItem("currentUser", JSON.stringify(userFound));

      // Redirigir a admin.html si es el usuario especial
      if (email === "prueba@correo.com" && password === "123456") {
        window.location.href = "admin.html";
      } else {
        // Redirigir a usuario.html para otros usuarios
        window.location.href = "Pusuario.html";
      }
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  });
});
