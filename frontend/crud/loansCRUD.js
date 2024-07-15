
export function initializeLoanFunctions(loanForm, displayForm) {
    
    // Loans
    document.getElementById('add-loan').addEventListener('click', () => {
        loanForm.reset();
        document.getElementById('loan-id').value = '';
        displayForm('loan-form');
      });
    
      document.getElementById('edit-loan').addEventListener('click', async () => {
        const loanId = prompt('Ingrese el ID del préstamo a editar:');
        if (loanId) {
          try {
            const response = await fetch(`/loans/${loanId}`);
            const loan = await response.json();
            document.getElementById('loan-id').value = loan.id;
            document.getElementById('loan-user').value = loan.userId;
            document.getElementById('loan-book').value = loan.bookId;
            document.getElementById('loan-date').value = loan.loanDate.split('T')[0];
            document.getElementById('loan-return-date').value = loan.returnDate.split('T')[0];
            displayForm('loan-form');
          } catch (error) {
            console.error('Error fetching loan:', error);
            alert('Error al obtener el préstamo');
          }
        }
      });
    
      loanForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const loanId = document.getElementById('loan-id').value;
        const loanData = {
          userId: document.getElementById('loan-user').value,
          bookId: document.getElementById('loan-book').value,
          loanDate: document.getElementById('loan-date').value,
          returnDate: document.getElementById('loan-return-date').value
        };
        try {
          const method = loanId ? 'PUT' : 'POST';
          const url = loanId ? `/loans/${loanId}` : '/loans';
          const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loanData)
          });
          if (response.ok) {
            alert(loanId ? 'Préstamo actualizado con éxito' : 'Préstamo agregado con éxito');
            loanForm.reset();
            displayForm('');
          } else {
            alert('Error al guardar el préstamo');
          }
        } catch (error) {
          console.error('Error saving loan:', error);
          alert('Error al guardar el préstamo');
        }
      });
}