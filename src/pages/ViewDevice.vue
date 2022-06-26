<template lang="pug">
.container.q-pa-lg.q-px-xl
  .content.flex-col-gap( v-if="device" )
    h1.text-h4 Monitor del Dispositivo

    q-card
      q-card-section.row
        q-list.col-6
          q-item
            q-item-section
              q-item-label( overline ).text-primary Nombre
              q-item-label {{ device.name }}
          q-item
            q-item-section
              q-item-label( overline ).text-primary Ambiente
              q-item-label {{ device.habitat.name }}
        q-list.col-6
          q-item
            q-item-section
              q-item-label( overline ).text-primary UUID
              q-item-label {{ device.uuid }}
          q-item
            q-item-section
              q-item-label( overline ).text-primary Modelo
              q-item-label {{ device.category.name }}

    h2.text-h5.q-mt-md Sensores

    q-card
      q-card-section
        q-list
          q-item( v-for="sensor in sensors" :key="sensor.name" )
            q-item-section( avatar )
              q-icon(
                :name="getParamIcon(sensor.name)"
                size="md"
              )
            q-item-section.text-right
              q-item-label.q-mr-xl( :class="getParamNameClass(sensor)" ) {{ getParamText(sensor.name) }}
            q-separator( vertical )
            q-item-section.text-center
              q-item-label( caption ) Min
              q-item-label.text-h4 {{ sensor.min }}
            q-item-section.text-center
              q-item-label( caption ) Valor
              q-item-label.text-h4( :class="getSensorClass(sensor)" ) {{ sensor.value }}
            q-item-section.text-center
              q-item-label( caption ) Max
              q-item-label.text-h4 {{ sensor.max }}

  .loading( v-else )
    q-spinner-radio(
      color="secondary"
      size="4em"
    )
</template>

<script>
import { mapStores } from 'pinia'
import { useDeviceStore } from 'src/stores/useDeviceStore'
import paramMixin from 'src/util/mixins/paramMixin'

export default {
  mixins: [paramMixin],
  data() {
    return {
      device: null,
      sensors: null,
      timer: null,
    }
  },
  computed: {
    ...mapStores(useDeviceStore),
  },
  methods: {
    async fetchData() {
      const { uuid } = this.$route.params
      const res = await this.deviceStore.getDevice(uuid)

      if (res.status === 200) {
        this.device = res.data
        this.sensors = this.device.param.map((p) => ({
          ...p,
          value: this.device.sensor.find((s) => s.name === p.name).value,
        }))
        console.log(res.data.param)
      } else {
        this.$q.notify({
          message: res.data.msg || 'Error al cargar los datos del dispositivo',
          position: 'top',
          color: 'negative',
        })
      }
    },
  },
  async created() {
    await this.fetchData()
    this.timer = setInterval(this.fetchData, 5000)
  },
  beforeRouteLeave(to, from, next) {
    if (this.timer) clearInterval(this.timer)
    next()
  },
}
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
}
</style>
