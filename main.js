document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================================
    // 1. EFECTO DEL HEADER AL HACER SCROLL (Solo en página de inicio)
    // =========================================================
    const body = document.body;
    const header = document.getElementById('main-header');
    
    if (body.classList.contains('home-page') && header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // =========================================================
    // 2. MENÚ MÓVIL (Hamburguesa)
    // =========================================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Cambiar el icono de hamburguesa a "X"
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Cerrar el menú al hacer clic en un enlace (útil en móviles)
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // =========================================================
    // 3. LÓGICA DEL CARRUSEL HERO (Solo en página de inicio)
    // =========================================================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        // Función para mostrar un slide específico
        function showSlide(index) {
            // Quitar clase active de todos
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            
            // Añadir clase active al actual
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }

        // Función para avanzar al siguiente slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Exponer la función al contexto global (window) para que funcione el 'onclick' del HTML
        window.jumpToSlide = function(index) {
            currentSlide = index;
            showSlide(currentSlide);
            // Reiniciar el temporizador para que no cambie justo después de hacer clic manual
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 6000);
        };

        // Iniciar el temporizador automático (cambia cada 6 segundos)
        slideInterval = setInterval(nextSlide, 6000);
    }

    // =========================================================
    // 4. CARRUSEL INFINITO DE DECANOS (En Inicio y Autoridades)
    // =========================================================
    const track = document.getElementById('sliderTrack');
    if (track) {
        // Clonamos el contenido exacto y lo pegamos a continuación 
        // para crear la ilusión de que nunca termina (scroll infinito continuo)
        const clone = track.innerHTML;
        track.innerHTML += clone; 
    }


    // =========================================================
    // 6. SISTEMA DE MODALES PARA INFORMACIÓN DE AUTORIDADES
    // =========================================================
    window.openModal = function(person) {
        const modal = document.getElementById(`modal-${person}`);
        if (modal) {
            modal.classList.add('active');
            // Prevenir scroll cuando el modal está abierto
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = function(person) {
        const modal = document.getElementById(`modal-${person}`);
        if (modal) {
            modal.classList.remove('active');
            // Reactivar el scroll
            document.body.style.overflow = 'auto';
        }
    };

    // Cerrar modal cuando se hace clic fuera del contenido
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                // Obtener el ID del modal y extraer el nombre de la persona
                const personName = this.id.replace('modal-', '');
                closeModal(personName);
            }
        });
    });

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    const personName = modal.id.replace('modal-', '');
                    closeModal(personName);
                }
            });
        }
    });

});