<template>
  <div class="q-pa-md">
    <q-card flat bordered style="max-width: 600px">
      <q-card-section>
        <div class="row q-col-gutter-sm">

          <div class="col-sm-12 col-lg-6">
            <qvt-date v-model="form.date" />
          </div>

          <div class="col-12">
            <qvt-input v-model="form.email" label="Email" type="email" preIcon="mail" />
          </div>

          <div class="col-12">
            <q-item>
              <q-item-section side>
                <q-icon name="restaurant" size="xs" />
              </q-item-section>
              <q-item-section>
                <q-slider
                  v-model="form.amount_rate"
                  :min="0"
                  :max="10"
                  markers
                  snap
                  label
                />
              </q-item-section>
              <q-item-section side>
                <q-icon name="restaurant" size="lg" />
              </q-item-section>
            </q-item>
          </div>

          <div class="col-12">
            <qvt-input v-model="form.url" label="URL" preIcon="link" afterIcon="search" />
          </div>

          <div class="col-12">
            <q-file outlined dense v-model="form.picture" label="画像">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>

          <div class="col-12">
            <q-uploader
              :factory="factoryFn"
              flat
              bordered
              style="max-width: 300px"
            />
          </div>

          <div class="col-12">
            <q-rating
              v-model="form.rate"
              size="2.5em"
              color="primary"
              icon="star_border"
              icon-selected="star"
            />
          </div>

          <div class="col-12">
            <qvt-select v-model="form.type" label="種類" :options="typeOptions" />
          </div>

          <div class="col-12">
            <qvt-input v-model="form.memo" label="メモ" type="textarea" />
          </div>

          <div class="col-2">
            <qvt-input v-model="form.material[0]" />
          </div>
          <div class="col-2">
            <qvt-input v-model="form.material[1]" />
          </div>
          <div class="col-2">
            <qvt-input v-model="form.material[2]" />
          </div>
          <div class="col-2">
            <qvt-input v-model="form.material[3]" />
          </div>
          <div class="col-2">
            <qvt-input v-model="form.material[4]" />
          </div>
          <div class="col-2">
            <qvt-input v-model="form.material[5]" />
          </div>

        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn class="full-width" color="primary" :disable="loading" label="Add" @click="add()" icon="add" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import qvtDate from '../components/Form/QvtDate'
import qvtInput from '../components/Form/QvtInput'
import qvtSelect from '../components/Form/QvtSelect'

export default {
  data () {
    return {
      form: {
        email: '',
        date: '2020/05/01',
        type: '',
        picture: null,
        url: '',
        material: [],
        rate: 0,
        amount_rate: 5
      },
      typeOptions: [
        { label: '和食', value: 1 },
        { label: '洋食', value: 2 },
        { label: '中華', value: 3 },
        { label: 'イタリアン', value: 4 },
        { label: '韓国料理', value: 5 },
        { label: 'アジア料理', value: 6 },
        { label: 'その他', value: 7 }
      ],
      loading: false
    }
  },
  components: {
    qvtDate,
    qvtInput,
    qvtSelect
  },
  methods: {
    add () {
      this.loading = true
      console.log(this.form)
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    factoryFn (file) {
      return new Promise((resolve, reject) => {
        // Retrieve JWT token from your store.
        const token = 'myToken'
        resolve({
          url: 'http://localhost:4444/fileuploader/upload',
          method: 'POST',
          headers: [
            { name: 'Content-Type', value: 'application/json-patch+json' },
            { name: 'Authorization', value: `Bearer ${token}` }
          ]
        })
      })
    }
  }
}
</script>
