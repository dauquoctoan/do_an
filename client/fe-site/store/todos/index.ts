import mutations from './mutations'
import state from './state'
import getters from './getters'
import actions from './actions'

const todos = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default todos
