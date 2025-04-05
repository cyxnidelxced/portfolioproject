document.addEventListener('DOMContentLoaded', function() {
    
    // Custom cursor follower for desktop devices
    if (window.matchMedia("(min-width: 992px)").matches) {
        const cursorFollower = document.querySelector('.cursor-follower');
        const links = document.querySelectorAll('a, button');
        
        document.addEventListener('mousemove', function(e) {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        });
        
        // Make cursor larger when hovering over interactive elements
        links.forEach(link => {
            link.addEventListener('mouseenter', function() {
                cursorFollower.style.width = '50px';
                cursorFollower.style.height = '50px';
                cursorFollower.style.backgroundColor = 'rgba(248, 179, 197, 0.2)';
            });
            
            link.addEventListener('mouseleave', function() {
                cursorFollower.style.width = '30px';
                cursorFollower.style.height = '30px';
                cursorFollower.style.backgroundColor = 'rgba(248, 179, 197, 0.3)';
            });
        });
    }
        
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
        
    // Scroll animations for sections
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
    
    // Add active class to navigation based on page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else if (currentPage.includes('project') && linkHref === 'work.html') {
            link.classList.add('active');
        }
    });
    
    // Form validation for contact form
    const contactForms = document.querySelectorAll('.contact-form, .contact-form-full');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            
            this.querySelectorAll('input, textarea').forEach(field => {
                if (field.value.trim() === '') {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
                
                // Email validation
                if (field.type === 'email') {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(field.value)) {
                        isValid = false;
                        field.classList.add('error');
                    }
                }
            });
            
            if (isValid) {
                // In a real application, you would send the form data to your server
                // For this example, we'll just show a success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you! Your message has been sent.';
                
                form.parentNode.insertBefore(successMessage, form.nextSibling);
                form.reset();
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 500);
                }, 5000);
            }
        });
    });
      
    // Parallax effect for artistic background elements
    if (window.matchMedia("(min-width: 992px)").matches) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            
            document.querySelectorAll('.paint-splash').forEach((splash, index) => {
                const speed = 0.05 + (index * 0.02);
                splash.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        });
    }
});