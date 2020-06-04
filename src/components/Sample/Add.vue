<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div v-if="editId==0" class="text-h6">新規登録</div>
      <div v-else class="text-h6">編集</div>
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
      <q-btn v-if="editId==0" class="full-width" color="primary" :disable="loading" label="登録" @click="emitAdd()" />
      <q-btn v-else class="full-width" color="primary" :disable="loading" label="編集" @click="emitEdit(editId)" />
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
      typeOptions: [
        { label: '和食', value: 1 },
        { label: '洋食', value: 2 },
        { label: '中華', value: 3 },
        { label: 'イタリアン', value: 4 },
        { label: '韓国料理', value: 5 },
        { label: 'アジア料理', value: 6 },
        { label: 'その他', value: 7 }
      ]
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
    editId: {
      type: Number,
      required: false,
      default: 0
    }
  },
  methods: {
    emitAdd () {
      this.$emit('add')
    },
    emitEdit (id) {
      this.$emit('edit', id)
    }
  }
}
</script>
