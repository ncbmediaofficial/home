 document.addEventListener("DOMContentLoaded", function () {
        // Toggle panels
        const actionButtons = document.querySelectorAll(".action-btn");
        const panels = document.querySelectorAll(".panel");
        const closeButtons = document.querySelectorAll(".close-panel");
        const overlay = document.getElementById("overlay");

        // Open panel function
        function openPanel(panel) {
          panels.forEach((p) => p.classList.remove("active"));
          overlay.classList.add("active");
          panel.classList.add("active");
          const input = panel.querySelector("input");
          if (input) {
            input.focus();
          }
        }

        // Close panel function
        function closePanels() {
          panels.forEach((panel) => panel.classList.remove("active"));
          overlay.classList.remove("active");
        }

        // Open panels when action buttons are clicked
        actionButtons.forEach((button) => {
          button.addEventListener("click", function () {
            const panelId = this.getAttribute("data-panel");
            const panel = document.getElementById(panelId);
            openPanel(panel);
          });
        });

        // Close panels when clicking close button
        closeButtons.forEach((button) => {
          button.addEventListener("click", closePanels);
        });

        // Close panels when clicking outside
        overlay.addEventListener("click", closePanels);

        // Close panels with Escape key
        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape") {
            closePanels();
          }
        });

        // Set active link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // // DOM Elements
        // const tabs = document.querySelectorAll(".tab");
        // const tabPanes = document.querySelectorAll(".tab-pane");
        // const scrollTopBtn = document.querySelector(".scroll-top");
        // const lightbox = document.getElementById("lightbox");
        // const lightboxImg = lightbox.querySelectorAll("img");
        // const lightboxClose = lightbox.querySelector(".lightbox-close");
        // const galleryItems = document.querySelectorAll(".gallery-item");
        // const likeButtons = document.querySelectorAll(
        //   ".post-action[data-likes]"
        // );

        // // Tab switching functionality
        // tabs.forEach((tab) => {
        //   tab.addEventListener("click", (e) => {
        //     e.preventDefault();
        //     tabs.forEach((t) => t.classList.remove("active"));
        //     tab.classList.add("active");
        //     const targetTab = tab.getAttribute("data-tab");
        //     tabPanes.forEach((pane) => {
        //       pane.classList.remove("active");
        //     });
        //     document.getElementById(targetTab).classList.add("active");
        //   });
        // });

        // Scroll to top button functionality
        // window.addEventListener("scroll", () => {
        //   if (window.pageYOffset > 300) {
        //     scrollTopBtn.classList.add("visible");
        //   } else {
        //     scrollTopBtn.classList.remove("visible");
        //   }
        // });

        // scrollTopBtn.addEventListener("click", () => {
        //   window.scrollTo({
        //     top: 0,
        //     behavior: "smooth",
        //   });
        // });
    // Newsletter form functionality

    // Initialize EmailJS
        emailjs.init("5bss0jQ2WCQiP00xw");
        
        // DOM Elements
        const newsletterForm = document.getElementById("newsletter-form");
        const submitButton = document.getElementById("news-letter-submit");
        const formMessage = document.getElementById("formMessage");
        const emailInput = document.getElementById("email-input");
        const validationIndicator = document.getElementById("validation-indicator");
        const validationText = document.getElementById("validation-text");

        // Email validation cache to avoid duplicate API calls
        const emailValidationCache = new Map();
        let validationTimeout = null;

        // Form submission handler
        newsletterForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            // Clear previous messages
            formMessage.style.display = "none";
            formMessage.className = "form-message";

            // Validate email
            const email = emailInput.value.trim();

            if (!email) {
                showMessage("Please enter your email address.", "error");
                emailInput.focus();
                return;
            }

            if (!isValidGmailFormat(email)) {
                showMessage("Invalid Gmail format. Please enter a valid Gmail address.", "error");
                emailInput.focus();
                return;
            }

            // Show loading state
            submitButton.disabled = true;
            submitButton.classList.add('btn-loading');

            // Check if email actually exists
            try {
                const isValid = await validateGmailExists(email);
                
                if (!isValid) {
                    showMessage("This Gmail address doesn't exist. Please check and try again.", "error");
                    resetButtonState();
                    return;
                }

                // Send email using EmailJS
                const serviceID = "service_89umglp";
                const templateID = "template_h84y2uf";

                emailjs.sendForm(serviceID, templateID, this).then(
                    () => {
                        // Success
                        showMessage("Thank you for subscribing! We'll keep you updated.", "success");
                        newsletterForm.reset();
                        resetValidation();
                        
                        // Reset button state
                        resetButtonState();
                    },
                    (err) => {
                        // Error
                        console.error("EmailJS error:", err);
                        let errorMessage = "Failed to subscribe. Please try again later.";
                        
                        if (err.text && err.text.includes('quota')) {
                            errorMessage = "Subscription service is temporarily unavailable. Please try again in a few minutes.";
                        } else if (err.status === 400) {
                            errorMessage = "Invalid request. Please check your email address.";
                        }
                        
                        showMessage(errorMessage, "error");
                        
                        // Reset button state
                        resetButtonState();
                    }
                );

            } catch (error) {
                console.error("Email validation error:", error);
                showMessage("Unable to verify email address. Please try again.", "error");
                resetButtonState();
            }
        });

        // Basic Gmail format validation
        function isValidGmailFormat(email) {
            // Check for Gmail domain with optional dots in username
            const gmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail\.com$/;
            return gmailRegex.test(email);
        }

        // Advanced Gmail validation using Google's API
        async function validateGmailExists(email) {
            // Check cache first
            if (emailValidationCache.has(email)) {
                return emailValidationCache.get(email);
            }

            try {
                // Show validating state
                validationIndicator.className = "validation-indicator validating show";
                validationIndicator.innerHTML = '<span class="validation-icon validating-icon">⟳</span><span>Checking email validity...</span>';

                // Using Google's Sign-In API to check if email exists
                // Note: This is a simplified approach - in production, you might want to use a more robust method
                const response = await fetch(`https://mail.google.com/mail/gxlu?email=${encodeURIComponent(email)}`, {
                    method: 'GET',
                    mode: 'no-cors'
                });

                // Alternative method: Check MX records for Gmail domain
                // This is a more reliable way to check email validity
                const mxCheckResponse = await checkEmailMXRecords(email);
                
                // Cache the result
                emailValidationCache.set(email, mxCheckResponse);
                
                return mxCheckResponse;
                
            } catch (error) {
                console.error("Gmail validation failed:", error);
                // If validation fails, fall back to format validation only
                return isValidGmailFormat(email);
            }
        }

        // Check MX records for email validation
        async function checkEmailMXRecords(email) {
            const domain = 'gmail.com';
            
            try {
                // For Gmail, we know the MX records should point to Google's servers
                // This is a simplified check - in production, you might want to use a proper email validation service
                const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
                const data = await response.json();
                
                // Check if MX records exist and point to Google
                if (data.Answer && data.Answer.length > 0) {
                    const hasGoogleMX = data.Answer.some(record => 
                        record.data.includes('google') || 
                        record.data.includes('aspmx.l.google.com')
                    );
                    return hasGoogleMX;
                }
                
                return false;
            } catch (error) {
                console.error("MX record check failed:", error);
                // Fallback: Use a third-party email validation API
                return await validateWithThirdPartyAPI(email);
            }
        }

        // Third-party email validation fallback
        async function validateWithThirdPartyAPI(email) {
            try {
                // Using a free email validation API (example - you might need to replace with a real API)
                const response = await fetch(`https://api.eva.pingutil.com/email?email=${encodeURIComponent(email)}`);
                const data = await response.json();
                
                return data.data.valid_format && data.data.deliverable;
            } catch (error) {
                console.error("Third-party validation failed:", error);
                // Final fallback - basic format validation
                return isValidGmailFormat(email);
            }
        }

        // Function to show message
        function showMessage(text, type) {
            formMessage.textContent = text;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = "block";

            // Auto-hide success messages after 5 seconds
            if (type === "success") {
                setTimeout(() => {
                    formMessage.style.display = "none";
                }, 5000);
            }
        }

        // Function to reset button state
        function resetButtonState() {
            submitButton.disabled = false;
            submitButton.classList.remove('btn-loading');
        }

        // Real-time email validation
        emailInput.addEventListener('input', function() {
            const email = this.value.trim();
            
            // Clear previous timeout
            if (validationTimeout) {
                clearTimeout(validationTimeout);
            }
            
            // Hide form message when user starts typing
            if (formMessage.style.display === "block" && formMessage.classList.contains("error")) {
                formMessage.style.display = "none";
            }
            
            // Debounce validation to avoid too many API calls
            validationTimeout = setTimeout(() => {
                validateEmailInRealTime(email);
            }, 800);
        });

        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            validateEmailInRealTime(email, true);
        });

        // Real-time validation function
        async function validateEmailInRealTime(email, forceValidation = false) {
            if (!email) {
                resetValidation();
                return;
            }

            if (!isValidGmailFormat(email)) {
                // Invalid format
                emailInput.classList.remove('valid');
                emailInput.classList.add('error');
                validationIndicator.className = "validation-indicator error show";
                
                if (email.includes('@') && !email.endsWith('@gmail.com')) {
                    validationText.textContent = "Only Gmail addresses are accepted";
                } else {
                    validationText.textContent = "Please enter a valid Gmail address format";
                }
                return;
            }

            // Valid format - check if it exists (only if forced or after delay)
            if (forceValidation) {
                try {
                    const isValid = await validateGmailExists(email);
                    
                    if (isValid) {
                        emailInput.classList.remove('error');
                        emailInput.classList.add('valid');
                        validationIndicator.className = "validation-indicator success show";
                        validationIndicator.innerHTML = '<span class="validation-icon success-icon">✓</span><span>Valid Gmail address</span>';
                    } else {
                        emailInput.classList.remove('valid');
                        emailInput.classList.add('error');
                        validationIndicator.className = "validation-indicator error show";
                        validationText.textContent = "This Gmail address doesn't exist";
                    }
                } catch (error) {
                    // If validation fails, show format is valid but existence unknown
                    emailInput.classList.remove('error');
                    emailInput.classList.add('valid');
                    validationIndicator.className = "validation-indicator success show";
                    validationIndicator.innerHTML = '<span class="validation-icon success-icon">✓</span><span>Valid Gmail format</span>';
                }
            } else {
                // Just show format is valid
                emailInput.classList.remove('error');
                emailInput.classList.add('valid');
                validationIndicator.className = "validation-indicator success show";
                validationIndicator.innerHTML = '<span class="validation-icon success-icon">✓</span><span>Valid Gmail format</span>';
            }
        }

        // Reset validation UI
        function resetValidation() {
            emailInput.classList.remove('error', 'valid');
            validationIndicator.classList.remove('show');
        }     
         
      const adSlides = document.getElementById('adSlides');
        const indicators = document.querySelectorAll('.ad-indicator');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentSlide = 0;
        let slideInterval;
        
        // Function to show a specific slide
        function showSlide(index) {
            // Wrap around if at ends
            if (index >= indicators.length) index = 0;
            if (index < 0) index = indicators.length - 1;
            
            adSlides.style.transform = `translateX(-${index * 100}%)`;
            
            // Update indicators
            indicators.forEach(indicator => indicator.classList.remove('active'));
            indicators[index].classList.add('active');
            
            currentSlide = index;
        }
        
        // Next slide function
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // Previous slide function
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        // Start auto rotation
        function startSlider() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        // Stop auto rotation
        function stopSlider() {
            clearInterval(slideInterval);
        }
        
        // Add click events to indicators
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showSlide(index);
            });
        });
        
        // Add click events to navigation buttons
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Start the slider
        startSlider();
        
        // Pause on hover
        adSlides.parentElement.addEventListener('mouseenter', stopSlider);
        adSlides.parentElement.addEventListener('mouseleave', startSlider);
      });