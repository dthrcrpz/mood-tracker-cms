<template lang="html">
    <transition name="fade">
        <div id="dialog" class="basic">
            <div class="wrapper">
                <div class="content cancel">
                    <div class="close pointer" @click="toggleModalStatus({ type: 'delete_confirmation', status: false })">×</div>
                    <div class="content_top">
                        Confirmation
                    </div>
                    <div class="content_middle">
                        Are you sure you want to delete this {{ getItem.item_type }}? <br />
                        This action cannot be undone.
                    </div>
                    <div class="content_bottom">
                        <div class="inline">
                            <div class="cancel button outline pointer" @click="toggleModalStatus({ type: 'delete_confirmation', status: false })">Cancel</div>
                            <div class="success button pointer ml ten" @click="confirm()">Confirm</div>
                        </div>
                    </div>
                </div>
                <div class="backdrop" @click="toggleModalStatus({ type: 'delete_confirmation', status: false })"></div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                getItem: 'global/modal/getItem'
            })
        },
        methods: {
            confirm () {
                const me = this
                me.toggleModalStatus({ type: 'loader', status: true })

                me.$axios.delete(me.getItem.api).then(res => {
                    me.toggleModalStatus({ type: 'delete_confirmation', status: false })
                    me.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been deleted!' })
                    me.$nuxt.refresh()
                }).catch(err => {
                    me.$store.commit('global/catcher/populateErrors', { items: err.response.data.errors })
                }).then(() => {
                    setTimeout( () => {
                        me.toggleModalStatus({ type: 'loader', status: false })
                    }, 500)
                })
            }
        },
        mounted () {
            document.body.classList.add('no_scroll')
        }
    }
</script>
