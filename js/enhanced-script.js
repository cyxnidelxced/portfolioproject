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

    // Scroll animations for all elements with animated class
    const animatedElements = document.querySelectorAll('.animated');
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.dataset.animation || 'fadeUp';
                const delay = element.dataset.delay || 0;
                
                setTimeout(() => {
                    element.style.animation = `${animation} 0.8s ease forwards`;
                }, delay * 100);
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1
    });

    if (animatedElements.length > 0) {
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    }

    // Parallax effect for hero section
    if (document.querySelector('.hero')) {
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < 800) {
                heroImage.style.transform = `translateY(${scrollPosition * 0.05}px)`;
                heroContent.style.transform = `translateY(${scrollPosition * 0.02}px)`;
            }
        });
    }

    // Enhanced hover effect for project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        const image = item.querySelector('.project-preview');
        
        item.addEventListener('mouseenter', () => {
            if (image) {
                image.style.transform = 'scale(1.08)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });

    // Magnetic buttons effect
    const buttons = document.querySelectorAll('.artistic-button');
    if (window.matchMedia('(min-width: 992px)').matches) {
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-2px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    }

    // Animated skills progress 
    const skillItems = document.querySelectorAll('.skill-card');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('animate-pulse');
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('animate-pulse');
        });
    });

    // Enhanced form feedback
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    formInputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        
        input.addEventListener('focus', () => {
            if (formGroup) {
                formGroup.classList.add('input-focused');
            }
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '' && formGroup) {
                formGroup.classList.remove('input-focused');
            }
        });
    });
    
    // Animate artistic divider on scroll
    const dividers = document.querySelectorAll('.artistic-divider svg path');
    const dividerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.strokeDasharray = "200";
                entry.target.style.strokeDashoffset = "200";
                entry.target.style.animation = "draw 1.5s forwards";
                dividerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    dividers.forEach(divider => {
        dividerObserver.observe(divider);
    });
    
    // Add this keyframe for the divider animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes draw {
            to {
                stroke-dashoffset: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Page transition effect
    const pageLinks = document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])');
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && !this.hasAttribute('target')) {
                e.preventDefault();
                
                const transition = document.createElement('div');
                transition.className = 'page-transition';
                document.body.appendChild(transition);
                
                setTimeout(() => {
                    transition.classList.add('active');
                }, 10);
                
                setTimeout(() => {
                    window.location.href = href;
                }, 600);
            }
        });
    });
    
    // Typing animation for hero section
    if (document.querySelector('.hero-description')) {
        const description = document.querySelector('.hero-description');
        const text = description.textContent;
        description.textContent = '';
        description.style.opacity = '1';
        
        let i = 0;
        const typingSpeed = 30; // milliseconds per character
        
        function typeWriter() {
            if (i < text.length) {
                description.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeWriter, 1200);
    }

    // Mobile-specific adjustments
    function handleResponsiveLayout() {
        const windowWidth = window.innerWidth;
        
        // Adjust header for mobile
        if (windowWidth <= 768) {
            // Skip typing animation on mobile for better performance
            if (document.querySelector('.hero-description')) {
                const description = document.querySelector('.hero-description');
                description.style.opacity = '1';
            }
            
            // Reduce animation effects on mobile for better performance
            document.querySelectorAll('.animate-float, .animate-pulse').forEach(element => {
                element.classList.remove('animate-float', 'animate-pulse');
            });
        }
        
        // Handle contact form layout
        if (document.querySelector('.contact-wrapper') && windowWidth <= 992) {
            const contactForm = document.querySelector('.contact-form-container');
            const contactInfo = document.querySelector('.contact-info-container');
            
            if (contactForm && contactInfo) {
                // Ensure proper stacking on mobile
                contactForm.style.marginBottom = '2rem';
            }
        }
        
        // Handle about page profile section
        if (document.querySelector('.profile-section') && windowWidth <= 768) {
            const profileImage = document.querySelector('.full-profile-image');
            const profileContent = document.querySelector('.profile-content');
            
            if (profileImage && profileContent) {
                // Center align the profile image on mobile
                profileImage.style.margin = '0 auto 2rem';
            }
        }
    }
    
    // Run on load
    handleResponsiveLayout();
    
    // Run on resize
    window.addEventListener('resize', handleResponsiveLayout);
    
    // Simple mobile navigation toggle (can be expanded as needed)
    if (window.matchMedia("(max-width: 576px)").matches) {
        // Add mobile-specific event handlers if needed in future
        // For now, ensure mobile styles are applied
        document.body.classList.add('mobile-view');
    }

        // Project page specific handling
        function handleProjectPageResponsiveness() {
            if (!document.querySelector('.project-page')) return; // Only run on project pages
            
            const windowWidth = window.innerWidth;
            
            // Adjust solution image for better mobile display
            if (windowWidth <= 768) {
                const solutionImages = document.querySelectorAll('.solution-image img');
                solutionImages.forEach(img => {
                    // Ensure images are properly sized for mobile
                    img.style.height = 'auto';
                });
            }
            
            // Improve transition to overview section on mobile
            if (windowWidth <= 576) {
                const overviewSection = document.querySelector('.project-overview');
                if (overviewSection) {
                    overviewSection.style.marginTop = '-20px';
                }
                
                // Make solution list more readable on mobile
                const solutionList = document.querySelectorAll('.solution-list li');
                solutionList.forEach(item => {
                    item.style.paddingBottom = '10px';
                });
            }
            
            // Optimize animations on mobile for better performance
            if (windowWidth <= 992) {
                document.querySelectorAll('.animate-float, .animate-pulse').forEach(element => {
                    element.classList.remove('animate-float', 'animate-pulse');
                });
            }
        }
        
        // Run on load
        handleProjectPageResponsiveness();
        
        // Run on resize
        window.addEventListener('resize', handleProjectPageResponsiveness);
        
        // Optimize project image loading
        const projectImages = document.querySelectorAll('.solution-image img');
        projectImages.forEach(img => {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            
            // Add fallback for images that may already be loaded
            if (img.complete) {
                img.classList.add('loaded');
            }
        });
        
        // Handle "View Live" button on mobile more elegantly
        const viewLiveButtons = document.querySelectorAll('.view-live');
        if (window.matchMedia('(max-width: 768px)').matches) {
            viewLiveButtons.forEach(button => {
                button.addEventListener('touchstart', function() {
                    this.classList.add('touch-active');
                });
                
                button.addEventListener('touchend', function() {
                    this.classList.remove('touch-active');
                });
            });
        }
    });
    
    // Add this CSS rule via JavaScript to ensure proper loading animations
    document.addEventListener('DOMContentLoaded', function() {
        const style = document.createElement('style');
        style.textContent = `
            .solution-image img {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            .solution-image img.loaded {
                opacity: 1;
            }
            
            @media (max-width: 768px) {
                .view-live.touch-active {
                    transform: translateY(-2px);
                    box-shadow: 0 7px 20px rgba(248, 179, 197, 0.5);
                }
            }
        `;
        document.head.appendChild(style);

            // Fix for solution images not filling frames
    function enhanceSolutionImages() {
        const solutionImages = document.querySelectorAll('.solution-image img');
        
        solutionImages.forEach(img => {
            // When image loads, ensure it fills the frame
            img.addEventListener('load', function() {
                const frameContent = this.closest('.frame-content');
                if (frameContent) {
                    // Ensure image fills the container
                    this.style.width = '100%';
                    this.style.height = '100%';
                    this.style.objectFit = 'cover';
                    
                    // Add loaded class for fade-in effect
                    this.classList.add('loaded');
                }
            });
            
            // Handle already loaded images
            if (img.complete) {
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.classList.add('loaded');
            }
        });
    }
    
    // Run the function
    enhanceSolutionImages();
    
    // Check image dimensions and adjust container if needed
    function adjustImageContainers() {
        const containers = document.querySelectorAll('.solution-image .artistic-frame');
        
        containers.forEach(container => {
            const img = container.querySelector('img');
            if (img && img.complete) {
                const imgRatio = img.naturalHeight / img.naturalWidth;
                
                // Check if image is landscape or portrait and adjust accordingly
                if (imgRatio > 1.2) { // Portrait image
                    container.style.paddingBottom = '100%'; // More square-like container
                } else if (imgRatio < 0.6) { // Very wide landscape
                    container.style.paddingBottom = '50%'; // Wider container
                } else { // Standard landscape
                    container.style.paddingBottom = '65%'; // Default container
                }
            }
        });
    }
    
    // Run after all images have loaded
    window.addEventListener('load', adjustImageContainers);

        // Fix for featured project image and all project cards
        function enhanceAllProjectImages() {
            // Handle featured image
            const featuredImage = document.querySelector('.featured-image img');
            if (featuredImage) {
                featuredImage.addEventListener('load', function() {
                    this.style.width = '100%';
                    this.style.height = '100%';
                    this.style.objectFit = 'cover';
                });
                
                if (featuredImage.complete) {
                    featuredImage.style.width = '100%';
                    featuredImage.style.height = '100%';
                    featuredImage.style.objectFit = 'cover';
                }
            }
            
            // Handle all project cards
            const projectImages = document.querySelectorAll('.project-preview img');
            projectImages.forEach(img => {
                img.addEventListener('load', function() {
                    this.style.width = '100%';
                    this.style.height = '100%';
                    this.style.objectFit = 'cover';
                });
                
                if (img.complete) {
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                }
            });
        }
        
        // Run the function
        enhanceAllProjectImages();
        
        // Fix for the projects container grid in work.html
        const projectsContainer = document.querySelector('.projects-container');
        if (projectsContainer) {
            // Make sure the grid layout is properly applied
            projectsContainer.style.display = 'grid';
            projectsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
            projectsContainer.style.gap = '2rem';
            
            // Check for media query and adjust accordingly
            function adjustProjectsGrid() {
                if (window.innerWidth <= 768) {
                    projectsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
                }
                
                if (window.innerWidth <= 576) {
                    projectsContainer.style.gridTemplateColumns = '1fr';
                }
                
                if (window.innerWidth > 768) {
                    projectsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
                }
            }
            
            // Run on load and resize
            adjustProjectsGrid();
            window.addEventListener('resize', adjustProjectsGrid);
        }
        
});
