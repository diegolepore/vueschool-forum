import Home from '@/views/Home.vue'
import ThreadDetail from '@/views/ThreadDetail.vue'
import NotFound from '@/views/NotFound.vue'
import ForumDetail from '@/views/ForumDetail.vue'
import CategoryDetail from '@/views/CategoryDetail.vue'
import UserProfile from '@/views/UserProfile.vue'
import ThreadCreate from '@/views/ThreadCreate.vue'
import ThreadUpdate from '@/views/ThreadUpdate.vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/me',
    name: 'UserProfile',
    component: UserProfile,
    meta: { toTop: true, smoothScroll: true }
  },
  {
    path: '/me/edit',
    name: 'UserProfileEdit',
    component: UserProfile,
    props: { edit: true }
  },
  {
    path: '/category/:id',
    name: 'CategoryDetail',
    component: CategoryDetail,
    props: true
  },
  {
    path: '/forum/:id',
    name: 'ForumDetail',
    component: ForumDetail,
    props: true
  },
  {
    path: '/forum/:forumId/thread/create',
    name: 'ThreadCreate',
    component: ThreadCreate,
    props: true
  },
  {
    path: '/thread/:threadId/edit',
    name: 'ThreadUpdate',
    component: ThreadUpdate,
    props: true
  },
  {
    path: '/thread/:id',
    name: 'ThreadDetail',
    component: ThreadDetail,
    props: true,
    beforeEnter (to, from, next) {
      // Check if thread exists
      const threadExists = store.state.threads.find(thread => thread.id === to.params.id)
      // If exists continue
      if (threadExists) {
        return next()
      } else {
        next({
          name: 'NotFound',
          // preserve current path and remove the first char to avoid the target URL starting with `//`
          params: { pathMatch: to.path.substring(1).split('/') },
          // preserve existing query and hash if any
          query: to.query,
          hash: to.hash
        })
      }
      // If doesn't exist redirect to not found
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to) {
    const scroll = {}
    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'

    return scroll
  }
})

export default router
