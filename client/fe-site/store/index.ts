import Vuex from 'vuex'
import todos from './todos'

const createStore = () => {
    return new Vuex.Store({
        modules: {
            todos: todos,
        },
    })
}

export default createStore
