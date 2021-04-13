<template>
  <div class="col-full">
    <form @submit.prevent="savePost">
      <div class="form-group">
        <textarea v-model="postText" class="form-input" name="" id="" cols="30" rows="10"></textarea>
      </div>
      <div class="form-actions">
        <button class="btn-blue">Submit post</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PostEditorForm',
  data () {
    return {
      postText: ''
    }
  },
  methods: {
    savePost () {
      const newPost = {
        text: this.postText
      }

      this.$emit('save-post', { newPost })

      this.postText = ''
    }
  }
}
</script>

<style lang="css" scoped>

</style>
