// Smooth scrolling para enlaces de navegación
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

// Animación de entrada para las tarjetas de productos
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animación a las tarjetas de productos
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Efecto hover mejorado para botones
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.1s ease';
    });
});

// Manejador del formulario de contacto
// ============================================
// FORMULARIO DE CONTACTO CON WEB3FORMS
// ============================================

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validación básica
        if (!name || !email || !message) {
            showNotification('Por favor completa todos los campos', 'error');
            return;
        }
        
        // Cambiar estado del botón
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
        
        // Preparar datos del formulario
        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        
        try {
            // Enviar a Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Éxito
                console.log('✅ Mensaje enviado exitosamente');
                showNotification('¡Mensaje enviado con éxito! Te responderemos pronto a ' + email, 'success');
                contactForm.reset();
            } else {
                // Error del servidor
                console.error('❌ Error en el servidor:', result);
                showNotification('Hubo un problema al enviar el mensaje. Por favor intenta de nuevo.', 'error');
            }
        } catch (error) {
            // Error de conexión
            console.error('❌ Error de conexión:', error);
            showNotification('Error de conexión. Por favor verifica tu internet e intenta de nuevo.', 'error');
        } finally {
            // Restaurar botón siempre
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });
}

// Función para mostrar notificaciones
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 20px 30px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        font-family: 'Press Start 2P', cursive;
        font-size: 10px;
        border: 4px solid #2c3e50;
        box-shadow: 6px 6px 0 rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Animaciones CSS adicionales
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Easter egg: Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s infinite';
        showNotification('¡Código secreto activado! 🎮', 'success');
        
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 4000);
    }
});

// Parallax suave en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.pixel-block');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.2);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});