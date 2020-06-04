<template>
  <q-select
    outlined
    dense
    v-model="selected"
    hide-selected
    use-input
    fill-input
    input-debounce="0"
    :options="options"
    :label="label"
    @filter="filterFn"
    map-options
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:append>
      <q-icon name="close" @click.stop="selected = ''" class="cursor-pointer" />
    </template>
  </q-select>
</template>

<script>
export default {
  data () {
    return {
      options: this.$store.state.master.menuOptions
    }
  },

  created () {
    if (!this.$store.state.master.menuOptions) {
      this.$store.dispatch('master/menuOptions')
    }
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: { type: Number, required: false },
    label: { type: String, required: true }
  },

  computed: {
    selected: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('change', val.value)
      }
    }
  },

  methods: {
    filterFn (val, update, abort) {
      if (val.length < 2) {
        abort()
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        var stringOptions = this.$store.state.master.menuOptions
        this.options = stringOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>
