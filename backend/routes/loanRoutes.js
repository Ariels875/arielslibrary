import express from 'express';
import { getLoans, getLoanById, createLoan, updateLoan, deleteLoan, getAvailableBooks } from '../controllers/loanController.js';

const router = express.Router();

router.get('/', getLoans);
router.get('/:id', getLoanById);
router.post('/', createLoan);
router.put('/:id', updateLoan);
router.delete('/:id', deleteLoan);
router.get('/available-books', getAvailableBooks);

export default router;
