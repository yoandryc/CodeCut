/*// Al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el nombre de usuario guardado (ej. en localStorage)
    const savedUsername = localStorage.getItem('registered-username');
    
    if (savedUsername) {
        document.getElementById('username-display').textContent = 
            `Bienvenido, ${savedUsername}!`;
    } else {
        document.getElementById('username-display').textContent = 
            'Bienvenido, Invitado';
    }
});

// Función para manejar la carga de la imagen
    document.getElementById('avatar-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('avatar').src = event.target.result;
                // Aquí puedes guardar la imagen en localStorage si lo deseas
                localStorage.setItem('user-avatar', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Cargar imagen guardada (si existe) al cargar la página
    window.addEventListener('DOMContentLoaded', function() {
        const savedAvatar = localStorage.getItem('user-avatar');
        if (savedAvatar) {
            document.getElementById('avatar').src = savedAvatar;
        }
        
        const savedDescription = localStorage.getItem('user-description');
        if (savedDescription) {
            document.getElementById('user-description').value = savedDescription;
        }
    });

    // Guardar la descripción
    document.getElementById('save-description').addEventListener('click', function() {
        const description = document.getElementById('user-description').value;
        localStorage.setItem('user-description', description);
        alert('Descripción guardada!');
    });

    */


    document.addEventListener('DOMContentLoaded', function() {
  // Obtener usuario actual
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const avatarImg = document.getElementById('avatar');
    const avatarUpload = document.getElementById('avatar-upload');

  if (!currentUser) {
    window.location.href = "login.html"; // Si no hay sesión, redirige al login
    return;
  }

  // Mostrar datos del usuario
  document.querySelector('h1').textContent = `Bienvenido/a, ${currentUser.name}!`;
  document.getElementById('user-description').value = currentUser.description || "";

  // Avatar
  // 1. Cargar avatar guardado (si existe)
    if (currentUser?.avatar) {
        avatarImg.src = currentUser.avatar; // Usar la URL guardada en el objeto usuario
    } else {
        // Si no hay avatar, cargar uno por defecto
        avatarImg.src = 'default-avatar.jpg';
    }

    // 2. Manejar cambio de avatar
    avatarUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            // Actualizar la imagen en la interfaz
            avatarImg.src = event.target.result;

            // Guardar la nueva imagen en el objeto usuario
            if (currentUser) {
                currentUser.avatar = event.target.result;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                // Actualizar también en la lista de usuarios (opcional)
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = users.findIndex(u => u.email === currentUser.email);
                if (userIndex !== -1) {
                    users[userIndex].avatar = event.target.result;
                    localStorage.setItem('users', JSON.stringify(users));
                }
            }
        };
        reader.readAsDataURL(file);
    });

  // Eventos para guardar cambios
  document.getElementById('save-description').addEventListener('click', function() {
    const description = document.getElementById('user-description').value;
    currentUser.description = description;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Actualizar también en la lista de usuarios
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex].description = description;
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    alert('Descripción guardada!');
});
    });


// Abrir modal
    document.getElementById('open-gallery-btn').addEventListener('click', function() {
        document.getElementById('gallery-modal').style.display = 'block';
        loadGallery();
    });

// Cerrar modal
    document.querySelector('.close-modal').addEventListener('click', function() {
        document.getElementById('gallery-modal').style.display = 'none';
    });

// Añadir fotos
    document.getElementById('add-photo-btn').addEventListener('click', function() {
        document.getElementById('gallery-upload').click();
    });

