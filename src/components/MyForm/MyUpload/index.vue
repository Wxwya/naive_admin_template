<template>
   <n-form-item :label="label" :path="path">
    <!-- :headers="{
      'naive-info': 'hello!'
    }"
    :data="{
      'naive-data': 'cool! naive!'
    }" -->
    <!-- -->

    <n-upload
    action="http://127.0.0.1:3800/upload"
    v-model:file-list="value![path]" 
     list-type="image-card"
     
     :custom-request="customRequest" 
     multiple
  />
    <!-- <n-select style="min-width:100%" v-model:value="value![path]" :multiple="multiple" :placeholder="placeholder"  :options="(options as SelectOption[])" /> -->
  </n-form-item>
</template>

<script setup lang="ts">
defineProps({
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
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: void 0
  },
  multiple: {
    type: Boolean,
    default: false
  }
})
const customRequest = async ({
      file,
      data,
      onFinish,
      onError,
      onProgress
}: UploadCustomRequestOptions) => {
  console.log(file);
  
      const formData = new FormData()
  formData.append('file', file.file as File)
      const res  = await fetch("http://127.0.0.1:3800/upload", {
        method: 'POST',
        body: formData
      })
  const json = await res.json()
  if (json.fileUrl) {
    file.url=json.fileUrl
    onFinish()

  } else { 
    onError()
  }
      // console.log(json);
      // lyla
      //   .post(action as string, {
      //     withCredentials,
      //     headers: headers as Record<string, string>,
      //     body: formData,
      //     onUploadProgress: ({ percent }) => {
      //       onProgress({ percent: Math.ceil(percent) })
      //     }
      //   })
      //   .then(({ json }) => {
      //     message.success(JSON.stringify(json))
      //     onFinish()
      //   })
      //   .catch((error) => {
      //     message.success(error.message)
      //     onError()
      //   })
    }
</script>

<style lang="scss" scoped></style>
