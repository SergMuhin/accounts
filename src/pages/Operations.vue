<template>
  <div>
    <h1 class="text-h3">Операции</h1>

    <div class="row justify-end q-mb-md">
      <q-btn @click="showDialog({action: 'add'})" color="primary" label="Добавить проводку" />
    </div>

    <q-table
      v-if="entries.length"
      title="Проводки"
      :data="entries"
      :columns="columns"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      selection="single"
      :selected.sync="selectedEntry"
      row-key="id"
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

    <div v-if="selectedEntry.length && lastAccountTotal" class="q-mt-md">
      <div class="text-h5">
        Остаток по счёту {{ selectedEntry[0].AcctNumDB }} :
        <span
          class="text-h4"
        >{{ lastAccountTotal }}</span>
      </div>
    </div>
    <div
      v-else-if="selectedEntry.length && !lastAccountTotal"
      class="text-h4 q-mt-md"
    >Нет остатков по счёту {{ selectedEntry[0].AcctNumDB }}</div>

    <q-dialog v-model="showEntriesDialog">
      <EntriesDialog
        :action="action"
        :item="currentEntry"
        @save="changeEntry"
        @close="showEntriesDialog = false"
      />
    </q-dialog>
  </div>
</template>

<script>
import EntriesDialog from "../components/EntriesDialog.vue";

export default {
  name: "Operations",
  components: {
    EntriesDialog
  },
  data() {
    return {
      columns: [
        {
          name: "date",
          align: "left",
          label: "Дата",
          field: row => row.OpDate,
          sortable: true
        },
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
      selectedEntry: [],
      id: null
    };
  },

  async created() {
    this.$q.loading.show();
    await this.$store.dispatch("accounts/accountsList");
    await this.$store.dispatch("accounts/entriesList");
    this.id = this.accounts.length;
    this.$q.loading.hide();
  },

  computed: {
    accounts() {
      return this.$store.state.accounts.accounts;
    },

    lastAccountTotal() {
      const currentAccounts = this.accounts.filter(
        item => item.AcctNum === this.selectedEntry[0].AcctNumDB
      );
      if (currentAccounts.length) {
        const dates = currentAccounts.map(item =>
          new Date(item.OpDate).getTime()
        );
        let maxDate = Math.max.apply(null, dates);
        maxDate = new Date(maxDate);
        const year = new Date(maxDate).getFullYear();
        const month = `${0}${new Date(maxDate).getMonth() + 1}`;
        const day = new Date(maxDate).getDate();
        const currentAccount = currentAccounts.find(
          item => item.OpDate === `${year}-${month}-${day}`
        );
        if (this.selectedEntry[0] && currentAccount) {
          return currentAccount.Balance;
        }
      }

      return "";
    },

    entries() {
      return this.$store.state.accounts.entries;
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
