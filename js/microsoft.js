// microsoft.js - Funcionalidad específica para la página de logros Microsoft

// Navegación para la página de Microsoft
document.querySelectorAll('#home-btn, #projects-btn, #certificates-btn').forEach(button => {
    button.addEventListener('click', function() {
        let targetUrl;

        switch(this.id) {
            case 'home-btn':
                targetUrl = 'index.html';
                break;
            case 'projects-btn':
                targetUrl = 'projects.html';
                break;
            case 'certificates-btn':
                targetUrl = 'certificates.html';
                break;
        }

        if (targetUrl) {
            window.location.href = targetUrl;
        }
    });
});

// Función para abrir el modal de logros Microsoft
function openAchievementModal(achievementId) {
    const modal = document.getElementById('achievementModal');
    const modalEmbed = document.getElementById('achievementEmbed');

    // Mapear IDs de logros a rutas de archivos
    const achievementPaths = {
        'achievement1': 'images/githubCopilot.pdf',
        'achievement2': 'images/LogicaC.pdf',
        'achievement3': 'images/uso de matrices y de la y la intruccion foreach en C.pdf',
        'achievement4': 'images/InformesBI.pdf'
    };

    if (achievementPaths[achievementId]) {
        modalEmbed.src = achievementPaths[achievementId];
        modal.style.display = 'block';
    }
}

// Función para cerrar el modal de logros Microsoft
function closeAchievementModal() {
    const modal = document.getElementById('achievementModal');
    modal.style.display = 'none';
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('achievementModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Animaciones específicas para logros Microsoft
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animaciones iniciales para las tarjetas de logros
        gsap.set('.achievement-card', { opacity: 0, y: 50 });
        gsap.to('.achievement-card', {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.5 // Pequeño delay para asegurar que se ejecute después de cargar
        });

        // Efectos hover para tarjetas de logros
        const achievementCards = document.querySelectorAll('.achievement-card');
        achievementCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.05,
                    rotation: 2,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
});
