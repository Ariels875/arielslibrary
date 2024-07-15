import { initializeAuthorFunctions } from "../crud/authorsCRUD.js";
import { initializeBookFunctions } from "../crud/booksCRUD.js";
import { initializeLoanFunctions } from "../crud/loansCRUD.js";
import { initializeUserFunctions } from "../crud/usersCRUD.js";

document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('book-form');
    const authorForm = document.getElementById('author-form');
    const userForm = document.getElementById('user-form');
    const loanForm = document.getElementById('loan-form');
    const backupsList = document.getElementById('backups-list');
    const searchType = document.getElementById('search-type');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    
    // Display form
    const displayForm = (formId) => {
      console.log('displayForm llamado con formId:', formId);
      const forms = [bookForm, authorForm, userForm, loanForm];
      forms.forEach(form => {
          if (form) {
            console.log(`Cambiando visibilidad de ${form.id}: ${form.id === formId ? 'block' : 'none'}`);
            form.style.display = form.id === formId ? 'block' : 'none';
          }
      });
    };
  
    initializeBookFunctions(bookForm, displayForm);
    initializeAuthorFunctions(authorForm, displayForm);
    initializeUserFunctions(userForm, displayForm);
    initializeLoanFunctions(loanForm, displayForm);

    async function displayBackupSchedule() {
      try {
        const response = await fetch('/backups/schedule');
        const data = await response.json();
        const scheduleSpan = document.getElementById('backup-schedule');
        scheduleSpan.textContent = data.schedule;
      } catch (error) {
        console.error('Error fetching backup schedule:', error);
        document.getElementById('backup-schedule-info').style.display = 'none';
      }
    }

    document.getElementById('update-schedule-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const newSchedule = document.getElementById('new-schedule').value;
      try {
        const response = await fetch('/backups/schedule', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ schedule: newSchedule }),
        });
        if (response.ok) {
          const data = await response.json();
          alert(data.message);
          displayBackupSchedule(); // Actualizar la visualización del horario
        } else {
          const error = await response.json();
          alert(error.error);
        }
      } catch (error) {
        console.error('Error updating backup schedule:', error);
        alert('Error al actualizar el horario de copia de seguridad');
      }
    });

  
    // Backups
    document.getElementById('view-backups').addEventListener('click', async () => {
      try {
        const response = await fetch('/backups');
        const backups = await response.json();
        backupsList.innerHTML = '';
        backups.forEach(backup => {
          const item = document.createElement('li');
          item.textContent = backup;
          const restoreButton = document.createElement('button');
          restoreButton.textContent = 'Restaurar';
          restoreButton.addEventListener('click', () => restoreBackup(backup));
          item.appendChild(restoreButton);
          backupsList.appendChild(item);
        });
        backupsList.style.display = 'block';
      } catch (error) {
        console.error('Error fetching backups:', error);
        alert('Error al obtener la lista de copias de seguridad');
      }
    });
    
    async function restoreBackup(backupFile) {
      if (confirm(`¿Está seguro que desea restaurar la base de datos a la versión ${backupFile}?`)) {
        try {
          const response = await fetch('/backups/restore', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ backupFile }),
          });
          if (response.ok) {
            alert('Base de datos restaurada con éxito');
          } else {
            alert('Error al restaurar la base de datos');
          }
        } catch (error) {
          console.error('Error restoring backup:', error);
          alert('Error al restaurar la base de datos');
        }
      }
    }
  
    document.getElementById('generate-backup').addEventListener('click', async () => {
      try {
        const response = await fetch('/backups/generate', { method: 'POST' });
        if (response.ok) {
          alert('Copia de seguridad generada con éxito');
        } else {
          alert('Error al generar la copia de seguridad');
        }
      } catch (error) {
        console.error('Error generating backup:', error);
        alert('Error al generar la copia de seguridad');
      }
    });
  

  // Search functionality
  searchBtn.addEventListener('click', async () => {
    const type = searchType.value;
    const query = searchInput.value.trim();

    if (!type || !query) {
      alert('Por favor, seleccione un tipo de búsqueda y ingrese un valor');
      return;
    }

    try {
      let url;
      switch (type) {
        case 'libro':
          url = `/books/search?title=${encodeURIComponent(query)}`;
          break;
        case 'usuario':
          url = `/users/search?name=${encodeURIComponent(query)}`;
          break;
        case 'autor':
          url = `/authors/search?name=${encodeURIComponent(query)}`;
          break;
        case 'prestamo':
          url = `/loans/search?date=${encodeURIComponent(query)}`;
          break;
      }

      const response = await fetch(url);
      const results = await response.json();
      
      // Display results (you'll need to implement this function)
      displaySearchResults(results, type);
    } catch (error) {
      console.error('Error searching:', error);
      alert('Error al realizar la búsqueda');
    }
  });

  

  function displaySearchResults(results, type) {
    const searchResultsSection = document.getElementById('search-results');
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Limpiar resultados anteriores
  
    if (results.length === 0) {
      resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
    } else {
      const table = document.createElement('table');
      table.innerHTML = '<thead><tr></tr></thead><tbody></tbody>';
      const headerRow = table.querySelector('thead tr');
      const tbody = table.querySelector('tbody');
  
      // Crear encabezados de tabla basados en las claves del primer resultado
      Object.keys(results[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1); // Capitalizar primera letra
        headerRow.appendChild(th);
      });
  
      // Llenar la tabla con los resultados
      results.forEach(result => {
        const row = document.createElement('tr');
        Object.values(result).forEach(value => {
          const td = document.createElement('td');
          td.textContent = value;
          row.appendChild(td);
        });
        tbody.appendChild(row);
      });
  
      resultsContainer.appendChild(table);
    }
  
    searchResultsSection.style.display = 'block';
  }

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
      // Implementa la lógica de cierre de sesión aquí
      // Por ejemplo, eliminar el token de sesión y redirigir a la página de inicio de sesión
      localStorage.removeItem('token');
      window.location.href = '/login.html';
    });
    // Llamar a la función cuando se carga la página
    displayBackupSchedule();

  });