const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 955,
    height: 489,
    webPreferences: {
      nodeIntegration: true
    },
    resizable: false
  });
  
  win.loadURL('http://localhost:4200');
  // win.webContents.openDevTools();
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    app.quit()
});
