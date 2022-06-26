const data = [
  { name: 'temperature', text: 'Temperatura', icon: 'thermostat' },
  { name: 'humidity', text: 'Humedad', icon: 'water_drop', absoluteMin: 0 },
]

export default {
  methods: {
    isAbsoluteMin(sensor) {
      const absoluteMin = data.find((s) => s.name === sensor.name)?.absoluteMin
      return absoluteMin != null ? sensor.value === absoluteMin : false
    },

    isAbsoluteMax(sensor) {
      const absoluteMax = data.find((s) => s.name === sensor.name)?.absoluteMax
      return absoluteMax != null ? sensor.value === absoluteMax : false
    },

    isSensorOkay(sensor) {
      return (
        (sensor.min < sensor.value || this.isAbsoluteMin(sensor)) &&
        (sensor.value < sensor.max || this.isAbsoluteMax(sensor))
      )
    },
    isSensorWarning(sensor) {
      return (
        !this.isSensorDanger(sensor) &&
        (sensor.min === sensor.value || sensor.value === sensor.max)
      )
    },
    isSensorDanger(sensor) {
      return sensor.value < sensor.min || sensor.max < sensor.value
    },

    getParamText(name) {
      return (
        data.find((p) => p.name === name)?.text || '<PARÁMETRO DESCONOCIDO>'
      )
    },
    getParamIcon(name) {
      return data.find((p) => p.name === name)?.icon || 'question_mark'
    },
    getSensorClass(sensor) {
      return this.isSensorOkay(sensor)
        ? 'sensor-okay'
        : this.isSensorDanger(sensor)
        ? 'sensor-danger'
        : 'sensor-warning'
    },
    getParamNameClass(sensor) {
      return this.isSensorOkay(sensor)
        ? 'param-name-okay'
        : this.isSensorDanger(sensor)
        ? 'param-name-danger'
        : 'param-name-warning'
    },
  },
}
