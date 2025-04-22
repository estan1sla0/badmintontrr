
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const user = document.getElementById('loginUser').value;
      const pass = document.getElementById('loginPass').value;
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (users[user] && users[user] === pass) {
        localStorage.setItem('loggedUser', user);
        window.location.href = 'app.html';
      } else {
        Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      const user = document.getElementById('registerUser').value;
      const pass = document.getElementById('registerPass').value;
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (users[user]) {
        Swal.fire('Error', 'El usuario ya existe', 'warning');
      } else {
        users[user] = pass;
        localStorage.setItem('users', JSON.stringify(users));
        Swal.fire('Registrado', 'Usuario creado correctamente', 'success').then(() => {
          window.location.href = 'index.html';
        });
      }
    });
  }
});
