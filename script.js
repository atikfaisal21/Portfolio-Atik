// ============================================
// JAVASCRIPT FOR INTERACTIVE FEATURES
// ============================================

// ---- SMOOTH SCROLLING ----
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

// ---- MOBILE MENU TOGGLE ----
const hamburger = document.getElementById('hamburger');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

hamburger?.addEventListener('click', function () {
    sidebar.classList.toggle('mobile-open');
    mainContent.classList.toggle('mobile-nav-open');
});

// Close sidebar when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
        mainContent.classList.remove('mobile-nav-open');
    });
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !hamburger?.contains(e.target)) {
        sidebar.classList.remove('mobile-open');
        mainContent.classList.remove('mobile-nav-open');
    }
});

// ---- ACTIVE NAV LINK INDICATOR ----
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ---- ANIMATE PROGRESS BARS ON SCROLL ----
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill categories
document.querySelectorAll('.skill-category').forEach(category => {
    observer.observe(category);
});

// ---- ANIMATE CARDS ON SCROLL ----
const cardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe cards
document.querySelectorAll('.research-card, .project-card, .education-item').forEach(card => {
    card.style.opacity = '0';
    cardObserver.observe(card);
});

// ---- SCROLL TO TOP BUTTON ----
const scrollButton = document.createElement('button');
scrollButton.id = 'scroll-to-top';
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0ea5a5 0%, #667eea 100%);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.display = 'flex';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollButton.addEventListener('mouseover', () => {
    scrollButton.style.transform = 'translateY(-3px)';
});

scrollButton.addEventListener('mouseout', () => {
    scrollButton.style.transform = 'translateY(0)';
});

// ---- FADE IN ON LOAD ----
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.animation = 'fadeIn 0.5s ease-out';
});

// ---- KEYBOARD NAVIGATION ----
document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
        document.querySelector('.sidebar').classList.remove('mobile-open');
        document.querySelector('.main-content').classList.remove('mobile-nav-open');
    }
});

// ---- SMOOTH SIDEBAR SCROLL ----
const sidebar = document.querySelector('.sidebar');
if (sidebar) {
    sidebar.addEventListener('wheel', (e) => {
        sidebar.scrollLeft += e.deltaY;
    });
}

// ---- LOAD ANIMATIONS ----
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #0ea5a5;
        background: rgba(14, 165, 165, 0.1);
    }

    .nav-link.active::after {
        transform: scaleX(1);
    }

    @media (max-width: 1200px) {
        .sidebar.mobile-open {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            flex-direction: column;
            background: white;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
            overflow-y: auto;
        }

        .main-content.mobile-nav-open {
            filter: blur(2px);
            pointer-events: none;
        }
    }
`;
document.head.appendChild(style);

console.log('%c Welcome to Md. Atik Faisal\'s Portfolio', 
    'font-size: 20px; color: #0ea5a5; font-weight: bold;');
console.log('%c Materials & Metallurgical Engineering | BUET', 
    'font-size: 14px; color: #667eea;');
