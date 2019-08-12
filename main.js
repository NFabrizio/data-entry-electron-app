import electron from 'electron';
import path from 'path';
import url from 'url';
import isDevelopment from 'electron-is-dev';
import Store from './store';
import defaultData from './data/defaultData';

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

const store = new Store({
  configName: 'user-data',
  defaults: defaultData
});

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 940,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // if (isDevelopment) {
  //   mainWindow.webContents.openDevTools();
  // }


  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
