// Cart functionality
let cartCount = 3;
let cartTotal = 89.98;

function addToCart(button) {
    // Show loading state
    button.innerHTML = 'Adding...';
    button.classList.add('btn-loading');

    // Simulate API call
    setTimeout(() => {
        // Update cart count
        cartCount++;
        document.querySelector('.cart-count').textContent = cartCount;

        // Show notification
        const notification = document.getElementById('notification');
        notification.classList.add('show');

        // Reset button after a delay
        setTimeout(() => {
            button.innerHTML = 'Add to Cart';
            button.classList.remove('btn-loading');

            // Hide notification after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }, 1000);
    }, 1500);
}

function updateQuantity(button, change) {
    const quantityInput = button.parentElement.querySelector('.quantity-input');
    let quantity = parseInt(quantityInput.value);

    quantity += change;

    if (quantity < 1) quantity = 1;

    quantityInput.value = quantity;

    // In a real app, we would recalculate the total here
    // For this demo, we'll just simulate it
    document.querySelector('.cart-total').textContent = `Total: $${(cartTotal + (change * 29.99)).toFixed(2)}`;
}

function checkout() {
    document.getElementById('checkoutForm').scrollIntoView({
        behavior: 'smooth'
    });
}

// Form validation and submission
document.getElementById('checkoutForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.innerHTML = 'Processing...';
    submitButton.classList.add('btn-loading');

    // Simulate form submission
    setTimeout(() => {
        // Show success message
        const notification = document.getElementById('notification');
        notification.innerHTML = '<i class="fas fa-check-circle"></i> Order placed successfully!';
        notification.style.background = '#28a745';
        notification.classList.add('show');

        // Reset form
        this.reset();

        submitButton.innerHTML = 'Complete Purchase';
        submitButton.classList.remove('btn-loading');

        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            notification.innerHTML = '<i class="fas fa-check-circle"></i> Item added to cart successfully!';
            notification.style.background = '';
        }, 3000);
    }, 2000);
});

// Input validation with visual feedback
const inputs = document.querySelectorAll('.form-control');
inputs.forEach(input => {
    input.addEventListener('blur', function () {
        if (this.value.trim() !== '') {
            this.style.borderColor = '#28a745';
        } else {
            this.style.borderColor = '';
        }
    });

    // Simulate real-time validation
    input.addEventListener('input', function () {
        if (this.type === 'text' || this.type === 'email') {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#3a86ff';
            } else {
                this.style.borderColor = '';
            }
        }

        // Credit card formatting
        if (this.id === 'cardNumber') {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
            }
            this.value = value;
        }

        // Expiration date formatting
        if (this.id === 'expDate') {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 2) {
                    this.value = value;
                } else {
                    this.value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
            }
        }
    });
});
