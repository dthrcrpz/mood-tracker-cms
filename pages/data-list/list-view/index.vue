<template lang="html">
    <div id="dashboard">
        <table class="table list_view">
            <thead>
                <tr>
                    <th>Test</th>
                    <th>Test</th>
                    <th>Test</th>
                    <th>Test</th>
                    <th>Test</th>
                    <th>Test</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, key) in 10" :key="key">
                    <td>Test</td>
                    <td>Test</td>
                    <td>Test</td>
                    <td>Test</td>
                    <td>Test</td>
                    <td>Test</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {

    }
</script>
