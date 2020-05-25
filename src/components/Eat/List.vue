<template>
  <q-table
    class="q-mt-md"
    title=""
    grid
    flat
    bordered
    :data="items.data"
    :columns="items.columns"
    row-key="id"
    :filter="items.filter"
    :loading="loading"
    :pagination.sync="items.pagination"
    :visible-columns="items.visibleColumns"
  >

    <template v-slot:top-right>
      <q-input dense debounce="300" v-model="items.filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <q-card flat bordered>
          <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg">
            <div class="absolute-bottom text-subtitle2">
              {{ props.row.date }}
            </div>
          </q-img>
          <q-card-section>
            <q-btn
              fab
              color="secondary"
              icon="edit"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);"
              @click="emitOpenEdit(props.row.id)"
            />
            <div  v-for="col in props.cols.filter(col => col.name !== 'date' && col.value.length>0)" :key="col.name">
              {{ col.value }}
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn flat round color="red" icon="favorite" />
            <q-btn flat round color="teal" icon="bookmark" />
            <q-btn flat round color="primary" icon="share" />
          </q-card-actions>
        </q-card>
      </div>
    </template>

    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
  </q-table>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: false
    },
    items: {
      type: Object,
      required: false
    }
  },
  methods: {
    emitOpenAdd () {
      this.$emit('openAdd')
    },
    emitOpenEdit (id) {
      this.$emit('openEdit', id)
    }
  }
}
</script>
