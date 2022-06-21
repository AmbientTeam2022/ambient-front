<template lang="pug">
.q-pa-lg.flex-col-gap
  .row.justify-between
    h1.text-h4 Lista de Dispositivos
    q-btn( color="primary" :to="{ name: 'newDevice' }" ) Añadir

  q-table(
    :rows="rows"
    :columns="columns"
    row-key="uuid"
  )
    //- template( #body-cell-name="{ row, value }" )
    template( #body-cell-icon="{ value }" )
      q-td
        q-img( :src="require(`assets/icons/${value}.png`)" )

</template>

<script>
const columns = [
  {
    name: 'uuid',
    label: 'UUID',
    align: 'left',
    field: 'uuid',
    // format: (val) => `${val}`,
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
    field: (row) => row.category.name,
  },
  {
    name: 'icon',
    label: 'Ícono',
    align: 'center',
    field: 'icon',
  },
  {
    name: 'habitat',
    label: 'Ambiente',
    align: 'center',
    field: (row) => row.habitat.name,
  },
  {
    name: 'monitor',
    label: 'Resumen de monitoreo',
    align: 'left',
    field: 'monitor',
  },
]

const rows = [
  {
    uuid: '39483',
    name: 'Terrario Grillos',
    icon: '02',
    category: { name: 'Insectos' },
    habitat: { name: 'Terrario Grillos' },
    monitor: 'Temperatura: 23° C / Humedad: 45%',
  },
  {
    uuid: '15473',
    name: 'Pez Dorado Izq',
    icon: '05',
    category: { name: 'Peces' },
    habitat: { name: 'Aquario Pez Dorado' },
    monitor: 'Temperatura: 20° C',
  },
  {
    uuid: '39483',
    name: 'Pez Dorado Der',
    icon: '05',
    category: { name: 'Peces' },
    habitat: { name: 'Aquario Pez Dorado' },
    monitor: 'Temperatura: 24° C',
  },
]

export default {
  setup() {
    return {
      columns,
      rows,
    }
  },
}
</script>

<style lang="scss" scoped></style>
