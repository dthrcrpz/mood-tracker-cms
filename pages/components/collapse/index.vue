<template lang="html">
    <div id="dashboard" v-if="loaded">

        <!-- Collapse 0 -->
        <div :class="[ 'box mb collapse', (toggled.first) ? 'toggled' : '' ]">
            <div class="top_box item_top">
                <h2>Accordion</h2>
                <div class="arrow pointer" @click="toggleCollapse(0, 'first')"></div>
            </div>
            <div id="item_0" class="item_bottom bottom_box npb">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </div>

        <!-- Collapse 1 -->
        <div :class="[ 'box mb collapse', (toggled.second) ? 'toggled' : '' ]">
            <div class="top_box item_top">
                <h2>Accordion</h2>
                <div class="arrow pointer" @click="toggleCollapse(1, 'second')"></div>
            </div>
            <div id="item_1" class="item_bottom bottom_box npb">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data: () => ({
            loaded: false,
            toggled: {
                first: true,
                second: false
            }
        }),
        methods: {
            /**
             * collapse the form layout
             * @param  {[number]} unique [unique key identifier]
             * @param  {[string]} type   [type of collapse to toggle]
             */
            toggleCollapse (unique, type) {
                const me = this
                let toggled = false,
                    target = document.getElementById(`item_${unique}`)

                me.toggled[type] ^= true
                toggled = me.toggled[type]

                if (toggled) {
                    target.style.height = `${target.scrollHeight}px`
                } else {
                    target.style.height = '0px'
                }
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
            store.commit('global/settings/populateTitle', { title: 'Collapse' })
        }
    }
</script>
