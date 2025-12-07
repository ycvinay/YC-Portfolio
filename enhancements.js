// ===== UNIQUE PORTFOLIO ENHANCEMENTS =====

// Particles Background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.prepend(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Typing Effect for Hero Title
function typeEffect() {
    const nameElement = document.querySelector('.title-name');
    if (!nameElement) return;

    const text = nameElement.textContent;
    nameElement.textContent = '';
    nameElement.classList.add('typing-text');

    let index = 0;
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            nameElement.textContent += text[index];
            index++;
        } else {
            clearInterval(typeInterval);
            setTimeout(() => {
                nameElement.classList.remove('typing-text');
            }, 1000);
        }
    }, 100);
}

// 3D Tilt Effect for Cards
function initTiltEffect() {
    const tiltCards = document.querySelectorAll('.tilt-card, .project-card, .about-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.setProperty('--rotate-x', `${rotateX}deg`);
            card.style.setProperty('--rotate-y', `${rotateY}deg`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rotate-x', '0deg');
            card.style.setProperty('--rotate-y', '0deg');
        });
    });
}

// Scroll to Top FAB
function createScrollToTopFAB() {
    const fab = document.createElement('div');
    fab.className = 'fab';
    fab.innerHTML = '↑';
    fab.style.opacity = '0';
    fab.style.pointerEvents = 'none';
    document.body.appendChild(fab);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            fab.style.opacity = '1';
            fab.style.pointerEvents = 'auto';
        } else {
            fab.style.opacity = '0';
            fab.style.pointerEvents = 'none';
        }
    });

    fab.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Animated Skill Circles
function animateSkillCircles() {
    const circles = document.querySelectorAll('.skill-level-circle');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    circles.forEach(circle => observer.observe(circle));
}

// Glowing Cursor Trail
let cursorTrail = [];
function createCursorTrail(e) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail-dot';
    trail.style.cssText = `
        position: fixed;
        width: 5px;
        height: 5px;
        background: var(--accent-1);
        border-radius: 50%;        pointer-events: none;
        z-index: 9999;
        opacity: 0.5;
        animation: trail-fade 0.5s forwards;
    `;

    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';

    document.body.appendChild(trail);

    setTimeout(() => trail.remove(), 500);
}

// Add trail fade animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trail-fade {
        to { opacity: 0; transform: scale(0); }
    }
`;
document.head.appendChild(trailStyle);

let trailTimeout;
document.addEventListener('mousemove', (e) => {
    clearTimeout(trailTimeout);
    trailTimeout = setTimeout(() => createCursorTrail(e), 30);
});

// Parallax Effect for Sections
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Text Reveal on Scroll
function initTextReveal() {
    const revealTexts = document.querySelectorAll('.reveal-text');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'reveal-text 0.8s forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealTexts.forEach(text => observer.observe(text));
}

// Add reveal animation
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .reveal-text {
        opacity: 0;
        transform: translateY(30px);
    }
    @keyframes reveal-text {
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(revealStyle);

// GitHub Stats Integration (Mock)
function displayGitHubStats() {
    const statsContainer = document.querySelector('#github-stats');
    if (!statsContainer) return;

    const stats = {
        repos: 24,
        stars: 156,
        followers: 89,
        contributions: 547
    };

    Object.keys(stats).forEach(key => {
        const statElement = statsContainer.querySelector(`[data-stat="${key}"]`);
        if (statElement) {
            animateNumber(statElement, 0, stats[key], 2000);
        }
    });
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Magnetic Button Effect
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .filter-btn, .project-link');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Loading Animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p class="loader-text gradient-text">Loading Portfolio...</p>
        </div>
    `;

    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .page-loader {
            position: fixed;
            inset: 0;
            background: var(--bg-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s, visibility 0.5s;
        }
        .page-loader.hidden {
            opacity: 0;
            visibility: hidden;
        }
        .loader-content {
            text-align: center;
        }
        .loader-spinner {
            width: 60px;
            height: 60px;
            border: 4px solid var(--glass-border);
            border-top: 4px solid var(--accent-1);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .loader-text {
            font-size: 1.2rem;
            font-weight: 600;
        }
    `;

    document.head.appendChild(loaderStyle);
    document.body.prepend(loader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    });
}

// Initialize all enhancements
function initializeEnhancements() {
    showLoadingAnimation();
    createParticles();
    setTimeout(typeEffect, 1500);
    initTiltEffect();
    createScrollToTopFAB();
    animateSkillCircles();
    initParallax();
    initTextReveal();
    initMagneticButtons();
    displayGitHubStats();

    console.log('✨ Portfolio enhancements loaded!');
}

// Run on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEnhancements);
} else {
    initializeEnhancements();
}
