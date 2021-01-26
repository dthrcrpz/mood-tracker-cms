<template lang="html">
    <div id="dashboard" v-if="loaded">

        <div class="box mb">
            <div class="top_box">
                <h2>Default</h2>
            </div>
            <div class="bottom_box">
                <collapse :items="items" />
            </div>
        </div>

    </div>
</template>

<script>
    import Collapse from '~/components/global/collapse/Collapse'

    export default {
        components: {
            'collapse': Collapse
        },
        data () {
            return {
                loaded: false,
                items: [
                    {
                        id: 0,
                        name: 'Collapse',
                        description: 'The quick brown fox jumps over the lazy dog.',
                        open: false
                    },
                    {
                        id: 1,
                        name: 'Collapse',
                        description: 'The quick brown fox jumps over the lazy dog.',
                        open: false
                    },
                    {
                        id: 2,
                        name: 'Collapse',
                        description: 'The quick brown fox jumps over the lazy dog.',
                        open: false
                    },
                    {
                        id: 3,
                        name: 'Collapse',
                        description: 'The quick brown fox jumps over the lazy dog.',
                        open: false
                    }
                ]
            }
        },
        methods: {
            initialization (event) {
                const me = this
                if (document.readyState != 'interactive') {
                    setTimeout( () => {
                        me.$store.commit('global/loader/checkLoader', { status: false })
                        me.loaded = true
                        document.body.classList.remove('no_scroll', 'no_click')
                    }, 1000)
                }
            }
        },
        mounted () {
            const me = this
            me.initialization()
        },
        asyncData ({ store }) {
            store.commit('global/settings/populateTitle', { title: 'Collapse' })
            store.commit('global/loader/checkLoader', { status: true })
        },
        beforeMount () {
            window.addEventListener('load', this.initialization)
        },
        beforeDestroy () {
            window.removeEventListener('load', this.initialization)
        }
    }
</script>
