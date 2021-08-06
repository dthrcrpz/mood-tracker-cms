<template>
    <div :class="[ '__db', (has_toggled) ? 'full' : '' ]">

        <div class="swallower" v-if="getAuthenticated"></div>

        <transition name="fade">
            <sidebar v-if="getAuthenticated" />
        </transition>

        <transition name="fade">
            <topbar v-if="getAuthenticated" />
        </transition>

        <Nuxt />

        <transition name="fade">
            <bottombar v-if="getAuthenticated" />
        </transition>

        <catcher />

        <ul id="toast_wrapper" :class="[ (toasts > 0) ? '' : 'none' ]"></ul>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        components: {
            Topbar: () => import('~/components/global/Topbar'),
            Sidebar: () => import('~/components/global/Sidebar'),
            Bottombar: () => import('~/components/global/Bottombar'),
            Catcher: () => import('~/components/global/Catcher')
        },
        data: () => ({
            padding: 0
        }),
        watch: {
            $route (to, from) {
                const me = this
                me.$store.commit('global/catcher/hideHasError', { status: false })
            }
        },
        computed: {
            ...mapGetters ({
                getAuthenticated: 'global/settings/getAuthenticated',
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
            }
        },
        mounted () {
            window.addEventListener('scroll', this.windowScroll)
        },
        destroyed () {
            window.removeEventListener('scroll', this.windowScroll)
        },
        head () {
            return {
                title: 'Admin Template | CMS',
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
