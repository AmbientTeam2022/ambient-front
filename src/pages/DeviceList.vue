<template lang="pug">
.q-pa-lg.flex-col-gap
  .row.justify-between
    h1.text-h4 Lista de Dispositivos
    q-btn( color="primary" :to="{ name: 'newDevice' }" ) Añadir

  q-table(
    :rows="rows"
    :columns="columns"
    row-key="uuid"
    :loading="loading"
    table-style="table-layout: fixed;"
  )
    //- template( #body-cell-name="{ row, value }" )
    //- template( #body-cell-icon="{ value }" )
    //-   q-td
    //-     q-img( :src="require(`assets/icons/${value}.png`)" )

    template( #body-cell-monitor="{ row }" )
      q-td( style="" )
        span( style="max-width: 200px; white-space: pre-wrap;" ) {{ row.sensor.reduce((string, sensor) => string + `${sensor.name}: ${sensor.value}\n`, '') }}

    template( #body-cell-actions="{ row, col }" )
      q-td( :style="col.style" )
        q-icon(
          name="edit"
          class="cursor-pointer" size="sm" color="primary"
          :to="getEditRoute(row)"
        )
        q-icon(
          name="delete"
          class="cursor-pointer" size="sm" color="negative"
          @click="removeDevice(row.uuid)"
        )

</template>

<script>
import { mapStores } from 'pinia'
import { useDeviceStore } from 'src/stores/useDeviceStore'

const columns = [
  {
    name: 'uuid',
    label: 'UUID',
    align: 'left',
    field: 'uuid',
    // format: (val) => `${val}`,
    style: 'width: 1%',
  },
  {
    name: 'name',
    label: 'Nombre',
    align: 'center',
    field: 'name',
  },
  {
    name: 'category',
    label: 'Categoría',
    align: 'center',
    field: (row) => row.category?.name,
    style: 'width: 1%',
  },
  {
    name: 'habitat',
    label: 'Ambiente',
    align: 'center',
    field: (row) => row.habitat?.name,
  },
  {
    name: 'monitor',
    label: 'Resumen de monitoreo',
    align: 'left',
    field: 'monitor',
    style: 'width: 300px; word-wrap:break-word;',
  },
  {
    name: 'actions',
    label: 'Acciones',
    align: 'left',
    style: 'width: 1%',
  },
]

// const rows = [
//   {
//     uuid: '39483',
//     name: 'Terrario Grillos',
//     icon: '02',
//     category: { name: 'Insectos' },
//     habitat: { name: 'Terrario Grillos' },
//     monitor: 'Temperatura: 23° C / Humedad: 45%',
//   },
//   {
//     uuid: '15473',
//     name: 'Pez Dorado Izq',
//     icon: '05',
//     category: { name: 'Peces' },
//     habitat: { name: 'Aquario Pez Dorado' },
//     monitor: 'Temperatura: 20° C',
//   },
//   {
//     uuid: '39483',
//     name: 'Pez Dorado Der',
//     icon: '05',
//     category: { name: 'Peces' },
//     habitat: { name: 'Aquario Pez Dorado' },
//     monitor: 'Temperatura: 24° C',
//   },
// ]

export default {
  data() {
    return {
      columns,
      rows: [],
      loading: true,
    }
  },
  computed: {
    ...mapStores(useDeviceStore),
    console: () => console,
  },
  methods: {
    async fetchList() {
      this.loading = true
      const res = await this.deviceStore.getDevices()
      if (res.status === 200) {
        this.loading = false
        this.rows = res.data
      }
    },

    // TODO: navegación a editar
    getEditRoute(device) {
      return {
        name: 'newDevice',
      }
    },

    async removeDevice(uuid) {
      const res = await this.deviceStore.removeDevice(uuid)
      if ([200, 204].includes(res.status)) {
        this.$q.notify({
          message: `Dispositivo eliminado de la organización`,
          position: 'top',
          color: 'positive',
          textColor: 'black',
        })
        this.fetchList()
      } else {
        this.$q.notify({
          message: res.data.msg || 'Error desconocido (Ver consola > network)',
          position: 'top',
          color: 'negative',
        })
      }
    },
  },
  created() {
    this.fetchList()
  },
}
</script>

<style lang="scss" scoped></style>
