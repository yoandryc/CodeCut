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
              <button type="button" class="btn btn-primary mt-auto agregar-carrito"
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
