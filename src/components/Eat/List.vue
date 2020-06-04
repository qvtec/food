<template>
  <div>
    <q-card flat bordered class="q-mt-md" style="max-width: 600px">
      <q-card-section>
        <div class="row q-col-gutter-sm">

          <div class="col-sm-12 col-lg-6">
            <qvt-date v-model="form.before_date" :errors="errors.before_date" :rangeBefore="true" />
          </div>
          <div class="col-sm-12 col-lg-6">
            <qvt-date v-model="form.after_date" :errors="errors.after_date" />
          </div>

        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn class="full-width" color="primary" :disable="loading" label="Search" @click="search" icon="search" />
      </q-card-actions>
    </q-card>

    <q-table
      title=""
      grid
      flat
      bordered
      :data="items.data"
      :columns="items.columns"
      row-key="id"
      :filter="items.filter"
      :loading="loading"
      :pagination.sync="items.pagination"
      :visible-columns="items.visibleColumns"
    >

      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="items.filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <q-card flat bordered>
            <q-img :src="props.row.path">
              <div class="absolute-bottom text-subtitle2">
                {{ props.row.date }}
              </div>
            </q-img>
            <q-card-section>
              <q-btn
                fab
                color="secondary"
                icon="edit"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%);"
                @click="openAdd(props.row)"
              />
              <div v-for="col in props.cols.filter(col => col.name !== 'date')" :key="col.name">
                {{ col.value }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn flat round color="red" icon="favorite" />
              <q-btn flat round color="teal" icon="bookmark" />
              <q-btn flat round color="primary" icon="share" />
            </q-card-actions>
          </q-card>
        </div>
      </template>

      <template v-slot:loading>
        <qvt-spinner />
      </template>
    </q-table>
  </div>
</template>

<script>
import qvtDate from '../Form/QvtDate'
import qvtSpinner from '../Common/QvtSpinner'
import { date } from 'quasar'

export default {
  data () {
    return {
      loading: false,
      form: {
        before_date: date.formatDate(Date.now(), 'YYYY/MM/01'),
        after_date: date.formatDate(Date.now(), 'YYYY/MM/DD')
      },
      errors: {},
      items: {
        filter: '',
        pagination: {
          sortBy: 'desc',
          descending: false,
          page: 1,
          rowsPerPage: 0
        },
        visibleColumns: [
          'date', 'menu1', 'menu2', 'menu3', 'menu4', 'menu5'
        ],
        columns: [
          { name: 'date', field: 'date', sortable: true },
          { name: 'menu1', field: 'menu1', sortable: true },
          { name: 'menu2', field: 'menu2', sortable: true },
          { name: 'menu3', field: 'menu3', sortable: true },
          { name: 'menu4', field: 'menu4', sortable: true },
          { name: 'menu5', field: 'menu5', sortable: true }
        ],
        data: []
      }
    }
  },

  mounted () {
    this.search()
  },

  components: {
    qvtDate,
    qvtSpinner
  },

  methods: {
    openAdd (item) {
      this.$emit('openAdd', item)
    },

    search () {
      this.loading = true

      this.$axios
        .get('food/main', { params: this.form })
        .then(response => {
          console.log(response.data)
          this.items.data = response.data
        })
        .catch(error => {
          console.log(error.response.data.errors)
          this.errors = error.response.data.errors
        })
        .finally(() => { this.loading = false })
    }
  }
}
</script>
