// ========== TYPING ANIMATION ==========
const typedText = document.querySelector('.typed-text');
if(typedText) {
    const words = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Fast Learner'];
    let wordIndex = 0, charIndex = 0;
    
    function type() {
        if(charIndex < words[wordIndex].length) {
            typedText.textContent += words[wordIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }
    
    function erase() {
        if(charIndex > 0) {
            typedText.textContent = words[wordIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        }
    }
    
    type();
}

// ========== PARTICLES.JS CONFIGURATION ==========
particlesJS('particles-js', {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 1000 } },
        color: { value: '#00f2ff' },
        shape: { type: 'circle' },
        opacity: { value: 0.3, random: true },
        size: { value: 2, random: true },
        line_linked: { enable: true, distance: 120, color: '#00f2ff', opacity: 0.15, width: 1 },
        move: { enable: true, speed: 1.5, direction: 'none', random: true }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { 
            onhover: { enable: true, mode: 'repulse' }, 
            onclick: { enable: true, mode: 'push' } 
        }
    }
});

// ========== MOBILE MENU TOGGLE ==========
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if(burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
}

// ========== SMOOTH SCROLL & CLOSE MENU ==========
document.querySelectorAll('.nav-link, .btn-primary, .btn-secondary, .footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if(href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
                if(navLinks) navLinks.classList.remove('active');
                if(burger) burger.classList.remove('toggle');
            }
        }
    });
});

// ========== HEADER SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if(window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== GLITCH EFFECT FIX ==========
const glitchElement = document.querySelector('.glitch');
if(glitchElement && !glitchElement.getAttribute('data-text')) {
    glitchElement.setAttribute('data-text', glitchElement.textContent);
}

// ========== CONTACT FORM HANDLER ==========
const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✨ Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// ========== NEWSLETTER FORM HANDLER ==========
const newsletterBtn = document.querySelector('.footer-social-section .btn-primary, .newsletter-form button');
const newsletterInput = document.querySelector('.newsletter-form input');

if(newsletterBtn && newsletterInput) {
    newsletterBtn.addEventListener('click', () => {
        if(newsletterInput.value && newsletterInput.value.includes('@')) {
            alert('🎉 Thank you for subscribing to our newsletter!');
            newsletterInput.value = '';
        } else if(newsletterInput.value) {
            alert('❌ Please enter a valid email address.');
        } else {
            alert('📧 Please enter your email address.');
        }
    });
}