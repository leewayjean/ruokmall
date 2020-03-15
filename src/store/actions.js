export default {
    saveUserName(context,username){
        context.commit('savaUserName',username)
    },
    getCartCount(context,cartCount){
        context.commit('getCartCount',cartCount)
    }
}