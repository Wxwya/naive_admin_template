import { createDiscreteApi } from 'naive-ui'
const { message, loadingBar } = createDiscreteApi(['message', 'loadingBar'])
console.log(message,"msg");
console.log(loadingBar,"loadingBar");

window.$msg = message
window.$bar = loadingBar