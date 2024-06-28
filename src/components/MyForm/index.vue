<template>
  <div class="aaa">
    <n-form style="width: 100%;flex-wrap: wrap;" ref="formRef" :model="modelValue" :disabled="disabled" v-bind="$attrs">
      <n-flex wrap>
      <component v-for="(p, i) in itemList" :key="i" :is="type[(p as any).type]" :value="modelValue"
        :style="{width:`${100/row-0.5}%`}" :label="(p as any).label" :options="(p as any).options" :rules="(p as any).rules" :path="(p as any).path"
        :placeholder="(p as any).placeholder"></component>
        <transition>
        <template v-for="(value, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope" :key="name" :change="onChange" :state="disabled"></slot>
        </template>
      </transition>
      </n-flex>
    </n-form>

  </div>
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
interface Attr {
  name: string
}
// let { proxy } = getCurrentInstance() as any
const disabled = ref(false)
const attr = useAttrs<Attr>()
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

<style scoped></style>
