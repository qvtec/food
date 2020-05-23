<template>
  <div class="q-pa-md">

    <SampleSearch :loading="this.loading" @search="search()" />

    <SampleList :items="this.items" :loading="this.loading" @openEdit="openEdit" />

    <q-dialog v-model="addDialog">
      <SampleAdd :loading="this.loading" @edit="edit" />
    </q-dialog>

  </div>
</template>

<script>
import SampleList from '../components/Food/List'
import SampleAdd from '../components/Food/Add'
import SampleSearch from '../components/Food/Search'

export default {
  name: 'PageIndex',
  data () {
    return {
      loading: false,
      addDialog: false,
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
  components: {
    SampleList,
    SampleAdd,
    SampleSearch
  },
  methods: {
    search () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    openEdit (id) {
      this.addDialog = true
    },
    edit (id) {
      this.loading = true
      setTimeout(() => {
        this.addDialog = false
        this.loading = false
      }, 500)
    }
  }
}
</script>
