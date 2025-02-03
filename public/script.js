
// Get the form elements
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

// Get the error message elements
const registerErrorMessage = document.getElementById('registerErrorMessage');
const loginErrorMessage = document.getElementById('loginErrorMessage');

// Function to show the register form
function showRegisterForm() {
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
}

// Function to show the login form
function showLoginForm() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
}

// Function to show the dashboard
function showDashboard() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}

// Function to handle logout
function logout() {
    // Clear local storage
    localStorage.clear();
    // Show the login form
    showLoginForm();
}

// Function to handle register form submission
async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful! Please login.');
            showLoginForm();
        } else {
            registerErrorMessage.textContent = data.message;
        }
    } catch (error) {
        console.error('Registration failed:', error);
        registerErrorMessage.textContent = 'An error occurred. Please try again later.';
    }
}

// Function to handle login form submission
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            showDashboard();
        } else {
            loginErrorMessage.textContent = data.message;
        }
    } catch (error) {
        console.error('Login failed:', error);
        loginErrorMessage.textContent = 'An error occurred. Please try again later.';
    }
}

// Add event listeners for the forms
registerForm.addEventListener('submit', handleRegister);
loginForm.addEventListener('submit', handleLogin);

// Show the login form by default
showLoginForm();
