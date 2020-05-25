<template>
  <q-card style="min-width: 300px">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-subtitle1">{{form.date}}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section>
      <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />
    </q-card-section>

    <q-card-section>
      <q-item class="q-pa-none">
        <q-item-section side>
          <q-icon name="restaurant" size="xs" />
        </q-item-section>
        <q-item-section>
          <q-slider
            v-model="form.amount_rate"
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

      <div>{{ items.menu1 }}</div>
      <q-rating size="2.0em" v-model="form.menu1_point" :max="5" color="primary" icon="star_border" icon-selected="star" />
      <div>{{ items.menu2 }}</div>
      <q-rating size="2.0em" v-model="form.menu2_point" :max="5" color="primary" icon="star_border" icon-selected="star" />
      <div>{{ items.menu3 }}</div>
      <q-rating size="2.0em" v-model="form.menu3_point" :max="5" color="primary" icon="star_border" icon-selected="star" />
    </q-card-section>

    <q-card-section>
      <qvt-input v-model="form.memo" label="メモ" type="textarea" />
    </q-card-section>

    <q-card-actions>
      <q-btn class="full-width" color="primary" :disable="loading" label="登録" @click="emitAdd(items.id)" />
    </q-card-actions>
  </q-card>
</template>

<script>
import qvtInput from '../Form/QvtInput'

export default {
  data () {
    return {
      form: {
        date: '2020/05/21',
        memo: '',
        amount_rate: 0,
        menu1_point: 3,
        menu2_point: 5,
        menu3_point: 0,
        menu4_point: 0,
        menu5_point: 0
      },
      items: {
        id: 1,
        date: '2020/05/23',
        menu1: '鶏皮甘辛焼き',
        menu2: 'サツマイモ餅',
        menu3: '無限ズッキーニ',
        menu4: '',
        menu5: '',
        menu1_point: 3,
        menu2_point: 3,
        menu3_point: 3,
        menu4_point: 0,
        menu5_point: 0
      }
    }
  },
  components: {
    qvtInput
  },
  props: {
    loading: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    emitAdd (id) {
      this.$emit('edit', id)
    }
  }
}
</script>
