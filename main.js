const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
  let win = new BrowserWindow({
    width:1024,
    height: 728
  });

  //win.toggleDevTools();
  win.loadURL('file://'+__dirname+'/app/index.html');
});
