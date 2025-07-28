// script.js

// Use a SINGLE DOMContentLoaded listener for all your code
document.addEventListener('DOMContentLoaded', function() {

    // --- SLIDESHOW LOGIC ---
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        const slides = document.querySelectorAll('.slide');
        const dotsContainer = document.querySelector('.slider-dots');
        const slideCount = slides.length;
        let currentIndex = 0;

        if (slideCount > 0) {
            // Create navigation dots
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.addEventListener('click', () => {
                    goToSlide(i);
                    clearInterval(slideInterval);
                    slideInterval = setInterval(nextSlide, 5000);
                });
                dotsContainer.appendChild(dot);
            }

            const dots = document.querySelectorAll('.dot');

            function goToSlide(index) {
                sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
                dots.forEach(d => d.classList.remove('active'));
                if (dots[index]) {
                    dots[index].classList.add('active');
                }
                currentIndex = index;
            }

            function nextSlide() {
                const nextIndex = (currentIndex + 1) % slideCount;
                goToSlide(nextIndex);
            }

            let slideInterval = setInterval(nextSlide, 5000);
            goToSlide(0); // Initial state
        }
    }

    // --- SIDE OFFER PANEL LOGIC ---
    const offerTab = document.querySelector('.side-offer-tab');
    const offerPanel = document.querySelector('.side-offer-panel');

    if (offerTab && offerPanel) {
        // Event to open/close by clicking the tab
        offerTab.addEventListener('click', (event) => {
            event.stopPropagation();
            offerPanel.classList.toggle('is-open');
        });

        // Event to close by clicking anywhere else
        window.addEventListener('click', (event) => {
            if (offerPanel.classList.contains('is-open') && !offerPanel.contains(event.target)) {
                offerPanel.classList.remove('is-open');
            }
        });
    }

});
// In your script.js, inside the DOMContentLoaded listener

// --- MULTI-ITEM CAROUSEL LOGIC ---
const track = document.querySelector('.carousel-track');
if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-arrow.next');
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const dotsNav = document.querySelector('.carousel-dots');
    
    // Create dots dynamically
    slides.forEach((slide, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide');
            const targetSlide = slides[index];
            moveToSlide(track, currentSlide, targetSlide);
            updateDots(dotsNav.querySelector('.active'), dot);
        });
        dotsNav.appendChild(dot);
    });
    const dots = Array.from(dotsNav.children);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('active');
        targetDot.classList.add('active');
    };

    // Arrange slides next to one another
    const slideWidth = slides[0].getBoundingClientRect().width;
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    });
    
    // Set initial state
    slides[0].classList.add('current-slide');
    dots[0].classList.add('active');

    // When I click right, move slides to the left
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        if (nextSlide) {
            moveToSlide(track, currentSlide, nextSlide);
            updateDots(dotsNav.querySelector('.active'), dotsNav.querySelector('.active').nextElementSibling);
        }
    });

    // When I click left, move slides to the right
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        if (prevSlide) {
            moveToSlide(track, currentSlide, prevSlide);
            updateDots(dotsNav.querySelector('.active'), dotsNav.querySelector('.active').previousElementSibling);
        }
    });
}
// In your main DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {

    // --- MULTI-AD SLIDESHOW LOGIC ---
    const track = document.querySelector('.slides-track');
    if (!track) return; // Exit if the slideshow doesn't exist

    const slides = Array.from(track.children);
    const dotsContainer = document.querySelector('.slides-dots');
    
    if (slides.length === 0) return; // Exit if there are no slides

    let currentIndex = 0;
    let slideInterval;

    // Create dots dynamically based on the number of .slides divs
    slides.forEach((slide, index) => {
        const dotButton = document.createElement('button');
        dotButton.classList.add('dot');
        dotButton.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dotButton.addEventListener('click', () => {
            moveToSlide(index);
        });
        dotsContainer.appendChild(dotButton);
    });
    const dots = Array.from(dotsContainer.children);

    // Function to move to a specific slide
    const moveToSlide = (targetIndex) => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;
        
        // Update the active dot
        if (dots.length > 0) {
            dots[currentIndex].classList.remove('active');
            dots[targetIndex].classList.add('active');
        }
        
        currentIndex = targetIndex;
        resetInterval(); // Reset timer on manual navigation
    };

    // Auto-play functionality
    const startInterval = () => {
        slideInterval = setInterval(() => {
            const newIndex = (currentIndex + 1) % slides.length;
            moveToSlide(newIndex);
        }, 5000); // Change slide every 5 seconds
    };
    
    const resetInterval = () => {
        clearInterval(slideInterval);
        startInterval();
    };

    // Initialize the slideshow
    if (dots.length > 0) {
        dots[0].classList.add('active');
    }
    startInterval();

    // Adjust on window resize to be fully responsive
    window.addEventListener('resize', () => {
        moveToSlide(currentIndex);
    });
});

