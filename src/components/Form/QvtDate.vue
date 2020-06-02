<template>
  <q-input outlined dense v-model="date" mask="date">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <q-date
            today-btn
            :locale="myLocale"
            v-model="date"
            :options="options"
            @input="() => $refs.qDateProxy.hide()" />
        </q-popup-proxy>
      </q-icon>
    </template>
    <template v-slot:after v-if="rangeBefore">
      <q-icon dense name="navigate_next" />
    </template>
  </q-input>
</template>

<script>
export default {
  data () {
    return {
      myLocale: {
        days: '日曜_月曜_火曜_水曜_木曜_金曜_土曜'.split('_'),
        daysShort: '日_月_火_水_木_金_土'.split('_'),
        months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        monthsShort: '1/_2/_3/_4/_5/_6/_7/_8/_9/_10/_11/_12/'.split('_'),
        firstDayOfWeek: 1
      }
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: { type: String, required: false },
    rangeBefore: { type: Boolean, required: false, default: false },
    options: { type: Function, required: false }
  },
  computed: {
    date: {
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
