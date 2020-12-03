<template>
    <div class="__db">
        <transition name="fade">
            <sidebar v-if="authenticated" />
        </transition>
        <Nuxt />
        <transition name="fade">
            <loader v-if="has_loaded" />
        </transition>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Sidebar from '~/components/global/Sidebar'
    import Loader from '~/components/global/Loader'

    export default {
        components: {
            Sidebar,
            Loader
        },
        data () {
            return {
                padding: 0,
                authenticated: false,
                routes: [
                    '/',
                    '/forgot-password',
                    '/reset-password'
                ]
            }
        },
        watch: {
            $route (to, from) {
                const me = this
                if (!me.routes.includes(me.$route.path)) {
                    me.validateToken()
                }
                // me.autoPadding()
            }
        },
        computed: {
            ...mapGetters ({
                has_loaded: 'global/loader/loading'
            })
        },
        methods: {
            validateToken () {
                const me = this
                me.authenticated = (me.$cookies.get('access_token')) ? true : false
                if (!me.authenticated) {
                    window.location.assign('/')
                }
            }
            // autoPadding () {
            //     const me = this
            //     let target_height = document.querySelector('.__n'), result = 0
            //     if (target_height) {
            //         result = `${target_height.offsetHeight - 1}px`
            //     }
            //     me.padding = result
            // }
        },
        mounted () {
            const me = this
            if (!me.routes.includes(me.$route.path)) {
                me.validateToken()
            }
            // me.autoPadding()
        }
    }
</script>
