<template lang="html">
    <div id="dashboard" v-if="loaded">
        <div class="box mb">
            <div class="top_box">
                <h2>Default</h2>
                <div class="description" v-html="form.editor"></div>
            </div>
            <div class="bottom_box">
                <quill-editor
                    class="editor"
                    ref="myTextEditor"
                    :value="form.editor"
                    :options="options"
                    @change="onEditorChange"
                />
            </div>
        </div>
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
            form: {
                editor: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
            }
        }),
        methods: {
            onEditorChange (editor) {
                const me = this
                me.form.editor = editor.html
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
            store.commit('global/settings/populateTitle', { title: 'Quill Editor' })
        }
    }
</script>
