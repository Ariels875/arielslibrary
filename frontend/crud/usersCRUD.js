
export function initializeUserFunctions(userForm, displayForm) {
     // Users
     document.getElementById('add-user').addEventListener('click', () => {
        userForm.reset();
        document.getElementById('user-id').value = '';
        displayForm('user-form');
      });
    
      document.getElementById('edit-user').addEventListener('click', async () => {
        const userId = prompt('Ingrese el ID del usuario a editar:');
        if (userId) {
          try {
            const response = await fetch(`/users/${userId}`);
            const user = await response.json();
            document.getElementById('user-id').value = user.id;
            document.getElementById('user-name').value = user.name;
            document.getElementById('user-email').value = user.email;
            document.getElementById('user-role').value = user.role;
            displayForm('user-form');
          } catch (error) {
            console.error('Error fetching user:', error);
            alert('Error al obtener el usuario');
          }
        }
      });
    
      document.getElementById('delete-user').addEventListener('click', async () => {
        const userId = prompt('Ingrese el ID del usuario a eliminar:');
        if (userId) {
          try {
            const response = await fetch(`/users/${userId}`, { method: 'DELETE' });
            if (response.ok) {
              alert('Usuario eliminado con éxito');
            } else {
              alert('Error al eliminar el usuario');
            }
          } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error al eliminar el usuario');
          }
        }
      });
    
      userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userId = document.getElementById('user-id').value;
        const userData = {
          name: document.getElementById('user-name').value,
          email: document.getElementById('user-email').value,
          password: document.getElementById('user-password').value,
          role: document.getElementById('user-role').value
        };
        try {
          const method = userId ? 'PUT' : 'POST';
          const url = userId ? `/users/${userId}` : '/users';
          const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
          });
          if (response.ok) {
            alert(userId ? 'Usuario actualizado con éxito' : 'Usuario agregado con éxito');
            userForm.reset();
            displayForm('');
          } else {
            alert('Error al guardar el usuario');
          }
        } catch (error) {
          console.error('Error saving user:', error);
          alert('Error al guardar el usuario');
        }
      });  
}