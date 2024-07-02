import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backupDir = path.join(__dirname, '../../database/backups');
const currentDBPath = path.join(__dirname, '../../database/currentDB.sql');

export const listBackups = (req, res) => {
  fs.readdir(backupDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error listing backups' });
    }
    res.json(files);
  });
};

export const generateBackup = (req, res) => {
  const backupPath = path.join(backupDir, `backup_${new Date().toISOString().slice(0, 10)}.sql`);
  fs.copyFile(currentDBPath, backupPath, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error generating backup' });
    }
    res.status(200).json({ message: 'Backup generated successfully' });
  });
};

export const restoreBackup = (req, res) => {
  const backupFile = req.params.file;
  const backupPath = path.join(backupDir, backupFile);
  
  fs.unlink(currentDBPath, (err) => {
    if (err && err.code !== 'ENOENT') {
      return res.status(500).json({ error: 'Error deleting currentDB.sql' });
    }
    
    fs.copyFile(backupPath, currentDBPath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error restoring backup' });
      }
      res.status(200).json({ message: 'Backup restored successfully' });
    });
  });
};
