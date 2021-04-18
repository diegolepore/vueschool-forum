import { createStore } from 'vuex'
import sourceData from '@/data'
import { findById, upser } from '@/helpers'

export default createStore({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  getters: {
    authUser: (state, getters) => {
      return getters.user(state.authId)
    },

    user: state => {
      return (id) => {
        const user = findById(state.users, id)

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

    thread: state => {
      return (id) => {
        const thread = findById(state.threads, id)
        return {
          ...thread,
          get author () {
            return findById(state.users, thread.userId)
          },
          get repliesCount () {
            return thread.posts.length - 1
          },
          get contributorsCount () {
            return thread.contributors.length
          }
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

    // setFirstPostIdToThread (state, { postId, threadId }) {
    //   const thread = findById(state.threads, threadId)
    //   thread.firstPostId = postId
    // },

    setPostIdToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),

    setThreadIdToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),

    setThreadIdToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' }),

    setContributorIdToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors' }),

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
      commit('setPostIdToThread', { childId: post.id, parentId: post.threadId })
      commit('setContributorIdToThread', { childId: state.authId, parentId: post.threadId })

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
      commit('setThreadIdToForum', { childId: id, parentId: forumId })
      commit('setThreadIdToUser', { childId: id, parentId: userId })

      return findById(state.threads, id)
    }
  },
  modules: {
  }
})

function makeAppendChildToParentMutation ({ parent, child }) {
  return (state, { parentId, childId }) => {
    const resource = findById(state[parent], parentId)
    resource[child] = resource[child] || []
    if (!resource[child].includes(childId)) {
      resource[child].push(childId)
    }
  }
}
