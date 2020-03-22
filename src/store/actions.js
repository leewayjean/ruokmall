export default {
    saveUserName(context,username){
        context.commit('savaUserName',username)
    },
    saveCartCount(context,cartCount){
        context.commit('saveCartCount',cartCount)
    }
}