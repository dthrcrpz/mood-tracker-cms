<template lang="html">
    <div id="dashboard" v-if="loaded">

        <div class="box mb">
            <div class="top_box">
                <h2>Default</h2>
                <div class="description">
                    <p>You can choose if file is multiple or single by adding <b>:multiple</b> property with a value of <b>TRUE</b> or <b>FALSE</b>.</p><br />
                    <p>Property <b>:multiple="true"</b>, <b>:type="image"</b> and <b>:extensions="['jpeg', 'jpg', 'png']"</b></p>
                    <!-- <p>You can change the type of asset by adding <b>:type</b> property with a value of <b>IMAGE</b> or <b>FILE</b>.</p> -->
                </div>
            </div>
            <div class="bottom_box form">
                <asset-container />
            </div>
        </div>

        <div class="box mb">
            <div class="top_box">
                <h2>Single File</h2>
                <div class="description">
                    <p>Property <b>:multiple="false"</b>, <b>:type="file"</b> and <b>:extensions="['pdf', 'txt', 'doc']"</b></p>
                </div>
            </div>
            <div class="bottom_box form">
                <asset-container :unique="1" :extensions="['pdf', 'txt', 'doc']" :multiple="false" :type="'file'" />
            </div>
        </div>

    </div>
</template>

<script>
    import AssetContainer from '~/components/file/AssetContainer'

    export default {
        components: {
            'assetContainer': AssetContainer
        },
        data () {
            return {
                loaded: false
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
