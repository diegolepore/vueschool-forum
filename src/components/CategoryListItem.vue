<template>
  <div class="forum-list">
    <h2 class="list-title">
      <router-link v-if="showLinkTitle" :to="{name: 'CategoryDetail', params: {id: category.id}}">
        {{ category.name }}
      </router-link>
      <template v-else>
        {{ category.name }}
      </template>
    </h2>
    <ForumList :forums="categoryForums"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ForumList from '@/components/ForumList'

export default {
  name: 'CategoryListItem',
  components: {
    ForumList
  },
  props: {
    category: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState([
      'forums'
    ]),

    categoryForums () {
      return this.forums.filter(forum => forum.categoryId === this.category.id)
    },

    showLinkTitle () {
      return !this.$route.fullPath.includes(this.category.id)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
