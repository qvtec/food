<template>
  <q-card>
    <q-card-section class="row items-center bg-secondary text-white">
      <div v-if="editId==0" class="text-h6">新規登録</div>
      <div v-else class="text-h6">編集</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section>
      <div class="row q-col-gutter-sm">
        <div class="col-12">
          <qvt-input v-model="form.name" label="名前" :errors="errors.name" />
        </div>

        <div class="col-12">
          <qvt-input v-model="form.url" label="URL" preIcon="link" type="url" afterIcon="search" :errors="errors.url" />
        </div>

        <div class="col-12">
          <qvt-input v-model="form.subname" label="" :readonly="true" :errors="errors.subname" />
        </div>

        <div v-for="n of 6" :key="n" class="col-xs-6 col-sm-4 col-lg-3">
          <qvt-input v-model="form.materials[n-1]" :errors="errors.materials" />
        </div>

        <div class="col-12">
          <qvt-select v-model="form.category_id" label="種類" :options="categoryOptions" :errors="errors.category_id" />
        </div>

        <div class="col-12">
          <q-rating
            v-model="form.point"
            size="2.5em"
            color="primary"
            icon="star_border"
            icon-selected="star"
          />
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
import qvtInput from '../Form/QvtInput'
import qvtSelect from '../Form/QvtSelect'

export default {
  data () {
    return {
      loading: false,
      form: {
        name: '',
        url: '',
        subname: '',
        materials: [],
        category_id: '',
        point: 0,
        memo: ''
      },
      categoryOptions: this.$store.state.master.categoryOptions,
      errors: {}
    }
  },

  created () {
    if (!this.$store.state.master.categoryOptions) {
      this.$store.dispatch('master/categoryOptions')
    }
  },

  mounted () {
    if (this.editId === 0) {
      return
    }

    this.loading = true

    this.$axios
      .get('food/menu/' + this.editId)
      .then(response => {
        this.form = response.data
      })
      .catch(error => { console.log(error.response) })
      .finally(() => { this.loading = false })
  },

  components: {
    qvtInput,
    qvtSelect
  },

  props: {
    editId: {
      type: Number,
      required: false,
      default: 0
    }
  },

  methods: {
    add () {
      this.loading = true

      this.$axios
        .post('food/menu', this.form)
        .then((response) => {
          this.complete()
          this.$emit('add', response.data.id)
        })
        .catch((error) => {
          this.fail(error)
        })
        .finally(() => { this.loading = false })
    },

    edit (id) {
      this.loading = true

      this.$axios
        .put('food/menu/' + id, this.form)
        .then((response) => {
          this.complete()
          this.$emit('edit', id)
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
      this.$store.dispatch('master/menuOptions')
    },

    fail (error) {
      this.errors = error.response.data.errors
      this.$q.notify({
        type: 'negative',
        message: '入力内容を確認してください'
      })
    }
  }
}
</script>
