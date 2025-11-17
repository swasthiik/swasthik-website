document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 3. Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; 

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Active Link Highlighter
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const observerOptions = { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const currentSectionId = entry.target.id;
                const correspondingLink = document.querySelector(`.nav-menu a[href="#${currentSectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 5. REAL Form Submission using Web3Forms
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default

            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const messageError = document.getElementById('message-error');
            const successMsg = document.getElementById('successMessage');
            const submitBtn = document.getElementById('submitBtn');

            // Reset errors
            [nameError, emailError, messageError].forEach(el => {
                el.style.display = 'none'; 
                el.textContent = '';
            });

            // Validate Name
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Name is required.';
                nameError.style.display = 'block';
                isValid = false;
            }

            // Validate Email
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Email is required.';
                emailError.style.display = 'block';
                isValid = false;
            }

            // Validate Message
            if (!messageInput.value.trim()) {
                messageError.textContent = 'Message is required.';
                messageError.style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                // Visual Feedback
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = "Sending...";
                submitBtn.disabled = true;
                submitBtn.style.opacity = "0.7";

                // Prepare Data for Web3Forms
                const formData = new FormData(contactForm);

                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                })
                .then(async (response) => {
                    const json = await response.json();
                    if (response.status == 200) {
                        // SUCCESS!
                        successMsg.style.display = 'block';
                        contactForm.reset();
                        
                        submitBtn.textContent = "Sent!";
                        submitBtn.style.backgroundColor = "#22c55e"; // Green
                    } else {
                        // ERROR
                        console.log(response);
                        alert("Something went wrong. Please try again.");
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                    }
                })
                .catch(error => {
                    console.log(error);
                    alert("Something went wrong. Check your internet connection.");
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                })
                .finally(() => {
                    // Reset Button after 4 seconds
                    setTimeout(() => {
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = "1";
                        submitBtn.style.backgroundColor = "";
                        successMsg.style.display = 'none';
                    }, 4000);
                });
            }
        });
    }
});