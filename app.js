const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');
const request = require('request');
const expressApp = express();

// Start server
expressApp.use(express.static(__dirname + '/dist'));

expressApp.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

expressApp.get('/eska_api/combine.jsonp', function (req, res) {
    var newurl = 'https://static.eska.pl/m/playlist/combine.jsonp?callback=jsonp';
    request(newurl).pipe(res);
});

expressApp.listen(process.env.PORT || 4200);

// Open Electron
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 955,
        height: 489,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false
    });

    mainWindow.loadURL('http://localhost:4200');
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    app.quit()
});
