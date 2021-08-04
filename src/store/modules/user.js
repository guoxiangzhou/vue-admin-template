import { login, logout, getInfo, getVerifyCode, register } from '@/api/user'
import { createGame, delGame, getGameList } from '@/api/game'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user register
  register({ commit }, userInfo) {
    console.log(JSON.stringify(userInfo))
    const { username, password, verifyCode } = userInfo
    return new Promise((resolve, reject) => {
      register({ name: username.trim(), verify_code: verifyCode, password: password }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get verify code
  getVerifyCode({ commit }, data) {
    console.log('email:' + data.username + ', type:' + data.type)
    return new Promise((resolve, reject) => {
      getVerifyCode(data.username.trim(), data.type).then(response => {
        if (response.code === 0) {
          resolve(response)
        } else {
          reject(response.data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        if (response.code === 0) {
          console.log(response)
          commit('SET_TOKEN', response.token)
          setToken(response.token)
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    // debugger
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        console.log('info: ' + JSON.stringify(response))

        commit('SET_NAME', response.data.nickname)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // new game
  newGame({ commit }, data) {
    console.log('----' + JSON.stringify(data))
    return new Promise((resolve, reject) => {
      createGame(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get game list
  listGame({ commit }) {
    return new Promise((resolve, reject) => {
      getGameList().then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // delete game
  deleteGame({ commit }, id) {
    return new Promise((resolve, reject) => {
      delGame(id).then(res => {
        if (res.code !== 0) {
          reject(res.data)
        } else {
          resolve(res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

