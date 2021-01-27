<template lang="html">
    <div id="dashboard" v-if="loaded">

        <div class="box mb">
            <div class="top_box">
                <h2>Default</h2>
                <div class="description">
                    <p>Property <b>:type="primary"</b> and <b>:description="The quick brown fox jumps over the lazy dog."</b></p>
                </div>
            </div>
            <div class="bottom_box">
                <alert />
            </div>
        </div>

        <div class="box mb">
            <div class="top_box">
                <h2>Types</h2>
                <div class="description">
                    <p>These alerts are only for demo purposes. You can change alert type and message by adding <b>:type</b> property and <b>:description</b> in the alert component.</p>
                    <p><b>:type</b>: <i>primary, secondary, success, error, warning, info, dark</i></p>
                </div>
            </div>
            <div class="bottom_box">
                <alert :type="demo_alert.type" :description="demo_alert.description" :class="(key + 1 != demo_alerts.length) ? 'mb twenty' : ''" v-for="(demo_alert, key) in demo_alerts" :key="key" />
            </div>
        </div>

        <div class="box mb">
            <div class="top_box">
                <h2>Auto Dismissal</h2>
                <div class="description">
                    <p>In order to trigger the auto dismissal, add a property <b>:auto_dismiss</b> and set to <b>TRUE</b>. You can also set the time of dismissing the alert by adding a property <b>:dismiss_time</b> and set the time. The default value of dismissal time is <b>5000</b>.</p>
                </div>
            </div>
            <div class="bottom_box">
                <div :class="[ 'primary_button', (show) ? 'none mb twenty' : 'pointer' ]" @click="triggerAutoDismiss()">Show Alert</div>
                <transition name="fade">
                    <alert :type="'success'" :auto_dismiss="true" v-if="show" />
                </transition>
            </div>
        </div>

    </div>
</template>

<script>
    import Alert from '~/components/global/Alert'

    export default {
        components: {
            'alert': Alert
        },
        data () {
            return {
                loaded: false,
                show: false,
                demo_alerts: [
                    {
                        type: 'secondary',
                        description: 'This is a secondary alert!'
                    },
                    {
                        type: 'success',
                        description: 'This is a success alert!'
                    },
                    {
                        type: 'error',
                        description: 'This is a error alert!'
                    },
                    {
                        type: 'warning',
                        description: 'This is a warning alert!'
                    },
                    {
                        type: 'info',
                        description: 'This is a info alert!'
                    },
                    {
                        type: 'dark',
                        description: 'This is a dark alert!'
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
            },
            triggerAutoDismiss () {
                const me = this
                me.show = true
                setTimeout( () => {
                    me.show = false
                }, 5000)
            }
        },
        mounted () {
            const me = this
            me.initialization()
        },
        asyncData ({ store }) {
            store.commit('global/settings/populateTitle', { title: 'Alert' })
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
