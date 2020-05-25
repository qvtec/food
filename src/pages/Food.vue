<template>
  <div class="q-pa-md">
    <q-btn v-if="this.showList" color="accent" label="登録表示" @click="showList=false" />
    <q-btn v-else color="secondary" label="一覧表示" @click="showListClick" />

    <FoodList v-if="this.showList" @openEdit="openEdit" />
    <FoodAdd v-else :editId="this.editId" @closeAdd="showListClick" />

  </div>
</template>

<script>
import FoodList from '../components/Food/List'
import FoodAdd from '../components/Food/Add'

export default {
  data () {
    return {
      showList: false,
      editId: 0
    }
  },
  components: {
    FoodList,
    FoodAdd
  },
  methods: {
    showListClick () {
      this.editId = 0
      this.showList = true
    },
    openEdit (id) {
      this.editId = id
      this.showList = false
    }
  }
}
</script>
