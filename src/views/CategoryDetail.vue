<template>
  <h1>{{ category.name }}</h1>
  <div class="col-full">
    <CategoryListItem :category="category"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CategoryListItem from '@/components/CategoryListItem'

export default {
  name: 'CategoryDetail',
  components: {
    CategoryListItem
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapState([
      'categories'
    ]),

    category () {
      return this.categories.find(category => category.id === this.id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
