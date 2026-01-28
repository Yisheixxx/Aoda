// Cardknox iFields Integration
// iFields provides embedded iframes for secure payment processing

let selectedAmount = 18; // Default amount

// Cardknox API Key - Replace with your actual API key
const CARDKNOX_API_KEY = 'ifields_gizberodeh0fd7b6e39918408d8002e8072d6';
let ifieldsLoadRetries = 0;

// Set donation amount
function setAmount(amount) {
    selectedAmount = amount;
    const amountInput = document.getElementById('donation-amount');
    if (amountInput) {
        amountInput.value = amount;
    }
    
    // Update button styles
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('border-primary', 'text-primary', 'bg-primary/10');
        btn.classList.add('border-slate-200', 'dark:border-slate-700');
        if (btn.textContent.trim() === '$' + amount) {
            btn.classList.add('border-primary', 'text-primary', 'bg-primary/10');
            btn.classList.remove('border-slate-200', 'dark:border-slate-700');
        }
    });
    
    // Validate form
    validateDonationForm();
}

// Initialize Cardknox iFields
function initCardknoxiFields() {
    // console.log('initCardknoxiFields', iFields);
    if (typeof iFields === 'undefined') {
        ifieldsLoadRetries++;
        if (ifieldsLoadRetries > 20) {
            console.error('iFields failed to load');
            showMessage('Payment system failed to load. Please refresh the page.', 'error');
            return;
        }
        console.log('iFields is undefined');
        showMessage('Payment system is loading. Please wait...', 'info');
        setTimeout(initCardknoxiFields, 500);
        return;
    }

    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#ffffff' : '#0f172a';
    const fieldStyle = {
        'font-family': 'Inter, sans-serif',
        'font-size': '16px',
        'color': textColor,
        'padding': '12px'
    };

    // Initialize iFields with your API key
    try {
        iFields.init({
            apiKey: CARDKNOX_API_KEY,
            fields: {
                cardNumber: {
                    id: 'card-number',
                    placeholder: 'Card Number',
                    style: fieldStyle
                },
                cvv: {
                    id: 'cvv',
                    placeholder: 'CVV',
                    style: fieldStyle
                }
            },
            callbacks: {
                onReady: function() {
                    console.log('Cardknox iFields ready');
                    const messageDiv = document.getElementById('payment-message');
                    if (messageDiv) messageDiv.classList.add('hidden');
                    validateDonationForm();
                },
                onError: function(error) {
                    console.error('Cardknox iFields error:', error);
                    showMessage('Payment form error. Please refresh the page or contact us at 845-666-6334', 'error');
                },
                onTokenize: function(response) {
                    // This is called when tokens are generated
                    console.log('Tokens generated:', response);
                    validateDonationForm();
                }
            }
        });
    } catch (error) {
        console.error('Failed to initialize Cardknox iFields:', error);
        showMessage('Failed to initialize payment form. Please contact us at 845-666-6334', 'error');
    }
}

