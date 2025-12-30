import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      send(channel: string, ...args: any[]):void;
      t_wrap():void;
      t_resize():void;
      t_close():void;
      file_create():Promise<string>;
      file_open():Promise<string>;

      // [key:any]:any
    }
  }
}
