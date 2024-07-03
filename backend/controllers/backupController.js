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
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `backup_${timestamp}.sql`);
  fs.copyFile(currentDBPath, backupPath, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error generating backup' });
    }
    res.status(200).json({ message: 'Backup generated successfully' });
  });
};

export const restoreBackup = (req, res) => {
  const { backupFile } = req.body;
  if (!backupFile) {
    return res.status(400).json({ error: 'Backup file name is required' });
  }

  const backupPath = path.join(backupDir, backupFile);
  
  // Verifica si el archivo de respaldo existe
  if (!fs.existsSync(backupPath)) {
    return res.status(404).json({ error: 'Backup file not found' });
  }

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
