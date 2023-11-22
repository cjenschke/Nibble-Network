// public/js/login.js:
document.addEventListener('DOMContentLoaded', (event) => {
    const loginForm = document.querySelector('.auth-form'); // Adjust the selector if needed

    loginForm.addEventListener('submit', handleFormSubmit);
});

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting immediately

    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let isValid = true;

    // Basic validation
    if (!email || !validateEmail(email)) {
        isValid = false;
        // Provide feedback for email validation
        // e.g., emailInput.classList.add('is-invalid');
    }

    if (!password || password.length < 8) {
        isValid = false;
        // Provide feedback for password validation
        // e.g., passwordInput.classList.add('is-invalid');
    }

    // If validation passes, submit the form
    if (isValid) {
        loginForm.submit();
    }
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}

// As we’re integrating login functionality on the frontend, here are some key points for the backend setup:

// 1. **Session Management**: Please ensure robust session creation and management post-login. Also, implement middleware to protect routes that require user authentication.

// 2. **Error Handling**: We need clear error messages for login failures, such as 'Invalid credentials', while avoiding details that could assist in unauthorized access.

// 3. **Data Security**: All user data, especially passwords, must be securely handled. Also, confirm that all sensitive data transfers are over HTTPS.

// 4. **Rate Limiting**: To prevent brute force attacks, could you implement rate limiting on the login attempts?

// 5. **API Details**: Please confirm the login API endpoints and the expected data format. We're sending a JSON object with 'email' and 'password' fields.

// 6. **Backend Validation**: In addition to frontend validation, ensure thorough backend validation of the login data.

// 7. **Logout Functionality**: Make sure the logout process is secure and properly invalidates the user session.

// 8. **Documentation**: We'll need updated documentation on the API endpoints and any other backend changes relevant to login functionality.