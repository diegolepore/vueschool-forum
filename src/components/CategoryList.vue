<template>
  <div class="col-full" v-for="category in categories" :key="category.id">
    <CategoryListItem :category="category"/>
  </div>
</template>

<script>
import CategoryListItem from '@/components/CategoryListItem'

export default {
  name: 'CategoryList',
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  components: {
    CategoryListItem
  }
}
</script>
