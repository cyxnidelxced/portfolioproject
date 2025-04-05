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
    