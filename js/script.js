// ========================================
// VARIABLES GLOBALES
// ========================================
let currentSection = 0;
let currentQuote = 0;
let musicPlaying = false;

const sections = [
    'welcome-screen',
    'message-section',
    'quotes-section',
    'wishes-section',
    'dragon-section'
];

// ========================================
// NAVEGACIÓN ENTRE SECCIONES
// ========================================
function nextSection() {
    // Ocultar sección actual
    const currentSectionElement = document.getElementById(sections[currentSection]);
    currentSectionElement.classList.remove('active');
    
    // Avanzar a la siguiente sección
    currentSection++;
    
    if (currentSection >= sections.length) {
        currentSection = sections.length - 1;
        return;
    }
    
    // Mostrar nueva sección
    const nextSectionElement = document.getElementById(sections[currentSection]);
    nextSectionElement.classList.add('active');
    
    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// CARRUSEL DE FRASES
// ========================================
function showQuote(index) {
    const quotes = document.querySelectorAll('.quote-card');
    
    // Ocultar todas las frases
    quotes.forEach(quote => {
        quote.classList.remove('active');
    });
    
    // Mostrar la frase actual
    if (index < 0) {
        currentQuote = quotes.length - 1;
    } else if (index >= quotes.length) {
        currentQuote = 0;
    } else {
        currentQuote = index;
    }
    
    quotes[currentQuote].classList.add('active');
}

function nextQuote() {
    showQuote(currentQuote + 1);
}

function prevQuote() {
    showQuote(currentQuote - 1);
}

// ========================================
// GUARDAR DESEOS
// ========================================
function saveWishes() {
    const wishesInput = document.getElementById('wishes-input');
    const confirmationMessage = document.getElementById('confirmation-message');
    
    if (wishesInput.value.trim() === '') {
        alert('Por favor, escribe tus deseos primero 💫');
        return;
    }
    
    // Mostrar mensaje de confirmación
    confirmationMessage.style.display = 'block';
    
    // Agregar efecto de confeti
    createConfetti();
    
    // Después de 2 segundos, mostrar la animación fantástica del dragón
    setTimeout(() => {
        confirmationMessage.style.display = 'none';
        showDragonAnimation();
    }, 2000);
}

// ========================================
// ANIMACIÓN FANTÁSTICA DEL DRAGÓN
// ========================================
function showDragonAnimation() {
    // Ir a la sección del dragón
    nextSection();
    
    // Crear efectos de partículas mágicas
    createMagicParticles();
    
    // Efecto de sonido visual (simulado con efectos)
    createSoundWaves();
}

// ========================================
// EFECTO CONFETI
// ========================================
function createConfetti() {
    const colors = ['#ff6b6b', '#ffb347', '#8e44ad', '#3498db', '#2ecc71'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.opacity = '1';
        
        document.body.appendChild(confetti);
        
        // Animación
        const duration = Math.random() * 3 + 2;
        const endPosition = Math.random() * window.innerHeight + window.innerHeight;
        const rotation = Math.random() * 360;
        
        confetti.animate([
            { 
                transform: 'translateY(0) rotate(0deg)',
                opacity: 1
            },
            { 
                transform: `translateY(${endPosition}px) rotate(${rotation}deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        // Eliminar después de la animación
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// ========================================
// CONTROL DE MÚSICA
// ========================================
function toggleMusic() {
    const musicToggle = document.getElementById('music-toggle');
    
    if (musicPlaying) {
        // Pausar música
        musicPlaying = false;
        musicToggle.textContent = '🎵 Música';
    } else {
        // Reproducir música
        musicPlaying = true;
        musicToggle.textContent = '⏸️ Pausar';
    }
}

function changeVolume() {
    const volumeControl = document.getElementById('volume-control');
    const volume = volumeControl.value / 100;
    console.log('Volumen:', volume);
}

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar la primera sección
    showQuote(0);
    
    // Detectar teclas para navegación
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' && currentSection === 2) {
            nextQuote();
        } else if (e.key === 'ArrowLeft' && currentSection === 2) {
            prevQuote();
        }
    });
    
    // Prevenir que el formulario se envíe
    const wishesInput = document.getElementById('wishes-input');
    wishesInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            saveWishes();
        }
    });
});

// ========================================
// EFECTOS ADICIONALES AL HACER SCROLL
// ========================================
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Efecto parallax para las medusas
    const jellyfish = document.querySelectorAll('.jellyfish');
    jellyfish.forEach((jelly, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrollTop * speed);
        jelly.style.transform = `translateY(${yPos}px)`;
    });
    
    lastScrollTop = scrollTop;
});

// ========================================
// ANIMACIÓN DE TULIPANES AL CARGAR
// ========================================
window.addEventListener('load', function() {
    const tulips = document.querySelectorAll('.tulip-decoration');
    tulips.forEach((tulip, index) => {
        setTimeout(() => {
            tulip.style.opacity = '0.8';
            tulip.style.transform = tulip.style.transform + ' scale(1)';
        }, index * 200);
    });
    
    // Efecto especial para el texto hero
    const heroText = document.querySelector('.hero-image');
    if (heroText) {
        // Efecto de escritura gradual
        const originalText = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Agregar efecto de pulso después de escribir
                heroText.style.animation += ', pulse 2s ease-in-out infinite';
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});

// ========================================
// EFECTO DE PULSO PARA EL TEXTO HERO
// ========================================
function addPulseEffect() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .hero-image:hover {
            animation-play-state: paused;
            transform: scale(1.1) !important;
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Llamar la función cuando se carga la página
document.addEventListener('DOMContentLoaded', addPulseEffect);

// ========================================
// EFECTOS MÁGICOS PARA EL DRAGÓN
// ========================================
function createMagicParticles() {
    const dragonContainer = document.querySelector('.dragon-particles');
    if (!dragonContainer) return;
    
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'magic-particle';
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 8 + 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = '0.8';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10';
        
        dragonContainer.appendChild(particle);
        
        // Animación de la partícula
        const duration = Math.random() * 0.3 + 0.2;
        const endX = (Math.random() - 0.5) * 200;
        const endY = (Math.random() - 0.5) * 200;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(0)',
                opacity: 0
            },
            { 
                transform: `translate(${endX}px, ${endY}px) scale(1)`,
                opacity: 0.8
            },
            { 
                transform: `translate(${endX * 1.5}px, ${endY * 1.5}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        // Eliminar partícula después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }
}

function createSoundWaves() {
    const dragonImage = document.querySelector('.dragon-image');
    if (!dragonImage) return;
    
    // Crear ondas de sonido visuales
    for (let i = 0; i < 5; i++) {
        const wave = document.createElement('div');
        wave.className = 'sound-wave';
        wave.style.position = 'absolute';
        wave.style.border = '2px solid rgba(255, 215, 0, 0.6)';
        wave.style.borderRadius = '50%';
        wave.style.left = '50%';
        wave.style.top = '50%';
        wave.style.transform = 'translate(-50%, -50%)';
        wave.style.pointerEvents = 'none';
        wave.style.zIndex = '5';
        
        dragonImage.parentNode.appendChild(wave);
        
        // Animación de la onda
        wave.animate([
            { 
                width: '0px',
                height: '0px',
                opacity: 0.8
            },
            { 
                width: '200px',
                height: '200px',
                opacity: 0
            }
        ], {
            duration: 300,
            delay: i * 50,
            easing: 'ease-out'
        });
        
        // Eliminar onda después de la animación
        setTimeout(() => {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        }, 300 + (i * 50));
    }
}
