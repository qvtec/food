<template>
  <div class="q-pa-md">
    <q-btn v-if="isList" color="accent" label="新規登録" @click="isList=false" />
    <q-btn v-else color="secondary" label="一覧表示" @click="showList" />

    <FoodList v-if="isList" @showEdit="showEdit" />
    <FoodAdd v-else :editId="editId" :menuIds="menuIds" @close="showList" @openMenuAdd="openMenuAdd" />

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
      editId: 0,
      menuIds: []
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
      this.editId = 0
      this.isList = true
    },

    showEdit (id) {
      this.editId = id
      this.isList = false
    },

    addMenu (id) {
      this.menuIds.push(id)
      this.menuDialog = false
    }
  }
}
</script>
