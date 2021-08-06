<template lang="html">
    <div class="loader" v-if="loading">
        <div class="wrapper">
            <div class="icon">
                <img src="/logo.png" >
            </div>
            <div class="dots"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            loading: false
        }),
        methods: {
            start () {
                const me = this
                me.loading = true
            },
            finish () {
                const me = this
                setTimeout( () => {
                    me.loading = false
                }, 500)
            }
        }
    }
</script>
