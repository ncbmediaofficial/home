 document.addEventListener('DOMContentLoaded', function() {
            // Toggle panels
            const actionButtons = document.querySelectorAll('.action-btn');
            const panels = document.querySelectorAll('.panel');
            const closeButtons = document.querySelectorAll('.close-panel');
            const overlay = document.getElementById('overlay');
            
            // Open panel function
            function openPanel(panel) {
                panels.forEach(p => p.classList.remove('active'));
                overlay.classList.add('active');
                panel.classList.add('active');
                const input = panel.querySelector('input');
                if (input) {
                    input.focus();
                }
            }
            
            // Close panel function
            function closePanels() {
                panels.forEach(panel => panel.classList.remove('active'));
                overlay.classList.remove('active');
            }
            
            // Open panels when action buttons are clicked
            actionButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const panelId = this.getAttribute('data-panel');
                    const panel = document.getElementById(panelId);
                    openPanel(panel);
                });
            });
            
            // Close panels when clicking close button
            closeButtons.forEach(button => {
                button.addEventListener('click', closePanels);
            });
            
            // Close panels when clicking outside
            overlay.addEventListener('click', closePanels);
            
            // Close panels with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
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
             // DOM Elements
            const tabs = document.querySelectorAll('.tab');
            const tabPanes = document.querySelectorAll('.tab-pane');

              // Tab switching functionality
        tabs.forEach((tab) => {
          tab.addEventListener("click", (e) => {
            e.preventDefault();
            tabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");
            const targetTab = tab.getAttribute("data-tab");
            tabPanes.forEach((pane) => {
              pane.classList.remove("active");
            });
            document.getElementById(targetTab).classList.add("active");
          });
        });

          

            const uploadArea = document.getElementById('upload-area');
            const fileInput = document.getElementById('file-input');
            const previewContainer = document.getElementById('preview-container');
            const browseBtn = uploadArea.querySelector('.btn-browse');
            
            // Open file dialog when clicking on upload area or browse button
            uploadArea.addEventListener('click', () => fileInput.click());
            browseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                fileInput.click();
            });
            
            // Handle drag and drop
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                uploadArea.addEventListener(eventName, preventDefaults, false);
            });
            
            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            ['dragenter', 'dragover'].forEach(eventName => {
                uploadArea.addEventListener(eventName, () => {
                    uploadArea.classList.add('dragover');
                }, false);
            });
            
            ['dragleave', 'drop'].forEach(eventName => {
                uploadArea.addEventListener(eventName, () => {
                    uploadArea.classList.remove('dragover');
                }, false);
            });
            
            uploadArea.addEventListener('drop', handleDrop, false);
            
            function handleDrop(e) {
                const dt = e.dataTransfer;
                const files = dt.files;
                handleFiles(files);
            }
            
            // Handle file selection
            fileInput.addEventListener('change', () => {
                handleFiles(fileInput.files);
            });
            
            function handleFiles(files) {
                [...files].forEach(file => {
                    if (!isValidFileType(file)) {
                        alert(`File type not supported: ${file.name}. Please upload JPG, PNG, MP4, or MOV files.`);
                        return;
                    }
                    
                    if (file.size > 10 * 1024 * 1024) {
                        alert(`File too large: ${file.name}. Max size is 10MB.`);
                        return;
                    }
                    
                    previewFile(file);
                });
            }
            
            function isValidFileType(file) {
                const validTypes = [
                    'image/jpeg',
                    'image/png',
                    'video/mp4',
                    'video/quicktime'
                ];
                return validTypes.includes(file.type);
            }
            
            function previewFile(file) {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove';
                removeBtn.innerHTML = '&times;';
                removeBtn.addEventListener('click', () => {
                    previewItem.remove();
                });
                
                if (file.type.startsWith('image')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        previewItem.appendChild(img);
                        previewItem.appendChild(removeBtn);
                        previewContainer.appendChild(previewItem);
                    };
                    reader.readAsDataURL(file);
                } else if (file.type.startsWith('video')) {
                    const video = document.createElement('video');
                    video.controls = true;
                    
                    const source = document.createElement('source');
                    source.src = URL.createObjectURL(file);
                    source.type = file.type;
                    
                    video.appendChild(source);
                    previewItem.appendChild(video);
                    previewItem.appendChild(removeBtn);
                    previewContainer.appendChild(previewItem);
                }
            }
            
            // // Form submission
            // const tipForm = document.getElementById('tip-form');
            // tipForm.addEventListener('submit', function(e) {
            //     e.preventDefault();
                
            //     // Basic validation
            //     const subject = document.getElementById('subject').value.trim();
            //     const message = document.getElementById('message').value.trim();
                
            //     if (!subject || !message) {
            //         alert('Please fill in all required fields');
            //         return;
            //     }
                
            //     // Show submission feedback
            //     const submitBtn = tipForm.querySelector('.btn-submit');
            //     const originalText = submitBtn.innerHTML;
            //     submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            //     submitBtn.disabled = true;
                
            //     // Simulate form submission
            //     setTimeout(() => {
            //         alert('Thank you! Your tip has been submitted securely.');
            //         tipForm.reset();
            //         previewContainer.innerHTML = '';
            //         submitBtn.innerHTML = originalText;
            //         submitBtn.disabled = false;
            //     }, 1500);
            // });
           
   const rows = document.querySelectorAll('.facts-table tr');
            
            rows.forEach((row, index) => {
                // Set a delay for each row to create a staggered effect
                row.style.opacity = '0';
                row.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    row.style.opacity = '1';
                    row.style.transform = 'translateY(0)';
                }, 100 + (index * 50));
            });
         
            // Scroll to top functionality
            const scrollTopBtn = document.getElementById('scrollTop');
            
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            });
            
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
 // Initialize EmailJS
        emailjs.init("5bss0jQ2WCQiP00xw");
        
        // DOM Elements
        const newsletterForm = document.getElementById("newsletter-form");
        const submitButton = document.getElementById("news-letter-submit");
        const formMessage = document.getElementById("formMessage");
        const emailInputs = document.getElementById("email-input");
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
            const email = emailInputs.value.trim();

            if (!email) {
                showMessage("Please enter your email address.", "error");
                emailInputs.focus();
                return;
            }

            if (!isValidGmailFormat(email)) {
                showMessage("Invalid Gmail format. Please enter a valid Gmail address.", "error");
                emailInputs.focus();
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
        emailInputs.addEventListener('input', function() {
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












    // // Initialize EmailJS with potential security options
    // emailjs.init({
    //   publicKey: "bQOA8LExx-HEj0np3",
    //   blockHeadless: true, // Blocks requests from headless browsers
    //   limitRate: {
    //     id: "app", // Enforces rate limiting per page
    //     throttle: 1000 // 1 request per second (1000 ms)
    //   }
    // });

    // const form = document.getElementById('ad-inquiry-form');
    // const advertSubmitBtn = document.getElementById('advert-submit-btn');

    // form.addEventListener('submit', function(event) {
    //   event.preventDefault();
      
    //   advertSubmitBtn.textContent = 'Sending...';
    //   advertSubmitBtn.disabled = true;

    //   const serviceID = 'service_45g6l5u';
    //   const templateID = 'template_i20a6tl';

    //   emailjs.sendForm(serviceID, templateID, this)
    //     .then(() => {
    //       // Success handling remains the same
    //       advertSubmitBtn.textContent = 'Submit Inquiry';
    //       advertSubmitBtn.disabled = false;
    //       const messageElement = document.getElementById('advertFormMessage');
    //       messageElement.textContent = 'Message sent successfully!';
    //       messageElement.className = 'advert-form-message success';
    //       messageElement.style.display = 'block';
    //       form.reset();
    //       setTimeout(() => {
    //         messageElement.style.display = 'none';
    //       }, 5000);
    //     })
    //     .catch((err) => {
    //       // Enhanced error logging
    //       console.error('EmailJS Failed...', err);
    //       advertSubmitBtn.textContent = 'Submit Inquiry';
    //       advertSubmitBtn.disabled = false;
    //       const messageElement = document.getElementById('advertFormMessage');
    //       messageElement.textContent = 'Failed to send message. Please check the console for details.';
    //       messageElement.className = 'advert-form-message error';
    //       messageElement.style.display = 'block';
    //       setTimeout(() => {
    //         messageElement.style.display = 'none';
    //       }, 5000);
    //     });
    // });
    //    // EmailJS Form Submission - Using official documentation code
          emailjs.init("HfkEQUn-Hzex22E68");
      const tipsubmitButton = document.getElementById("tip-submit-btn");

      document
        .getElementById("tip-form")
        .addEventListener("submit", function (event) {
          event.preventDefault();

          // Show loading state
          tipsubmitButton.value = "Sending...";
          tipsubmitButton.disabled = true;

          const serviceID = "service_a8qfa3h";
          const templateID = "template_9yvhvhn";

          emailjs.sendForm(serviceID, templateID, this).then(
            () => {
              tipsubmitButton.value = "Send Message";
              tipsubmitButton.disabled = false;
              document.getElementById("tipFormMessage").textContent =
                "Message sent successfully!";
              document.getElementById("tipFormMessage").className =
                "tip-form-message success";
              this.reset();

              // Hide message after 5 seconds
              setTimeout(() => {
                document.getElementById("tipFormMessage").style.display = "none";
              }, 5000);
            },
            (err) => {
              tipsubmitButton.value = "Send Message";
              tipsubmitButton.disabled = false;
              document.getElementById("tipFormMessage").textContent =
                "Failed to send message: " + JSON.stringify(err);
              document.getElementById("tipFormMessage").className =
                "tip-form-message error";

              // Hide message after 5 seconds
              setTimeout(() => {
                document.getElementById("tipFormMessage").style.display = "none";
              }, 5000);
            }
          );
        });
            
         // EmailJS Form Submission - Using official documentation code
          emailjs.init("53RdBxFewWrRWS80e");
      const inquiriesSubmitButton = document.getElementById("inquiries-btn");

      document
        .getElementById("media-inquiry-form")
        .addEventListener("submit", function (event) {
          event.preventDefault();

          // Show loading state
          inquiriesSubmitButton.value = "Sending...";
          inquiriesSubmitButton.disabled = true;

          const serviceID = "service_478x2sr";
          const templateID = "template_epuwlme";

          emailjs.sendForm(serviceID, templateID, this).then(
            () => {
              inquiriesSubmitButton.value = "Send Message";
              inquiriesSubmitButton.disabled = false;
              document.getElementById("inquiriesFormMessage").textContent =
                "Message sent successfully!";
              document.getElementById("inquiriesFormMessage").className =
                "inquiries-form-message success";
              this.reset();

              // Hide message after 5 seconds
              setTimeout(() => {
                document.getElementById("inquiriesFormMessage").style.display = "none";
              }, 5000);
            },
            (err) => {
              inquiriesSubmitButton.value = "Send Message";
              inquiriesSubmitButton.disabled = false;
              document.getElementById("inquiriesFormMessage").textContent =
                "Failed to send message: " + JSON.stringify(err);
              document.getElementById("inquiriesFormMessage").className =
                "inquiries-form-message error";

              // Hide message after 5 seconds
              setTimeout(() => {
                document.getElementById("inquiriesFormMessage").style.display = "none";
              }, 5000);
            }
          );
        });
            // Initialize EmailJS with your public key
        emailjs.init("-S6x09iMI7pawysYq"); // Replace with your actual public key

        // DOM elements
        const contactForm = document.getElementById("contactForm");
        const submitButtons = document.getElementById("submitButton");
        const btnText = submitButtons.querySelector(".btn-text");
        const formMessaged = document.getElementById("formMessage");
        
        // Input elements for validation
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const subjectInput = document.getElementById("subject");
        const messageInput = document.getElementById("message");
        
        // Error elements
        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const subjectError = document.getElementById("subjectError");
        const messageError = document.getElementById("messageError");

        // Form validation functions
        function validateName() {
            if (nameInput.value.trim().length < 2) {
                showError(nameInput, nameError, "Name must be at least 2 characters");
                return false;
            } else {
                showSuccess(nameInput, nameError);
                return true;
            }
        }

        function validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, emailError, "Please enter a valid email address");
                return false;
            } else {
                showSuccess(emailInput, emailError);
                return true;
            }
        }

        function validateSubject() {
            if (subjectInput.value.trim().length < 5) {
                showError(subjectInput, subjectError, "Subject must be at least 5 characters");
                return false;
            } else {
                showSuccess(subjectInput, subjectError);
                return true;
            }
        }

        function validateMessage() {
            if (messageInput.value.trim().length < 10) {
                showError(messageInput, messageError, "Message must be at least 10 characters");
                return false;
            } else {
                showSuccess(messageInput, messageError);
                return true;
            }
        }

        function showError(input, errorElement, message) {
            errorElement.textContent = message;
            errorElement.style.display = "block";
            input.classList.add("input-error");
            input.classList.remove("input-success");
        }

        function showSuccess(input, errorElement) {
            errorElement.style.display = "none";
            input.classList.remove("input-error");
            input.classList.add("input-success");
        }

        // Real-time validation
        nameInput.addEventListener("blur", validateName);
        emailInput.addEventListener("blur", validateEmail);
        subjectInput.addEventListener("blur", validateSubject);
        messageInput.addEventListener("blur", validateMessage);

        // Form submission handler
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            
            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isSubjectValid = validateSubject();
            const isMessageValid = validateMessage();
            
            if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
                showMessage("Please fix the errors above before submitting.", "error");
                return;
            }

            // Show loading state
            setLoadingState(true);
            
            // Your EmailJS service and template IDs
            const serviceID = "service_z7pun6r"; // Replace with your service ID
            const templateID = "template_fi5zrxk"; // Replace with your template ID

            try {
                // Send form data using EmailJS
                const response = await emailjs.sendForm(serviceID, templateID, this);
                
                // Success handling
                showMessage("Your message has been sent successfully! We'll get back to you soon.", "success");
                contactForm.reset();
                
                // Remove success classes from inputs
                document.querySelectorAll('.input-success').forEach(el => {
                    el.classList.remove('input-success');
                });
                
            } catch (error) {
                // Error handling
                console.error("EmailJS error:", error);
                
                let errorMessage = "Failed to send message. Please try again later.";
                
                // Provide more specific error messages based on the error
                if (error.text && error.text.includes("Invalid template ID")) {
                    errorMessage = "Configuration error: Please check your template ID.";
                } else if (error.text && error.text.includes("Invalid service ID")) {
                    errorMessage = "Configuration error: Please check your service ID.";
                }
                
                showMessage(errorMessage, "error");
            } finally {
                // Reset button state regardless of success or failure
                setLoadingState(false);
            }
        });

        // Function to show message to user
        function showMessage(text, type) {
            formMessaged.textContent = text;
            formMessaged.className = `form-message ${type}`;
            
            // Auto-hide success messages after 5 seconds
            if (type === "success") {
                setTimeout(() => {
                    formMessaged.style.display = "none";
                }, 5000);
            }
        }

        // Function to set loading state
        function setLoadingState(isLoading) {
            if (isLoading) {
                submitButtons.disabled = true;
                submitButtons.classList.add("btn-loading");
                btnText.textContent = "Sending...";
            } else {
                submitButtons.disabled = false;
                submitButtons.classList.remove("btn-loading");
                btnText.textContent = "Send Message";
            }
        }
   
       
       
        // Initialize EmailJS with your public key
        emailjs.init("bQOA8LExx-HEj0np3"); // Replace with your actual public key

        // DOM elements
        const adInquiryForm = document.getElementById("ad-inquiry-form");
        const advertSubmitBtn = document.getElementById("advert-submit-btn");
        const advertBtn = submitButton.querySelector(".advertSubmitBtn");
        const advertFormMessage = document.getElementById("advertFormMessage");
        
        // Input elements for validation
        const advertNameInput = document.getElementById("name");
        const advertEmailInput = document.getElementById("email");
        const advertCompany = document.getElementById("company");
        const advertAdType = document.getElementById("ad-type");
        const advertMessageInput = document.getElementById("message");
        
        // Error elements
        const advertNameError = document.getElementById("nameError");
        const advertEmailError = document.getElementById("emailError");
        const advertCompanyError = document.getElementById("companyError");
        const advertAdTypeError = document.getElementById("ad-typeError");
        const advertMessageError = document.getElementById("messageError");

        // Form validation functions
        function validateName() {
            if (advertNameInput.value.trim().length < 2) {
                showError(advertNameInput, advertNameError, "Name must be at least 2 characters");
                return false;
            } else {
                showSuccess(advertNameInput, advertNameError);
                return true;
            }
        }

        function validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(advertEmailInput.value.trim())) {
                showError(advertEmailInput, advertEmailError, "Please enter a valid email address");
                return false;
            } else {
                showSuccess(advertEmailInput, advertEmailError);
                return true;
            }
        }

        function validateCompany() {
            if (validateCompany.value.trim()) {
                showError(advertCompany, advertCompanyError, "Subject must be at least 5 characters");
                return false;
            } else {
                showSuccess(advertCompany, advertCompanyError);
                return true;
            }
        }

        function validateMessage() {
            if (advertMessageInput.value.trim().length < 10) {
                showError(advertMessageInput, advertMessageError, "Message must be at least 10 characters");
                return false;
            } else {
                showSuccess(advertMessageInput, advertMessageError);
                return true;
            }
        }

        function showError(input, errorElement, message) {
            errorElement.textContent = message;
            errorElement.style.display = "block";
            input.classList.add("input-error");
            input.classList.remove("input-success");
        }

        function showSuccess(input, errorElement) {
            errorElement.style.display = "none";
            input.classList.remove("input-error");
            input.classList.add("input-success");
        }

        // Real-time validation
        advertNameInput.addEventListener("blur", validateName);
        advertEmailInput.addEventListener("blur", validateEmail);
        advertCompany.addEventListener("blur", validateCompany);
        advertMessageInput.addEventListener("blur", validateMessage);

        // Form submission handler
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            
            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isSubjectValid = validateSubject();
            const isMessageValid = validateMessage();
            
            if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
                showMessage("Please fix the errors above before submitting.", "error");
                return;
            }

            // Show loading state
            setLoadingState(true);
            
            // Your EmailJS service and template IDs
            const serviceID = "service_45g6l5u"; // Replace with your service ID
            const templateID = "template_suokrge"; // Replace with your template ID

            try {
                // Send form data using EmailJS
                const response = await emailjs.sendForm(serviceID, templateID, this);
                
                // Success handling
                showMessage("Your message has been sent successfully! We'll get back to you soon.", "success");
                contactForm.reset();
                
                // Remove success classes from inputs
                document.querySelectorAll('.input-success').forEach(el => {
                    el.classList.remove('input-success');
                });
                
            } catch (error) {
                // Error handling
                console.error("EmailJS error:", error);
                
                let errorMessage = "Failed to send message. Please try again later.";
                
                // Provide more specific error messages based on the error
                if (error.text && error.text.includes("Invalid template ID")) {
                    errorMessage = "Configuration error: Please check your template ID.";
                } else if (error.text && error.text.includes("Invalid service ID")) {
                    errorMessage = "Configuration error: Please check your service ID.";
                }
                
                showMessage(errorMessage, "error");
            } finally {
                // Reset button state regardless of success or failure
                setLoadingState(false);
            }
        });

        // Function to show message to user
        function showMessage(text, type) {
            formMessage.textContent = text;
            formMessage.className = `form-message ${type}`;
            
            // Auto-hide success messages after 5 seconds
            if (type === "success") {
                setTimeout(() => {
                    formMessage.style.display = "none";
                }, 5000);
            }
        }

        // Function to set loading state
        function setLoadingState(isLoading) {
            if (isLoading) {
                submitButton.disabled = true;
                submitButton.classList.add("btn-loading");
                btnText.textContent = "Sending...";
            } else {
                submitButton.disabled = false;
                submitButton.classList.remove("btn-loading");
                btnText.textContent = "Send Message";
            }
        }
   
       
           
        });
       
            // Ad slider functionality
            
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