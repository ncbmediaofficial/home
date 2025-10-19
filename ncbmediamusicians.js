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
            
            // // Set active link                  
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    // e.preventDefault();
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
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
            
         
            
            // Video data
            const videoData = [
                {
                    id: 1,
                    title: "Dancehall Artist",
                    artist: "Shatta Wale",
                    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&h=337&q=80",
                    views: "1.2M",
                    duration: "4:15",
                    uploadDate: "2 weeks ago"
                },
               
            ];
            
            // Function to render videos
            function renderVideos(videos, searchTerm = '') {
                const container = document.getElementById('videos-container');
                container.innerHTML = '';
                
                if (videos.length === 0) {
                    document.getElementById('no-results').style.display = 'block';
                    document.getElementById('results-count').textContent = 'No videos found';
                    return;
                }
                
                document.getElementById('no-results').style.display = 'none';
                document.getElementById('results-count').textContent = `Showing ${videos.length} ${videos.length === 1 ? 'video' : 'videos'}`;
                
                videos.forEach(video => {
                    const videoCard = document.createElement('div');
                    videoCard.className = 'video-card';
                    videoCard.innerHTML = `
                        <div class="video-thumbnail">
                            <img src="${video.thumbnail}" alt="${video.title}">
                            <div class="video-duration">${video.duration}</div>
                        </div>
                        <div class="video-content">
                            <h3 class="video-title">${video.title}</h3>
                            <p class="video-artist">${video.artist}</p>
                            <div class="video-meta">
                                <span class="video-views">
                                    <i class="fas fa-eye"></i> ${video.views} views
                                </span>
                                <span class="video-date">
                                    <i class="far fa-calendar-alt"></i> ${video.uploadDate}
                                </span>
                            </div>
                        </div>
                    `;
                    container.appendChild(videoCard);
                });
            }
            
            // Function to filter videos
            function filterVideos(searchTerm) {
                if (!searchTerm.trim()) {
                    return videoData;
                }
                
                const term = searchTerm.toLowerCase();
                return videoData.filter(video => 
                    video.title.toLowerCase().includes(term) || 
                    video.artist.toLowerCase().includes(term)
                );
            }
            
            // Search functionality
            const searchInput = document.getElementById('search-input');
            const searchButton = document.getElementById('search-button');
            
            // Real-time search as user types
            searchInput.addEventListener('input', debounce(() => {
                const searchTerm = searchInput.value;
                const filteredVideos = filterVideos(searchTerm);
                renderVideos(filteredVideos);
            }, 300));
            
            // Search button click
            searchButton.addEventListener('click', () => {
                const searchTerm = searchInput.value;
                const filteredVideos = filterVideos(searchTerm);
                renderVideos(filteredVideos);
            });
            
            // Enter key in search input
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    const searchTerm = searchInput.value;
                    const filteredVideos = filterVideos(searchTerm);
                    renderVideos(filteredVideos);
                }
            });
            
            // Debounce function for search
            function debounce(func, wait) {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            }
            
            // Initial render
            renderVideos(videoData);
        });