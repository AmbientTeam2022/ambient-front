const data = [
  { name: 'temperature', text: 'Temperatura' },
  { name: 'humidity', text: 'Humedad' },
]

export default {
  methods: {
    getParamText(name) {
      return (
        data.find((p) => p.name === name)?.text || '<PARÁMETRO DESCONOCIDO>'
      )
    },
  },
}
