<template>
  <q-card flat bordered style="max-width: 600px">
    <q-card-section>
      <div class="row q-col-gutter-sm">

        <div class="col-sm-12 col-lg-6">
          <qvt-date v-model="form.beforeDate" :options="options" />
        </div>
        <div class="col-sm-12 col-lg-6">
          <q-btn color="primary" :disable="loading" label="Search" @click="emitSearch()" icon="search" />
        </div>

      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import qvtDate from '../Form/QvtDate'
import { date } from 'quasar'

export default {
  data () {
    return {
      form: {
        email: '',
        beforeDate: ''
      }
    }
  },

  mounted () {
    var now = new Date()
    var monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1)
    this.form.beforeDate = date.formatDate(monday, 'YYYY/MM/DD')
    this.$parent.searchDay = this.form.beforeDate
    this.$emit('search')
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
    options (date) {
      return new Date(date).getDay() === 1
    },

    emitSearch () {
      this.$emit('search')
    }
  }
}
</script>
