// ===========================================
// Archivo js/main.js
// Lógica completa del portafolio en un solo lugar
// ===========================================

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================== */
    /* 1. LÓGICA DEL MENÚ DE HAMBURGUESA */
    /* =========================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            mainNav.classList.toggle('is-active');
        });

        // Cierra el menú al hacer clic en un enlace (para móviles)
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('is-active');
                menuToggle.classList.remove('is-active');
            });
        });
    }

    /* =========================================== */
    /* 2. LÓGICA DEL MODO OSCURO (VERSIÓN FINAL) */
    /* =========================================== */
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Función para aplicar el modo, ya sea desde localStorage o del sistema
    const aplicarModo = (modoOscuro) => {
        if (modoOscuro) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
        localStorage.setItem('dark-mode', modoOscuro);
    };

    // Revisar la preferencia del usuario al cargar la página
    const modoGuardado = localStorage.getItem('dark-mode');
    const sistemaOscuro = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (modoGuardado !== null) {
        aplicarModo(modoGuardado === 'true');
    } else {
        aplicarModo(sistemaOscuro);
    }
    
    // Toggle al hacer clic en el botón
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const esOscuro = !body.classList.contains('dark-mode');
            aplicarModo(esOscuro);
        });
    }

    /* =========================================== */
    /* 3. ANIMACIÓN DE REVELADO EN SCROLL */
    /* =========================================== */
    const elementosAnimados = document.querySelectorAll('.proyecto-card, .habilidad-item');
    
    if (elementosAnimados.length > 0) {
        const observador = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observador.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elementosAnimados.forEach(el => {
            el.classList.add('oculto');
            observador.observe(el);
        });
    }

});