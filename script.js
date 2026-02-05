
document.addEventListener("DOMContentLoaded", () => {

    /* ================= NAVBAR SCROLL ================= */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.style.backgroundColor =
            window.scrollY > 50 ? '#1a252f' : '#2c3e50';
    });

    /* ================= SMOOTH SCROLL ================= */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    /* ================= ANIMATION COMPÉTENCES ================= */
    const skillsSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const finalWidth = bar.style.width;
                    bar.style.width = '0%';

                    setTimeout(() => {
                        bar.style.width = finalWidth;
                        animatePercentage(bar, finalWidth);
                    }, 150);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    if (skillsSection) skillsObserver.observe(skillsSection);

    function animatePercentage(bar, width) {
        const skillItem = bar.closest('.skill-item');
        const skillName = skillItem.querySelector('.skill-name');

        if (skillName.querySelector('.skill-percentage')) return;

        const span = document.createElement('span');
        span.className = 'skill-percentage';
        span.style.color = '#00d9ff';
        span.style.fontWeight = 'bold';
        skillName.appendChild(span);

        let current = 0;
        const target = parseInt(width);
        const interval = setInterval(() => {
            current++;
            span.textContent = current + '%';
            if (current >= target) clearInterval(interval);
        }, 15);
    }

    /* ================= ANIMATIONS AU SCROLL ================= */
    const animatedElements = document.querySelectorAll(
        'section, .project-card, .timeline-item'
    );

    const scrollObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(0,0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        scrollObserver.observe(el);
    });

    /* ================= BOUTON HERO ================= */
    const heroBtn = document.querySelector('.hero .btn-primary');
    heroBtn?.addEventListener('click', () => {
        document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' });
    });

    /* ================= FORMULAIRE CONTACT ================= */
    const form = document.getElementById('contactForm');
    form?.addEventListener('submit', e => {
        e.preventDefault();

        const nom = nomInput.value.trim();
        const email = emailInput.value.trim();
        const sujet = sujetInput.value.trim();
        const message = messageInput.value.trim();

        if (nom.length < 2 || sujet.length < 3 || message.length < 10) {
            alert('❌ Veuillez remplir correctement tous les champs');
            return;
        }

        const project = { nom, email, sujet, message };
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));

        alert('✅ Message envoyé avec succès');
        form.reset();
        updateProjectBox();
    });

    /* ================= BOX PROJETS ================= */
    const projectList = document.getElementById('projectList');
    const projectCount = document.getElementById('projectCount');
    const projectDetails = document.getElementById('projectDetails');

    function updateProjectBox() {
        if (!projectList || !projectCount) return;

        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        projectCount.textContent = projects.length;
        projectList.innerHTML = '';

        if (projects.length === 0) {
            projectList.innerHTML = '<li>Aucun projet soumis</li>';
            return;
        }

        projects.forEach(p => {
            const li = document.createElement('li');
            li.textContent = '📋 ' + p.sujet;
            li.onclick = () => showProject(p);
            projectList.appendChild(li);
        });
    }

    function showProject(p) {
        projectDetails.classList.remove('hidden');
        detailSujet.textContent = p.sujet;
        detailNom.textContent = p.nom;
        detailEmail.textContent = p.email;
        detailMessage.textContent = p.message;
    }

    updateProjectBox();

    /* ================= BOUTON CV ================= */
    document.querySelectorAll('.btn-secondary').forEach(btn => {
        if (btn.textContent.includes('CV')) {
            btn.onclick = () => window.open('./FONKAM_Christian_CV.pdf', '_blank');
        }
    });

    /* ================= HOVER RÉSEAUX ================= */
    document.querySelectorAll('.social-links a').forEach(link => {
        link.onmouseenter = () => link.style.transform = 'scale(1.2)';
        link.onmouseleave = () => link.style.transform = 'scale(1)';
    });

    /* ================= COMPTEUR VISITES ================= */
    let visits = localStorage.getItem('portfolioVisits') || 0;
    localStorage.setItem('portfolioVisits', ++visits);
    console.log(`📊 Visites : ${visits}`);

    /* ================= CONSOLE ================= */
    console.log('%c🎨 Portfolio Christian Camille NTAGNE FONKAM', 'background:#00d9ff;color:white;padding:10px;font-size:16px');
});
