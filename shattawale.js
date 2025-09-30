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

        // DOM Elements
        const tabs = document.querySelectorAll(".tab");
        const tabPanes = document.querySelectorAll(".tab-pane");
        const scrollTopBtn = document.querySelector(".scroll-top");
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = lightbox.querySelector("img");
        const lightboxClose = lightbox.querySelector(".lightbox-close");
        const galleryItems = document.querySelectorAll(".gallery-item");
        const likeButtons = document.querySelectorAll(
          ".post-action[data-likes]"
        );

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
        // Add click event to stories
        const stories = document.querySelectorAll(".story");
        stories.forEach((story) => {
          story.addEventListener("click", function () {
            this.classList.add("active");
            setTimeout(() => {
              this.classList.remove("active");
            }, 300);
            alert(
              "Navigating to artist profile: " +
                this.querySelector(".story-name").textContent
            );
          });
        });

        // Scroll to top button functionality
        window.addEventListener("scroll", () => {
          if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add("visible");
          } else {
            scrollTopBtn.classList.remove("visible");
          }
        });

        scrollTopBtn.addEventListener("click", () => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });

        // Make profile tabs sticky
        window.addEventListener("scroll", () => {
          const profileTabs = document.querySelector(".profile-tabs");
          const scrollPosition = window.scrollY;

          if (scrollPosition > 150) {
            profileTabs.style.position = "fixed";
            profileTabs.style.top = "80px";
            profileTabs.style.width = "100%";
            profileTabs.style.maxWidth = "1400px";
            profileTabs.style.left = "50%";
            profileTabs.style.transform = "translateX(-50%)";
            profileTabs.style.zIndex = "800";
          } else {
            profileTabs.style.position = "static";
            profileTabs.style.transform = "none";
          }
        });

        // Gallery lightbox functionality
        galleryItems.forEach((item) => {
          item.addEventListener("click", () => {
            const imgSrc = item.getAttribute("data-src");
            lightboxImg.src = imgSrc;
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
          });
        });

        lightboxClose.addEventListener("click", () => {
          lightbox.classList.remove("active");
          document.body.style.overflow = "";
        });

        lightbox.addEventListener("click", (e) => {
          if (e.target === lightbox) {
            lightbox.classList.remove("active");
            document.body.style.overflow = "";
          }
        });

        // Like functionality
        likeButtons.forEach((button) => {
          button.addEventListener("click", function () {
            const likeCount = this.querySelector("span");
            const likeIcon = this.querySelector("i");
            let count = parseInt(this.getAttribute("data-likes"));

            if (this.classList.contains("liked")) {
              this.classList.remove("liked");
              likeIcon.textContent = "favorite_border";
              count--;
            } else {
              this.classList.add("liked");
              likeIcon.textContent = "favorite";
              count++;
            }

            likeCount.textContent = count;
            this.setAttribute("data-likes", count);
          });
        });

           // Initialize EmailJS
        (function(){
            emailjs.init({
                publicKey: "5bss0jQ2WCQiP00xw",
            });
        })();

        // Newsletter form submission
        const contactForm = document.getElementById("newsletter-form");
        const submitButton = document.getElementById("news-letter-submit");
        const formMessage = document.getElementById("formMessage");

        // Form submission handler
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            // Basic form validation
            if (!contactForm.checkValidity()) {
                // If form is invalid, show browser's native validation messages
                contactForm.reportValidity();
                return;
            }

            // Show loading state
            submitButton.disabled = true;
            submitButton.classList.add("btn-loading");
            submitButton.textContent = "";
            
            // Your EmailJS service and template IDs
            const serviceID = "service_89umglp";
            const templateID = "template_h84y2uf";

            // Send form data using EmailJS
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    // Success handling
                    showMessage("Thank you for subscribing! We'll keep you updated.", "success");
                    contactForm.reset();
                })
                .catch((error) => {
                    // Error handling
                    console.error("EmailJS error:", error);
                    showMessage("Failed to subscribe. Please try again later.", "error");
                })
                .finally(() => {
                    // Reset button state regardless of success or failure
                    resetButtonState();
                });
        });

        // Function to show message to user
        function showMessage(text, type) {
            formMessage.textContent = text;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = "block";
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = "none";
            }, 5000);
        }

        // Function to reset button state
        function resetButtonState() {
            submitButton.disabled = false;
            submitButton.classList.remove("btn-loading");
            submitButton.textContent = "Subscribe";
        }
            
         
        // Advert Slider Functionality
        const advertSlides = document.querySelectorAll(".advert-slide");
        const advertDots = document.querySelectorAll(".advert-dot");
        let currentSlide = 0;

        // Function to show a specific slide
        function showSlide(index) {
          // Remove active classes
          advertSlides.forEach((slide) =>
            slide.classList.remove("active", "prev", "next")
          );
          advertDots.forEach((dot) => dot.classList.remove("active"));

          // Add classes for animation
          if (index > currentSlide) {
            advertSlides[currentSlide].classList.add("prev");
            advertSlides[index].classList.add("next");
          } else {
            advertSlides[currentSlide].classList.add("next");
            advertSlides[index].classList.add("prev");
          }

          // Set new current slide
          setTimeout(() => {
            advertSlides.forEach((slide) =>
              slide.classList.remove("prev", "next")
            );
            advertSlides[index].classList.add("active");
            advertDots[index].classList.add("active");
            currentSlide = index;
          }, 10);
        }

        // Add click events to dots
        advertDots.forEach((dot, index) => {
          dot.addEventListener("click", () => {
            showSlide(index);
          });
        });

        // Auto slide every 5 seconds
        setInterval(() => {
          const nextSlide = (currentSlide + 1) % advertSlides.length;
          showSlide(nextSlide);
        }, 5000);
      });