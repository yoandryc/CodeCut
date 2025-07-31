document.addEventListener('DOMContentLoaded', () => {
  const serviciosRow = document.getElementById('servicios-row');

  function renderItems() {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const servicios = items.filter(item => item.type === 'Servicio');
    serviciosRow.innerHTML = '';

    if (servicios.length === 0) {
      serviciosRow.innerHTML = '<p class="text-center text-muted">No hay servicios disponibles.</p>';
      return;
    }

    servicios.forEach(item => {
      serviciosRow.innerHTML += `
        <div class="col-md-4">
          <div class="card h-100 shadow-sm animate__animated animate__fadeIn">
            <img src="${item.img}" alt="${item.name}" class="card-img-top" style="height:200px; object-fit:cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="subtitulo-card card-title">${item.name}</h5>
              <p class="p-card card-text flex-grow-1">${item.description}</p>
              <p class="p-card"><strong>$${parseFloat(item.price).toFixed(2)}</strong> <span class="badge bg-info" style="display:none">${item.type}</span></p>
             
            </div>
          </div>
        </div>
      `;
    });
  }

  renderItems();

  window.addEventListener('storage', e => {
  if (e.key === 'items') renderItems();
  });

  // Carrito de compras
  const botonesAgregar = document.querySelectorAll('.agregar-carrito');

  botonesAgregar.forEach(btn => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();

      const producto = {
        name: btn.getAttribute('data-name'),
        price: parseFloat(btn.getAttribute('data-price')),
        img: btn.getAttribute('data-img'),
        description: btn.getAttribute('data-description') || '',
        quantity: 1
      };

      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      const existente = carrito.find(item => item.name === producto.name);

      if (existente) {
        existente.quantity += 1;
      } else {
        carrito.push(producto);
      }

      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarContadorCarrito();
      alert("Producto agregado al carrito");
    });
  });

  function actualizarContadorCarrito() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) return;

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((acc, item) => acc + (item.quantity || 0), 0);

    if (totalItems > 0) {
      cartCount.textContent = totalItems;
      cartCount.style.display = 'inline-block';
    } else {
      cartCount.style.display = 'none';
    }
  }

  actualizarContadorCarrito();
});

document.addEventListener('DOMContentLoaded', function() {
  const agendarBtn = document.querySelector('.btn.btn-outline-secondary');
  
  agendarBtn.addEventListener('click', function() {
    // Obtener los valores del formulario
    const servicio = document.getElementById('type').value;
    const fechaHora = document.getElementById('datetime-local-input').value;
    const barbero = document.querySelector('input[name="listGroupRadio"]:checked').nextElementSibling.textContent;
    const detalles = document.getElementById('exampleFormControlTextarea1').value;
    
    // Validar que todos los campos estén completos
    if (!servicio || !fechaHora || !barbero) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }
    
    // Crear objeto con los datos de la cita
    const cita = {
      servicio: servicio,
      fechaHora: fechaHora,
      barbero: barbero,
      detalles: detalles
    };
    
    // Guardar en localStorage 
    guardarCita(cita);
    
    // Mostrar confirmación
    alert('¡Cita agendada con éxito!\n\n' +
          `Servicio: ${servicio}\n` +
          `Fecha y hora: ${formatearFecha(fechaHora)}\n` +
          `Barbero: ${barbero}\n` +
          `Detalles: ${detalles || 'Ninguno'}`);
    
    
  });
  
  function guardarCita(cita) {
    // Obtener citas existentes o crear array vacío si no hay
    let citas = JSON.parse(localStorage.getItem('citas')) || [];
    
    // Agregar nueva cita
    citas.push(cita);
    
    // Guardar en localStorage
    localStorage.setItem('citas', JSON.stringify(citas));
  }
  
  function formatearFecha(fechaHora) {
    if (!fechaHora) return '';
    
    const opciones = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    };
    
    return new Date(fechaHora).toLocaleDateString('es-ES', opciones);
  }
});
