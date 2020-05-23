<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">{{title}}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section>
      <div class="row q-col-gutter-sm">
        <div class="col-12">
          <qvt-date v-model="form.date" />
        </div>

        <div class="col-12">
          <qvt-input v-model="form.amount" label="金額" type="number" prefix="￥" />
        </div>

        <div class="col-12">
          <qvt-select v-model="form.type" label="種類" :options="typeOptions" />
        </div>
      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn class="full-width" color="primary" :disable="loading" label="登録" @click="emitAdd()" />
    </q-card-actions>
  </q-card>
</template>

<script>
import qvtDate from '../Form/QvtDate'
import qvtInput from '../Form/QvtInput'
import qvtSelect from '../Form/QvtSelect'

export default {
  data () {
    return {
      form: {
        date: '2020/05/21',
        amount: '',
        type: ''
      },
      typeOptions: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
    }
  },
  components: {
    qvtDate,
    qvtInput,
    qvtSelect
  },
  props: {
    loading: {
      type: Boolean,
      required: false
    },
    title: {
      type: String,
      required: false,
      default: '新規登録'
    }
  },
  methods: {
    emitAdd () {
      this.$emit('add')
    }
  }
}
</script>
