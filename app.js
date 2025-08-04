// Professional CV Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initializeCV();
});

function initializeCV() {
    // Initialize all interactive features
    setupScrollAnimations();
    setupHoverEffects();
    setupSkillTagInteractions();
    setupPrintOptimization();
    setupAccessibility();
    addPrintButton(); // Add print button immediately
    
    // Add smooth reveal animation on load
    revealContent();
}

// Scroll-based animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe experience items for individual animations
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
}

// Enhanced hover effects
function setupHoverEffects() {
    // Add dynamic hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    });

    // Add hover effects to experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.job-title').style.color = 'var(--color-primary)';
            this.style.borderLeftWidth = '6px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.job-title').style.color = 'var(--color-text)';
            this.style.borderLeftWidth = '4px';
        });
    });

    // Add subtle hover effects to certification items
    const certItems = document.querySelectorAll('.cert-item');
    certItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderLeftWidth = '4px';
            this.style.borderLeftColor = 'var(--color-primary)';
            this.style.borderLeftStyle = 'solid';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderLeft = '1px solid var(--color-border)';
        });
    });
}

// Interactive skill tag features
function setupSkillTagInteractions() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        // Make skill tags focusable for accessibility
        tag.setAttribute('tabindex', '0');
        tag.setAttribute('role', 'button');
        tag.setAttribute('aria-label', `Skill: ${tag.textContent}`);
        
        // Add click animation
        tag.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 0.6s ease-in-out';
            }, 10);
        });
        
        // Keyboard accessibility
        tag.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Print optimization - CRITICAL FIX for grey overlay
