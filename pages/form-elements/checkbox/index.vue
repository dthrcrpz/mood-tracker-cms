<template lang="html">
    <div id="dashboard" v-if="loaded">

        <div class="box mb">
            <div class="top_box">
                <h2>Default</h2>
            </div>
            <div class="bottom_box form">
                <div class="group_inline">
                    <div class="checkbox">
                        <input type="checkbox" class="check" name="sample" id="sample" @change="form.sample ^= true" :checked="form.sample">
                        <label for="sample" class="pointer">Checkbox</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="box mb">
            <div class="top_box">
                <h2>Disabled</h2>
                <div class="description">
                    <p>Add <b>:class</b>: <i>disabled</i> together with checkbox class</p>
                </div>
            </div>
            <div class="bottom_box form">
                <div class="group_inline">
                    <div class="checkbox disabled">
                        <input type="checkbox" class="check" name="sample_v2" id="sample_v2" @change="form.sample_v2 ^= true" :checked="form.sample_v2">
                        <label for="sample_v2" class="pointer">Disabled</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="box mb">
            <div class="top_box">
                <h2>Types</h2>
                <div class="description">
                    <p>These checkboxes are only for demo purposes. You can change checkbox color by adding this classes.</p>
                    <p><b>class</b>: <i>primary, secondary, success, error, warning, info, dark</i></p>
                </div>
            </div>
            <div class="bottom_box form">
                <div class="group_inline">
                    <div class="group" v-for="(type, key) in types" :key="key">
                        <div :class="[ 'checkbox', type.class ]">
                            <input type="checkbox" class="check" :name="`sample_${key}`" :id="`sample_${key}`" @change="type.value ^= true" :checked="type.value">
                            <label :for="`sample_${key}`" class="pointer">{{ type.name }}</label>
                        </div>
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
                types: [
                    {
                        value: false,
                        name: 'Primary',
                        class: 'primary'
                    },
                    {
                        value: false,
                        name: 'Secondary',
                        class: 'secondary'
                    },
                    {
                        value: false,
                        name: 'Success',
                        class: 'success'
                    },
                    {
                        value: false,
                        name: 'Cancel',
                        class: 'cancel'
                    },
                    {
                        value: false,
                        name: 'Warning',
                        class: 'warning'
                    },
                    {
                        value: false,
                        name: 'Info',
                        class: 'info'
                    },
                    {
                        value: false,
                        name: 'Dark',
                        class: 'dark'
                    }
                ],
                form: {
                    sample: false,
                    sample_v2: false
                }
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
            store.commit('global/settings/populateTitle', { title: 'Checkbox' })
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
