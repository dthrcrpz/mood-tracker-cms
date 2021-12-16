<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="actions inline">
			<nuxt-link to="/users" class="cancel button pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
				<span>Back</span>
			</nuxt-link>
		</div>

		<form id="form" class="form mb seventy" @submit.prevent>
			<div class="box mb">
				<div class="top_box">
					<h2>Information</h2>
				</div>
				<div class="bottom_box">
					<div class="group_inline two">
						<div class="group bordered">
							<label for="first_name">First Name</label>
							<input type="text" class="input disabled" readonly v-model="res.user.first_name">
						</div>
						<div class="group bordered">
							<label for="last_name">Last Name</label>
							<input type="text" class="input disabled" readonly v-model="res.user.last_name">
						</div>
					</div>
					<div class="group bordered">
						<label for="email">Email Address</label>
						<input type="text" class="input disabled" readonly v-model="res.user.email">
					</div>
				</div>
			</div>

			<table class="table striped">
				<thead>
					<tr>
						<th class="stick">
							<div class="label">
								#
							</div>
						</th>
						<th class="stick">
							<div class="label">
								Date
							</div>
						</th>
						<th class="stick">
							<div class="label">
								Score
							</div>
						</th>
						<th class="stick">
							<div class="label">
								Result
							</div>
						</th>
					</tr>
				</thead>
				<tbody v-if="res.history.length > 0">
					<tr v-for="(data, key) in res.history" :key="key">
						<td>{{ key + 1 }}</td>
						<td>{{ data.date }}</td>
						<td>{{ data.result.score }}</td>
						<td>{{ data.result.result }}</td>
					</tr>
				</tbody>
				<tbody class="no_results" v-else>
					<tr>
						<td colspan="5">No Result(s) Found.</td>
					</tr>
				</tbody>
			</table>
		</form>
	</div>
</template>

<script>
	export default {
		data: () => ({
			loaded: false,
			res: null
		}),
		methods: {
			initialization () {
				const me = this
				me.toggleModalStatus({ type: 'loader', status: true })
				setTimeout( () => {
					me.toggleModalStatus({ type: 'loader', status: false })
					me.loaded = true
				}, 500)
			}
		},
		mounted () {
			const me = this
			me.initialization()
		},
		asyncData ({ $axios, store, params }) {
			store.commit('global/settings/populateTitle', { title: 'Users' })

			return $axios.get(`users/${params.id}`).then(res => {
				return {
					res: res.data
				}
			}).catch(err => {
				store.commit('global/catcher/populateErrors', { items: err.response.data.errors })
			})
		}
	}
</script>
