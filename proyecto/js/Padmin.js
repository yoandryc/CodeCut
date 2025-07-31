document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const form = document.getElementById('item-form');
  const formContainer = document.getElementById('item-form-container');
  const toggleFormBtn = document.getElementById('toggle-form-btn');
  const cancelFormBtn = document.getElementById('cancel-form');
  const clearFormBtn = document.getElementById('clear-form');
  const productsList = document.getElementById('products-list');
  const servicesList = document.getElementById('services-list');
  const productsCount = document.getElementById('products-count');
  const servicesCount = document.getElementById('services-count');
  const clearAllBtn = document.getElementById('clear-all');
  const saveEventsBtn = document.getElementById('save-events');
  const saveOffersBtn = document.getElementById('save-offers');
  const adminEvents = document.getElementById('admin-events');
  const adminOffers = document.getElementById('admin-offers');

  // Data
  let items = JSON.parse(localStorage.getItem('items')) || [];
  let editIndex = -1;

  // Initialize
  initLocalStorage();
  renderItems();
  setupEventListeners();

  function initLocalStorage() {
    if (!localStorage.getItem('admin-events')) {
      localStorage.setItem('admin-events', 'Actualmente no hay eventos');
    }
    if (!localStorage.getItem('admin-offers')) {
      localStorage.setItem('admin-offers', 'Actualmente no hay ofertas');
    }
    adminEvents.value = localStorage.getItem('admin-events');
    adminOffers.value = localStorage.getItem('admin-offers');
    updateEventCounters();
  }

  function updateEventCounters() {
    const eventCount = adminEvents.value.split('\n').filter(line => line.trim() !== '').length;
    const offerCount = adminOffers.value.split('\n').filter(line => line.trim() !== '').length;
    document.getElementById('event-count').textContent = `${eventCount} evento${eventCount !== 1 ? 's' : ''}`;
    document.getElementById('offer-count').textContent = `${offerCount} oferta${offerCount !== 1 ? 's' : ''}`;
  }

  function showAlert(message, type = 'danger') {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    
    setTimeout(() => {
      const alert = alertContainer.querySelector('.alert');
      if (alert) {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 150);
      }
    }, 5000);
  }

  function validateField(field) {
    const isValid = field.value.trim() !== '';
    field.classList.toggle('is-invalid', !isValid);
    field.classList.toggle('is-valid', isValid);
    return isValid;
  }

  function validatePrice() {
    const priceField = document.getElementById('price');
    const price = parseFloat(priceField.value);
    const isValid = !isNaN(price) && price >= 0;
    
    priceField.classList.toggle('is-invalid', !isValid);
    priceField.classList.toggle('is-valid', isValid);
    return isValid;
  }

  function validateType() {
    const typeField = document.getElementById('type');
    const isValid = typeField.value !== '';
    typeField.classList.toggle('is-invalid', !isValid);
    typeField.classList.toggle('is-valid', isValid);
    return isValid;
  }

  function validateImageUrl() {
    const imgField = document.getElementById('img');
    let isValid = false;
    
    try {
      if (imgField.value.trim()) {
        new URL(imgField.value);
        isValid = true;
      }
    } catch (e) {
      isValid = false;
    }
    
    imgField.classList.toggle('is-invalid', !isValid);
    imgField.classList.toggle('is-valid', isValid);
    return isValid;
  }

  function validateForm() {
    let isValid = true;
    isValid &= validateField(document.getElementById('name'));
    isValid &= validateField(document.getElementById('description'));
    isValid &= validatePrice();
    isValid &= validateType();
    isValid &= validateImageUrl();
    return isValid;
  }

  function renderItems() {
    productsList.innerHTML = '';
    servicesList.innerHTML = '';
    
    if (items.length === 0) {
      productsList.innerHTML = '<div class="col-12"><div class="alert alert-info mb-0">No hay productos registrados aún</div></div>';
      servicesList.innerHTML = '<div class="col-12"><div class="alert alert-warning mb-0">No hay servicios registrados aún</div></div>';
    } else {
      items.forEach((item, index) => {
        const template = document.getElementById('item-template').content.cloneNode(true);
        
        template.querySelector('.item-img').src = item.img || 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
        template.querySelector('.item-img').alt = item.name;
        template.querySelector('.item-name').textContent = item.name;
        template.querySelector('.item-description').textContent = item.description;
        template.querySelector('.item-price').textContent = `$${parseFloat(item.price).toFixed(2)} MXN`;
        
        const badge = template.querySelector('.item-type-badge');
        badge.textContent = item.type;
        badge.className = `badge ${item.type === 'Producto' ? 'bg-info' : 'bg-warning'}`;
        
        template.querySelector('.edit-btn').dataset.index = index;
        template.querySelector('.delete-btn').dataset.index = index;
        
        if (item.type === 'Producto') {
          productsList.appendChild(template);
        } else {
          servicesList.appendChild(template);
        }
      });
    }
    
    updateCounters();
  }

  function updateCounters() {
    const productCount = items.filter(item => item.type === 'Producto').length;
    const serviceCount = items.filter(item => item.type === 'Servicio').length;
    
    productsCount.textContent = productCount;
    servicesCount.textContent = serviceCount;
  }

  function saveAndRender() {
    localStorage.setItem('items', JSON.stringify(items));
    renderItems();
    resetForm();
  }

  function resetForm() {
    form.reset();
    form.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-save me-2"></i>Guardar';
    editIndex = -1;
    formContainer.classList.add('d-none');
    
    document.querySelectorAll('.is-invalid, .is-valid').forEach(el => {
      el.classList.remove('is-invalid', 'is-valid');
    });
  }

  function setupEventListeners() {
    // Form toggle
    toggleFormBtn.addEventListener('click', () => {
      formContainer.classList.toggle('d-none');
      if (!formContainer.classList.contains('d-none')) {
        document.getElementById('name').focus();
      }
    });
    
    // Form buttons
    cancelFormBtn.addEventListener('click', resetForm);
    clearFormBtn.addEventListener('click', () => {
      form.reset();
      document.querySelectorAll('.is-invalid, .is-valid').forEach(el => {
        el.classList.remove('is-invalid', 'is-valid');
      });
    });
    
    // Form validation
    document.getElementById('name').addEventListener('blur', function() {
      validateField(this);
    });
    
    document.getElementById('description').addEventListener('blur', function() {
      validateField(this);
    });
    
    document.getElementById('price').addEventListener('blur', validatePrice);
    document.getElementById('type').addEventListener('change', validateType);
    document.getElementById('img').addEventListener('blur', validateImageUrl);
    
    // Form submission
    form.addEventListener('submit', e => {
      e.preventDefault();
      
      if (!validateForm()) {
        showAlert('Por favor completa todos los campos correctamente.', 'danger');
        return;
      }

      const newItem = {
        name: form.name.value.trim(),
        img: form.img.value.trim(),
        description: form.description.value.trim(),
        price: parseFloat(form.price.value),
        type: form.type.value
      };

      if (editIndex >= 0) {
        items[editIndex] = newItem;
        showAlert(`${newItem.type} "${newItem.name}" actualizado con éxito.`, 'success');
      } else {
        items.push(newItem);
        showAlert(`Nuevo ${newItem.type.toLowerCase()} "${newItem.name}" agregado con éxito.`, 'success');
      }

      saveAndRender();
    });
    
    // Clear all items
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        if (items.length === 0) {
          showAlert('No hay elementos para borrar.', 'info');
          return;
        }
        
        if (confirm('¿Seguro que quieres borrar TODOS los productos y servicios?')) {
          items = [];
          saveAndRender();
          showAlert('Todos los elementos han sido borrados.', 'warning');
        }
      });
    }
    
    // Save events and offers
    saveEventsBtn.addEventListener('click', () => {
      localStorage.setItem('admin-events', adminEvents.value);
      updateEventCounters();
      showAlert('Eventos guardados correctamente.', 'success');
    });
    
    saveOffersBtn.addEventListener('click', () => {
      localStorage.setItem('admin-offers', adminOffers.value);
      updateEventCounters();
      showAlert('Ofertas guardadas correctamente.', 'success');
    });
    
    // Update counters when typing
    adminEvents.addEventListener('input', updateEventCounters);
    adminOffers.addEventListener('input', updateEventCounters);
    
    // Edit and delete buttons (event delegation)
    document.addEventListener('click', (e) => {
      if (e.target.closest('.edit-btn')) {
        const btn = e.target.closest('.edit-btn');
        editIndex = +btn.dataset.index;
        const item = items[editIndex];
        
        document.getElementById('name').value = item.name;
        document.getElementById('img').value = item.img;
        document.getElementById('description').value = item.description;
        document.getElementById('price').value = item.price;
        document.getElementById('type').value = item.type;
        
        form.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-save me-2"></i>Actualizar';
        formContainer.classList.remove('d-none');
        formContainer.scrollIntoView({ behavior: 'smooth' });
      }
      
      if (e.target.closest('.delete-btn')) {
        const btn = e.target.closest('.delete-btn');
        const idx = +btn.dataset.index;
        const itemName = items[idx].name;
        
        if (confirm(`¿Seguro que quieres eliminar "${itemName}"?`)) {
          items.splice(idx, 1);
          saveAndRender();
          showAlert(`"${itemName}" ha sido eliminado.`, 'warning');
        }
      }
    });
  }
});