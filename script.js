// Global Variables
let matrixCanvas, matrixCtx;
let particles = [];
let isLoading = true;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    initLoadingScreen();
    initMatrixBackground();
    initParticleSystem();
    initNavigation();
    initScrollAnimations();
    initTypewriterEffects();
    initProjectCards();
    initProjectFilters();
    initSkillDomains();
    
    // Remove loading screen after animations
    setTimeout(() => {
        hideLoadingScreen();
    }, 4000);
}

// Loading Screen
function initLoadingScreen() {
    const commands = [
        'sudo systemctl start portfolio',
        'Loading kernel modules...',
        'Initializing user interface...',
        'Mounting project directories...',
        'Portfolio system online!'
    ];
    
    let currentCommand = 0;
    const commandElement = document.getElementById('loading-command');
    
    function typeCommand() {
        if (currentCommand < commands.length) {
            const command = commands[currentCommand];
            let charIndex = 0;
            
            function typeChar() {
                if (charIndex < command.length) {
                    commandElement.textContent = command.substring(0, charIndex + 1);
                    charIndex++;
                    setTimeout(typeChar, 50);
                } else {
                    setTimeout(() => {
                        currentCommand++;
                        if (currentCommand < commands.length) {
                            commandElement.textContent = '';
                            typeCommand();
                        }
                    }, 800);
                }
            }
            
            typeChar();
        }
    }
    
    typeCommand();
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('hidden');
    isLoading = false;
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        startHeroAnimations();
    }, 500);
}

// Matrix Background
function initMatrixBackground() {
    matrixCanvas = document.getElementById('matrix-canvas');
    matrixCtx = matrixCanvas.getContext('2d');
    
    resizeMatrixCanvas();
    window.addEventListener('resize', resizeMatrixCanvas);
    
    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function drawMatrix() {
        matrixCtx.fillStyle = 'rgba(10, 10, 10, 0.04)';
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        matrixCtx.fillStyle = '#00ff41';
        matrixCtx.font = fontSize + 'px JetBrains Mono';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 35);
}

function resizeMatrixCanvas() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
}

// Particle System
function initParticleSystem() {
    const particlesContainer = document.getElementById('particles-container');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + 10;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 3 + 2;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = duration + 's';
        
        // Random color
        const colors = ['#00ffff', '#ff00ff', '#8a2be2', '#00ff41'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 300);
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        updateActiveNavLink();
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add animation classes to elements
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach((card, index) => {
            const animations = ['fade-in', 'slide-in-left', 'slide-in-right', 'scale-in', 'rotate-in'];
            const randomAnimation = animations[index % animations.length];
            card.classList.add(randomAnimation, 'visible'); // Add visible class immediately
            card.style.animationDelay = (index * 0.1) + 's';
        });
        
        // Ensure skills section is visible
        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            skillsSection.classList.add('visible');
        }
        
        document.querySelectorAll('.skill-domain').forEach((domain, index) => {
            domain.classList.add('slide-in-left', 'visible');
            domain.style.animationDelay = (index * 0.15) + 's';
        });
    }, 1000);
}

// Typewriter Effects
function initTypewriterEffects() {
    // This will be triggered after loading screen
}

function startHeroAnimations() {
    const heroName = document.querySelector('#hero-name .name-text');
    const heroTagline = document.getElementById('hero-tagline');
    const heroSkills = document.getElementById('hero-skills');
    
    // Typewriter effect for name
    typeWriter(heroName, 'ANUJ', 100, () => {
        // Typewriter effect for tagline
        typeWriter(heroTagline, 'Full Stack / AI-ML Developer', 50, () => {
            // Typewriter effect for skills
            typeWriter(heroSkills, 'Web • Mobile • AI/ML', 30);
        });
    });
}

function typeWriter(element, text, speed, callback) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            setTimeout(callback, 500);
        }
    }
    
    type();
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Simulate sending
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Message Sent!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #00ff41, #00ffff)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 2000);
        }, 2000);
    });
    
    // Input focus effects
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentNode.classList.remove('focused');
            }
        });
    });
}

// Project Cards
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Removed hover expansion effects
        
        // Keep only basic link hover effects (optional - you can remove this too if you want)
        const links = card.querySelectorAll('.project-link');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-2px)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = '';
            });
        });
    });
}

