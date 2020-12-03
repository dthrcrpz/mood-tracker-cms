<template lang="html">
    <div id="sidebar">
        <div class="top">
            <img src="/logo.png" />
            <h2>Admin Template</h2>
        </div>
        <div class="bottom">
            <ul class="list">
                <li class="item" v-for="(data, key) in 10" :key="key">
                    <nuxt-link to="/dashboard" class="link"><span>Dashboard</span></nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            checkHeightViewport () {
                const me = this
                let heightToDeduct = document.querySelector('#sidebar .top')
                if (document.documentElement && document.documentElement.clientHeight) {
                    document.querySelector('#sidebar .bottom').style.maxHeight = `${document.documentElement.clientHeight - heightToDeduct.scrollHeight}px`
                }
            }
        },
        mounted () {
            const me = this
            me.checkHeightViewport()
        },
        beforeMount () {
            window.addEventListener('load', this.checkHeightViewport)
            window.addEventListener('resize', this.checkHeightViewport)
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.checkHeightViewport)
            window.removeEventListener('load', this.checkHeightViewport)
        }
    }
</script>
