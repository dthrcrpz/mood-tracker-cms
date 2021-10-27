<template lang="html">
    <div id="dashboard" v-if="loaded">
        <quill-editor
            class="editor"
            ref="myTextEditor"
            :value="content"
            :options="options"
            @change="onEditorChange"
        />

        <div class="preview" v-html="content"></div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            loaded: false,
            options: {
                modules: {
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
            },
            content: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
        }),
        computed: {
            editor() {
                const me = this
                return me.$refs.myTextEditor.quill
            }
        },
        methods: {
            onEditorChange (editor) {
                const me = this
                me.content = editor.html
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
            store.commit('global/settings/populateTitle', { title: 'Wysiwyg' })
        }
    }
</script>
