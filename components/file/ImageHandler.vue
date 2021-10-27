<template>
    <ValidationObserver tag="div" v-if="enabled" :vid="`image_form_${unique}`" :data-vv-scope="`image_form_${unique}`">
        <ValidationProvider tag="div" class="group" name="File" :vid="`image_form_${unique}.file[]`" :data-vv-name="`image_form_${unique}.${input_name}`" ref="provider" v-slot="{ errors, validate }" :rules="file_rules">
            <input type="file" class="action_image" accept=".jpeg, .jpg, .png" :id="`image${unique}`" :name="input_name" ref="file" :data-vv-name="`image_form_${unique}.${input_name}`" @change="getFile($event)">
            <label class="action_image_label" :for="`image${unique}`">Choose File</label>
            <div v-if="$parent.showCloser" class="action_image_remove" @click="removeImage($event, unique, item.id, parent)">Remove</div>
            <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
        </ValidationProvider>

        <input type="hidden" name="file_id[]" v-model="dataImage.id">
        <input type="hidden" name="file_category[]" v-model="category">

        <div class="form_tags_group" v-if="showTags">
            <div class="preview_group">
                <img :id="`preview_image${unique}`" :src="`${(item != null) ? item.path : ''}`" />
            </div>
            <div class="tags_group">
                <ValidationProvider tag="div" class="group bordered filled" :name="`${image_label} Title`" :rules="{ required: true, regex: '^[a-zA-Z0-9\-_ |\_]*$', max: 50 }" :vid="`image_form_${unique}.file_title[]`" :data-vv-name="`image_form_${unique}.file_title[]`" v-slot="{ errors }">
                    <label :for="`image_title${unique}`">{{ image_label }} Title <span>*</span></label>
                    <input type="text" name="file_title[]" :id="`image_title${unique}`" :data-vv-name="`image_form_${unique}.file_title[]`" autocomplete="off" class="input" v-model="dataImage.title">
                    <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                </ValidationProvider>
                <ValidationProvider tag="div" :class="[ 'group bordered filled', ($parent.multiple) ? '' : (show_image_mode) ? '' : 'nmb' ]" :name="`${image_label} Alt`" :vid="`image_form_${unique}.file_alt[]`" :data-vv-name="`image_form_${unique}.file_alt[]`" :rules="{ required: true, regex: '^[a-zA-Z0-9\_\-]*$', max: 50 }" v-slot="{ errors }">
                    <label :for="`image_alt${unique}`">{{ image_label }} Alt <span>*</span></label>
                    <input type="text" name="file_alt[]" :id="`image_alt_${unique}`" :data-vv-name="`image_form_${unique}.file_alt[]`" autocomplete="off" class="input" v-model="dataImage.alt">
                    <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                </ValidationProvider>
                <template v-if="$parent.multiple">
                    <ValidationProvider tag="div" :class="[ 'group bordered filled', (!show_image_mode) ? '' : 'nmb' ]" :name="`${image_label} Sequence`" :rules="{ required: true, numeric: true, min_value: 1, max_value: 99 }" :vid="`image_form_${unique}.file_sequence[]`" :data-vv-name="`image_form_${unique}.file_sequence[]`" v-slot="{ errors }">
                        <label :for="`image_sequence${unique}`">{{ image_label }} Sequence <span>*</span></label>
                        <input type="text" name="file_sequence[]" :id="`image_sequence_${unique}`" :data-vv-name="`image_form_${unique}.file_sequence[]`" autocomplete="off" class="input" v-model="dataImage.sequence">
                        <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                    </ValidationProvider>
                </template>
                <template v-if="show_image_mode">
                    <ValidationProvider tag="div" class="group select bordered filled" :name="`${image_label} Mode`" :rules="{ required: true }" :vid="`image_form_${unique}.file_mode[]`" :data-vv-name="`image_form_${unique}.file_mode[]`" v-slot="{ errors }">
                        <label  :for="`image_mode_${unique}`">{{ image_label }} Mode <span>*</span></label>
                        <select class="input" name="file_mode[]" :id="`image_mode_${unique}`" :data-vv-name="`image_form_${unique}.file_mode[]`" v-model="dataImage.mode">
                            <option value="" disabled selected>Select a mode</option>
                            <option value="dark">Dark</option>
                            <option value="light">Light</option>
                        </select>
                        <div class="dd"></div>
                        <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                    </ValidationProvider>
                </template>
            </div>
        </div>
        <!-- Delete Confirmation -->
        <delete-confirmation
            ref="confirmation"
            :item="'image'"
            :for_asset="true"
            :api="api"
        />
    </ValidationObserver>
