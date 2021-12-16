<template lang="html">
	<div id="dashboard" v-if="loaded">

		<table class="table">
			<thead>
				<tr>
					<th class="stick">
						<div class="label">
							#
						</div>
					</th>
					<th class="stick">
						<div class="label">
							Full Name
						</div>
					</th>
					<th class="stick">
						<div class="label">
							Email
						</div>
					</th>
					<th class="stick">
						<div class="label">
							Date Created
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
					<td>{{ key + 1 }}</td>
					<td>
						<div class="name">{{ data.fullname }}</div>
					</td>
					<td>{{ data.email }}</td>
					<td>{{ $moment(data.created_at).format('MMM DD, YYYY hh:mm A') }}</td>
					<td class="buttons" width="110px">
						<div class="wrapper">
							<nuxt-link :to="`/users/${data.id}/view`" class="item success pointer">
								<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" class="icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
								<span>View</span>
							</nuxt-link>
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
			store.commit('global/settings/populateTitle', { title: 'Users' })

			return $axios.get('users').then(res => {
				return {
					res: res.data.users
				}
			}).catch(err => {
				store.commit('global/modal/toggleModalStatus', { type: 'catcher', status: true, item: { errors: err.response.data.errors } })
			})
		}
	}
</script>