// Project Filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Initially show all projects
    setTimeout(() => {
        projectCards.forEach((card, index) => {
            card.classList.remove('hidden');
            card.classList.add('visible');
            card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
        });
    }, 1500); // Wait for initial animations to complete
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.classList.add('visible');
                    card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
                } else {
                    card.style.animation = 'fadeOutDown 0.3s ease-out both';
                    setTimeout(() => {
                        card.classList.add('hidden');
                        card.classList.remove('visible');
                    }, 300);
                }
            });
            
            // Update project count
            setTimeout(() => {
                const visibleProjects = document.querySelectorAll('.project-card:not(.hidden)').length;
                console.log(`Showing ${visibleProjects} projects in ${filter} category`);
            }, 500);
        });
    });
}

// Add fade animations for project filtering
const filterAnimationStyle = document.createElement('style');
filterAnimationStyle.textContent = `
    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOutDown {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-30px);
        }
    }
`;
document.head.appendChild(filterAnimationStyle);

// Skill Domains
function initSkillDomains() {
    const skillDomains = document.querySelectorAll('.skill-domain');
    
    skillDomains.forEach(domain => {
        domain.addEventListener('mouseenter', () => {
            const skills = domain.querySelectorAll('.skill-tag');
            skills.forEach((skill, index) => {
                setTimeout(() => {
                    skill.style.transform = 'scale(1.1)';
                    skill.style.background = 'rgba(0, 255, 255, 0.3)';
                }, index * 50);
            });
        });
        
        domain.addEventListener('mouseleave', () => {
            const skills = domain.querySelectorAll('.skill-tag');
            skills.forEach(skill => {
                skill.style.transform = '';
                skill.style.background = '';
            });
        });
    });
}

// Terminal Command Simulation
function simulateTerminalCommand(element, commands, callback) {
    let commandIndex = 0;
    
    function executeCommand() {
        if (commandIndex < commands.length) {
            const command = commands[commandIndex];
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.innerHTML = `<span class="prompt">anuj@portfolio:~$</span> <span class="command">${command}</span>`;
            
            element.appendChild(line);
            commandIndex++;
            
            setTimeout(executeCommand, 1000);
        } else if (callback) {
            callback();
        }
    }
    
    executeCommand();
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--neon-cyan), var(--neon-magenta));
        border: none;
        border-radius: 50%;
        color: var(--primary-bg);
        font-size: 18px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 255, 255, 0.3);
    `;
    
    scrollBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
}

// Initialize scroll to top button
setTimeout(addScrollToTopButton, 2000);

// Cursor Trail Effect
function initCursorTrail() {
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--neon-cyan);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    document.addEventListener('mousemove', (e) => {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }, index * 10);
        });
    });
}

// Initialize cursor trail
setTimeout(initCursorTrail, 3000);

// Konami Code Easter Egg
function initKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    // Create matrix rain effect
    const body = document.body;
    body.style.animation = 'matrix-rain 5s ease-in-out';
    
    // Show terminal message
    const easterEgg = document.createElement('div');
    easterEgg.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--terminal-bg);
            border: 2px solid var(--neon-cyan);
            border-radius: 10px;
            padding: 20px;
            z-index: 10000;
            font-family: var(--font-mono);
            color: var(--neon-cyan);
            text-align: center;
            box-shadow: 0 0 50px var(--neon-cyan);
        ">
            <h3>🎉 Easter Egg Activated! 🎉</h3>
            <p>You found the secret Linux command!</p>
            <p style="color: var(--neon-green);">sudo apt install awesome-skills</p>
        </div>
    `;
    
    document.body.appendChild(easterEgg);
    
    setTimeout(() => {
        document.body.removeChild(easterEgg);
        body.style.animation = '';
    }, 3000);
}

// Initialize Konami code
initKonamiCode();

