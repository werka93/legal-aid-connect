// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeAccordion();
    initializeScrollAnimations();
    initializeCTAButtons();
});

// Accordion Functionality for Question Categories
function initializeAccordion() {
    const categoryTitles = document.querySelectorAll('.category-title');
    
    categoryTitles.forEach(title => {
        title.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const questionList = document.getElementById(category);
            const toggleIcon = this.querySelector('.toggle-icon');
            
            // Toggle active state
            const isActive = this.classList.contains('active');
            
            if (isActive) {
                // Close the accordion
                this.classList.remove('active');
                questionList.classList.remove('active');
                toggleIcon.textContent = '+';
            } else {
                // Close all other accordions first
                categoryTitles.forEach(otherTitle => {
                    if (otherTitle !== this) {
                        const otherCategory = otherTitle.getAttribute('data-category');
                        const otherQuestionList = document.getElementById(otherCategory);
                        const otherToggleIcon = otherTitle.querySelector('.toggle-icon');
                        
                        otherTitle.classList.remove('active');
                        otherQuestionList.classList.remove('active');
                        otherToggleIcon.textContent = '+';
                    }
                });
                
                // Open the clicked accordion
                this.classList.add('active');
                questionList.classList.add('active');
                toggleIcon.textContent = '−';
            }
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.stat-card, .category-card, .cta');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// CTA Button Functionality
function initializeCTAButtons() {
    const primaryBtn = document.querySelector('.btn-primary');
    const secondaryBtn = document.querySelector('.btn-secondary');
    
    if (primaryBtn) {
        primaryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('Find Local Resources', 'This feature would help users locate local legal resources, public defender offices, and community legal aid organizations in their area.');
        });
    }
    
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('Contact Public Defender', 'This feature would provide contact information and guidance on how to request a public defender for your family member.');
        });
    }
}

// Modal Functionality
function showModal(title, content) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('info-modal');
    if (!modal) {
        modal = createModal();
    }
    
    // Update modal content
    const modalTitle = modal.querySelector('.modal-title');
    const modalContent = modal.querySelector('.modal-content');
    
    modalTitle.textContent = title;
    modalContent.textContent = content;
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function createModal() {
    const modal = document.createElement('div');
    modal.id = 'info-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-dialog">
            <div class="modal-header">
                <h3 class="modal-title"></h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p class="modal-content"></p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary modal-ok">OK</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .modal.active {
            opacity: 1;
        }
        
        .modal-dialog {
            background: white;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .modal.active .modal-dialog {
            transform: scale(1);
        }
        
        .modal-header {
            padding: 20px 30px;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #2d3748;
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            color: #a0aec0;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-close:hover {
            color: #4a5568;
        }
        
        .modal-body {
            padding: 30px;
        }
        
        .modal-content {
            font-size: 1rem;
            color: #4a5568;
            line-height: 1.6;
            margin: 0;
        }
        
        .modal-footer {
            padding: 20px 30px;
            border-top: 1px solid #e2e8f0;
            text-align: right;
        }
        
        .modal-ok {
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        .modal-ok:hover {
            background: #5a67d8;
        }
    `;
    
    // Add styles to head if not already added
    if (!document.getElementById('modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Add event listeners
    const closeBtn = modal.querySelector('.modal-close');
    const okBtn = modal.querySelector('.modal-ok');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    [closeBtn, okBtn, backdrop].forEach(element => {
        element.addEventListener('click', closeModal);
    });
    
    document.body.appendChild(modal);
    return modal;
}

function closeModal() {
    const modal = document.getElementById('info-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Keyboard accessibility for modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add loading animation for statistics
function animateStatNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
        const suffix = finalValue.replace(/[\d.]/g, '');
        
        if (!isNaN(numericValue)) {
            let currentValue = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(currentValue) + suffix;
            }, 30);
        }
    });
}

// Trigger stat animation when stats section comes into view
const statsSection = document.querySelector('.statistics');
if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumbers();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}
