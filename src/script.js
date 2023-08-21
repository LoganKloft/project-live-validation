const form = document.getElementById('form');

const errorMessage = document.getElementById('error-message');
function hideErrorMessage() {
    errorMessage.style.visibility = 'hidden';
}

function showErrorMessage(message) {
    errorMessage.innerText = message;
    errorMessage.style.visibility = 'visible';
}

// email - required, proper email
const email = document.getElementById('email');
email.addEventListener('focusout', showEmailError);

function showEmailError() {
    if (email.validity.valueMissing) {
        // field is empty
        showErrorMessage("Email cannot be empty");

    } else if (email.validity.typeMismatch) {
        // field does not contain an email address
        showErrorMessage("Email is not valid");

    } else {
        hideErrorMessage();
    }
}

// country - required
const country = document.getElementById('country');
country.addEventListener('focusout', showCountryError);

function showCountryError() {
    if (country.validity.valueMissing) {
        // field is empty
        showErrorMessage('Country cannot be empty');
    } else {
        hideErrorMessage();
    }
}

// zip code - required, proper zip code
const zipCode = document.getElementById('zip');
zipCode.addEventListener('focusout', showZipCodeError);

function showZipCodeError() {
    if (zipCode.validity.valueMissing) {
        // field is empty
        showErrorMessage('Zip Code cannot be empty');

    } else if (zipCode.validity.patternMismatch) {
        // field does not contain a Zip Code
        showErrorMessage("Zip Code is not valid");
    } else {
        hideErrorMessage();
    }
}

// password - required
const password = document.getElementById('password');
password.addEventListener('focusout', showPasswordError);

function showPasswordError() {
    if (password.validity.valueMissing) {
        // field is empty
        showErrorMessage('Password cannot be empty');
    } else {
        hideErrorMessage();
    }
}

// confirm password - required, match password
const confirmPassword = document.getElementById('confirm-password');
confirmPassword.addEventListener('focusout', showConfirmPasswordError);

function showConfirmPasswordError() {
    if (confirmPassword.validity.valueMissing) {
        // field is empty
        showErrorMessage('Confirm Password cannot be empty')
    } else if (confirmPassword.value !== password.value) {
        // passwords do not match
        console.log('Passwords do not match');
    } else {
        hideErrorMessage();
    }
}

function validateConfirmPassword() {
    if (confirmPassword.validity.valueMissing) return false;
    else if (confirmPassword.value !== password.value) return false;

    return true;
}

// display an error for the first field that is not valid
// return false if a field is not valid, true otherwise
function validateForm() {
    if (!email.validity.valid) {
        showEmailError();
        return false;
    }

    if (!country.validity.valid) {
        showCountryError();
        return false;
    }

    if (!zipCode.validity.valid) {
        showZipCodeError();
        return false;
    }

    if (!password.validity.valid) {
        showPasswordError();
        return false;
    }

    if (!validateConfirmPassword()) {
        showConfirmPasswordError();
        return false;
    }

    return true;
}

// validate the entire form
form.addEventListener('submit', (event) => {
    if (!validateForm()) {
        // if enter here, an error message is shown on the form for the first incorrect field
        // stop form submission if the form is not valid
        event.preventDefault();
    }
})