// certificates.js - Funcionalidad específica para la página de certificados

// Función para abrir el modal
function openModal(certId) {
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalImage');

    // Mapear IDs de certificados a rutas de archivos
    const certificatePaths = {
        'cert1': 'images/Certificado_AplicacionMovil.pdf',
        'cert2': 'images/CertificadoJUDC CURMATAGALPA-110.pdf',
        'cert3': 'images/CartaFirmadaNegocio.pdf',
        'cert4': 'images/Certificado_Microsoft.pdf',
        'cert5': 'images/generated.pdf'
    };

    if (certificatePaths[certId]) {
        modalImage.src = certificatePaths[certId];
        modal.style.display = 'block';
    }
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'none';
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('certificateModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Navegación para la página de certificados
document.querySelectorAll('#home-btn, #projects-btn, #microsoft-btn').forEach(button => {
    button.addEventListener('click', function() {
        let targetUrl;

        switch(this.id) {
            case 'home-btn':
                targetUrl = 'index.html';
                break;
            case 'projects-btn':
                targetUrl = 'projects.html';
                break;
            case 'microsoft-btn':
                targetUrl = 'microsoft.html';
                break;
        }

        if (targetUrl) {
            window.location.href = targetUrl;
        }
    });
});

// Animaciones específicas para certificados
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animaciones iniciales para las tarjetas de certificados
        gsap.set('.certificate-card', { opacity: 0, y: 50 });
        gsap.to('.certificate-card', {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.5 // Pequeño delay para asegurar que se ejecute después de cargar
        });

        // Efectos hover para tarjetas de certificados
        const certificateCards = document.querySelectorAll('.certificate-card');
        certificateCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
});
