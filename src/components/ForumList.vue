<template>
  <div class="col-full">
    <div class="forum-list">
      <div class="forum-listing" v-for="forum in forums" :key="forum.id">
        <div class="forum-details">
          <router-link class="text-xlarge" :to="{ name: 'ForumDetail', params: { id: forum.id } }">{{ forum.name }}</router-link>
          <p>{{ forum.description }}</p>
        </div>

        <div class="threads-count">
          <p v-if="forum.threads"><span class="count">{{ forum.threads.length }}</span> {{ forum.threads.length > 1 ? 'threads' : 'thread' }}</p>
          <p v-else>No threads</p>
        </div>

        <div class="last-thread">
          <!-- TO-DO -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForumList',
  props: {
    forums: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
