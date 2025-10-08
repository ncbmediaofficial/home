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
        description: "NCB Media proudly introduces Shatta Wale as our first Governor and featured artist, symbolizing a new era in music promotion. His creativity, energy, and influence embody our mission to elevate African talent globally. Shatta Wale leads the movement — inspiring artists and shaping the future of Afro-Dancehall. 🔥 #NCBMedia.",
        category: "trending",
        videoSrc: "videos/artist-one.mp4",
        thumbnail: "images/artist-one-thumb.jpg",
        avatar: "images/artist-one.jpg",
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