</template>

<script>
    import DeleteConfirmation from '~/components/file/modal/DeleteConfirmation'

    export default {
        props: {
            input_name: {
				type: String,
				default: 'file[]'
			},
            required: {
                type: Boolean,
                default: true
            },
            show_image_mode: {
                type: Boolean,
                default: false
            },
            item: {
                default: 0
            },
            unique: {
                type: Number
            },
            parent: {
                type: Number,
                default: 0
            },
            table_name: {
                type: String,
                default: 'images'
            },
            image_label: {
				type: String,
				default: 'Image'
			},
            category: {
                type: String,
                default: 'image'
            },
            dimension: {
                type: Object,
                default: function () {
                    return {
                        imageWidth: 0,
                        imageHeight: 0
                    }
                }
            }
        },
        components: {
            DeleteConfirmation
        },
        data () {
            return {
                file_rules: { required: true },
                api: '',
                showTags: false,
                enabled: true,
                dataImage: {
                    id: 0,
                    title: '',
                    alt: '',
                    sequence: 0,
                    mode: 'dark'
                },
                populated: false,
                image_interval: null
            }
        },
        methods: {
            getFile (event) {
                const me = this
                me.$refs.provider.validate(event).then(success => {
                    if (success) {
                        let element = event.target
                        if (element.files[0]) {
                            element.nextElementSibling.innerText = element.files[0].name
                            me.showTags = true
                            me.$parent.files[me.unique] = me.$refs.file.files[0]
                        }
                        if (element.files && element.files[0]) {
                            let reader = new FileReader()
                            reader.onload = function () {
                                let image = document.getElementById(`preview_image${me.unique}`)
                                image.src = reader.result
                            }
                            setTimeout( () => {
                                reader.readAsDataURL(element.files[0])
                                if (me.$parent.$parent.collapsible) {
                                    let target = document.getElementById('item_1')
                                    target.style.height = `${target.scrollHeight}px`
                                }
                            }, 10)
                        }
                    }
                })
            },
            removeImage (event, unique, key, parent) {
                let me = this
                me.$parent.files.forEach((file, index) => {
                    if (unique == index) {
                        me.$parent.files.splice(index, 1)
                    }
                })
                if (me.item == 0) {
					me.enabled = false
					me.$parent.determineIfShowCloser()
				} else {
                    setTimeout( () => {
                        me.api = `images/${key}`
                        me.$refs.confirmation.opened = true
                    }, 10)
				}
            },
            checkRules () {
                const me = this

                if (me.required) {
                    if (me.dimension.imageWidth == 0) {
                        me.file_rules = { required: (me.dataImage.id) ? false : true, image: true, ext: ['jpeg', 'jpg', 'png', 'svg'], size: 20000 }
                    } else {
                        me.file_rules = { required: (me.dataImage.id) ? false : true, image: true, ext: ['jpeg', 'jpg', 'png', 'svg'], size: 20000, dimensions: [me.dimension.imageWidth, me.dimension.imageHeight] }
                    }
                } else {
                    if (me.dimension.imageWidth == 0) {
                        me.file_rules = { image: true, ext: ['jpeg', 'jpg', 'png', 'svg'], size: 20000 }
                    } else {
                        me.file_rules = { image: true, ext: ['jpeg', 'jpg', 'png', 'svg'], size: 20000, dimensions: [me.dimension.imageWidth, me.dimension.imageHeight] }
                    }
                }

                if (me.item) {
                    me.populated = true
                }
            }
        },
        mounted () {
            const me = this
            me.image_interval = setInterval( () => {
                if (!me.populated) {
                    if (me.item) {
                        me.dataImage.id = (me.item.id != null) ? me.item.id : 0
                        me.dataImage.title = (me.item.title) ? me.item.title : ''
                        me.dataImage.alt = (me.item.alt) ? me.item.alt : ''
                        me.dataImage.sequence = (me.item.sequence) ? me.item.sequence : 0
                        me.dataImage.mode = (me.item.file_mode) ? me.item.file_mode : 'dark'
                        me.showTags = (me.item && me.item.id) ? true : false
                    }
                    me.checkRules()
                } else {
                    clearInterval(me.image_interval)
                }
            }, 500)
        }
    }
</script>
