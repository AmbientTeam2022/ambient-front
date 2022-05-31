<template lang="pug">
router-view
</template>

<script>
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'
import { useAuthStore } from './stores/useAuthStore'

export default defineComponent({
  name: 'App',
  computed: {
    ...mapStores(useAuthStore),
  },
  created() {
    this.authStore.loadUser()
  },
})
</script>
