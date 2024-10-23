document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.createElement('div'); // Create a message container for form-level errors or success
    formMessage.setAttribute('id', 'formMessage');
    formMessage.style.display = 'none'; // Hide the message initially
    contactForm.prepend(formMessage); // Add message at the top of the form

    // Get all the form fields
    const surname = document.getElementById('surname');
    const firstName = document.getElementById('firstName');
    const address = document.getElementById('address');
    const birthDate = document.getElementById('birthDate');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');

    // Add 'blur' event listeners to each input field to validate when the user leaves the field
    surname.addEventListener('blur', validateSurname);
    firstName.addEventListener('blur', validateFirstName);
    address.addEventListener('blur', validateAddress);
    birthDate.addEventListener('blur', validateBirthDate);
    phone.addEventListener('blur', validatePhone);
    email.addEventListener('blur', validateEmail);

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        let errorMessages = []; // Array to collect all error messages

        // Perform full validation on submit and collect error messages
        if (!validateSurname()) errorMessages.push('Surname is invalid.');
        if (!validateFirstName()) errorMessages.push('First Name is invalid.');
        if (!validateAddress()) errorMessages.push('Address is invalid.');
        if (!validateBirthDate()) errorMessages.push('Birth Date is invalid.');
        if (!validatePhone()) errorMessages.push('Phone Number is invalid.');
        if (!validateEmail()) errorMessages.push('Email is invalid.');

        // If errors exist, display them at the top of the form
        if (errorMessages.length > 0) {
            formMessage.innerText = 'Please correct the following fields:\n' + errorMessages.join('\n');
            formMessage.style.display = 'block'; // Show the error message
            formMessage.style.color = 'red'; // Make the message red for errors
            // Reset all field backgrounds to white on error
            resetFieldBackgrounds();
        } else {
            // Success message when all fields are correct
            formMessage.innerText = 'Form submitted successfully!'; // Success message
            formMessage.style.display = 'block'; // Show the success message
            formMessage.style.color = 'green'; // Success message in green
            
            // Optionally, clear the form fields if desired
            contactForm.reset();
            // Clear any previous error messages
            clearAllFieldErrors();
        }
    });

    // Validation functions
    function validateSurname() {
        if (surname.value.trim().length < 3) {
            showFieldError(surname);
            return false;
        } else {
            clearFieldError(surname);
            return true;
        }
    }

    function validateFirstName() {
        if (firstName.value.trim().length < 3) {
            showFieldError(firstName);
            return false;
        } else {
            clearFieldError(firstName);
            return true;
        }
    }

    function validateAddress() {
        const addressRegex = /^(?=.*\d)[^\@\#\$\%\^\&\*]{3,}$/;
        if (!addressRegex.test(address.value.trim())) {
            showFieldError(address);
            return false;
        } else {
            clearFieldError(address);
            return true;
        }
    }

    function validateBirthDate() {
    const birthDateValue = birthDate.value.trim();
    // Simplified regex to match the format MM/DD/YYYY
    const birthDateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/;

    // Check if the format is valid
    if (!birthDateRegex.test(birthDateValue)) {
        console.log("Invalid format: ", birthDateValue); // Debugging log
        showFieldError(birthDate);
        return false; // Invalid format
    }

    // If format is correct, clear any previous error messages
    clearFieldError(birthDate);
    return true; // Valid date format
}


    function validatePhone() {
        // Updated regex to match the format xxx-xxx-xxxx
        const phoneRegex = /^\d{3}\d{3}\d{4}$/; // Corrected regex pattern to include dashes

        if (!phoneRegex.test(phone.value.trim())) {
            showFieldError(phone);
            return false;
        } else {
            clearFieldError(phone);
            return true;
        }
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            showFieldError(email);
            return false;
        } else {
            clearFieldError(email);
            return true;
        }
    }

    // Function to show error message for a specific field, above the input field
    function showFieldError(field) {
        field.style.backgroundColor = 'orange'; // Highlight field with orange background

        let errorLabel = document.getElementById(field.id + '-error');
        if (!errorLabel) {
            errorLabel = document.createElement('div');
            errorLabel.setAttribute('id', field.id + '-error');
            errorLabel.style.color = 'red';
            errorLabel.style.fontSize = '12px';
            errorLabel.style.marginBottom = '5px'; // Add some space between the label and the input field
            field.parentNode.insertBefore(errorLabel, field); // Add error message above the field
        }
        // Do not set any text for the error label
    }

    // Function to clear error message for a specific field
    function clearFieldError(field) {
        field.style.backgroundColor = ''; // Reset field background

        const errorLabel = document.getElementById(field.id + '-error');
        if (errorLabel) {
            errorLabel.remove(); // Remove the error label if it exists
        }
    }

    // Function to clear all field errors
    function clearAllFieldErrors() {
        clearFieldError(surname);
        clearFieldError(firstName);
        clearFieldError(address);
        clearFieldError(birthDate);
        clearFieldError(phone);
        clearFieldError(email);
        
        // Reset background colors to white for each field after clearing errors
        resetFieldBackgrounds();
    }

    // Function to reset field backgrounds to white
    function resetFieldBackgrounds() {
        surname.style.backgroundColor = 'white';
        firstName.style.backgroundColor = 'white';
        address.style.backgroundColor = 'white';
        birthDate.style.backgroundColor = 'white';
        phone.style.backgroundColor = 'white';
        email.style.backgroundColor = 'white';
    }
});
