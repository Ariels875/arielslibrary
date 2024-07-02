import express from 'express';
import { getBooks, searchBooks } from '../controllers/bookController';
const router = express.Router();

router.get('/', getBooks);
router.get('/search', searchBooks);

export default router;
//module.exports = router;
