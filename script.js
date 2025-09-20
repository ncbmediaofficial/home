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
        // const navLinks = document.querySelectorAll('.nav-link');
        // navLinks.forEach(link => {
        //     link.addEventListener('click', function(e) {
        //         e.preventDefault();
        //         navLinks.forEach(l => l.classList.remove('active'));
        //         this.classList.add('active');
        //     });
        // });

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
        // Newsletter form submission
        const newsletterForm = document.querySelector(".newsletter-form");
        if (newsletterForm) {
          newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(
              `Thank you for subscribing with ${email}! You'll receive our next update soon.`
            );
            this.reset();
          });
        }

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