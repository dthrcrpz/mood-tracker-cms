<template lang="html">
    <div id="tab">
        <div class="tab_top">
            <h2>{{ tab.title }}</h2>
        </div>
        <div class="tab_bottom">
            <tab-item v-for="(item, key) in tab.items" :key="key">
                test
            </tab-item>
        </div>
    </div>
</template>

<script>
    import TabItem from '~/components/tabs/TabItem'

    export default {
        components: {
            TabItem
        },
        props: {
            tab: {
                type: Array/Object,
                default: () => {
                    return {
                        title: 'Tab 1',
                        items: [
                            {
                                name: 'Tab Item 1',
                                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                            }
                        ]
                    }
                }
            }
        }
    }
</script>
