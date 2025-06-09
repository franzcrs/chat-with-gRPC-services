import { app, BrowserWindow } from 'electron';
import { spawn } from 'child_process';
import path from 'path';

let grpcProcess: ReturnType<typeof spawn> | null = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { 
      contextIsolation: true,
      nodeIntegration: false },
  });

  win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
}

function startGRPCServer() {
  grpcProcess = spawn('node', ['grpc/server.cjs'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
    shell: true,
  });
}

app.whenReady().then(() => {
  startGRPCServer();
  createWindow();
});

app.on('window-all-closed', () => {
  grpcProcess?.kill();
  app.quit();
});