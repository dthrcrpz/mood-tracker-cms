export const Catcher = () => import('../../components/global/modal/Catcher.vue' /* webpackChunkName: "components/catcher" */).then(c => wrapFunctional(c.default || c))
export const Confirmation = () => import('../../components/global/modal/Confirmation.vue' /* webpackChunkName: "components/confirmation" */).then(c => wrapFunctional(c.default || c))
export const DeleteConfirmation = () => import('../../components/global/modal/DeleteConfirmation.vue' /* webpackChunkName: "components/delete-confirmation" */).then(c => wrapFunctional(c.default || c))
export const Loader = () => import('../../components/global/modal/Loader.vue' /* webpackChunkName: "components/loader" */).then(c => wrapFunctional(c.default || c))
export const Alert = () => import('../../components/global/Alert.vue' /* webpackChunkName: "components/alert" */).then(c => wrapFunctional(c.default || c))
export const Bottombar = () => import('../../components/global/Bottombar.vue' /* webpackChunkName: "components/bottombar" */).then(c => wrapFunctional(c.default || c))
export const Breadcrumb = () => import('../../components/global/Breadcrumb.vue' /* webpackChunkName: "components/breadcrumb" */).then(c => wrapFunctional(c.default || c))
export const Pagination = () => import('../../components/global/Pagination.vue' /* webpackChunkName: "components/pagination" */).then(c => wrapFunctional(c.default || c))
export const Sidebar = () => import('../../components/global/Sidebar.vue' /* webpackChunkName: "components/sidebar" */).then(c => wrapFunctional(c.default || c))
export const Topbar = () => import('../../components/global/Topbar.vue' /* webpackChunkName: "components/topbar" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
