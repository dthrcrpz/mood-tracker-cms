<template lang="html">
    <div id="dashboard" v-if="loaded">

        <!-- Back Action Item -->
        <div class="actions">
            <nuxt-link to="/banners" class="cancel button pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                <span>Back</span>
            </nuxt-link>
            <!-- <nuxt-link to="/banners/create" class="success button pointer ml ten">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span>Add Another</span>
            </nuxt-link> -->
        </div>

        <!-- Action Item -->
        <ValidationObserver tag="div" ref="form">
            <form id="form" class="form mb seventy" @submit.prevent="submit()">
                <div class="box mb">
                    <div class="top_box">
                        <h2>Information</h2>
                    </div>
                    <div class="bottom_box">
                        <ValidationProvider tag="div" class="group bordered filled" name="name" :rules="{ required: true }" v-slot="{ errors }">
                            <label for="product_name">Name *</label>
                            <input type="text" class="input" name="product_name" autocomplete="off" placeholder="Enter name" v-model="res.product_name">
                            <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                        </ValidationProvider>
                        <div class="group bordered filled">
                            <label for="banner_description">Description *</label>
                            <quill-editor
                                class="editor banner_description"
                                :value="form_data.banner_description"
                                @change="updateEditor($event, 'banner_description')"
                                @update="updateEditor($event, 'banner_description')"
                            />
                            <transition name="slide"><span class="validate" v-if="validation.banner_description">The Description field is required</span></transition>
                        </div>
                    </div>
                </div>
                <div class="box mb">
                    <div class="top_box">
                        <h2>Asset</h2>
                    </div>
                    <div class="bottom_box">
                        <div class="group nmb">
                            <image-handler-container
                                :parent="res.id"
                                :data="res.images"
                                :input_name="'file[]'"
                            />
                        </div>
                    </div>
                </div>
                <div class="buttons fixed">
                    <nuxt-link to="/banners" class="cancel button half_width btn lg">Cancel</nuxt-link>
                    <button type="submit" class="success button half_width btn lg pointer">Submit</button>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
    export default {
        components: {
            ImageHandlerContainer: () => import('~/components/file/ImageHandlerContainer')
        },
        data: ({ $moment }) => ({
            loaded: false,
            res: null,
            validation: {
                banner_description: false
            },
            form_data: {
                banner_description: ''
            }
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
                        me.validateWysiwyg(me, ['banner_description'])
                        me.$scrollTo('.validate', {
    						offset: -250
    					})
                        return
                    } else {
                        me.toggleModalStatus({ type: 'loader', status: true })

                        let form_data = new FormData(document.getElementById('form'))
                        form_data.append('_method', 'PATCH')
                        form_data.append('banner_description', me.form_data.banner_description)

                        me.$axios.post('dummies/banner-data', form_data).then(res => {
                            me.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been updated!' })
                            me.initialization()
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

                me.$axios.get('dummies/banner-data').then(res => {
                    me.res = res.data.bannerData
                    me.form_data.banner_description = me.res.banner_description
                }).catch(err => {
                    me.toggleModalStatus({ type: 'catcher', status: true, item: { errors: err.response.data.errors } })
                }).then(() => {
                    setTimeout( () => {
                        me.toggleModalStatus({ type: 'loader', status: false })
                        me.loaded = true
                    }, 500)
                })
            }
        },
        mounted () {
            const me = this
            me.initialization()
        },
        asyncData ({ store }) {
            store.commit('global/settings/populateTitle', { title: 'Banners' })
        }
    }
</script>
