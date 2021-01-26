<template lang="html">
    <div id="sidebar" :class="[ (has_toggled) ? 'floating' : '', 'hovered' ]" @focus="enter()" @mouseenter="enter()" @mouseleave="leave()">
        <div class="top">
            <img src="/logo.png" />
            <h2>Designblue Manila</h2>
            <div class="toggle pointer" @click="toggleNav()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#ff9000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fill">
                    <circle cx="12" cy="12" r="10"></circle>
                    <transition name="fade">
                        <circle cx="12" cy="12" r="3" v-if="!has_toggled"></circle>
                    </transition>
                </svg>
            </div>
        </div>
        <div class="shadow"></div>
        <div class="bottom">
            <ul class="list">
                <li class="item" v-for="(data, key) in links" :key="key">
                    <nuxt-link :event="''" :to="data.slug" :class="[ 'link', (data.subs) ? 'parent' : '' ]" exact-active-class="exact"
                        active-class="active" @click.native.self="navigate(data, $event)">
                        <div class="link_icon" v-html="data.icon"></div>
                        <span>{{ data.name }}</span>
                    </nuxt-link>
                    <div class="sub" v-if="data.subs">
                        <ul class="sub_list">
                            <li class="sub_item" v-for="(sub, key) in data.subs" :key="key">
                                <nuxt-link class="sub_link" :to="sub.slug" exact-active-class="exact"
                                    active-class="active">
                                    <div class="sub_link_icon" v-html="sub.icon"></div>
                                    <span>{{ sub.name }}</span>
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        data () {
            return {
                hovered: false
            }
        },
        computed: {
            ...mapGetters ({
                links: 'global/sidebar/getLinks',
                has_toggled: 'global/sidebar/hasToggled'
            })
        },
        methods: {
            navigate (data, event) {
                const me = this,
                    target = event.target

                if (data.subs) {
                    if (!target.parentNode.classList.contains('toggled')) {
                        target.nextElementSibling.style.height = `${target.nextElementSibling.scrollHeight}px`
                        target.parentNode.classList.add('toggled')
                    } else {
                        target.nextElementSibling.style.height = 0
                        target.parentNode.classList.remove('toggled')
                    }
                } else {
                    me.$router.push(data.slug)
                }
            },
            enter () {
                const me = this,
                    elements = document.querySelectorAll('.list .toggled .sub')

                if (!me.hovered) {
                    elements.forEach((element, index) => {
                        setTimeout( () => {
                            const length = element.querySelectorAll('.sub_list').length
                            const height = element.querySelector('.sub_list').scrollHeight
                            const currentHeight = height * length
                            element.style.height = `${currentHeight}px`
                        }, 500)
                    })
                }
                me.hovered = true

                document.getElementById('sidebar').classList.add('hovered')
            },
            leave () {
                const me = this,
                    elements = document.querySelectorAll('.list .toggled .sub')

                elements.forEach((element, index) => {
                    setTimeout( () => {
                        const length = element.querySelectorAll('.sub_list').length
                        const height = element.querySelector('.sub_list').scrollHeight
                        const currentHeight = height * length
                        element.style.height = `${currentHeight}px`
                    }, 500)
                })

                me.hovered = false
                document.getElementById('sidebar').classList.remove('hovered')
            },
            toggleNav () {
                const me = this
                me.$store.commit('global/sidebar/checkToggler', { status: (me.has_toggled) ? false : true })
            },
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
