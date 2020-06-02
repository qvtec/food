<template>
  <q-input
    outlined
    dense
    v-model="inputValue"
    :label="label"
    :type="type"
    :placeholder="placeholder"
    :prefix="prefix"
    :readonly="readonly"
  >
    <template v-slot:before v-if="beforeIcon.length>0">
      <q-btn round dense flat :icon="beforeIcon" />
    </template>
    <template v-slot:prepend v-if="preIcon.length>0">
      <q-icon :name="preIcon" />
    </template>
    <template v-slot:after v-if="afterIcon.length>0">
      <q-btn round dense flat :icon="afterIcon" @click="afterIconClick" />
    </template>
  </q-input>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: { type: String, required: false },
    label: { type: String, required: false },
    type: { type: String, required: false, default: 'text' },
    placeholder: { type: String, required: false, default: '' },
    prefix: { type: String, required: false, default: '' },
    preIcon: { type: String, required: false, default: '' },
    beforeIcon: { type: String, required: false, default: '' },
    afterIcon: { type: String, required: false, default: '' },
    readonly: { type: Boolean, required: false, default: false }
  },
  methods: {
    afterIconClick () {
      this.$emit('afterIconClick')
    }
  },
  computed: {
    inputValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
