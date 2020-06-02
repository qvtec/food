<template>
  <div>
    <q-card flat bordered class="q-mt-md" style="max-width: 600px">
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
            <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg">
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
                @click="emitOpenEdit(props.row.id)"
              />
              <div  v-for="col in props.cols.filter(col => col.name !== 'date' && col.value.length>0)" :key="col.name">
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
        beforeDate: date.formatDate(Date.now(), 'YYYY/MM/DD'),
        afterDate: date.formatDate(Date.now(), 'YYYY/MM/DD')
      },
      items: {
        filter: '',
        pagination: {
          sortBy: 'desc',
          descending: false,
          page: 1,
          rowsPerPage: 0
        },
        selected: [],
        visibleColumns: [
          'date', 'menu1', 'menu2', 'menu3', 'menu4', 'menu5'
        ],
        columns: [
          {
            name: 'date',
            required: true,
            label: '日付',
            align: 'left',
            field: row => row.date,
            format: val => `${val}`,
            sortable: true
          },
          { name: 'menu1', label: 'メニュー1', field: 'menu1', sortable: true },
          { name: 'menu2', label: 'メニュー2', field: 'menu2', sortable: true },
          { name: 'menu3', label: 'メニュー3', field: 'menu3', sortable: true },
          { name: 'menu4', label: 'メニュー4', field: 'menu4', sortable: true },
          { name: 'menu5', label: 'メニュー5', field: 'menu5', sortable: true }
        ],
        data: [
          {
            id: 1,
            date: '2020/05/23',
            menu1: '鶏皮甘辛焼き',
            menu2: 'サツマイモ餅',
            menu3: '無限ズッキーニ',
            menu4: '鶏皮甘辛焼き',
            menu5: '無限ズッキーニ'
          },
          {
            id: 2,
            date: '2020/05/23',
            menu1: '鶏皮甘辛焼き',
            menu2: 'サツマイモ餅',
            menu3: '無限ズッキーニ',
            menu4: '',
            menu5: ''
          },
          {
            id: 3,
            date: '2020/05/23',
            menu1: '鶏皮甘辛焼き',
            menu2: '',
            menu3: '無限ズッキーニ',
            menu4: '',
            menu5: ''
          },
          {
            id: 4,
            date: '2020/05/23',
            menu1: '鶏皮甘辛焼き',
            menu2: 'サツマイモ餅',
            menu3: '',
            menu4: '',
            menu5: ''
          }
        ]
      }
    }
  },
  mounted () {
    // axios
    //   .post('food/list', this.form)
    //   .then(response => {
    //     this.items = response.data.items
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     this.errored = true
    //   })
    //   .finally(() => this.loading = false)
  },
  components: {
    qvtDate,
    qvtSpinner
  },
  methods: {
    emitOpenEdit (id) {
      this.$emit('openEdit', id)
    },
    search () {
      this.loading = true
      setTimeout(() => {
        // axios
        //   .post('food/list', this.form)
        //   .then(response => {
        //     this.items = response.data.items
        //   })
        //   .catch(error => {
        //     console.log(error)
        //     this.errored = true
        //   })
        //   .finally(() => this.loading = false)
        this.loading = false
      }, 500)
    }
  }
}
</script>
