import Vue from 'vue'
import Vuex from 'vuex'

import goods from './modules/goods'
import user from './modules/user'

Vue.use(Vuex);


let store = new Vuex.Store({
    modules:{
        goods,
        user,
    }
});

window.vm = store;

export default store;