<template>
  <q-card class="q-dialog-plugin">
    <div class="q-pa-lg">
      <div class="text-h5">{{ title }}</div>

      <q-input v-model="editItem.AcctNum" label="Счёт" />
      <q-input v-model="editItem.Balance" label="Баланс" />
    </div>
    <q-card-actions align="right">
      <q-btn color="primary" label="Cancel" @click="$emit('close')" />
      <q-btn color="primary" label="OK" @click="$emit('save', {item: editItem, action})" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "AccountsDialog",
  props: {
    action: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      default: () => ({
        AcctNum: null,
        Balance: null
      })
    }
  },

  data() {
    return {
      editItem: { ...this.item }
    };
  },

  computed: {
    title() {
      const titles = {
        add: "Добавить счёт остатками",
        edit: "Редактировать счёт остатками",
        delete: "Удалить счёт остатками"
      };
      return titles[this.action];
    }
  }
};
</script>