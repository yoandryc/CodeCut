function obtenerCarrito() {
  let carrito = [];
  try {
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  } catch {
    carrito = [];
  }
  return carrito;
}

function obtenerCantidadTotal() {
  const carrito = obtenerCarrito();
  return carrito.reduce((acc, item) => acc + (item.quantity || 0), 0);
}

function actualizarContadorCarrito() {
  const cartCount = document.getElementById('cart-count');
  if (!cartCount) return;

  const total = obtenerCantidadTotal();

  if (total > 0) {
    cartCount.textContent = total;
    cartCount.style.display = 'inline-block';
  } else {
    cartCount.style.display = 'none';
  }
}

function agregarAlCarrito(producto) {
  const carrito = obtenerCarrito();

  const index = carrito.findIndex(item => item.id === producto.id);

  if (index >= 0) {
    carrito[index].quantity += 1;
  } else {
    producto.quantity = 1;
    carrito.push(producto);
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));

  actualizarContadorCarrito();
}

document.addEventListener('DOMContentLoaded', () => {
  actualizarContadorCarrito();
});
