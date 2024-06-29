<template>
  <n-form style="width: 100%;" :inline="false" ref="formRef" :model="modelValue" :disabled="disabled" v-bind="$attrs">
    <n-flex wrap >
      <component v-for="(p, i) in itemList" :key="i" :is="type[(p as any).type]" :value="modelValue"
        :style="{ width:p.itemwidth?p.itemwidth:`calc(${100 / row }% - 10px)` }" v-bind="p" ></component>
      <transition>
        <template v-for="(value, name) in $slots" #[name]="scope">
          <slot :name="name" v-bind="scope" :key="name" :change="onChange" :state="disabled"></slot>
        </template>
      </transition>
    </n-flex>
  </n-form>
</template>

<script lang="ts" setup>
import MyInput from "./MyInput/index.vue"
import MyCheck from "./MyCheck/index.vue"
import MySelect from "./MySelect/index.vue"
import MyDate from "./MyDete/index.vue";
import MyRadio from "./MyRadio/index.vue";
import MyButton from "./MyButton/index.vue"
const type: any = {
  input: MyInput,
  check: MyCheck,
  select: MySelect,
  date: MyDate,
  radio: MyRadio,
}

const disabled = ref(false)
defineProps({
  modelValue: {
    type: Object,
    default: void 0
  },
  itemList: {
    type: Array,
    default: () => []
  },
  row: {
    type: Number,
    default: 1
  },
  inline: {
    type: Boolean,
    default: false
  }

})
const formRef = ref<any>()

const onChange = () => {
  disabled.value = !disabled.value
}
const validate = () => {
  return formRef.value.validate
}
defineExpose({
  validate,
  disabled
})



</script>

<style scoped>

</style>
