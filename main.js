import electron from 'electron';
import path from 'path';
import url from 'url';
import isDevelopment from 'electron-is-dev';
import Store from './store';
import defaultData from './data/defaultData';

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

const dataStore = new Store({
  configName: 'user-data',
  defaults: defaultData
});

const prefStore = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: {
      height: 800,
      width: 940
    }
  }
});

const createWindow = () => {
  const { height, width } = prefStore.get('windowBounds');

  mainWindow = new BrowserWindow({
    width,
    height,
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

  mainWindow.on('resize', () => {
    // This event doesn't pass the window size, so call getBounds which returns
    // an object with  height, width, and x and y coordinates.
    const { height, width } = mainWindow.getBounds();

    // Store window size for use upon app restart
    prefStore.set('windowBounds', { height, width });
  });

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
