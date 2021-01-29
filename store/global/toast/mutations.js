export default {
    removeToast (state, payload) {
        let parent = document.getElementById('toast_wrapper')

        parent.removeChild(document.querySelector(`.toast_${payload.id}`))
    },
    addToasts (state, payload) {
        state.toasts = document.querySelectorAll('#toast_wrapper #toast').length
    },
    addCtr (state, payload) {
        state.ctr += 1
    }
}
