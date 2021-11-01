<template lang="html">
    <div id="dashboard" v-if="loaded">

        <!-- Add Action Item -->
        <div class="actions">
            <nuxt-link to="/questions/create" class="success button pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span>Add Item</span>
            </nuxt-link>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th class="stick">
                        <div class="label">
                            Question
                        </div>
                    </th>
                    <th class="stick">
                        <div class="label">
                            Choices
                        </div>
                    </th>
                    <th class="stick">
                        <div class="label">
                            Sequence
                        </div>
                    </th>
                    <th class="stick">
                        <div class="label">
                            Action
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody v-if="res.length > 0">
                <tr v-for="(data, key) in res" :key="key">
                    <td>
                        <nuxt-link :to="`/questions/${data.id}/update`" class="name">{{ data.question }}</nuxt-link>
                    </td>
                    <td>{{ data.choices.length }}</td>
                    <td>{{ data.sequence }}</td>
                    <td class="buttons" width="208px">
                        <div class="wrapper">
                            <nuxt-link :to="`/questions/${data.id}/update`" class="item edit pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" class="icon"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                <span>Edit</span>
                            </nuxt-link>
                            <div class="item ml delete pointer" @click="toggleModalStatus({ type: 'delete_confirmation', status: true, item: { api: `/questions/${data.id}`, item_type: 'question' } })">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" class="icon"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                <span>Delete</span>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tbody class="no_results" v-else>
                <tr>
                    <td colspan="5">No Result(s) Found.</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data: () => ({
            res: [],
            loaded: false
        }),
        mounted () {
            const me = this
            me.toggleModalStatus({ type: 'loader', status: true })
            setTimeout( () => {
                me.toggleModalStatus({ type: 'loader', status: false })
                me.loaded = true
            }, 500)
        },
        asyncData ({ $axios, store }) {
            store.commit('global/settings/populateTitle', { title: 'Questions' })

            return $axios.get('questions').then(res => {
                return {
                    res: res.data.questions
                }
            }).catch(err => {
                store.commit('global/modal/toggleModalStatus', { type: 'catcher', status: true, item: { errors: err.response.data.errors } })
            })
        }
    }
</script>
