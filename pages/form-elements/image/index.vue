<template lang="html">
    <div id="dashboard" v-if="loaded">

        <div class="box mb">
            <div class="top_box">
                <h2>Default</h2>
                <div class="description">
                    <p>You can choose if file is multiple or single by adding <b>:multiple</b> property with a value of <b>TRUE</b> or <b>FALSE</b>.</p><br />
                    <p>Property <b>:multiple="false"</b>, <b>:image_label="Image"</b>, <b>:category="image"</b> <b>:input_name="file[]"</b></p>
                </div>
            </div>
            <div class="bottom_box form">
                <div class="group nmb">
                    <!-- Image Handler Container -->
                    <image-handler-container
                        ref="image_handler"
                        :input_name="'file[]'"
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
    export default {
        components: {
            ImageHandlerContainer: () => import('~/components/file/ImageHandlerContainer')
        },
        data: () => ({
            loaded: false
        }),
        mounted () {
            const me = this
            me.toggleModalStatus({ type: 'loader', status: true })
            setTimeout( () => {
                me.toggleModalStatus({ type: 'loader', status: false })
                me.loaded = true
            }, 500)
        },
        asyncData ({ store }) {
            store.commit('global/settings/populateTitle', { title: 'Image' })
        }
    }
</script>
