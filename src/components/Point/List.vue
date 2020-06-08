<template>
  <q-table
    class="q-mt-md"
    title="SampleData"
    flat
    bordered
    :data="items.data"
    :columns="items.columns"
    row-key="id"
    :filter="items.filter"
    :loading="loading"
    :pagination.sync="items.pagination"
    :visible-columns="items.visibleColumns"
    separator="cell"
  >

    <template v-slot:top>
      <q-select
        class="q-ml-sm"
        v-model="items.visibleColumns"
        multiple
        outlined
        dense
        options-dense
        display-value="表示項目"
        emit-value
        map-options
        :options="items.columns"
        option-value="name"
      />

      <q-space />

      <q-input dense debounce="300" v-model="items.filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:loading>
      <qvt-spinner />
    </template>
  </q-table>
</template>

<script>
import qvtSpinner from '../Common/QvtSpinner'
import { date } from 'quasar'

export default {
  data () {
    return {
      loading: false,
      items: {
        filter: '',
        pagination: {
          sortBy: 'desc',
          descending: false,
          page: 1,
          rowsPerPage: 20
        },
        visibleColumns: [
          'date', 'menu', 'amount_point', 'point', 'memo', 'user', 'updated_at'
        ],
        columns: [
          {
            name: 'date',
            label: '日付',
            field: 'food',
            format: val => `${val.date}`,
            sortable: true
          },
          {
            name: 'menu',
            label: 'メニュー',
            field: 'menu',
            format: val => `${!val ? '' : val.name}`,
            sortable: true
          },
          { name: 'amount_point', label: '量', field: 'amount_point', sortable: true },
          { name: 'point', label: 'ポイント', field: 'point', sortable: true },
          { name: 'memo', label: 'メモ', field: 'memo', sortable: true },
          {
            name: 'user',
            label: 'ユーザ',
            field: 'user',
            format: val => `${val.name}`,
            sortable: true
          },
          {
            name: 'updated_at',
            label: '更新日時',
            field: 'updated_at',
            format: val => `${date.formatDate(new Date(val), 'YYYY/MM/DD HH:mm')}`,
            sortable: true
          }
        ],
        data: []
      }
    }
  },

  mounted () {
    this.search()
  },

  components: {
    qvtSpinner
  },

  methods: {
    search () {
      this.loading = true

      this.$axios
        .get('food/point', { params: this.form })
        .then(response => {
          this.items.data = response.data
        })
        .catch(error => { console.log(error.response.data.errors) })
        .finally(() => { this.loading = false })
    }
  }
}
</script>
