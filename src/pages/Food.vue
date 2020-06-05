<template>
  <div class="q-pa-md">
    <q-btn v-if="isList" color="accent" label="新規登録" @click="isList=false" />
    <q-btn v-else color="secondary" label="一覧表示" @click="showList" />

    <FoodList v-if="isList" @showEdit="showEdit" />
    <FoodAdd v-else :item="editItem" :menuIds="menuIds" @close="showList" @openMenuAdd="openMenuAdd" />

    <q-dialog v-model="menuDialog">
      <MenuAdd @add="addMenu" />
    </q-dialog>
  </div>
</template>

<script>
import FoodList from '../components/Food/List'
import FoodAdd from '../components/Food/Add'
import MenuAdd from '../components/Menu/Add'

export default {
  name: 'PageFood',
  data () {
    return {
      loading: false,
      menuDialog: false,
      isList: false,
      menuIds: [],
      editItem: {}
    }
  },

  components: {
    FoodList,
    FoodAdd,
    MenuAdd
  },

  methods: {
    openMenuAdd () {
      this.menuDialog = true
    },

    showList () {
      this.editItem = {}
      this.isList = true
    },

    showEdit (row) {
      this.editItem = row
      this.isList = false
    },

    addMenu (id) {
      this.menuIds.push(id)
      this.menuDialog = false
    }
  }
}
</script>
