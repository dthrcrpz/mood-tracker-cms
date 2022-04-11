import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _16ea9f70 = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _5012ba2e = () => interopDefault(import('../pages/questions/index.vue' /* webpackChunkName: "pages/questions/index" */))
const _7c09eb38 = () => interopDefault(import('../pages/users/index.vue' /* webpackChunkName: "pages/users/index" */))
const _4e9204f5 = () => interopDefault(import('../pages/questions/create.vue' /* webpackChunkName: "pages/questions/create" */))
const _0463aa5d = () => interopDefault(import('../pages/settings/scoring/index.vue' /* webpackChunkName: "pages/settings/scoring/index" */))
const _a07427fe = () => interopDefault(import('../pages/settings/scoring/create.vue' /* webpackChunkName: "pages/settings/scoring/create" */))
const _20c7be43 = () => interopDefault(import('../pages/settings/scoring/_id/update.vue' /* webpackChunkName: "pages/settings/scoring/_id/update" */))
const _4d938592 = () => interopDefault(import('../pages/questions/_id/update.vue' /* webpackChunkName: "pages/questions/_id/update" */))
const _f5529d90 = () => interopDefault(import('../pages/users/_id/view.vue' /* webpackChunkName: "pages/users/_id/view" */))
const _812d332a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/dashboard",
    component: _16ea9f70,
    name: "dashboard"
  }, {
    path: "/questions",
    component: _5012ba2e,
    name: "questions"
  }, {
    path: "/users",
    component: _7c09eb38,
    name: "users"
  }, {
    path: "/questions/create",
    component: _4e9204f5,
    name: "questions-create"
  }, {
    path: "/settings/scoring",
    component: _0463aa5d,
    name: "settings-scoring"
  }, {
    path: "/settings/scoring/create",
    component: _a07427fe,
    name: "settings-scoring-create"
  }, {
    path: "/settings/scoring/:id/update",
    component: _20c7be43,
    name: "settings-scoring-id-update"
  }, {
    path: "/questions/:id/update",
    component: _4d938592,
    name: "questions-id-update"
  }, {
    path: "/users/:id/view",
    component: _f5529d90,
    name: "users-id-view"
  }, {
    path: "/",
    component: _812d332a,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
