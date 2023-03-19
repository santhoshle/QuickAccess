const electron = require('electron');

const { app } = electron;
const { BrowserWindow } = electron;
const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 900, 
        height: 680,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}


const database = new sqlite3.Database('db.sqlite3', (err) => {
    if (err) console.error('Database opening error: ', err);
});

database.all('CREATE TABLE IF NOT EXISTS `quick-access` (id INTEGER PRIMARY KEY AUTOINCREMENT, itemName TEXT, itemValue TEXT, groupName TEXT)',  (err, rows) => {
    console.log("rows ", rows);
    console.log("err ", err);
});

ipcMain.on('asynchronous-message', (event, arg) => {
    const sql = arg;
    console.log("sql ", sql);
    database.all(sql, (err, rows) => {
        event.reply('asynchronous-reply', (err && err.message) || rows);
    });
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});