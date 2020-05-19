<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    :href="link"
  >
    <q-item-section avatar>
      <q-avatar :color="color" :text-color="textColor" :icon="icon" />
    </q-item-section>

    <q-item-section>
      {{ title }}
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    color: {
      type: String,
      default: 'secondary'
    },

    textColor: {
      type: String,
      default: 'white'
    }
  }
}
</script>
