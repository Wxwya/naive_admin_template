type Mitt { 
  on:(event: string, handler: Function): void;
  off:(event: string, handler: Function): void;
  emit:(event: string, payload?: any): void;
}
 interface CusProxy extends ComponentPublicInstance {
  $api: Api;
  $mitt: Mitt;
  $cfz: (color: string, lighten: number) => string;
  $htor: (color: string, opacity: number) => string;
}
// declare global { 
//   const Proxys: CustomProxy;
//   const Mitt: Mitt;
// }
