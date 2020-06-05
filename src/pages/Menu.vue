<template>
  <div class="q-pa-md">
    <MenuList @openEdit="openEdit" @openAdd="openAdd" ref="list" />

    <q-dialog v-model="addDialog">
      <MenuAdd :editId="editId" @add="add" @edit="edit" />
    </q-dialog>
  </div>
</template>

<script>
import MenuList from '../components/Menu/List'
import MenuAdd from '../components/Menu/Add'

export default {
  name: 'PageMenu',
  data () {
    return {
      addDialog: false,
      loading: false,
      editId: ''
    }
  },

  components: {
    MenuList,
    MenuAdd
  },

  methods: {
    openAdd () {
      this.editId = 0
      this.addDialog = true
    },

    openEdit (id) {
      this.editId = id
      this.addDialog = true
    },

    add () {
      this.$refs.list.search()
      this.addDialog = false
    },

    edit (id) {
      this.$refs.list.search()
      this.addDialog = false
    }
  }
}
</script>
