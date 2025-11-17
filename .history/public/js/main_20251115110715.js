document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            // Check if it's an internal hash link
            if (targetId.startsWith('#')) {
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
            } else {
                // For external links, navigate normally (though usually navbar has internal links)
                window.location.href = targetId;
            }
        });
    });

    // Intersection Observer for highlighting active section in navbar
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '-50% 0px -50% 0px', // Adjusted to activate when section is roughly in the middle of the viewport
        threshold: 0 // No specific threshold needed, just when it enters/exits the rootMargin
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

    // Form submission handling with client-side validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission

            let isValid = true;

            // Simple validation for required fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const messageError = document.getElementById('message-error');

            // Reset previous error messages
            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';
            nameError.style.display = 'none';
            emailError.style.display = 'none';
            messageError.style.display = 'none';


            if (!nameInput.value.trim()) {
                nameError.textContent = 'Name is required.';
                nameError.style.display = 'block';
                isValid = false;
            }

            if (!emailInput.value.trim()) {
                emailError.textContent = 'Email is required.';
                emailError.style.display = 'block';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) { // Basic email regex
                emailError.textContent = 'Please enter a valid email address.';
                emailError.style.display = 'block';
                isValid = false;
            }

            if (!messageInput.value.trim()) {
                messageError.textContent = 'Message is required.';
                messageError.style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                // In a real application, you would send this data to a backend server
                const formData = new FormData(this);
                const formObject = {};
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });

                console.log('Form Submitted:', formObject);

                // Simulate API call success
                setTimeout(() => {
                    alert('Thank you for your message! We will get back to you soon.');
                    this.reset(); // Clear the form
                }, 500); // Simulate network delay
            }
        });
    }
});