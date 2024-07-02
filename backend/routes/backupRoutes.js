import express from 'express';
import { generateBackup, listBackups, restoreBackup } from '../controllers/backupController.js';

const router = express.Router();

router.get('/', listBackups);
router.post('/generate', generateBackup);
router.post('/restore/:file', restoreBackup);

export default router;
