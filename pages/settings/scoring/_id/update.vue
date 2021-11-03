<template lang="html">
    <div id="dashboard" v-if="loaded">

        <!-- Back Action Item -->
        <div class="actions inline">
            <nuxt-link to="/settings/scoring" class="cancel button pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                <span>Back</span>
            </nuxt-link>

            <nuxt-link to="/settings/scoring/create" class="success button ml ten pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span>Add Another</span>
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
                        <div class="group_inline two">
                            <ValidationProvider tag="div" class="group bordered filled nmb" name="result" :rules="{ required: true }" v-slot="{ errors }">
                                <label for="result">Result *</label>
                                <input type="text" class="input" name="result" autocomplete="off" placeholder="Enter result" v-model="res.result">
                                <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                            </ValidationProvider>
                            <ValidationProvider tag="div" class="group bordered filled nmb" name="score" :rules="{ required: true, regex: '^[0-9]+(\.[0-9]{1,2})?$' }" v-slot="{ errors }">
                                <label for="score">Score *</label>
                                <input type="text" name="score" id="score" placeholder="Enter score" autocomplete="off" class="input" v-model="res.score">
                                <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                            </ValidationProvider>
                        </div>
                        <div class="group bordered filled">
                            <label for="remarks">Remarks *</label>
                            <quill-editor
                                class="editor remarks"
                                :value="form_data.remarks"
                                @change="updateEditor($event, 'remarks')"
                            />
                            <transition name="slide"><span class="validate" v-if="validation.remarks">The remarks field is required</span></transition>
                        </div>
                    </div>
                </div>

                <div class="buttons fixed">
                    <nuxt-link to="/settings/scoring" class="cancel button half_width btn lg">Cancel</nuxt-link>
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
            validation: {
                remarks: false
            },
            form_data: {
                remarks: ''
            },
            res: null
        }),
        methods: {
            updateEditor (editor, type) {
                const me = this
                me.form_data[type] = document.querySelector(`.editor.${type} .ql-editor`).innerHTML
                me.validation[type] = (me.form_data[type].length <= 0) ? true : false
            },
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
                        form_data.append('_method', 'PATCH')
                        form_data.append('remarks', me.form_data.remarks)

                        me.$axios.post(`scoring-settings/${me.$route.params.id}`, form_data).then(res => {
                            me.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been updated!' })
                            me.$nuxt.refresh()
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
        asyncData ({ $axios, store, params }) {
            store.commit('global/settings/populateTitle', { title: 'Scoring' })

            return $axios.get(`scoring-settings/${params.id}`).then(res => {
                return {
                    res: res.data.scoringSetting,
                    form_data: {
                        remarks: res.data.scoringSetting.remarks
                    }
                }
            }).catch(err => {
                store.commit('global/catcher/populateErrors', { items: err.response.data.errors })
            })
        }
    }
</script>