// Mejor manejo de errores
document.getElementById('gallery-upload').addEventListener('change', function(e) {
    try {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        
        // Obtener galería existente o crear nueva
        let gallery = [];
        const storedGallery = localStorage.getItem('user-gallery');
        if (storedGallery) {
            gallery = JSON.parse(storedGallery);
        }
        
        // Procesar cada archivo
        Array.from(files).forEach(file => {
            if (!file.type.match('image.*')) {
                console.warn(`El archivo ${file.name} no es una imagen`);
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = (event) => {
                gallery.push(event.target.result);
                
                // Guardar solo las últimas 20 imágenes para no exceder almacenamiento
                if (gallery.length > 20) {
                    gallery = gallery.slice(-20);
                    console.log('Se ha alcanzado el límite de 20 imágenes');
                }
                
                localStorage.setItem('user-gallery', JSON.stringify(gallery));
                loadGallery();
            };
            
            reader.onerror = () => {
                console.error('Error al leer el archivo');
            };
            
            reader.readAsDataURL(file);
        });
        
        e.target.value = '';
    } catch (error) {
        console.error('Error en la carga de imágenes:', error);
    }
});

// Cargar galería
    function loadGallery() {
        const gallery = JSON.parse(localStorage.getItem('user-gallery')) || [];
        const container = document.getElementById('gallery-container');
        container.innerHTML = '';
        
        gallery.forEach((imgSrc, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${imgSrc}" alt="Foto de galería">
                <button class="delete-photo" data-index="${index}">&times;</button>
            `;
            container.appendChild(item);
        });
        
        // Agregar eventos para eliminar fotos
        document.querySelectorAll('.delete-photo').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                deletePhoto(index);
            });
        });
    }
    
    // Eliminar foto
    function deletePhoto(index) {
        const gallery = JSON.parse(localStorage.getItem('user-gallery')) || [];
        gallery.splice(index, 1);
        localStorage.setItem('user-gallery', JSON.stringify(gallery));
        loadGallery();
    }

    // Cargar productos al iniciar
    document.addEventListener('DOMContentLoaded', function() {
        loadProductsList();
    });
    
    // Mostrar modal de edición
    document.getElementById('edit-products-btn').addEventListener('click', function() {
        showEditModal();
    });
    
    // Guardar cambios
    document.getElementById('save-products-btn').addEventListener('click', function() {
        saveProducts();
    });
    
    // Cancelar edición
    document.getElementById('cancel-edit-btn').addEventListener('click', function() {
        document.getElementById('edit-products-modal').style.display = 'none';
    });
    
    function loadProductsList() {
        const products = JSON.parse(localStorage.getItem('top-products')) || Array(5).fill('');
        const list = document.getElementById('top-products-list');
        list.innerHTML = '';
        
        products.forEach((product, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fi fi-bs-terminal"></i> ${product || '...'}`;
            list.appendChild(li);
        });
    }
    
    function showEditModal() {
        const products = JSON.parse(localStorage.getItem('top-products')) || Array(5).fill('');
        const container = document.getElementById('products-edit-container');
        container.innerHTML = '';
        
        products.forEach((product, index) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p>Producto ${index + 1}:</p>
                <input type="text" value="${product}" id="product-${index}" placeholder="Nombre del producto">
            `;
            container.appendChild(div);
        });
        
        document.getElementById('edit-products-modal').style.display = 'block';
    }
    
    function saveProducts() {
        const products = [];
        for (let i = 0; i < 5; i++) {
            const value = document.getElementById(`product-${i}`).value;
            products.push(value);
        }
        
        localStorage.setItem('top-products', JSON.stringify(products));
        loadProductsList();
        document.getElementById('edit-products-modal').style.display = 'none';
    }

    // Cargar contenido administrable
  document.addEventListener('DOMContentLoaded', function() {
    const offers = localStorage.getItem('admin-offers') || 
      'Aquí puedes ver las <strong>ofertas</strong> del mes a las que tienes acceso exclusivo por ser miembro activo de Code&Cut';
    
    const events = localStorage.getItem('admin-events') || 
      'Estos son los <strong>eventos</strong> del mes exclusivos para personas miembro';
    
    document.getElementById('user-offers').innerHTML = offers;
    document.getElementById('user-events').innerHTML = events;
  });
  
  // En tu user.html, modifica el script para el historial
document.addEventListener('DOMContentLoaded', function() {
  // Obtener historial de localStorage o crear demo
  let purchases = JSON.parse(localStorage.getItem('user-purchases')) || [
    {id: 1, product: "Tijeras profesionales", date: "2023-05-15", pieces: 1, total: 1200},
    {id: 2, product: "Kit mantenimiento", date: "2023-06-20", pieces: 1, total: 800},
    {id: 3, product: "Crema para peinar", date: "2023-07-10", pieces: 2, total: 350},
    {id: 4, product: "Navajas", date: "2022-12-05", pieces: 3, total: 450} // Este no debe aparecer
  ];

  // Filtrar últimos 6 meses
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const recentPurchases = purchases.filter(purchase => {
    const purchaseDate = new Date(purchase.date);
    return purchaseDate >= sixMonthsAgo;
  });

  // Generar tabla
  const tableBody = document.querySelector('.table tbody');
  tableBody.innerHTML = '';
  
  recentPurchases.forEach(purchase => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <th scope="row">${purchase.id}</th>
      <td>${purchase.product}</td>
      <td>${purchase.date}</td>
      <td>${purchase.pieces}</td>
      <td>$${purchase.total.toFixed(2)}</td>
    `;
    tableBody.appendChild(row);
  });
});
