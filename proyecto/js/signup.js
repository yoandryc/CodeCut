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


  //Guardamos los usuarios en un arreglo, si aun no los hay
  const Users = JSON.parse(localStorage.getItem('users')) || []
  //Checamos si hay email ya registrado
  //const isUserRegistered = Users.find(user => user.email === email);
  //if(isUserregistered){
  //return alert("El usuario ya está registrado!")
  //}

  //Creamos array de base datos usuario
  Users.push({lastName: lastName, 
    name: name, 
    phoneNumber: phoneNumber, 
    email: email, 
    password: password});
  //Guardamos en el storage
  localStorage.setItem('users', JSON.stringify(Users));
  alert("Registro Éxitoso!");
})
