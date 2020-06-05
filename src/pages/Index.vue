<template>
  <div class="q-pa-md">
    <q-card style="max-width: 600px;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-subtitle1">{{date}}</div>
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
  </div>
</template>

<script>
import qvtInput from '../components/Form/QvtInput'
import { date } from 'quasar'

export default {
  name: 'PageIndex',
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
      item: {},
      errors: {}
    }
  },

  created () {
    var params = {
      before_date: date.formatDate(Date.now(), 'YYYY/MM/DD'),
      after_date: date.formatDate(Date.now(), 'YYYY/MM/DD')
    }

    this.$axios
      .get('food/eat', { params: params })
      .then(response => {
        if (!response.data.length) {
          this.$router.replace({ name: 'eat' })
          return
        }

        this.item = response.data[0]

        if (this.item.food_point !== null) {
          this.isEdit = true
          this.form.food_point = this.item.food_point
        }

        if (this.item.menus_point.length > 0) {
          this.form.menus_point = this.item.menus_point
        }
      })
  },

  components: {
    qvtInput
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
      this.$router.replace({ name: 'eat' })
    }
  },

  computed: {
    date () {
      return date.formatDate(new Date(this.item.date), 'YYYY/MM/DD')
    }
  }
}
</script>
