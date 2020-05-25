<template>
  <q-select
    outlined
    dense
    v-model="selected"
    :options="options"
    stack-label
    :label="label"
  >
    <template v-slot:append>
      <q-icon name="close" @click.stop="selected = ''" class="cursor-pointer" />
    </template>
  </q-select>
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
