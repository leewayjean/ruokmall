import axios from 'axios'

export const getProductList = (params) => {
    return axios.get('/products',{
        params
    })
}