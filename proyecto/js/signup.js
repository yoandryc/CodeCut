const signupForm = document.querySelector('#signupForm');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //Limpiar alertas
  clearAlerts();

  // Obtener valores
  const lastName = document.getElementById('lastName').value.trim();
  const name = document.getElementById('name').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Validación de campos vacíos
  if (!lastName || !name || !phoneNumber || !email || !password) {
    showAlert('Por favor, completa todos los campos.', 'danger');
    return;
  }

  //Validación nombre y apellido
  if(name.length < 4 ){
     showAlert('Por favor, un nombre válido', 'danger');
    return;
  }

    if(lastName.length < 4 ){
     showAlert('Por favor, un apellido válido', 'danger');
    return;
  }

  // Validación de email
  if (!isValidEmail(email)) {
    showAlertEmail('El correo electrónico no es válido.', 'warning');
    return;
  }

  // Validación de contraseña
  if (!isValidPassword(password)) {
    showAlertPassword('La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número.', 'warning');
    return;
  }

  //Validación numero teléfono
  if(!isValidPhone(phoneNumber)) {
     showAlertPhone('El número de teléfono debe tener al menos 10 dígitos', 'warning');
    return;   
  }

  // Obtener usuarios existentes
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Verificar si ya existe el usuario
  const isUserRegistered = users.some(user => user.email === email);
  if (isUserRegistered) {
    showAlert('El correo ya está registrado.', 'danger');
    return;
  }

  // Agregar usuario
  users.push({ lastName, name, phoneNumber, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  //Registro exitoso, redireccionando a login
  showAlert('¡Registro exitoso!, Redireccionando a LogIn', 'success');
  setTimeout(() => {
  window.location.href = 'login.html';
  signupForm.reset();
}, 1500);

});

//Clear alerts
function clearAlerts() {
  document.getElementById('alertContainer').innerHTML = '';
  document.getElementById('alertContainerEmail').innerHTML = '';
  document.getElementById('alertContainerPassword').innerHTML = '';
  document.getElementById('alertContainerPhone').innerHTML = '';
}

// Funciones de validación
//Validación e-mail
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
//validación password 
function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
}
//Validación teléfono
function isValidPhone(phoneNumber) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
}

//Funciones para alertas
function showAlertEmail(message, type = 'danger') {
  const alertContainer = document.getElementById('alertContainerEmail');
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}

function showAlertPassword(message, type = 'danger') {
  const alertContainer = document.getElementById('alertContainerPassword');
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}

function showAlertPhone(message, type = 'danger') {
  const alertContainer = document.getElementById('alertContainerPhone');
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}

function showAlert(message, type = 'danger') {
  const alertContainer = document.getElementById('alertContainer');
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}

