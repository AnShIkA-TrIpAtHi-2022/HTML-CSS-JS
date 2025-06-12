// Utility to show error message below input
function showError(input, message) {
    let errorElem = input.nextElementSibling;
    
    if (!errorElem || !errorElem.classList.contains('error-message')) {
        errorElem = document.createElement('div');
        errorElem.className = 'error-message';
        input.parentNode.insertBefore(errorElem, input.nextSibling);
    }

    errorElem.textContent = message;
    errorElem.style.display = 'block';
}

// Utility to clear the error message
function clearError(input) {
    const errorElem = input.nextElementSibling;
    if (errorElem && errorElem.classList.contains('error-message')) {
        errorElem.textContent = '';
        errorElem.style.display = 'none';
    }
}

// Validate destination field
function validateDestination() {
    const destinationInput = document.getElementById('destination');
    const value = destinationInput.value.trim();
    const pattern = /^[A-Za-z'’\- ]{2,50}$/;

    if (!value) {
        showError(destinationInput, 'Destination required');
        return false;
    }
    else if (!pattern.test(value)) {
        showError(destinationInput, 'Invalid destination format');
        return false;
    }

    clearError(destinationInput);
    return true;
}

// Validate start and end date fields
function validateDates() {
    const startInput = document.getElementById('startDate');
    const endInput = document.getElementById('endDate');
    const startDate = startInput.value;
    const endDate = endInput.value;

    let valid = true;

    if (!startDate) {
        showError(startInput, 'Start date required');
        valid = false;
    } else {
        clearError(startInput);
    }

    if (!endDate) {
        showError(endInput, 'End date required');
        valid = false;
    } else if (startDate && endDate && startDate >= endDate) {
        showError(endInput, 'End date must be after start date');
        valid = false;
    } else {
        clearError(endInput);
    }

    return valid;
}

// form validation
function validateForm() {
    const destinationValid = validateDestination();
    const datesValid = validateDates();
    return destinationValid && datesValid;
}

// Initialize form logic after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tripForm');
    const destinationInput = document.getElementById('destination');
    const startInput = document.getElementById('startDate');
    const endInput = document.getElementById('endDate');
    const submitButton = document.getElementById('submitButton');

    // Disable submit initially
    submitButton.disabled = true;

    // Check form validity and toggle submit button
    function updateFormState() {
        submitButton.disabled = !validateForm();
    }

    // Hook up input listeners
    destinationInput.addEventListener('input', updateFormState);
    startInput.addEventListener('input', updateFormState);
    endInput.addEventListener('input', updateFormState);

    // Prevent form submission if validation fails
    form.addEventListener('submit', (e) => {
        if (!validateForm()) {
            e.preventDefault();
        } else {
            e.preventDefault();
            const destination = destinationInput.value.trim();
            const startDate = startInput.value;
            const endDate = endInput.value;
            const preferences = document.getElementById('preferences').value;

            const tripSummary = document.getElementById('trip-summary');
            tripSummary.innerHTML = `
                <h2>Trip Summary</h2>
                <p><strong>Destination:</strong> ${destination}</p>
                <p><strong>Start Date:</strong> ${startDate}</p>
                <p><strong>End Date:</strong> ${endDate}</p>
                <p><strong>Preferences:</strong> ${preferences.charAt(0).toUpperCase() + preferences.slice(1)}</p>
            `;
        }
    });

    // Character counter for comments
    const commentInput = document.getElementById('comment');
    const charCounter = document.getElementById('charCount');

    if (commentInput && charCounter) {
        const updateCharCount = () => {
            charCounter.textContent = ` (${commentInput.value.length} characters)`;
        };
        commentInput.addEventListener('input', updateCharCount);
        updateCharCount(); // Initial count on load
    }

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;
    startInput.setAttribute('min', minDate);
    endInput.setAttribute('min', minDate);
});
