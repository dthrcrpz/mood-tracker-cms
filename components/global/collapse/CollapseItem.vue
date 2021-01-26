<template lang="html">
    <div :id="`item_${item.id}`" :class="[ 'collapse_item', (item.open) ? 'toggled' : '' ]">
        <div class="item_top pointer" @click="toggleItem(item)">
            <h2>{{ item.name }}</h2>
        </div>
        <div class="item_bottom">
            <div class="description" v-html="item.description"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object,
                default: () => {
                    return {
                        name: 'Collapse',
                        description: 'The quick brown fox jumps over the lazy dog.',
                        open: false
                    }
                }
            }
        },
        methods: {
            toggleItem (item) {
                const me = this,
                    target = document.getElementById(`item_${item.id}`)

                item.open ^= true
                if (item.open) {
                    target.querySelector('.description').style.height = `${target.querySelector('.description').scrollHeight}px`
                } else {
                    target.querySelector('.description').style.height = '0px'
                }
                me.$parent.checkItems(item)
            }
        }
    }
</script>
