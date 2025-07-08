   //Inicializamos emailjs
   emailjs.init('vE-IjUiYcLUw2oeCJ');

  document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtenemos valores
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const message = document.querySelector("#message").value.trim();

    // Contenedores de errores
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const messageError = document.getElementById("messageError");

    // Limpiamos errores anteriores
    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    messageError.textContent = "";

    let formularioInvalido = false;

    // Validación de nombre
    const namePattern = /^[A-Za-z\s]+$/;
    if (name === "") {
      nameError.textContent = "El nombre es obligatorio.";
      formularioInvalido = true;
    } else if (name.length < 2) {
      nameError.textContent = "Debe tener al menos 2 letras.";
      formularioInvalido = true;
    } else if (!namePattern.test(name)) {
      nameError.textContent = "Solo letras y espacios permitidos.";
      formularioInvalido = true;
    }

    // Validación de email
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === "") {
      emailError.textContent = "El correo es obligatorio.";
      formularioInvalido = true;
    } else if (!emailPattern.test(email)) {
      emailError.textContent = "Ingrese un correo válido.";
      formularioInvalido = true;
    }

    // Validación de teléfono
    if (phone === "" || isNaN(phone) || !/^\d{10}$/.test(phone)) {
      phoneError.textContent = "Ingrese un número válido (10 dígitos).";
      formularioInvalido = true;
    }

    // Validación de mensaje
    if (message === "" || message.length < 5) {
      messageError.textContent = "El mensaje debe tener al menos 5 caracteres.";
      formularioInvalido = true;
    }

    // Si el formulario es inválido, salir
    if (formularioInvalido) return;

    // Guardamos datos en localStorage
    const formData = { name, email, phone, message };
    localStorage.setItem("contactFormData", JSON.stringify(formData));

    // Enviar con EmailJS
    emailjs.send("service_k9d0lfc", "template_71lo11l", {
      name: name,
      email: email,
      phone: phone,
      message: message
    }).then(() => {
      alert("Formulario enviado correctamente.");
      document.getElementById("contactForm").reset();
    }).catch((error) => {
      alert("Error al enviar. Intenta nuevamente.");
      console.error("Error al enviar con EmailJS:", error);
    });
  });

