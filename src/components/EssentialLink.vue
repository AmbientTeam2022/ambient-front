<template lang="pug">
q-item(
  clickable=""
  tag="a"
  v-bind="attrs"
)
  q-item-section( v-if="icon" avatar )
    q-icon( :name="icon" )
  q-item-section
    q-item-label {{ title }}
    q-item-label( caption ) {{ caption }}
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    link: {
      type: String,
      default: null,
    },

    to: {
      type: Object,
      default: null,
    },

    icon: {
      type: String,
      default: '',
    },

    href: {
      type: String,
      default: '',
    },
  },
  computed: {
    attrs() {
      const { to, href } = this
      return to ? { to } : { href, target: '_blank' }
    },
  },
})
</script>
