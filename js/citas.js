document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cita');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const dia = document.getElementById('dia').value;
    const hora = document.getElementById('hora').value;
    const telefono = document.getElementById('telefono').value.trim();

    // Validación simple
    if (!nombre || !dia || !hora || !telefono) {
      alert('Por favor completa todos los campos antes de confirmar.');
      return;
    }

    // Número de WhatsApp del negocio en formato internacional (sin +)
    const whatsappNumber = "+527228964383"; // Cambia por tu número real

    // Formatear la fecha de forma legible (opcional)
    const fechaFormateada = new Date(dia).toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Construir mensaje
    const mensaje = `
Hola, quiero agendar una cita en Uñas Bellas:
Nombre: ${nombre}
Día: ${fechaFormateada}
Hora: ${hora}
Teléfono: ${telefono}
`;

    // Codificar mensaje para URL
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;

    // Abrir WhatsApp Web o app móvil en nueva pestaña
    window.open(url, '_blank');
  });
});

