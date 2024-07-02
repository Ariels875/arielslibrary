import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

const backupDB = () => {
  const backupDir = path.join(__dirname, './backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  const backupFile = path.join(backupDir, `backup_${Date.now()}.sql`);
  const command = `mysqldump -u root -ptoor currentDB > ${backupFile}`;

  exec(command, (error) => {
    if (error) {
      console.error('Error creating backup:', error);
    } else {
      console.log('Backup created successfully:', backupFile);
    }
  });
};

export default backupDB;
