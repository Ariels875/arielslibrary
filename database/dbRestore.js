import path from 'path';
import { exec } from 'child_process';

const restoreDB = (backupFile) => {
  const backupPath = path.join(__dirname, './backups', backupFile);
  const command = `mysql -u root -ptoor currentDB < ${backupPath}`;

  exec(command, (error) => {
    if (error) {
      console.error('Error restoring backup:', error);
    } else {
      console.log('Database restored successfully from:', backupFile);
    }
  });
};

export default restoreDB;
