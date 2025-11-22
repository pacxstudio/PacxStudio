// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isOpen = answer.style.display === 'block';
        
        // Cerrar todas las respuestas
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.style.display = 'none';
        });
        
        // Abrir/cerrar la respuesta clickeada
        if (!isOpen) {
            answer.style.display = 'block';
        }
    });
});

// Cerrar todas las respuestas por defecto
document.querySelectorAll('.faq-answer').forEach(answer => {
    answer.style.display = 'none';
});

// Smooth scroll para imágenes
const screenshots = document.querySelectorAll('.screenshot-image');
screenshots.forEach(img => {
    img.addEventListener('click', function() {
        // Aquí puedes agregar un lightbox o modal para ver las imágenes en grande
        console.log('Imagen clickeada:', this.alt);
    });
});

// Animación de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.feature-card, .screenshot-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

const screenshotCards = document.querySelectorAll('.screenshot-card');

// Crear modal
const modal = document.createElement('div');
modal.className = 'screenshot-modal';
modal.innerHTML = `
    <span class="modal-close">&times;</span>
    <img class="modal-content" src="" alt="Captura ampliada">
`;
document.body.appendChild(modal);

const modalImg = modal.querySelector('.modal-content');
const closeBtn = modal.querySelector('.modal-close');

// Abrir modal al hacer click en una captura
screenshotCards.forEach(card => {
    card.addEventListener('click', function() {
        const img = this.querySelector('.screenshot-image');
        modal.classList.add('active');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    });
});

// Cerrar modal
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Cerrar con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});
