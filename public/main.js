const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
        }
    });
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    mainWindow.on('closed', () => {
        app.exit();
    })
}

app.on('ready', () => {
    createWindow();
    mainWindow.webContents.openDevTools();
    autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', () => {
    app.exit();
})

ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
})

autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update_donwloaded');
})

ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
})