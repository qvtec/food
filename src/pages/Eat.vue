<template>
  <div class="q-pa-md">

    <EatList @openAdd="openAdd" ref="list" />

    <q-dialog v-model="addDialog">
      <EatAdd :item="editItem" @update="updateAdd" />
    </q-dialog>

  </div>
</template>

<script>
import EatList from '../components/Eat/List'
import EatAdd from '../components/Eat/Add'

export default {
  name: 'PageEat',
  data () {
    return {
      loading: false,
      addDialog: false,
      editItem: {}
    }
  },

  components: {
    EatList,
    EatAdd
  },

  methods: {
    openAdd (row) {
      this.editItem = row
      this.addDialog = true
    },

    updateAdd () {
      this.$refs.list.search()
      this.addDialog = false
    }
  }
}
</script>
