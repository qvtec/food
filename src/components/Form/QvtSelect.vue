<template>
  <q-select
    outlined
    dense
    v-model="selected"
    :options="options"
    stack-label
    :label="label"
  />
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: { type: String, required: false },
    label: { type: String, required: true },
    options: { type: Array, required: true, default () { return [] } }
  },
  computed: {
    selected: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('change', val)
      }
    }
  }
}
</script>