// In your main DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {

    // --- MULTI-AD SLIDESHOW LOGIC ---
    const track = document.querySelector('.luxe-track');
    if (!track) return; // Exit if the slideshow doesn't exist

    const slides = Array.from(track.children);
    const dotsContainer = document.querySelector('.luxe-dots');
    
    if (slides.length === 0) return; // Exit if there are no slides

    let currentIndex = 0;
    let slideInterval;

    // Create dots dynamically based on the number of .slides divs
    slides.forEach((slide, index) => {
        const dotButton = document.createElement('button');
        dotButton.classList.add('dot');
        dotButton.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dotButton.addEventListener('click', () => {
            moveToSlide(index);
        });
        dotsContainer.appendChild(dotButton);
    });
    const dots = Array.from(dotsContainer.children);

    // Function to move to a specific slide
    const moveToSlide = (targetIndex) => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;
        
        // Update the active dot
        if (dots.length > 0) {
            dots[currentIndex].classList.remove('active');
            dots[targetIndex].classList.add('active');
        }
        
        currentIndex = targetIndex;
        resetInterval(); // Reset timer on manual navigation
    };

    // Auto-play functionality
    const startInterval = () => {
        slideInterval = setInterval(() => {
            const newIndex = (currentIndex + 1) % slides.length;
            moveToSlide(newIndex);
        }, 5000); // Change slide every 5 seconds
    };
    
    const resetInterval = () => {
        clearInterval(slideInterval);
        startInterval();
    };

    // Initialize the slideshow
    if (dots.length > 0) {
        dots[0].classList.add('active');
    }
    startInterval();

    // Adjust on window resize to be fully responsive
    window.addEventListener('resize', () => {
        moveToSlide(currentIndex);
    });
});
// third slide
// In your main DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {

    // --- MULTI-AD SLIDESHOW LOGIC ---
    const track = document.querySelector('.medal-track');
    if (!track) return; // Exit if the slideshow doesn't exist

    const slides = Array.from(track.children);
    const dotsContainer = document.querySelector('.medal-dots');
    
    if (slides.length === 0) return; // Exit if there are no slides

    let currentIndex = 0;
    let slideInterval;

    // Create dots dynamically based on the number of .slides divs
    slides.forEach((slide, index) => {
        const dotButton = document.createElement('button');
        dotButton.classList.add('dot');
        dotButton.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dotButton.addEventListener('click', () => {
            moveToSlide(index);
        });
        dotsContainer.appendChild(dotButton);
    });
    const dots = Array.from(dotsContainer.children);

    // Function to move to a specific slide
    const moveToSlide = (targetIndex) => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;
        
        // Update the active dot
        if (dots.length > 0) {
            dots[currentIndex].classList.remove('active');
            dots[targetIndex].classList.add('active');
        }
        
        currentIndex = targetIndex;
        resetInterval(); // Reset timer on manual navigation
    };

    // Auto-play functionality
    const startInterval = () => {
        slideInterval = setInterval(() => {
            const newIndex = (currentIndex + 1) % slides.length;
            moveToSlide(newIndex);
        }, 5000); // Change slide every 5 seconds
    };
    
    const resetInterval = () => {
        clearInterval(slideInterval);
        startInterval();
    };

    // Initialize the slideshow
    if (dots.length > 0) {
        dots[0].classList.add('active');
    }
    startInterval();

    // Adjust on window resize to be fully responsive
    window.addEventListener('resize', () => {
        moveToSlide(currentIndex);
    });
});

// fourth slide
// In your main DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {

    // --- MULTI-AD SLIDESHOW LOGIC ---
    const track = document.querySelector('.grand-track');
    if (!track) return; // Exit if the slideshow doesn't exist

    const slides = Array.from(track.children);
    const dotsContainer = document.querySelector('.g-dots');
    
    if (slides.length === 0) return; // Exit if there are no slides

    let currentIndex = 0;
    let slideInterval;

    // Create dots dynamically based on the number of .slides divs
    slides.forEach((slide, index) => {
        const dotButton = document.createElement('button');
        dotButton.classList.add('dot');
        dotButton.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dotButton.addEventListener('click', () => {
            moveToSlide(index);
        });
        dotsContainer.appendChild(dotButton);
    });
    const dots = Array.from(dotsContainer.children);

    // Function to move to a specific slide
    const moveToSlide = (targetIndex) => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;
        
        // Update the active dot
        if (dots.length > 0) {
            dots[currentIndex].classList.remove('active');
            dots[targetIndex].classList.add('active');
        }
        
        currentIndex = targetIndex;
        resetInterval(); // Reset timer on manual navigation
    };

    // Auto-play functionality
    const startInterval = () => {
        slideInterval = setInterval(() => {
            const newIndex = (currentIndex + 1) % slides.length;
            moveToSlide(newIndex);
        }, 5000); // Change slide every 5 seconds
    };
    
    const resetInterval = () => {
        clearInterval(slideInterval);
        startInterval();
    };

    // Initialize the slideshow
    if (dots.length > 0) {
        dots[0].classList.add('active');
    }
    startInterval();

    // Adjust on window resize to be fully responsive
    window.addEventListener('resize', () => {
        moveToSlide(currentIndex);
    });
});