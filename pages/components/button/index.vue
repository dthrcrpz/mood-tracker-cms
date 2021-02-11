<template lang="html">
    <div id="dashboard" v-if="loaded">

        <div class="box mb">
            <div class="top_box">
                <h2>Default</h2>
            </div>
            <div class="bottom_box">
                <div class="box_group_inline">
                    <div :class="[ data.class, 'mr ten pointer' ]" v-for="(data, key) in buttons" :key="key">{{ data.name }}</div>
                </div>
            </div>
        </div>

        <div class="box_inline two mb">
            <div class="box">
                <div class="top_box">
                    <h2>Outline</h2>
                    <div class="description">
                        <p>Just add <b>outline</b> class along with the button class.</p>
                    </div>
                </div>
                <div class="bottom_box">
                    <div class="box_group_inline">
                        <div :class="[ data.class, 'mr ten pointer', 'outline' ]" v-for="(data, key) in buttons" :key="key">{{ data.name }}</div>
                    </div>
                </div>
            </div>

            <div class="box">
                <div class="top_box">
                    <h2>Flat</h2>
                    <div class="description">
                        <p>Just add <b>flat</b> class along with the button class.</p>
                    </div>
                </div>
                <div class="bottom_box">
                    <div class="box_group_inline">
                        <div :class="[ data.class, 'mr ten pointer', 'flat' ]" v-for="(data, key) in buttons" :key="key">{{ data.name }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="box_inline two mb">
            <div class="box">
                <div class="top_box">
                    <h2>Rectangle</h2>
                    <div class="description">
                        <p>Just add <b>rectangle</b> class along with the button class.</p>
                    </div>
                </div>
                <div class="bottom_box">
                    <div class="box_group_inline">
                        <div :class="[ data.class, 'mr ten pointer', 'rectangle' ]" v-for="(data, key) in buttons" :key="key">{{ data.name }}</div>
                    </div>
                </div>
            </div>

            <div class="box">
                <div class="top_box">
                    <h2>Rectangle</h2>
                    <div class="description">
                        <p>Just add <b>rounded</b> class along with the button class.</p>
                    </div>
                </div>
                <div class="bottom_box">
                    <div class="box_group_inline">
                        <div :class="[ data.class, 'mr ten pointer', 'rounded' ]" v-for="(data, key) in buttons" :key="key">{{ data.name }}</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        data () {
            return {
                loaded: false,
                buttons: [
                    {
                        name: 'Primary',
                        class: 'primary_button'
                    },
                    {
                        name: 'Secondary',
                        class: 'secondary_button'
                    },
                    {
                        name: 'Success',
                        class: 'success_button'
                    },
                    {
                        name: 'Cancel',
                        class: 'cancel_button'
                    },
                    {
                        name: 'Warning',
                        class: 'warning_button'
                    },
                    {
                        name: 'Info',
                        class: 'info_button'
                    },
                    {
                        name: 'Dark',
                        class: 'dark_button'
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
            store.commit('global/settings/populateTitle', { title: 'Button' })
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
