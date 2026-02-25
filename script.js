document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScrolling();
    initAnimations();
    initContactForm();
    initScrollEffects();
    initSlider();
    initCertificateModal();
});

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(12, 12, 12, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(12, 12, 12, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    });
}

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initAnimations() {
    const leftElements = document.querySelectorAll('.section-header');
    const rightElements = document.querySelectorAll(
        '.about-content, .skills-content, .profiles-grid, .projects-grid, .services-grid, .cert-categories-grid, .internships-content, .achievements-slider, .contact-content, .footer-content'
    );

    leftElements.forEach(element => element.classList.add('reveal-left'));
    rightElements.forEach(element => element.classList.add('reveal-right'));

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observerInstance.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    [...leftElements, ...rightElements].forEach(element => observer.observe(element));
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            showNotification('Sending message...', 'info');
            
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00d4ff' : type === 'error' ? '#ff4757' : '#3742fa'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function initScrollEffects() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function initSlider() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const achievementItems = document.querySelectorAll('.achievement-item');
    let currentIndex = 0;

    if (!prevBtn || !nextBtn || achievementItems.length === 0) return;

    achievementItems.forEach(item => {
        const image = item.querySelector('.achievement-image');
        const info = item.querySelector('.achievement-info');

        if (image) {
            image.classList.add('reveal-left');
        }
        if (info) {
            info.classList.add('reveal-right');
        }
    });

    function animateAchievement(item) {
        const image = item.querySelector('.achievement-image');
        const info = item.querySelector('.achievement-info');

        [image, info].forEach((element) => {
            if (!element) return;
            element.classList.remove('is-visible');
            void element.offsetWidth;
            element.classList.add('is-visible');
        });
    }

    function showSlide(index) {
        achievementItems.forEach((item, i) => {
            item.style.display = i === index ? 'flex' : 'none';
        });
        animateAchievement(achievementItems[index]);
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + achievementItems.length) % achievementItems.length;
        showSlide(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % achievementItems.length;
        showSlide(currentIndex);
    });

    showSlide(currentIndex);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const optimizedScrollHandler = debounce(function() {
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.skill-card, .profile-card-item, .project-category-card, .service-card, .cert-category-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

function initCertificateModal() {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImg');
    const modalCaption = document.querySelector('.cert-modal-caption');
    const closeBtn = document.querySelector('.cert-modal-close');
    const certCards = document.querySelectorAll('.cert-category-card');

    certCards.forEach(card => {
        card.addEventListener('click', function() {
            const certImage = this.getAttribute('data-cert');
            const certTitle = this.querySelector('h3').textContent;
            
            modal.style.display = 'block';
            modalImg.src = certImage;
            modalImg.alt = certTitle;
            modalCaption.textContent = certTitle;
            
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}
