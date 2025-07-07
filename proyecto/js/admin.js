// js/admin.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('item-form');
  const itemsList = document.getElementById('items-list');
  const clearAllBtn = document.getElementById('clear-all');
  let items = JSON.parse(localStorage.getItem('items')) || [];
  let editIndex = -1;

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

    // Delegación de eventos
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
    itemsList.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = +btn.dataset.index;
        if (confirm('¿Seguro que quieres eliminar este elemento?')) {
          items.splice(idx, 1);
          saveAndRender();
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
    const newItem = {
      name: form.name.value.trim(),
      img: form.img.value.trim(),
      description: form.description.value.trim(),
      price: parseFloat(form.price.value),
      type: form.type.value
    };
    if (editIndex >= 0) {
      items[editIndex] = newItem;
    } else {
      items.push(newItem);
    }
    saveAndRender();
  });

  clearAllBtn.addEventListener('click', () => {
    if (confirm('¿Seguro que quieres borrar todos?')) {
      items = [];
      saveAndRender();
    }
  });

  // Render inicial
  renderItems();
});
