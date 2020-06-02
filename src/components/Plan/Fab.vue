<template>
  <q-page-sticky position="top-left" :offset="item.pos">
    <q-badge
      outline
      color="primary"
      :label="item.name"
      :disable="draggingMenu"
      v-touch-pan.prevent.mouse="moveMenu"
      @click="onClick()" />
  </q-page-sticky>
</template>

<script>
export default {
  data () {
    return {
      posFirst: [0, 0],
      menuPos: [60, 15],
      draggingMenu: false
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClick () {
      this.$emit('delete')
    },

    moveMenu (ev) {
      this.draggingMenu = ev.isFirst !== true && ev.isFinal !== true

      var pos = [
        this.item.pos[0] + ev.delta.x,
        this.item.pos[1] + ev.delta.y
      ]

      if (ev.isFirst) {
        this.posFirst[0] = pos[0]
        this.posFirst[1] = pos[1]
      }

      this.item.pos = this.moveFit(ev, pos)

      if (ev.isFinal) {
        this.$emit('save')
      }
    },

    moveFit (ev, pos) {
      if (ev.isFinal) {
        if (pos[0] < 0) {
          pos[0] = this.posFirst[0]
        }
        if (pos[1] < 0) {
          // pos[1] = this.posFirst[1]
          pos = [0, 0]
          this.$emit('prev')
        }

        if (pos[0] > 250) {
          pos[0] = this.posFirst[0]
        }
        if (pos[1] > 350) {
          // pos[1] = this.posFirst[1]
          pos = [0, 0]
          this.$emit('next')
        }
      }

      return [
        pos[0],
        pos[1]
      ]
    }
  }
}
</script>
