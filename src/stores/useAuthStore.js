import { defineStore } from 'pinia'
import { api as axios } from 'src/boot/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    token: JSON.parse(localStorage.getItem('token')),
  }),

  actions: {
    /**
     * Genera la cabecera de solicitud usando el token JWT del Local Storage
     * @returns Objeto config de Axios con la cabecera
     */
    getHeaders() {
      const { token } = JSON.parse(localStorage.getItem('user'))
      return { headers: { Authorization: `Token ${token}` } }
    },

    /**
     * Almacena los datos de usuario en el Local Storage del navegador
     * @param {*} user Datos del usuario (entregados por la API)
     */
    setUser(user) {
      this.user = user
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.removeItem('user')
      }
    },

    /**
     * Loguea al usuario con las credenciales entregadas
     * @param {*} username Nombre de usuario
     * @param {*} password Contraseña
     * @returns Promesa de la solicitud a la API. Resuelve si el login es correcto y Rechaza en caso contrario.
     */
    async login(username, password) {
      const data = { username, password }
      return axios
        .post('auth/login/', data)
        .then((res) => {
          this.setUser(res.data)
          return res
        })
        .catch((err) => err.response)
    },

    /**
     * Desloguea al usuario
     * @returns Promesa de la solicitud a la API. Resuelve si el logout fue exitoso y Rechaza si ocurrió un error.
     */
    async logout() {
      return axios
        .post('auth/logout/')
        .then((res) => {
          this.setUser(null)
          return res
        })
        .catch((err) => err.response)
    },

    /**
     * Crea un nuevo usuario
     * @param {*} user Los datos del usuario ingresados en el registro
     * @returns Promesa de la solicitud a la API. Resuelve si se creó con éxito y Rechaza si ocurrió un error.
     */
    async register(user) {
      return axios
        .post('auth/register/', user)
        .then((res) => {
          console.log(res.data)
          this.setUser(res.data.user)
        })
        .catch((err) => err.response)
    },
  },
})
