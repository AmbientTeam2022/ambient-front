<template lang="pug">
//- .q-pa-lg
//-   q-input(v-model.number='cantidad' type='number' filled rounded).input-cantidad
.column.justify-between.q-ml-lg
  q-img.login(
    src = "~assets/LoginAmbient.png"
    fit = "cover"
  )
  h2.text ¿Olvido su contraseña? haga click aqui.

  q-input.usuario(
    label="Ingrese su usuario"
    v-model="username"
    square outlined
  )
  q-input.password(
    label="Ingrese su contraseña"
    v-model="password"
    type="password"
    square outlined
  )

  q-btn.btnIngresar(
    @click="onSubmit"
  ) Ingresar

  h2.text2 Ambient &amp; Ambient Businnes - Todos los derechos reservados {{ new Date().getFullYear() }}
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from 'src/stores/useAuthStore'

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },

  computed: {
    ...mapStores(useAuthStore),
  },

  methods: {
    async onSubmit() {
      const res = await this.authStore.login(this.username, this.password)
      console.log(res)
      if (res.status === 200) {
        const { firstName, lastName } = res.data.userData
        alert(`Hola ${firstName} ${lastName}! Login exitoso :)`)
      } else {
        alert(res.data.msg)
      }
    },
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
  height: 100vh;
  width: 100%;
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
