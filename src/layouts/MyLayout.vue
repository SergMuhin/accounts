<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>Quasar App</q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Меню</q-item-label>
        <q-item :to="{name: 'home'}" exact>
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Главная</q-item-label>
          </q-item-section>
        </q-item>
        <q-item :to="{name: 'accounts'}" exact>
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Счета</q-item-label>
          </q-item-section>
        </q-item>
        <q-item :to="{name: 'operational-days'}" exact>
          <q-item-section avatar>
            <q-icon name="date_range" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Операционные дни</q-item-label>
          </q-item-section>
        </q-item>
        <q-item :to="{name: 'operations'}" exact>
          <q-item-section avatar>
            <q-icon name="format_list_bulleted" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Операции</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="main-content q-px-lg">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MyLayout",

  data() {
    return {
      leftDrawerOpen: false
    };
  }
};
</script>

<style>
body {
  overflow-x: auto !important;
}
</style>