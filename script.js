// ===== SCROLL REVEAL (Fade Up) - Staggered =====
const fadeElements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Find siblings with fade-up in same parent for stagger
            const parent = entry.target.parentElement;
            const siblings = parent.querySelectorAll('.fade-up');
            let delay = 0;
            siblings.forEach(sib => {
                if (sib.getBoundingClientRect().top < window.innerHeight) {
                    setTimeout(() => sib.classList.add('visible'), delay);
                    delay += 80;
                }
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// ===== ANIMATED COUNTERS =====
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'));
            let current = 0;
            const increment = target / 40;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current);
                }
            }, 30);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ===== PROGRESS BARS =====
const progressBars = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(el => progressObserver.observe(el));

// ===== NAVBAR =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== MOBILE NAV =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== LUCIDE ICONS =====
lucide.createIcons();

// ===== NAVBAR ACTIVE LINK =====
const allSections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    allSections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                link.classList.add('nav-active');
            } else {
                link.classList.remove('nav-active');
            }
        }
    });
});

// ===== MARQUEE PAUSE ON HOVER =====
const marqueeTrack = document.querySelector('.marquee-track');
const marqueeWrapper = document.querySelector('.marquee-wrapper');
if (marqueeWrapper) {
    marqueeWrapper.addEventListener('mouseenter', () => {
        marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeWrapper.addEventListener('mouseleave', () => {
        marqueeTrack.style.animationPlayState = 'running';
    });
}

// ===== SMOOTH PAGE LOAD =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});


// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// ===== CURSOR GLOW ON HERO =====
const hero = document.querySelector('.hero');
const heroGlow = document.getElementById('heroGlow');

if (hero && heroGlow) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        heroGlow.style.left = x + 'px';
        heroGlow.style.top = y + 'px';
    });
}

// ===== TILT EFFECT ON PROJECT CARDS =====
const tiltCards = document.querySelectorAll('.project-showcase, .project-mini');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== PARALLAX BLOBS ON MOUSE MOVE =====
const blobs = document.querySelectorAll('.organic-blob');

if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

        blobs.forEach((blob, i) => {
            const speed = (i + 1) * 15;
            blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    hero.addEventListener('mouseleave', () => {
        blobs.forEach(blob => {
            blob.style.transform = 'translate(0, 0)';
            blob.style.transition = 'transform 0.5s ease';
        });
    });
}
