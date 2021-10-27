<template lang="html">
    <div id="header">
        <div class="header_nav">
            <div class="title">
                {{ title }}
            </div>
            <breadcrumb :separator="'◦'" />
        </div>
        <div :class="`header_select ${(isToggled) ? 'active' : ''}`" v-click-outside="closeMe">
            <div class="header_user" @click="showSelect()">
                <!-- <img :src="user.images[0].path" v-if="user.images.length > 0" /> -->
                <div class="user_picture">
                    <div class="overlay">
                        MA
                    </div>
                </div>
                <div class="user_name">Hello, Admin!</div>
            </div>
            <div class="user_select">
                <div class="select_header">
                    <div class="select_info">
                        <div class="header_name">Admin</div>
                        <div class="header_role">Master Admin</div>
                    </div>
                </div>
                <div class="select_footer">
                    <nuxt-link to="/my-account" class="select_item account" @click.native.self="isToggled = false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#ff9000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        <span>My Account</span>
                    </nuxt-link>
                    <div class="pointer select_item logout" @click="logout()">
                        <span>Sign Out</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#ff9000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Breadcrumb from '~/components/global/Breadcrumb'

    export default {
        components: {
            Breadcrumb
        },
        data () {
            return {
                isToggled: false
            }
        },
        computed: {
            ...mapGetters({
                title: 'global/settings/getTitle'
            })
        },
        methods: {
            showSelect () {
                this.isToggled ^= true
            },
            closeMe () {
                this.isToggled = false
            },
            logout () {
                const me = this
                me.$store.state.isAuth = false
                window.location.assign('/')
            }
        }
    }
</script>
