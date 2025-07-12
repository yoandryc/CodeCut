//Local storage
//Tomamos formulario de registro signupForm
const signupForm = document.querySelector('#signupForm');
//evento submit y funcion callback
signupForm.addEventListener('submit', (e) => {
  //Recibimos evento
  //PreventDefault, para evitar que se recarge la pagina
  e.preventDefault();
  //Tomamos los campos del formulario
  const lastName = document.querySelector('#lastName').value;
  const name = document.querySelector('#name').value;
  const phoneNumber = document.querySelector('#phoneNumber').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

 // Validar campos vacíos
  if (!lastName || !name || !phoneNumber || !email || !password) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  //Guardamos los usuarios en un arreglo, si aun no los hay
  const Users = JSON.parse(localStorage.getItem('users')) || []

  //Checamos si hay email ya registrado
  const isUserregistered = Users.find(user => user.email === email);
  if(isUserregistered){
  return alert("El usuario ya está registrado!")
  }

// Crear nuevo usuario con ID progresivo
  const newUser = {
    id: Users.length + 1,  // ID autoincremental
    lastName: lastName,
    name: name,
    phoneNumber: phoneNumber,
    email: email,
    password: password,
    avatar: "default-avatar.jpg",
    description:" ",
    gallery: [],
    topProducts: []  
  };

  // Guardar en localStorage
  Users.push(newUser);
  localStorage.setItem('users', JSON.stringify(Users));
  
  // Redirigir al login después de 1.5 segundos
  alert("¡Registro exitoso! Redirigiendo al login...");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});
