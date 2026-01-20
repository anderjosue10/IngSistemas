// main.js
// Configuración de partículas
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#6366f1', '#f472b6', '#06b6d4']
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: true
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#6366f1',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            }
        }
    },
    retina_detect: true
});

// Cursor personalizado
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    // Efectos hover para el cursor
    const hoverElements = document.querySelectorAll('a, button, .nav-btn, .social-btn, .project-card, .certificate-card, .achievement-card');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
            cursorFollower.classList.add('hovered');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
            cursorFollower.classList.remove('hovered');
        });
    });
}

// Navegación suave para los botones
document.querySelectorAll('#projects-btn, #certificates-btn, #microsoft-btn').forEach(button => {
    button.addEventListener('click', function() {
        let targetUrl;

        switch(this.id) {
            case 'projects-btn':
                targetUrl = 'projects.html';
                break;
            case 'certificates-btn':
                targetUrl = 'certificates.html';
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



// Loading screen will be handled in DOMContentLoaded

// Animaciones avanzadas con GSAP
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animación inicial de la página
    function initAnimations() {
        console.log('Iniciando animaciones GSAP');
        
        // Timeline principal
        const masterTL = gsap.timeline();
        
        // Animación del hero section centrado
        masterTL.from('.hero-text-centered', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.central-image', {
            duration: 1.2,
            scale: 0,
            rotation: 360,
            ease: 'back.out(1.7)'
        }, '-=0.8')
        .from('.fire-effect', {
            duration: 1,
            scale: 0,
            stagger: 0.2,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.floating-orb', {
            duration: 1,
            scale: 0,
            stagger: 0.3,
            ease: 'power2.out'
        }, '-=0.8')
        .from('.social-buttons-bottom', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.3');

// Animaciones de scroll para cada sección (excluyendo contacto)
gsap.utils.toArray('section').forEach(section => {
    // Excluir la sección de contacto
    if (section.id !== 'contact-section') {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    }
});





        // Animación del navbar superior
        gsap.to('.top-navbar', {
            scrollTrigger: {
                trigger: 'body',
                start: '100px top',
                end: 'max',
                toggleClass: { targets: '.top-navbar', className: 'scrolled' }
            }
        });

        // Efectos parallax para elementos flotantes
        gsap.to('.floating-orb', {
            y: 30,
            rotation: 10,
            scrollTrigger: {
                trigger: '.hero-centered',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // Animación continua de los efectos de fuego
        gsap.to('.fire-effect', {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: 'none'
        });

        // Efectos hover avanzados para botones de navegación
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    y: -5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Efectos para botones de redes sociales
        const socialButtons = document.querySelectorAll('.social-btn');
        socialButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
        });
    }

    // Inicializar animaciones cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            initAnimations();
        }, 100);
    });
} else {
    console.warn('GSAP no está cargado correctamente');
}

// Función para abrir el modal de certificados
function openModal(certId) {
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalImage');

    if (certId === 'cert1') {
        modalImage.src = 'images/Certificado_AplicacionMovil.png'; // Ajusta la extensión si es necesario
    } else if (certId === 'cert2') {
        modalImage.src = 'images/Certificado_AplicacionMovil.png'; // Usa la misma imagen por ahora, puedes cambiarla después
    }

    modal.style.display = 'block';
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

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portafolio cargado correctamente');

    // Loading screen removed

    // Añadir clase reveal a elementos
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });

    // Enlaces de redes sociales (actualizar con tus enlaces reales)
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const instagramBtn = document.querySelector('.instagram-btn');
    const facebookBtn = document.querySelector('.facebook-btn');
    const linkedinBtn = document.querySelector('.linkedin-btn');

    // Fall back to the real links present in the footer (update to your real profiles)
    if (whatsappBtn) whatsappBtn.href = 'https://wa.me/82320500';
    if (instagramBtn) instagramBtn.href = 'https://instagram.com/a_j_g_r_17';
    if (facebookBtn) facebookBtn.href = 'https://facebook.com/Jos%C3%A9%20Guti%C3%A9rrez%20Rivera';
    if (linkedinBtn) linkedinBtn.href = 'https://www.linkedin.com/in/anderson-josué-gutiérrez-rivera-887687370';


});
