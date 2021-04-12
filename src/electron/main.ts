import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import { initDb } from './db/init';
import { loadRuntimeConfig } from './config/config';
import { usersService } from './db/users/service';

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.resolve(__dirname, './preload.js'),
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
    const installer = require('electron-devtools-installer');
    await installer.default([
      installer.REACT_DEVELOPER_TOOLS,
      installer.REDUX_DEVTOOLS,
    ]);
  }

  const runtimeConfig = loadRuntimeConfig('./config/config.yaml');

  console.log('runtimeConfig', runtimeConfig);

  initDb(runtimeConfig);

  registerServicesInIpc();
}

function registerServicesInIpc() {
  const ipcFunctions = [...usersService];
  ipcFunctions.forEach((ipcFn) => {
    ipcMain.handle(ipcFn.name, ipcFn.fn);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