// Validate donation form
function validateDonationForm() {
    const form = document.getElementById('payment-form');
    const submitBtn = document.getElementById('submit-donation-btn');
    if (!form || !submitBtn) return;

    const amountInput = document.getElementById('donation-amount');
    const nameInput = document.getElementById('cardholder-name');
    const monthInput = document.getElementById('exp-month');
    const yearInput = document.getElementById('exp-year');
    
    // Check amount
    const amount = parseFloat(amountInput?.value) || 0;
    const isAmountValid = amount >= 1;
    
    // Check name
    const isNameValid = nameInput?.value.trim().length >= 2;
    
    // Check expiration
    const month = parseInt(monthInput?.value) || 0;
    const year = parseInt(yearInput?.value) || 0;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const isExpValid = month >= 1 && month <= 12 && 
                       year >= currentYear && 
                       (year > currentYear || (year === currentYear && month >= currentMonth));
    
    // Check if iFields tokens are available (card number and CVV)
    const cardToken = document.querySelector('input[data-ifields-id="card-number-token"]')?.value;
    const cvvToken = document.querySelector('input[data-ifields-id="cvv-token"]')?.value;
    const areTokensValid = cardToken && cvvToken && cardToken.length > 0 && cvvToken.length > 0;
    
    // Overall validation
    const isFormValid = isAmountValid && isNameValid && isExpValid && areTokensValid;
    
    if (isFormValid) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

// Handle form submission
function handleDonationSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('payment-form');
    const submitBtn = document.getElementById('submit-donation-btn');
    const amountInput = document.getElementById('donation-amount');
    
    if (!form || !submitBtn || !amountInput) return;
    
    // Disable submit button during processing
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';
    
    const amount = parseFloat(amountInput.value) || 0;
    
    // Get form data
    const formData = {
        xName: document.getElementById('cardholder-name').value,
        xCardNum: document.querySelector('input[data-ifields-id="card-number-token"]').value,
        xCVV: document.querySelector('input[data-ifields-id="cvv-token"]').value,
        xMonth: document.getElementById('exp-month').value,
        xYear: document.getElementById('exp-year').value,
        xAmount: amount.toFixed(2)
    };
    
    // TODO: Send this data to your backend server
    // Your server should then call Cardknox API with your Transaction Key
    // NEVER send the Transaction Key from the client side
    
    // Example: Send to your backend endpoint
    // fetch('/api/process-donation', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.success) {
    //         showMessage('Thank you for your donation! Your payment has been processed successfully.', 'success');
    //         form.reset();
    //         setAmount(18);
    //     } else {
    //         showMessage(data.message || 'Payment processing failed. Please try again.', 'error');
    //     }
    // })
    // .catch(error => {
    //     console.error('Payment error:', error);
    //     showMessage('Payment processing failed. Please contact us at 845-666-6334', 'error');
    // })
    // .finally(() => {
    //     submitBtn.disabled = false;
    //     submitBtn.textContent = 'Process Donation';
    // });
    
    // Temporary: Show message that backend integration is needed
    showMessage('Thank you for your donation! Payment processing requires backend integration. Please contact us at 845-666-6334 to complete your donation.', 'info');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Process Donation';
}

// Show message to user
function showMessage(message, type = 'info') {
    const messageDiv = document.getElementById('payment-message');
    if (!messageDiv) return;

    messageDiv.className = `p-4 rounded-xl text-sm ${type === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800' : type === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'}`;
    messageDiv.textContent = message;
    messageDiv.classList.remove('hidden');
    console.log(message, type);
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.classList.add('hidden');
        }, 5000);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize iFields
    initCardknoxiFields();
    
    // Set up form validation listeners
    const form = document.getElementById('payment-form');
    if (form) {
        form.addEventListener('submit', handleDonationSubmit);
        
        // Validate on input changes
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', validateDonationForm);
            input.addEventListener('blur', validateDonationForm);
        });
        
        // Listen for iFields token updates
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
                    validateDonationForm();
                }
            });
        });
        
        const tokenInputs = form.querySelectorAll('input[data-ifields-id]');
        tokenInputs.forEach(input => {
            observer.observe(input, { attributes: true });
        });
        
        // Also validate when amount changes
        const amountInput = document.getElementById('donation-amount');
        if (amountInput) {
            amountInput.addEventListener('input', function() {
                selectedAmount = parseFloat(this.value) || 0;
                validateDonationForm();
            });
        }
    }
    
    // Initial validation
    setTimeout(validateDonationForm, 1000);
});

// Note: Cardknox iFields requires:
// 1. API Key (public, can be in client code) - ✅ You have this
// 2. Transaction Key (private, MUST be on your server)
// 3. Backend endpoint to process payments securely
// 
// Next Steps:
// 1. Get your Transaction Key from Cardknox Merchant Portal: https://portal.cardknox.com/
// 2. Set up a backend endpoint (PHP, Node.js, etc.) to process payments
// 3. Your backend should use the Transaction Key to call Cardknox API
// 4. Never expose your Transaction Key in client-side code
