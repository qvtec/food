<template>
  <div class="q-pa-md">

    <PlanSearch :loading="this.loading" @search="search()" />

    <qvt-input class="q-mt-md" v-model="form.text" label="メニュー" afterIcon="add" @afterIconClick="menuAdd" />

    <q-layout view="lhh LpR lff" container style="height: 400px" class="shadow-2 rounded-borders q-mt-md">
      <q-page-container>
        <q-page>
          <q-table
            flat
            title=""
            :data="rows"
            :columns="columns"
            :loading="loading"
            row-key="date"
            hide-header
            :pagination.sync="items.pagination"
            :rows-per-page-options=[0]
          >

            <template v-slot:bottom>
              <q-pagination
                v-model="items.pagination.page"
                :max="pagesNumber"
                @click="pageUpdate"
              />
            </template>

            <template v-slot:loading>
              <qvt-spinner />
            </template>
          </q-table>

          <PlanFab v-for="(menu, key) in menus" :key="key" :item="menu" @delete="menuDel(menu)" @prev="movePage(menu, 'prev')" @next="movePage(menu, 'next')" />

        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import PlanSearch from '../components/Plan/Search'
import PlanFab from '../components/Plan/Fab'
import qvtInput from '../components/Form/QvtInput'
import qvtSpinner from '../components/Common/QvtSpinner'
import { date } from 'quasar'

export default {
  data () {
    return {
      loading: false,
      items: {
        pagination: {
          sortBy: 'desc',
          descending: false,
          page: 1,
          rowsPerPage: 7
        }
      },
      columns: [
        {
          name: 'date',
          required: true,
          label: '日時',
          align: 'left',
          style: 'height: 50px',
          field: row => row.date,
          format: val => `${date.formatDate(val, 'DD')}(${'日月火水木金土'[new Date(val).getDay()]})`,
          sortable: true
        }
      ],
      rows: [],
      form: {
        text: ''
      },
      menus: [],
      menusData: [
        {
          id: 1,
          date: '2020-06-01',
          name: '豚の生姜焼き',
          pos: [60, 50]
        },
        {
          id: 2,
          date: '2020-06-01',
          name: 'トマトスープ',
          pos: [60, 70]
        },
        {
          id: 3,
          date: '2020-06-01',
          name: 'かぼちゃシチュー',
          pos: [170, 50]
        },
        {
          id: 4,
          date: '2020-06-01',
          name: '鯖',
          pos: [170, 70]
        },
        {
          id: 5,
          date: '2020-06-08',
          name: 'ブンチャー',
          pos: [60, 50]
        },
        {
          id: 6,
          date: '2020-06-08',
          name: 'カレー',
          pos: [60, 70]
        },
        {
          id: 7,
          date: '2020-06-08',
          name: 'カレイの煮つけ',
          pos: [170, 50]
        },
        {
          id: 8,
          date: '2020-06-08',
          name: 'ハンバーグ',
          pos: [170, 70]
        }
      ],
      searchDay: '',
      maxMenuId: 8,
      maxDays: 35
    }
  },

  mounted () {
  },

  components: {
    qvtInput,
    PlanSearch,
    PlanFab,
    qvtSpinner
  },

  methods: {
    search () {
      this.setCalendar()

      this.loading = true
      setTimeout(() => {
        // @todo 全メニューデータ取得API
        this.pageUpdate()
        this.loading = false
      }, 500)
    },

    menuAdd () {
      if (this.form.text === '') return
      // @todo メニュー追加API
      this.maxMenuId = this.maxMenuId + 1
      this.menusData.push({
        id: this.maxMenuId,
        date: this.nowPageDate(),
        name: this.form.text,
        pos: [0, 0]
      })
      this.menus.push(this.menusData[this.menusData.length - 1])
      this.form.text = ''
    },

    menuDel (menu) {
      // @todo メニュー削除API
      var menuData = this.menusData.find((v) => v.id === menu.id)
      this.menusData.splice(this.menusData.indexOf(menuData), 1)
      this.menus.splice(this.menus.indexOf(menu), 1)
    },

    movePage (menu, type) {
      var nowPage = this.items.pagination.page
      var movevIndex = 0
      var movePage = nowPage
      var isMove = false

      switch (type) {
        case 'prev':
          if (nowPage === 1) break
          isMove = true
          movevIndex = this.items.pagination.rowsPerPage * (nowPage - 2)
          movePage = movePage - 1
          break
        case 'next':
          var lastPage = Math.ceil(this.rows.length / this.items.pagination.rowsPerPage)
          if (nowPage === lastPage) break
          isMove = true
          movevIndex = this.items.pagination.rowsPerPage * (nowPage - 0)
          movePage = movePage + 1
          break
      }

      if (isMove) {
        var index = this.menus.indexOf(menu)
        this.menus[index].date = this.rows[movevIndex].date
        this.items.pagination.page = movePage
        this.pageUpdate()
      }
    },

    setCalendar () {
      this.rows = []
      var d = new Date(this.searchDay)
      d.setDate(d.getDate() - 1)
      for (var i = 0; i < this.maxDays; ++i) {
        d.setDate(d.getDate() + 1)
        this.rows.push({
          date: `${date.formatDate(d, 'YYYY-MM-DD')}`
        })
      }
    },

    pageUpdate () {
      var nowPageDate = this.nowPageDate()

      this.loading = true
      setTimeout(() => {
        this.menus = []
        for (var key in this.menusData) {
          if (this.menusData[key].date === nowPageDate) {
            this.menus.push(this.menusData[key])
          }
        }
        this.loading = false
      }, 100)
    },

    nowPageDate () {
      var index = this.items.pagination.rowsPerPage * (this.items.pagination.page - 1)
      return this.rows[index].date
    }
  },

  computed: {
    pagesNumber () {
      return Math.ceil(this.rows.length / this.items.pagination.rowsPerPage)
    }
  }
}
</script>
