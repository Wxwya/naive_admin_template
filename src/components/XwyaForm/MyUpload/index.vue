<template>
   <n-form-item v-show="isShow" :label="label" :path="path" :rule="rules" :key="path+isShow">
    <n-upload
    action="http://127.0.0.1:3800/upload"
    v-model:file-list="value![path]" 
     list-type="image-card"
     :custom-request="customRequest" 
     v-bind="$attrs"
  />
  </n-form-item>
</template>

<script setup lang="ts">
const props =defineProps({
  value: {
    type: Object,
    default: void 0,
  },
  label: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    default: ''
  },
  rules: {
    type: Array,
    default: () => []
  },
  isShow: {
    type: Boolean,
    default: true
  }
  
})
const customRequest = async ({file,data,onFinish,headers, withCredentials,onError,onProgress}: NaiveUI.UploadCustomRequestOptions) => {
  const formData = new FormData()
  console.log(withCredentials);
  
  if (data) {
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
  }

  formData.append('file', file.file as File)
      const res  = await fetch(props.url, {
        method: 'POST',
        headers,
        body: formData,
        withCredentials
      })
  const json = await res.json()
  console.log(json);
  
  if (json.code == 200) {
    
    file.url=json.fileUrl
    onFinish()

  } else { 
    // window.$msg.error(json.msg, {duration:4000})
    onError()
  }

    }
</script>

<style lang="scss" scoped></style>
