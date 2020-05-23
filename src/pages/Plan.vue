<template>
  <div class="q-pa-md">
    <q-layout view="lhh LpR lff" container style="height: 500px" class="shadow-2 rounded-borders">
      <q-page-container>
        <q-page padding>

          <q-page-sticky position="bottom-right" :offset="fabPos">
            <q-fab
              icon="add"
              direction="up"
              color="accent"
              :disable="draggingFab"
              v-touch-pan.prevent.mouse="moveFab"
            />
          </q-page-sticky>

          <q-page-sticky position="bottom-right" :offset="CardPos">
            <q-card :disable="draggingCard" v-touch-pan.prevent.mouse="moveCard">
              <q-card-section>
                test
              </q-card-section>
            </q-card>
          </q-page-sticky>

        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fabPos: [18, 18],
      CardPos: [180, 180],
      draggingFab: false,
      draggingCard: false
    }
  },

  methods: {
    onClick () {
      // console.log('Clicked on a fab action')
    },

    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    },

    moveCard (ev) {
      this.draggingCard = ev.isFirst !== true && ev.isFinal !== true

      this.CardPos = [
        this.CardPos[0] - ev.delta.x,
        this.CardPos[1] - ev.delta.y
      ]
    }
  }
}
</script>
