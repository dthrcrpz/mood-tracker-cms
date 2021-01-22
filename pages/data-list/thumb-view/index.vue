<template lang="html">
    <div id="dashboard">
        <table class="table">
            <thead>
                <tr>
                    <th class="stick sort">
                        <div class="label pointer asc">
                            Full Name
                        </div>
                    </th>
                    <th class="stick sort">
                        <div class="label pointer desc">
                            Gender
                        </div>
                    </th>
                    <th class="stick sort">
                        <div class="label pointer">
                            Birthday
                        </div>
                    </th>
                    <th class="stick sort">
                        <div class="label pointer">
                            Contact Number
                        </div>
                    </th>
                    <th class="stick sort">
                        <div class="label pointer">
                            Email Address
                        </div>
                    </th>
                    <th class="stick">
                        <div class="label">
                            Action
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, key) in 20" :key="key">
                    <td class="thumb">
                        <div class="wrapper pointer">
                            <img src="/default-image.png" v-if="key == 1 || key == 3" />
                            <div class="image" v-else>
                                <div class="overlay">
                                    JD
                                </div>
                            </div>
                            <div class="name">Juan Dela Cruz</div>
                        </div>
                    </td>
                    <td>Male</td>
                    <td>{{ $moment().format('MMM DD, YYYY') }}</td>
                    <td>09012345678</td>
                    <td>juandelacruz@gmail.com</td>
                    <td class="actions">
                        <div class="item edit pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" class="icon"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            <span>Edit</span>
                        </div>
                        <div class="item ml delete pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" class="icon"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            <span>Delete</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        mounted () {
            const me = this
            me.$store.commit('global/settings/populateTitle', { title: 'Thumb View' })
        }
    }
</script>
