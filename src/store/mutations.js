import types from './mutations-types'

const mutations = {
    [types.SET_USER] (state, user) {
        state.user = user
    }
}

export default mutations
