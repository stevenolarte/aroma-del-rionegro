document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-controls .prev');
    const nextButton = document.querySelector('.carousel-controls .next');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let currentIndex = 0;
    let isTransitioning = false;

    // Función para actualizar la posición del carrusel
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    // Función para mover al siguiente slide
    function nextSlide() {
        if (!isTransitioning) {
            isTransitioning = true;
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
            setTimeout(() => isTransitioning = false, 500); // Duración de la transición
        }
    }

    // Función para mover al slide anterior
    function prevSlide() {
        if (!isTransitioning) {
            isTransitioning = true;
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
            setTimeout(() => isTransitioning = false, 500); // Duración de la transición
        }
    }

    // Agregar event listeners a los botones de control
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Agregar event listeners a los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (!isTransitioning && index !== currentIndex) {
                isTransitioning = true;
                currentIndex = index;
                updateCarousel();
                setTimeout(() => isTransitioning = false, 500); // Duración de la transición
            }
        });
    });

    // Swipe para dispositivos móviles
    let startX = 0;
    let endX = 0;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', () => {
        if (startX - endX > 50) {
            nextSlide();
        } else if (endX - startX > 50) {
            prevSlide();
        }
    });

    // Funcionamiento del menú de navegación en dispositivos móviles
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Carrusel Automático en la sección "Sobre Nosotros"
    const aboutCarousel = document.querySelector('.about-us-carousel-inner');
    const aboutSlides = document.querySelectorAll('.about-us-carousel-slide');
    let aboutIndex = 0;
    let isAboutTransitioning = false;

    function nextAboutSlide() {
        if (!isAboutTransitioning) {
            isAboutTransitioning = true;
            aboutIndex = (aboutIndex + 1) % aboutSlides.length;
            aboutCarousel.style.transform = `translateX(-${aboutIndex * 100}%)`;
            setTimeout(() => isAboutTransitioning = false, 500); // Duración de la transición
        }
    }

    setInterval(nextAboutSlide, 3000); // Cambia de slide cada 3 segundos

    // Pop-up centrado
    const popup = document.querySelector('.popup');
    const popupCloseButton = document.querySelector('.popup .close-btn');
    const popupTrigger = document.querySelector('.cta-btn');

    function showPopup() {
        popup.style.display = 'block';
    }

    function closePopup() {
        popup.style.display = 'none';
    }

    popupTrigger.addEventListener('click', showPopup);
    popupCloseButton.addEventListener('click', closePopup);

    // Cerrar el popup cuando se hace clic fuera del mismo
    window.addEventListener('click', function (e) {
        if (e.target === popup) {
            closePopup();
        }
    });
});
