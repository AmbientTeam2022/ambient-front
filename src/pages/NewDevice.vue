<template lang="pug">
.q-pa-lg.flex-col-gap
  h1.text-h4 Añadir Dispositivo

  q-form.flex-col-gap.gap30
    .row.q-col-gutter-lg
      .col-6
        q-input(
          v-model="uuid"
          label="UUID"
          hint="Ingrese el identificador del dispositivo"
        )
      .col-6
        q-input(
          v-model="category"
          label="Categoría"
          readonly filled
        )
      .col-12
        q-input(
          v-model="name"
          label="Nombre"
          hint="Escoja un nombre para este dispositivo"
        )
      //- .col
      //-   q-select(
      //-     v-model="category"
      //-     label="Categoría"
      //-     hint="Categoría del dispositivo"
      //-     :options="categoryOptions"
      //-   )

    div
      div.q-mb-sm Ícono
      q-scroll-area.icon-list()
        .flex-row-gap
          .icon(
            v-for="icon,index in iconList"
            :key="icon.id"
            :class="{ selected: index === selectedIcon }"
            @click="selectedIcon = index"
          )
            q-img( :src="require(`assets/icons/${icon.id}.png`)" )
            div {{ icon.name }}

    .flex-row-gap
      q-btn( type="submit" color="primary" ) Añadir dipositivo
      q-btn( :to="{ name: 'deviceList' }" color="negative" flatt ) Cancelar
</template>

<script>
import { mapStores } from 'pinia'
import { useDeviceStore } from 'src/stores/useDeviceStore'

export default {
  data() {
    return {
      uuid: null,
      name: null,
      category: null,
      selectedIcon: 0,
    }
  },
  computed: {
    categoryOptions: () => [
      { value: '1', label: 'Ambient Reptiles' },
      { value: '2', label: 'Ambient Insectos' },
      { value: '3', label: 'Ambient Peces' },
      { value: '4', label: 'Ambient Anfibios' },
    ],
    iconList: () => [
      { id: '00', name: 'default' },
      { id: '01', name: 'Grillo 1' },
      { id: '02', name: 'Grillo 2' },
      { id: '03', name: 'Lagarto' },
      { id: '04', name: 'Sapo' },
      { id: '05', name: 'Pez' },
    ],
  },
  methods: {
    ...mapStores(useDeviceStore),
    async onSubmit() {
      const device = {
        uuid,
        name,
        icon: this.selectedIcon,
        category,
        habitat: 1, // valor default para debug
      }
      const res = await this.deviceStore.createDevice(device)
    },
  },
}
</script>

<style lang="scss" scoped>
.icon-list {
  height: 110px;
  width: 100%;
  display: flex;
}
.icon {
  width: 90px;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  gap: 5px;
  align-items: center;
  justify-content: center;
  background-color: $grey-3;

  &:hover {
    background-color: $primary;
    color: white;

    ::v-deep img {
      background-color: $grey-3;
    }
  }

  &.selected {
    border: 5px solid $accent;
    padding: 5px 10px;
  }
}
</style>
