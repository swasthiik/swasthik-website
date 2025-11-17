document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust scroll position for fixed header
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Optional: Update active class in navbar
                document.querySelectorAll('.navbar a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Intersection Observer for highlighting active section in navbar
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -50% 0px', // When 50% of the section is in view
        threshold: 0.2 // When 20% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to the link corresponding to the intersecting section
                const currentSectionId = entry.target.id;
                const correspondingLink = document.querySelector(`.navbar a[href="#${currentSectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // Optional: Form submission handling (basic example)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission

            // In a real application, you would send this data to a backend server
            // For now, let's just log it and give a simple alert
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            console.log('Form Submitted:', formObject);
            alert('Thank you for your message! We will get back to you soon.');

            this.reset(); // Clear the form
        });
    }

});