<template>
    <div :class="[ '__db', (hasToggled) ? 'full' : '' ]">

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

        <transition name="fade">
            <loader v-if="getShowStatus('loader')" />
        </transition>

        <transition name="fade">
            <template v-if="getShowStatus('confirmation')">
                <confirmation />
            </template>
        </transition>

        <transition name="fade">
            <template v-if="getShowStatus('delete_confirmation')">
                <delete-confirmation />
            </template>
        </transition>

        <catcher />

        <ul id="toast_wrapper" :class="[ (getToasts > 0) ? '' : 'none' ]"></ul>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
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
                getShowStatus: 'global/modal/getShowStatus',
                hasToggled: 'global/sidebar/hasToggled',
                getToasts: 'global/toast/getToasts'
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
                title: 'Demo | Admin Template'
            }
        }
    }
</script>
