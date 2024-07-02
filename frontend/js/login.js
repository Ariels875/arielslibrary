document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('token', data.token);
          window.location.href = data.redirectUrl;
        } else {
          alert(data.message);
        }
      });
  });

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Registro exitoso. Ahora puede iniciar sesión.');
          registerForm.reset();
        } else {
          alert(data.message);
        }
      });
  });
});
