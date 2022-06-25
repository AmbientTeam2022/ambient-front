import { defineStore } from 'pinia'
import { api as axios } from 'src/boot/axios'
import { useAuthStore } from './useAuthStore'

export const useHabitatStore = defineStore('habitat', {
  state: () => ({}),

  actions: {
    async getHabitats() {
      const headers = useAuthStore().getHeaders()
      return axios.get('habitat/', { headers }).catch((err) => err.response)
    },

    // async getNewDevice(uuid, password) {
    //   const headers = useAuthStore().getHeaders()
    //   return axios
    //     .post('device/new/', { uuid, password }, { headers })
    //     .catch((err) => err.response)
    // },

    // async addDevice(uuid, data) {
    //   const headers = useAuthStore().getHeaders()
    //   return axios
    //     .patch(`device/add/${uuid}/`, data, { headers })
    //     .catch((err) => err.response)
    // },
  },
})
