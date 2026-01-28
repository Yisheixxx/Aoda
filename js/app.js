// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    if (menu) {
        menu.classList.toggle('hidden');
        icon.textContent = menu.classList.contains('hidden') ? 'menu' : 'close';
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    if (menu) {
        menu.classList.add('hidden');
        icon.textContent = 'menu';
    }
}

// Update active nav link based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('text-primary', 'border-b-2', 'border-primary', 'pb-1');
            link.classList.remove('text-slate-600', 'dark:text-slate-300');
        } else {
            link.classList.remove('text-primary', 'border-b-2', 'border-primary', 'pb-1');
            link.classList.add('text-slate-600', 'dark:text-slate-300');
        }
    });
});

// Form submission handler for Resend
async function submitToResend(event, formName) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerText : 'Submit';
    
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
    }

    const formData = new FormData(form);
    let htmlContent = `<h2>New ${formName} Submission</h2><ul>`;
    
    for (const [key, value] of formData.entries()) {
        const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        htmlContent += `<li><strong>${label}:</strong> ${value}</li>`;
    }
    htmlContent += '</ul>';

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer re_KvV4EfCW_NiGVWknxFjFutdWouLQb22zh',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'onboarding@resend.dev',
                to: 'help@odehorg.org',
                subject: `New Submission: ${formName}`,
                html: htmlContent
            })
        });

        if (response.ok) {
            alert('Thank you! Your message has been sent successfully.');
            form.reset();
            form.dispatchEvent(new Event('input')); // Trigger any validation listeners to reset state
        } else {
            const data = await response.json();
            console.error('Submission Error:', data);
            alert('There was an error sending your message. Please try again.');
        }
    } catch (error) {
        console.error('Network Error:', error);
        alert('Unable to connect to the server. Please check your internet connection.');
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
            form.dispatchEvent(new Event('input')); // Re-trigger validation to ensure button state is correct
        }
    }
}
