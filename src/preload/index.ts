import {contextBridge} from 'electron'
import {electronAPI} from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  t_wrap: () => electronAPI.ipcRenderer.send("t_wrap"),
  t_resize: () => electronAPI.ipcRenderer.send("t_resize"),
  t_close: () => electronAPI.ipcRenderer.send("t_close"),
  file_create: ()=> electronAPI.ipcRenderer.invoke("file_create"),
  file_open: ()=> electronAPI.ipcRenderer.invoke("file_open"),
  file_save: (text: string, file:string)=> electronAPI.ipcRenderer.send("file_save", text, file),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
