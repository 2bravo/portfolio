// ===== SCROLL SUAVE CON RUEDA DEL RATÓN =====
let scrollTimeout, smoothScrollSpeed = 0;
window.addEventListener('wheel', function(e) {
    scrollTimeout && cancelAnimationFrame(scrollTimeout);
    smoothScrollSpeed = Math.max(-8, Math.min(8, smoothScrollSpeed + e.deltaY * 0.3));

    function animate() {
        Math.abs(smoothScrollSpeed *= 0.97) > 0.1 ? (window.scrollBy(0, smoothScrollSpeed), scrollTimeout = requestAnimationFrame(animate)) : 0;
    }
    scrollTimeout = requestAnimationFrame(animate);
}, { passive: true });

// ===== ENLACE ACTIVO DE NAVEGACIÓN =====
const sections = document.querySelectorAll('section[id]'), navLinks = document.querySelectorAll('.nav-link');
function highlightNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        scrollY > sectionTop && scrollY <= sectionTop + section.offsetHeight && navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
        });
    });
}
window.addEventListener('scroll', highlightNavLink);

// ===== BOTÓN VOLVER ARRIBA =====
const backToTopButton = document.getElementById('backToTop');
window.addEventListener('scroll', () => backToTopButton.classList.toggle('visible', window.pageYOffset > 300));

// ===== ENVÍO DE FORMULARIO =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(contactForm), nombre = formData.get('nombre'), email = formData.get('email'), mensaje = formData.get('mensaje');
    if (!nombre || !email || !mensaje) return alert('Por favor, completa todos los campos requeridos.');
    alert(`¡Gracias ${nombre}! Tu mensaje ha sido recibido. Te contactaré pronto en ${email}.`);
    contactForm.reset();
});

// ===== SCROLL SUAVE =====
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target && window.scrollTo({ top: target.offsetTop - document.querySelector('.navbar').offsetHeight, behavior: 'smooth' });
        });
    });
});
