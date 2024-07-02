import cron from 'node-cron';
import { exec } from 'child_process';
import path from 'path';

// Función para generar la copia de seguridad
const generateBackup = () => {
  const backupPath = path.join(__dirname, 'backups', `backup_${new Date().toISOString().slice(0, 10)}.sql`);
  const command = `mysqldump -u root -pYourPassword your_database > ${backupPath}`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al generar la copia de seguridad: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Copia de seguridad generada en: ${backupPath}`);
  });
};

// Función para programar las copias de seguridad
const scheduleBackups = () => {
  // Programar para ejecutar a las 3 AM todos los días
  cron.schedule('0 3 * * *', generateBackup, {
    scheduled: true,
    timezone: "America/New_York" // Ajusta según tu zona horaria
  });
  console.log('Tarea de copias de seguridad programada para ejecutarse a las 3 AM todos los días');
};

export default {
  scheduleBackups
};
