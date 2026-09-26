// Scroll smooth pour les liens de navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');
const messageStatus = document.getElementById('messageStatus');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const sujet = document.getElementById('sujet').value;
    const message = document.getElementById('message').value;
    
    // Simulation d'envoi (remplace par une vraie API)
    console.log('Formulaire soumis:', { nom, email, sujet, message });
    
    // Afficher message de succès
    messageStatus.textContent = 'Merci ! Votre message a été envoyé avec succès.';
    messageStatus.className = 'success';
    messageStatus.classList.remove('hidden');
    
    // Réinitialiser le formulaire
    contactForm.reset();
    
    // Masquer le message après 5 secondes
    setTimeout(() => {
        messageStatus.classList.add('hidden');
    }, 5000);
});

// Animation au scroll pour les sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Appliquer l'animation aux éléments
document.querySelectorAll('.exp-item, .projet').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Highlight du lien actif dans la navigation
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});
