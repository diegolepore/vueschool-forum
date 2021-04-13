<template>
  <div class="col-large push-top">
    <h1>
      {{ thread.title }}
      <router-link :to="{ name: 'ThreadUpdate', params: { threadId: thread.id } }" class="btn-green btn-small">Edit thread</router-link>
    </h1>

    <p>
      By <a href="#" class="link-unstyled">{{ userById(thread.userId).name }}</a
      >, 2 hours ago.
      <span
        style="float: right; margin-top: 2px"
        class="hide-mobile text-faded text-small"
        v-if="thread.posts && thread.contributors"
        >{{ thread.posts.length }} replies by
        {{ thread.contributors.length }} contributors</span
      >
    </p>

    <post-list :posts="threadPosts" />

    <post-editor-form @save-post="addPost" />

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PostList from '@/components/PostList'
import PostEditorForm from '../components/PostEditorForm.vue'

export default {
  name: 'PageThreadDetail',
  components: {
    PostList,
    PostEditorForm
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState([
      'threads',
      'posts',
      'users'
    ]),

    thread () {
      return this.threads.find((thread) => thread.id === this.id)
    },

    threadPosts () {
      return this.posts.filter((post) => post.threadId === this.thread.id)
    }
  },
  methods: {
    ...mapActions([
      'createPost'
    ]),

    userById (userId) {
      return this.users.find((user) => user.id === userId)
    },
    addPost (eventData) {
      const post = {
        ...eventData.newPost,
        threadId: this.id
      }

      this.createPost(post)
    }
  }
}
</script>
