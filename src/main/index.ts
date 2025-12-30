import {app, shell, BrowserWindow, ipcMain, screen, nativeImage, dialog} from 'electron'
import {join} from 'path'
import {electronApp, optimizer, is} from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import * as electron from "electron";
import * as fs from "node:fs";

function createWindow(): void {
  const {width, height} = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    show: false,
    autoHideMenuBar: true,
    icon: icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    frame: false
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url).then()
    return {action: 'deny'}
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']).then()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html')).then()
  }
}


app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')


  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.on("t_wrap", (e) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    win?.minimize();
  })
  ipcMain.on("t_resize", (e) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    if (win?.isMaximized()) {
      win?.unmaximize()
    } else {
      win?.maximize()
    }
  })
  ipcMain.on("t_close", (e) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    win?.close();
  })
  ipcMain.handle("file_create", async (e) => {
    const a = await dialog.showSaveDialog({
      title: "Create file",
      filters:[
        {
          name:"Markdown",
          extensions:["md"]
        }
      ]
    })

    const path = a.filePath;
    if (path.length>0){
      fs.writeFileSync(path, "");
    }
    return `${path}`;
  })
  ipcMain.handle("file_open", async (e) => {
    const a = await dialog.showOpenDialog({
      title: "Open file",
      filters:[
        {
          name:"Markdown",
          extensions:["md"]
        }
      ]
    })

    const path = a.filePaths[0];
    const text = fs.readFileSync(path, "utf-8")
    return [`${path}`, `${text}`];
  })

  ipcMain.on("file_save", (e, text:string, file:string)=>{
    fs.writeFileSync(file, text);
  })


  createWindow()

  app.on('activate', function () {

    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
