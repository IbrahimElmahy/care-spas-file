document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const phoneImage = document.getElementById('app-screen');
    
    // Preload images to avoid flickering
    const imageUrls = Array.from(steps).map(step => step.getAttribute('data-image'));
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to the text section for animation
                steps.forEach(s => s.classList.remove('active'));
                entry.target.classList.add('active');

                // Update Image
                const newImageSrc = entry.target.getAttribute('data-image');
                
                if (phoneImage.getAttribute('src') !== newImageSrc) {
                    phoneImage.style.opacity = '0';
                    
                    setTimeout(() => {
                        phoneImage.src = newImageSrc;
                        phoneImage.style.opacity = '1';
                    }, 300); // Match CSS transition time or slightly less
                }
            }
        });
    }, observerOptions);

    steps.forEach(step => {
        observer.observe(step);
    });
});
