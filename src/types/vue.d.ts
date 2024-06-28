// import mitt from "mitt"
interface Mitt { 
  on:(event: string, handler: Function): void;
  off:(event: string, handler: Function): void;
  emit:(event: string, payload?: any): void;
}
interface Proxy extends ComponentPublicInstance {
  $api: Api;
  $mitt: Mitt;
  $cfz: (color: string, ilighten: number) => string;
  $htor: (color: string, opacity: number) => string;
}
interface Window {
  /** 将naive常用组件挂在至window */
  $bar?: import('naive-ui').LoadingBarProviderInst;
  // $dialog?: import('naive-ui').DialogProviderInst;
  $msg?: import('naive-ui').MessageProviderInst;
  // $notification?: import('naive-ui').NotificationProviderInst;
}
declare global {
  const Proxy: Proxy;
  const Mitt: Mitt; 
}

import * as NaiveUI from 'naive-ui';

export as namespace NaiveUI;
export * from 'naive-ui';

declare module 'vue' {
  export interface GlobalComponents {
    MyForm: typeof import('./../components/MyForm/index.vue')['default'] & typeof import('naive-ui')['NForm']
  }
}
