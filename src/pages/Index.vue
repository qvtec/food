<template>
  <div class="q-pa-md">
    <EatAdd :item="item" @close="closeAdd" />
  </div>
</template>

<script>
import EatAdd from '../components/Eat/Add'

export default {
  name: 'PageIndex',
  data () {
    return {
      item: {}
    }
  },

  mounted () {
    // @todo 今日のFoodデータを取得する
    // this.item = foodデータ
  },

  components: {
    EatAdd
  },

  methods: {
    openAdd (item) {
      this.item = item
    },

    closeAdd () {
    }
  }
}
</script>
