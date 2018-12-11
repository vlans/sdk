import types from './mutations-types'

const actions = {
    [types.SET_USER] ({ commit }, user) {
        commit(types.SET_USER, user)
    }
}

export default actions
