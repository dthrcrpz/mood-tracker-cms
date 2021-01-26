<template lang="html">
    <div id="collapse">
        <collapse-item :item="item" v-for="(item, key) in populateItems" :key="key" />
    </div>
</template>

<script>
    import CollapseItem from '~/components/global/collapse/CollapseItem'

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
            }
        },
        computed: {
            populateItems () {
                const me = this,
                    results = []

                me.items.forEach((item, ket) => {
                    results.push(item)
                })

                return results
            }
        },
        methods: {
            checkItems (data) {
                const me = this
                me.items.forEach((item, key) => {
                    if (data.id != item.id) {
                        let target = document.getElementById(`item_${item.id}`)
                        item.open = false
                        target.querySelector('.description').style.height = '0px'
                    }
                })
            }
        }
    }
</script>
