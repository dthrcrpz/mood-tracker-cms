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

        <catcher />

        <ul id="toast_wrapper" :class="[ (toasts > 0) ? '' : 'none' ]"></ul>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Topbar from '~/components/global/Topbar'
    import Sidebar from '~/components/global/Sidebar'
    import Bottombar from '~/components/global/Bottombar'
    import Catcher from '~/components/global/Catcher'
    import Loader from '~/components/global/Loader'

    export default {
        components: {
            Topbar,
            Sidebar,
            Bottombar,
            Catcher,
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
                me.$store.commit('global/catcher/hideHasError', { status: false })
            }
        },
        computed: {
            ...mapGetters ({
                has_loaded: 'global/loader/hasLoaded',
                has_toggled: 'global/sidebar/hasToggled',
                toasts: 'global/toast/getToasts'
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
                me.authenticated = true
                // if (!me.authenticated) {
                //     window.location.assign('/')
                // }
            }
        },
        mounted () {
            const me = this
            if (!me.routes.includes(me.$route.path)) {
                me.validateToken()
            } else {
                me.authenticated = false
            }
        },
        beforeMount () {
            window.addEventListener('scroll', this.windowScroll)
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.windowScroll)
        },
        head () {
            return {
                title: 'CISM | CMS',
                script: [
                    { src: 'https://code.jquery.com/jquery-3.2.1.slim.min.js' },
                    { src: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/codemirror.js' },
                    { src: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/mode/xml/xml.js' },
                    { src: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/2.36.0/formatting.js' },
                    { src: 'https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js' }
                ],
                link: [
                    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/codemirror.css' },
                    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/theme/monokai.css' },
                    { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css' }
                ]
            }
        }
    }
</script>
