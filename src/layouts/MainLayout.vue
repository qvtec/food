<template>
  <q-layout view="lHh lpR fFf">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar> -->
          毎日のごはん
        </q-toolbar-title>

        <div>v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" content-class="bg-grey-3" bordered>
      <!-- drawer content -->
      <q-list>
        <q-item-label header class="text-grey-8">
          Menu
        </q-item-label>

        <q-separator />

        <q-item>
          <q-item-section avatar>
            <q-avatar color="accent" text-color="white" icon="accessibility_new" />
          </q-item-section>
          <q-item-section v-if="user">
            {{ user.name }}
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item :to="{ name: 'top' }">
          <q-item-section avatar>
            <q-avatar color="secondary" text-color="white" icon="home" />
          </q-item-section>
          <q-item-section v-if="user">
            TOP
          </q-item-section>
        </q-item>

        <q-item :to="{ name: 'plan' }">
          <q-item-section avatar>
            <q-avatar color="secondary" text-color="white" icon="event_available" />
          </q-item-section>
          <q-item-section v-if="user">
            予定
          </q-item-section>
        </q-item>

        <q-item :to="{ name: 'form' }">
          <q-item-section avatar>
            <q-avatar color="secondary" text-color="white" icon="add" />
          </q-item-section>
          <q-item-section v-if="user">
            登録
          </q-item-section>
        </q-item>

        <q-item :to="{ name: 'list' }">
          <q-item-section avatar>
            <q-avatar color="secondary" text-color="white" icon="list" />
          </q-item-section>
          <q-item-section v-if="user">
            一覧
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable @click.native="logout()">
          <q-item-section avatar>
            <q-avatar color="negative" text-color="white" icon="exit_to_app" />
          </q-item-section>
          <q-item-section>Sign Out</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      left: false
    }
  },

  mounted () {
    if (!this.$store.state.auth.user) {
      this.$store.dispatch('auth/setUser')
    }
  },

  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },

  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
      setTimeout(() => this.$router.replace({ name: 'login' }), 700)
    }
  }
}
</script>
