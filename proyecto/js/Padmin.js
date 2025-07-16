// Cargar datos existentes
  document.addEventListener('DOMContentLoaded', function() {
    const events = localStorage.getItem('admin-events');
    const offers = localStorage.getItem('admin-offers');
    
    if(events) document.getElementById('admin-events').value = events;
    if(offers) document.getElementById('admin-offers').value = offers;
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