// Navegación suave
document.addEventListener('DOMContentLoaded', function() {
  // Navegación suave para enlaces internos
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Cerrar menú móvil si está abierto
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Menú móvil toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
  }

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav') && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Animaciones al hacer scroll
  const revealElements = document.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .about-content, .about-image');
  
  const revealOnScroll = function() {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };
  
  // Añadir clase reveal inicialmente
  revealElements.forEach(element => {
    element.classList.add('reveal');
  });
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Ejecutar una vez al cargar

  // Contador animado para estadísticas
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;
  
  const animateStats = function() {
    if (counted) return;
    
    const heroSection = document.querySelector('.hero');
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    
    if (heroBottom < window.innerHeight) {
      counted = true;
      
      statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '+');
        }, 30);
      });
    }
  };
  
  window.addEventListener('scroll', animateStats);

  // Efecto de carga inicial
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });
});