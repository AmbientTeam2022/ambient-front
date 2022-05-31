<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-header(elevated)
    q-toolbar

      q-btn(
        flat dense round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      )

      q-toolbar-title Ambient

      q-btn-dropdown(
        v-if="authStore.user"
        flat dense
      )
        template( #label )
          q-avatar( color="secondary" ) {{ getUserInitials }}
          //- .flex-row-gap.items-center

        template( #default )
          .row
            .column
              q-list
                q-item
                  q-item-section {{ getUserFullName }}
                q-item
                  q-item-section
                    q-item-label {{ user.organization.name }}
                    q-item-label( caption ) Organización
                q-item
                  q-item-section
                    q-item-label blabla
                    q-item-label( caption ) Otro dato

            q-separator( vertical inset ).q-mx-lg

            .column.items-center.justify-center
              q-avatar( size="70px" color="secondary" ).q-ma-sm {{ getUserInitials }}
              span {{ user?.username }}
              q-btn(
                flat color="primary"
                @click="handleLogout()"
              ) Cerrar Sesión

  q-drawer(v-model="leftDrawerOpen" show-if-above="" bordered="")
    q-list
      q-item-label(header="")
        | Essential Links
      EssentialLink(v-for="link in essentialLinks" :key="link.title" v-bind="link")
  q-page-container
    router-view
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { mapStores } from 'pinia'
import { useAuthStore } from 'src/stores/useAuthStore'
import linksList from 'src/util/linksList'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },

  computed: {
    ...mapStores(useAuthStore),

    user() {
      return this.authStore.user
    },

    getUserInitials() {
      const { firstName, lastName } = this.authStore.user
      return (
        (firstName?.toUpperCase()?.[0] || '') +
        (lastName?.toUpperCase()?.[0] || '')
      )
    },

    getUserFullName() {
      const { firstName, lastName } = this.authStore.user
      return `${firstName || ''} ${lastName || ''}`
    },
  },

  methods: {
    async handleLogout() {
      const res = await this.authStore.logout()
      if (res.status === 200) {
        this.$router.push({ name: 'login' })
      }
    },
  },
})
</script>
