export default {
    savaUserName(state,playload){
        state.username = playload;
    },
    getCartCount(state,playload){
        state.cartCount = playload;
    }
}