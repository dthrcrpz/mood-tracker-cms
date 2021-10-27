import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import Quill from 'quill'

import ImageResize from 'quill-image-resize-vue'

Quill.register('modules/imageResize', ImageResize)

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

Vue.use(VueQuillEditor, {
    modules: {
        imageResize: {},
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video']
        ]
    }
})
