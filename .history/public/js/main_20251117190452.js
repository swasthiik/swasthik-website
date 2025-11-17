document.addEventListener('DOMContentLoaded', () => {
    
    // --- Dynamic Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Mobile Menu ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Smooth Scroll ---
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
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // --- Active Link Highlighter ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const observerOptions = { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const currentSectionId = entry.target.id;
                const correspondingLink = document.querySelector(`.nav-menu a[href="#${currentSectionId}"]`);
                if (correspondingLink) { correspondingLink.classList.add('active'); }
            }
        });
    }, observerOptions);
    sections.forEach(section => sectionObserver.observe(section));


    // --- 🚀 WEB3FORMS SUBMISSION (For Live Website) ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Stop page reload

            // Validation Logic
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const successMsg = document.getElementById('successMessage');
            const submitBtn = document.getElementById('submitBtn');
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const messageError = document.getElementById('message-error');
            const originalBtnText = "Send Request";

            [nameError, emailError, messageError].forEach(el => {
                el.style.display = 'none'; el.textContent = '';
            });

            if (!nameInput.value.trim()) {
                nameError.textContent = 'Name is required.';
                nameError.style.display = 'block';
                isValid = false;
            }
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Email is required.';
                emailError.style.display = 'block';
                isValid = false;
            }
            if (!messageInput.value.trim()) {
                messageError.textContent = 'Message is required.';
                messageError.style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                // 1. Visual Loading
                submitBtn.textContent = "Sending...";
                submitBtn.disabled = true;
                submitBtn.style.opacity = "0.7";

                // 2. Prepare Data for Web3Forms
                const formData = new FormData(contactForm);

                // 3. Send to Internet API (Web3Forms)
                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                })
                .then(async (response) => {
                    if (response.status == 200) {
                        // SUCCESS!
                        successMsg.style.display = 'block';
                        contactForm.reset();
                        submitBtn.textContent = "Sent!";
                        submitBtn.style.backgroundColor = "#22c55e"; 
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
                    alert("Network error. Please check your internet.");
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                })
                .finally(() => {
                    // Reset Button
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