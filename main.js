const { app, BrowserWindow } = require('electron');
const sqlite3 = require('sqlite3').verbose();

// Declare win with let to allow reassignment
let win; 

function createWindow() {
    console.log('Creating the application window...');
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    console.log('Loading index.html...');
    win.loadFile('index.html');

    console.log('Opening DevTools...');
    // win.webContents.openDevTools();

    const dbPath = app.getPath('userData') + '/TarbellIndex.db';

    const conn = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
        } else {
            console.log('Connected to the database.');
        }
    });

    win.on('closed', () => {
        console.log('Window closed.');
        conn.close();
        win = null; // This reassignment is now allowed
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        console.log('Quitting the app...');
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        console.log('Creating a new window...');
        createWindow();
    }
});