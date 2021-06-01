<template lang="html">
    <div id="dashboard" v-if="loaded">

        <div class="box mb">
            <div class="top_box">
                <h2>Default</h2>
                <div class="description">
                    <p>You can choose if file is multiple or single by adding <b>:multiple</b> property with a value of <b>TRUE</b> or <b>FALSE</b>.</p><br />
                    <p>Property <b>:multiple="false"</b>, <b>:image_label="Image"</b>, <b>:category="image"</b></p>
                </div>
            </div>
            <div class="bottom_box form">
                <div class="group nmb">
                    <!-- Image Handler Container -->
                    <image-handler-container
                        ref="image_handler"
                        :image_label="'Image'"
                        :multiple="false"
                        :category="'image'"
                    />
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import ImageHandlerContainer from '~/components/file/ImageHandlerContainer'

    export default {
        components: {
            'imageHandlerContainer': ImageHandlerContainer
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
