<template lang="pug">
//- .q-pa-lg
//-   q-input(v-model.number='cantidad' type='number' filled rounded).input-cantidad
.column.justify-between.cuadro.q-ml-lg
  q-img.login(
    src = '~assets/LoginAmbient.png'
  :fit = 'cover'
  )
  h2.text ¿Olvido su contraseña? haga click aqui.
  q-span(ADSadsaDSA)
  q-input.usuario(square outlined v-model="text" label="Ingrese su usuario")
  q-input.password(square outlined v-model="text" type="password" label="Ingrese su contraseña")
  br
  q-btn.btnIngresar(
    label="Ingresar"
    )
  h2.text2 Ambient & Ambient Businnes- Todos los derechos reservados 2022
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
  margin: 0px;
}
.text2 {
  position: absolute;
  top: 900px;
  left: 130px;
  font-size: 15px;
}
.text {
  position: absolute;
  top: 550px;
  left: 100px;
  font-size: 20px;
}
.login {
  height: 980px;
  width: 1896px;
  display: block;
}
.usuario {
  position: absolute;
  top: 400px;
  left: 100px;
  font-size: 40px;
}
.password {
  position: absolute;
  top: 500px;
  left: 100px;
  font-size: 40px;
}
.btnIngresar {
  position: absolute;
  top: 600px;
  left: 500px;
  border-radius: 25px;
  background-color: lightskyblue;
  color: white;
  font-size: 20px;
  //visibility: hidden;
}
</style>
