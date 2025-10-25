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
            
         
            
           
        });
      // Enhanced artist data with local images
        const artistsData = [
            {
                id: 1,
                name: "Shatta Wale",
                genre: "Dancehall",
                image: "shattawale.jpeg",
                link: "shattawale.html"
            },
            // {
            //     id: 2,
            //     name: "Burna Boy",
            //     genre: "Afrobeats",
            //     image: "shattawale.jpeg",
            //     link: "burnaboy.html"
            // },
            // {
            //     id: 3,
            //     name: "Taylor Swift",
            //     genre: "Pop",
            //     image: "shattawale.jpeg",
            //     link: "taylorswift.html"
            // },
            // {
            //     id: 4,
            //     name: "Drake",
            //     genre: "Hip Hop",
            //     image: "shattawale.jpeg",
            //     link: "drake.html"
            // },
            // {
            //     id: 5,
            //     name: "Beyoncé",
            //     genre: "R&B",
            //     image: "shattawale.jpeg",
            //     link: "beyonce.html"
            // },
            // {
            //     id: 6,
            //     name: "Ed Sheeran",
            //     genre: "Pop",
            //     image: "shattawale.jpeg",
            //     link: "edsheeran.html"
            // }
        ];

        // DOM Elements
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        const searchMessage = document.getElementById('searchMessage');
        const artistsGrid = document.getElementById('artistsGrid');
        const feedbackModal = document.getElementById('feedbackModal');
        const modalClose = document.getElementById('modalClose');
        const cancelButton = document.getElementById('cancelButton');
        const feedbackForm = document.getElementById('feedbackForm');
        const artistNameInput = document.getElementById('artistName');
        const userEmailInput = document.getElementById('userEmail');
        const artistNameError = document.getElementById('artistNameError');
        const userEmailError = document.getElementById('userEmailError');
        const successMessage = document.getElementById('successMessage');

        // Debounce function with improved implementation
        function debounce(func, wait, immediate) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    timeout = null;
                    if (!immediate) func(...args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func(...args);
            };
        }

        // Display artists in the grid with improved accessibility
        function displayArtists(artists) {
            artistsGrid.innerHTML = '';
            
            if (artists.length === 0) {
                displayNoResults();
                return;
            }
            
            artists.forEach(artist => {
                const card = document.createElement('div');
                card.className = 'artist-card';
                card.setAttribute('role', 'gridcell');
                card.tabIndex = 0;
                
                card.innerHTML = `
                    <a href="${artist.link}" aria-label="View details for ${artist.name}">
                        <img 
                            src="${artist.image}" 
                            alt="${artist.name}" 
                            class="artist-image"
                            loading="lazy"
                            width="280"
                            height="420"
                        >
                        <div class="artist-overlay">
                            <h3 class="artist-name">${artist.name}</h3>
                            <p class="artist-genre">${artist.genre}</p>
                        </div>
                    </a>
                `;
                
                artistsGrid.appendChild(card);
            });
        }

        // Display no results message
        function displayNoResults() {
            artistsGrid.innerHTML = `
                <div class="no-results" role="alert">
                    <h3>No artists found</h3>
                    <p>Type the correct artist name or send us feedback to add your artist to our Spotlight.</p>
                    <button class="feedback-button" id="openFeedback">Send Feedback</button>
                </div>
            `;
            
            // Add event listener to the feedback button
            document.getElementById('openFeedback').addEventListener('click', openFeedbackModal);
        }

        // Display loading state
        function displayLoading() {
            artistsGrid.innerHTML = `
                <div class="loading">
                    <div class="loading-spinner" aria-label="Loading artists"></div>
                </div>
            `;
        }

        // Filter artists based on search query
        function filterArtists(query) {
            if (!query.trim()) {
                return artistsData;
            }
            
            const normalizedQuery = query.toLowerCase().trim();
            return artistsData.filter(artist => 
                artist.name.toLowerCase().includes(normalizedQuery) ||
                artist.genre.toLowerCase().includes(normalizedQuery)
            );
        }

        // Check for exact match
        function hasExactMatch(artists, query) {
            if (!query.trim()) return false;
            
            const normalizedQuery = query.toLowerCase().trim();
            return artists.some(artist => 
                artist.name.toLowerCase() === normalizedQuery
            );
        }

        // Handle search with improved UX
        function handleSearch(event) {
            if (event) event.preventDefault();
            
            const query = searchInput.value.trim();
            
            // Validate input
            if (!query) {
                searchMessage.textContent = 'Please enter an artist name to search';
                searchMessage.className = 'search-message search-error';
                displayArtists(artistsData); // Show all artists if empty search
                return;
            }
            
            searchMessage.textContent = '';
            searchMessage.className = 'search-message';
            
            // Show loading state
            displayLoading();
            
            // Simulate API call with setTimeout
            setTimeout(() => {
                const filteredArtists = filterArtists(query);
                const exactMatch = hasExactMatch(filteredArtists, query);
                
                if (filteredArtists.length === 0) {
                    searchMessage.textContent = 'No artists found matching your search';
                    searchMessage.className = 'search-message search-error';
                    displayNoResults();
                } else if (!exactMatch) {
                    searchMessage.textContent = 'No exact match found. Showing similar results.';
                    searchMessage.className = 'search-message';
                    displayArtists(filteredArtists);
                } else {
                    searchMessage.textContent = '';
                    displayArtists(filteredArtists);
                }
            }, 500);
        }

        // Debounced search for real-time filtering
        const debouncedSearch = debounce(handleSearch, 300);

        // Open feedback modal
        function openFeedbackModal() {
            feedbackModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            artistNameInput.focus();
        }

        // Close feedback modal
        function closeFeedbackModal() {
            feedbackModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            // Reset form
            feedbackForm.reset();
            artistNameError.classList.remove('show');
            userEmailError.classList.remove('show');
            successMessage.classList.remove('show');
            
            // Remove error classes from inputs
            artistNameInput.classList.remove('error');
            userEmailInput.classList.remove('error');
        }

        // Validate email format
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Handle feedback form submission
        async function handleFeedbackSubmit(event) {
            event.preventDefault();
            
            // Reset errors
            artistNameError.classList.remove('show');
            userEmailError.classList.remove('show');
            successMessage.classList.remove('show');
            
            // Get form values
            const artistName = artistNameInput.value.trim();
            const userEmail = userEmailInput.value.trim();
            
            // Validate form
            let isValid = true;
            
            if (!artistName) {
                artistNameError.classList.add('show');
                artistNameInput.classList.add('error');
                isValid = false;
            } else {
                artistNameInput.classList.remove('error');
            }
            
            if (!userEmail || !isValidEmail(userEmail)) {
                userEmailError.classList.add('show');
                userEmailInput.classList.add('error');
                isValid = false;
            } else {
                userEmailInput.classList.remove('error');
            }
            
            if (!isValid) return;
            
            // Simulate API call
            try {
                // In a real implementation, you would use fetch()
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                successMessage.classList.add('show');
                
                // Reset form after success
                setTimeout(() => {
                    closeFeedbackModal();
                }, 2000);
            } catch (error) {
                console.error('Error submitting feedback:', error);
                alert('There was an error submitting your request. Please try again.');
            }
        }

        // Keyboard shortcut to focus search (press '/')
        function handleKeyboardShortcut(event) {
            if (event.key === '/' && !event.ctrlKey && !event.metaKey) {
                event.preventDefault();
                searchInput.focus();
            }
            
            // Escape key to close modal
            if (event.key === 'Escape' && feedbackModal.classList.contains('active')) {
                closeFeedbackModal();
            }
        }

        // Initialize the application
        function init() {
            // Display all artists initially
            displayArtists(artistsData);
            
            // Event listeners
            searchForm.addEventListener('submit', handleSearch);
            searchInput.addEventListener('input', debouncedSearch);
            modalClose.addEventListener('click', closeFeedbackModal);
            cancelButton.addEventListener('click', closeFeedbackModal);
            feedbackForm.addEventListener('submit', handleFeedbackSubmit);
            document.addEventListener('keydown', handleKeyboardShortcut);
            
            // Close modal when clicking outside
            feedbackModal.addEventListener('click', (event) => {
                if (event.target === feedbackModal) {
                    closeFeedbackModal();
                }
            });
            
            // Add focus trap for modal
            feedbackModal.addEventListener('keydown', (event) => {
                if (event.key === 'Tab') {
                    const focusableElements = feedbackModal.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];
                    
                    if (event.shiftKey) {
                        if (document.activeElement === firstElement) {
                            lastElement.focus();
                            event.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            firstElement.focus();
                            event.preventDefault();
                        }
                    }
                }
            });
        }

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', init);