export default {
  accountPos: [
    {
      id: 1,
      AcctNum: '10201810000000010019',
      Balance: 290.0,
      OpDate: '2019-07-12'
    },
    {
      id: 2,
      AcctNum: '47441810000200000020',
      Balance: -90.0,
      OpDate: '2019-07-12'
    },
    {
      id: 3,
      AcctNum: '47443810000200000023',
      Balance: -200.0,
      OpDate: '2019-07-12'
    },
    {
      id: 4,
      AcctNum: '10201810000000010019',
      Balance: 970.0,
      OpDate: '2019-07-15'
    },
    {
      id: 5,
      AcctNum: '47441810000200000020',
      Balance: -470.0,
      OpDate: '2019-07-15'
    },
    {
      id: 6,
      AcctNum: '47443810000200000023',
      Balance: -500.0,
      OpDate: '2019-07-15'
    },
    {
      id: 7,
      AcctNum: '10201810000000010019',
      Balance: 1000.0,
      OpDate: '2019-07-16'
    },
    {
      id: 8,
      AcctNum: '47441810000200000020',
      Balance: -434.0,
      OpDate: '2019-07-16'
    },
    {
      id: 9,
      AcctNum: '47443810000200000023',
      Balance: -116.0,
      OpDate: '2019-07-16'
    }
  ],
  entries: [
    {
      id: 1,
      AcctNumCr: '10201810000000010019',
      AcctNumDB: '47441810000200000020',
      Amount: 10.0,
      OpDate: '2019-07-12'
    },
    {
      id: 2,
      AcctNumCr: '47441810000200000020',
      AcctNumDB: '47443810000200000023',
      Amount: 100.0,
      OpDate: '2019-07-12'
    },
    {
      id: 3,
      AcctNumCr: '47443810000200000023',
      AcctNumDB: '10201810000000010019',
      Amount: 300.0,
      OpDate: '2019-07-12'
    },
    {
      id: 4,
      AcctNumCr: '10201810000000010019',
      AcctNumDB: '47441810000200000020',
      Amount: 20.0,
      OpDate: '2019-07-15'
    },
    {
      id: 5,
      AcctNumCr: '47441810000200000020',
      AcctNumDB: '47443810000200000023',
      Amount: 400.0,
      OpDate: '2019-07-15'
    },
    {
      id: 6,
      AcctNumCr: '47443810000200000023',
      AcctNumDB: '10201810000000010019',
      Amount: 700.0,
      OpDate: '2019-07-15'
    },
    {
      id: 7,
      AcctNumCr: '10201810000000010019',
      AcctNumDB: '47441810000200000020',
      Amount: 40.0,
      OpDate: '2019-07-16'
    },
    {
      id: 8,
      AcctNumCr: '47441810000200000020',
      AcctNumDB: '47443810000200000023',
      Amount: 4.0,
      OpDate: '2019-07-16'
    },
    {
      id: 9,
      AcctNumCr: '47443810000200000023',
      AcctNumDB: '10201810000000010019',
      Amount: 70.0,
      OpDate: '2019-07-16'
    }
  ],
  accountsList: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockData.accountPos)
      }, 500)
    })
  },

  addAccountPos (accountPos) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(accountPos)
      }, 500)
    })
  },

  editAccountPos (accountPos) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(accountPos)
      }, 500)
    })
  },

  deleteAccountPos (accountPos) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(accountPos)
      }, 500)
    })
  },

  entriesList () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockData.entries)
      }, 500)
    })
  },

  addEntry (entry) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(entry)
      }, 500)
    })
  },

  editEntry (entry) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(entry)
      }, 500)
    })
  },

  deleteEntry: entry => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(entry)
      }, 500)
    })
  }
}
