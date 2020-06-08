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
            <q-img :src="props.row.path" @click="openPicture(props.row.path)">
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
                @click="clickEdit(props.row)"
              />
              <div v-for="menu in props.row.menus" :key="menu.id">
                {{ menu.name }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn flat round color="red" icon="favorite" />
              <q-btn flat round color="teal" icon="bookmark" />
              <q-btn flat round color="primary" icon="share" />
              <q-btn flat round color="blue-grey" icon="delete" @click="clickDel(props.row.id)" />
            </q-card-actions>
          </q-card>
        </div>
      </template>

      <template v-slot:loading>
        <qvt-spinner />
      </template>
    </q-table>

    <q-dialog v-model="pictureDialog">
      <q-img :src="path" />
    </q-dialog>
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
        columns: [
          { name: 'date', field: 'date', sortable: true },
          { name: 'menus', field: 'menus', sortable: true }
        ],
        data: []
      },
      pictureDialog: false,
      path: ''
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
    clickEdit (row) {
      this.$emit('showEdit', row)
    },

    clickDel (id) {
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
        .get('food/main', { params: this.form })
        .then(response => {
          this.items.data = response.data
        })
        .catch(error => {
          this.errors = error.response.data.errors
        })
        .finally(() => { this.loading = false })
    },

    delete (id) {
      this.loading = true

      this.$axios
        .delete('food/main/' + id)
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
    },

    openPicture (path) {
      this.pictureDialog = true
      this.path = path
    }
  }
}
</script>
