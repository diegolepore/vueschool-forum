<template>
  <div class="col-large push-top">
    <h1>
      {{ thread.title }}
      <router-link :to="{ name: 'ThreadUpdate', params: { threadId: thread.id } }" class="btn-green btn-small">Edit thread</router-link>
    </h1>

    <p>
      By <a href="#" class="link-unstyled">{{ thread.author.name }}</a
      >, <base-date :timestamp="thread.publishedAt" />
      <span
        style="float: right; margin-top: 2px"
        class="hide-mobile text-faded text-small"
        v-if="thread.posts && thread.contributors"
        >{{ thread.repliesCount }} replies by
        {{ thread.contributorsCount }} contributors</span
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
      console.log(this.$store.getters.thread(this.id))
      return this.$store.getters.thread(this.id)
    },

    threadPosts () {
      return this.posts.filter((post) => post.threadId === this.thread.id)
    }
  },
  methods: {
    ...mapActions([
      'createPost'
    ]),

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
