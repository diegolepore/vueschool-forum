import { createStore } from 'vuex'
import sourceData from '@/data'
import { findById, upser } from '@/helpers'

export default createStore({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  getters: {
    authUser: state => {
      const user = findById(state.users, state.authId)

      if (!user) return null

      return {
        ...user,

        get posts () {
          return state.posts.filter(post => post.userId === user.id)
        },

        get postsCount () {
          return this.posts.length
        },

        get threads () {
          return state.threads.filter(thread => thread.userId === user.id)
        },

        get threadsCount () {
          return this.threads.length
        }
      }
    }
  },
  mutations: {
    setPost (state, { post }) {
      upser(state.posts, post)
    },

    setThread (state, { thread }) {
      upser(state.threads, thread)
    },

    // editPost (state, { text, postId }) {
    //   const postIndex = state.posts.findIndex(post => post.id === postId)
    //   state.posts[postIndex] = { ...state.posts[postIndex], text }
    // },

    setPostIdToThread (state, { postId, threadId }) {
      const thread = findById(state.threads, threadId)
      thread.posts = thread.posts || []
      thread.posts.push(postId)
    },

    // setFirstPostIdToThread (state, { postId, threadId }) {
    //   const thread = findById(state.threads, threadId)
    //   thread.firstPostId = postId
    // },

    setThreadIdToForum (state, { threadId, forumId }) {
      const forum = findById(state.forums, forumId)
      forum.threads = forum.threads || []
      forum.threads.push(threadId)
    },

    setThreadIdToUser (state, { threadId, userId }) {
      const user = findById(state.users, userId)
      user.threads = user.threads || []
      user.threads.push(threadId)
    },

    setUpdateUserData (state, payload) {
      const userIndex = state.users.findIndex(user => user.id === state.authId)
      state.users[userIndex] = payload
    },

    setUpdateThread (state, { title, text, threadId }) {
      const threadIndex = state.threads.findIndex((thread) => thread.id === threadId)
      state.threads[threadIndex] = { ...state.threads[threadIndex], title, text }
    }
  },
  actions: {
    createPost ({ commit, state }, payload) {
      const { text, threadId } = payload
      const post = {
        text,
        threadId,
        id: 'gggg' + Math.random(),
        userId: state.authId,
        publishedAt: Math.floor(Date.now() / 1000)
      }
      commit('setPost', { post })
      commit('setPostIdToThread', { postId: post.id, threadId: post.threadId })

      // if (payload.isCreatingThread) {
      //   commit('setFirstPostIdToThread', { postId: post.id, threadId: post.threadId })
      // }
    },

    updateUserData ({ commit }, payload) {
      commit('setUpdateUserData', payload)
    },

    updateThread ({ commit, state }, payload) {
      const { title, text, threadId } = payload
      const thread = findById(state.threads, threadId)
      const post = findById(state.posts, thread.posts[0])
      const newThread = { ...thread, title }
      const newPost = { ...post, text }

      commit('setThread', { thread: newThread })
      commit('setPost', { post: newPost })
      // commit('setUpdateThread', payload)
      // commit('editPost', { text, postId: thread.firstPostId })
      return newThread
    },

    async createThread ({ commit, state, dispatch }, { title, text, forumId }) {
      const id = 'gggg' + Math.random()
      const userId = state.authId
      const publishedAt = Math.floor(Date.now() / 1000)

      const thread = {
        forumId,
        title,
        publishedAt,
        userId,
        id
      }

      commit('setThread', { thread })
      dispatch('createPost', { text, threadId: id, isCreatingThread: true })
      commit('setThreadIdToForum', { threadId: id, forumId })
      commit('setThreadIdToUser', { threadId: id, userId })

      return findById(state.threads, id)
    }
  },
  modules: {
  }
})
