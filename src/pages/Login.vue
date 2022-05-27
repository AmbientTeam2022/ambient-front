<template lang="pug">
.background
  .container.row.justify-center.justify-md-between.items-center
    .form-column.column.justify-between.bg-grey-1
      q-img.q-mt-xl(
        src="~assets/logo.png"
        width="100%"
      )

      .flex-col-gap
        q-input.usuario(
          label="Ingrese su usuario"
          v-model="username"
        )
        q-input.password(
          label="Ingrese su contraseña"
          v-model="password"
          type="password"
        )
        p ¿Olvido su contraseña? haga clic #[router-link( :to="{ path: '' }" ) aquí].

        q-btn.btn-ingresar(
          @click="onSubmit"
        ) Ingresar

      span.text-caption Ambient &amp; Ambient Businnes - Todos los derechos reservados {{ new Date().getFullYear() }}

    img.planet.gt-sm(
      src="~assets/planet.png"
    )
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
        this.$q.notify({
          message: `Hola ${firstName} ${lastName}! Login exitoso :)`,
          position: 'top',
          color: 'positive',
        })
      } else {
        this.$q.notify({
          message: res.data.msg,
          position: 'top',
          color: 'negative',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.background {
  background: rgb(0, 228, 253);
  background: linear-gradient(
    180deg,
    rgba(0, 228, 253, 1) 0%,
    rgba(50, 151, 223, 1) 57%,
    rgba(50, 151, 223, 1) 73%,
    rgba(0, 228, 253, 1) 100%
  );
}

.form-column {
  max-width: 480px;
  padding: 0 40px 10px;
  height: 100vh;
}

.btn-ingresar {
  border-radius: 25px;
  background-color: lightskyblue;
  color: white;
  font-size: 20px;
}

.planet {
  height: calc(100vh - 150px);
  max-width: calc(100% - 480px - 60px);
  object-fit: contain;
  // background-color: lime;
}
// .cuadro {
//   height: 100vh;
//   width: 400px;
//   margin: 0px;
// }
// .text2 {
//   position: absolute;
//   top: 900px;
//   left: 130px;
//   font-size: 15px;
// }
// .text {
//   position: absolute;
//   top: 550px;
//   left: 100px;
//   font-size: 20px;
// }
// .login {
//   height: 100vh;
//   width: 100%;
//   display: block;
// }
// .usuario {
//   position: absolute;
//   top: 400px;
//   left: 100px;
//   font-size: 40px;
// }
// .password {
//   position: absolute;
//   top: 500px;
//   left: 100px;
//   font-size: 40px;
// }
// .btnIngresar {
//   position: absolute;
//   top: 600px;
//   left: 500px;
//   border-radius: 25px;
//   background-color: lightskyblue;
//   color: white;
//   font-size: 20px;
//   //visibility: hidden;
// }
</style>
