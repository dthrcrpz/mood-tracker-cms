<template lang="html">
    <div id="collapse" :class="type">
        <collapse-item :item="item" v-for="(item, key) in populateItems" :key="key" />
    </div>
</template>

<script>
    import CollapseItem from '~/components/collapse/CollapseItem'

    export default {
        components: {
            CollapseItem
        },
        props: {
            items: {
                type: Object/Array,
                default: () => {
                    return [
                        {
                            name: 'Collapse',
                            description: 'The quick brown fox jumps over the lazy dog.',
                            open: false
                        }
                    ]
                }
            },
            type: {
                type: String,
                default: 'collapse'
            },
            collapse: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            populateItems () {
                const me = this,
                    results = []

                me.items.forEach((item, key) => {
                    results.push(item)
                })

                return results
            }
        },
        methods: {
            checkItems (data) {
                const me = this
                me.items.forEach((item, key) => {
                    let target = document.getElementById(`item_${item.id}`)
                    if (!me.collapse) {
                        if (data.id != item.id) {
                            item.open = false
                            target.querySelector('.description').style.height = '0px'
                        }
                    } else {
                        if (item.open) {
                            target.querySelector('.description').style.height = `${target.querySelector('.description').scrollHeight}px`
                        }
                    }
                })
            }
        }
    }
</script>
