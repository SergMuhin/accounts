<template>
  <div>
    <h1 class="text-h3">Счёта</h1>

    <div class="row justify-between items-end q-mb-md">
      <q-select v-model="currentDate" :options="days" class="select" label="Выбор отчётного дня" />
      <q-btn @click="showDialog({action: 'add'})" color="primary" label="Добавить счёт на дату" />
    </div>

    <q-table
      v-if="accountsByDate.length"
      title="Счета с остатками на дату"
      :data="accountsByDate"
      :columns="columns"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      selection="single"
      :selected.sync="selectedAccount"
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

    <q-table
      v-if="selectedAccount.length && selectedEntries.length"
      :title="`Проводки по счёту ${selectedAccount[0].AcctNum}`"
      :data="selectedEntries"
      :columns="entriesColumns"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      row-key="AcctNum"
    />
    <div
      v-else-if="selectedAccount.length"
      class="text-h4 q-mt-md"
    >Нет проводок по счёту {{ selectedAccount[0].AcctNum }}</div>

    <q-dialog v-model="showAccountsDialog">
      <AccountsDialog
        :action="action"
        :item="currentAccPos"
        @save="changeAccountPos"
        @close="showAccountsDialog = false"
      />
    </q-dialog>
  </div>
</template>

<script>
import AccountsDialog from "../components/AccountsDialog.vue";

export default {
  name: "Accounts",
  components: {
    AccountsDialog
  },
  data() {
    return {
      columns: [
        {
          name: "accountNumber",
          required: true,
          label: "Номер счёта",
          align: "left",
          field: row => row.AcctNum,
          sortable: true
        },
        {
          name: "balance",
          align: "left",
          label: "Баланс",
          field: row => row.Balance,
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
      entriesColumns: [
        {
          name: "debet",
          required: true,
          label: "Дебет",
          align: "left",
          field: row => row.AcctNumCr,
          sortable: true
        },
        {
          name: "credit",
          align: "left",
          label: "Кредит",
          field: row => row.AcctNumDB,
          sortable: true
        },
        {
          name: "amount",
          align: "left",
          label: "Сумма",
          field: row => row.Amount,
          sortable: true
        }
      ],
      pagination: {
        rowsPerPage: 0
      },
      selectedAccount: [],
      days: ["2019-07-12", "2019-07-15", "2019-07-16"],
      currentDate: "2019-07-16",
      showAccountsDialog: false,
      action: "",
      currentAccPos: null,
      id: null
    };
  },

  async created() {
    this.$q.loading.show();
    await this.$store.dispatch("accounts/accountsList");
    await this.$store.dispatch("accounts/entriesList");
    this.$q.loading.hide();
    this.id = this.accounts.length;
  },

  computed: {
    accounts() {
      return this.$store.state.accounts.accounts;
    },

    entries() {
      return this.$store.state.accounts.entries;
    },

    accountsByDate() {
      return this.accounts.filter(item => item.OpDate === this.currentDate);
    },

    selectedEntries() {
      if (this.selectedAccount.length) {
        return this.entries.filter(
          item => item.AcctNumCr === this.selectedAccount[0].AcctNum
        );
      }
      return [];
    }
  },
  methods: {
    showDialog({ action, item }) {
      this.currentAccPos = item;
      this.action = action;
      this.showAccountsDialog = true;
    },

    async changeAccountPos({ item, action }) {
      this.$q.loading.show();
      if (!item.id) {
        item.id = this.id + 1;
        this.id++;
      }
      item.OpDate = this.currentDate;
      await this.$store.dispatch(`accounts/${action}AccountPos`, item);
      this.$q.loading.hide();
      this.showAccountsDialog = false;

      const messages = {
        add: "Остаток по счёту успешно добавлен",
        edit: "Остаток по счёту успешно обновлён",
        delete: "Остаток по счёту успешно удалён"
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
