<template lang="html">
    <div class="group">
        <div class="file">
            <input type="file" name="file[]" id="files" multiple class="o_hidden" @change="getFiles($event)" v-validate="{required: true, image: true, size: 500000, ext: ['jpeg', 'jpg', 'png']}">
            <label for="files" @dragover.prevent @dragenter.prevent @drop.prevent="dropFiles($event)">
                <p>Drag a file here<br>
                or <b class="pointer">browse</b> to upload.</p>
            </label>
            <transition name="slide"><span class="validate" v-if="errors.has('file[]')">{{ properFormat(errors.first('file[]')) }}</span></transition>
        </div>
        <div class="preview_image" v-if="files.length > 0">
            <div class="preview" v-for="(data, key) in populateFiles" :key="key">
                <img src="" :id="`preview_image${key}`" />
                <div class="close" @click="removeTempFiles(key)"></div>
                <div class="file">
                    <span v-line-clamp="1">{{ data.name }}</span>
                </div>
            </div>
        </div>
        <div class="disclaimer">
            <div class="violator">Drag and drop files.<br>
            Maximum, file size is 50 mb<br>
            Supported file formats: jpg, jpeg, png</div>
        </div>
    </div>
</template>

<script>
    export default {
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
            }
        },
        methods: {
            removeTempFiles (unique) {
                const me = this,
                    data_transfer = new DataTransfer(),
                    target_file = document.getElementById('files'),
                    { files } = target_file

                for (let i = 0; i < files.length; i++) {
                    const file = files[i]
                    if (unique !== i) data_transfer.items.add(file)
                    target_file.files = data_transfer.files
                    me.files = target_file.files
                }

                let element = document.getElementById('files')
                for (let i = 0; i < element.files.length; i++) {

                    let reader = new FileReader()
                    reader.onload = function () {
                        let image = document.getElementById(`preview_image${i}`)
                        image.src = reader.result
                    }
                    reader.readAsDataURL(element.files[i])
                }
            },
            /**
             * manipulate files
             */
            getFiles (event) {
                const me = this
                if (event.target.files[0]) {
                    let element = document.getElementById('files')

                    if (element.files.length > 0) {
                        me.files = []
                        for (let i = 0; i < element.files.length; i++) {

                            me.files.push(element.files[i])

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
                    target_file = document.getElementById('files')

                const data_transfer = new DataTransfer()
                let length = target.length

                for (let i = 0; i < length; i++) {
                    data_transfer.items.add(target[i])

                    target_file.files = data_transfer.files
                    me.files = target_file.files

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
</script>
