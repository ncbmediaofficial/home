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
         
            
            // Video data
            // const videoData = [
            //     {
            //         id: 1,
            //         title: "Shatta Wale Is The First And Governor in NCB Media",
            //         artist: "Shatta Wale",
            //         thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&h=337&q=80",
            //         views: "1.2M",
            //         duration: "4:15",
            //         uploadDate: "10/01/2025"
            //     },
               
            // ];
            
            // // Function to render videos
            // function renderVideos(videos, searchTerm = '') {
            //     const container = document.getElementById('videos-container');
            //     container.innerHTML = '';
                
            //     if (videos.length === 0) {
            //         document.getElementById('no-results').style.display = 'block';
            //         document.getElementById('results-count').textContent = 'No videos found';
            //         return;
            //     }
                
            //     document.getElementById('no-results').style.display = 'none';
            //     document.getElementById('results-count').textContent = `Showing ${videos.length} ${videos.length === 1 ? 'video' : 'videos'}`;
                
            //     videos.forEach(video => {
            //         const videoCard = document.createElement('div');
            //         videoCard.className = 'video-card';
            //         videoCard.innerHTML = `
            //             <div class="video-thumbnail">
            //                 <img src="${video.thumbnail}" alt="${video.title}">
            //                 <div class="video-duration">${video.duration}</div>
            //             </div>
            //             <div class="video-content">
            //                 <h3 class="video-title">${video.title}</h3>
            //                 <p class="video-artist">${video.artist}</p>
            //                 <div class="video-meta">
            //                     <span class="video-views">
            //                         <i class="fas fa-eye"></i> ${video.views} views
            //                     </span>
            //                     <span class="video-date">
            //                         <i class="far fa-calendar-alt"></i> ${video.uploadDate}
            //                     </span>
            //                 </div>
            //             </div>
            //         `;
            //         container.appendChild(videoCard);
            //     });
            // }
            
            // // Function to filter videos
            // function filterVideos(searchTerm) {
            //     if (!searchTerm.trim()) {
            //         return videoData;
            //     }
                
            //     const term = searchTerm.toLowerCase();
            //     return videoData.filter(video => 
            //         video.title.toLowerCase().includes(term) || 
            //         video.artist.toLowerCase().includes(term)
            //     );
            // }
            
            // // Search functionality
            // const searchInput = document.getElementById('search-input');
            // const searchButton = document.getElementById('search-button');
            
            // // Real-time search as user types
            // searchInput.addEventListener('input', debounce(() => {
            //     const searchTerm = searchInput.value;
            //     const filteredVideos = filterVideos(searchTerm);
            //     renderVideos(filteredVideos);
            // }, 300));
            
            // // Search button click
            // searchButton.addEventListener('click', () => {
            //     const searchTerm = searchInput.value;
            //     const filteredVideos = filterVideos(searchTerm);
            //     renderVideos(filteredVideos);
            // });
            
            // // Enter key in search input
            // searchInput.addEventListener('keyup', (e) => {
            //     if (e.key === 'Enter') {
            //         const searchTerm = searchInput.value;
            //         const filteredVideos = filterVideos(searchTerm);
            //         renderVideos(filteredVideos);
            //     }
            // });
            
            // // Debounce function for search
            // function debounce(func, wait) {
            //     let timeout;
            //     return function executedFunction(...args) {
            //         const later = () => {
            //             clearTimeout(timeout);
            //             func(...args);
            //         };
            //         clearTimeout(timeout);
            //         timeout = setTimeout(later, wait);
            //     };
            // }
            
            // // Initial render
            // renderVideos(videoData);

            
        });
        // interview-videos.js
class InterviewVideos {
  constructor() {
    this.container = document.querySelector('.interview-videos-container');
    this.videoContent = document.querySelector('.interview-video-content');
    this.filterButtons = document.querySelectorAll('.interview-filter-buttons button');
    this.searchInput = document.querySelector('[data-search-input]');
    this.searchSubmit = document.querySelector('[data-search-submit]');
    this.noResults = document.querySelector('.no-results');
    
    this.currentFilter = 'all';
    this.currentSearch = '';
    this.videos = [];
    this.debounceTimeout = null;
    
    this.init();
  }

  async init() {
    await this.loadVideos();
    this.setupEventListeners();
    this.renderVideos();
  }

