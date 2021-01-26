<template lang="html">
    <div id="dashboard">

        <div class="box mb">
            <div class="top_box">
                <h2>Default</h2>
            </div>
            <div class="bottom_box">
                <breadcrumb />
            </div>
        </div>

        <div class="box mb">
            <div class="top_box">
                <h2>Separator</h2>
                <div class="description">
                    <p>These breadcrumbs are only for demo purposes. You can change breadcrumb separator by adding <b>:separator</b> property in the breadcrumb component.</p>
                </div>
            </div>
            <div class="bottom_box">
                <div :class="[ 'group', (key != demo_separators.length) ? 'mb twenty' : '' ]" v-for="(demo_separator, key) in demo_separators" :key="key">
                    <breadcrumb :separator="demo_separator" />
                </div>
            </div>
        </div>

        <div class="box mb">
            <div class="top_box">
                <h2>Alignment</h2>
                <div class="description">
                    <p>You can change breadcrumb alignment by adding <b>:alignment</b> property in the breadcrumb component.</p>
                </div>
            </div>
            <div class="bottom_box">
                <div class="group mb twenty">
                    <breadcrumb />
                </div>
                <div class="group mb twenty">
                    <breadcrumb :alignment="'center'" />
                </div>
                <div class="group">
                    <breadcrumb :alignment="'right'" />
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Breadcrumb from '~/components/global/Breadcrumb'

    export default {
        components: {
            'breadcrumb': Breadcrumb
        },
        data () {
            return {
                demo_separators: ['>', '-', '|', '◦', '▪']
            }
        },
        mounted () {
            const me = this
            me.$store.commit('global/settings/populateTitle', { title: 'Breadcrumb' })
        }
    }
</script>
