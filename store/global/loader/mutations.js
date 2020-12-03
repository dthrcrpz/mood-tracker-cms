export default {
    checkLoader (state, payload) {
        if (payload.status) {
            state.loading = true
        } else {
            state.loading = false
        }
    }
}
