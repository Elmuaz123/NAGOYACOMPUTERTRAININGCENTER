// Activate GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero Sequence Loading Animation
const revealTL = gsap.timeline();

revealTL.from('header', { y: -60, opacity: 0, duration: 1.2, ease: 'power4.out' })
        .from('.tagline', { opacity: 0, y: 15, duration: 0.6 })
        .from('.hero-left h1', { opacity: 0, y: 30, duration: 1, ease: 'power3.out' }, '-=0.4')
        .from('.hero-left p', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
        .from('.hero-actions', { opacity: 0, y: 15, duration: 0.8 }, '-=0.6')
        .from('.hero-img-frame', { scale: 1.05, opacity: 0, duration: 1.4, ease: 'power2.out' }, '-=1.2');

// Scroll fade-ins for About Cards
gsap.from('.space-card', {
    scrollTrigger: { trigger: '.spaces-section', start: 'top 70%' },
    y: 60, opacity: 0, duration: 1, stagger: 0.25, ease: 'power3.out'
});

// Amenities / Services reveal
gsap.from('.amenity-item', {
    scrollTrigger: { trigger: '.amenities-section', start: 'top 75%' },
    x: -40, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out'
});

// FAQ items reveal
gsap.from('.faq-item', {
    scrollTrigger: { trigger: '.faq-section', start: 'top 75%' },
    y: 30, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out'
});

// Contact section reveal
gsap.from('.contact-card', {
    scrollTrigger: { trigger: '.contact-section', start: 'top 75%' },
    x: -30, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out'
});

gsap.from('.contact-form', {
    scrollTrigger: { trigger: '.contact-section', start: 'top 75%' },
    x: 30, opacity: 0, duration: 0.9, ease: 'power2.out'
});

// Parallax glow orbs on scroll
window.addEventListener('scroll', () => {
    const scrollDepth = window.scrollY;
    gsap.to('.orb-1', { y: scrollDepth * 0.15, duration: 0.5 });
    gsap.to('.orb-2', { y: -scrollDepth * 0.1, duration: 0.5 });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
});

// FAQ Accordion Toggle
function toggleFaq(el) {
    const answer = el.nextElementSibling;
    const isOpen = answer.classList.contains('open');

    // Close all open answers
    document.querySelectorAll('.faq-answer.open').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-question.open').forEach(q => q.classList.remove('open'));

    if (!isOpen) {
        answer.classList.add('open');
        el.classList.add('open');
    }
}

// Contact Form Handler
function handleContact(e) {
    e.preventDefault();
    const success = document.getElementById('form-success');
    success.style.display = 'block';
    e.target.reset();
    setTimeout(() => { success.style.display = 'none'; }, 5000);
}

// Client-side PDF Generation
function downloadPDF() {
    const element = document.getElementById('printable-form');
    
    // Temporarily unhide if it's strictly hidden, though absolute offscreen is fine
    const opt = {
        margin:       0,
        filename:     'Nagoya_Application_Form.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Change button text temporarily
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    
    html2pdf().set(opt).from(element).save().then(() => {
        btn.innerHTML = originalText;
    });
}