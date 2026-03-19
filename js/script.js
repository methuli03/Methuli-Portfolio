document.addEventListener('DOMContentLoaded', () => {
    
    // --- Preloader Fade Out ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    });
    
    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle Menu
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // --- Active Link Switching on Scroll ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Trigger threshold
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
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

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // --- Skill Bars Animation ---
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    // Using Intersection Observer for skill bars
    const skillObserverOptions = {
        threshold: 0.5
    };
    
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const skillWidth = progressBar.getAttribute('data-width');
                progressBar.style.width = skillWidth;
                observer.unobserve(progressBar); // Stop tracking once animated
            }
        });
    }, skillObserverOptions);
    
    skillProgressBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // --- Project Card Mouse Tracking (Glow Effect) ---
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- Contact Form Submission ---
    // Pure HTML POST for 100% Reliability and no QUIC errors
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            // The browser will naturally submit the form now!
        });
    }

    // --- Hero Image Interactive Glow (Mouse Tracking & Parallax) ---
    const imageWrapper = document.querySelector('.image-wrapper');
    if (imageWrapper) {
        // Create circleLight element
        const circleLight = document.createElement('div');
        circleLight.className = 'circleLight';
        imageWrapper.appendChild(circleLight);

        let mouse = { X: 0, Y: 0 };
        let block = { CX: 0, CY: 0 };
        
        imageWrapper.addEventListener('mousemove', function(e) {
            const rect = imageWrapper.getBoundingClientRect();
            // Calculate center distance for 3D tilt
            mouse.X = (e.clientX - rect.left) - rect.width / 2;
            mouse.Y = (e.clientY - rect.top) - rect.height / 2;
            
            // Raw positions for glow gradient
            const rawX = e.clientX - rect.left;
            const rawY = e.clientY - rect.top;
            circleLight.style.background = `radial-gradient(circle at ${rawX}px ${rawY}px, rgba(255,255,255,0.4), transparent 60%)`;
            circleLight.style.opacity = '1';
        });

        imageWrapper.addEventListener('mouseleave', function() {
            mouse.X = 0;
            mouse.Y = 0;
            circleLight.style.opacity = '0';
        });

        // 3D Tilt effect
        setInterval(function() {
            block.CY += (mouse.Y - block.CY) / 12;
            block.CX += (mouse.X - block.CX) / 12;

            const img = imageWrapper.querySelector('img');
            if(img) {
                img.style.transform = `scale(1.05) translate(${block.CX * 0.05}px, ${block.CY * 0.05}px) rotateX(${-block.CY * 0.05}deg) rotateY(${block.CX * 0.05}deg)`;
            }
        }, 20);
    }
});
