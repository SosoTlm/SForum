// Login Form
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const responseText = await res.text();
    alert(responseText);
});

// Admin Login Form
document.getElementById('adminLoginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const password = e.target.password.value;

    const res = await fetch('/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    });

    if (res.status === 200) {
        window.location.href = '/admin';
    } else {
        const responseText = await res.text();
        alert(responseText);
    }
});

// Registration Form
document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;

    const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password })
    });

    const responseText = await res.text();
    alert(responseText);
});
