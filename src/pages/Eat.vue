<template>
  <div class="q-pa-md">

    <EatList @openAdd="openAdd" />

    <q-dialog v-model="addDialog">
      <EatAdd :item="item" @close="closeAdd" />
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
      item: {}
    }
  },

  components: {
    EatList,
    EatAdd
  },

  methods: {
    openAdd (item) {
      this.item = item
      this.addDialog = true
    },

    closeAdd () {
      this.addDialog = false
    }
  }
}
</script>
