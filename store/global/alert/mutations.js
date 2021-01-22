export default {
    populateAlerts (state, payload) {
        array_push(state.alerts, payload)
    }
}
