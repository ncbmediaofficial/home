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
    
    const newsletterForm = document.getElementById("newsletter-form");
    const submitButton = document.getElementById("news-letter-submit");
    const formMessage = document.getElementById("formMessage");

    newsletterForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Clear previous messages
        formMessage.style.display = "none";
        formMessage.className = "form-message";

        // Validate email
        const emailInput = newsletterForm.querySelector('input[type="email"]');
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
        submitButton.disabled = true;
        submitButton.classList.add('btn-loading');
        submitButton.textContent = "";

        const serviceID = "service_89umglp";
        const templateID = "template_h84y2uf";

        emailjs.sendForm(serviceID, templateID, this).then(
            () => {
                // Success
                showMessage("Thank you for subscribing! We'll keep you updated.", "success");
                newsletterForm.reset();
                
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
    });

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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
        submitButton.textContent = "Subscribe";
    }

    // Real-time email validation
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        if (email && !isValidEmail(email)) {
            showMessage("Please enter a valid email address.", "error");
        } else {
            formMessage.style.display = "none";
        }
    });

    // Hide message when user starts typing again
    emailInput.addEventListener('input', function() {
        if (formMessage.style.display === "block" && formMessage.classList.contains("error")) {
            formMessage.style.display = "none";
        }
    });
        
         
        // Ad slider functionality
        const adSlides = document.getElementById("adSlides");
        const indicators = document.querySelectorAll(".ad-indicator");
        let currentSlide = 0;
        let slideInterval;

        // Function to show a specific slide
        function showSlide(index) {
          // Wrap around if at ends
          if (index >= indicators.length) index = 0;
          if (index < 0) index = indicators.length - 1;

          adSlides.style.transform = `translateX(-${index * 100}%)`;

          // Update indicators
          indicators.forEach((indicator) =>
            indicator.classList.remove("active")
          );
          indicators[index].classList.add("active");

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
        indicators.forEach((indicator) => {
          indicator.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            showSlide(index);
          });
        });

        // Start the slider
        startSlider();
      });