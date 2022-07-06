<template>
  <q-page padding class="fit row justify-center q-pa-md items-baseline">
    <div class="col-xs-12 col-sm-7 col-lg-5">
      <q-card flat bordered>
        <q-card-section class="bg-grey-2">
          <div class="text-h6">ログイン</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-form
            class="q-gutter-md"
            ref="form"
            @submit="login()"
          >

            <q-input
              outlined
              v-model="credentials.email"
              label="Email"
              type="email"
              lazy-rules
              :rules="[val => !!val || 'required']"
            >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>

            <q-input
              outlined
              v-model="credentials.password"
              label="Password"
              type="password"
              lazy-rules
              :rules="[val => !!val || 'required']"
            >
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>
            </q-input>

          </q-form>
        </q-card-section>

        <q-card-actions>
          <q-btn
            class="full-width"
            label="Login"
            type="submit"
            color="primary"
            size="lg"
            :loading="loading"
            @click="login()" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      },
      remember: false,
      loading: false
    }
  },
  methods: {
    login () {
      this.$refs.form.validate().then(success => {
        if (!success) return
        this.loading = true

        if (this.remember) {
          this.credentials.remember = true
        }

        this.$store.dispatch('auth/login', this.credentials)
          .then(() => {
            this.$router.replace({ name: 'top' })
            this.$q.notify({ type: 'positive', message: 'ログインに成功しました' })
          })
          .catch(error => {
            this.$q.notify({ type: 'negative', message: 'ログインに失敗しました' })
            console.error(`Not signed in: ${error.message}`)
          })
      })
    }
  }
}
</script>
