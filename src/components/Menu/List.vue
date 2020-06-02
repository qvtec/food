<template>
  <q-table
    class="q-mt-md"
    title="SampleData"
    flat
    bordered
    :data="items.data"
    :columns="items.columns"
    row-key="id"
    :filter="items.filter"
    :loading="loading"
    :pagination.sync="items.pagination"
    selection="multiple"
    :selected.sync="items.selected"
    :visible-columns="items.visibleColumns"
  >

    <template v-slot:top>
      <q-btn color="primary" :disable="loading" label="Add" @click="emitOpenAdd()" icon="add_circle" />

      <q-select
        class="q-ml-sm"
        v-model="items.visibleColumns"
        multiple
        outlined
        dense
        options-dense
        display-value="表示項目"
        emit-value
        map-options
        :options="items.columns"
        option-value="name"
        options-cover
      />

      <q-space />

      <q-input dense debounce="300" v-model="items.filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th auto-width />
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <q-btn
            size="sm"
            :color="props.expand ? 'accent' : 'secondary'"
            round
            dense
            @click="props.expand = !props.expand"
            :icon="props.expand ? 'remove' : 'add'" />
        </q-td>
        <q-td
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          {{ col.value }}
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <q-btn class="q-ml-sm" label="Edit" color="positive" @click="emitOpenEdit(props.row.id)" icon="create" />
          <q-btn class="q-ml-sm" label="Delete" color="negative" @click="emitDelete(props.row.id)" icon="delete_forever" />
        </q-td>
      </q-tr>
    </template>

    <template v-slot:loading>
      <qvt-spinner />
    </template>
  </q-table>
</template>

<script>
import qvtSpinner from '../Common/QvtSpinner'

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

  components: {
    qvtSpinner
  },

  methods: {
    emitOpenAdd () {
      this.$emit('openAdd')
    },
    emitDelete (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: '削除しますか?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$emit('delete', id)
      })
    },
    emitOpenEdit (id) {
      this.$emit('openEdit', id)
    }
  }
}
</script>
