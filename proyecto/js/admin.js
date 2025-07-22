document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('item-form');
  const itemsList = document.getElementById('items-list');
  const clearAllBtn = document.getElementById('clear-all');
  let items = JSON.parse(localStorage.getItem('items')) || [];
  let editIndex = -1;

  function showAlert(message, type = 'danger') {
    // Quitar alertas previas
    const oldAlert = document.querySelector('.alert');
    if (oldAlert) oldAlert.remove();

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    `;

    form.prepend(alertDiv);

    // Opcional: quitar la alerta después de 5 segundos
    setTimeout(() => {
      alertDiv.classList.remove('show');
      alertDiv.classList.add('hide');
      alertDiv.remove();
    }, 5000);
  }

  function renderItems() {
    itemsList.innerHTML = '';
    if (items.length === 0) {
      itemsList.innerHTML = '<p class="text-center text-muted">No hay productos o servicios agregados.</p>';
      return;
    }
    items.forEach((item, index) => {
      itemsList.innerHTML += `
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-sm h-100 animate__animated animate__fadeIn">
            <img src="${item.img}" class="card-img-top" alt="${item.name}" style="height:200px; object-fit:cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text flex-grow-1">${item.description}</p>
              <p><strong>$${parseFloat(item.price).toFixed(2)}</strong> <span class="badge bg-info">${item.type}</span></p>
              <div class="mt-auto d-flex justify-content-between">
                <button class="btn btn-sm btn-warning edit-btn" data-index="${index}">Editar</button>
                <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    // Delegación de eventos para editar
    itemsList.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        editIndex = +btn.dataset.index;
        const item = items[editIndex];
        form.name.value = item.name;
        form.img.value = item.img;
        form.description.value = item.description;
        form.price.value = item.price;
        form.type.value = item.type;
        form.querySelector('button[type="submit"]').textContent = 'Actualizar';
      });
    });

    // Delegación de eventos para eliminar
    itemsList.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = +btn.dataset.index;
        if (confirm('¿Seguro que quieres eliminar este elemento?')) {
          items.splice(idx, 1);
          saveAndRender();
          showAlert('Elemento eliminado.', 'warning');
        }
      });
    });
  }

  function saveAndRender() {
    localStorage.setItem('items', JSON.stringify(items));
    renderItems();
    form.reset();
    form.querySelector('button[type="submit"]').textContent = 'Agregar';
    editIndex = -1;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Validación simple manual
    if (
      !form.name.value.trim() ||
      !form.img.value.trim() ||
      !form.description.value.trim() ||
      !form.price.value ||
      isNaN(parseFloat(form.price.value)) ||
      parseFloat(form.price.value) < 0 ||
      !form.type.value
    ) {
      showAlert('Por favor completa todos los campos correctamente.', 'danger');
      return;
    }
console.log("Validación correcta");
    const newItem = {
      name: form.name.value.trim(),
      img: form.img.value.trim(),
      description: form.description.value.trim(),
      price: parseFloat(form.price.value),
      type: form.type.value
    };
      // Mostrar el objeto JSON en consola
      console.log(JSON.stringify(newItem, null, 2));
    if (editIndex >= 0) {
      items[editIndex] = newItem;
      showAlert('Producto/Servicio actualizado con éxito.', 'success');
    } else {
      items.push(newItem);
      showAlert('Producto/Servicio agregado con éxito.', 'success');
    }
 
    saveAndRender();
  });

  clearAllBtn.addEventListener('click', () => {
    if (confirm('¿Seguro que quieres borrar todos?')) {
      items = [];
      saveAndRender();
      showAlert('Todos los elementos han sido borrados.', 'warning');
    }
  });

  // Render inicial
  renderItems();
});

  // Guardar Eventos
  document.getElementById('save-events').addEventListener('click', function() {
    const content = document.getElementById('admin-events').value;
    localStorage.setItem('admin-events', content);
    alert('Eventos actualizados correctamente');
  });

  // Guardar Ofertas
  document.getElementById('save-offers').addEventListener('click', function() {
    const content = document.getElementById('admin-offers').value;
    localStorage.setItem('admin-offers', content);
    alert('Ofertas actualizadas correctamente');
  });