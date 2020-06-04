<template>
  <q-card style="min-width: 300px">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-subtitle1">{{date}}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section>
      <q-img :src="item.path" />
    </q-card-section>

    <q-card-section>
      <q-item class="q-pa-none">
        <q-item-section side>
          <q-icon name="restaurant" size="xs" />
        </q-item-section>
        <q-item-section>
          <q-slider
            v-model="form.amount_point"
            :min="-3"
            :max="3"
            markers
            snap
            label
            label-always
          />
        </q-item-section>
        <q-item-section side>
          <q-icon name="restaurant" size="lg" />
        </q-item-section>
      </q-item>

      <div v-for="(menu, key) in item.menus" :key="key">
        <div>{{ menu.name }}</div>
        <q-rating size="2.0em" v-model="form.menu_points[key]" max="5" color="primary" icon="star_border" icon-selected="star" />
      </div>
    </q-card-section>

    <q-card-section>
      <qvt-input v-model="form.memo" label="メモ" type="textarea" :errors="errors.memo" />
    </q-card-section>

    <q-card-actions>
      <q-btn v-if="editId==0" class="full-width" color="accent" :disable="loading" label="登録" @click="add" />
      <q-btn v-else class="full-width" color="secondary" :disable="loading" label="編集" @click="edit(editId)" />
    </q-card-actions>
  </q-card>
</template>

<script>
import qvtInput from '../Form/QvtInput'
import { date } from 'quasar'

export default {
  data () {
    return {
      loading: false,
      form: {
        memo: '',
        amount_point: 0,
        menu_points: [0, 0, 0, 0, 0]
      },
      errors: {}
    }
  },

  mounted () {
    if (this.editId === 0) {
      return
    }

    this.loading = true

    // @todo pointデータ取得API
    this.$axios
      .get('food/eat/' + this.editId)
      .then(response => {
        console.log(response.data)
        // var data = response.data
        // this.form.date = date.formatDate(new Date(data.date), 'YYYY/MM/DD')
        // this.form.picture = data.picture
        // this.form.memo = data.memo
        // this.form.menu_ids = data.menu_ids
      })
      .catch(error => { console.log(error.response) })
      .finally(() => { this.loading = false })
  },

  components: {
    qvtInput
  },

  props: {
    editId: {
      type: Number,
      required: false,
      default: 0
    },
    item: {
      type: Object,
      required: false
    }
  },

  methods: {
    add () {
      this.loading = true

      var data = {
        food_id: this.item.id,
        memo: this.form.memo,
        amount_point: this.form.amount_point,
        menus: this.item.menus,
        menu_points: this.form.menu_points
      }

      this.$axios
        .post('food/eat', data)
        .then((response) => {
          console.log(response.data)
          this.$emit('close')
        })
        .catch((error) => {
          console.log(error.response.data.errors)
          this.errors = error.response.data.errors
        })
        .finally(() => { this.loading = false })
    },

    edit (id) {
      this.loading = true

      // @todo 更新処理
      this.$axios
        .put('food/eat/' + id, this.form)
        .then((response) => {
          console.log(response.data)
          this.$emit('close')
        })
        .catch((error) => {
          console.log(error.response.data.errors)
          this.errors = error.response.data.errors
        })
        .finally(() => { this.loading = false })
    }
  },

  computed: {
    date () {
      return date.formatDate(new Date(this.item.date), 'YYYY/MM/DD')
    }
  }
}
</script>
