<template>
    <div id="login">
        <div class="wrapper">
            <div class="left">
                <img src="/company-banner.png" />
            </div>
            <div class="right">
                <div class="overlay">
                    <h2>Login</h2>
                    <h3>Welcome back, Please login to continue</h3>
                    <form class="form" @submit.prevent="submit()">
                        <div class="group floating">
                            <input type="text" :class="[ 'input', (form.email.length > 0) ? 'filled' : '' ]" name="email" autofocus autocomplete="off" v-model="form.email">
                            <label for="email">Email Address</label>
                        </div>
                        <div class="group floating">
                            <input type="password" :class="[ 'input', (form.password.length > 0) ? 'filled' : '' ]" name="password" autocomplete="off" v-model="form.password">
                            <label for="password">Password</label>
                        </div>
                        <div class="group_inline between">
                            <div class="checkbox">
                                <input type="checkbox" class="check" name="remember_me" id="remember_me" @change="form.remember_me ^= true" :checked="form.remember_me">
                                <label for="remember_me" class="pointer">Remember Me</label>
                            </div>
                            <div class="call_to_action pointer">Forgot Password?</div>
                        </div>
                        <div class="buttons">
                            <div class="primary_button outline pointer">Back To Home</div>
                            <button type="submit" class="primary_button pointer">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                form: {
                    email: '',
                    password: '',
                    remember_me: false
                }
            }
        },
        methods: {
            submit () {
                const me = this
                me.$cookies.set('access_token', 'testing123testing')
                me.$router.push('/dashboard')
            },
            initialization (event) {
                const me = this
                if (document.readyState != 'interactive') {
                    setTimeout( () => {
                        me.$store.commit('global/loader/checkLoader', { status: false })
                        me.loaded = true
                        document.body.classList.remove('no_scroll', 'no_click')
                    }, 1000)
                }
            }
        },
        mounted () {
            const me = this
            me.initialization()
        },
        asyncData ({ store }) {
            store.commit('global/loader/checkLoader', { status: true })
        },
        beforeMount () {
            window.addEventListener('load', this.initialization)
        },
        beforeDestroy () {
            window.removeEventListener('load', this.initialization)
        },
        head () {
            return {
                title: 'Welcome | Admin Template'
            }
        }
    }
</script>
