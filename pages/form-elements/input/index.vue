<template lang="html">
    <div id="dashboard" v-if="loaded">

        <div class="box mb">
            <div class="top_box">
                <h2>Default</h2>
            </div>
            <div class="bottom_box action">
                <div class="group floating">
                    <input type="text" :class="[ 'input', (form.sample.length > 0) ? 'filled' : '' ]" name="sample" autocomplete="off" v-model="form.sample">
                    <label for="sample">Input</label>
                </div>
            </div>
        </div>

        <div class="box mb">
            <div class="top_box">
                <h2>Types</h2>
            </div>
            <div class="bottom_box action">
                <div :class="[ 'group fixed', (form.sample_v2.length > 0) ? 'filled' : '' ]">
                    <label for="sample_v2">Input</label>
                    <input type="text" class="input" name="sample_v2" autocomplete="off" v-model="form.sample_v2">
                </div>
                <div :class="[ 'group bordered', (form.sample_v3.length > 0) ? 'filled' : '' ]">
                    <label for="sample_v3">Input</label>
                    <input type="text" class="input" name="sample_v3" autocomplete="off" v-model="form.sample_v3">
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
                form: {
                    sample: '',
                    sample_v2: '',
                    sample_v3: ''
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
            store.commit('global/settings/populateTitle', { title: 'Input' })
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
