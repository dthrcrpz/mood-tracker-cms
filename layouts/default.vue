<template>
    <div class="__db">
        <Nuxt />
        <transition name="fade">
            <loader v-if="has_loaded" />
        </transition>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Loader from '~/components/global/Loader'

    export default {
        components: {
            Loader
        },
        data () {
            return {
                padding: 0
            }
        },
        // watch: {
        //     $route (to, from) {
        //         const me = this
        //         me.autoPadding()
        //     }
        // },
        computed: {
            ...mapGetters ({
                has_loaded: 'global/loader/loading'
            })
        },
        // methods: {
        //     autoPadding () {
        //         const me = this
        //         let target_height = document.querySelector('.__n'), result = 0
        //         if (target_height) {
        //             result = `${target_height.offsetHeight - 1}px`
        //         }
        //         me.padding = result
        //     }
        // },
        mounted () {
            const me = this
            // me.autoPadding()
        }
    }
</script>
