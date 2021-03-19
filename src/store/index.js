import { createStore } from 'vuex'
import sourceData from '@/data'

export default createStore({
  state: {
    ...sourceData
  },
  mutations: {
    setPost (state, { post }) {
      state.posts.push(post)
    },

    setPostIdToThread (state, { postId, threadId }) {
      const thread = state.threads.find((thread) => thread.id === threadId)
      thread.posts.push(postId)
    }
  },
  actions: {
    createPost ({ commit }, post) {
      post.id = 'gggg' + Math.random()
      commit('setPost', { post })
      commit('setPostIdToThread', { postId: post.id, threadId: post.threadId })
    }
  },
  modules: {
  }
})
