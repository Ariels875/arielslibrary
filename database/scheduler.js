import cron from 'node-cron';
import { backupDB } from './dbBackup';

const scheduleBackups = () => {
  cron.schedule('0 3 * * *', backupDB, {
    scheduled: true,
    timezone: 'GMT-5'
  });
};

export default scheduleBackups;
