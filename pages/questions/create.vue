<template lang="html">
    <div id="dashboard" v-if="loaded">

        <!-- Back Action Item -->
        <div class="actions">
            <nuxt-link to="/questions" class="cancel button pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                <span>Back</span>
            </nuxt-link>
        </div>

        <!-- Action Item -->
        <ValidationObserver tag="div" ref="form">
            <form id="form" class="form mb seventy" @submit.prevent="submit()">
                <div class="box mb">
                    <div class="top_box">
                        <h2>Information</h2>
                    </div>
                    <div class="bottom_box">
                        <ValidationProvider tag="div" class="group bordered filled nmb" name="question" :rules="{ required: true }" v-slot="{ errors }">
                            <label for="question">Question *</label>
                            <input type="text" class="input" name="question" autocomplete="off" placeholder="Enter question" v-model="form_data.question">
                            <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                        </ValidationProvider>
                    </div>
                </div>

                <div class="box mb" >
                    <div class="top_box">
                        <h2>Choices</h2>
                    </div>
                    <div class="bottom_box">
                        <div class="group_inline two nmb">
                            <ValidationObserver tag="div" class="group no_border nmb" :vid="`choice_${key}`" :data-vv-scope="`choice_${key}`" v-for="(data, key) in 4" :key="key">
                                <div class="group_header inline">
                                    <h3>Choice - {{ key + 1 }}</h3>
                                </div>
                                <div class="group_inline two">
                                    <ValidationProvider tag="div" class="group bordered filled" name="choice" :rules="{ required: true }" :vid="`choice_${key}.choice[]`" :data-vv-name="`choice_${key}.choice[]`" v-slot="{ errors }">
                                        <label :for="`choice${key}`">Choice *</label>
                                        <input type="text" :name="`choice[${key}]`" :id="`choice${key}`" :data-vv-name="`choice_${key}.choice[]`" placeholder="Enter choice" autocomplete="off" class="input">
                                        <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                                    </ValidationProvider>
                                    <ValidationProvider tag="div" class="group bordered filled" name="score" :rules="{ required: true, regex: '^[0-9]+(\.[0-9]{1,2})?$' }" :vid="`choice_${key}.choice_score[]`" :data-vv-name="`choice_${key}.choice_score[]`" v-slot="{ errors }">
                                        <label :for="`choice_score${key}`">Score *</label>
                                        <input type="text" :name="`choice_score[${key}]`" :id="`choice_score${key}`" :data-vv-name="`choice_${key}.choice_score[]`" placeholder="Enter score" autocomplete="off" class="input">
                                        <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                                    </ValidationProvider>
                                </div>
                            </ValidationObserver>
                        </div>
                    </div>
                </div>

                <div class="buttons fixed">
                    <nuxt-link to="/questions" class="cancel button half_width btn lg">Cancel</nuxt-link>
                    <button type="submit" class="success button half_width btn lg pointer">Submit</button>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
    export default {
        data: () => ({
            loaded: false,
            form_data: {
                question: ''
            }
        }),
        methods: {
            /**
             * submit post of entry
             */
            submit () {
                const me = this
                me.$refs.form.validate().then(success => {
                    if (!success) {
                        me.$scrollTo('.validate', {
    						offset: -250
    					})
                        return
                    } else {
                        me.toggleModalStatus({ type: 'loader', status: true })

                        let form_data = new FormData(document.getElementById('form'))

                        me.$axios.post('questions', form_data).then(res => {
                            me.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been added!' })
                            me.$router.push(`/questions/${res.data.question.id}/update`)
                        }).catch(err => {
                            me.toggleModalStatus({ type: 'catcher', status: true, item: { errors: err.response.data.errors } })
                        }).then(() => {
                            setTimeout( () => {
                                me.toggleModalStatus({ type: 'loader', status: false })
                            }, 500)
                        })
                    }
                    me.$nextTick(() => {
                        me.$refs.form.reset()
                    })
                })
            },
            initialization () {
                const me = this
                me.toggleModalStatus({ type: 'loader', status: true })
                setTimeout( () => {
                    me.toggleModalStatus({ type: 'loader', status: false })
                    me.loaded = true
                }, 500)
            }
        },
        mounted () {
            const me = this
            me.initialization()
        },
        asyncData ({ store }) {
            store.commit('global/settings/populateTitle', { title: 'Questions' })
        }
    }
</script>
