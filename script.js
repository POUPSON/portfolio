// ===== NAVIGATION SCROLL =====
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
const skillsSection = document.querySelector('.skills');
const skillBars = document.querySelectorAll('.skill-progress');

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
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
        
        const nom = document.getElementById('nom').value.trim();
        const email = document.getElementById('email').value.trim();
        const sujet = document.getElementById('sujet').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        let errorMessage = '';
        
        if (nom === '' || nom.length < 2) {
            isValid = false;
            errorMessage += '- Le nom doit contenir au moins 2 caractères\n';
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            errorMessage += '- L\'email n\'est pas valide\n';
        }
        
        if (sujet === '' || sujet.length < 3) {
            isValid = false;
            errorMessage += '- Le sujet doit contenir au moins 3 caractères\n';
        }
        
        if (message === '' || message.length < 10) {
            isValid = false;
            errorMessage += '- Le message doit contenir au moins 10 caractères\n';
        }
        
        if (isValid) {
            // Sauvegarde du projet
            const project = {
                nom: nom,
                email: email,
                sujet: sujet,
                message: message,
                date: new Date().toLocaleDateString('fr-FR')
            };

            let projects = JSON.parse(localStorage.getItem("projects")) || [];
            projects.push(project);
            localStorage.setItem("projects", JSON.stringify(projects));

            alert('✅ Message envoyé avec succès !\n\nMerci de m\'avoir contacté, je vous répondrai bientôt.');
            contactForm.reset();
            
            // Mise à jour de la box projets
            updateProjectBox();
        } else {
            alert('❌ Erreur dans le formulaire :\n\n' + errorMessage);
        }
    });
}

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

// ===== COMPTEUR POUR LES COMPÉTENCES =====
function animateSkillPercentages() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const progressBar = item.querySelector('.skill-progress');
        const targetWidth = parseInt(progressBar.style.width);
        
        if (!item.querySelector('.skill-percentage')) {
            const percentageSpan = document.createElement('span');
            percentageSpan.className = 'skill-percentage';
            percentageSpan.style.cssText = 'color: #00d9ff; font-weight: bold;';
            item.querySelector('.skill-name').appendChild(percentageSpan);
            
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

// ===== GESTION DES PROJETS (BOX À DROITE) =====
const projectList = document.getElementById("projectList");
const projectCount = document.getElementById("projectCount");
const projectDetails = document.getElementById("projectDetails");

// Initialisation
updateProjectBox();

function updateProjectBox() {
    if (!projectList || !projectCount) return;

    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    
    projectList.innerHTML = "";
    projectCount.textContent = projects.length;

    if (projects.length === 0) {
        projectList.innerHTML = '<li style="background: #34495e; cursor: default;">Aucun projet soumis</li>';
        return;
    }

    projects.forEach((p, index) => {
        const li = document.createElement("li");
        li.textContent = "📋 " + p.sujet;
        li.addEventListener("click", () => showProject(p));
        projectList.appendChild(li);
    });
}

function showProject(project) {
    if (!projectDetails) return;

    projectDetails.classList.remove("hidden");
    document.getElementById("detailSujet").textContent = project.sujet;
    document.getElementById("detailNom").textContent = project.nom;
    document.getElementById("detailEmail").textContent = project.email;
    document.getElementById("detailMessage").textContent = project.message;
}

// ===== ANIMATION D'APPARITION DES ÉLÉMENTS =====
const animateOnScroll = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Appliquer l'animation aux sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    animateOnScroll.observe(section);
});

// ===== ANIMATION TIMELINE =====
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'all 0.6s ease';
    timelineObserver.observe(item);
});

// ===== MESSAGE DE BIENVENUE DANS LA CONSOLE =====
console.log('%c🎨 Portfolio de Christian Camille NTAGNE FONKAM', 'background: #00d9ff; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c👨‍💻 Développeur Full Stack | Spécialiste BI | Passionné de Cybersécurité', 'color: #667eea; font-size: 14px; font-weight: bold;');
console.log('%c📧 Contact: fonkamchristian1@gmail.com', 'color: #00d9ff; font-size: 12px;');
console.log('%c📍 Abidjan, Côte d\'Ivoire', 'color: #764ba2; font-size: 12px;');

// ===== BOUTON DE TÉLÉCHARGEMENT CV =====
const cvButtons = document.querySelectorAll('.btn-secondary');
cvButtons.forEach(button => {
    if (button.textContent.includes('CV')) {
        button.addEventListener('click', function() {
            alert('📄 Le téléchargement du CV va démarrer.\n\nPour configurer cette fonctionnalité, ajoutez votre CV en PDF dans le dossier et mettez à jour le lien.');
            // Décommenter et modifier avec le bon chemin vers votre CV
            // window.open('path/to/FONKAM_Christian_CV.pdf', '_blank');
        });
    }
});

// ===== DÉTECTION DU MODE SOMBRE =====
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('🌙 Mode sombre détecté');
}

// ===== COMPTEUR DE VISITES (OPTIONNEL) =====
function incrementVisitCounter() {
    let visits = localStorage.getItem('portfolioVisits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('portfolioVisits', visits);
    console.log(`📊 Nombre de visites: ${visits}`);
}

incrementVisitCounter();
