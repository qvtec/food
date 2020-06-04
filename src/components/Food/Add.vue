<template>
  <q-card flat bordered class="q-mt-md" style="max-width: 600px">
    <q-card-section>
      <div class="row q-col-gutter-sm">

        <div class="col-sm-12 col-lg-6">
          <qvt-date v-model="form.date" :errors="errors.date" />
        </div>

        <div class="col-12">
          <q-uploader
            :label="uploader.label"
            :color="uploader.color"
            :factory="factoryFn"
            auto-upload
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
      <q-btn v-if="editId==0" class="full-width" color="accent" :disable="loading" label="登録" @click="add" />
      <q-btn v-else class="full-width" color="secondary" :disable="loading" label="編集" @click="edit(editId)" />
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
      errors: {}
    }
  },

  mounted () {
    if (this.editId === 0) {
      return
    }

    this.loading = true

    this.$axios
      .get('food/main/' + this.editId)
      .then(response => {
        console.log(response.data)
        var data = response.data
        this.form.date = date.formatDate(new Date(data.date), 'YYYY/MM/DD')
        this.form.picture = data.picture
        this.form.memo = data.memo
        this.form.menu_ids = data.menu_ids
      })
      .catch(error => { console.log(error.response) })
      .finally(() => { this.loading = false })
  },

  components: {
    qvtInput,
    qvtDate,
    menuSelect
  },

  props: {
    editId: {
      type: Number,
      required: false,
      default: 0
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
          console.log(response.data)
          this.$emit('close')
        })
        .catch((error) => {
          console.log(error.response.data.errors)
          this.errors = error.response.data.errors

          if (Object.keys(this.errors).indexOf('picture') >= 0) {
            this.uploader.color = 'accent'
            this.uploader.label += ' ※' + this.errors.picture[0]
          }
        })
        .finally(() => { this.loading = false })
    },

    edit (id) {
      this.loading = true

      // @todo 更新処理
      this.$axios
        .put('food/main/' + id, this.form)
        .then((response) => {
          console.log(response.data)
          this.$emit('close')
        })
        .catch((error) => {
          console.log(error.response.data.errors)
          this.errors = error.response.data.errors

          if (Object.keys(this.errors).indexOf('picture') >= 0) {
            this.uploader.color = 'accent'
            this.uploader.label += ' ※' + this.errors.picture[0]
          }
        })
        .finally(() => { this.loading = false })
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
