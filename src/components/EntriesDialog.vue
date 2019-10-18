<template>
  <q-card class="q-dialog-plugin">
    <div class="q-pa-lg">
      <div class="text-h5">{{ title }}</div>

      <q-input v-model="editItem.AcctNumDB" label="Дебет" />
      <q-input v-model="editItem.AcctNumCr" label="Кредит" />
      <q-input v-model="editItem.Amount" label="Сумма" />
      <q-input v-model="editItem.OpDate" :disable="!changeDate">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="editItem.OpDate" mask="YYYY-MM-DD" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <q-card-actions align="right">
      <q-btn color="primary" label="Cancel" @click="$emit('close')" />
      <q-btn color="primary" label="OK" @click="$emit('save', {item: editItem, action})" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "EntriesDialog",
  props: {
    action: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      default: () => ({
        AcctNumCr: null,
        AcctNumDB: null,
        Amount: null
      })
    },
    changeDate: {
      type: Boolean,
      default: true
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
        add: "Добавить проводку",
        edit: "Редактировать проводку",
        delete: "Удалить проводку"
      };
      return titles[this.action];
    }
  }
};
</script>