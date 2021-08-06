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
                    <ValidationObserver tag="div" ref="form">
                        <form class="form" @submit.prevent="submit()">
                            <ValidationProvider tag="div" class="group floating" name="Email" :rules="{ required: true }" v-slot="{ errors }">
                                <input type="text" :class="[ 'input', (form.email.length > 0) ? 'filled' : '' ]" name="email" autofocus autocomplete="off" v-model="form.email">
                                <label for="email">Email Address</label>
                                <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                            </ValidationProvider>
                                <ValidationProvider tag="div" class="group floating" name="Password" :rules="{ required: true }" v-slot="{ errors }">
                                <input type="password" :class="[ 'input', (form.password.length > 0) ? 'filled' : '' ]" name="password" autocomplete="off" v-model="form.password">
                                <label for="password">Password</label>
                                <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                            </ValidationProvider>
                            <div class="buttons">
                                <a href="https://bit-interchange.com" class="primary_button outline pointer">Back To Home</a>
                                <button type="submit" class="primary_button pointer">Login</button>
                            </div>
                        </form>
                    </ValidationObserver>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            form: {
                email: '',
                password: '',
                remember_me: false
            }
        }),
        methods: {
            submit () {
                const me = this
                me.$refs.form.validate().then(success => {
                    if (!success) {
                        me.$scrollTo('.validate', {
    						offset: -250
    					})
                        return
                    } else {
                        // me.$store.commit('global/loader/checkLoader', { status: true })
                        //
                        // me.$auth.loginWith('local', { data: me.form }).then(res => {
                            me.$router.push('/dashboard')
                        // }).catch(err => {
                        //     me.$store.commit('global/catcher/populateErrors', { items: err.response.data.errors })
                        // }).then(() => {
                        //     me.$store.commit('global/loader/checkLoader', { status: false })
                        //     document.body.classList.remove('no_scroll', 'no_click')
                        // })
                    }
                    me.$nextTick(() => {
                      me.$refs.form.reset()
                    })
                })
            }
        },
        head () {
            return {
                title: 'Welcome | Admin Template'
            }
        }
    }
</script>
