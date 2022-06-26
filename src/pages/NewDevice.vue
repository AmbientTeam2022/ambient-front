<template lang="pug">
.q-py-lg.q-px-xl.flex-col-gap
  h1.text-h4 Añadir Dispositivo

  q-form.flex-col-gap.gap30( @submit.prevent )
    .row.q-col-gutter-lg
      .col-6
        q-input(
          v-model="uuid"
          for="device-uuid"
          label="UUID"
          hint="Ingrese el identificador del dispositivo"
          :readonly="!!device" :filled="!!device"
        )
      .col-6
        q-input(
          v-model="password"
          for="device-password"
          label="Contraseña"
          hint="La contraseña del dispositivo Ambient"
          :type="passwordHidden ? 'password' : 'text'"
          autocomplete="new-password"
          :readonly="!!device" :filled="!!device"
        )
          template( #append )
            q-icon(
              :name="passwordHidden ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="passwordHidden = !passwordHidden"
            )

    .row.q-col-gutter-lg( v-if="device" )
      .col-12
        q-input(
          v-model="category"
          label="Categoría"
          hint="Modelo del dispositivo"
          readonly filled
        )
      .col-12
        q-input(
          v-model="name"
          label="Nombre"
          hint="Escoja un nombre para este dispositivo"
        )

    .row.q-col-gutter-lg(
      v-for="param, index in device?.param"
      :key="index"
    )
      .col-2.flex-col.justify-center {{ getParamText(param.name) }}
      .col-4
        q-input(
          v-model="param.min"
          label="Mínimo"
          hint="Valor mínimo de este parámetro"
        )
      .col-4
        q-input(
          v-model="param.max"
          label="Máximo"
          hint="Valor máximo de este parámetro"
        )

    .row.q-col-gutter-lg( v-if="device" )
      .col-12
        q-select(
          v-model="device.habitat"
          label="Ambiente"
          hint="Añadir el dispositivo a un Ambiente"
          :options="habitatOptions"
          option-label="name"
          :readonly="habitatOptions.length === 0"
          :filled="habitatOptions.length === 0"
        )

    //- div
    //-   div.q-mb-sm Ícono
    //-   q-scroll-area.icon-list()
    //-     .flex-row-gap
    //-       .icon(
    //-         v-for="icon,index in iconList"
    //-         :key="icon.id"
    //-         :class="{ selected: index === selectedIcon }"
    //-         @click="selectedIcon = index"
    //-       )
    //-         q-img( :src="require(`assets/icons/${icon.id}.png`)" )
    //-         div {{ icon.name }}

    .flex-row-gap
      q-btn( v-if="device" type="submit" color="primary" @click="addDevice()" ) Añadir a mi organización
      q-btn( v-else type="submit" color="primary" @click="fetchDevice()" ) Siguiente
      q-btn( :to="{ name: 'deviceList' }" color="negative" flatt ) Cancelar
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from 'src/stores/useAuthStore'
import { useDeviceStore } from 'src/stores/useDeviceStore'
import { useHabitatStore } from 'src/stores/useHabitatStore'
import paramMixin from 'src/util/mixins/paramMixin'

export default {
  mixins: [paramMixin],
  data() {
    return {
      uuid: null,
      password: null,

      category: null,
      name: null,
      parameters: [],
      selectedIcon: 0,

      habitatOptions: [],
      passwordHidden: true,
      device: null,
      editMode: false,
    }
  },
  computed: {
    ...mapStores(useDeviceStore, useAuthStore, useHabitatStore),

    iconList: () => [
      { id: '00', name: 'default' },
      { id: '01', name: 'Grillo 1' },
      { id: '02', name: 'Grillo 2' },
      { id: '03', name: 'Lagarto' },
      { id: '04', name: 'Sapo' },
      { id: '05', name: 'Pez' },
    ],
  },
  watch: {
    device(device) {
      this.category = device.category?.name || ''
      this.name = device.name || ''
    },
  },
  methods: {
    async fetchDevice() {
      const { uuid, password } = this
      const res = await this.deviceStore.getNewDevice(uuid, password)

      if (res.status === 200) {
        this.device = res.data
      } else {
        this.$q.notify({
          message: res.data.msg || 'Error desconocido (Ver consola > network)',
          position: 'top',
          color: 'negative',
        })
      }
    },

    async addDevice() {
      const { uuid, name, password } = this
      const { habitat, param } = this.device

      const data = { name, habitat, param, password }
      const res = await this.deviceStore.addDevice(uuid, data)

      if (res.status === 200) {
        this.$router.push({ name: 'deviceList' })
        this.$q.notify({
          message: `Dispositivo ${name} añadido a la organización`,
          position: 'top',
          color: 'positive',
          textColor: 'black',
        })
      } else {
        this.$q.notify({
          message: res.data.msg || 'Error desconocido (Ver consola > network)',
          position: 'top',
          color: 'negative',
        })
      }
    },
  },
  async created() {
    const res = await this.habitatStore.getHabitats()
    if (res.status === 200) {
      this.habitatOptions = res.data
    }
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
