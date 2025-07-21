document.addEventListener('DOMContentLoaded', () => {
  // Referencias a elementos importantes
  const carritoContainer = document.getElementById('carrito-container');
  const subtotalSpan = document.getElementById('subtotal');
  const totalSpan = document.getElementById('total-carrito');
  const btnComprar = document.getElementById('btn-comprar');

  // Intentamos cargar el carrito guardado en localStorage, si no hay, inicializamos vacío
  let carrito = [];
  try {
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    // Validamos que cada item tenga quantity, price, nombre, descripción e imagen válidos
    carrito = carrito.map(item => ({
      ...item,
      quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
      price: typeof item.price === 'number' && item.price >= 0 ? item.price : 0,
      name: item.name || 'Sin nombre',
      description: item.description || '',
      img: item.img || 'imgs/default.png',
    }));
  } catch (e) {
    console.warn('Carrito corrupto. Reiniciando...');
    carrito = [];
  }

  // Guardar carrito actualizado en localStorage
  function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  // Elimina un producto por índice del carrito
  function eliminarItem(index) {
    const i = parseInt(index, 10);
    if (isNaN(i)) return;
    carrito.splice(i, 1);
    guardarCarrito();
    renderizarCarrito();
  }

  // Cambia la cantidad (+ o -) de un producto
  function cambiarCantidad(index, incremento) {
    const i = parseInt(index, 10);
    if (isNaN(i)) return;
    const item = carrito[i];
    if (!item) return;
    const nuevaCantidad = item.quantity + incremento;
    if (nuevaCantidad < 1) return; // No permitir cantidades menores a 1
    item.quantity = nuevaCantidad;
    guardarCarrito();
    renderizarCarrito();
  }

  // Calcula subtotal y total del carrito
  function calcularTotales() {
    const subtotal = carrito.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return acc + price * quantity;
    }, 0);
    const total = subtotal; // Aquí podrías agregar impuestos si quieres

    subtotalSpan.textContent = subtotal.toFixed(2);
    totalSpan.textContent = total.toFixed(2);
  }

  // Renderiza los productos en el carrito dinámicamente en el DOM
  function renderizarCarrito() {
    carritoContainer.innerHTML = '';

    // Si no hay productos, muestra mensaje aun mensaje
    if (carrito.length === 0) {
      carritoContainer.innerHTML = `
        <div class="text-center text-muted py-5">
          <i class="fas fa-shopping-cart fa-3x mb-3"></i>
          <p>El carrito está vacío.</p>
          <a href="productos.html" class="btn btn-outline-light mt-2">Ver productos</a>
        </div>
      `;
      subtotalSpan.textContent = '0.00';
      totalSpan.textContent = '0.00';
      return;
    }

    // Por cada producto, crea su tarjeta con imagen, nombre, descripción, controles y precio
    carrito.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = 'producto-en-carrito';

      card.innerHTML = `
        <img src="${item.img}" alt="${item.name}" />
        <div class="info">
          <h5>${item.name}</h5>
          ${item.description ? `<p>${item.description}</p>` : ''}
          <div class="cantidad-control">
            <button class="btn-cantidad" data-index="${index}" data-action="restar">-</button>
            <span>${item.quantity}</span>
            <button class="btn-cantidad" data-index="${index}" data-action="sumar">+</button>
          </div>
        </div>
        <div class="precio-y-boton">
          <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
          <button class="btn-eliminar" title="Eliminar producto" aria-label="Eliminar producto" data-index="${index}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;

      carritoContainer.appendChild(card);
    });

    calcularTotales();

    // Asignar evento click para eliminar productos
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.getAttribute('data-index');
        eliminarItem(index);
      });
    });

    // Asignar evento click para cambiar cantidad (sumar/restar)
    document.querySelectorAll('.btn-cantidad').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.getAttribute('data-index');
        const action = btn.getAttribute('data-action');
        if (action === 'sumar') cambiarCantidad(index, 1);
        else if (action === 'restar') cambiarCantidad(index, -1);
      });
    });
  }

  // Evento para botón comprar
  btnComprar.addEventListener('click', () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de comprar.');
      return;
    }

    // Al dar click, alerta y redirige a signup.html para login o registro
    alert('Para continuar con la compra debes iniciar sesión o registrarte.');
    window.location.href = 'signup.html';
  });

  // Al cargar la página renderizamos el carrito
  renderizarCarrito();
});
