<template>
  <TheNavbar />
  <div class="container">
    <!-- <h1>
      {{ appVersion }}
    </h1> -->
    <router-view/>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'

export default {
  name: 'App',
  data () {
    return {
      appVersion: process.env.VUE_APP_VERSION
    }
  },
  components: {
    TheNavbar
  },
  mounted () {
    console.log(process.env)
  }
}
</script>

<style>
@import 'assets/style.css';
</style>
