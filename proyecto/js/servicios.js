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
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text flex-grow-1">${item.description}</p>
              <p><strong>$${parseFloat(item.price).toFixed(2)}</strong> <span class="badge bg-info">${item.type}</span></p>
              <button class="btn btn-primary mt-auto agregar-carrito"
                      data-name="${item.name}"
                      data-price="${item.price}"
                      data-img="${item.img}"
                      data-type="${item.type}">
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      `;
    });
  }

  renderItems();

  // Agrega al carrito
  document.addEventListener('click', e => {
    if (e.target.classList.contains('agregar-carrito')) {
      const boton = e.target;
      const producto = {
        name: boton.getAttribute('data-name'),
        price: parseFloat(boton.getAttribute('data-price')),
        img: boton.getAttribute('data-img'),
        type: boton.getAttribute('data-type')
      };

      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

      const yaExiste = carrito.some(item => item.name === producto.name);

      if (!yaExiste) {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`${producto.name} agregado al carrito`);
      } else {
        alert(`${producto.name} ya está en el carrito`);
      }
    }
  });

  // Actualiza si cambia localStorage desde otra pestaña
  window.addEventListener('storage', e => {
    if (e.key === 'items') renderItems();
  });
});
