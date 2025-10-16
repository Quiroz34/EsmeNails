// JavaScript para enviar formulario vía WhatsApp
document.addEventListener('DOMContentLoaded', function() {
  const reservationForm = document.getElementById('reservation-form');
  
  console.log('✅ Formulario WhatsApp cargado');

  // Navbar toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // Cerrar menú móvil al hacer clic en un enlace
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Configurar fecha mínima y máxima
  const fechaInput = document.getElementById('fecha');
  if (fechaInput) {
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];
    fechaInput.min = todayFormatted;
    
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    const maxDateFormatted = maxDate.toISOString().split('T')[0];
    fechaInput.max = maxDateFormatted;
  }

  // Validación en tiempo real
  const setupValidation = () => {
    const inputs = reservationForm.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        if (!this.value.trim()) {
          this.style.borderColor = '#e53e3e';
          this.style.background = '#fed7d7';
        } else {
          this.style.borderColor = '#38a169';
          this.style.background = '#f0fff4';
        }
      });
      
      input.addEventListener('input', function() {
        if (this.value.trim()) {
          this.style.borderColor = '#38a169';
          this.style.background = '#f0fff4';
        } else {
          this.style.borderColor = '#e2e8f0';
          this.style.background = 'white';
        }
      });
    });
  };

  // Función principal para enviar vía WhatsApp
  if (reservationForm) {
    setupValidation();

    reservationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('📤 Enviando formulario vía WhatsApp...');

      // Validación básica
      const requiredFields = reservationForm.querySelectorAll('[required]');
      let isValid = true;
      let firstInvalidField = null;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#e53e3e';
          field.style.background = '#fed7d7';
          if (!firstInvalidField) firstInvalidField = field;
        }
      });

      if (!isValid) {
        alert('❌ Por favor, completa todos los campos obligatorios marcados con *.');
        if (firstInvalidField) firstInvalidField.focus();
        return;
      }

      // Obtener valores del formulario
      const formData = new FormData(reservationForm);
      const datos = {
        nombre: formData.get('nombre').trim(),
        email: formData.get('email')?.trim() || 'No proporcionado',
        telefono: formData.get('telefono').trim(),
        servicio: formData.get('servicio'),
        fecha: formData.get('fecha'),
        hora: formData.get('hora'),
        mensaje: formData.get('mensaje')?.trim() || 'Sin mensaje adicional'
      };

      // Formatear fecha en español
      const fechaFormateada = new Date(datos.fecha + 'T00:00:00').toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Crear mensaje para WhatsApp
      const mensajeWhatsApp = `
🦄 *NUEVA RESERVA - GLAM NAILS STUDIO* 🦄

👤 *Nombre:* ${datos.nombre}
📞 *Teléfono:* ${datos.telefono}
📧 *Email:* ${datos.email}

💅 *Servicio solicitado:* ${datos.servicio}
📅 *Fecha preferida:* ${fechaFormateada}
⏰ *Hora preferida:* ${datos.hora}

💬 *Mensaje adicional:*
${datos.mensaje}

_Reserva enviada desde la página web_
      `.trim();

      // Número de WhatsApp
      const numeroWhatsApp = '7221570454'; // Sin el +52
      const urlWhatsApp = `https://wa.me/52${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;

      // Mostrar confirmación antes de enviar
      const confirmarEnvio = confirm(`¿Estás listo para enviar tu reserva a WhatsApp?\n\nRevisa que tus datos estén correctos:\n\nNombre: ${datos.nombre}\nTeléfono: ${datos.telefono}\nServicio: ${datos.servicio}\nFecha: ${fechaFormateada}\nHora: ${datos.hora}`);

      if (confirmarEnvio) {
        // Cambiar texto del botón temporalmente
        const submitBtn = reservationForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Redirigiendo...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        // Abrir WhatsApp después de un breve delay
        setTimeout(() => {
          window.open(urlWhatsApp, '_blank');
          
          // Restaurar botón después de 2 segundos
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            
            // Opcional: limpiar formulario después del envío
            const limpiarForm = confirm('¿Deseas limpiar el formulario para una nueva reserva?');
            if (limpiarForm) {
              reservationForm.reset();
              // Resetear estilos de validación
              const inputs = reservationForm.querySelectorAll('input, select, textarea');
              inputs.forEach(input => {
                input.style.borderColor = '#e2e8f0';
                input.style.background = 'white';
              });
            }
          }, 2000);
        }, 1000);
      }
    });
  }

  // Header scroll effect
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
      if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }
    }
  });
});