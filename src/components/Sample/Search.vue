<template>
  <q-card flat bordered style="max-width: 600px">
    <q-card-section>
      <div class="row q-col-gutter-sm">

        <div class="col-sm-12 col-lg-6">
          <qvt-date v-model="form.beforeDate" :rangeBefore="true" />
        </div>
        <div class="col-sm-12 col-lg-6">
          <qvt-date v-model="form.afterDate" />
        </div>

        <div class="col-12">
          <qvt-input v-model="form.email" label="Email" type="email" preIcon="mail" />
        </div>

        <div class="col-12">
          <q-select
            outlined
            dense
            v-model="form.type"
            multiple
            :options="typeOptions"
            use-chips
            stack-label
            label="type"
          />
        </div>

      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn class="full-width" color="primary" :disable="loading" label="Search" @click="emitSearch()" icon="search" />
    </q-card-actions>
  </q-card>
</template>

<script>
import qvtDate from '../Form/QvtDate'
import qvtInput from '../Form/QvtInput'

export default {
  data () {
    return {
      form: {
        email: '',
        beforeDate: '2020/05/01',
        afterDate: '2020/05/31',
        type: ['Facebook']
      },
      typeOptions: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
    }
  },
  components: {
    qvtDate,
    qvtInput
  },
  props: {
    loading: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    emitSearch () {
      this.$emit('search')
    }
  }
}
</script>
