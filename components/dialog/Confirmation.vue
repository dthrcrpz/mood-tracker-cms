<template lang="html">
    <transition name="fade">
        <div id="dialog" :class="[ 'basic', (centered) ? 'centered' : '' ]" v-if="opened">
            <div class="wrapper">
                <div :class="[ 'content', type ]">
                    <div class="close pointer" @click="close()">×</div>
                    <div class="content_top">
                        {{ property.title }}
                    </div>
                    <div class="content_middle">
                        {{ property.description }}
                    </div>
                    <div class="content_bottom">
                        <div class="inline">
                            <div class="cancel_button outline pointer mr ten" @click="close()">{{ property.cancel }}</div>
                            <div class="primary_button pointer" @click="close()">{{ property.success }}</div>
                        </div>
                    </div>
                </div>
                <div class="backdrop" @click="close()"></div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            property: {
                type: Array/Object,
                default: () => {
                    return {
                        title: 'Confirmation',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                        cancel: 'Cancel',
                        success: 'Confirm'
                    }
                }
            },
            centered: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                opened: false
            }
        },
        methods: {
            close () {
                const me = this
                me.opened = false
            }
        }
    }
</script>
