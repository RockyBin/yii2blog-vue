import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import auth from './auth'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

const fetch = axios.create({
    baseURL: 'http://api.yii2blog.com',
    timeout: 5000,
});

fetch.interceptors.request.use(
    config=>{

        if(auth.getToken()){
            config.headers['Authorization'] = 'Bearer ' + auth.getToken();
        }
        
        return config;
    },
    error=>{
        //return Promise.reject(error);
    }
);

fetch.interceptors.response.use(
    response=>{
        if(response.status == 200 && response.data.code == 401){
            auth.logout();
        }else{
            return response;
        }
        
    },
    error=>{

        if( error && error.response.status == 401){
            auth.logout();
        }
    }
);


const request = {
    api:(url, method, data)=>{

        if(method == 'post'){

            return new Promise((resolve,reject)=>{
                let postData = qs.stringify(data);

                fetch({
                    url,
                    method: 'post',
                    data: postData
                }).then(res=>{
                    resolve(res);
                });
            });

        }else{

            return new Promise((resolve,reject)=>{

                fetch({
                    url,
                    method: 'get',
                    data
                }).then(res=>{
                    resolve(res);
                });
            });

        }

    },
    auth,
    patch:(name,data={})=>{
        vm.dispatch(name, data);
    },
};


export default request;

