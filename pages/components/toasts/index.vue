<template lang="html">
    <div id="dashboard">
        <div class="box mb">
            <div class="top_box">
                <h2>Default</h2>
            </div>
            <div class="bottom_box">
                <div class="group_inline">
                    <div class="primary_button pointer" @click="addToast({ type: 'primary', message: 'Sample Text' })">Toast</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        methods: {
            ...mapActions('global/toast', {
                addToast: 'addToast'
            })
        },
        mounted () {
            const me = this
            me.$store.commit('global/settings/populateTitle', { title: 'Toasts' })
        }
    }
</script>