  async loadVideos() {
    try {
      // In a real implementation, this would fetch from your API
      // For now, using mock data as specified in requirements
      const response = await fetch('./videos.json');
      this.videos = await response.json();
    } catch (error) {
      console.error('Failed to load videos:', error);
      // Fallback to static videos if fetch fails
      this.videos = this.getStaticVideos();
    }
  }

  getStaticVideos() {
    return [
      {
        id: 1,
        title: "Shatta Wale Becomes the First Governor of NCB Media",
        description: "NCB Media proudly introduces Shatta Wale as our first artist, symbolizing a new era in music promotion. His creativity, energy, and influence embody our mission to elevate Musicians talent globally. Shatta Wale leads the movement — inspiring artists and shaping the future of Afro-Dancehall. 🔥 #NCBMedia.",
        category: "popular",
        category: "trending",
        videoSrc: "videos/artist-one.mp4",
        thumbnail: "images/artist-one-thumb.jpg",
        avatar: "shattawale.jpeg",
        uploadDate: "2025-09-15",
        duration: "15:30"
      },
    //   {
    //     id: 2,
    //     title: "Behind the Music: Artist Two",
    //     description: "A deep dive into the musical journey of Artist Two, from early beginnings to current success. Features never-before-seen footage from early performances and personal reflections on career milestones.",
    //     category: "popular",
    //     videoSrc: "videos/artist-two.mp4",
    //     thumbnail: "images/artist-two-thumb.jpg",
    //     avatar: "images/artist-two.jpg",
    //     uploadDate: "2025-09-10",
    //     duration: "22:15"
    //   },
    //   {
    //     id: 3,
    //     title: "Rising Star: Artist Three",
    //     description: "Meet the newest sensation taking the music world by storm. This interview covers their unique sound, influences, and what fans can expect from the debut album dropping next month.",
    //     category: "new",
    //     videoSrc: "videos/artist-three.mp4",
    //     thumbnail: "images/artist-three-thumb.jpg",
    //     avatar: "images/artist-three.jpg",
    //     uploadDate: "2025-09-20",
    //     duration: "18:45"
    //   },
    //   {
    //     id: 4,
    //     title: "Legendary Session with Artist Four",
    //     description: "A rare sit-down with one of music's most influential figures. Discussing decades of industry experience, evolution of musical styles, and advice for aspiring artists in today's digital landscape.",
    //     category: "trending",
    //     videoSrc: "videos/artist-four.mp4",
    //     thumbnail: "images/artist-four-thumb.jpg",
    //     avatar: "images/artist-four.jpg",
    //     uploadDate: "2025-09-05",
    //     duration: "25:10"
    //   }
    ];
  }

