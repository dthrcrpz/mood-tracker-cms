<template lang="html">
    <div class="group">
        <div class="file">
            <input type="file" name="file[]" :id="`files${unique}`" :multiple="multiple" :accept="populateExtensions" class="o_hidden" @change="getFiles($event)" v-validate="{required: true, image: (type == 'image') ? true : false, size: 500000, ext: extensions}">
            <label :for="`files${unique}`" @dragover.prevent @dragenter.prevent @drop.prevent="dropFiles($event)">
                <p>Drag a {{ type }} here<br>
                or <b class="pointer">browse</b> to upload.</p>
            </label>
            <transition name="slide"><span class="validate" v-if="errors.has('file[]')">{{ properFormat(errors.first('file[]')) }}</span></transition>
        </div>
        <div class="preview_image" v-if="files.length > 0">
            <div :class="[ 'preview', (type == 'file') ? 'big' : '' ]" v-for="(data, key) in populateFiles" :key="key">
                <img src="" :id="`preview_image${key}`" v-if="type == 'image'" />
                <div class="image_close" @click="removeTempFiles(key)">×</div>
                <div class="item">
                    <span v-line-clamp="1">{{ data.name }}</span>
                </div>
                <input type="hidden" name="file_id[]" value="0">
            </div>
        </div>
        <div class="disclaimer">
            <div class="violator">Drag and drop {{ type }}.<br>
            Maximum, file size is 50 mb<br>
            Supported file formats: {{ populateExtensions }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            unique: {
                type: Number,
                default: 0
            },
            multiple: {
                type: Boolean,
                default: true
            },
            type: {
                type: String,
                default: 'image'
            },
            extensions: {
                type: Array/Object,
                default: () => {
                    return ['jpeg', 'jpg', 'png']
                }
            }
        },
        data () {
            return {
                files: []
            }
        },
        computed: {
            populateFiles () {
                const me = this
                let result
                result = me.files
                return result
            },
            populateExtensions () {
                const me = this
                let result = ''
                me.extensions.forEach((item, key) => {
                    if (key != (me.extensions.length - 1)) {
                        result += `.${item}, `
                    } else {
                        result += `.${item}`
                    }
                })

                return result
            }
        },
        methods: {
            removeTempFiles (unique) {
                const me = this,
                    data_transfer = new DataTransfer(),
                    target_file = document.getElementById(`files${me.unique}`),
                    { files } = target_file

                for (let i = 0; i < files.length; i++) {
                    const file = files[i]
                    if (unique !== i) data_transfer.items.add(file)
                    target_file.files = data_transfer.files
                    me.files = target_file.files
                }

                if (me.type == 'image') {
                    let element = document.getElementById(`files${me.unique}`)
                    for (let i = 0; i < element.files.length; i++) {

                        let reader = new FileReader()
                        reader.onload = function () {
                            let image = document.getElementById(`preview_image${i}`)
                            image.src = reader.result
                        }
                        reader.readAsDataURL(element.files[i])
                    }
                }
            },
            /**
             * manipulate files
             */
            getFiles (event) {
                const me = this
                let element = document.getElementById(`files${me.unique}`)

                if (event.target.files.length > 0) {
                    me.files = []
                    for (let i = 0; i < element.files.length; i++) {

                        me.files.push(element.files[i])

                        if (me.type == 'image') {
                            let reader = new FileReader()
                            reader.onload = function () {
                                let image = document.getElementById(`preview_image${i}`)
                                image.src = reader.result
                            }
                            reader.readAsDataURL(element.files[i])
                        }
                    }
                }
            },
            /**
             * drag and drop event files
             * @param  {[object]} event [event handler]
             */
            dropFiles (event) {
                const me = this

                let target = event.dataTransfer.files,
                    target_file = document.getElementById(`files${me.unique}`)

                const data_transfer = new DataTransfer()
                let length = (me.multiple) ? target.length : 1

                for (let i = 0; i < length; i++) {
                    data_transfer.items.add(target[i])

                    target_file.files = data_transfer.files
                    me.files = target_file.files

                    if (me.type == 'image') {
                        let reader = new FileReader()
                        reader.onload = function () {
                            let image = document.getElementById(`preview_image${i}`)
                            image.src = reader.result
                        }
                        reader.readAsDataURL(target[i])
                    }
                }
            }
        }
    }
</script>
