document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('bookForm');
    const authorForm = document.getElementById('authorForm');
    const userForm = document.getElementById('userForm');
    const backupList = document.getElementById('backupList');
    const generateBackupButton = document.getElementById('generateBackupButton');
    const showBackupsButton = document.getElementById('showBackupsButton');
  
    const displayForm = (formId) => {
      const forms = [bookForm, authorForm, userForm];
      forms.forEach(form => {
        if (form.id === formId) {
          form.style.display = 'block';
        } else {
          form.style.display = 'none';
        }
      });
    };
  
    // Handlers for showing forms
    document.getElementById('addBookButton').addEventListener('click', () => {
      displayForm('bookForm');
    });
  
    document.getElementById('editBookButton').addEventListener('click', () => {
      displayForm('bookForm');
    });
  
    document.getElementById('deleteBookButton').addEventListener('click', () => {
      displayForm('bookForm');
    });
  
    document.getElementById('addAuthorButton').addEventListener('click', () => {
      displayForm('authorForm');
    });
  
    document.getElementById('editAuthorButton').addEventListener('click', () => {
      displayForm('authorForm');
    });
  
    document.getElementById('deleteAuthorButton').addEventListener('click', () => {
      displayForm('authorForm');
    });
  
    document.getElementById('addUserButton').addEventListener('click', () => {
      displayForm('userForm');
    });
  
    document.getElementById('editUserButton').addEventListener('click', () => {
      displayForm('userForm');
    });
  
    document.getElementById('deleteUserButton').addEventListener('click', () => {
      displayForm('userForm');
    });
  
    // Load backups
    const loadBackups = async () => {
      try {
        const response = await fetch('/backups');
        const backups = await response.json();
        backupList.innerHTML = '';
        backups.forEach(backup => {
          const item = document.createElement('li');
          item.innerHTML = `
            ${backup}
            <button class="restoreBackup" data-file="${backup}">Restore</button>
          `;
          backupList.appendChild(item);
        });
      } catch (error) {
        console.error('Error loading backups:', error);
      }
    };
  
    // Event listener to show backups
    showBackupsButton.addEventListener('click', loadBackups);
  
    // Event listener to generate backup
    generateBackupButton.addEventListener('click', async () => {
      try {
        const response = await fetch('/backups/generate', { method: 'POST' });
        if (response.ok) {
          alert('Backup generated successfully');
          loadBackups();
        } else {
          alert('Error generating backup');
        }
      } catch (error) {
        console.error('Error generating backup:', error);
      }
    });
  
    // Event listener to restore backup
    backupList.addEventListener('click', async (event) => {
      if (event.target.classList.contains('restoreBackup')) {
        const file = event.target.dataset.file;
        try {
          const response = await fetch(`/backups/restore/${file}`, { method: 'POST' });
          if (response.ok) {
            alert('Backup restored successfully');
          } else {
            alert('Error restoring backup');
          }
        } catch (error) {
          console.error('Error restoring backup:', error);
        }
      }
    });
  });
  