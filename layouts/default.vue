<template>
    <div :class="[ '__db', (has_toggled) ? 'full' : '' ]">
        <div class="swallower" v-if="authenticated"></div>
        <transition name="fade">
            <sidebar v-if="authenticated" />
        </transition>
        <transition name="fade">
            <topbar v-if="authenticated" />
        </transition>
        <Nuxt />
        <transition name="fade">
            <bottombar v-if="authenticated" />
        </transition>
        <transition name="fade">
            <loader v-if="has_loaded" />
        </transition>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Topbar from '~/components/global/Topbar'
    import Sidebar from '~/components/global/Sidebar'
    import Bottombar from '~/components/global/Bottombar'
    import Loader from '~/components/global/Loader'

    export default {
        components: {
            Topbar,
            Sidebar,
            Bottombar,
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
                has_loaded: 'global/loader/loading',
                has_toggled: 'global/sidebar/toggled'
            })
        },
        methods: {
            windowScroll () {
                const me = this
                let selector = document.querySelector('.table')
                if (selector) {
                    let bounding = selector.getBoundingClientRect()
                    if (bounding.top < 50) {
                        selector.querySelector('thead').classList.add('sticky')
                    } else {
                        selector.querySelector('thead').classList.remove('sticky')
                    }
                }
            },
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
        },
        beforeMount () {
            window.addEventListener('scroll', this.windowScroll)
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.windowScroll)
        },
        head () {
            return {
                title: 'Admin Template | Designblue Philippines'
            }
        }
    }
</script>
