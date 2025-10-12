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

             // Make profile tabs sticky
            window.addEventListener('scroll', () => {
                const profileTabs = document.querySelector('.profile-tabs');
                const scrollPosition = window.scrollY;
                
                if (scrollPosition > 150) {
                    profileTabs.style.position = 'fixed';
                    profileTabs.style.top = '80px';
                    profileTabs.style.width = '100%';
                    profileTabs.style.maxWidth = '1400px';
                    profileTabs.style.left = '50%';
                    profileTabs.style.transform = 'translateX(-50%)';
                    profileTabs.style.zIndex = '800';
                } else {
                    profileTabs.style.position = 'static';
                    profileTabs.style.transform = 'none';
                }
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
           
            
            // Ad slider functionality
            const adSlides = document.getElementById('adSlides');
            const indicators = document.querySelectorAll('.ad-indicator');
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
            
            // Start the slider
            startSlider();
            
            // Pause on hover
            adSlides.parentElement.addEventListener('mouseenter', stopSlider);
            adSlides.parentElement.addEventListener('mouseleave', startSlider);
            
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
      // Newsletter form functionality

// Get form and message elements
const newsletterForms = document.getElementById("newsletter-form");
const submitButtons = document.getElementById("news-letter-submit");
const formMessages = document.getElementById("formMessage");

// Form submission handler
newsletterForms.addEventListener("submit", function (event) {
    event.preventDefault();
    hideMessage();

    // Validate email
    const emailInput = newsletterForms.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (!email) {
        showMessage("Please enter your email address.", "error");
        emailInput.focus();
        return;
    }

    if (!isValidEmail(email)) {
        showMessage("Please enter a valid email address.", "error");
        emailInput.focus();
        return;
    }

    // Show loading state
    setLoadingState(true);

    const serviceID = "service_89umglp";
    const templateID = "template_h84y2uf";

    // Send email using EmailJS with publicKey in options
    emailjs.sendForm(serviceID, templateID, this, {
        publicKey: "5bss0jQ2WCQiP00xw", // Initialization is now here
    })
    .then(() => {
        showMessage("Thank you for subscribing! We'll keep you updated.", "success");
        newsletterForms.reset();
    })
    .catch((error) => {
        console.log("Full error object:", error);
        let userMessage = "Failed to subscribe. Please try again later.";

        // Provide more specific error messages
        if (error.text && error.text.includes("Gmail_API")) {
            if (error.text.includes("insufficient authentication scopes") || error.text.includes("Invalid grant")) {
                userMessage = "Service error. The administrator needs to reconnect the email account.";
            }
        }
        showMessage(userMessage, 'error');
    })
    .finally(() => {
        setLoadingState(false);
    });
});

// The rest of your helper functions (isValidEmail, showMessage, hideMessage, setLoadingState) remain the same
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(text, type) {
    formMessages.textContent = text;
    formMessages.className = `form-message ${type}`;
    formMessages.style.display = "block";
    if (type === "success") {
        setTimeout(() => { hideMessage(); }, 5000);
    }
}

function hideMessage() {
    formMessages.style.display = "none";
    formMessages.className = "form-message";
}

function setLoadingState(isLoading) {
    if (isLoading) {
        submitButtons.disabled = true;
        submitButtons.classList.add('btn-loading');
        submitButtons.textContent = "";
    } else {
        submitButtons.disabled = false;
        submitButtons.classList.remove('btn-loading');
        submitButtons.textContent = "Subscribe";
    }
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
        const submitButton = document.getElementById("submitButton");
        const btnText = submitButton.querySelector(".btn-text");
        const formMessage = document.getElementById("formMessage");
        
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
       