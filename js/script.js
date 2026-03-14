document.addEventListener('DOMContentLoaded', () => {
    
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

    // --- Contact Form Submission (Prevent Default for Demo) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate form submisson
            setTimeout(() => {
                submitBtn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
                submitBtn.style.backgroundColor = '#10b981'; // Success green color
                submitBtn.style.borderColor = '#10b981';
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
