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
});
