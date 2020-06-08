<template>
  <q-card flat bordered class="q-mt-md" style="max-width: 600px">
    <q-card-section>
      <div class="row q-col-gutter-sm">

        <div class="col-sm-12 col-lg-6">
          <qvt-date v-model="form.date" :errors="errors.date" />
        </div>

        <div class="col-12" v-if="isEdit">
          <q-img :src="form.path" style="max-width: 250px" />
        </div>

        <div class="col-12">
          <q-uploader
            :label="uploader.label"
            :color="uploader.color"
            :factory="factoryFn"
            auto-upload
            flat
            bordered
            style="max-width: 250px"
          />
        </div>

        <div class="col-12">
          <menu-select v-model="form.menu_ids[0]" label="献立1" />
        </div>

        <div class="col-12">
          <menu-select v-model="form.menu_ids[1]" label="献立2" />
        </div>

        <div class="col-12">
          <menu-select v-model="form.menu_ids[2]" label="献立3" />
        </div>

        <div class="col-12">
          <menu-select v-model="form.menu_ids[3]" label="献立4" />
        </div>

        <div class="col-12">
          <menu-select v-model="form.menu_ids[4]" label="献立5" />
        </div>

        <div class="col-12">
          <q-btn color="secondary" :disable="loading" label="献立追加" @click="addMenuOpen" />
        </div>

        <div class="col-12">
          <qvt-input v-model="form.memo" label="メモ" type="textarea" :errors="errors.memo" />
        </div>

      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn v-if="!isEdit" class="full-width" color="accent" :disable="loading" label="登録" @click="add" />
      <q-btn v-else class="full-width" color="secondary" :disable="loading" label="編集" @click="edit" />
    </q-card-actions>
  </q-card>
</template>

<script>
import qvtDate from '../Form/QvtDate'
import qvtInput from '../Form/QvtInput'
import menuSelect from './MenuSelect'
import { date } from 'quasar'

export default {
  data () {
    return {
      loading: false,
      form: {
        date: date.formatDate(Date.now(), 'YYYY/MM/DD'),
        picture: '',
        memo: '',
        menu_ids: this.menuIds
      },
      uploader: {
        color: 'primary',
        label: '画像'
      },
      isEdit: false,
      errors: {}
    }
  },

  created () {
    if (Object.keys(this.item).length > 0) {
      this.isEdit = true
      this.form = this.item
    }
  },

  components: {
    qvtInput,
    qvtDate,
    menuSelect
  },

  props: {
    item: {
      type: Object,
      required: false
    },
    menuIds: {
      type: Array,
      required: false
    }
  },

  methods: {
    add () {
      this.loading = true

      this.$axios
        .post('food/main', this.form)
        .then((response) => {
          this.complete()
        })
        .catch((error) => {
          this.fail(error)
        })
        .finally(() => { this.loading = false })
    },

    edit () {
      this.loading = true

      this.$axios
        .put('food/main/' + this.item.id, this.form)
        .then((response) => {
          this.complete()
        })
        .catch((error) => {
          this.fail(error)
        })
        .finally(() => { this.loading = false })
    },

    complete () {
      this.$q.notify({
        type: 'positive',
        message: '登録完了しました'
      })
      this.$emit('close')
    },

    fail (error) {
      this.errors = error.response.data.errors

      if (Object.keys(this.errors).indexOf('picture') >= 0) {
        this.uploader.color = 'accent'
        this.uploader.label += ' ※' + this.errors.picture[0]
      }

      this.$q.notify({
        type: 'negative',
        message: '入力内容を確認してください'
      })
    },

    factoryFn (file) {
      const fd = new FormData()
      fd.append('file', file[0])

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }

      this.$axios.post(process.env.API_URL + 'food/main/upload-tmp', fd, config)
        .then(res => {
          this.form.picture = res.data
        })
        .catch((error) => { console.log(error) })
    },

    addMenuOpen () {
      this.$emit('openMenuAdd')
    }
  }
}
</script>
