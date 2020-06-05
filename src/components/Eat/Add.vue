<template>
  <q-card style="max-width: 600px;">
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
            v-model="form.food_point.amount_point"
            :min="-3"
            :max="3"
            markers
            snap
            label
            label-always
            style="min-width: 160px;"
          />
        </q-item-section>
        <q-item-section side>
          <q-icon name="restaurant" size="lg" />
        </q-item-section>
      </q-item>

      <div v-for="(menu, key) in item.menus_point" :key="key">
        <div>{{ menu.name }}</div>
        <q-rating size="2.5em" v-model="form.menus_point[key].point" max="5" color="primary" icon="star_border" icon-selected="star" />
      </div>
    </q-card-section>

    <q-card-section>
      <qvt-input v-model="form.food_point.memo" label="メモ" type="textarea" :errors="errors.memo" />
    </q-card-section>

    <q-card-actions>
      <q-btn v-if="!isEdit" class="full-width" color="accent" :disable="loading" label="登録" @click="edit" />
      <q-btn v-else class="full-width" color="secondary" :disable="loading" label="編集" @click="edit" />
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
        food_point: {
          amount_point: 0,
          memo: ''
        },
        menus_point: []
      },
      isEdit: false,
      errors: {}
    }
  },

  created () {
    if (this.item.food_point !== null) {
      this.isEdit = true
      this.form.food_point = this.item.food_point
    }

    if (this.item.menus_point.length > 0) {
      this.form.menus_point = this.item.menus_point
    }
  },

  components: {
    qvtInput
  },

  props: {
    item: {
      type: Object,
      required: false,
      default: null
    }
  },

  methods: {
    edit () {
      this.loading = true

      this.$axios
        .put('food/eat/' + this.item.id, this.form)
        .then((response) => {
          this.editComplete()
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        })
        .finally(() => { this.loading = false })
    },

    editComplete () {
      this.$q.notify({
        type: 'positive',
        message: 'ごちそうさまでした'
      })
      this.$emit('update')
    }
  },

  computed: {
    date () {
      return date.formatDate(new Date(this.item.date), 'YYYY/MM/DD')
    }
  }
}
</script>
