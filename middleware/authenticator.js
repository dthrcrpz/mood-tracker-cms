export default async function ({ app, redirect, route, error, store }) {
    // const token = await app.$auth.strategy.token.get()
    //
    // switch (route.name) {
    //     case 'index':
    //         if (token) {
    //             redirect('/dashboard')
    //         }
    //         break
    //     default:
    //         if (!token) {
    //             await app.$auth.logout().then(res => {
    //                 redirect('/')
    //             })
    //         }
    //         break
    // }

    // store.commit('global/settings/userAuthentication', { status: (token) ? true : false })
    store.commit('global/settings/userAuthentication', { status: true })
}
