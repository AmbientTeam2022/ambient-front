<template lang="pug">
//- .q-pa-lg
//-   q-input(v-model.number='cantidad' type='number' filled rounded).input-cantidad
.column.justify-between.cuadro.q-ml-lg
  h1 Ambient
  .q-mx-md
    q-input( v-model="usuario" placeholder="hola" )
  p.q-ma-none esto es un footer

</template>

<script>
export default {
  data() {
    return {
      usuario: '',
    }
  },
}
</script>

<style lang="scss" scoped>
.cuadro {
  height: 100vh;
  width: 400px;
}
</style>