// Performance Optimization
function optimizePerformance() {
    // Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        updateActiveNavLink();
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
    
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize performance optimizations
optimizePerformance();

// Terminal Commands Simulation
const terminalCommands = {
    help: () => 'Available commands: about, skills, projects, contact, clear, whoami, sudo, ls, pwd, uname',
    whoami: () => 'anuj - Fullstack Web/App · AI/ML Engineer',
    about: () => 'Passionate developer who loves Linux, open source, and building amazing things.',
    skills: () => 'Web Development, Mobile Apps, AI/ML & Data Science, DevOps & Linux, Programming Languages, Databases & Storage, Security & Monitoring, Tools & Technologies',
    projects: () => 'Check out my 18+ projects including Linux tools, AI/ML systems, and cloud infrastructure!',
    contact: () => 'Ready to collaborate? Send me a message using the contact form!',
    clear: () => '',
    sudo: () => 'Permission granted. Welcome to the matrix! 🚀',
    ls: () => 'home/ about/ projects/ contact/ skills/ resume.pdf',
    pwd: () => '/home/anuj/portfolio',
    uname: () => 'Linux portfolio 5.15.0-anuj #1 SMP Ubuntu x86_64 GNU/Linux',
    cat: () => 'Usage: cat [file]. Try: cat about.txt or cat skills.txt',
    'cat about.txt': () => 'Linux developer passionate about open source, system administration, and building scalable applications.',
    'cat skills.txt': () => 'JavaScript, TypeScript, Python, Go, Rust, React, Vue.js, Node.js, Docker, Kubernetes, AWS, Linux Admin, TensorFlow, PyTorch, PostgreSQL, MongoDB, Security Auditing, and 50+ more technologies!',
    ps: () => 'PID TTY TIME CMD\n1234 pts/0 00:00:01 portfolio\n5678 pts/0 00:00:00 awesome_projects',
    top: () => 'Tasks: 42 total, 1 running, 41 sleeping\nCPU: 15.2%us, 8.1%sy, 0.0%ni, 76.7%id\nMem: 8192MB total, 4096MB used',
    df: () => 'Filesystem Size Used Avail Use% Mounted on\n/dev/sda1 100G 42G 58G 42% /\n/dev/sda2 500G 200G 300G 40% /home'
};

// Add terminal functionality to hero section
function addTerminalInteractivity() {
    const heroTerminal = document.querySelector('.hero-terminal .terminal-body');
    const activeLine = heroTerminal.querySelector('.terminal-line.active');
    
    if (activeLine) {
        const input = document.createElement('input');
        input.type = 'text';
        input.style.cssText = `
            background: transparent;
            border: none;
            color: var(--text-primary);
            font-family: var(--font-mono);
            font-size: 14px;
            outline: none;
            width: 200px;
            margin-left: 8px;
        `;
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = input.value.trim().toLowerCase();
                const output = terminalCommands[command] || `Command not found: ${command}. Type 'help' for available commands.`;
                
                // Add command line
                const commandLine = document.createElement('div');
                commandLine.className = 'terminal-line';
                commandLine.innerHTML = `<span class="prompt">anuj@portfolio:~$</span> <span class="command">${input.value}</span>`;
                
                // Add output
                const outputLine = document.createElement('div');
                outputLine.className = 'output';
                outputLine.textContent = output;
                outputLine.style.color = 'var(--text-secondary)';
                outputLine.style.marginBottom = '8px';
                
                // Insert before active line
                heroTerminal.insertBefore(commandLine, activeLine);
                if (output) {
                    heroTerminal.insertBefore(outputLine, activeLine);
                }
                
                input.value = '';
                
                // Scroll to bottom
                heroTerminal.scrollTop = heroTerminal.scrollHeight;
            }
        });
        
        activeLine.appendChild(input);
        
        // Focus on click
        heroTerminal.addEventListener('click', () => {
            input.focus();
        });
    }
}

// Initialize terminal interactivity after loading
setTimeout(addTerminalInteractivity, 5000);

// Add CSS animations for matrix rain
const style = document.createElement('style');
style.textContent = `
    @keyframes matrix-rain {
        0% { filter: hue-rotate(0deg) brightness(1); }
        25% { filter: hue-rotate(90deg) brightness(1.5); }
        50% { filter: hue-rotate(180deg) brightness(2); }
        75% { filter: hue-rotate(270deg) brightness(1.5); }
        100% { filter: hue-rotate(360deg) brightness(1); }
    }
    
    .cursor-trail {
        box-shadow: 0 0 10px currentColor;
    }
    
    .scroll-to-top:hover {
        transform: translateY(-3px) scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 255, 255, 0.5);
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log(`
%c
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║    Welcome to Anuj's Portfolio Terminal!                    ║
║                                                              ║
║    Available commands:                                       ║
║    • help     - Show available commands                      ║
║    • whoami   - Display user information                     ║
║    • about    - Learn more about me                          ║
║    • skills   - View my technical skills                     ║
║    • projects - Explore my projects                          ║
║    • contact  - Get in touch                                 ║
║                                                              ║
║    Try the Konami code for a surprise! ↑↑↓↓←→←→BA           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`, 'color: #00ffff; font-family: monospace; font-size: 12px;');

// Export functions for global access
window.portfolioApp = {
    scrollToTop,
    simulateTerminalCommand,
    terminalCommands
};