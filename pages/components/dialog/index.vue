<template lang="html">
    <div id="dashboard" v-if="loaded">

        <div class="box mb">
            <div class="top_box">
                <h2>Default</h2>
            </div>
            <div class="bottom_box">
                <div class="group_inline">
                    <div class="primary_button pointer" @click="toggle('basic')">Basic</div>
                </div>
            </div>
        </div>

        <div class="box mb">
            <div class="top_box">
                <h2>Centered</h2>
                <div class="description">
                    <p>You can center the dialog by adding <b>:centered</b> property in the dialog component.</p>
                </div>
            </div>
            <div class="bottom_box">
                <div class="group_inline">
                    <div class="primary_button pointer" @click="toggle('centered')">Centered</div>
                </div>
            </div>
        </div>

        <div class="box mb">
            <div class="top_box">
                <h2>Confirmation</h2>
                <div class="description">
                    <p>You can center the dialog by adding <b>:centered</b> property in the dialog component.</p>
                </div>
            </div>
            <div class="bottom_box">
                <div class="group_inline">
                    <div class="primary_button pointer" @click="toggle('confirmation')">Confirm</div>
                </div>
            </div>
        </div>

        <div class="box mb">
            <div class="top_box">
                <h2>Types</h2>
                <div class="description">
                    <p>These dialogs are only for demo purposes. You can change dialog type by adding <b>:type</b> property in the dialog component.</p>
                    <p><b>:type</b>: <i>primary, secondary, success, error, warning, info, dark</i></p>
                </div>
            </div>
            <div class="bottom_box">
                <div class="group_inline">
                    <div :class="[ data.class, 'ml ten pointer', 'outline' ]" v-for="(data, key) in buttons" :key="key" @click="toggleType(data)">{{ data.name }}</div>
                </div>
            </div>
        </div>

        <basic ref="dialog" :centered="centered" :type="type" />
        <confirmation ref="confirmation" :centered="centered" />

    </div>
</template>

<script>
    import Basic from '~/components/dialog/Basic'
    import Confirmation from '~/components/dialog/Confirmation'

    export default {
        components: {
            'basic': Basic,
            'confirmation': Confirmation
        },
        data () {
            return {
                loaded: false,
                centered: false,
                buttons: [
                    {
                        name: 'Primary',
                        class: 'primary_button',
                        dialog: 'primary'
                    },
                    {
                        name: 'Secondary',
                        class: 'secondary_button',
                        dialog: 'secondary'
                    },
                    {
                        name: 'Success',
                        class: 'success_button',
                        dialog: 'success'
                    },
                    {
                        name: 'Cancel',
                        class: 'cancel_button',
                        dialog: 'cancel'
                    },
                    {
                        name: 'Warning',
                        class: 'warning_button',
                        dialog: 'warning'
                    },
                    {
                        name: 'Info',
                        class: 'info_button',
                        dialog: 'info'
                    },
                    {
                        name: 'Dark',
                        class: 'dark_button',
                        dialog: 'dark'
                    }
                ],
                type: 'primary'
            }
        },
        methods: {
            toggle (type) {
                const me = this
                switch (type) {
                    case 'basic':
                        setTimeout( () => {
                            me.$refs.dialog.opened = true
                        }, 10)
                        me.centered = false
                        break
                    case 'centered':
                        setTimeout( () => {
                            me.$refs.dialog.opened = true
                        }, 10)
                        me.centered = true
                        break
                    case 'confirmation':
                        setTimeout( () => {
                            me.$refs.confirmation.opened = true
                        }, 10)
                        break
                }
            },
            toggleType (data) {
                const me = this
                setTimeout( () => {
                    me.$refs.dialog.opened = true
                }, 10)
                me.centered = false
                me.type = data.dialog
            },
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
            store.commit('global/settings/populateTitle', { title: 'Dialog' })
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
