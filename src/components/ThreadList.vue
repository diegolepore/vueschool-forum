<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>

      <div v-for="thread in threads" :key="thread.id" class="thread">
        <div>
          <p>
            <router-link :to="{ name: 'ThreadDetail', params: { id: thread.id } }"> {{ thread.title }} </router-link>
          </p>
          <p class="text-faded text-xsmall">
            By <a href="profile.html">{{ userById(thread.userId).name }}</a>,
            <base-date :timestamp="thread.publishedAt" />
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">{{ thread.repliesCount }} replies </p>

          <img
            class="avatar-medium"
            :src="userById(thread.userId).avatar"
            alt=""
          />

          <div>
            <p class="text-xsmall">
              <a href="profile.html">{{ userById(thread.userId).name }}</a>
            </p>
            <p class="text-xsmall text-faded">
              <base-date :timestamp="thread.publishedAt" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ThreadList',
  props: {
    threads: {
      type: Array,
      required: true,
      default: () => ([])
    }
  },
  computed: {
    ...mapState([
      'posts',
      'users'
    ])
  },
  methods: {
    postById (postId) {
      return this.posts.find((post) => post.id === postId)
    },
    userById (userId) {
      return this.users.find((user) => user.id === userId)
    }
  }
}
</script>
