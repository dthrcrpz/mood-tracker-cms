<template lang="html">
    <div id="dashboard" v-if="loaded">

        <!-- Back Action Item -->
        <div class="actions">
            <nuxt-link to="/" class="cancel button pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                <span>Back</span>
            </nuxt-link>
        </div>

        <!-- Action Item -->
        <ValidationObserver tag="div" ref="form">
            <form id="form" class="form mb seventy" @submit.prevent="submit()">
                <div class="box mb">
                    <div class="top_box inline">
                        <h2>Information</h2>
                        <div class="top_right">
                            <!-- Action Items -->
                            <div id="switch" :class="(form.featured) ? 'success toggled' : 'cancel'">
                                <label for="switch_featured" @click="toggle('featured')"></label>
                                <input
                                    type="checkbox"
                                    name="switch_featured"
                                    id="switch_featured"
                                    :checked="form.featured"
                                />
                                <span>Featured</span>
                            </div>
                        </div>
                    </div>
                    <div class="bottom_box">
                        <ValidationProvider tag="div" class="group bordered filled" name="Title" :rules="{ required: true }" v-slot="{ errors }">
                            <label for="title">Title *</label>
                            <input type="text" class="input" name="title" autocomplete="off" placeholder="Enter title" v-model="form.title">
                            <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                        </ValidationProvider>
                        <ValidationProvider tag="div" class="group select bordered filled" name="Category" :rules="{ required: true }" v-slot="{ errors }">
                            <label for="category_id">Category *</label>
                            <select class="input" name="category_id" v-model="form.category_id">
                                <option value="" disabled selected>Select a category</option>
                                <option value="1">Category 1</option>
                            </select>
                            <div class="dd"></div>
                            <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                        </ValidationProvider>
                        <div class="group_inline three">
                            <ValidationProvider tag="div" class="group bordered filled" name="First Name" :rules="{ required: true }" v-slot="{ errors }">
                                <label for="first_name">First Name *</label>
                                <input type="text" class="input" name="first_name" autocomplete="off" placeholder="Enter first name" v-model="form.first_name">
                                <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                            </ValidationProvider>
                            <ValidationProvider tag="div" class="group bordered filled" name="Middle Name" :rules="{ required: true }" v-slot="{ errors }">
                                <label for="middle_name">Middle Name *</label>
                                <input type="text" class="input" name="middle_name" autocomplete="off" placeholder="Enter middle name" v-model="form.middle_name">
                                <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                            </ValidationProvider>
                            <ValidationProvider tag="div" class="group bordered filled" name="Last Name" :rules="{ required: true }" v-slot="{ errors }">
                                <label for="last_name">Last Name *</label>
                                <input type="text" class="input" name="last_name" autocomplete="off" placeholder="Enter last name" v-model="form.last_name">
                                <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                            </ValidationProvider>
                        </div>
                        <div class="group_inline two">
                            <ValidationProvider tag="div" class="group bordered filled" name="Subtitle" :rules="{ required: true }" v-slot="{ errors }">
                                <label for="subtitle">Subtitle *</label>
                                <input type="text" class="input" name="subtitle" autocomplete="off" placeholder="Enter subtitle" v-model="form.subtitle">
                                <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                            </ValidationProvider>
                            <ValidationProvider tag="div" class="group bordered filled" name="Date" :rules="{ required: true }" v-slot="{ errors }">
                                <label for="date">Date *</label>
                                <v-ctk v-model="form.date" :format="'YYYY-MM-DD'" :only-date="true" :no-button="true" :formatted="'YYYY-MM-DD'" :no-label="true" :color="'#FF9000'" :id="'date'" :name="'date'" :label="'Select date'"></v-ctk>
                                <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                            </ValidationProvider>
                        </div>
                        <div class="group bordered filled">
                            <label for="description">Description *</label>
                            <quill-editor
                                class="editor description"
                                :value="form.description"
                                @change="updateEditor($event, 'description')"
                            />
                            <transition name="slide"><span class="validate" v-if="validation.description">The Description field is required</span></transition>
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
                                ref="image_handler"
                                :multiple="false"
                                :input_name="'image[]'"
                            />
                        </div>
                        <div class="group nmb">
                            <asset-container />
                        </div>
                    </div>
                </div>
                <div class="box mb">
                    <div class="top_box">
                        <h2>Metatags</h2>
                    </div>
                    <div class="bottom_box">
                        <ValidationProvider tag="div" class="group bordered filled" name="Meta Title" :rules="{ required: true, min: 50, max: 100 }" v-slot="{ errors }">
                            <label for="meta_title">Meta Title *</label>
                            <input type="text" class="input" name="meta_title" autocomplete="off" placeholder="Enter meta title" v-model="form.meta_title">
                            <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                        </ValidationProvider>
                        <ValidationProvider tag="div" class="group bordered filled" name="Meta Description" :rules="{ required: true, min: 150, max: 200 }" v-slot="{ errors }">
                            <label for="meta_description">Meta Description *</label>
                            <textarea name="meta_description" class="input" rows="8" placeholder="Enter meta description" v-model="form.meta_description"></textarea>
                            <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                        </ValidationProvider>
                    </div>
                </div>
                <div class="buttons fixed">
                    <nuxt-link to="/" class="cancel button half_width btn lg">Cancel</nuxt-link>
                    <button type="submit" class="success button half_width btn lg pointer">Submit</button>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
    export default {
        components: {
            ImageHandlerContainer: () => import('~/components/file/ImageHandlerContainer'),
            AssetContainer: () => import('~/components/file/AssetContainer')
        },
        data: ({ $moment }) => ({
            loaded: false,
            validation: {
                description: false
            },
            form: {
                category_id: 1,
                first_name: '',
                middle_name: '',
                last_name: '',
                title: '',
                subtitle: '',
                description: '',
                date: $moment().format('YYYY-MM-DD'),
                featured: false,
                meta_title: '',
                meta_description: ''
            }
        }),
        methods: {
            updateEditor (editor, type) {
                const me = this
                me.form[type] = editor.html
                me.validation[type] = (me.form[type].length <= 0) ? true : false
            },
            /**
             * toggle switch
             * @param  {[string]} type [type of switch]
             */
            toggle (type) {
                const me = this
                me.form[type] ^= true
            },
            /**
             * submit post of entry
             */
            submit () {
                const me = this
                me.$refs.form.validate().then(success => {
                    if (!success) {
                        me.validateWysiwyg(me, ['description'])
                        me.$scrollTo('.validate', {
    						offset: -250
    					})
                        return
                    } else {
                        me.toggleModalStatus({ type: 'loader', status: true })
                        // axios
                        setTimeout( () => {
                            me.toggleModalStatus({ type: 'loader', status: false })
                        }, 500)
                    }
                    me.$nextTick(() => {
                        me.$refs.form.reset()
                    })
                })
            }
        },
        mounted () {
            const me = this
            me.toggleModalStatus({ type: 'loader', status: true })
            setTimeout( () => {
                me.toggleModalStatus({ type: 'loader', status: false })
                me.loaded = true
            }, 500)
        },
        asyncData ({ store }) {
            store.commit('global/settings/populateTitle', { title: 'Form Layout' })
        }
    }
</script>
