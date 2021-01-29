<template lang="html">
    <div id="alert" :class="type" v-if="!remove">
        <div class="wrapper">
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'primary'
            },
            message: {
                type: String,
                default: 'The quick brown fox jumps over the lazy dog.'
            },
            auto_dismiss: {
                type: Boolean,
                default: false
            },
            dismiss_time: {
                type: Number,
                default: 5000
            }
        },
        data () {
            return {
                remove: false
            }
        },
        methods: {
            initializeDismissal () {
                const me = this
                setTimeout( () => {
                    me.remove = true
                }, me.dismiss_time)
            }
        },
        mounted () {
            const me = this
            if (me.auto_dismiss) {
                me.initializeDismissal()
            }
        }
    }
</script>
