 // Transcript data
        const transcripts = {
            transcript1: {
                title: "Understanding Your Credit Score",
                content: "<h3>Understanding Your Credit Score - Full Transcript</h3><p>Hello, I'm Sarah Johnson, a financial advisor with over 10 years of experience. Today we'll explore the fundamentals of credit scores.</p><p>A credit score is a three-digit number that represents your creditworthiness. Lenders use this number to evaluate how likely you are to repay borrowed money.</p><p>The most common scoring model is the FICO score, which ranges from 300 to 850. Higher scores indicate lower risk to lenders.</p><p>Your credit score is calculated based on several factors: payment history (35%), amounts owed (30%), length of credit history (15%), new credit (10%), and credit mix (10%).</p><p>To improve your credit score, focus on making payments on time, keeping credit card balances low, and avoiding unnecessary credit inquiries.</p><p>Regularly monitoring your credit report can help you spot errors and track your progress. You're entitled to a free credit report from each of the three major bureaus annually.</p>"
            },
            transcript2: {
                title: "Budgeting for Beginners",
                content: "<h3>Budgeting for Beginners - Full Transcript</h3><p>Hi, I'm Michael Chen. In this video, we'll walk through creating a budget that actually works for your life.</p><p>A budget is simply a plan for your money. It helps you ensure you have enough for what you need while working toward your financial goals.</p><p>Start by tracking your income and expenses for one month. Categorize your spending to see where your money is going.</p><p>The 50/30/20 rule is a popular budgeting framework: 50% for needs, 30% for wants, and 20% for savings and debt repayment.</p><p>Remember that a budget should be flexible. Life changes, and your budget should adapt with it.</p><p>Consider using budgeting apps or tools to automate tracking and stay motivated with your financial goals.</p>"
            },
            transcript3: {
                title: "Investing Basics",
                content: "<h3>Investing Basics - Full Transcript</h3><p>Welcome, I'm Jessica Williams. Today we'll cover the fundamentals of investing for your future.</p><p>Investing is putting your money to work to generate more money over time. The key principle is compound interest, which Albert Einstein called the eighth wonder of the world.</p><p>Before investing, ensure you have an emergency fund covering 3-6 months of expenses and have paid down high-interest debt.</p><p>Common investment options include stocks, bonds, mutual funds, and ETFs. Each carries different levels of risk and potential return.</p><p>Diversification is crucial - don't put all your eggs in one basket. A diversified portfolio can help manage risk.</p><p>Consider your time horizon and risk tolerance when choosing investments. Younger investors can typically afford to take more risk.</p>"
            },
            transcript4: {
                title: "Home Buying Guide",
                content: "<h3>Home Buying Guide - Full Transcript</h3><p>Hello, I'm David Rodriguez. Buying a home is one of the most significant financial decisions you'll make. Let's break down the process.</p><p>Start by checking your credit score and getting pre-approved for a mortgage. This shows sellers you're a serious buyer.</p><p>Determine your budget, including not just the purchase price but also closing costs, property taxes, insurance, and maintenance.</p><p>Work with a real estate agent who understands your needs and the local market. They can help you find properties that match your criteria.</p><p>Once you find a home, make an offer. If accepted, you'll enter into a contract and proceed with inspections and the mortgage application.</p><p>At closing, you'll sign numerous documents, pay closing costs, and receive the keys to your new home. Congratulations!</p>"
            }
        };


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

            const modal = document.getElementById('transcriptModal');
            const transcriptContent = document.getElementById('transcriptContent');
            const closeBtn = document.querySelector('.modal-close');
            const transcriptLinks = document.querySelectorAll('.transcript-link');
            
            // Open modal when transcript link is clicked
            transcriptLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const transcriptId = this.getAttribute('data-transcript');
                    
                    if (transcripts[transcriptId]) {
                        transcriptContent.innerHTML = transcripts[transcriptId].content;
                        modal.style.display = 'flex';
                    }
                });
            });
            
            // Close modal when close button is clicked
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
            
            // Close modal when clicking outside content
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
            
            // Close modal with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.style.display === 'flex') {
                    modal.style.display = 'none';
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