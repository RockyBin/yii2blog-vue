
const state = {
    goods:[],
    page:1,
    pageSize:5,
    total:0
};

const getters = {
    goods:state=>{
        let goods = state.goods;
        
        goods.forEach(item=>{
            item.totalPrice = item.price * item.num;
        })

        return goods;
    },
    totalAll:state=>{
        let price = 0;

        state.goods.forEach(item=>{
            price += item.num * item.price;
        });

        return price;
    },
    
};

const mutations = {
    setData:(state,params)=>{
        //console.log(state,params);
        state.goods = params.data.data;
        state.page = parseInt(params.data.page);
        state.pageSize = parseInt(params.data.pageSize);
        state.total = parseInt(params.data.total);
    },
    del:(state,params)=>{
        //console.log(params);return;
        let goods = state.goods;
        let k;

        for(let i=0;i<goods.length;i++){
            if(goods[i]['id'] == params.id){
                k=i;
                break;
            }
        }

        goods.splice(k,1);
    }
};

const actions = {
    loadData(state,params={}){

        let data = {};

        if(JSON.stringify(params) !== '{}'){

            if(params.hasOwnProperty('page')){
                data.page = params.page;
            }

            if(params.hasOwnProperty('pageSize')){
                data.pageSize = params.pageSize;
            }

        }else{

            data.page = state.state.page;
            data.pageSize = parseInt(state.state.pageSize);

        }

        tool.api('/goods/list','post',data).then(res=>{
            //console.log(res);
            if(res && res.status == 200){
                state.commit('setData',res.data);
            }
        });

    },

};


export default {
    state,
    getters,
    mutations,
    actions
};
