<template lang="html">
    <div id="dashboard" v-if="loaded">

        <div class="box mb">
            <div class="top_box">
                <h2>Default</h2>
            </div>
            <div class="bottom_box">
                <div class="box_group_inline">
                    <div class="primary_button pointer" @click="addToast({ type: 'primary', message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit' })">Toast</div>
                </div>
            </div>
        </div>

        <div class="box mb">
            <div class="top_box">
                <h2>Types</h2>
                <div class="description">
                    <p>These toasts are only for demo purposes. You can change toast type and message by adding <b>:type</b> property and <b>:message</b> in the toast component.</p>
                    <p><b>:type</b>: <i>primary, secondary, success, error, warning, info, dark</i></p>
                </div>
            </div>
            <div class="bottom_box">
                <div class="box_group_inline">
                    <div :class="[ data.class, 'mr ten outline pointer' ]" @click="addToast({ type: data.type, message: data.message })" v-for="(data, key) in buttons" :key="key">{{ data.name }}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data () {
            return {
                loaded: false,
                buttons: [
                    {
                        name: 'Primary',
                        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                        type: 'primary',
                        class: 'primary_button'
                    },
                    {
                        name: 'Secondary',
                        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                        type: 'secondary',
                        class: 'secondary_button'
                    },
                    {
                        name: 'Success',
                        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                        type: 'success',
                        class: 'success_button'
                    },
                    {
                        name: 'Cancel',
                        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                        type: 'cancel',
                        class: 'cancel_button'
                    },
                    {
                        name: 'Warning',
                        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                        type: 'warning',
                        class: 'warning_button'
                    },
                    {
                        name: 'Info',
                        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                        type: 'info',
                        class: 'info_button'
                    },
                    {
                        name: 'Dark',
                        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                        type: 'dark',
                        class: 'dark_button'
                    }
                ]
            }
        },
        methods: {
            ...mapActions('global/toast', {
                addToast: 'addToast'
            }),
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
            store.commit('global/settings/populateTitle', { title: 'Toasts' })
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
