// Script para el footer interactivo
document.addEventListener('DOMContentLoaded', function() {
    const foot = document.getElementById('foot');
    const mask = document.getElementById('maskFoot');
    const guia = document.getElementById('guia');
    const iconos = document.querySelectorAll('.social.random');

    // Si no existe el footer, salimos (por si acaso)
    if (!foot) return;

    /* ---------- Posiciona cada icono aleatoriamente ---------- */
    function posicionaIconos() {
        const margen = 20; // Margen desde los bordes
        
        iconos.forEach(ic => {
            // Asegurar que el footer tenga dimensiones
            if (foot.offsetWidth === 0 || foot.offsetHeight === 0) return;
            
            const maxX = Math.max(0, foot.offsetWidth - ic.offsetWidth - margen);
            const maxY = Math.max(0, foot.offsetHeight - ic.offsetHeight - margen);
            
            // Generar posiciones aleatorias dentro de los límites
            const rndX = Math.floor(Math.random() * maxX) + margen;
            const rndY = Math.floor(Math.random() * maxY) + margen;
            
            // Aplicar posiciones
            ic.style.left = `${rndX}px`;
            ic.style.top = `${rndY}px`;
        });
    }

    // Ejecutar al cargar y al redimensionar
    posicionaIconos();
    window.addEventListener('resize', posicionaIconos);

    /* ---------- Efecto linterna y guía ---------- */
    foot.addEventListener('mousemove', e => {
        const r = foot.getBoundingClientRect();
        let x = e.clientX - r.left;
        let y = e.clientY - r.top;
        
        // Limitar coordenadas dentro del footer
        x = Math.max(0, Math.min(r.width, x));
        y = Math.max(0, Math.min(r.height, y));
        
        // Actualizar variables CSS
        mask.style.setProperty('--x', `${x}px`);
        mask.style.setProperty('--y', `${y}px`);
        guia.style.setProperty('--x', `${x}px`);
        guia.style.setProperty('--y', `${y}px`);
    });

    // Cuando el mouse sale, la linterna se apaga
    foot.addEventListener('mouseleave', () => {
        mask.style.setProperty('--x', '-200%');
        mask.style.setProperty('--y', '-200%');
    });

    // Pequeña mejora: re-posicionar iconos si cambia el tamaño de la ventana
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(posicionaIconos, 150);
    });
});

// Smooth scroll para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Validación simple del formulario (opcional)
const formulario = document.querySelector('.formulario-contacto');
if (formulario) {
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('¡Gracias por contactarme! Te responderé a la brevedad.');
        this.reset();
    });
}
