import Vue from 'vue'
import VueRouter from 'vue-router'
//首页 、产品页 、详情页
import Home from '../pages/home'
import Index from '../pages/index'
import Product from '../pages/product'
import Detail from '../pages/detail'
import buySuccess from '../pages/buySuccess'

//订单列表 、订单确认、订单支付
import Order from '../pages/order'
import OrderList from '../pages/orderList'
import OrderComfirm from '../pages/orderComfirm'
import OrderPay from '../pages/orderPay'
// 购物车
import Cart from '../pages/cart'
// 登录&注册
import Register from '../pages/register'
import Login from '../pages/login'




Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path:'*',
            redirect:'/'
        },
        //首页 、产品页 、详情页 、加购物车成功页
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect: 'index',
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: Index
                },
                {
                    path: 'product/:id',
                    name: 'prodcut',
                    component: Product
                },
                {
                    path: 'detail/:id',
                    name: 'detail',
                    component: Detail
                },
                {
                    path:'buySuccess/:id',
                    name:'buySuccess',
                    component:buySuccess
                }
            ]
        },
        //订单列表 、订单确认、订单支付
        {
            path: '/order',
            name: 'order',
            component: Order,
            children: [
                {
                    path: 'orderList',
                    name: 'orderList',
                    component: OrderList
                },
                {
                    path: 'orderComfirm',
                    name: 'orderComfirm',
                    component: OrderComfirm
                },
                {
                    path: 'orderPay',
                    name: 'OOrderPay',
                    component: OrderPay
                }

            ]
        },
        // 购物车
        {
            path:'/cart',
            name:'cart',
            component:Cart
        },
        // 登录
        {
            path:'/login',
            name:'login',
            component:Login 
        },
        // 注册
        {
            path:'/register',
            name:'register',
            component:Register 
        }
    ]
})
export default router