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
    selection="multiple"
    :selected.sync="items.selected"
    :visible-columns="items.visibleColumns"
    separator="cell"
  >

    <template v-slot:top>
      <q-btn color="primary" :disable="loading" label="Add" @click="emitOpenAdd()" icon="add_circle" />

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

    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th auto-width />
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <q-btn
            size="sm"
            :color="props.expand ? 'accent' : 'secondary'"
            round
            dense
            @click="props.expand = !props.expand"
            :icon="props.expand ? 'remove' : 'add'" />
        </q-td>
        <q-td v-for="col in props.cols.filter(col => col.name !== 'url')" :key="col.name" :props="props">
          {{ col.value }}
        </q-td>
        <q-td v-for="col in props.cols.filter(col => col.name === 'url')" :key="col.name" :props="props">
          <q-btn round color="primary" type="a" :href="props.row.url" target="_blank" icon="launch" />
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <q-btn class="q-ml-sm" label="Edit" color="positive" @click="emitOpenEdit(props.row.id)" icon="create" />
          <q-btn class="q-ml-sm" label="Delete" color="negative" @click="deleteConfirm(props.row.id)" icon="delete_forever" />
        </q-td>
      </q-tr>
    </template>

    <template v-slot:loading>
      <qvt-spinner />
    </template>
  </q-table>
</template>

<script>
import qvtSpinner from '../Common/QvtSpinner'

export default {
  data () {
    return {
      loading: false,
      categoryOptions: this.$store.state.master.categoryOptions,
      items: {
        filter: '',
        pagination: {
          sortBy: 'desc',
          descending: false,
          page: 1,
          rowsPerPage: 0
        },
        visibleColumns: [
          'name', 'point', 'materials', 'category', 'memo', 'url'
        ],
        columns: [
          { name: 'name', label: 'メニュー', field: 'name', sortable: true },
          { name: 'point', label: 'ポイント', field: 'point', sortable: true },
          {
            name: 'materials',
            label: '材料',
            field: 'materials',
            format: val => `${val.join(',')}`,
            sortable: true
          },
          { name: 'category', label: '種類', field: 'category', sortable: true },
          { name: 'memo', label: 'メモ', field: 'memo', sortable: true },
          { name: 'url', label: 'URL', field: 'url', sortable: true }
        ],
        data: []
      }
    }
  },

  created () {
    if (!this.$store.state.master.categoryOptions) {
      this.$store.dispatch('master/categoryOptions')
    }
  },

  mounted () {
    this.search()
  },

  components: {
    qvtSpinner
  },

  methods: {
    emitOpenAdd () {
      this.$emit('openAdd')
    },

    emitOpenEdit (id) {
      this.$emit('openEdit', id)
    },

    deleteConfirm (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: '削除しますか?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.delete(id)
      })
    },

    search () {
      this.loading = true

      this.$axios
        .get('food/menu', { params: this.form })
        .then(response => {
          this.items.data = response.data
        })
        .catch(error => { console.log(error.response.data.errors) })
        .finally(() => { this.loading = false })
    },

    delete (id) {
      this.loading = true

      this.$axios
        .delete('food/menu/' + id)
        .then(response => {
          this.deleteComplete()
        })
        .catch(error => { console.log(error.response.data.errors) })
        .finally(() => { this.loading = false })
    },

    deleteComplete () {
      this.$q.notify({
        type: 'positive',
        message: '削除しました'
      })
      this.search()
    }
  }
}
</script>
