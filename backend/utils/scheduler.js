import cron from 'node-cron';
import fetch from 'node-fetch';

let backupSchedule = '2 3 * * *'; // Horario predeterminado
let scheduledTask;

// Función para generar la copia de seguridad
const generateBackup = async () => {
  try {
    const response = await fetch('http://localhost:3000/backups/generate', { method: 'POST' });
    if (response.ok) {
      console.log('Copia de seguridad generada con éxito');
    } else {
      console.error('Error al generar la copia de seguridad');
    }
  } catch (error) {
    console.error('Error generating backup:', error);
  }
};

// Función para programar las copias de seguridad
const scheduleBackups = () => {
  if (scheduledTask) {
    scheduledTask.stop();
  }
  scheduledTask = cron.schedule(backupSchedule, generateBackup, {
    scheduled: true,
    timezone: "America/Guayaquil"
  });
  console.log(`Tarea de copias de seguridad programada para: ${backupSchedule}`);
};

const updateBackupSchedule = (newSchedule) => {
  if (cron.validate(newSchedule)) {
    backupSchedule = newSchedule;
    scheduleBackups();
    return true;
  }
  return false;
};

export default {
  scheduleBackups,
  updateBackupSchedule,
  getBackupSchedule: () => backupSchedule
};