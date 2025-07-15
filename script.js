// Typewriter Effect for Title (Optional)
const titleElement = document.querySelector('.hero-title');
const originalTitle = titleElement.textContent;
const name = "Reginald Alexis"; // Replace with your name

if (titleElement) {
    let i = 0;
    const speed = 100; // typing speed in ms
    
    function typeWriter() {
        if (i < name.length) {
            titleElement.innerHTML = `Hi, I'm <span class="highlight">${name.substring(0, i+1)}</span>|`;
            i++;
            setTimeout(typeWriter, speed);
        } else {
            titleElement.innerHTML = `Hi, I'm <span class="highlight">${name}</span>`;
        }
    }
    
    // Start the animation after a slight delay
    setTimeout(() => {
        titleElement.innerHTML = 'Hi, I\'m <span class="highlight">|</span>';
        typeWriter();
    }, 500);
}

// Dark Mode Toggle (Optional)
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
document.body.prepend(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
});

// Check for saved preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Project Filtering System (Optional)
document.addEventListener('DOMContentLoaded', function() {
    // This would be expanded with real filtering logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter projects would go here
        });
    });
    
    // Project Modal (Optional)
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                // Open modal with project details
                console.log('Open modal for: ', this.querySelector('.project-title').textContent);
            }
        });
    });
});
// Animate skill bars on scroll
document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.querySelector('.skills-section');
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 1.5s ease-out';
            }, 100);
        });
    }
    
    // Intersection Observer for scroll animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Skill filter buttons (optional)
    const filterButtons = document.querySelectorAll('.skill-filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter skills by category
            const filterValue = this.getAttribute('data-filter');
            document.querySelectorAll('.skill-category').forEach(category => {
                if (filterValue === 'all' || category.getAttribute('data-category') === filterValue) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });
});
// Animated counter for stats (optional)
document.addEventListener('DOMContentLoaded', function() {
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Start animation when section is in view
    const aboutSection = document.querySelector('.about-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (aboutSection) {
        observer.observe(aboutSection);
    }
});
// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                formMessage.textContent = 'Please fill in all required fields.';
                formMessage.className = 'error';
                return;
            }
            
            // Here you would typically send the form data to a server            
            fetch('https://formspree.io/f/mbloypdn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                formMessage.textContent = 'Thank you! Your message has been sent.';
                formMessage.className = 'success';
                contactForm.reset();
            })
            .catch(error => {
                formMessage.textContent = 'There was an error sending your message. Please try again later.';
                formMessage.className = 'error';
            });
            // */
        });
    }
    
    // Smooth scroll for contact links
    document.querySelectorAll('a[href^="#contact"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

console.log