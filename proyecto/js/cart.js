document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('carrito-container');
  const totalCompra = document.getElementById('total-compra');
  const subtotalCompra = document.getElementById('subtotal-compra');
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p class="text-muted text-center">El carrito está vacío.</p>';
    totalCompra.textContent = '$0.00';
    subtotalCompra.textContent = '$0.00';
  } else {
    contenedor.innerHTML = carrito.map((item, index) => `
      <div class="card mb-3 shadow-sm producto-carrito" data-index="${index}">
        <div class="row g-0 align-items-center">
          <div class="col-md-4">
            <img src="${item.img}" class="img-fluid rounded-start w-100" style="max-height: 180px; object-fit: cover;" alt="${item.name}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.description}</p>
              <p class="card-text precio-producto">$${item.price.toFixed(2)}</p>
              <div class="cantidad-control d-flex align-items-center gap-2 mt-3">
                <button class="btn btn-outline-secondary btn-sm btn-restar">−</button>
                <input type="number" class="form-control form-control-sm cantidad-input" value="${item.quantity}" min="1" readonly>
                <button class="btn btn-outline-secondary btn-sm btn-sumar">+</button>
              </div>
              <button class="btn btn-danger btn-sm mt-3 btn-eliminar">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    actualizarTotal();

    document.querySelectorAll('.btn-sumar').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        carrito[i].quantity++;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizar();
      });
    });

    document.querySelectorAll('.btn-restar').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        if (carrito[i].quantity > 1) {
          carrito[i].quantity--;
          localStorage.setItem('carrito', JSON.stringify(carrito));
          renderizar();
        }
      });
    });

    document.querySelectorAll('.btn-eliminar').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        carrito.splice(i, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizar();
      });
    });
  }

  function actualizarTotal() {
    const total = carrito.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalCompra.textContent = `$${total.toFixed(2)}`;
    subtotalCompra.textContent = `$${total.toFixed(2)}`;
  }

  function renderizar() {
    location.reload();
  }
});
