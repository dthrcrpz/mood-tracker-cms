<template>
    <div id="pagination" v-if="last > 1">
        <div :class="`next ${(current == 1) ? 'disabled' : ''}`" @click.self="prevPage(current, last)">&lsaquo;</div>

        <div :class="`number ${(current == 1) ? 'active' : ''}`" v-if="(iteration + (current - 1)) > 3 && (6) <= last" @click.self="currentPage(1, true)">1</div>
        <div class="separator" v-if="(iteration + (current - 1)) > 3 && (6) <= last">. . .</div>

        <div :class="`number ${(current == count) ? 'active' : ''}`" v-for="(count, key) in populatePager" @click.self="currentPage(count, false)">{{ getCount(count) }}</div>

        <div class="separator" v-if="(iteration + 3) < last && (incrementPage + 3) <= last">. . .</div>
        <div :class="`number ${(current == last) ? 'active' : ''}`" v-if="(iteration + 3) < last && (incrementPage + 3) <= last" @click.self="currentPage(last, false)">{{ last }}</div>

        <div :class="`prev ${(current == last) ? 'disabled' : ''}`" @click.self="nextPage(current, last)">&rsaquo;</div>
    </div>
</template>

<script>
    export default {
        props: {
            api_route: {
                type: String,
                required: true
            },
            current: {
                type: Number,
                default: 1
            },
            last: {
                type: Number,
                default: 1
            },
            total: {
                type: Number,
                default: 1
            }
        },
        data () {
            return {
                firstCount: 1,
                lastCount: 0,
                iteration: 1,
                incrementPage: 3
            }
        },
        computed: {
            populatePager () {
                const me = this
                let result = []
                for (let i = me.iteration; i <= ((me.incrementPage + 3) > me.last ? me.last : me.incrementPage); i++) {
                    result.push(i)
                }
                return result
            }
        },
        methods: {
            getCount (count) {
                const me = this
                me.lastCount = count
                return count
            },
            nextPage (current, last) {
                const me = this
                if (current != last) {
                    me.$store.commit('global/loader/checkLoader', { status: true })

                    let url = `${me.api_route}?page=${current + 1}`

                    if (me.$parent.has_search) {
                        me.$axios.post(url, me.$parent.form).then(res => {
                            me.$parent.res = res.data

                            if ((me.incrementPage + 3) <= me.last) {
                                if (current == me.incrementPage) {
                                    me.iteration = me.iteration + 3
                                    me.incrementPage = me.incrementPage + 3
                                }
                            }
                        }).catch(err => {
                            me.$store.commit('global/catcher/populateErrors', { items: err.response.data.errors })
                        }).then(() => {
                            setTimeout( () => {
                                me.$store.commit('global/loader/checkLoader', { status: false })
                                document.body.classList.remove('no_scroll', 'no_click')
                            }, 500)
                        })
                    } else {
                        me.$axios.get(url).then(res => {
                            me.$parent.res = res.data

                            if ((me.incrementPage + 3) <= me.last) {
                                if (current == me.incrementPage) {
                                    me.iteration = me.iteration + 3
                                    me.incrementPage = me.incrementPage + 3
                                }
                            }
                        }).catch(err => {
                            me.$store.commit('global/catcher/populateErrors', { items: err.response.data.errors })
                        }).then(() => {
                            setTimeout( () => {
                                me.$store.commit('global/loader/checkLoader', { status: false })
                                document.body.classList.remove('no_scroll', 'no_click')
                            }, 500)
                        })
                    }
                }
            },
            currentPage (count, first) {
                const me = this
                me.$store.commit('global/loader/checkLoader', { status: true })
                if (first) {
                    me.iteration = 1
                    me.incrementPage = 3
                } else {
                    if ((me.incrementPage + 3) <= me.last) {
                        if (count == me.last) {
                            me.iteration = (count + 1) - 3
                            me.incrementPage = count
                        }
                    }
                }

                let url = `${me.api_route}?page=${count}`

                if (me.$parent.has_search) {
                    me.$axios.post(url, me.$parent.form).then(res => {
                        me.$parent.res = res.data
                    }).catch(err => {
                        me.$store.commit('global/catcher/populateErrors', { items: err.response.data.errors })
                    }).then(() => {
                        setTimeout( () => {
                            me.$store.commit('global/loader/checkLoader', { status: false })
                            document.body.classList.remove('no_scroll', 'no_click')
                        }, 500)
                    })
                } else {
                    me.$axios.get(url).then(res => {
                        me.$parent.res = res.data

                    }).catch(err => {
                        me.$store.commit('global/catcher/populateErrors', { items: err.response.data.errors })
                    }).then(() => {
                        setTimeout( () => {
                            me.$store.commit('global/loader/checkLoader', { status: false })
                            document.body.classList.remove('no_scroll', 'no_click')
                        }, 500)
                    })
                }
            },
            prevPage (current, last) {
                const me = this
                if (current != 1) {
                    me.$store.commit('global/loader/checkLoader', { status: true })

                    let url = `${me.api_route}?page=${current - 1}`

                    if (me.$parent.has_search) {
                        me.$axios.post(url, me.$parent.form).then(res => {
                            me.$parent.res = res.data

                            if (current == me.iteration) {
                                me.iteration = me.iteration - 3
                                me.incrementPage = me.incrementPage - 3
                            }
                        }).catch(err => {
                            me.$store.commit('global/catcher/populateErrors', { items: err.response.data.errors })
                        }).then(() => {
                            setTimeout( () => {
                                me.$store.commit('global/loader/checkLoader', { status: false })
                                document.body.classList.remove('no_scroll', 'no_click')
                            }, 500)
                        })
                    } else {
                        me.$axios.get(url).then(res => {
                            me.$parent.res = res.data

                            if (current == me.iteration) {
                                me.iteration = me.iteration - 3
                                me.incrementPage = me.incrementPage - 3
                            }
                        }).catch(err => {
                            me.$store.commit('global/catcher/populateErrors', { items: err.response.data.errors })
                        }).then(() => {
                            setTimeout( () => {
                                me.$store.commit('global/loader/checkLoader', { status: false })
                                document.body.classList.remove('no_scroll', 'no_click')
                            }, 500)
                        })
                    }
                }
            }
        }
    }
</script>
