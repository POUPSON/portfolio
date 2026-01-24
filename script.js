// ===== NAVIGATION SCROLL =====
// Change la couleur de la navbar au scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#1a252f';
    } else {
        navbar.style.backgroundColor = '#2c3e50';
    }
});

// ===== SMOOTH SCROLL POUR LES LIENS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== ANIMATION DES BARRES DE COMPÉTENCES =====
// Observer pour détecter quand la section compétences est visible
const skillsSection = document.querySelector('.skills');
const skillBars = document.querySelectorAll('.skill-progress');

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Anime les barres de compétences
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (skillsSection) {
    observer.observe(skillsSection);
}

// ===== VALIDATION DU FORMULAIRE DE CONTACT =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des valeurs
        const nom = document.getElementById('nom').value.trim();
        const email = document.getElementById('email').value.trim();
        const sujet = document.getElementById('sujet').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        let isValid = true;
        let errorMessage = '';
        
        // Vérification du nom
        if (nom === '' || nom.length < 2) {
            isValid = false;
            errorMessage += '- Le nom doit contenir au moins 2 caractères\n';
        }
        
        // Vérification de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            errorMessage += '- L\'email n\'est pas valide\n';
        }
        
        // Vérification du sujet
        if (sujet === '' || sujet.length < 3) {
            isValid = false;
            errorMessage += '- Le sujet doit contenir au moins 3 caractères\n';
        }
        
        // Vérification du message
        if (message === '' || message.length < 10) {
            isValid = false;
            errorMessage += '- Le message doit contenir au moins 10 caractères\n';
        }
        
        // Affichage du résultat
        if (isValid) {
            alert('✅ Message envoyé avec succès !\n\nMerci de m\'avoir contacté, je vous répondrai bientôt.');
            contactForm.reset();
        } else {
            alert('❌ Erreur dans le formulaire :\n\n' + errorMessage);
        }
    });
}

// ===== EFFET TYPING POUR LE TITRE =====
function typeWriter() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < originalText.length) {
            heroTitle.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    
    // Démarre l'animation après un court délai
    setTimeout(type, 500);
}

// Lance l'effet typing au chargement de la page
window.addEventListener('load', typeWriter);

// ===== ANIMATION DES CARTES DE PROJETS AU SCROLL =====
const projectCards = document.querySelectorAll('.project-card');

const projectObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            projectObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

projectCards.forEach(card => {
    projectObserver.observe(card);
});

// ===== BOUTON "VOIR MES PROJETS" =====
const heroButton = document.querySelector('.hero .btn-primary');
if (heroButton) {
    heroButton.addEventListener('click', function() {
        const projectsSection = document.getElementById('projets');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ===== EFFET PARALLAX SIMPLE SUR LE HERO =====
window.addEventListener('scroll', function() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    const scrollPosition = window.scrollY;
    
    if (heroContent && heroImage) {
        heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    }
});

// ===== COMPTEUR POUR LES COMPÉTENCES =====
function animateSkillPercentages() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const progressBar = item.querySelector('.skill-progress');
        const targetWidth = parseInt(progressBar.style.width);
        
        // Crée un élément pour afficher le pourcentage
        if (!item.querySelector('.skill-percentage')) {
            const percentageSpan = document.createElement('span');
            percentageSpan.className = 'skill-percentage';
            percentageSpan.style.cssText = 'float: right; color: #00d9ff; font-weight: bold;';
            item.querySelector('.skill-name').appendChild(percentageSpan);
            
            // Animation du compteur
            let currentPercentage = 0;
            const interval = setInterval(() => {
                if (currentPercentage <= targetWidth) {
                    percentageSpan.textContent = currentPercentage + '%';
                    currentPercentage++;
                } else {
                    clearInterval(interval);
                }
            }, 20);
        }
    });
}

// Lance l'animation des pourcentages quand la section est visible
const skillsSectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillPercentages();
            skillsSectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsSectionObserver.observe(skillsSection);
}

// ===== EFFET HOVER SUR LES LIENS SOCIAUX =====
const socialLinks = document.querySelectorAll('.social-links a');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(5deg)';
        this.style.transition = 'all 0.3s ease';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ===== MESSAGE DE BIENVENUE DANS LA CONSOLE =====
console.log('%c🎨 Portfolio créé avec passion ! ', 'background: #00d9ff; color: white; font-size: 20px; padding: 10px;');
console.log('%cMerci de visiter mon portfolio 😊', 'color: #667eea; font-size: 16px;');

// ===== DÉTECTION DU MODE SOMBRE (BONUS) =====
// Vérifie si l'utilisateur préfère le mode sombre
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('Mode sombre détecté - Vous pouvez adapter le design si nécessaire');
}