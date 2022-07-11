<template lang="pug">
q-list( dense )
  q-item( v-for="perm in permissions" :key="perm.name" )
    q-item-section.text-no-wrap {{ perm.text }}
    q-item-section( side )
      q-checkbox(
        :modelValue="role[perm.name]"
        size="sm"
      )
</template>

<script>
import permissions from 'src/util/roleUtil'

export default {
  name: 'PermissionsCard',
  props: {
    role: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    permissions: () => permissions,
  },
}
</script>

<style lang="scss" scoped></style>
