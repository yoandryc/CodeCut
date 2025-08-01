// Si aún no hay 'items' en localStorage, crea 10 ejemplos
if (!localStorage.getItem('items')) {
  const sampleItems = [
    { name: 'Corte Tradicional', img: 'https://i.pinimg.com/736x/ef/77/c7/ef77c7d4b196c998b97fe6cb0355872c.jpg', description: 'Corte clásico con navaja estilizada.', price: 150.00, type: 'Servicio' },
    { name: 'Tinte Premium',       img: 'https://i.pinimg.com/736x/7b/38/b1/7b38b1182b0c71fe13a59fc594f0d1c0.jpg',       description: 'Tinte de alta duración y brillo intenso.',              price: 350.00, type: 'Servicio' },
    { name: 'Shampoo Especial',    img: 'https://i.pinimg.com/736x/ea/e0/ee/eae0eee8c84bbc3341f792b075bef071.jpg',    description: 'Shampoo nutritivo con keratina.',                      price: 120.00, type: 'Producto' },
    { name: 'Acondicionador Pro',  img: 'https://i.pinimg.com/736x/c3/76/da/c376daf62c6cf3448452e052c485985c.jpg',          description: 'Acondicionador de reparación profunda.',                price: 180.00, type: 'Producto' },
    { name: 'Mascarilla Nutritiva',img: 'https://i.pinimg.com/736x/fc/2c/0d/fc2c0d9527165e0ada22ddc4faf10a42.jpg',        description: 'Mascarilla para hidratación intensiva.',               price: 200.00, type: 'Producto' },
    { name: 'Peinado de Gala',     img: 'https://i.pinimg.com/736x/b7/68/11/b7681142ae4f33cd63fd7bdfe0dbc0cb.jpg',      description: 'Peinado elegante para eventos especiales.',            price: 500.00, type: 'Servicio' },
    { name: 'Barba Clásica',       img: 'https://i.pinimg.com/736x/ef/43/8c/ef438c68830a51e5c0f16df3af232eea.jpg', description: 'Perfilado y arreglo de barba tradicional.',             price: 120.00, type: 'Servicio' },
    { name: 'Cera Texturizante',   img: 'https://i.pinimg.com/736x/c4/43/fc/c443fca2db2679f157f94479bd5abead.jpg',   description: 'Cera para crear texturas definidas.',                   price: 90.00,  type: 'Producto' },
    { name: 'Serum Anticaída',     img: 'https://i.pinimg.com/736x/f2/2d/08/f22d08b36f5a8d35e6f62d3b50d44618.jpg',description: 'Serum que fortalece el cuero cabelludo.',               price: 220.00, type: 'Producto' },
    { name: 'Manicure Express',    img: 'https://i.pinimg.com/736x/74/02/a9/7402a9dab5392b2bf7352e2693bfe8b7.jpg',    description: 'Manicure rápida para lucir impecable.',                 price: 180.00, type: 'Servicio' },
  ];
  localStorage.setItem('items', JSON.stringify(sampleItems));
}

document.addEventListener('DOMContentLoaded', () => {
  const productosRow = document.getElementById('productos-row');
  const alertContainer = document.getElementById('alert-container');

  function renderItems() {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const productos = items.filter(item => item.type === 'Producto');
    productosRow.innerHTML = '';

    if (productos.length === 0) {
      productosRow.innerHTML = '<p class="text-center text-muted">No hay productos disponibles.</p>';
      return;
    }

    productos.forEach(item => {
      productosRow.innerHTML += `
        <div class="col-md-4">
          <div class="card h-100 shadow-sm animate__animated animate__fadeIn">
            <img src="${item.img}" alt="${item.name}" class="card-img-top" style="height:200px; object-fit:cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="subtitulo-card card-title">${item.name}</h5>
              <p class="p-card card-text flex-grow-1">${item.description}</p>
              <p class="p-card"><strong>$${parseFloat(item.price).toFixed(2)}</strong></p>
              <button class="btn btn-primary mt-auto agregar-carrito text-black"
                      data-name="${item.name}"
                      data-price="${item.price}"
                      data-img="${item.img}"
                      data-description="${item.description}"
                      data-type="${item.type}">
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      `;
    });
  }

  function mostrarAlertaBootstrap(mensaje, tipo = 'warning', duracion = 3500) {
  if (!alertContainer) return;
  
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show shadow" role="alert" style="font-weight: 600;">
      ${mensaje}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;
  
  alertContainer.appendChild(wrapper);

  setTimeout(() => {
    const alert = bootstrap.Alert.getOrCreateInstance(wrapper.querySelector('.alert'));
    alert.close();
  }, duracion);
}

  renderItems();

  productosRow.addEventListener('click', (e) => {
    if (!e.target.classList.contains('agregar-carrito')) return;

    const btn = e.target;
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

    mostrarAlertaBootstrap(`Producto <strong>${producto.name}</strong> agregado al carrito`, 'custom-yellow');

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

  window.addEventListener('storage', (e) => {
    if (e.key === 'carrito') {
      actualizarContadorCarrito();
    }
  });
});