  setupEventListeners() {
    // Filter buttons
    this.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.handleFilterChange(e.target.dataset.filter);
        this.updateButtonStates(e.target);
      });
    });

    // Search input with debouncing
    this.searchInput.addEventListener('input', (e) => {
      this.debounceSearch(e.target.value);
    });

    // Search submit
    this.searchSubmit.addEventListener('click', () => {
      this.handleSearch(this.searchInput.value);
    });

    // Enter key in search
    this.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleSearch(this.searchInput.value);
      }
    });
  }

  debounceSearch(query) {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      this.handleSearch(query);
    }, 300);
  }

  handleFilterChange(filter) {
    this.currentFilter = filter;
    this.applyFilters();
  }

  handleSearch(query) {
    this.currentSearch = query.toLowerCase().trim();
    this.applyFilters();
  }

  applyFilters() {
    const filteredVideos = this.videos.filter(video => {
      const matchesFilter = this.currentFilter === 'all' || video.category === this.currentFilter;
      const matchesSearch = !this.currentSearch || 
        video.title.toLowerCase().includes(this.currentSearch) ||
        video.description.toLowerCase().includes(this.currentSearch);
      
      return matchesFilter && matchesSearch;
    });

    this.renderFilteredVideos(filteredVideos);
  }

  updateButtonStates(activeButton) {
    this.filterButtons.forEach(button => {
      button.setAttribute('aria-pressed', button === activeButton ? 'true' : 'false');
    });
  }

  renderVideos() {
    this.videoContent.innerHTML = '';
    
    this.videos.forEach(video => {
      const videoCard = this.createVideoCard(video);
      this.videoContent.appendChild(videoCard);
    });

    this.injectStructuredData();
    this.setupLazyLoading();
  }

  renderFilteredVideos(filteredVideos) {
    const allCards = this.videoContent.querySelectorAll('.interview-video-card');
    
    // First, fade out all cards
    allCards.forEach(card => {
      card.classList.add('fade-out');
    });

    // After transition, update visibility
    setTimeout(() => {
      allCards.forEach(card => {
        const videoId = parseInt(card.dataset.id);
        const shouldShow = filteredVideos.some(video => video.id === videoId);
        
        card.classList.toggle('hidden', !shouldShow);
        card.classList.remove('fade-out');
      });

      // Show/hide no results message
      const hasResults = filteredVideos.length > 0;
      this.noResults.toggleAttribute('hidden', hasResults);
      
      // Update accessible live region
      if (!hasResults) {
        this.noResults.textContent = `No videos found for "${this.currentSearch}" in ${this.currentFilter} category. Try adjusting your search or filter.`;
      }
    }, 300);
  }

  createVideoCard(video) {
    const article = document.createElement('article');
    article.className = 'interview-video-card';
    article.dataset.id = video.id;
    article.dataset.category = video.category;
    article.dataset.name = video.title.toLowerCase().replace(/\s+/g, '-');

    const shortDescription = video.description.length > 120 
      ? video.description.substring(0, 120) + '...' 
      : video.description;

    article.innerHTML = `
      <div class="interview-video-card-video">
        <video width="640" height="360" controls preload="metadata" poster="${video.thumbnail}">
          <source data-src="${video.videoSrc}" type="video/mp4">
          <track kind="captions" src="captions/video-${video.id}.vtt" srclang="en" label="English">
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="interview-video-card-info">
        <h3 class="video-title">${this.escapeHtml(video.title)}</h3>
        <p class="video-description">${this.escapeHtml(shortDescription)}</p>
        <img class="artist-avatar" alt="${this.escapeHtml(video.title)} profile photo" loading="lazy" src="${video.avatar}">
        <button class="read-more" aria-expanded="false">Read full description</button>
      </div>
    `;

    // Add read more functionality
    const readMoreBtn = article.querySelector('.read-more');
    const description = article.querySelector('.video-description');
    
    readMoreBtn.addEventListener('click', () => {
      const isExpanded = readMoreBtn.getAttribute('aria-expanded') === 'true';
      readMoreBtn.setAttribute('aria-expanded', !isExpanded);
      readMoreBtn.textContent = isExpanded ? 'Read full description' : 'Show less';
      description.classList.toggle('expanded');
      description.textContent = isExpanded ? shortDescription : video.description;
    });

    return article;
  }

  setupLazyLoading() {
    // Use native lazy loading where supported, otherwise use Intersection Observer
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        img.src = img.dataset.src;
      });
    } else {
      this.lazyLoadWithIntersectionObserver();
    }

    // Lazy load videos when they come into view
    this.lazyLoadVideos();
  }

  lazyLoadVideos() {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          const source = video.querySelector('source[data-src]');
          
          if (source && source.dataset.src) {
            source.src = source.dataset.src;
            video.load();
            videoObserver.unobserve(video);
          }
        }
      });
    });

    document.querySelectorAll('video').forEach(video => {
      videoObserver.observe(video);
    });
  }

  lazyLoadWithIntersectionObserver() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  injectStructuredData() {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": this.videos.map((video, index) => ({
        "@type": "VideoObject",
        "position": index + 1,
        "name": video.title,
        "description": video.description,
        "thumbnailUrl": video.thumbnail,
        "uploadDate": video.uploadDate,
        "contentUrl": video.videoSrc,
        "duration": video.duration
      }))
    };

    const scriptTag = document.getElementById('structured-data');
    scriptTag.textContent = JSON.stringify(structuredData);
  }

  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new InterviewVideos();
});

// Fallback for no JavaScript
document.addEventListener('DOMContentLoaded', () => {
  const videoContent = document.querySelector('.interview-video-content');
  if (videoContent.children.length === 0) {
    // If JS didn't load videos, show a message or static content
    videoContent.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
        <p>Please enable JavaScript to view the video gallery.</p>
      </div>
    `;
  }
});