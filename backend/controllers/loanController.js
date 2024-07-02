import Loan from '../models/loanModel.js';

export const getLoans = async (req, res) => {
  try {
    const [loans] = await Loan.getAll();
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLoanById = async (req, res) => {
  try {
    const { id } = req.params;
    const [loans] = await Loan.getById(id);
    if (loans.length === 0) {
      return res.status(404).json({ message: 'Préstamo no encontrado' });
    }
    res.json(loans[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createLoan = async (req, res) => {
  try {
    const { user_id, book_id, loan_date, return_date } = req.body;
    const [result] = await Loan.create({
      user_id,
      book_id,
      loan_date,
      return_date
    });
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, book_id, loan_date, return_date } = req.body;
    await Loan.update(id, {
      user_id,
      book_id,
      loan_date,
      return_date
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;
    await Loan.delete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAvailableBooks = async (req, res) => {
  try {
    const [books] = await Loan.getAvailableBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
