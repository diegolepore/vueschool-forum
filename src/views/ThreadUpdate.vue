<template>
  <div class="col-full push-top">
    <h1>Editing <i> {{ thread.title }} </i></h1>

    <ThreadEditor :title="thread.title" :submit-btn-label="'Update'" :text="postText" @save-thread="saveUpdate" @cancel="cancel" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ThreadEditor from '@/components/ThreadEditor'

export default {
  name: 'ThreadUpdate',
  components: {
    ThreadEditor
  },
  props: {
    threadId: {
      type: String,
      required: true
    }
  },
  computed: {
    thread () {
      return this.$store.state.threads.find((thread) => thread.id === this.threadId)
    },

    postText () {
      return this.$store.state.posts.find((post) => post.id === this.thread.posts[0]).text
      // return this.$store.state.posts.find((post) => post.id === this.thread.firstPostId).text
    }
  },
  methods: {
    ...mapActions(['updateThread']),

    async saveUpdate ({ title, text }) {
      const thread = await this.updateThread({ title, text, threadId: this.threadId })
      this.$router.push({ name: 'ThreadDetail', params: { id: thread.id } })
    },

    cancel () {
      this.$router.push({ name: 'ThreadDetail', params: { id: this.threadId } })
    }
  }
}
</script>
