<template>
  <div class="q-pa-md">
    <PointList />
  </div>
</template>

<script>
import PointList from '../components/Point/List'

export default {
  name: 'PagePoint',
  data () {
    return {
      loading: false
    }
  },

  components: {
    PointList
  },

  methods: {
  }
}
</script>
