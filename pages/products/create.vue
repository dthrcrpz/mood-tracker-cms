<template lang="html">
    <div id="dashboard" v-if="loaded">

        <!-- Back Action Item -->
        <div class="actions">
            <nuxt-link to="/products" class="cancel button pointer">
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
                        <div class="group_inline two">
                            <ValidationProvider tag="div" class="group bordered filled nmb" name="name" :rules="{ required: true }" v-slot="{ errors }">
                                <label for="product_name">Name *</label>
                                <input type="text" class="input" name="product_name" autocomplete="off" placeholder="Enter name" v-model="form_data.product_name">
                                <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                            </ValidationProvider>
                            <ValidationProvider tag="div" class="group bordered filled nmb" name="price" :rules="{ required: true, regex: '^-?([0]{1}\.{1}[0-9]+|[1-9]{1}[0-9]*\.{1}[0-9]+|[0-9]+|0)$' }" v-slot="{ errors }">
                                <label for="product_price">Price *</label>
                                <input type="text" class="input" name="product_price" autocomplete="off" placeholder="Enter price" v-model="form_data.product_price">
                                <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                            </ValidationProvider>
                        </div>
                        <ValidationProvider tag="div" class="group bordered filled multi" name="tags" :rules="{ required: true }" v-slot="{ errors }">
                            <label for="tags">Tags *</label>
                            <multiselect
                                placeholder="Search a tags"
                                id="tags"
                                label="name"
                                track-by="id"
                                :options="tags"
                                :multiple="true"
                                :close-on-select="true"
                                :hide-selected="true"
                                v-model="form_data.tags">
                            </multiselect>
                            <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                        </ValidationProvider>
                        <div class="group bordered filled">
                            <label for="product_description">Description *</label>
                            <quill-editor
                                class="editor product_description"
                                :value="form_data.product_description"
                                @change="updateEditor($event, 'product_description')"
                            />
                            <transition name="slide"><span class="validate" v-if="validation.product_description">The Description field is required</span></transition>
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
                                :input_name="'file[]'"
                            />
                        </div>
                    </div>
                </div>
                <div class="buttons fixed">
                    <nuxt-link to="/products" class="cancel button half_width btn lg">Cancel</nuxt-link>
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
        data: () => ({
            loaded: false,
            tags: [],
            validation: {
                product_description: false
            },
            form_data: {
                product_name: '',
                product_price: '',
                product_description: '',
                tags: []
            }
        }),
        methods: {
            updateEditor (editor, type) {
                const me = this
                me.form_data[type] = editor.html
                me.validation[type] = (me.form_data[type].length <= 0) ? true : false
            },
            /**
             * submit post of entry
             */
            submit () {
                const me = this
                me.$refs.form.validate().then(success => {
                    if (!success) {
                        me.validateWysiwyg(me, ['product_description'])
                        me.$scrollTo('.validate', {
    						offset: -250
    					})
                        return
                    } else {
                        me.toggleModalStatus({ type: 'loader', status: true })

                        let form_data = new FormData(document.getElementById('form'))
                        form_data.append('product_description', me.form_data.product_description)
                        if (me.form_data.tags.length > 0){
							me.form_data.tags.forEach((item, index) => {
								form_data.append('tag[]', item.id)
							})
						}

                        me.$axios.post('dummies/products', form_data).then(res => {
                            me.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been added!' })
                            me.$router.push(`/products/${res.data.product.id}/update`)
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

                me.$axios.get('dummies/tags').then(res => {
                    for (let i = 0, len = res.data.tags.length; i < len; i++) {
                        let item = {
                            id: res.data.tags[i].id,
                            name: res.data.tags[i].name
                        }
                        me.tags[i] = item
                    }
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
            store.commit('global/settings/populateTitle', { title: 'Products' })
        }
    }
</script>
