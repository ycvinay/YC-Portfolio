// ===== PROJECTS DATA =====
const projectsData = [
    {
        id: 1,
        title: "E-commerce Platform",
        description: "Full-stack e-commerce application with product catalog, shopping cart, secure checkout, and admin panel for inventory management.",
        tags: ["Spring Boot", "React", "MySQL"],
        category: "web",
        emoji: "🛍️",
        gradient: "gradient-bg-1",
        featured: true,
        liveUrl: "#",
        codeUrl: "https://github.com/ycvinay/ecommerce"
    },
    {
        id: 2,
        title: "Alumni Android App",
        description: "Native Android application for university alumni network with profiles, events, networking features, and real-time notifications.",
        tags: ["Java", "Android SDK", "Firebase"],
        category: "mobile",
        emoji: "🎓",
        gradient: "gradient-bg-2",
        featured: true,
        liveUrl: "#",
        codeUrl: "https://github.com/ycvinay/alumni-project"
    },
    {
        id: 3,
        title: "Movie Booking System",
        description: "Full-featured movie ticket booking platform with real-time seat selection, payment integration, and admin dashboard.",
        tags: ["React", "Node.js", "MongoDB"],
        category: "web",
        emoji: "🎬",
        gradient: "gradient-bg-3",
        liveUrl: "#",
        codeUrl: "https://github.com/ycvinay/MovieTicketBooking"
    },
    {
        id: 4,
        title: "Farmer Dairy App",
        description: "Native Android app for farmers to track daily milk supply with multi-language support and image attachments.",
        tags: ["Kotlin", "Jetpack Compose", "Room DB"],
        category: "mobile",
        emoji: "🥛",
        gradient: "gradient-bg-4",
        liveUrl: "#",
        codeUrl: "https://github.com/ycvinay/milkApp"
    },
    {
        id: 5,
        title: "Social Media Platform",
        description: "Full-stack social media app with posts, comments, friends, notifications, and comprehensive Playwright testing.",
        tags: ["Flask", "Python", "MySQL"],
        category: "web",
        emoji: "👥",
        gradient: "gradient-bg-5",
        liveUrl: "#",
        codeUrl: "https://github.com/ycvinay/flaskSocialMedia"
    },
    {
        id: 6,
        title: "Food Delivery Microservices",
        description: "Scalable microservices architecture with event-driven communication using Kafka, Redis caching, and Docker deployment.",
        tags: ["Spring Boot", "Kafka", "Docker"],
        category: "backend",
        emoji: "🍕",
        gradient: "gradient-bg-6",
        liveUrl: "#",
        codeUrl: "https://github.com/ycvinay/Microservices_Swiggy_backend"
    },
    {
        id: 7,
        title: "E-commerce with Sentiment",
        description: "E-commerce platform with AI-powered review sentiment analysis to categorize customer feedback.",
        tags: ["Python", "NLP", "FastAPI"],
        category: "web",
        emoji: "🤖",
        gradient: "gradient-bg-1",
        liveUrl: "#",
        codeUrl: "https://github.com/ycvinay/Sentiment_Analysis"
    }
];

// ===== DOM ELEMENTS =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.querySelector('.nav-links');
const themeToggle = document.getElementById('themeToggle');
const projectsGrid = document.getElementById('projectsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');
const statNumbers = document.querySelectorAll('.stat-number');
const skillProgressBars = document.querySelectorAll('.skill-progress');

// ===== CUSTOM CURSOR =====
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;

    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    cursorFollower.style.left = cursorX + 'px';
    cursorFollower.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Scale cursor on hover
document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursor.style.background = 'var(--accent-3)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.opacity = '0';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'var(--accent-1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.opacity = '0.5';
    });
});

// ===== MOBILE MENU TOGGLE =====
menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);

// ===== THEME TOGGLE =====
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// ===== RENDER PROJECTS =====
function renderProjects(filter = 'all') {
    const filteredProjects = filter === 'all'
        ? projectsData
        : projectsData.filter(p => p.category === filter);

    projectsGrid.innerHTML = filteredProjects.map(project => `
        <article class="project-card ${project.featured ? 'featured' : ''}" data-category="${project.category}">
            <div class="project-image">
                <div class="project-placeholder ${project.gradient}">
                    <span>${project.emoji}</span>
                </div>
                <div class="project-overlay">
                    <a href="${project.liveUrl}" class="project-link" aria-label="View project">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                        </svg>
                    </a>
                    <a href="${project.codeUrl}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="View code">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="project-content">
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
            </div>
        </article>
    `).join('');
}

// Initial render
renderProjects();

// Filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

// ===== ANIMATE STATS ON SCROLL =====
function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCount = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };

        updateCount();
    });
}

// ===== ANIMATE SKILL BARS ON SCROLL =====
function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        bar.classList.add('animate');
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = { threshold: 0.2, rootMargin: '0px' };

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateSkillBars, 300);
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections
const heroSection = document.querySelector('.hero');
const skillsSection = document.querySelector('.skills');

if (heroSection) statsObserver.observe(heroSection);
if (skillsSection) skillsObserver.observe(skillsSection);

// ===== REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.about-card, .project-card, .skill-category').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ===== CONTACT FORM =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Show success message (in real app, send to server)
    const btn = contactForm.querySelector('.btn-submit');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<span>Message Sent! ✓</span>';
    btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        contactForm.reset();
    }, 3000);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===== PARALLAX EFFECT FOR SPHERES =====
document.addEventListener('mousemove', (e) => {
    const spheres = document.querySelectorAll('.gradient-sphere');
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;

    spheres.forEach((sphere, index) => {
        const speed = (index + 1) * 0.5;
        sphere.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

console.log('🚀 Portfolio loaded successfully!');
