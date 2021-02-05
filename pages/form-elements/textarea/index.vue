<template lang="html">
    <div id="dashboard" v-if="loaded">

        <div class="box mb">
            <div class="top_box">
                <h2>Default</h2>
            </div>
            <div class="bottom_box action">
                <div class="group floating">
                    <textarea :class="[ 'input', (form.sample.length > 0) ? 'filled' : '' ]" name="sample" autocomplete="off" v-model="form.sample" rows="8"></textarea>
                    <label for="sample">Input</label>
                </div>
                <div class="group pt floating">
                    <input type="text" :class="[ 'input disabled', (form.sample_v5.length > 0) ? 'filled' : '' ]" name="sample_v5" autocomplete="off" v-model="form.sample_v5">
                    <label for="sample_v5">Disabled</label>
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
                <div :class="[ 'group radius', (form.sample_v4.length > 0) ? 'filled' : '' ]">
                    <label for="sample_v4">Input</label>
                    <input type="text" class="input" name="sample_v4" autocomplete="off" v-model="form.sample_v4">
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
                    sample_v3: '',
                    sample_v4: '',
                    sample_v5: ''
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
            store.commit('global/settings/populateTitle', { title: 'Textarea' })
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
