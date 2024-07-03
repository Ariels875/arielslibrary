import express from 'express';
import { generateBackup, listBackups, restoreBackup } from '../controllers/backupController.js';
import scheduler from '../utils/scheduler.js';

const router = express.Router();

router.get('/', listBackups);
router.post('/generate', generateBackup);
router.post('/restore', restoreBackup);

router.get('/schedule', (req, res) => {
    res.json({ schedule: scheduler.getBackupSchedule() });
  });
  
  router.post('/schedule', (req, res) => {
    const { schedule } = req.body;
    if (scheduler.updateBackupSchedule(schedule)) {
      res.json({ message: 'Horario de copia de seguridad actualizado', schedule });
    } else {
      res.status(400).json({ error: 'Formato de horario inválido' });
    }
  });

export default router;
