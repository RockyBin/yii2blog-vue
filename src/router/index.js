import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ()=>import('@/page/Home'),
      beforeEnter: (to, from, next) => {

        if(!tool.auth.getToken()){
          next({path: '/login'});
        }else{
          next();
        }        
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: ()=>import('@/page/Login')
    }
  ]
});

window.rt = routes;

export default routes;
