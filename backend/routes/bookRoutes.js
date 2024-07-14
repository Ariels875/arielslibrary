import express from 'express';
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/bookController.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/:ISBN', getBookById);
router.post('/', createBook);
router.put('/:ISBN', updateBook);
router.delete('/:ISBN', deleteBook);

export default router;