function setupPrintOptimization() {
    // Detect print intent and optimize layout
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('print-mode');
        
        // CRITICAL: Remove any overlay elements that cause grey tints
        const headerOverlay = document.querySelector('.cv-header::before');
        if (headerOverlay) {
            headerOverlay.style.display = 'none';
        }
        
        // Ensure all backgrounds are clean for printing
        const elementsWithBackgrounds = document.querySelectorAll('.summary-section, .experience-item, .cert-item');
        elementsWithBackgrounds.forEach(el => {
            el.style.background = 'white';
        });
        
        // Ensure all animations are complete before printing
        const animatedElements = document.querySelectorAll('.section');
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        
        // Remove any pseudo-element overlays
        const style = document.createElement('style');
        style.id = 'print-overlay-fix';
        style.textContent = `
            @media print {
                .cv-header::before {
                    display: none !important;
                    content: none !important;
                }
                *::before, *::after {
                    background: none !important;
                    backdrop-filter: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('print-mode');
        
        // Remove the temporary print style
        const printStyle = document.getElementById('print-overlay-fix');
        if (printStyle) {
            printStyle.remove();
        }
        
        // Restore original backgrounds
        const elementsWithBackgrounds = document.querySelectorAll('.summary-section, .experience-item, .cert-item');
        elementsWithBackgrounds.forEach(el => {
            el.style.background = '';
        });
    });
}

// Add visible print button functionality - CRITICAL FIX
function addPrintButton() {
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print CV';
    printBtn.className = 'btn btn--primary print-btn';
    printBtn.style.position = 'fixed';
    printBtn.style.top = '20px';
    printBtn.style.right = '20px';
    printBtn.style.zIndex = '1000';
    printBtn.style.boxShadow = 'var(--shadow-lg)';
    printBtn.style.borderRadius = 'var(--radius-base)';
    
    // Print functionality
    printBtn.onclick = function() {
        try {
            window.print();
        } catch (error) {
            console.warn('Print function not available:', error);
            // Fallback: show print instructions
            alert('Please use Ctrl+P (Windows/Linux) or Cmd+P (Mac) to print this CV');
        }
    };
    
    // Add keyboard accessibility
    printBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
    
    // Add hover effects
    printBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = 'var(--shadow-xl)';
    });
    
    printBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow-lg)';
    });
    
    document.body.appendChild(printBtn);
}

// Accessibility enhancements
function setupAccessibility() {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '6px';
    skipLink.style.zIndex = '2000';
    skipLink.style.background = 'var(--color-primary)';
    skipLink.style.color = 'var(--color-surface)';
    skipLink.style.padding = '8px';
    skipLink.style.textDecoration = 'none';
    skipLink.style.borderRadius = '4px';
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content id
    const mainContent = document.querySelector('.cv-main');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
    
    // Improve focus management
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.style.outline = 'var(--focus-outline)';
            this.style.outlineOffset = '2px';
        });
    });
}

// Content reveal animation on page load
function revealContent() {
    const header = document.querySelector('.cv-header');
    const summary = document.querySelector('.summary-section');
    
    // Animate header
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-30px)';
        setTimeout(() => {
            header.style.transition = 'all 0.8s ease-out';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Animate summary with delay
    if (summary) {
        summary.style.opacity = '0';
        summary.style.transform = 'translateY(20px)';
        setTimeout(() => {
            summary.style.transition = 'all 0.6s ease-out';
            summary.style.opacity = '1';
            summary.style.transform = 'translateY(0)';
        }, 400);
    }
}

// Add CSS for pulse animation and print fixes
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .print-mode * {
        animation: none !important;
        transition: none !important;
    }
    
    /* Print button styles */
    .print-btn {
        transition: all var(--duration-normal) var(--ease-standard) !important;
        font-weight: var(--font-weight-medium) !important;
        gap: var(--space-8) !important;
        display: flex !important;
        align-items: center !important;
    }
    
    .print-btn i {
        font-size: var(--font-size-base) !important;
    }
    
    @media print {
        .print-btn {
            display: none !important;
        }
        
        /* CRITICAL PRINT FIXES - Remove grey overlays */
        .cv-header::before {
            display: none !important;
            content: none !important;
            background: none !important;
            backdrop-filter: none !important;
        }
        
        *::before,
        *::after {
            background: none !important;
            backdrop-filter: none !important;
        }
        
        /* Ensure clean white backgrounds */
        body,
        .cv-container,
        .summary-section,
        .experience-item,
        .cert-item {
            background: white !important;
        }
    }
    
    /* Enhanced focus styles */
    .skill-tag:focus,
    .language:focus,
    .print-btn:focus {
        outline: 3px solid var(--color-focus-ring);
        outline-offset: 2px;
        transform: translateY(-2px) scale(1.02);
    }
    
    /* Smooth transitions for all interactive elements */
    .skill-tag,
    .language,
    .experience-item,
    .cert-item,
    .print-btn {
        transition: all var(--duration-normal) var(--ease-standard);
    }
    
    /* Loading states */
    .cv-container.loading {
        opacity: 0.7;
        pointer-events: none;
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
        .skill-tag,
        .language,
        .experience-item,
        .print-btn {
            border-width: 2px;
        }
        
        .section-title::after {
            height: 3px;
        }
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .section {
            opacity: 1;
            transform: none;
        }
        
        .print-btn:hover {
            transform: none !important;
        }
    }
    
    /* Mobile responsiveness for print button */
    @media (max-width: 768px) {
        .print-btn {
            top: 10px !important;
            right: 10px !important;
            padding: var(--space-6) var(--space-12) !important;
            font-size: var(--font-size-sm) !important;
        }
    }
`;

document.head.appendChild(style);

// Error handling and performance monitoring
window.addEventListener('error', function(e) {
    console.warn('CV Script Error:', e.message);
});

// Simple performance logging
const startTime = performance.now();
window.addEventListener('load', function() {
    const loadTime = performance.now() - startTime;
    console.log(`CV loaded in ${Math.round(loadTime)}ms`);
});

// Export functions for potential external use
window.CVApp = {
    revealContent,
    setupScrollAnimations,
    setupHoverEffects,
    addPrintButton
};