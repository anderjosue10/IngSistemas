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
        }, '-=0.3')
        .from('.nav-btn', {
            duration: 0.6,
            y: -50,
            opacity: 0,
            stagger: 0.15,
            ease: 'power2.out'
        }, '-=0.5');

        // Animaciones de scroll para cada sección
        gsap.utils.toArray('section').forEach(section => {
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
        // Pequeño delay para asegurar que todo esté cargado
        setTimeout(() => {
            initAnimations();
        }, 100);
    });
} else {
    console.warn('GSAP no está cargado correctamente');
}

// Función para crear partículas (backup si GSAP falla)
function createParticle(element) {
    const particle = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    particle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: currentColor;
        border-radius: 50%;
        pointer-events: none;
        left: ${rect.left + rect.width/2}px;
        top: ${rect.top + rect.height/2}px;
        z-index: 10000;
    `;
    
    document.body.appendChild(particle);
    
    // Animación simple si GSAP no está disponible
    particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(0)`, opacity: 0 }
    ], {
        duration: 800,
        easing: 'ease-out'
    }).onfinish = () => {
        document.body.removeChild(particle);
    };
}