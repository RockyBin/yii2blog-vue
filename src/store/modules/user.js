
const state = {
    token:''
};

const getters = {

};

const mutations = {

};

const actions = {

    login(state,params={}){

        tool.api('/user/login','post',params).then(res=>{
            if(res.status == 200){
                if(res.data.code == 200){
                    tool.auth.setToken(res.data.data.data.token,params.remember);

                    rt.push('/')
                }
            }
        });

    }

};

export default {
    state,
    getters,
    mutations,
    actions,
};