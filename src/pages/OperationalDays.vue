<template>
  <div>
    <h1 class="text-h3">Операционные дни</h1>

    <div class="row justify-between items-end q-mb-md">
      <q-select
        v-model="currentDate"
        :options="dates"
        class="select"
        label="Выбор операционного дня"
      />
      <q-btn @click="showDialog({action: 'add'})" color="primary" label="Добавить проводку" />
    </div>

    <q-table
      v-if="entriesByDate.length"
      title="Проводки операционного дня"
      :data="entriesByDate"
      :columns="columns"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      row-key="AcctNum"
    >
      <template #body-cell-actions="{row}">
        <q-td>
          <q-btn
            @click="showDialog({action: 'edit', item: row})"
            flat
            round
            color="grey"
            icon="edit"
          />
          <q-btn
            @click="showDialog({action: 'delete', item: row})"
            flat
            round
            color="grey"
            icon="delete"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="showEntriesDialog">
      <EntriesDialog
        :action="action"
        :item="currentEntry"
        :changeDate="false"
        @save="changeEntry"
        @close="showEntriesDialog = false"
      />
    </q-dialog>
  </div>
</template>

<script>
import EntriesDialog from "../components/EntriesDialog.vue";

export default {
  name: "OperationalDays",
  components: {
    EntriesDialog
  },
  data() {
    return {
      columns: [
        {
          name: "debet",
          required: true,
          label: "Дебет",
          align: "left",
          field: row => row.AcctNumDB,
          sortable: true
        },
        {
          name: "credit",
          align: "left",
          label: "Кредит",
          field: row => row.AcctNumCr,
          sortable: true
        },
        {
          name: "amount",
          align: "left",
          label: "Сумма",
          field: row => row.Amount,
          sortable: true
        },
        {
          name: "actions",
          align: "left",
          label: "Действия",
          style: "width: 10%",
          action: null
        }
      ],
      dates: ["2019-07-12", "2019-07-15", "2019-07-16"],
      currentDate: "2019-07-16",
      pagination: {
        rowsPerPage: 0
      },
      showEntriesDialog: false,
      action: "",
      currentEntry: null,
      id: null
    };
  },

  async created() {
    this.$q.loading.show();
    await this.$store.dispatch("accounts/entriesList");
    this.$q.loading.hide();
    this.id = this.entries.length;
  },

  computed: {
    entries() {
      return this.$store.state.accounts.entries;
    },

    entriesByDate() {
      return this.entries.filter(item => item.OpDate === this.currentDate);
    }
  },
  methods: {
    showDialog({ action, item }) {
      this.currentEntry = item;
      this.action = action;
      this.showEntriesDialog = true;
    },

    async changeEntry({ item, action }) {
      this.$q.loading.show();
      if (!item.id) {
        item.id = this.id + 1;
        this.id++;
      }
      item.OpDate = this.currentDate;
      await this.$store.dispatch(`accounts/${action}Entry`, item);
      this.$q.loading.hide();
      this.showEntriesDialog = false;

      const messages = {
        add: "Проводка успешно добавлена",
        edit: "Проводка успешно обновлёна",
        delete: "Проводка успешно удалёна"
      };

      this.$q.notify({
        color: "green-6",
        textColor: "white",
        icon: "check",
        position: "bottom-right",
        message: messages[action]
      });
    }
  }
};
</script>
