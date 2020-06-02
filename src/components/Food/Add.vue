<template>
  <q-card flat bordered class="q-mt-md" style="max-width: 600px">
    <q-card-section>
      <div class="row q-col-gutter-sm">

        <div class="col-sm-12 col-lg-6">
          <qvt-date v-model="form.date" />
        </div>

        <div class="col-12">
          <q-file outlined dense v-model="form.picture" label="画像">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </div>

        <div class="col-12">
          <qvt-input v-model="form.memo" label="メモ" type="textarea" />
        </div>

        <div class="col-12">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="menu1" label="献立1" />
            <q-tab name="menu2" label="献立2" />
            <q-tab name="menu3" label="献立3" />
            <q-tab name="menu4" label="献立4" />
            <q-tab name="menu5" label="献立5" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="menu1" class="row q-col-gutter-sm">
              <div class="col-12">
                <qvt-input v-model="form.menu[0].name" label="名前" />
              </div>

              <div class="col-12">
                <qvt-input v-model="form.menu[0].url" label="URL" preIcon="link" type="url" afterIcon="search" />
              </div>

              <div class="col-12">
                <qvt-input v-model="form.menu[0].subname" label="" :readonly="true" />
              </div>

              <div v-for="n of 6" :key="n" class="col-xs-6 col-sm-4 col-lg-3">
                <qvt-input v-model="form.menu[0].material[n]" />
              </div>

              <div class="col-12">
                <qvt-select v-model="form.menu[0].type" label="種類" :options="typeOptions" />
              </div>

              <div class="col-12">
                <q-rating
                  v-model="form.menu[0].rate"
                  size="2.5em"
                  color="primary"
                  icon="star_border"
                  icon-selected="star"
                />
              </div>

              <div class="col-12">
                <qvt-input v-model="form.menu[0].memo" label="メモ" type="textarea" />
              </div>
            </q-tab-panel>

            <q-tab-panel name="menu2" class="row q-col-gutter-sm">
              <div class="col-12">
                <qvt-input v-model="form.menu[1].name" label="名前" />
              </div>

              <div class="col-12">
                <qvt-input v-model="form.menu[1].url" label="URL" preIcon="link" type="url" afterIcon="search" />
              </div>

              <div class="col-12">
                <qvt-input v-model="form.menu[1].subname" label="" :readonly="true" />
              </div>

              <div v-for="n of 6" :key="n" class="col-xs-6 col-sm-4 col-lg-3">
                <qvt-input v-model="form.menu[1].material[n]" />
              </div>

              <div class="col-12">
                <qvt-select v-model="form.menu[1].type" label="種類" :options="typeOptions" />
              </div>

              <div class="col-12">
                <q-rating
                  v-model="form.menu[1].rate"
                  size="2.5em"
                  color="primary"
                  icon="star_border"
                  icon-selected="star"
                />
              </div>

              <div class="col-12">
                <qvt-input v-model="form.menu[1].memo" label="メモ" type="textarea" />
              </div>
            </q-tab-panel>

            <q-tab-panel name="menu3" class="row q-col-gutter-sm">
              <div class="col-12">
                <qvt-input v-model="form.menu[2].name" label="名前" />
              </div>

              <div class="col-12">
                <qvt-input v-model="form.menu[2].url" label="URL" preIcon="link" type="url" afterIcon="search" />
              </div>

              <div class="col-12">
                <qvt-input v-model="form.menu[2].subname" label="" :readonly="true" />
              </div>

              <div v-for="n of 6" :key="n" class="col-xs-6 col-sm-4 col-lg-3">
                <qvt-input v-model="form.menu[2].material[n]" />
              </div>

              <div class="col-12">
                <qvt-select v-model="form.menu[2].type" label="種類" :options="typeOptions" />
              </div>

              <div class="col-12">
                <q-rating
                  v-model="form.menu[2].rate"
                  size="2.5em"
                  color="primary"
                  icon="star_border"
                  icon-selected="star"
                />
              </div>

              <div class="col-12">
                <qvt-input v-model="form.menu[2].memo" label="メモ" type="textarea" />
              </div>
            </q-tab-panel>

            <q-tab-panel name="menu4" class="row q-col-gutter-sm">
              <div class="col-12">
                <qvt-input v-model="form.menu[3].name" label="名前" />
              </div>

              <div class="col-12">
                <qvt-input v-model="form.menu[3].url" label="URL" preIcon="link" type="url" afterIcon="search" />
              </div>

              <div class="col-12">
                <qvt-input v-model="form.menu[3].subname" label="" :readonly="true" />
              </div>

              <div v-for="n of 6" :key="n" class="col-xs-6 col-sm-4 col-lg-3">
                <qvt-input v-model="form.menu[3].material[n]" />
              </div>

              <div class="col-12">
                <qvt-select v-model="form.menu[3].type" label="種類" :options="typeOptions" />
              </div>

              <div class="col-12">
                <q-rating
                  v-model="form.menu[3].rate"
                  size="2.5em"
                  color="primary"
                  icon="star_border"
                  icon-selected="star"
                />
              </div>

              <div class="col-12">
                <qvt-input v-model="form.menu[3].memo" label="メモ" type="textarea" />
              </div>
            </q-tab-panel>

            <q-tab-panel name="menu5" class="row q-col-gutter-sm">
              <div class="col-12">
                <qvt-input v-model="form.menu[4].name" label="名前" />
              </div>

              <div class="col-12">
                <qvt-input v-model="form.menu[4].url" label="URL" preIcon="link" type="url" afterIcon="search" />
              </div>

              <div class="col-12">
                <qvt-input v-model="form.menu[4].subname" label="" :readonly="true" />
              </div>

              <div v-for="n of 6" :key="n" class="col-xs-6 col-sm-4 col-lg-3">
                <qvt-input v-model="form.menu[4].material[n]" />
              </div>

              <div class="col-12">
                <qvt-select v-model="form.menu[4].type" label="種類" :options="typeOptions" />
              </div>

              <div class="col-12">
                <q-rating
                  v-model="form.menu[4].rate"
                  size="2.5em"
                  color="primary"
                  icon="star_border"
                  icon-selected="star"
                />
              </div>

              <div class="col-12">
                <qvt-input v-model="form.menu[4].memo" label="メモ" type="textarea" />
              </div>
            </q-tab-panel>

          </q-tab-panels>
        </div>

      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn v-if="editId==0" class="full-width" color="primary" :disable="loading" label="登録" @click="add" />
      <q-btn v-else class="full-width" color="primary" :disable="loading" label="編集" @click="edit(editId)" />
    </q-card-actions>
  </q-card>
