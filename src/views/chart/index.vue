<template>
  <div class="">
    <div @click="onClose">关闭worker</div>
    <div @click="onSend">发送 </div>
  </div>
</template>

<script setup lang="ts">
import socket from "@/utils/socket/socket"
const w1 = new socket({ baseUrl:"ws://127.0.0.1:9898",header:["token"] });
// console.log(w1);
// w1.close()
const pingMsg = {
  type: 1,
  data: '666',
  sender: '',
  receiver: ''
}
const onStart = () => {
  const name = w1.connect({ name: "xwya", url: "/api/system/webws/xwya", })
  w1.addCheckMessage(name,(msg) => {
    console.log(msg);
    
   })
 console.log("name",name);
 
}
const onClose = () => {
  w1.close("xwya")
}
const onSend = () => { 
  w1.send("xwya",pingMsg)

}
onMounted(() => { 
  onStart()
})

</script>

<style lang="scss" scoped></style>
