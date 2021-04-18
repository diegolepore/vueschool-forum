<template>
  <div class="col-full push-top">
      <div class="forum-header">
          <div class="forum-details">
              <h1>{{ forum.name }} </h1>
              <p class="text-lead">{{ forum.description }}</p>
          </div>
          <router-link :to="{ name: 'ThreadCreate', params: { forumId: forum.id } }" class="btn-green btn-small">Start a thread</router-link>
      </div>
  </div>

  <div class="col-full push-top">
    <ThreadList :threads="filteredThreads"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ThreadList from '@/components/ThreadList'

export default {
  name: 'ForumDetail',
  components: {
    ThreadList
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState([
      'forums',
      'threads'
    ]),

    forum () {
      return this.forums.find((forum) => forum.id === this.id)
    },

    filteredThreads () {
      return this.forum.threads.map((threadId) => this.$store.getters.thread(threadId))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
