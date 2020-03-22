import axios from 'axios'

// 获取产品列表
/*  
    * 
    params  ==== 查询参数

*/
export const getProductList = (params) => {
    return axios.get('/products',{
        params
    })
}

// 获取登录用户信息
export const getUserInfo = () => {
    return axios.get('/user');
}



//获取购物中所有商品数量总和

export const getCartCount = () =>{
    return axios.get('/carts/products/sum');
}

// 获取购物车列表
export const getCartList = () =>{
    return axios.get('/carts');
}