</template>

<script>
import qvtDate from '../Form/QvtDate'
import qvtInput from '../Form/QvtInput'
import qvtSelect from '../Form/QvtSelect'
import { date } from 'quasar'

export default {
  data () {
    return {
      loading: false,
      tab: 'menu1',
      typeOptions: ['和食', '洋食', '中華', 'イタリアン', '韓国料理', 'アジア料理', 'その他'],
      form: {
        date: date.formatDate(Date.now(), 'YYYY/MM/DD'),
        picture: null,
        menu: {
          0: {
            name: '',
            url: '',
            subname: '',
            type: '',
            rate: 0,
            material: []
          },
          1: {
            name: '',
            url: '',
            subname: '',
            type: '',
            rate: 0,
            material: []
          },
          2: {
            name: '',
            url: '',
            subname: '',
            type: '',
            rate: 0,
            material: []
          },
          3: {
            name: '',
            url: '',
            subname: '',
            type: '',
            rate: 0,
            material: []
          },
          4: {
            name: '',
            url: '',
            subname: '',
            type: '',
            rate: 0,
            material: []
          }
        }
      }
    }
  },
  mounted () {
    if (this.editId === 0) {
      return
    }

    // axios
    //   .post('food/detail', this.editId)
    //   .then(response => {
    //     this.form = response.data
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     this.errored = true
    //   })
    //   .finally(() => this.loading = false)
    var now = new Date()
    var yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
    this.form.date = date.formatDate(yesterday, 'YYYY/MM/DD')
    this.form.menu[0].name = '編集中料理名'
  },
  components: {
    qvtInput,
    qvtDate,
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
      console.log(this.form)
      setTimeout(() => {
        this.loading = false
        this.$emit('closeAdd')
      }, 500)
    },
    edit (id) {
      this.loading = true
      console.log(this.form)
      setTimeout(() => {
        this.loading = false
        this.$emit('closeAdd')
      }, 500)
    }
  }
}
</script>
