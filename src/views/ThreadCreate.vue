<template>
  <div class="col-full push-top">
    <h1>Create new thread in <i> {{ forum.name }} </i></h1>

    <ThreadEditor @save-thread="saveThread" @cancel="cancel" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ThreadEditor from '@/components/ThreadEditor'

export default {
  name: 'ThreadCreate',
  components: {
    ThreadEditor
  },
  props: {
    forumId: {
      type: String,
      required: true
    }
  },
  computed: {
    forum () {
      return this.$store.state.forums.find((forum) => forum.id === this.forumId)
    }
  },
  methods: {
    ...mapActions(['createThread']),

    async saveThread ({ title, text }) {
      const thread = await this.createThread({ title, text, forumId: this.forum.id })
      this.$router.push({ name: 'ThreadDetail', params: { id: thread.id } })
    },

    cancel () {
      this.$router.push({ name: 'ForumDetail', params: { id: this.forumId } })
    }
  }
}
</script>
