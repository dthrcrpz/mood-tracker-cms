<template lang="html">
    <div id="sidebar" :class="[ (has_toggled) ? 'floating' : '', 'hovered' ]" @focus="resetHoverToggle()" @mouseover="resetHoverToggle()" @mouseleave="resetLeaveToggle()">
        <div class="top">
            <img src="/logo.png" />
            <h2>Template</h2>
            <div class="toggle pointer" @click="toggleNav()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fill">
                    <circle cx="12" cy="12" r="10"></circle>
                    <transition name="fade">
                        <circle cx="12" cy="12" r="3" v-if="!has_toggled"></circle>
                    </transition>
                </svg>
            </div>
        </div>
        <div class="bottom">
            <ul class="list">
                <li class="item">
                    <nuxt-link to="/dashboard" class="link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#7A7A7A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        <span>Dashboard</span>
                    </nuxt-link>
                </li>
                <li class="item">
                    <nuxt-link to="/" class="link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#7A7A7A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        <span>Menu 1</span>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters ({
                has_toggled: 'global/nav-toggler/toggled'
            })
        },
        methods: {
            resetHoverToggle () {
                const me = this
                document.getElementById('sidebar').classList.add('hovered')
            },
            resetLeaveToggle () {
                const me = this
                document.getElementById('sidebar').classList.remove('hovered')
            },
            toggleNav () {
                const me = this
                me.$store.commit('global/nav-toggler/checkToggler', { status: (me.has_toggled) ? false : true })
            },
            checkHeightViewport () {
                const me = this
                let heightToDeduct = document.querySelector('#sidebar .top')
                if (document.documentElement && document.documentElement.clientHeight) {
                    document.querySelector('#sidebar .bottom').style.maxHeight = `${document.documentElement.clientHeight - heightToDeduct.scrollHeight}px`
                }
            }
        },
        mounted () {
            const me = this
            me.checkHeightViewport()
        },
        beforeMount () {
            window.addEventListener('load', this.checkHeightViewport)
            window.addEventListener('resize', this.checkHeightViewport)
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.checkHeightViewport)
            window.removeEventListener('load', this.checkHeightViewport)
        }
    }
</script>
