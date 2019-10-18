import Vue from 'vue'

import mockData from './../mocks/index'

export default {
  namespaced: true,
  state: {
    accounts: [],
    entries: []
  },

  actions: {
    async accountsList ({ commit }) {
      try {
        const res = await accountsList()
        commit('accountsList', res)
      } catch (err) {
        console.warn('catch :: accounts :: accountsList', err)
      }
    },

    async addAccountPos ({ commit }, account) {
      try {
        const res = await addAccountPos(account)
        commit('addAccountPos', res)
      } catch (err) {
        console.warn('catch :: accounts :: addAccountPos', err)
      }
    },

    async editAccountPos ({ commit }, account) {
      try {
        const res = await editAccountPos(account)
        commit('editAccountPos', res)
      } catch (err) {
        console.warn('catch :: accounts :: editAccountPos', err)
      }
    },

    async deleteAccountPos ({ commit }, account) {
      try {
        const res = await deleteAccountPos(account)
        commit('deleteAccountPos', res)
      } catch (err) {
        console.warn('catch :: accounts :: deleteAccountPos', err)
      }
    },

    async entriesList ({ commit }) {
      try {
        const res = await entriesList()
        commit('entriesList', res)
      } catch (err) {
        console.warn('catch :: accounts :: entriesList', err)
      }
    },

    async addEntry ({ commit }, entry) {
      try {
        const res = await addEntry(entry)
        commit('addEntry', res)
      } catch (err) {
        console.warn('catch :: accounts :: addEntry', err)
      }
    },

    async editEntry ({ commit }, entry) {
      try {
        const res = await editEntry(entry)
        commit('editEntry', res)
      } catch (err) {
        console.warn('catch :: accounts :: editEntry', err)
      }
    },

    async deleteEntry ({ commit }, entry) {
      try {
        const res = await deleteEntry(entry)
        commit('deleteEntry', res)
      } catch (err) {
        console.warn('catch :: accounts :: deleteEntry', err)
      }
    }
  },

  mutations: {
    accountsList (state, payload) {
      state.accounts = payload
    },

    addAccountPos (state, payload) {
      state.accounts.push(payload)
    },

    editAccountPos (state, payload) {
      const index = state.accounts.findIndex(item => item.id === payload.id)
      Vue.set(state.accounts, index, payload)
    },

    deleteAccountPos (state, payload) {
      const index = state.accounts.findIndex(item => item.id === payload.id)
      state.accounts.splice(index, 1)
    },

    entriesList (state, payload) {
      state.entries = payload
    },

    addEntry (state, payload) {
      state.entries.push(payload)
    },

    editEntry (state, payload) {
      const index = state.entries.findIndex(item => item.id === payload.id)
      Vue.set(state.entries, index, payload)
    },

    deleteEntry (state, payload) {
      const index = state.entries.findIndex(item => item.id === payload.id)
      state.entries.splice(index, 1)
    }
  }
}

function accountsList () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockData.accountPos)
    }, 500)
  })
}

function addAccountPos (accountPos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(accountPos)
    }, 500)
  })
}

function editAccountPos (accountPos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(accountPos)
    }, 500)
  })
}

function deleteAccountPos (accountPos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(accountPos)
    }, 500)
  })
}

function entriesList () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockData.entries)
    }, 500)
  })
}

function addEntry (entry) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(entry)
    }, 500)
  })
}

function editEntry (entry) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(entry)
    }, 500)
  })
}

function deleteEntry (entry) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(entry)
    }, 500)
  })
}
