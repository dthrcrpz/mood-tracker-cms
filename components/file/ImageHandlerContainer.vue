<template>
	<div class="form_image_group">
        <label>{{ image_label }} <span>{{ (not_required) ? '*' : '' }}</span> <strong v-if="dimension.imageWidth != 0">( Max: 2MB: Dimension: {{ dimension.imageWidth }} x {{ dimension.imageHeight }} )</strong></label>
		<image-handler
			v-for="(image, key) in images"
			ref="imagePicker"
			:key="key"
			:unique="(image.id) ? image.id : image"
			:item="image"
			:image_label="image_label"
			:category="category"
			:parent="parent"
			:table_name="table_name"
			:not_required="not_required"
			:dimension="dimension"
		/>
		<!-- <button type="button" class="action_image_add" v-if="multiple" @click="addImage()">Add Image</button> -->
	</div>
</template>

<script>
	import ImageHandler from './ImageHandler'
	export default {
		props: {
			image_label: {
				type: String,
				default: 'Image'
			},
			multiple: {
				type: Boolean,
				default: false
			},
			not_required: {
				type: Boolean,
				default: true
			},
			data: {
				default: ''
			},
			parent: {
				type: Number,
				default: 0
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
			ImageHandler
		},
		data () {
			return {
				table_name: 'images',
                files: [],
				images: [0, 1],
				showCloser: false
			}
		},
		methods: {
			addImage () {
				const me = this
				me.images.push(0)
                me.determineIfShowCloser()
			},
            determineIfShowCloser () {
				const me = this
				let enabledCount = 0
				setTimeout(() => {
					me.$refs.imagePicker.forEach((item, index) => {
						if (item.enabled == true) {
							enabledCount++
						}
					})
					me.showCloser = (enabledCount > 1) ? true : false
				}, 10)
			}
		},
		mounted () {
			const me = this
			let ctr = 0
			setInterval( () => {
				if (ctr < 1 && me.data != '') {
					me.images = me.data
					me.data.forEach((item, index) => {
						me.files.push(null)
					})
					ctr++
				}
				me.determineIfShowCloser()
			}, 500)
		}
	}
</script>
