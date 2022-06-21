import { defineStore } from 'pinia'
import { api as axios } from 'src/boot/axios'
import { useAuthStore } from './useAuthStore'

export const useDeviceStore = defineStore('device', {
  state: () => ({}),

  actions: {
    async getDevices() {
      const headers = useAuthStore().getHeaders()
      return axios
        .get('device/', { headers })
        .then(res)
        .catch((err) => err.response)
    },

    async createDevice(device) {
      const headers = useAuthStore().getHeaders()
      return axios
        .post('device/', device, { headers })
        .then(res)
        .catch((err) => err.response)
    },
  },
})
