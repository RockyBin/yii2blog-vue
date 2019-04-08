import Cookie from 'js-cookie'

const tokenKey = 'adtk'

const auth = {
    getToken:()=>{
        return Cookie.get(tokenKey);
    },
    setToken:(token,remember=false)=>{
        if(remember){
            return Cookie.set(tokenKey, token, { expires: 30 });
        }else{
            return Cookie.set(tokenKey, token);
        }
        
    },
    removeToken:()=>{
        return Cookie.remove(tokenKey);
    },
    logout:()=>{
        Cookie.remove(tokenKey);
        rt.push('/login');
    }
};

export default auth;