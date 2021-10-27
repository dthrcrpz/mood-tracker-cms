<template lang="html">
    <div id="dashboard" v-if="loaded">

        <div class="box mb">
            <div class="top_box">
                <h2>Confirmation</h2>
            </div>
            <div class="bottom_box">
                <div class="box_group_inline">
                    <div class="primary_button pointer" @click="toggleModalStatus({ type: 'confirmation', status: true, item: { action: 'primary' } })">Confirm</div>
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
                <div class="box_group_inline">
                    <div :class="[ data.class, 'mr ten pointer', 'outline' ]" v-for="(data, key) in buttons" :key="key" @click="toggleType(data)">{{ data.name }}</div>
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
            toggleType (data) {
                const me = this
                console.log(data);
                me.toggleModalStatus({ type: 'confirmation', status: true, item: { action: data.dialog } })
            }
        },
        mounted () {
            const me = this
            me.toggleModalStatus({ type: 'loader', status: true })
            setTimeout( () => {
                me.toggleModalStatus({ type: 'loader', status: false })
                me.loaded = true
            }, 500)
        },
        asyncData ({ store }) {
            store.commit('global/settings/populateTitle', { title: 'Dialog' })
        }
    }
</script>
