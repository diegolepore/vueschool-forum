<template>
  <form @submit.prevent="saveThread">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input v-model="form.title" type="text" id="thread_title" class="form-input" name="title" />
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        v-model="form.text"
        id="thread_content"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
      ></textarea>
    </div>

    <div class="btn-group">
      <button type="button" @click="$emit('cancel')" class="btn btn-ghost">Cancel</button>
      <button class="btn btn-blue" type="submit" name="Publish">
        {{ submitBtnLabel }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ThreadEditor',
  props: {
    title: { type: String, default: '' },
    text: { type: String, default: '' },
    submitBtnLabel: {
      type: String,
      default: 'Publish'
    }
  },
  data () {
    return {
      form: {
        title: this.title,
        text: this.text
      }
    }
  },
  methods: {
    saveThread () {
      this.$emit('saveThread', { ...this.form })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
