import { defineStore } from 'pinia'
import { api as axios } from 'src/boot/axios'
import { useAuthStore } from './useAuthStore'

export const useDeviceStore = defineStore('device', {
  state: () => ({}),

  actions: {
    async getDevices() {
      const headers = useAuthStore().getHeaders()
      return axios.get('device/', { headers }).catch((err) => err.response)
    },

    async getDevice() {},

    async getNewDevice(uuid, password) {
      const headers = useAuthStore().getHeaders()
      return axios
        .post('device/new/', { uuid, password }, { headers })
        .catch((err) => err.response)
    },

    async addDevice(uuid, data) {
      const headers = useAuthStore().getHeaders()
      return axios
        .patch(`device/add/${uuid}/`, data, { headers })
        .catch((err) => err.response)
    },

    async removeDevice(uuid) {
      const headers = useAuthStore().getHeaders()
      return axios
        .delete(`device/${uuid}/`, { headers })
        .catch((err) => err.response)
    },
  },
})
