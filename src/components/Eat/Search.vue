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

      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn class="full-width" color="primary" :disable="loading" label="Search" @click="emitSearch()" icon="search" />
    </q-card-actions>
  </q-card>
</template>

<script>
import qvtDate from '../Form/QvtDate'
import { date } from 'quasar'

export default {
  data () {
    var now = Date.now()
    var date1 = date.formatDate(now, 'YYYY/MM/01')
    var date2 = date.addToDate(date1, { month: 1 })
    date2 = date.subtractFromDate(date2, { days: 1 })
    date2 = date.formatDate(date2, 'YYYY/MM/DD')
    return {
      form: {
        beforeDate: date1,
        afterDate: date2
      }
    }
  },
  components: {
    qvtDate
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
